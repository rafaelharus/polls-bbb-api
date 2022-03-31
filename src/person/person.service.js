/* eslint-disable func-names, no-param-reassign */
/* eslint import/no-unresolved: [2, { caseSensitive: false }] */
const Baseservice = require("../common/baseService");

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
}

module.exports = PersonService;
