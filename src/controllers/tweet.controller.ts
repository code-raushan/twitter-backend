import express, {Request, Response} from 'express';
import { TweetService } from '../services/tweet.service';

const tweetService = new TweetService();

export const createTweet = async (req:Request, res:Response)=>{
    try {
        const response = await tweetService.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Created Tweet Successfully',
            data: response
        })
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Something went wrong',
            data: {}
        });
    };
};

export const getTweet = async(req:Request, res:Response)=>{
    try {
        const response = await tweetService.get(req.params.id);
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched a tweet',
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
