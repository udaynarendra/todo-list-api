import express from 'express';
import Validate from '../middlewares/validation.middleware.js';
import authMiddleware from '../auth/auth.middleware.js';
import { createTodoValidation } from './todo.validator.js';
import { createTodo, getAllTodos, getTodoById } from './todo.controller.js';
export const todoRouter=express.Router();
todoRouter.post('/todos',authMiddleware,Validate(createTodoValidation,'body'),createTodo);
todoRouter.get('/todos',authMiddleware,getAllTodos);
todoRouter.get('/todos/:id',authMiddleware,getTodoById);
