import { request, response } from "express";
import { createToken } from "../../utils/jwt.js";
import userService from "./session.services.js";
import { cookieExtractor } from "../../utils/cookieExtractor.js";

const userRegister = async (req = request, res = response) => {
    try {
        return res.status(201).json({ status: "ok", msg: "User created", playload: req.user });
    } catch (error) {
        res.status(500).json({ status: "error", msg: "Internal server error" });
    }
}

const userLogin = async (req = request, res = response) => {
    try {
        const token = createToken(req.user);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });
        return res.status(200).json({ status: "ok", playload: req.user, token });
    } catch (error) {
        res.status(500).json({ status: "error", msg: "Internal server error" });
    }
}

const userUpdate = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const user = await userService.update(id, body);
        if (!user) return res.status(404).json({ status: "error", msg: "User not found" });
        return res.status(200).json({ status: "ok", playload: user });
    } catch (error) {
        res.status(500).json({ status: "error", msg: "Internal server error" });
    }
}

const getAll = async (req = request, res = response) => {
    try {
        const users = await userService.getAll();
        return res.status(200).json({ status: "ok", playload: users });
    } catch (error) {
        res.status(500).json({ status: "error", msg: "Internal server error" });
    }
}

const verificationSessions = async (req = request, res = response) => {
    try {
        return res.status(200).json({ status: "ok", playload: req.user });
    } catch (error) {
        res.status(500).json({ status: "error", msg: "Internal server error" });
    }
}

const logout = (req, res, next) => {
    try {
        cookieExtractor(req);
        res.clearCookie('token', {
            httpOnly: true,
            secure: false,
            path: '/'
        });
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send('Error destroying session');
            }
            res.status(200).send('Session closed and cookies deleted');
        });
    } catch (error) {
        res.status(500).json({ status: "error", msg: "Internal server error" });
    }
};


const getByDni = async (req = request, res = response) => {
    try {
        const { dni } = req.params;

        const user = await userService.getByDni(dni);
        if (!user) return res.status(404).json({ status: "error", msg: "User not found" });
        return res.status(200).json({ status: "ok", playload: user.medicalHistory });
    } catch (error) {
        res.status(500).json({ status: "error", msg: "Internal server error" });
    }
}

const deleteByDni = async (req = request, res = response) => {
    try {
        const { dni } = req.params;
        const user = await userService.getByDni(dni);
        if (!user) return res.status(404).json({ status: "error", msg: "Usuario no encontrado" });
        const userDeleted = await userService.deleteOne(user._id);
        return res.status(200).json({ status: "ok", playload: userDeleted });
    } catch (error) {
        res.status(500).json({ status: "error", msg: "Internal server error" });
    }
}

const getUserByDni = async (req = request, res = response) => {
    try {
        const { dni } = req.params;
        const user = await userService.getUserByDni(dni);
        if (!user) return res.status(404).json({ status: "error", msg: "User not found" });
        return res.status(200).json({ status: "ok", playload: user });
    } catch (error) {
        res.status(500).json({ status: "error", msg: "Internal server error" });
    }
}

const createPrescription = async (req = request, res = response) => {
    try {
        const { dni } = req.params;
        const prescriptions = req.body;
        const user = await userService.getByDni(dni);
        if (!user) return res.status(404).json({ status: "error", msg: "Usuario no encontrado" });
        const userPrescription = await userService.createPrescription(user, prescriptions);
        return res.status(200).json({ status: "ok", playload: userPrescription });
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "error", msg: "Internal server error" });
    }
}

const deletePrescription = async (req = request, res = response) => {
    try {
        const { dni, index } = req.params
        const user = await userService.getByDni(dni);
        if (!user) return res.status(404).json({ status: "error", msg: "User not found" });
        await userService.deletePrescription(user, index);
        return res.status(200).json({ status: "ok", msg: "Prescription deleted" });
    } catch (error) {

    }
}

const updatePrescription = async (req = request, res = response) => { }

export default { userRegister, userLogin, userUpdate, getAll, verificationSessions, logout, getByDni, deleteByDni, getUserByDni, createPrescription, deletePrescription };