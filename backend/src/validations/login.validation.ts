import { Joi } from 'express-validation';

const LoginValidation = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

export default LoginValidation;
