import { User } from "../model/user.model";
import { UserRepository } from "../repository/user.repository";

export class UserService{
    userRepository;
    constructor(){
        this.userRepository = new UserRepository();
    };
    async signup(data: UserType){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            throw error
        }
    }
    async getUserByEmail(email: string){
        try {
            const user = await this.userRepository.findBy({email});
            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async signin(data: {email: string, password: string}){
        try {
            const user = await this.getUserByEmail(data.email);
            if(!user){
                throw {
                    message: 'no user found'
                }
            }
            if(!user.comparePassword(data.password)){
                throw{
                    message: 'incorrect password'
                }
            }
            const token = user.getJWT();
            return token;
        } catch (error) {
            
        }
    }
};

