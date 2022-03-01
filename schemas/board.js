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
    createBoardColumnItemSchema: Joi.object().keys({
        columnId: Joi.string().required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
    }),
    updateBoardColumnItemSchema: Joi.object().keys({
        itemId: Joi.string().required(),
        from: Joi.string().required(),
        to: Joi.string().required(),
        index: Joi.number().required(),
    }),
    updateBoardColumnItemDetailsSchema: Joi.object().keys({
        itemId: Joi.string().required(),
        title: Joi.string().allow(""),
        description: Joi.string().allow(""),
    }),
};
