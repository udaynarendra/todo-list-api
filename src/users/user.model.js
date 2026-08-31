import mongoose from 'mongoose';
const userSchema=new mongoose.Schema({
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
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    status:{
        type:String,
        enum:['active','blocked','deleted'],
        default:'active'
    },
    deletedAt:{
        type:String,
        default:null
    }
},{
    timestamps:true
});
const User = mongoose.model('User',userSchema);
export default User;