const Joi = require("joi");

module.exports = {
    createTransactionSchema: Joi.object().keys({
        investorId: Joi.string().required(),
        homeId: Joi.string()
            .required()
            .error((errors) => {
                errors.forEach((err) => (err.message = "Please select a home"));
                return errors;
            }),
        title: Joi.string().required(),
        description: Joi.string().required(),
        amount: Joi.number().required(),
        date: Joi.string().required(),
        type: Joi.string().required(),
        recurring: Joi.boolean().required(),
        startDate: Joi.string(),
        endDate: Joi.string(),
        isCustom: Joi.boolean(),
        interval: Joi.string(),
    }),
};
