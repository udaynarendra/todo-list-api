import ApiError from '../utils/ApiError.js';
import {statusCode} from '../constants/index.js';
const validate=async(schema,property='body')=>{
    return (req,res,next)=>{
      const {error,value}=await schema.validateAsync(req[body],{
        abortEarly:false,
        allowUnknown:false,
        stripeUnknown:true  
      });
      if(error){
        throw new ApiError(statusCode.BAD_REQUEST,error.details.map(err=>err.message));
      } 
      req[property]=value;
      next();
    }
}
export default validate;