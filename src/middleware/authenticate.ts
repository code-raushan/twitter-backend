import { Request, Response, NextFunction } from "express";
import passport from "passport";

export const authenticate = (req:Request, res:Response, next: NextFunction)=>{
    passport.authenticate('jwt', (err:Error, user:any)=>{
        console.log('inside authenticate');
        if(err){
            console.log(err);
            next(err)
        };
        console.log(user);
        if(!user){
            return res.status(401).json({
                message: "Unauthorised access: no token"
            })
        }
        console.log(user);
        req.user = user;
        next();
    })(req, res, next)
}