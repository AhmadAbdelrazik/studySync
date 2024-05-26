const Ajv = require('ajv');

const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    email: {
      type: "string",
      maxLength: 100,
      pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",   
    },
    password: {
      type: "string",
      minLength: 8,
      maxLength: 50,
    }
  },
  required: ["email", "password"],
  additionalProperties: false,
};

const validator = ajv.compile(schema);

module.exports = validator;