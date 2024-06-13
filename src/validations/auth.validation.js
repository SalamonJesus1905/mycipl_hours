import Joi from "joi";
const register = {
    body: Joi.object().keys({
        email : Joi.string().required(),
        password : Joi.string().min(6).required()
    }),
  };


const login = Joi.object({
    email : Joi.string().required(),
    password : Joi.string().required(),
})
export default { register ,login}