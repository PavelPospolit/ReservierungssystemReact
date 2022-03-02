//VALIDATION
const Joi = require('@hapi/joi')

//Register validation
const registerValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .min(1)
            .required(),
        password: Joi.string()
            .min(1)
            .required()
    })
    return schema.validate(data)
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .min(1)
            .required(),
        password: Joi.string()
            .min(1)
            .required()
    })
    return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation