import { Types } from "mongoose"
interface TweetData {
    content: string;
    likes?: string[];
    comments?: string[];
}
