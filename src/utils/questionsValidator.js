const Ajv = require("ajv");

const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    question: {
      type: "string",
      maxLength: 400,
      minLength: 5,
    },
    choices: {
      type: "array",
      items: [
        {
          type: "object",
          properties: {
            choice: {
              type: "string",
              maxLength: 200,
            },
            isCorrect: {
              type: "boolean",
            },
          },
          required: ["choice", "isCorrect"],
          additionalProperties: false,
        },
        {
          type: "object",
          properties: {
            choice: {
              type: "string",
              maxLength: 200,
            },
            isCorrect: {
              type: "boolean",
            },
          },
          required: ["choice", "isCorrect"],
          additionalProperties: false,
        },
        {
          type: "object",
          properties: {
            choice: {
              type: "string",
              maxLength: 200,
            },
            isCorrect: {
              type: "boolean",
            },
          },
          required: ["choice", "isCorrect"],
          additionalProperties: false,
        },
        {
          type: "object",
          properties: {
            choice: {
              type: "string",
              maxLength: 200,
            },
            isCorrect: {
              type: "boolean",
            },
          },
          required: ["choice", "isCorrect"],
          additionalProperties: false,
        },
      ],
      minItems: 4,
      maxItems: 4,
    },
    explaination: {
      type: "string",
      maxLength: 1000,
    }
  },
  required: ["question", "choices"],
  additionalProperties: false,
};

const validator = ajv.compile(schema);

module.exports = validator;
