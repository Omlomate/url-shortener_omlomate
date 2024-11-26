const crypto = require("crypto");
const generateShortId = () => crypto.randomBytes(4).toString("hex");
module.exports = generateShortId;
