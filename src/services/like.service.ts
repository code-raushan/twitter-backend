import { Types } from "mongoose";
import { LikeRepository } from "../repository/like.repository";
import { TweetRepository } from "../repository/tweet.repository";
import { TweetData } from "../types/tweet";
import { Tweet } from "../model/tweet.model";
import { LikeType } from "../types/like";

export class LikeService{
    TweetRepository
    LikeRepository
    constructor(){
        this.LikeRepository = new LikeRepository();
        this.TweetRepository = new TweetRepository();
    };
    async toggleLike(modelId: Types.ObjectId, modelType: string, userId: Types.ObjectId){
        if(modelType == 'Tweet') {
            var likeable = await this.TweetRepository.find(modelId);
        } else if(modelType == 'Comment') {
            // TODO
        } else {
            throw new Error('unknown model type');
        }
        const exists = await this.LikeRepository.findByUserAndMod({
            user: userId,
            onMod: modelType,
            mod: modelId
        });
        if(exists) {
            await likeable?.updateOne({ $pull: { likes: exists.id } });
            
            await likeable?.save();
            await exists.deleteOne();
            var isAdded = false;

        } else {
            const newLike = await this.LikeRepository.create({
                user: userId,
                onMod: modelType,
                mod: modelId
            });
            likeable?.likes.push(newLike.id);
            await likeable?.save();
            var isAdded = true;
        }
        return isAdded;

    }
}