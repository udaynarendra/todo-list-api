import jwt from 'jsonwebtoken';
import env from '../config/env.js';
const createRefreshToken=(id)=>{
    return jwt.sign({id},env.REFRESH_TOKEN_SECRET,{expiresIn:env.REFRESH_TOKEN_EXPIRES});
}
const createAccessToken=(email,id,name)=>{
    return jwt.sign({id},env.ACCESS_TOKEN_SECRET,{expiresIn:env.ACCESS_TOKEN_EXPIRES});
}


export {createAccessToken,createRefreshToken};
