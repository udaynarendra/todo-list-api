import bcrypt from 'bcrypt';
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
        required:true
    },
    expiresAt:{
        type:Date,
        required:true
    },
    deleteAt:{
        type:Date,
        required:true
    }
},{
    timestamps:true
})
emailVerificationSchema.pre('save',async function(){
    if(!this.isModified('password'))
    {
        return;
    }
    this.password=await bcrypt.hash(this.password,10);
})

emailVerificationSchema.index({deleteAt:1},{
    expireAfterSeconds:0});
const EmailVerification=mongoose.model('EmailVerification',emailVerificationSchema);
export default EmailVerification;