import { Document, Types} from "mongoose";

interface UserType{
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
}