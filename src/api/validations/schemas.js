const Joi = require('joi')

const schemas = {
    id_schema: Joi.object({
        id: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required()
    }),
    user_signup_schema: Joi.object({
        first_name: Joi.string().min(2).required(),
        last_name: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        address: Joi.string(),
        phone: Joi.string().pattern(/(84|0[3|5|7|8|9])+([0-9]{8})\b/),
        imageURL: Joi.string()
    }),
    user_signin_schema: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    }),
    user_update_schema: Joi.object({
        first_name: Joi.string().min(2),
        last_name: Joi.string().min(2),
        email: Joi.string().email(),
        password: Joi.string().min(6),
        address: Joi.string(),
        phone: Joi.string().pattern(/(84|0[3|5|7|8|9])+([0-9]{8})\b/),
        imageURL: Joi.string()
    })
}

module.exports = schemas
