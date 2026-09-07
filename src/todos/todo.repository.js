import Todo from './todo.model.js';
export const createtodo=async(data)=>{
    return await Todo.create(data);
}
export const findById=async(todoId,userId)=>{
return await Todo.findOne({_id:todoId,user:userId}).select("title description status priority dueDate ispinned");
}
export const findAllTodos=async(userId)=>{
    return await Todo.find({user:userId})
    .select("title description status priority dueDate ispinned");
}