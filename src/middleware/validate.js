import config from '../config/config.js';
import jwt from 'jsonwebtoken'

const secret = config.jwt.secret;
const verifyToken = async (req,res,next) => {
    const authenticationScheme = 'Bearer ';
    let token = req.headers.authorization
    if (token.startsWith(authenticationScheme)) {
        try {
            token = token.slice(authenticationScheme.length, token.length);
            jwt.verify(token, secret);
            next()
          } catch (error) {
            return { success: false, error: error.message }
          }
    }else{
        try {
            jwt.verify(token, secret);
            next()
            return { success: true, data: decoded };
          } catch (error) {
            return { success: false, error: error.message };
          }
    }
    
}

export default verifyToken