import express from 'express';
import { createTweet, getTweet } from '../controllers/tweet.controller';
import { toggleLike } from '../controllers/like.controller';
import { createComment } from '../controllers/comment.controller';
import { login, signup } from '../controllers/user.controller';
import { authenticate } from '../middleware/authenticate';


const router = express.Router();

router.get('/tweets/:id', getTweet)

router.post('/tweet', createTweet);
router.post('/likes/toggle', authenticate, toggleLike);
router.post('/comments', authenticate, createComment);
router.post('/signup', signup);
router.post('/signin', login);

export default router;