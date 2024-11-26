const Url = require("../models/urlModel");
const generateShortId = require("../utils/generateShortId");
const validateUrl = require("../utils/validateUrl");

exports.shortenUrl = async (req, res) => {
  const { error } = validateUrl(req.body.originalUrl);
  if (error) return res.status(400).json({ message: "Invalid URL" });

  const shortId = generateShortId();
  const newUrl = await Url.create({
    originalUrl: req.body.originalUrl,
    shortId,
  });

  res.status(201).json({ shortUrl: `${shortId}` });
};

exports.redirectUrl = async (req, res) => {
  const { shortId } = req.params;
  const url = await Url.findOne({ shortId });
  if (!url) return res.status(404).json({ message: "URL not found" });

  url.clicks += 1;
  url.lastAccessed = new Date();
  await url.save();

  res.redirect(url.originalUrl);
};

exports.getStats = async (req, res) => {
  const { shortId } = req.params;
  const url = await Url.findOne({ shortId });
  if (!url) return res.status(404).json({ message: "URL not found" });

  res.status(200).json({
    originalUrl: url.originalUrl,
    clicks: url.clicks,
    lastAccessed: url.lastAccessed,
  });
};
