import { Request, Response, NextFunction } from "express";
import passport from "passport";

export const authenticate = (req:Request, res:Response, next: NextFunction)=>{
    passport.authenticate('jwt', (err:Error, user:UserType)=>{
        if(err) next(err);
        if(!user){
            return res.status(401).json({
                message: "Unauthorised access: no token"
            })
        }
        req.user = user;
        next();
    })(req, res, next)
}