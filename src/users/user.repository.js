import User from './user.model.js';
import RefreshToken from '../auth/refreshToken.model.js';
const findById = async (userId) => {
    return await User.findOne({ _id: userId,status:'active' });
}
const updateUser = async (userId,data) => {
    return User.findByIdAndUpdate({ _id: userId},data, {
        returnDocument: "after",
        runValidators: true
    })

}
const deleteRefreshTokens=async(userId)=>{
    return RefreshToken.deleteMany({
        user:userId
    })
}
export { findById, updateUser,deleteRefreshTokens };