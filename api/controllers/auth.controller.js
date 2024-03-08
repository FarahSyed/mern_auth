import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
    const { userName, email, password } = req.body || {};
    if(!userName || !email || !password) {
        next(errorHandler(403, "Required fields are missing"));
        return;
    }

    try {
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({ user_name: userName, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({
            message: "User Signed Up Successfully",
        });
    } catch (error) {
        next(error);
    }
}