import {Request, Response} from 'express';
import { UserService } from "../services/user.service";

const userService = new UserService();

export const signup = async(req:Request, res:Response)=>{
    try {
        const response = await userService.signup({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name
        });
        return res.status(201).json({
            success: true,
            message: 'Successfully created a new user',
            data: response,
            err: {}
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        })
    }
}
export const login = async(req:Request, res:Response)=>{
    try {
        const token = await userService.signin(req.body);
        console.log(token);
        return res.status(200).json({
            success: true,
            message: "Successfully logged in",
            data: token,
            err: {}
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            data: {},
            success: false,
            err: error
        })
    }
}