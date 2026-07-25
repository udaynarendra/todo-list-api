import mongoose from 'mongoose';
const passwordResetSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    otp:{
        type:String,
        trim:true,
        minlength:6,
        maxlength:6,
        required:true
    },
    expiresAt:{
        type:Date,
        required:true
    }

},{
    timestamps:true
})
passwordResetSchema.index({expiresAt:1},{expireAfterSeconds:0});
const PasswordReset=mongoose.model('PasswordReset',passwordResetSchema);
export default PasswordReset;