import mongoose from "mongoose";
import { Hashtag } from "../model/hashtag.model";


export class HashtagRepository{
    async create(data:Hashtag) {
        try {
            const tag = await Hashtag.create(data);
            return tag;
        } catch (error) {
            console.log(error);
        }
    }

    async bulkCreate(data:Hashtag[]) {
        try {
            console.log(data);
            const tags = await Hashtag.insertMany(data);
            return tags;
        } catch (error) {
            console.log(error);
        }
    }

    async get(id:string) {
        try {
            const tag = await Hashtag.findById(id);
            return tag;
        } catch (error) {
            console.log(error);
        }
    }

    async destroy(id:string) {
        try {
            const response = await Hashtag.findByIdAndRemove(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async findByName(titleList: string[]) {
        try {
            const tags = await Hashtag.find({
                title: titleList
            });
            return tags;
        } catch (error) {
            console.log(error);
        }
    }
}