import { Request, Response } from 'express';
const User = require('../models/user');
const jwt = require('jsonwebtoken');


const maxAge = 3 * 24 * 60 * 60;

const createToken = (id:any) => {
    return jwt.sign({ id }, 'blog olivier secret', {
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
    const { email, password } = req.body;
    
    try {
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(201).json({user: user._id});
    } catch (err) {
        console.log(err);
        res.status(400).send('error, user not created');
    }

}

module.exports.login_post = async(req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(200).json({ user: user._id });
    } catch (error) {
        res.status(400).send('error, user not Logged In');
    }
}