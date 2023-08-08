import { Types } from "mongoose";
import { LikeRepository } from "../repository/like.repository";
import { TweetRepository } from "../repository/tweet.repository";
import { CommentRepository } from "../repository/comment.repository";


export class LikeService{
    tweetRepository
    likeRepository
    commentRepository
    constructor(){
        this.likeRepository = new LikeRepository();
        this.tweetRepository = new TweetRepository();
        this.commentRepository = new CommentRepository()
    };
    async toggleLike(modelId: string, modelType: 'Tweet' | 'Comment', userId: Types.ObjectId){
        
        // checking if like from the current user exist on the model instance or not
        const exists = await this.likeRepository.findByUserAndMod({
            user: userId as unknown as string,
            onMod: modelType,
            mod: modelId as string
        });
        // if exist, we remove the like from that
        
        // finding the likes on a tweet or comment
        if(modelType == 'Tweet') {
            let likedModel = await this.tweetRepository.find(modelId); // finding and populating with likes
            if(exists) {
                await likedModel?.updateOne({ $pull: { likes: exists.id } });
                
                await likedModel?.save();
                await exists.deleteOne();
                var isAdded = false;
    
            } else {
    
                // create new like        
                const newLike = await this.likeRepository.create({
                    user: userId as unknown as string,
                    onMod: modelType,
                    mod: modelId as string
                });
                likedModel?.likes!.push(newLike.id);
                await likedModel?.save();
                var isAdded = true;
            }
        } else if(modelType == 'Comment') {
            // TODO
            let likedModel = await this.commentRepository.find(modelId)
            if(exists) {
                await likedModel?.updateOne({ $pull: { likes: exists.id } });
                
                await likedModel?.save();
                await exists.deleteOne();
                var isAdded = false;
    
            } else {
    
                // create new like        
                const newLike = await this.likeRepository.create({
                    user: userId as unknown as string,
                    onMod: modelType,
                    mod: modelId as string
                });
                likedModel?.likes.push(newLike.id);
                await likedModel?.save();
                var isAdded = true;
            }
        } else {
            throw new Error('unknown model type');
        }
        return isAdded;
    }
}