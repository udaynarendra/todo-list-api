import mongoose from 'mongoose';
const emailVerificationSchema=new mongoose.Schema({
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
const EmailVerification=mongoose.model('EmailVerification',emailVerificationSchema);
export default EmailVerification;