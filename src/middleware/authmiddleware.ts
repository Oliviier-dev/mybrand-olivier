import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');

const requireAuth = (req: Request, res: Response, next: (err?: Error) => void) => {

    const token = req.cookies.jwt;

    //check json web token exists and is verified

    if(token){
        jwt.verify(token, 'blog olivier secret', (err: any, decodedToken: any) => {
            if(err){
                console.log(err.message);
                res.redirect('/login');
            } else{
                console.log(decodedToken);
                next();
            }
        })
    }
    else{
        res.redirect('/login');
    }
}

module.exports = { requireAuth };