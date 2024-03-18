import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js"
import { toCamelCase } from "../utils/helper.methods.js";


export const test = (req, res, next) => {
    res.json({
        message: 'API is working',
    })
}

// Update user
export const updateUser = async (req, res, next) => {
    // Destructure coming data from req.body
    const { userName, email, password, profilePicture } = req.body || {};
    
    // Don't allow any user to update someone else's account
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, "You can only update your account"));
    }
    
    try {
        // If password is given hash the password
        if (password) password = await bcryptjs.hash(password, 10);
        
        // Update the fields given by the user
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, {
                $set: {
                    user_name: userName,
                    email,
                    password,
                    profile_picture: profilePicture,
                }
            },
            {new: true}
        );

        // Destructure Password to exclude it from User Object
        let {password: pass, ...user} = updatedUser._doc;
        
        // Convert snake_case to camelCase before sending to Front-End
        user = toCamelCase(user);

        // Send the response to FrontEnd
        res.status(200).json(user);
    }
     catch (error) {
        next(error);
    }
}