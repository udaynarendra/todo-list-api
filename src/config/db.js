import mongoose from 'mongoose';
import env from './env.js';
import ApiError from '../utils/ApiError.js';
import { statusCode,message } from '../constants/index.js';

const connectDB=async()=>{
    try{
        await mongoose.connect(env.MONGODB_URL);
        console.log('DataBase Connected!!!');
    }
    catch(error){
throw new ApiError(statusCode.SERVER_ERROR,message.SERVER_ERROR);
    }

}
export default connectDB;