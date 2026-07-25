import mongoose from 'mongoose';
const todoSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        trim:true,
        required:true
    },
    description:{
        type:String,
        trim:true,
        required:true
    },
    status:{
        type:String,
        trim:true,
        lowercase:true,
        enum:['pending','in-progress','completed'],
        default:'pending'
    },
    priority:{
        type:String,
        trim:true,
        lowercase:true,
        enum:['low','medium','high']
    },
    dueDate:{
        type:Date,
        required:true
    },
    completedAt:{
        type:Date
    },
    reminder:{
        type:Date
    },
    tags:[{
        type:String
    }],
    ispinned:{
        type:Boolean,
        default:true
    },
    isArchieved:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true
})
const Todo =mongoose.model('Todo',todoSchema);
export default Todo;