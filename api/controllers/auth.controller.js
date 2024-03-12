import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;

export const signup = async (req, res, next) => {
    // Destructure coming data from req.body and check if the required fields are not empty
    const { userName, email, password } = req.body || {};
    if(!userName || !email || !password) return next(errorHandler(403, "Required fields are missing"));

    try {
    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);
    
    // Convert camelCamel to snake_case and save the new user to Database
    const newUser = new User({ user_name: userName, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({
            message: "User Signed Up Successfully",
        });
    } catch (error) {
        next(error);
    }
}

export const signin = async (req, res, next) => {
    // Destructure coming data from req.body and check if the required fields are not empty
    const { userName, email, password } = req.body || {};
    if (!userName && !email || !password) return next(errorHandler(403, "Required fields are missing"));
    
    try {
        // Check if the given user_name or email exists in the Database
        const validUser = await User.findOne({ $or: [{email}, {user_name: userName}]});
        if(!validUser) return next(errorHandler(401, "Invalid user credentials"));
        
        // Compare the given password with users password
        const validPassword = await bcryptjs.compare(password, validUser.password);
        if(!validPassword) return next(errorHandler(401, "Invalid user credentials"));
        
        // Sign the JSON Web Token
        const token =  jwt.sign({ id: validUser._id }, SECRET_KEY);

        // Destructuring Password to exclude from User Object before sending to Database
        const { password: hashedPassword, ...user } = validUser._doc;   // Remember to include ._doc

        const cookieExpiry = new Date(Date.now() + 3600000); //  1 hour
        
        // Send the Response to FrontEnd
        res
        .cookie('access_token', token, {httpOnly: true, expires: cookieExpiry})
        .status(200)
        .json(user);

    } catch(error) {
        next(error);
    }
}