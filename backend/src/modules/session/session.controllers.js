import { request, response } from "express";

const userRegister = async (req=request, res=response) => {
    try {
        return res.status(201).json({ status: "ok", msg: "User created" });
    } catch (error) {
        res.status(500).json({ status: "error", msg: "Internal server error" });
    }
}


export default { userRegister }