import ApiError from "../utils/ApiError.js";
import apiResponse from "../utils/apiResponse.js";
const errorHandler=(err,req,res,next)=>{
    let error=err;
    if(!(error instanceof ApiError)){
        const statusCode=error.statusCode||500;
        const message=error.message||'Internal Server Error';
        error=new ApiError(statusCode,message,err?.errors||[])
    }
    return res.status(error.statusCode).json(apiResponse(error.success,error.message));
}
export default errorHandler;