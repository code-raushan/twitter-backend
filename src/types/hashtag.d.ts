import { Types } from "mongoose";

interface HashtagType {
    title: string;
    tweets: Tweet[]
}
interface Tweet{
    id: string;
}
