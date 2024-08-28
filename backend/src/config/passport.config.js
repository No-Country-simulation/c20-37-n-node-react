import passport from 'passport';
import passportLocal from 'passport-local';
import userService from '../modules/session/session.services.js';
import { createHash, isValidPassword } from '../utils/hashPassword.js';

const LocalStrategy = passportLocal.Strategy;


export const initializePassport = () => {
    passport.use("register", new LocalStrategy({passReqToCallback:true, usernameField: 'email' }, async (req,username, password, done) => {
        try {
            const {firstName, lastName}= req.body;
            const user = await userService.getByEmail(username);
            if (user) { return done(null,false,{message:"User already exists"});}
            const newUser ={
                firstName,
                lastName,
                email:username,
                password: createHash(password)
            }
            const userCreate = await userService.create(newUser)
            return done(null,userCreate);
        } catch (error) {
            return done(error)
        }
    }));

    passport.serializeUser((user,done)=>{
        done(null,user._id);
    });
    passport.deserializeUser(async(id,done)=>{
        try {
            const user = await userService.getById(id);
            done(null,user);
        } catch (error) {
            done(error)
        }
    })
}