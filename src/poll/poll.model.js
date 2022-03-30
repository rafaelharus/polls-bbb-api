module.exports = () => ({
  name: "poll",
  collectionName: "polls",
  type: "object",
  properties: {
    people: { type: "array", items: { type: "string", format: "uuid" } },
    createdAt: { instanceOf: "Date" },
    updatedAt: { instanceOf: "Date" },
    endAt: { instanceOf: "Date" },
  },
  additionalProperties: false,
  required: ["people", "endAt"],
  searchable: ["createdAt", "updatedAt", "people"],
});
