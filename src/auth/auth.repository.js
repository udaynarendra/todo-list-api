import User from '../users/user.model.js';
import EmailVerification from './emailVerification.model.js';
import RefreshToken from './refreshToken.model.js';
import PasswordReset from './passwordReset.model.js';

const user=async(email)=>{
    return await User.findOne({email})
};
const userById=async(id)=>{
    return await User.findOne({_id:id})
}
const saveUser=async(user)=>{
    return await user.save();
}

const emailverification=async(email)=>{
    return await EmailVerification.findOne({email})
} ;
const create=async(data)=>{
    return await EmailVerification.create(data);
}
const updateOtp=async(email,hashedOtp)=>{
    return await EmailVerification.findOneAndUpdate({email},{
        otp:hashedOtp,
        expiresAt:new Date(Date.now()+5*60*1000)
    },{
        returnDocument:'after'
    })
}
const createUser=async(data)=>{
    return await User.create(data);
}
const saveRefreshToken=async(data)=>{
    return await RefreshToken.create(data);
}

const refreshtoken=async(token)=>{
    return await RefreshToken.findOne({token:token})
}

const deleteToken=async(token)=>{
    return await token.deleteOne()
}
const createPasswordReset=async(data)=>{
    return await PasswordReset.create(data);
}

const passwordReset=async(userId)=>{
    return await PasswordReset.findOne({user:userId});
}
const saveNewPassword=async(user)=>{
    return await user.save();
}
const saveResetPasswordRecord = async(resetpassword)=>{
    return await resetpassword.save()
}
const resetpassword=async(resetTokenHash)=>{
    return await PasswordReset.findOne({resetTokenHash})
}
export {user,emailverification,create,updateOtp,createUser,saveRefreshToken,refreshtoken,deleteToken,createPasswordReset,passwordReset,saveResetPasswordRecord,resetpassword,saveUser,userById};
