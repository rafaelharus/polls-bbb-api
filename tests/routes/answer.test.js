const supertest = require("supertest");
const defaults = require("superagent-defaults");

const app = require("../../index");
const {
  AuthorizationHeader,
  dropCollection,
  populateCollection,
} = require("../common.testcases");

describe("Answer", () => {
  let authHeaders;
  let request;

  beforeAll(async () => {
    request = defaults(supertest(app));
  });

  describe("If it's not logged in", () => {
    it("Should not create answer", async () => {
      const res = await request.post(`/v1/answer`);
      expect(res.statusCode).toBe(401);
    });

    it("Should not list answer", async () => {
      const res = await request.get(`/v1/answer`);
      expect(res.statusCode).toBe(401);
    });
  });

  describe("If invalid body or wrong parameters", () => {
    beforeAll(async () => {
      const auth = AuthorizationHeader();
      authHeaders = { Authorization: auth };
      request.set(authHeaders);
    });

    it("Should not create answer", async () => {
      const res = await request.post(`/v1/answer`).send();
      expect(res.statusCode).toBe(422);
    });
  });

  describe("If it's authenticated and with all valid parameters", () => {
    const personId = "04696d2e-9421-4443-a927-21275c86026b";
    const pollId = "95d99e78-38ce-41a1-b3a5-c507d1040ca2";

    beforeAll(async () => {
      const auth = AuthorizationHeader();
      authHeaders = { Authorization: auth };
      request.set(authHeaders);
    });

    it("Should create answer", async () => {
      const answerPayload = {
        personId,
        pollId,
        userAgent:
          "Mozilla/5.0 (iPhone; CPU iPhone OS 12_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Safari/605.1",
        ip: "172.217. 22.14",
      };

      const res = await request.post(`/v1/answe`).send(answerPayload);
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("id");
      expect(res.body.personId).toBe("04696d2e-9421-4443-a927-21275c86026b");
    });

    it("Should list answers", async () => {
      const res = await request.get(`/v1/answer`);
      expect(res.statusCode).toBe(200);
    });

    it("Should empty list answers with pollId filter", async () => {
      const res = await request.get(`/v1/answer?pollId=xyz`);
      expect(res.statusCode).toBe(200);
      expect(res.body._embedded.answers.length).toBe(0);
    });

    it("Should list answers with pollId filter", async () => {
      const res = await request.get(
        `/v1/answer?pollId=95d99e78-38ce-41a1-b3a5-c507d1040ca2`
      );
      expect(res.statusCode).toBe(200);
      expect(res.body._embedded.answers.length).toBe(1);
    });
  });

  afterAll(async (done) => {
    await dropCollection("answers");
    app.close(done);
  });
});
