import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import Token from '../models/token.model.js';

const generateToken = (obj) => {
    const payload = obj
    const secret = config.jwt.secret;
    const options = { expiresIn: config.jwt.expiryTime * 60 };
    let token = jwt.sign(payload, secret, options);
    return token
}

const generateResetPasswordToken = (obj) => {
    const payload = { email: obj.email, password: obj.password }
    const secret = config.reset.secret;
    const options = { expiresIn: config.reset.expiryTime * 60 };
    let token = jwt.sign(payload, secret, options);

    return token

}
const updateResetPasswordToken = async (obj) => {
    const user = await Token.findOne({ email: obj.email })
    const rsUpdateToken = generateResetPasswordToken(user)
    user.resetToken = rsUpdateToken
    const userPassToken = await user.save()
    return userPassToken
}

const verifyResetPasswordToken = (obj) => {
    const token = obj.resetToken
    try {
        const secret = config.reset.secret;
        const decoded = jwt.verify(token, secret);
        if (decoded.email) {
            return { status: 1, data: obj };
        }
    } catch (error) {
        return updateResetPasswordToken(obj);
    }
}

const validResetToken = (token) => {
    try {
        const secret = config.reset.secret;
        const decoded = jwt.verify(token, secret);
        if (decoded.email) {
            return { status: 1, data: decoded };
        }else{
            return { status: 0, message: "link expired" };
        }
    }catch(e){
        return e
    }

}
export default { generateToken, generateResetPasswordToken, verifyResetPasswordToken, updateResetPasswordToken, validResetToken };