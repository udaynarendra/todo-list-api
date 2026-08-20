import jwt from "jsonwebtoken";
import env from '../config/env.js';
import {statusCode,message} from '../constants/index.js';
import apiResponse from "../utils/apiResponse.js";

const authMiddleware = (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(statusCode.UNAUTHORIZED).json(apiResponse(message.FAILED,message.AUTHENTICATION_REQUIRED));
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    // Attach user to request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(statusCode.UNAUTHORIZED).json(message.FAILED,message.INVALID_OR_EXPIRED_TOKEN);
  }
};

export default authMiddleware;