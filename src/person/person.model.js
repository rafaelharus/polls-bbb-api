module.exports = () => ({
  name: "person",
  collectionName: "poeple",
  type: "object",
  properties: {
    name: { type: "string", minLength: 2, maxLength: 255 },
    photo: { type: "string" },
    createdAt: { instanceOf: "Date" },
    updatedAt: { instanceOf: "Date" },
  },
  additionalProperties: false,
  required: ["name"],
  searchable: ["createdAt", "updatedAt", "name"],
});
