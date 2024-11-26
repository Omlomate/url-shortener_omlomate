
# URL Shortener API

A backend service to shorten URLs, retrieve original URLs, and track usage statistics.

---

## Features
- Shorten any valid URL into a unique shortened ID.
- Redirect users to the original URL using the shortened ID.
- View statistics such as the number of clicks and the last accessed timestamp.

---

## Live Deployment
🚀 **Hosted Application**: [URL Shortener API](https://your-deployed-url.com)

---

## Getting Started

### Prerequisites
- Node.js (>=16.x)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/url-shortener-api.git
   cd url-shortener-api
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the project root with the following variables:
   ```env
   MONGO_URI=<Your MongoDB connection string>
   BASE_URL=<Base URL of your deployed API>
   ```

4. Start the application:
   ```bash
   npm start
   ```

---

## API Endpoints

### 1. POST `/shorten`
**Description**: Shorten a URL.  
**Request Body**:
```json
{
  "originalUrl": "https://example.com"
}
```
**Response**:
```json
{
  "shortUrl": "http://localhost:3000/abcd1234"
}
```

### 2. GET `/:shortId`
**Description**: Redirect to the original URL.  
**Response**: 302 Redirect

### 3. GET `/stats/:shortId`
**Description**: Retrieve usage statistics.  
**Response**:
```json
{
  "originalUrl": "https://example.com",
  "clicks": 42,
  "lastAccessed": "2024-11-26T12:34:56Z"
}
```

---

## Documentation
See the full API documentation [here](https://your-deployed-url.com/docs).

---

## License
This project is licensed under the MIT License.
