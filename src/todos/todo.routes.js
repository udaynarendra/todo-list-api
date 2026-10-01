import express from 'express';
import Validate from '../middlewares/validation.middleware.js';
import authMiddleware from '../auth/auth.middleware.js';
import { createTodoValidation, updateTodoValidation } from './todo.validator.js';
import { createTodo, deleteTodo, getAllTodos, getTodoById, permanentDeleteTodo, restoreTodo, trashTodo, updateTodo } from './todo.controller.js';
export const todoRouter=express.Router();
todoRouter.post('/todos',authMiddleware,Validate(createTodoValidation,'body'),createTodo);
todoRouter.get('/todos',authMiddleware,getAllTodos);
todoRouter.get('/todos/trash',authMiddleware,trashTodo);
todoRouter.get('/todos/:id',authMiddleware,getTodoById);
todoRouter.patch('/todos/:id',authMiddleware,Validate(updateTodoValidation,'body'),updateTodo);
todoRouter.delete('/todos/:id',authMiddleware,deleteTodo);
todoRouter.patch('/todos/:id/restore',authMiddleware,restoreTodo);
todoRouter.delete('/todos/:id/permanent',authMiddleware,permanentDeleteTodo);

