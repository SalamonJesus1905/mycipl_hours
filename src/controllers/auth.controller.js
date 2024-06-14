import catchAsync from "../utils/catchAsync.js"
import userServies from "../services/user.servies.js"
import tokenServices from "../services/token.services.js"
import emailServices from "../services/email.services.js"
import User from "../models/user.model.js"
import Token from "../models/token.model.js"
import Joi from "joi"
import bcrypt from "bcrypt"
const register = catchAsync(async (req, res) => {
    const result = await userServies.create(req.body)
    res.status(200).send(result)
})

const login = catchAsync(async (req, res) => {
    let token = tokenServices.generateToken(req.body)
    const result = await userServies.login(req.body, token)
    res.status(200).send({ message: "User Login Successful", data: result })
})

const forget = catchAsync(async (req, res) => {
    const result = await userServies.validEmail(req.body)
    const tokenValid = await userServies.resetEmailValid(result.email)
    let email;
    if (tokenValid == null) {
        const token = tokenServices.generateResetPasswordToken(result)
        const userRsToken = await userServies.userResetToken(req.body.email, token)
        email = await emailServices.forgetEmail(userRsToken)
    } else {
        const rsToken = await tokenServices.verifyResetPasswordToken(tokenValid)
        email = await emailServices.forgetEmail(rsToken)
    }
    res.status(200).send(email)
})

const resetPassword = catchAsync(async (req, res) => {
    const token = req.params.token
    const rsToken = await tokenServices.validResetToken(token)
    return rsToken.status == 1 ? res.status(200).render('index') : res.send(rsToken.message)

})

const updatePassword = catchAsync(async (req, res) => {
    let schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    })
    const { error, value } = schema.validate(req.body)
    if (error) {
        return res.status(400).send(error.message)
    } else {
        let user = await User.findOne({ email: req.body.email })
        user.password = await bcrypt.hash(req.body.password, 10)
        let result = await user.save()
        let token = await Token.deleteOne({ email: req.body.email })
        res.status(200).send({ data: result, message: "password updated successfully" })
    }
})

export default { register, login, forget, resetPassword, updatePassword }


