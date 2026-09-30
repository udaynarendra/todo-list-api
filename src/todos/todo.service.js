import ApiError from "../utils/ApiError.js";
import { countTodos, createtodo, findAllTodos, findById } from "./todo.repository.js";
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
export const getAllTodoService=async(userId,filters)=>{
    const userTodos=await findAllTodos(userId,filters);
    const total=await countTodos(userId);
    const totalPages=Math.ceil(total/(filters.limit||10))
    const page=Number(filters.page) || 1;
    const limit=Number(filters.limit) || 10;
    return {userTodos:userTodos,
        pagination: {
            page,
            limit,
            total,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page>totalPages
        }
    }

}
export const getTodoByIdService=async(todoId,userId)=>{
    const todo=await findById(todoId,userId);
    if(!todo){
        throw new ApiError(statusCode.BAD_REQUEST,message.TODO_NOT_FOUND);
    }
    return todo;
}
