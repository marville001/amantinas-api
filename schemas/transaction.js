const Joi = require("joi");

module.exports = {
    createTransactionSchema: Joi.object().keys({
        investorId: Joi.string().required(),
        homeId: Joi.string().required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
        amount: Joi.number().required(),
        date: Joi.string().required(),
        type: Joi.string().required(),
        recurring: Joi.boolean().required(),
        startDate: Joi.string(),
        endDate: Joi.string(),
    }),
};
