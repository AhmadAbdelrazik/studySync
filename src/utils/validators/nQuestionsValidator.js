const Ajv = require("ajv");

const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    page: {type: "number"}
  },
  additionalProperties: false
}


const validator = ajv.compile(schema);

module.exports = validator;
