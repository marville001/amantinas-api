const Joi = require("joi");

module.exports = {
    timeInSchema: Joi.object().keys({
        userId: Joi.string().required(),
        timeIn: Joi.date().required(),
    }),
    timeOutSchema: Joi.object().keys({
        work: Joi.string().required(),
        timeOut: Joi.date().required(),
    }),
};
