import { Types } from "mongoose";
import { Like } from "../model/like.model";
import { LikeType } from "../types/like";

interface LikedBy{
    user: string; // user
    onMod: string; // which model
    mod: string; // model instance id
}

export class LikeRepository{

    async findByUserAndMod(data:LikedBy){
        try {
            const like = await Like.findOne(data);
            // console.log("like", like);
            return like;
        } catch (error) {
            console.log("Something went wrong");
        }
    }

    async create(data:LikeType){
        try {
            const result = await Like.create(data);
            return result;
        } catch (error) {
            console.log("Something went wrong");
            throw error;
        }
    };
    async destroy(id: Types.ObjectId){
        try {
            const result = await Like.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.log("Something went wrong");
            throw error;
        }
    };
    async get(id: Types.ObjectId){
        try {
            const result = await Like.findById(id);
            return result;
        } catch (error) {
            console.log("Something went wrong");
            throw error;
        }
    }
    async getAll(){
        try {
            const result = await Like.find({});
            return result;
        } catch (error) {
            console.log("Something went wrong");
            throw error;
        }
    }
}