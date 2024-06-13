import User from "../models/user.model.js";

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
        uRec.token = token
        let result = await uRec.save()
        if (result.token == null) {
            throw new Error('Erorr occurred during token generation ' + err.message)
        }
        return result
    } catch (err) {
        throw new Error('Error occur while login user' + err.message)
    }
}

export default {
    create, login
}