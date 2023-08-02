import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { UserType } from "../types/user";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";


interface AuthReq extends Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
    user?: Partial<UserType>;
}

export const authenticate = (req:AuthReq, res:Response, next: NextFunction)=>{
    passport.authenticate('jwt', (err:Error, user:UserType)=>{
        console.log('inside authenticate');
        if(err){
            console.log(err);
            next(err)
        };
        if(!user){
            return res.status(401).json({
                message: "Unauthorised access: no token"
            })
        }
        req.user = user;
        return next();
    })(req, res, next)
}