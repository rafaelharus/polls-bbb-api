const { validateUUID, validateUrl } = require("./validators");
const {
  validateAnswerSchema,
  validatePersonSchema,
  validatePollSchema,
} = require("./validate-schema");

module.exports.validateUUID = validateUUID;
module.exports.validateUrl = validateUrl;
module.exports.validateAnswerSchema = validateAnswerSchema;
module.exports.validatePersonSchema = validatePersonSchema;
module.exports.validatePollSchema = validatePollSchema;
