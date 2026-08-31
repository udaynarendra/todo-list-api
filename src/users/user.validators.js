import Joi from 'joi';
const userDataValidation = Joi.object({
    name: Joi.string().trim()
}).min(1);
const changePasswordValidation = Joi.object({
    currentPassword: Joi.string().trim().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required().messages({
        'string.pattern.base':
            "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)."
    }),
    newPassword: Joi.string().trim().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required().messages({ 'string.pattern.base': 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).' }),
    confirmPassword: Joi.string().trim().valid(Joi.ref("newPassword")).required().messages({
        "any.only": "confirm password must match new password"
    })

})
export { userDataValidation,changePasswordValidation};