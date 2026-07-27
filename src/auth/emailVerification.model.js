import mongoose from 'mongoose';
const emailVerificationSchema=new mongoose.Schema({
     name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        lowercase:true,
        unqiue:true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Invalid Email Format"],
        required:true
    },
    password:{
        type:String,
        trim:true,
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


emailVerificationSchema.index({expiresAt:1},{
    expireAfterSeconds:0});
const EmailVerification=mongoose.model('EmailVerification',emailVerificationSchema);
export default EmailVerification;