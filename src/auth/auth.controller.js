import asyncHandler from '../utils/asyncHandler.js';
import apiResponse from '../utils/apiResponse.js';
import { message, statusCode } from '../constants/index.js';
import { forgotPasswordService, loginService, logOutService, registerService, resendOtpService, verifyForgotPasswordOtpService, verifyOtpService,resetPasswordService } from './auth.service.js';

const register = asyncHandler(async (req, res) => {
    const newUser = await registerService(req.body);
    return res.status(statusCode.OK).json(apiResponse(message.SUCCESS, `User ${message.CREATED}`,));
})
const verifyOtp = asyncHandler(async (req, res) => {
    await verifyOtpService(req.body);
    return res.status(statusCode.OK).json(apiResponse(message.SUCCESS, message.OTP_VERIFIED));
})
const resendOtp = asyncHandler(async (req, res) => {
    await resendOtpService(req.body);
    return res.status(statusCode.OK).json(apiResponse(message.SUCCESS, message.OTP_RESENT_SUCCESSFULLY));
})

const login=asyncHandler(async(req,res)=>{
    const {refreshToken,accessToken}=await loginService(req.body);
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    return res.status(statusCode.OK).json(apiResponse(message.SUCCESS,message.LOGIN_SUCCESS,{accessToken}))
})
const logOut=asyncHandler(async(req,res)=>{
    await logOutService(req.cookies.refreshToken);
    res.clearCookie('refreshToken')
    return res.status(statusCode.OK).json(apiResponse(message.SUCCESS,message.LOGOUT_SUCCESS))
})

const forgotPassword=asyncHandler(async(req,res)=>{
    await forgotPasswordService(req.body);
    return res.status(statusCode.OK).json(apiResponse(message.SUCCESS,message.FORGOT_PASSWORD))
})
const verifyForgotPasswordOtp=asyncHandler(async(req,res)=>{
    const resetToken=await verifyForgotPasswordOtpService(req.body);
    return res.status(statusCode.OK).json(apiResponse(message.SUCCESS,message.OTP_VERIFIED,{resetToken}))

})
const resetPassword=asyncHandler(async(req,res)=>{
    await resetPasswordService(req.body);
    return res.status(statusCode.OK).json(apiResponse(message.SUCCESS,message.RESET_PASSWORD_SUCCESS));
})

export { register, verifyOtp ,resendOtp,login,logOut,forgotPassword,verifyForgotPasswordOtp,resetPassword};