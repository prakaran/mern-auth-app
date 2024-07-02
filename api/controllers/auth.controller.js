import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from "../utils/error.js";
export const signup = async(req, res, next)=>{  
    const {username, email, password} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({username, email, password:hashedPassword})
    try {
        
        await newUser.save();
        res.status(201).json({message: 'Successfully created new user.'});
    } catch (error) {
        next(error);
    }
}

export const signin = async(req, res, next)=>{
    const {email, password} = req.body;
    try {
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorHandler(404, 'User not found.'));
        }
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if(!validPassword){
            return next(errorHandler(401, 'Invalid Credentials'));
        }
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
        const {password: hashedPassword, ...rest} = validUser._doc;
        const expiryDate = new Date(Date.now() + 3600000);
        res.cookie('access_token', token, {httpOnly: true, expires: expiryDate}).status(200).json(rest);
    } catch (error) {
        next(error);
    }
}