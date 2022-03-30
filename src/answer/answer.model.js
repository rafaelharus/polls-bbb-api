module.exports = () => ({
  name: "answer",
  collectionName: "answers",
  type: "object",
  properties: {
    personId: { type: "string", format: "uuid" },
    pollId: { type: "string", format: "uuid" },
    userAgent: { type: "string", minLength: 1, maxLength: 255 },
    ip: { type: "string", minLength: 1, maxLength: 50 },
    createdAt: { instanceOf: "Date" },
    updatedAt: { instanceOf: "Date" },
  },
  additionalProperties: false,
  required: ["personId", "pollId", "userAgent", "ip"],
  searchable: ["createdAt", "updatedAt", "personId", "pollId"],
});
