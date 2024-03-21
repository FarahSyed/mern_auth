import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { cookieOptions, toCamelCase } from "../utils/helper.methods.js";

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

        // Destructure Password to exclude it from User Object
        let { password: hashedPassword, ...user } = validUser._doc;   // Remember to include ._doc
        
        // Convert snake_case to camelCase before sending to Front-End
        user = toCamelCase(user);

        // Send the Response to FrontEnd
        res
        .cookie('access_token', token, cookieOptions)
        .status(200)
        .json(user);

    } catch(error) {
        next(error);
    }
}

export const google = async (req, res, next) => {
    const { name, email, photo } = req.body || {};
    try {
        const validUser = await User.findOne({email});

        if(validUser) {
            // Sign the JWT token
            const token = jwt.sign({ id: validUser._id }, SECRET_KEY);

            // Destructure Password to exclude it from the user object
            let { password: hashedPassword2, ...user } = validUser._doc;   // Remember to include ._doc
            
            // Convert snake_case to camelCase before sending to Front-End
            user = toCamelCase(user);
            
            // Send the response to FrontEnd
            res
            .cookie('access_token', token, cookieOptions)
            .status(200)
            .json(user);

        } else {    // If user does not exists, register the user
            
            // Generate a random password for the user which can be updated later
            const generatedPassword = Math.random().toString(36).slice(-8) + 
            Math.random().toString(36).slice(-8); //  In .toString(36) 36 means num from 0-9 and alphabets a-z and in .slice(-8) is copying the last 8 characters
            
            // Hash the generated password
            const hashedPassword = await bcryptjs.hash(generatedPassword, 10);
            
            // Create a new user
            const newUser = new User({
                user_name: name.split(" ").join("").toLowerCase() + Math.floor(Math.random() * 10000).toString(),   // Generate a random username
                email,
                password: hashedPassword,
                profile_picture: photo,
            });

            // Save the new user to database
            await newUser.save();
            
            // Sign the JWT token
            const token = jwt.sign({ id: newUser._id }, SECRET_KEY);
            
            // Destructure Password to exclude it from the user object
            let { password: hashedPassword2, ...user } = newUser._doc;   // Remember to include ._doc
            
            // Convert snake_case to camelCase before sending to Front-End
            user = toCamelCase(user);

            // Send the response to FrontEnd
            res
            .cookie('access_token', token, cookieOptions)
            .status(200)
            .json(user);
        }
            
    } catch (error) {
        next(error);
    }
}

export const signout = (req, res, next) => {
    res.clearCookie('access_token').status(200).json('Signed out successfully');
}