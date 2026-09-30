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
//pagination
const page=Number(filters.page) ||1;
const limit=Number(filters.limit)||10;
const skip=(page-1)*limit;
//sorting
const sortOrder=filters.order==='asc'? 1 : -1;
const sort={[filters.sortBy]:sortOrder} ||
{ createdAt: -1 };
  return Todo.find(query)
  .select("title description status priority dueDate ispinned")
    .sort(sort)
    .skip(skip)
    .limit(limit)
};
//couting Total Todos
export const countTodos=async(userId)=>{
  return Todo.countDocuments({user:userId});
}

export const updateUserTodo=async(todoId,userId,validateData)=>{
     const data={};
    if(validateData.status!==undefined){
        data.status=validateData.status
    }
    if(validateData.priority!==undefined){
        data.priority=validateData.priority;
    }
    if(validateData.dueDate!==undefined){
        data.dueDate=validateData.dueDate
    }
    if(validateData.ispinned!==undefined){
      data.ispinned=validateData.ispinned;
    }
      if(validateData.status?.toLowerCase()==='completed'){
      data.completedAt=new Date(Date.now());
    }
    if (validateData.status?.toLowerCase() !== "completed") {
    data.completedAt = null;
}
  return Todo.findOneAndUpdate({_id:todoId,user:userId},{$set:data},{returnDocument:'after'});
}