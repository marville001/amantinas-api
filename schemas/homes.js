const Joi = require("joi");

module.exports = {
    createProspectSchema: Joi.object().keys({
        investorId: Joi.string().required(),
        scraped: Joi.boolean().required(),
        category: Joi.string().required(),
        name: Joi.string().required(),
        location: Joi.string().required(),
        bedrooms: Joi.string().required(),
        bathrooms: Joi.string().required(),
        price: Joi.string().required(),
    }),
};
