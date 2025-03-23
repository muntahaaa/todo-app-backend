const app = require("../server");
const serverless = require("serverless-http"); // optional, makes life easier

module.exports = serverless(app);
