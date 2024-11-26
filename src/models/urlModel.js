const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortId: { type: String, unique: true, required: true },
  clicks: { type: Number, default: 0 },
  lastAccessed: { type: Date },
});

module.exports = mongoose.model("Url", urlSchema);
