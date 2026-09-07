import ApiError from "../utils/ApiError.js";
import { createtodo, findAllTodos, findById } from "./todo.repository.js";
import {statusCode,message} from '../constants/index.js';
export const createTodoService=async(validateData,userId)=>{
   
    const newTodo={
        user:userId,
        title:validateData.title,
        description:validateData.description,
    }

    if (validateData.priority !== undefined) {
        newTodo.priority = validateData.priority;
    }

    if (validateData.dueDate !== undefined) {
        newTodo.dueDate = validateData.dueDate;
    }

    await createtodo(newTodo);
};
export const getAllTodoService=async(userId)=>{
    const userTodos=await findAllTodos(userId);
    if(userTodos.length===0){
        throw new ApiError(statusCode.BAD_REQUEST,message.USER_NOT_FOUND);
    }
    return userTodos;

}
export const getTodoByIdService=async(todoId,userId)=>{
    const todo=await findById(todoId,userId);
    if(!todo){
        throw new ApiError(statusCode.BAD_REQUEST,message.TODO_NOT_FOUND);
    }
    return todo;
}