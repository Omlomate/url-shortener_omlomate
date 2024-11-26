const Joi = require("joi");

const validateUrl = (url) => {
  const schema = Joi.string().uri().required();
  return schema.validate(url);
};

module.exports = validateUrl;
