import { user, emailverification, updateOtp, create, createUser, saveRefreshToken, refreshtoken, deleteToken, createPasswordReset, passwordReset, saveResetPasswordRecord, resetpassword, saveUser,userById } from './auth.repository.js';
import ApiError from '../utils/ApiError.js';
import { statusCode, message } from '../constants/index.js';
import asyncHandler from '../utils/asyncHandler.js';
import EmailVerification from './emailVerification.model.js';
import { generateOtp, hashOtp, hashResetToken, generateResetToken } from '../utils/Otp.js';
import sendEmail from '../utils/email.js';
import { otpEmailTemplate, passwordResetEmailTemplate } from '../templates/email.template.js';
import bcrypt from 'bcrypt';
import { createAccessToken, createRefreshToken } from '../utils/tokens.js';
const registerService = async (validateData) => {
    const isExisting = await user(validateData.email);
    if (isExisting) {
        throw new ApiError(statusCode.CONFLICT, message.ALREADY);
    }
    const isUserExisting = await emailverification(validateData.email);
    if (isUserExisting) {
        throw new ApiError(statusCode.CONFLICT, message.EMAIL_ALREADY_REGISTERED)
    }
    else {
        const otp = generateOtp();
        const hashedOtp = hashOtp(otp);
        await create({
            name: validateData.name,
            email: validateData.email,
            password: validateData.password,
            otp: hashedOtp,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000),
            deleteAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
        })
        await sendEmail(validateData.email, otpEmailTemplate(otp, validateData.name), message.EMAIL_VERIFICATION_SUBJECT,)
    }
}
const verifyOtpService = async (validateData) => {
    const isUserExisting = await emailverification(validateData.email);
    const hashedOtp = hashOtp(validateData.otp)
    if (!isUserExisting) {
        throw new ApiError(statusCode.BAD_REQUEST, message.NOT_FOUND);
    }
    if (isUserExisting.expiresAt.getTime() < Date.now()) {
        throw new ApiError(statusCode.BAD_REQUEST, message.OTP_EXPIRED);
    }
    if (isUserExisting.otp !== hashedOtp) {
        throw new ApiError(statusCode.BAD_REQUEST, message.INVALID_OTP);
    }
    await createUser({
        name: isUserExisting.name,
        email: isUserExisting.email,
        password: isUserExisting.password,
        isVerified: true
    })
}

const resendOtpService = async (validateData) => {
    const isUserExisting = await emailverification(validateData.email);
    if (!isUserExisting) {
        throw new ApiError(statusCode.BAD_REQUEST, message.NOT_FOUND);
    }
    if (isUserExisting.isVerified === true) {
        throw new ApiError(statusCode.CONFLICT, message.EMAIL_VERIFIED);
    }
    const otp = generateOtp();
    const hashedOtp = hashOtp(otp);
    await updateOtp(isUserExisting.email, hashedOtp);
    await sendEmail(isUserExisting.email, otpEmailTemplate(otp, isUserExisting.name), message.EMAIL_VERIFICATION_SUBJECT,);
}

const loginService = async (validateData) => {
    const isExisting = await user(validateData.email);
    if (!isExisting) {
        throw new ApiError(statusCode.NOT_FOUND, message.NOT_FOUND);
    } //checking email verify
    if (!isExisting.isVerified) {
        throw new ApiError(statusCode.FORBIDDEN, message.EMAIL_NOT_VERIFIED);
    }
    // compare password
    const isMatch = await bcrypt.compare(validateData.password, isExisting.password);
    if (!isMatch) {
        throw new ApiError(statusCode.UNAUTHORIZED, message.INVALID_PASSWORD);
    }
    const refreshToken = createRefreshToken(isExisting._id);
    await saveRefreshToken({
        user: isExisting._id,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    })
    const accessToken = createAccessToken(isExisting._id);

    return { accessToken, refreshToken };
}

const logOutService = async (token) => {
    if (!token) {
        throw new ApiError(statusCode.UNAUTHORIZED, message.REFRESH_TOKEN_REQUIRED)
    }
    const refreshToken = await refreshtoken(token);
    if (!refreshToken) {
        throw new ApiError(statusCode.UNAUTHORIZED, message.INVALID_REFRESH_TOKEN)
    }
    await deleteToken(refreshToken);
}

const forgotPasswordService = async (validateData) => {
    const isExisting = await user(validateData.email);
    if (!isExisting) {
        throw new ApiError(statusCode.NOT_FOUND, message.NOT_FOUND);
    }

    const resetpassword = await passwordReset(isExisting._id);
    if (resetpassword && resetpassword.lastOtpSentAt) {
        const elapsedTime =
            Date.now() - resetpassword.lastOtpSentAt.getTime();
        if (elapsedTime < 60 * 1000) {
            throw new ApiError(statusCode.TOO_MANY_REQUESTS, message.OTP_COOLDOWN)
        }
    }
    const otp = generateOtp();
    const hashedOtp = hashOtp(otp);
    await createPasswordReset({
        user: isExisting._id,
        otp: hashedOtp,
        lastOtpSentAt: new Date(),
        expiresAt: new Date(Date.now() + 5 * 60 * 1000)
    });
    await sendEmail(isExisting.email, passwordResetEmailTemplate(isExisting.name, otp), 'Your Password Reset OTP')
}
const verifyForgotPasswordOtpService = async (validateData)=>{
    const isExisting = await user(validateData.email);
    if (!isExisting) {
        throw new ApiError(statusCode.NOT_FOUND, message.NOT_FOUND);
    }
    const resetpassword = await passwordReset(isExisting._id);
    if (!resetpassword) {
        throw new ApiError(statusCode.NOT_FOUND, message.PASSWORD_RESET_NOT_FOUND)
    }
    if (resetpassword.expiresAt < new Date()) {
        throw new ApiError(statusCode.BAD_REQUEST, message.OTP_EXPIRED);
    }
    if (resetpassword.otpAttempts >= 5) {
        throw new ApiError(statusCode.TOO_MANY_REQUESTS, message.OTP_ATTEMPTS_EXCEEDED);
    }
    const otp = validateData.otp;
    const hashedOtp = hashOtp(otp);
    if (resetpassword.otp !== hashedOtp) {
        resetpassword.otpAttempts += 1;
        await saveResetPasswordRecord(resetpassword);
        throw new ApiError(statusCode.BAD_REQUEST, message.INVALID_OTP)
    }
    const token = generateResetToken();
    const hashedToken = hashResetToken(token)
    resetpassword.resetTokenHash = hashedToken
    resetpassword.resetTokenExpiresAt = new Date(Date.now() + 10 * 60 * 1000)
    await saveResetPasswordRecord(resetpassword)
    return token;
}
const resetPasswordService = async (validateData) => {
    const hashedToken = hashResetToken(validateData.resetToken);
    const resetToken = await resetpassword(hashedToken);
    if (!resetToken) {
        throw new ApiError(statusCode.UNAUTHORIZED, message.RESET_TOKEN_NOT_FOUND);
    }
    if (resetToken.resetTokenExpiresAt < new Date()) {
        throw new ApiError(statusCode.BAD_REQUEST, message.resetTokenExpiresAt);
    }
    const user=await userById(resetToken.user)
    const hashPassword = await bcrypt.hash(validateData.newPassword, 10);
    user.password = hashPassword;
    await saveUser(user);
}

export { registerService, verifyOtpService, resendOtpService, loginService, logOutService, forgotPasswordService, verifyForgotPasswordOtpService, resetPasswordService };