import config from "../config/config.js";
import jwt from 'jsonwebtoken'
import User from "../models/user.model.js";

const secret = config.jwt.secret;
const usereMessage = "unauthorized access you can't access User page"
const admineMessage = "unauthorized access you can't access Admin page"

const tokenSchema = (token) => {
    const authenticationScheme = 'Bearer ';
    if (token.startsWith(authenticationScheme)) {
        return token = token.slice(authenticationScheme.length, token.length);
    }
    return token
}

const roleUser = async (req, res, next) => {
    let key = req.headers.authorization
    const token = await tokenSchema(key)
    console.log(token)
    try {
        const decoded = jwt.verify(token, secret);
        const data = await User.findOne({ token })
        if (data.role == "USER") {
            next()
        }
        res.send({ success: false, message: usereMessage });

    }
    catch (error) {
        return { success: false, error: error.message }
    }
}
    const roleAdmin = async (req, res, next) => {
        let key = req.headers.authorization
        const token = await tokenSchema(key)
        try {
            const decoded = jwt.verify(token, secret);
            const data = await User.findOne({ token })
            if (data.role == "ADMIN") {
                next()
            }
            res.send({ success: false, message: admineMessage });
        } catch (error) {
            return { success: false, error: error.message }
        }
    }

export default { roleUser, roleAdmin }