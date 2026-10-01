import apiResponse from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { statusCode, message } from '../constants/index.js';
import { createTodoService, deleteTodoService, getAllTodoService, getTodoByIdService, permanentDeleteService, restoreTodoService, todoTrashService, updateTodoService } from './todo.service.js';

export const createTodo = asyncHandler(async (req, res) => {
    await createTodoService(req.body, req.user.id);
    return res.status(statusCode.OK).json(apiResponse(message.SUCCESS, message.TODO_CREATED));
});

export const getAllTodos = asyncHandler(async (req, res) => {
    const result = await getAllTodoService(req.user.id, req.query);
    return res.status(statusCode.OK).json({
        success: "success",
        message: "Data Retrieved Successfully",
        userTodos:result.userTodos,
        pagination:result.pagination
    })
});
export const getTodoById = asyncHandler(async (req, res) => {
    const todo = await getTodoByIdService(req.params.id, req.user.id);
    return res.status(statusCode.OK).json(apiResponse(message.SUCCESS, message.FETCHED, todo));

})

export const updateTodo=asyncHandler(async(req,res)=>{
    const updatedTodo=await updateTodoService(req.params.id,req.user.id,req.body);
    return res.status(statusCode.OK).json(apiResponse(message.SUCCESS,message.UPDATED,updatedTodo));
})

export const deleteTodo=asyncHandler(async(req,res)=>{
    await deleteTodoService(req.params.id,req.user.id);
    return res.status(statusCode.NO_CONTENT).json(apiResponse(message.SUCCESS,message.DELETED));
});

export const trashTodo=asyncHandler(async(req,res)=>{
    const trashedTodos=await todoTrashService(req.user.id);
    return res.status(statusCode.OK).json(apiResponse(message.SUCCESS,message.FETCHED,trashedTodos)); 
});

export const restoreTodo=asyncHandler(async(req,res)=>{
    const restoredTodo=await restoreTodoService(req.params.id,req.user.id);
    return res.status(statusCode.OK).json(apiResponse(message.SUCCESS,message.RESTORE_TODO));
})

export const permanentDeleteTodo=asyncHandler(async(req,res)=>{
    await permanentDeleteService(req.params.id,req.user.id);
    return res.status(statusCode.NO_CONTENT).json(apiResponse(message.SUCCESS,message.DELETED));
})