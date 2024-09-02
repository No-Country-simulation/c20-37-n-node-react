import { request, response } from "express";

export const authorization = (roles) => {
    return async (req = request, res = response, next) => {
        if (!req.user) {
            return res.status(401).json({ status: "error", msg: "Invalid" });
        }
        if (roles.includes(req.user.role)) {
            next();
        } else {
            res.status(403).json({ status: "error", msg: "No permission" });
        }
    };
};