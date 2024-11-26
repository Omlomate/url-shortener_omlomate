const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");
const Url = require("../src/models/urlModel");

// Mock environment variables
process.env.MONGO_URI = "mongodb://localhost:27017/url_shortener_test";
process.env.BASE_URL = "http://localhost:3000";

// Connect to the test database before all tests
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Clear the database after each test
afterEach(async () => {
  await Url.deleteMany({});
});

// Close the database connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe("URL Shortener API", () => {
  test("POST /shorten - should create a shortened URL", async () => {
    const response = await request(app)
      .post("/shorten")
      .send({ originalUrl: "https://example.com" });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("shortUrl");
    expect(response.body.shortUrl).toMatch(/http:\/\/localhost:3000\/\w+/);
  });

  test("POST /shorten - should return 400 for invalid URL", async () => {
    const response = await request(app)
      .post("/shorten")
      .send({ originalUrl: "invalid-url" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Invalid URL");
  });

  test("GET /:shortId - should redirect to the original URL", async () => {
    const url = await Url.create({
      originalUrl: "https://example.com",
      shortId: "abcd1234",
    });

    const response = await request(app).get("/abcd1234");

    expect(response.status).toBe(302); // Redirection status code
    expect(response.header.location).toBe(url.originalUrl);
  });

  test("GET /:shortId - should return 404 for non-existent shortId", async () => {
    const response = await request(app).get("/nonexistent");

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "URL not found");
  });

  test("GET /stats/:shortId - should return usage statistics", async () => {
    const url = await Url.create({
      originalUrl: "https://example.com",
      shortId: "abcd1234",
      clicks: 10,
      lastAccessed: new Date(),
    });

    const response = await request(app).get("/stats/abcd1234");

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      originalUrl: url.originalUrl,
      clicks: url.clicks,
      lastAccessed: url.lastAccessed.toISOString(),
    });
  });

  test("GET /stats/:shortId - should return 404 for non-existent shortId", async () => {
    const response = await request(app).get("/stats/nonexistent");

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "URL not found");
  });
});
