import Joi from 'joi';
export const createTodoValidation=Joi.object({
    title:Joi.string().trim().required(),
    description:Joi.string().trim().required(),
    priority:Joi.string().valid('low','medium','high').optional(),
    dueDate:Joi.date().optional().allow(null),
});