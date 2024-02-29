import { Request, Response } from 'express';

module.exports.signup_get = (req: Request, res: Response) => {
    res.send('Signup get');
}

module.exports.login_get = (req: Request, res: Response) => {
    res.send('login get');
}

module.exports.signup_post = (req: Request, res: Response) => {
    res.send('New signup');
}

module.exports.login_post = (req: Request, res: Response) => {
    res.send('user login');
}