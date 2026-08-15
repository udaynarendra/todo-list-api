import Joi from 'joi';
const registerValidation=Joi.object({
    name:Joi.string().trim().required(),
    email:Joi.string().trim().email().required(),
    password:Joi.string().trim().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required().messages({'string.pattern.base':
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)."})
})
const forgotPasswordValidation=Joi.object({
    email:Joi.string().trim().email().required()
})
const loginValidation=Joi.object({
    email:Joi.string().trim().email().required(),
    password:Joi.string().trim().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required().messages({'string.pattern.base':
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)."})
})
const verifyForgotPasswordOtpValidation=Joi.object({
    email:Joi.string().trim().email().required(),
    otp:Joi.string().trim().min(6).max(6).required()
})
const resetPasswordValidation=Joi.object({
    resetToken:Joi.string().trim().required(),
    newPassword:Joi.string().trim().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required().messages({'string.pattern.base':
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)."})

})
export {registerValidation,forgotPasswordValidation,loginValidation,verifyForgotPasswordOtpValidation,resetPasswordValidation};