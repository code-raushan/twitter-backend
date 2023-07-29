import mongoose from "mongoose";
import { Tweet } from "../model/tweet.model";


export class TweetRepository{
    async create(data:TweetData) {
        try {
            const tweet = await Tweet.create(data);
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }
    async get(id:string) {
        try {
            const tweet = await Tweet.findById(id);
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }
    async destroy(id:string) {
        try {
            const tweet = await Tweet.findByIdAndRemove(id);
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }
    async getAll(offset:number, limit:number) {
        try {
            const tweet = await Tweet.find().skip(offset).limit(limit);
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }

}