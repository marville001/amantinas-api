const Joi = require("joi");

module.exports = {
    createSuggestionSchema: Joi.object().keys({
        userId: Joi.string().required(),
        userType: Joi.string().required(),
        subject: Joi.string().required(),
        suggestion: Joi.string().required(),
    }),
};
