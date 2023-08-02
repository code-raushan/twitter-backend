import {Request, Response} from 'express'
import { LikeService } from "../services/like.service";
import { Types } from 'mongoose';
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { UserType } from '../types/user';

const likeService = new LikeService();



interface AuthReq extends Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
    user?: Partial<UserType>;
}

export const toggleLike = async (req:AuthReq, res: Response)=>{
    try {
        console.log('req user', req?.user?._id);
        const response = await likeService.toggleLike(req.query.modelId as string, req.query.modelType as 'Tweet' | 'Comment', req?.user?._id!);

        return res.status(200).json({
            success: true,
            data: response,
            err: {},
            message: 'Successfully toggled like'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            data: {},
            message: 'Something went wrong',
            err: error
        })
    }
}