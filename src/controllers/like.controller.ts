import {Request, Response} from 'express'
import { LikeService } from "../services/like.service";

const likeService = new LikeService();

export const toggleLike = async (req:Request, res: Response)=>{
    try {
        const response = await likeService.toggleLike(req.query.modelId as string, req.query.modelType as 'Tweet' | 'Comment', req.body.userId);
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