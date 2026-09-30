import Joi from 'joi';
export const createTodoValidation=Joi.object({
    title:Joi.string().trim().required(),
    description:Joi.string().trim().required(),
    priority:Joi.string().valid('low','medium','high').optional(),
    dueDate:Joi.date().optional().allow(null),
});

export const updateTodoValidation=Joi.object({
    status:Joi.string().lowercase().valid('pending','in-progress','completed').optional(),
    priority:Joi.string().lowercase().valid('low','medium','high').optional(),
    dueDate:Joi.date().optional().allow(null),
    ispinned:Joi.boolean().optional()
}).min(1);