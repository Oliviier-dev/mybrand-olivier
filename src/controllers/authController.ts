import { Request, Response } from 'express';
const User = require('../models/user');
import dotenv from "dotenv";
const jwt = require('jsonwebtoken');


// CONFIGURE DOTENV
dotenv.config();


const maxAge = 3 * 24 * 60 * 60;

const createToken = (id:any, role: any) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn:  maxAge
    })
}


module.exports.signup_get = (req: Request, res: Response) => {
    res.send('Signup get');
}

module.exports.login_get = (req: Request, res: Response) => {
    res.send('login get');
}

module.exports.signup_post = async(req: Request, res: Response) => {
    const { email, password, role } = req.body;
    
    try {

        const user = await User.create({ email, password, role });
        res.status(201).json({ user: { _id: user._id, email: user.email, role: user.role } });

    } catch (err) {

        console.log(err);
        res.status(400).send('error, user not created');

    }

}

module.exports.login_post = async(req: Request, res: Response) => {
    const { email, password } = req.body;
    try {

        const user = await User.login(email, password);
        const token = createToken(user._id, user.role);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(200).json({ user: { _id: user._id, email: user.email, role:user.role }, token });

    } catch (error) {

        //res.status(400).send('error, user not Logged In');
        res.status(400).json({ error: 'Error logging in. Please check your credentials.' });
        
    }
}


module.exports.logout = (req: Request, res: Response) => {
    res.cookie('jwt', "", { maxAge: 1 });
    res.send('Logged out successfully')
}


module.exports.allUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({}, '-password');
        res.send(users);
    } catch (err) {
        res.status(400).json({ err: 'Error retrieving the users' });
    }
}

module.exports.updateUserRole = async(req: Request, res: Response) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId);
    
        if (!user) {
            return res.status(404).json({ message: "User not found" + userId, userId: userId });
        }
    
        const userNewRole = (user.role === 'admin') ? 'user' : 'admin';
        
        await User.findByIdAndUpdate(userId, { role: userNewRole });
    
        res.status(200).json({ message: "User role updated successfully" });
    } catch (error) {
        console.error("Error updating user role:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports.deleteUser = async(req: Request, res: Response) => {
    const userId = req.params.userId;
    try {
        const deletedUser = await User.findByIdAndDelete(userId).select('-password');
        res.send(deletedUser);
    } catch (err) {
        console.error("Error deleting user:", err);
    }
}