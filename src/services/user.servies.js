import User from "../models/user.model.js";
import Token from "../models/token.model.js";
import bcrypt from "bcrypt"
const create = async (userBody) => {
    try {
        const data = await User.findOne({ email: userBody.email })
        if (data) {
            return { message: "Email already in use  by another user " + data.email }
        }
        await User.create(userBody)
        return { message: "User created successfully", status: 200 }
    } catch (err) {
        throw new Error(err?.message)
    }
}

const login = async (data, token) => {
    try {
        let uRec = await User.findOne({ email: data.email })
        const passRes = await bcrypt.compare(data.password, uRec.password)
        if (passRes == true) {
            uRec.token = token
            let result = await uRec.save()
            if (result.token == null) {
                throw new Error('Erorr occurred during token generation ' + err.message)
            }
            return result
        }else{
            throw new Error(' password is incorrect')
        }
    } catch (err) {
        throw new Error('Error occur while login user' + err.message)
    }
}

const validEmail = async (data) => {
    try {
        let result = await User.findOne({ email: data.email })
        if (result === null) {
            throw new Error('user not found enter valid email' + err.message)
        }
        return result
    } catch (err) {
        throw new Error('user not found enter valid email ')
    }
}

const userResetToken = async (email, token) => {
    const rTokn = Token({
        email: email,
        resetToken: token
    })
    let userToken = await rTokn.save()
    return userToken
}

const resetEmailValid = async (data) => {
    try {
        let result = await Token.findOne({ email: data })
        if (result === null) {
            return result
        } else {
            return result
        }

    } catch (err) {
        throw new Error('user not found enter valid email ')
    }
}

export default {
    create, login, validEmail, resetEmailValid, userResetToken
}