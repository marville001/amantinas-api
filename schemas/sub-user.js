const Joi = require("joi");

module.exports = {
    createSubUserSchema: Joi.object().keys({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().email().required(),
        role: Joi.string().required(),
        weekDayFromTime: Joi.string().required(),
        weekDayToTime: Joi.string().required(),
        satFromTime: Joi.string().required(),
        satToTime: Joi.string().required(),
        sundayFree: Joi.boolean().required(),
    }),
};
