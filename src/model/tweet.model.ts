import mongoose, { Schema, Types } from "mongoose";

interface ITweet extends Document{
    content: string;
    likes?: Types.ObjectId[];
    comments?: Types.ObjectId[];
    image?: string;
}

const tweetSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        max: [250, "Tweet cannot be more than 250 characters"]
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    image: {
        type: String,
    }
},
{
    timestamps: true
}
);

export const Tweet = mongoose.model<ITweet>('Tweet', tweetSchema)