import jwt from 'jsonwebtoken'
const verifyToken = async (req,res,next) => {
    const authenticationScheme = 'Bearer ';
    let token = req.headers.authorization
    if (token.startsWith(authenticationScheme)) {
        try {
            token = token.slice(authenticationScheme.length, token.length);
            const secret = 'login';
            const decoded = jwt.verify(token, secret);
            next()
          } catch (error) {
            return { success: false, error: error.message }
          }
    }else{
        try {
            const secret = 'login';
            const decoded = jwt.verify(token, secret);
            next()
            return { success: true, data: decoded };
          } catch (error) {
            return { success: false, error: error.message };
          }
    }
    
}

export default verifyToken