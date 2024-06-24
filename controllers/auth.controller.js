import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
const auth = async(req, res)=>{  
    const {username, email, password} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({username, email, password:hashedPassword})
    try {
        
        await newUser.save();
        res.status(201).json({message: 'Successfully created new user.'});
    } catch (error) {
        res.status(500).json(error.message)
    }
}
export default auth;