const { createController } = require("awilix-koa");
const { AuthMiddleware } = require("koa-mongo-crud");
const rateLimit = require("koa-ratelimit");
const responseBuilder = require("../common/response-builder");
const BaseController = require("../common/baseController");

class Answer extends BaseController {
  constructor({ answerService }) {
    super();
    this.answerService = answerService;
  }

  async create(ctx) {
    const response = await this.answerService.create(ctx);
    this.assert(ctx, 201, response);
    responseBuilder.createResponse(ctx, response.body, response.statusCode);
  }

  async list(ctx) {
    const response = await this.answerService.list(ctx.query);
    this.assert(ctx, 200, response);
    responseBuilder.createResponse(ctx, response.body, response.statusCode);
  }
}

module.exports = createController(Answer)
  .before([
    AuthMiddleware(
      global.appConfig.auth,
      global.appConfig.authAllowedRoutes || []
    ),
    rateLimit({
      driver: "memory",
      db: new Map(),
      duration: 60 * 1000 * 1000, // 1 min
      errorMessage: "Sometimes You Just Have to Slow Down.",
      id: (ctx) => ctx.ip,
      headers: {
        remaining: "Rate-Limit-Remaining",
        reset: "Rate-Limit-Reset",
        total: "Rate-Limit-Total",
      },
      max: 100,
      disableHeader: false,
    }),
  ])
  .get("/v1/answer", "list")
  .post("/v1/answer", "create");
