import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    onMod: {
        type: String,
        required: true,
        enum: ['Tweet', 'Comment'],
    },
    mod:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onMod'
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]
},
    {
        timestamps: true,
    }
);

export const Comment = mongoose.model('Comment', commentSchema)