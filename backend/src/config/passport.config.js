import passport from 'passport';
import passportLocal from 'passport-local';
import passportCustom from 'passport-custom';
import userService from '../modules/session/session.services.js';
import { createHash, isValidPassword } from '../utils/hashPassword.js';
import { cookieExtractor } from '../utils/cookieExtractor.js';
import { verifyToken } from '../utils/jwt.js';
import sendEmail from '../utils/sendEmail.js';

const LocalStrategy = passportLocal.Strategy;
const CustomStrategy = passportCustom.Strategy;


export const initializePassport = () => {
    passport.use("register", new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
        try {
            const { firstName, lastName, phone } = req.body;
            const user = await userService.getByEmail(username);
            if (user) { return done(null, false, { message: "User already exists" }); }
            const newUser = {
                firstName,
                lastName,
                email: username,
                password: createHash(password),
                phone
            }
            const userCreate = await userService.create(newUser)
            await sendEmail(newUser.email, "Welcome to SaludNet", `Welcome ${newUser.firstName} ${newUser.lastName} to SaludNet, registered user`)
            return done(null, userCreate);
        } catch (error) {
            return done(error)
        }
    }));


    passport.use("login", new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
        try {
            const user = await userService.getByEmail(username);
            if (!user || isValidPassword(password, user.password)) { return done(null, false, { message: "User does not exist" }); }
            return done(null, user);
        } catch (error) {
            done(error)
        }
    }))

    passport.use("current", new CustomStrategy(async (req, done) => {
        try {
            const token = cookieExtractor(req);
            if (!token) { return done(null, false, { message: "Expired Session" }); }
            const tokenValid = verifyToken(token);
            if (!tokenValid) { return done(null, false, { message: "Expired Session" }); }
            const user = await userService.getByEmail(tokenValid.email);
            return done(null, user);
        } catch (error) {
            done(error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userService.getById(id);
            done(null, user);
        } catch (error) {
            done(error)
        }
    })
}