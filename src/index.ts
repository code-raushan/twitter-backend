import { Types } from "mongoose";
import app from "./app";
import { connectToDB } from "./config/db";
import { User } from "./model/user.model";
import { LikeRepository } from "./repository/like.repository";
import { LikeService } from "./services/like.service";
import { TweetService } from "./services/tweet.service";
import { Tweet } from "./model/tweet.model";
const PORT = 8080

app.listen(PORT, async ()=>{
    console.log(`Server running at http://localhost:${PORT}`);
    connectToDB();
    // const likeservice = new LikeService();
    // const tweetservice = new TweetService();

    // const user = await User.create({
    //     email: "raushan@gmail.com",
    //     name: "raushan123",
    //     password: "raushan@123"
    // });
    // const users = await User.find({});
    // const tweet = await Tweet.find({})
    // const checkLike = await likeservice.toggleLike(tweet[0]?._id as Types.ObjectId, 'Tweet', users[0]._id);



});