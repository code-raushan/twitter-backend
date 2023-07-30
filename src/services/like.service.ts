import { Types } from "mongoose";
import { LikeRepository } from "../repository/like.repository";
import { TweetRepository } from "../repository/tweet.repository";


export class LikeService{
    TweetRepository
    LikeRepository
    constructor(){
        this.LikeRepository = new LikeRepository();
        this.TweetRepository = new TweetRepository();
    };
    async toggleLike(modelId: string, modelType: string, userId: Types.ObjectId){
        // finding the likes on a tweet or comment
        if(modelType == 'Tweet') {
            var likedModel = await this.TweetRepository.find(modelId); // finding and populating with likes
        } else if(modelType == 'Comment') {
            // TODO
        } else {
            throw new Error('unknown model type');
        }
        // checking if like from the current user exist on the model instance or not
        const exists = await this.LikeRepository.findByUserAndMod({
            user: userId as unknown as string,
            onMod: modelType,
            mod: modelId as string
        });
        // if exist, we remove the like from that
        if(exists) {
            await likedModel?.updateOne({ $pull: { likes: exists.id } });
            
            await likedModel?.save();
            await exists.deleteOne();
            var isAdded = false;

        } else {

            // create new like        
            const newLike = await this.LikeRepository.create({
                user: userId as unknown as string,
                onMod: modelType,
                mod: modelId as string
            });
            likedModel?.likes.push(newLike.id);
            await likedModel?.save();
            var isAdded = true;
        }
        return isAdded;
    }
}