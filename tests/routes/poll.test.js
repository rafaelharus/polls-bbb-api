const supertest = require("supertest");
const defaults = require("superagent-defaults");

const app = require("../../index");
const {
  AuthorizationHeader,
  dropCollection,
  populateCollection,
} = require("../common.testcases");

describe("Poll", () => {
  let authHeaders;
  let request;

  beforeAll(async () => {
    request = defaults(supertest(app));
  });

  describe("If it's not logged in", () => {
    const poolId = "123";

    it("Should not create polls", async () => {
      const res = await request.post(`/v1/poll`);
      expect(res.statusCode).toBe(401);
    });

    it("Should not get poll", async () => {
      const res = await request.get(`/v1/poll/${poolId}`);
      expect(res.statusCode).toBe(401);
    });

    it("Should not list polls", async () => {
      const res = await request.get(`/v1/poll`);
      expect(res.statusCode).toBe(401);
    });
  });

  describe("If invalid body or wrong parameters", () => {
    const poolId = "123";

    beforeAll(async () => {
      const auth = AuthorizationHeader();
      authHeaders = { Authorization: auth };
      request.set(authHeaders);
    });

    it("Should not create polls", async () => {
      const res = await request.post(`/v1/poll`).send();
      expect(res.statusCode).toBe(422);
    });

    it("Should not get pool", async () => {
      const res = await request.get(`/v1/poolId/${poolId}`);
      expect(res.statusCode).toBe(404);
    });
  });

  describe("If it's authenticated and with all valid parameters", () => {
    let pollId = null;

    beforeAll(async () => {
      const auth = AuthorizationHeader();
      authHeaders = { Authorization: auth };
      request.set(authHeaders);
    });

    it("Should create polls", async () => {
      const pollPayload = {
        people: [
          "95f232c9-e17d-43a2-a102-ee4d6203e2c7",
          "95f232fe-1856-4677-8b2f-0589ac4cd225",
        ],
        endAt: "2022-04-02T20:05:51.898-03:00",
      };
      const res = await request.post(`/v1/poll`).send(pollPayload);
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("id");
      pollId = res.body.id;
    });

    it("Should get poll", async () => {
      const res = await request.get(`/v1/poll/${pollId}`);
      expect(res.statusCode).toBe(200);
    });

    it("Should empty list polls with people filter", async () => {
      const res = await request.get(`/v1/poll?people=xyz`);
      expect(res.statusCode).toBe(200);
      expect(res.body._embedded.polls.length).toBe(0);
    });

    it("Should list polls with people filter", async () => {
      const res = await request.get(
        `/v1/poll?people=95f232c9-e17d-43a2-a102-ee4d6203e2c7`
      );
      expect(res.statusCode).toBe(200);
      expect(res.body._embedded.polls.length).toBe(1);
    });
  });

  afterAll(async (done) => {
    await dropCollection("polls");
    app.close(done);
  });
});
