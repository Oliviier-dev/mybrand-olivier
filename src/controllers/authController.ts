import { Request, Response } from 'express';
const User = require('../models/user');

module.exports.signup_get = (req: Request, res: Response) => {
    res.send('Signup get');
}

module.exports.login_get = (req: Request, res: Response) => {
    res.send('login get');
}

module.exports.signup_post = async(req: Request, res: Response) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.create({ email, password });
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(400).send('error, user not created');
    }

}

module.exports.login_post = async(req: Request, res: Response) => {
    res.send('user login');
}