import apiResponse from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import {statusCode,message} from '../constants/index.js';
import { createTodoService, getAllTodoService, getTodoByIdService } from './todo.service.js';

export const createTodo=asyncHandler(async(req,res)=>{
    await createTodoService(req.body,req.user.id);
    return res.status(statusCode.OK).json(apiResponse(message.SUCCESS,message.TODO_CREATED));
});

export const getAllTodos=asyncHandler(async(req,res)=>{
   const todos= await getAllTodoService(req.user.id);
    return res.status(statusCode.OK).json(apiResponse(message.SUCCESS,message.FETCHED,todos))
});
export const getTodoById=asyncHandler(async(req,res)=>{
    const todo =await getTodoByIdService(req.params.id,req.user.id);
    return res.status(statusCode.OK).json(apiResponse(message.SUCCESS,message.FETCHED,todo));

})