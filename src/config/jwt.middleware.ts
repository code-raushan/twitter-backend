import JWT from 'passport-jwt';
import passportType from 'passport';
import { User } from '../model/user.model';
import passport from 'passport';

const JwtStartegy = JWT.Strategy;
const ExtractJwt = JWT.ExtractJwt;

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "twitter_secret"
};

export const passportAuth = (passport: typeof passportType)=>{
    try {
        passport.use(new JwtStartegy(opts, async(jwt_payload, done)=>{
            const user = await User.findById(jwt_payload.id);
            if(!user){
                done(null, false)
            }else{
                done(null, user)
            }
        }))
    } catch (error) {
        console.log(error);
        throw error;
    }
}