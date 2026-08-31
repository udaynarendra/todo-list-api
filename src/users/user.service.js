import { deleteRefreshTokens, findById, updateUser } from "./user.repository.js";
import ApiError from '../utils/ApiError.js';
import { statusCode, message } from '../constants/index.js';
import bcrypt from 'bcrypt';
const getMeService = async (userId) => {
    const user = await findById(userId);
    if (!user) {
        throw new ApiError(statusCode.NOT_FOUND, message.NOT_FOUND);
    }
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };
}
const updateUserDetailsService = async (validateData, userId) => {
    const user = await findById(userId);
    if (!user) {
        throw new ApiError(statusCode.NOT_FOUND, message.NOT_FOUND);
    }
    await updateUser(userId,{name:validateData.name});
}
const changePasswordService=async(validateData,userId)=>{
    const user = await findById(userId);
    if (!user) {
        throw new ApiError(statusCode.NOT_FOUND, message.NOT_FOUND);
    }
const isMatch=await bcrypt.compare(validateData.currentPassword,user.password);
if(!isMatch){
    throw new ApiError(statusCode.UNAUTHORIZED,message.CURRENT_PASSWORD_INCORRECT);
}
const hashedPassword=await bcrypt.hash(validateData.newPassword,10);
await updateUser(userId,{password:hashedPassword});
}
const deleteUserService=async(userId)=>{
    await updateUser(userId,{status:'deleted',deletedAt:new Date(Date.now())});
    await deleteRefreshTokens(userId);
}
export { getMeService, updateUserDetailsService,changePasswordService,deleteUserService };