import Todo from './todo.model.js';
export const createtodo=async(data)=>{
    return await Todo.create(data);
}
export const findById=async(todoId,userId)=>{
return await Todo.findOne({_id:todoId,user:userId,isDeleted:false}).select("title description status priority dueDate ispinned");
}
export const findAllTodos = async (userId, filters) => {

  const query = {
    user: userId,
    isDeleted: { $ne: true }
  };

  if (filters.status!==undefined) {
    query.status = filters.status;
  }

  if (filters.priority!==undefined) {
    query.priority = filters.priority;
  }

  if (filters.ispinned !== undefined) {
    query.ispinned = filters.ispinned === "true";
  }

  if (filters.isAchieved !== undefined) {
    query.isAchieved = filters.isAchieved === "true";
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
const sortBy = filters.sortBy || "createdAt";

const sortOrder = filters.order === "asc" ? 1 : -1;

const sort = {
  [sortBy]: sortOrder
};
  return Todo.find(query)
  .select("title description status priority dueDate ispinned")
    .sort(sort)
    .skip(skip)
    .limit(limit)
};
//couting Total Todos
export const countTodos=async(userId)=>{
  return Todo.countDocuments({user:userId,isDeleted: { $ne: true }});
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
  return Todo.findOneAndUpdate({_id:todoId,user:userId,isDeleted: { $ne: true }},{$set:data},{returnDocument:'after'});
}
export const softDeleteTodo=async(todoId,userId)=>{
  return Todo.findOneAndUpdate({_id:todoId,user:userId,isDeleted: { $ne: true }},{$set:{isDeleted:true,deletedAt:new Date(Date.now())}},{returnDocument:'after'});
}

export const getTrashTodos=async(userId)=>{
  return Todo.find({user:userId,isDeleted:{$ne:false}})
  .select("title description status priority dueDate ispinned")
};