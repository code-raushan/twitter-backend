import { User } from "../model/user.model";

export class UserRepository{
    async create(data: UserType){
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log(error);
        }
    }
    async get(id: string){
        try {
            const user = await User.findById(id);
            return user;
        } catch (error) {
            console.log(error);
        }
    }
    async destroy(id:string){
        try {
            const user = await User.findByIdAndDelete(id);
            return user;
        } catch (error) {
            console.log(error)
        }
    }
    async update(id: string, data: {name?: string, email?: string}){
        try {
            const updatedUser = await User.findByIdAndUpdate(id, data);
            return updatedUser;
        } catch (error) {
            console.log(error)
        }
    }
    async findBy(data: {email: string}){
        try {
            const response = await User.findOne(data);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}