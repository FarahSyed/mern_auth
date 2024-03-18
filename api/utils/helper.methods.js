import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";


const SECRET_KEY = process.env.SECRET_KEY;

const cookieExpiry = new Date(Date.now() + 3600000); //  Generate 1 hour expiry for cookie

export const cookieOptions = {
    httpOnly: true,
    expires: cookieExpiry
}

export const toCamelCase = (user) => {
    const { user_name, profile_picture, ...rest } = user;

    const newObj = { 
        ...rest,
        userName: user_name,
        profilePicture: profile_picture,
    };
    
    return newObj;
};

export const verifyUser = (req, res, next) => {

    // Get token from req.cookies.access_token
    const token = req.cookies.access_token;

    // If there is no token throw an error
    if (!token) return next(errorHandler(401, "You are not authenticated"));
    
    jwt.verify(token, SECRET_KEY, (err, user) => {
        // If token could not be verified throw an error
        if (err) return next(errorHandler(403, "Token is not valid"));
        
        // Send the user to the next controller
        req.user = user;
        next();
    });
}