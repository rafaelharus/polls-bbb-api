const { omit } = require("lodash");
const {
  ValidationException,
  DuplicationException,
  Uuid,
} = require("koa-mongo-crud");
const ApiError = require("./api-error");

class BaseService {
  constructor(opts) {
    this.response = opts.context.response;
    this.context = opts.context;
    this.scope = this.context.state.container;
    this.logger = opts.logger;
    this.uuid = Uuid.v4c;
  }

  sanitize(response, omitting) {
    let propertiesToOmit = ["headers"];
    if (omitting != null) {
      if (typeof omitting === "string") {
        propertiesToOmit.push(omitting);
      } else {
        propertiesToOmit = propertiesToOmit.concat(omitting);
      }
    }
    return omit(response, propertiesToOmit);
  }

  sanitizedResponse(code, response, ommitting) {
    return this.sanitize({ body: response, statusCode: code }, ommitting);
  }

  responseError(error) {
    if (error instanceof ApiError) {
      return this.context.throw(error.status, error.description);
    }
    if (error instanceof ValidationException) {
      return this.context.throw(422, "Unprocessable Entity", {
        message: error.errors,
      });
    }
    if (error instanceof DuplicationException) {
      return this.context.throw(409, "Entity conflict", {
        message: error.errors,
      });
    }
    return this.context.throw(500, error.message);
  }
}

module.exports = BaseService;
