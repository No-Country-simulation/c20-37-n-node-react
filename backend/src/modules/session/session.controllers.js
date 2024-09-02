import { request, response } from "express";
import {createToken} from "../../utils/jwt.js";
import userService from "./session.services.js";

const userRegister = async (req=request, res=response) => {
    try {
        return res.status(201).json({ status: "ok", msg: "User created" });
    } catch (error) {
        res.status(500).json({ status: "error", msg: "Internal server error" });
    }}

const userLogin = async (req=request, res=response) => {
    try {
        const token = createToken(req.user);
        res.cookie("token",token,{httpOnly: true});
        return res.status(200).json({ status: "ok", playload:req.user, token});
    } catch (error) {
        res.status(500).json({ status: "error", msg: "Internal server error" });
    }}

const userUpdate = async (req=request, res=response) => {
    try {
        const {id} = req.params;
        const body = req.body;
        const user = await userService.update(id, body);
        if(!user) return res.status(404).json({ status: "error", msg: "User not found" });
        return res.status(200).json({ status: "ok", playload:user });
    } catch (error) {
        res.status(500).json({ status: "error", msg: "Internal server error" });
    }}

const getAll = async (req=request, res=response) => {
    try {
        const users = await userService.getAll();
        return res.status(200).json({ status: "ok", playload:users });
    } catch (error) {
        res.status(500).json({ status: "error", msg: "Internal server error" });
    }
}

export default { userRegister, userLogin, userUpdate, getAll }