import catchAsync from "../utils/catchAsync.js"
import userServies from "../services/user.servies.js"
import tokenServices from "../services/token.services.js"
const register = catchAsync(async (req, res) => {
    const result = await userServies.create(req.body)    
    res.status(200).send(result)
})

const login = catchAsync(async (req, res) => {
    let token = tokenServices.generateToken(req.body)
    const result = await userServies.login(req.body, token)
    res.status(200).send({ message: "User Login Successful", data: result })
})

export default { register, login }


