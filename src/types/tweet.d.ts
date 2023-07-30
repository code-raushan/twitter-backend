import { Types } from "mongoose"
interface TweetData {
    content: string;
    likes?: Types.Array<Types.ObjectId>;
}
