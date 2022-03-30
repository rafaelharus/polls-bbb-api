const Ajv = require("ajv");
const { ValidationException } = require("koa-mongo-crud");
const PollSchema = require("../poll/poll.model");
const PersonSchema = require("../person/person.model");
const AnswerSchema = require("../answer/answer.model");

const ajv = new Ajv({ allErrors: true });

const validatePollSchema = (payload) => {
  const isValid = ajv.validate(PollSchema(), payload);
  if (!isValid) {
    return new ValidationException(ajv.errors);
  }
  return payload;
};

const validatePersonSchema = (payload) => {
  const isValid = ajv.validate(PersonSchema(), payload);
  if (!isValid) {
    return new ValidationException(ajv.errors);
  }
  return payload;
};

const validateAnswerSchema = (payload) => {
  const isValid = ajv.validate(AnswerSchema(), payload);
  if (!isValid) {
    return new ValidationException(ajv.errors);
  }
  return payload;
};

module.exports = {
  validatePollSchema,
  validatePersonSchema,
  validateAnswerSchema,
};
