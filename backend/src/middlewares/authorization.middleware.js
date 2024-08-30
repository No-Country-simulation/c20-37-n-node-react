import {request, response} from "express";

export const authorization = (role) => {
    return async (req = request, res = response, next) => {
        if(!req.user)return res.status(401).json({status: "error", msg: "Invalid"})
        if (req.user.role == role) {
            next()
        } else {
            res.status(401).json({status: "error", msg: "No permission"})
        }
    }
}