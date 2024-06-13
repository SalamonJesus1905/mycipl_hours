import Joi from 'joi';
import httpStatus from 'http-status';
import pick from '../utils/pick.js';
import authValidation from '../validations/auth.validation.js';
// const ApiError = require('../utils/ApiError');
const validate = (schema) => (req, res, next) => {
    const validSchema = pick(schema, ['params', 'query', 'body']);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: 'key' }, abortEarly: false })
      .validate(object);
    
    if (error) {
      next(error) 
      // const errorMessage = error.details.map((details) => details.message).join(', ');
      // httpStatus.BAD_REQUEST, errorMessage;
    }
    Object.assign(req, value);
    return next();
  };

export default validate;
