import { changePasswordService, deleteUserService, getMeService, updateUserDetailsService } from "./user.service.js";
import asyncHandler from '../utils/asyncHandler.js';
import apiResponse from '../utils/apiResponse.js';
import { statusCode, message } from '../constants/index.js';
const getMe = asyncHandler(async (req, res) => {
    const data = await getMeService(req.user.id);
    return res.status(statusCode.OK).json(apiResponse(message.SUCCESS, message.FETCHED, data));
});
const updateUserDetails = asyncHandler(async (req, res) => {
    await updateUserDetailsService(req.body, req.user.id);
    return res.status(statusCode.OK).json(apiResponse(message.SUCCESS, message.UPDATED));
});
const changePassword=asyncHandler(async(req,res)=>{
    await changePasswordService(req.body,req.user.id);
    return res.status(statusCode.OK).json(apiResponse(message.SUCCESS,message.PASSWORD_CHANGED_SUCCESSFULLY));
})
const deleteUser=asyncHandler(async(req,res)=>{
    await deleteUserService(req.user.id);
    res.clearCookie('refreshToken');
    return res.status(statusCode.OK).json(apiResponse(message.SUCCESS,message.DELETED));
})
export { getMe, updateUserDetails,changePassword,deleteUser };