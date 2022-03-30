/* eslint-disable func-names, no-param-reassign */
/* eslint import/no-unresolved: [2, { caseSensitive: false }] */
const { ValidationException } = require("koa-mongo-crud");
const ApiError = require("../common/api-error");
const Baseservice = require("../common/baseService");
const { validatePollSchema } = require("../validator");

class PollService extends Baseservice {
  constructor(opts) {
    super(opts);
    this.repository = opts.PollService;
  }

  async create(data) {
    try {
      const isValid = validatePollSchema(data);
      if (isValid instanceof ValidationException) throw isValid;
      return this.sanitizedResponse(201, await this.repository.create(data));
    } catch (error) {
      return this.responseError(error);
    }
  }

  async list(query = {}) {
    const polls = await this.repository.list(query);
    const embedded = this.repository.toHalCollection(polls);
    return this.sanitizedResponse(200, embedded);
  }

  async get(id, withDeleted = false) {
    try {
      const response = await this.repository.findById(id, withDeleted);
      if (response == null) {
        throw new ApiError("Not Found", 404);
      }
      return this.sanitizedResponse(200, response);
    } catch (error) {
      return this.responseError(error);
    }
  }
}

module.exports = PollService;
