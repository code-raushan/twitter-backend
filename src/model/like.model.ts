import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
    onMod: {
        type: String,
        required: true,
        enum: ['Tweet', 'Comment']
    },
    mod: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onMod'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
{
    timestamps: true,
})
export const Like = mongoose.model('Like', likeSchema);