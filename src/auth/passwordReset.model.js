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
        required:true
    },
    otpAttempts:{
        type:Number,
        default:0
    },
    lastOtpSentAt:{
        type:Date,
        required:true
    },
    expiresAt:{
        type:Date,
        required:true
    },
    resetTokenHash:{
        type:String,
        default:null
     
    },
    resetTokenExpiresAt:{
        type:Date,
        default:null
    }

},{
    timestamps:true
})
passwordResetSchema.index({expiresAt:1},{expireAfterSeconds:0});
const PasswordReset=mongoose.model('PasswordReset',passwordResetSchema);
export default PasswordReset;