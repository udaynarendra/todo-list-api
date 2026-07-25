import mongoose from 'mongoose';
const notificationSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId;
        ref:'User',
        required:true
    },
    todo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Todo',
        required:true
    },
    title:{
        type:String,
        trim:true,
        enum:['Reminder','TaskCompleted','Welcome','PasswordChanged'],
        required:true
    },
    message:{
        type:String,
        trim:true,
        required:true
    },
    type:{
        type:String,
        trim:true,
        enum:['Reminder','Success','Warning','System'],
        required:true
    },
    isRead:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})
const Notification=mongoose.model('Notification',notificationSchema);
export default Notification;