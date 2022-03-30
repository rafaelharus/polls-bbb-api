const { createController } = require("awilix-koa");
const { AuthMiddleware } = require("koa-mongo-crud");
const rateLimit = require("koa-ratelimit");
const responseBuilder = require("../common/response-builder");
const BaseController = require("../common/baseController");

class Poll extends BaseController {
  constructor({ pollService }) {
    super();
    this.pollService = pollService;
  }

  async create(ctx) {
    const response = await this.pollService.create(ctx.request.body);
    this.assert(ctx, 201, response);
    responseBuilder.createResponse(ctx, response.body, response.statusCode);
  }

  async get(ctx) {
    const response = await this.pollService.get(
      ctx.params.id,
      (ctx.query.deleted || "0") === "1"
    );
    this.assert(ctx, 200, response);
    responseBuilder.createResponse(ctx, response.body, response.statusCode);
  }

  async list(ctx) {
    const response = await this.pollService.list(ctx.query);
    this.assert(ctx, 200, response);
    responseBuilder.createResponse(ctx, response.body, response.statusCode);
  }
}

module.exports = createController(Poll)
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
  .get("/v1/poll", "list")
  .post("/v1/poll", "create")
  .get("/v1/poll/:id", "get");
