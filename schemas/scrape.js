const Joi = require("joi");

module.exports = {
    createScrapeSchema: Joi.object().keys({
        investorId: Joi.string().required(),
        country: Joi.string(),
        zipcode: Joi.string(),
        state: Joi.string(),
        city: Joi.string(),
        address: Joi.string(),
        since: Joi.string(),
        type: Joi.string(),
        priceRange: Joi.array(),
        squarefeets: Joi.array(),
        bedrooms: Joi.number(),
        bathrooms: Joi.number(),
        execute: Joi.string(),
    }),
};
