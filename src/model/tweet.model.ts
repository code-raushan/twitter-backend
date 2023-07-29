import mongoose, { Schema } from "mongoose";

const tweetSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        max: [250, "Tweet cannot be more than 250 characters"]
    },
});

export const Tweet = mongoose.model('Tweet', tweetSchema)