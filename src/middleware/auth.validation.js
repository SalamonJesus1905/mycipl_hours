import Joi from "joi";
const register = {
    body: Joi.object().keys({
        fullName : Joi.string().min(6).required(),
        email : Joi.string().required(),
        password : Joi.string().min(6).required(),
        role : Joi.string().required()
    }),
  };


const login = Joi.object({
    email : Joi.string().required(),
    password : Joi.string().required(),
})

const forget = Joi.object({
    email : Joi.string().required(),
})

const reset = Joi.object({
    email : Joi.string().required(),
    password : Joi.string().min(6).required(),
    confirmPassword : Joi.string().valid(Joi.ref('password')).required(),
})
export default { register ,login, forget, reset}