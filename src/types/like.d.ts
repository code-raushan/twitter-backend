import { Types } from "mongoose";

interface LikeType{
    onMod: string;
    mod: Types.ObjectId;
    user: Types.ObjectId;
}