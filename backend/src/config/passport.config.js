import passport from 'passport';
import passportLocal from 'passport-local';
import passportCustom from 'passport-custom';
import medicalHistoryService from '../modules/medicalHistory/medicalHistory.services.js';
import userService from '../modules/session/session.services.js';
import { createHash, isValidPassword } from '../utils/hashPassword.js';
import { cookieExtractor } from '../utils/cookieExtractor.js';
import { verifyToken } from '../utils/jwt.js';
import { sendEmail } from '../utils/sendEmail.js';


const LocalStrategy = passportLocal.Strategy;
const CustomStrategy = passportCustom.Strategy;


export const initializePassport = () => {
    passport.use("register", new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
        try {
            console.log(req.body);
            
            const { firstName, lastName, phone, role, birthdate, address, dni } = req.body;
            const user = await userService.getByEmail(username);
            console.log("MAIL:",username);
            
            console.log(user);
            
            if (user) { return done(null, false, { message: "User already exists" }); }
            const medicalHistory = await medicalHistoryService.create()
            const newUser = {
                firstName,
                lastName,
                email: username,
                password: createHash(password),
                phone,
                role,
                birthdate: new Date(birthdate),
                address,
                medicalHistory: medicalHistory._id,
                dni
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
            if (!user || !isValidPassword(user.password, password)) { return done(null, false, { message: "Credenciales no válidas" }); }
            else { return done(null, user); }
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