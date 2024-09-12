import jwt from "jsonwebtoken";
import envs from "../config/envs.config.js";

export const createToken =(user) =>{
    const {_id, email, role, dni}= user;
    const token = jwt.sign({ _id, email, role, dni }, envs.SECRET_CODE, { expiresIn: "2h" })
    return token
}

export const verifyToken = (token) =>{
    try {
        const decoded = jwt.verify(token, envs.SECRET_CODE);
        return decoded
    } catch (error) {
        return null
    }
}