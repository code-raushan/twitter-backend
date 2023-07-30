import { Comment } from "../model/comment.model";



export class CommentRepository{
    async create(data: CommentType){
        try {
            const comment = await Comment.create(data);
            return comment;
        } catch (error) {
            console.log(error);
        }
    }
    async get(id: string){
        try {
            const comment = await Comment.findById(id);
            return comment;
        } catch (error) {
            console.log(error);
        }
    }
    async destroy(id: string){
        try {
            const comment = await Comment.findByIdAndDelete(id);
            return comment;
        } catch (error) {
            console.log(error);
        }
    }
    async getAll(offset: number, limit: number){
        try {
            const comments = await Comment.find().skip(offset).limit(limit);
            return comments;
        } catch (error) {
            console.log(error);
        }
    }
    async find(id: string){
        try {
            const comment = await Comment.findById(id).populate({path: 'likes'});
            return comment;
        } catch (error) {
            console.log(error);
        }
    }
}