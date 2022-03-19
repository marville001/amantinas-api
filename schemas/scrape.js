const Joi = require("joi");

module.exports = {
    createScrapeSchema: Joi.object().keys({
        investorId: Joi.string().required(),
        from: Joi.string().required(),
        country: Joi.string().allow(""),
        zipcode: Joi.string().allow(""),
        state: Joi.string().allow(""),
        city: Joi.string().allow(""),
        address: Joi.string().allow(""),
        since: Joi.string().allow(""),
        type: Joi.string().allow(""),
        pricerange: Joi.array(),
        squarefeets: Joi.array(),
        bedrooms: Joi.number().allow(""),
        bathrooms: Joi.number().allow(""),
        execute: Joi.string(),
    }),
};
