const Joi = require("joi");

module.exports = {
    createBoardSchema: Joi.object().keys({
        name: Joi.string().required(),
        columns: Joi.number().required(),
        investorId: Joi.string().required(),
    }),
    getBoardsSchema: Joi.object().keys({
        investorId: Joi.string().required(),
    }),
    renameColumnSchema: Joi.object().keys({
        name: Joi.string().required(),
    }),
};
