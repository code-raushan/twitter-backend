import {Request, Response} from 'express'
import { CommentService } from "../services/comment.service";

const commentService = new CommentService();

export const createComment = async(req:Request, res:Response)=>{
    try {
        console.log(req.user);
        const response = await commentService.create(req.query.modelId as string, req.query.modelType as "Tweet" | "Comment", req.body.userId, req.body.content);
        return res.status(201).json({
            success: true,
            message: 'Successfully created a new comment',
            data: response,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'something went wrong',
            data: {},
            err: error
        });
    }
}