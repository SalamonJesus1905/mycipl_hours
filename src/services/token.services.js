import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const generateToken = (obj)=>{
    const payload = obj
    const secret = config.jwt.secret;
    const options = { expiresIn: config.jwt.expiryTime * 60 };
    let token = jwt.sign(payload, secret, options);
    return token
}

export default { generateToken };