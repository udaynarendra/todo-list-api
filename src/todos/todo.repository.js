import Todo from './todo.model.js';
export const createtodo=async(data)=>{
    return await Todo.create(data);
}
export const findById=async(todoId,userId)=>{
return await Todo.findOne({_id:todoId,user:userId}).select("title description status priority dueDate ispinned");
}
export const findAllTodos = async (userId, filters) => {

  const query = {
    user: userId
  };

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.priority) {
    query.priority = filters.priority;
  }

  if (filters.isPinned !== undefined) {
    query.isPinned = filters.isPinned === "true";
  }

  if (filters.isArchived !== undefined) {
    query.isArchived = filters.isArchived === "true";
  }

  if (filters.search) {
    query.$or = [
      {
        title: {
          $regex: filters.search,
          $options: "i"
        }
      },
      {
        description: {
          $regex: filters.search,
          $options: "i"
        }
      }
    ];
  }

  return Todo.find(query)
    .sort({ createdAt: -1 });
};