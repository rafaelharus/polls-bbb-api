/* eslint-disable func-names, no-param-reassign */
/* eslint import/no-unresolved: [2, { caseSensitive: false }] */
const { ValidationException } = require("koa-mongo-crud");
const Baseservice = require("../common/baseService");
const { validateAnswerSchema } = require("../validator");

class AnswerService extends Baseservice {
  constructor(opts) {
    super(opts);
    this.repository = opts.answerMapper;
  }

  async create(ctx) {
    try {
      const data = ctx.request.body;
      data.ip = ctx.ip;
      data.userAgent = ctx.get("user-agent");
      const isValid = validateAnswerSchema(data);
      if (isValid instanceof ValidationException) throw isValid;
      return this.sanitizedResponse(201, await this.repository.create(data));
    } catch (error) {
      return this.responseError(error);
    }
  }

  async list(query = {}) {
    const answers = await this.repository.list(query);
    const embedded = this.repository.toHalCollection(answers);
    return this.sanitizedResponse(200, embedded);
  }
}

module.exports = AnswerService;
