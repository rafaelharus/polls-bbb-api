/* eslint-disable func-names, no-param-reassign */
/* eslint import/no-unresolved: [2, { caseSensitive: false }] */
const Baseservice = require("../common/baseService");
const ApiError = require("../common/api-error");

class PersonService extends Baseservice {
  constructor(opts) {
    super(opts);
    this.repository = opts.personMapper;
  }

  async list(query = {}) {
    const people = await this.repository.list(query);
    const embedded = this.repository.toHalCollection(people);
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

module.exports = PersonService;
