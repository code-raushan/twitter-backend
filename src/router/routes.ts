import express from 'express';
import { createTweet, getTweet } from '../controllers/tweet.controller';
import { toggleLike } from '../controllers/like.controller';
import { createComment } from '../controllers/comment.controller';

const router = express.Router();

router.get('/tweets/:id', getTweet)

router.post('/tweet', createTweet);
router.post('/likes/toggle', toggleLike)
router.post('/comments', createComment)

export default router;