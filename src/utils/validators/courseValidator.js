const Ajv = require('ajv');

const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    "name": {
      type: "string",
      maxLength: 30,
      minLength: 3,
    }
  },
  required: ["name"],
  additionalProperties: false
}

const validator = ajv.compile(schema);

module.exports = validator;