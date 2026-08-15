import app from './src/app.js';
import env from './src/config/env.js';
import connectDB from './src/config/db.js';
import ApiError from './src/utils/ApiError.js';
import {message} from './src/constants/index.js';
function start(){
    try{
        connectDB();
        app.listen(env.PORT,()=>console.log('server is running on 5000 port'));
    }
    catch(error){
        throw new ApiError(env.SERVER_ERROR,message.SERVER_ERROR);
        process.exit(0)
    }
}
start();
