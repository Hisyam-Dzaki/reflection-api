
const Joi = require('joi')

exports.validateUserRegister = async (req, res, next) => {
    const schema = Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
    });
    if (schema.validate(req.body).error) {
        res.json({ error: schema.validate(req.body).error.message });
    } else {
        next();
    }
};