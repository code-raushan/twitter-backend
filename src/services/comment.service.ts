import { CommentRepository } from "../repository/comment.repository";
import { TweetRepository } from "../repository/tweet.repository";
import { TweetData } from "../types/tweet";
import { Types } from "mongoose";
export class CommentService {
  tweetRepository;
  commentRepository;
  constructor() {
    this.tweetRepository = new TweetRepository();
    this.commentRepository = new CommentRepository();
  }
  async create(
    modelId: string,
    modelType: 'Tweet' | 'Comment',
    userId: string,
    content: string
  ) {
    
    const comment = await this.commentRepository.create({
        content: content,
        userId: userId,
        onMod: modelType,
        mod: modelId,
        comments: []
    });
    
    if(modelType==='Tweet'){
        let commentedMod = await this.tweetRepository.get(modelId);
        commentedMod?.comments.push(comment?.id);
        await commentedMod?.save();
    }else if(modelType==='Comment'){
        let commentedMod = await this.commentRepository.get(modelId);
        commentedMod?.comments.push(comment?.id);
        await commentedMod?.save();
    }else{
        throw new Error('Unknown Model Type');
    };
    return comment;

  }
}
