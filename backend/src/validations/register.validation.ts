import { Joi } from 'express-validation';

const RegisterValidation = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().required().email(),
  phone: Joi.string()
    .required()
    .regex(new RegExp(/^05\d[1-9]{7}$/))
    .message('Invalid phone number'),
  password: Joi.string().required(),
  password_confirm: Joi.string().required(),
  user_type: Joi.string().required().valid('customer', 'delivery'),
});

export default RegisterValidation;
