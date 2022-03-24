const Ajv = require("ajv")
const ajv = new Ajv()

const schema = {
  type: "object",
  properties: {
    badgeTitle: {type: "string"},
    badgeImage: {type: "string"},
    badgeid: {type: "integer"},
    badgeStatus: {type: "string"},
    isAdmin:{type:"boolean"}
  },
  // required: ["badgeid"],
  // additionalProperties: false
}

export default schema
// const data = {foo: 1, bar: "abc"}
// const valid = ajv.validate(schema, data)
// if (!valid) console.log(ajv.errors)