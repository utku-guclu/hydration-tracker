const request = require("supertest");
const app = require("../index");

let token = ""; // Variable to store the token for later use

// WELCOME
describe("Welcome", () => {
  it("welcome", async () => {
    const response = await request(app).get("/").expect(200);
  });
});

describe("User Registration and Authentication", () => {
  it("should register a new user", async () => {
    const response = await request(app)
      .post("/user/register")
      .send({
        username: "testuser2",
        password: "Testpass1",
      })
      .expect(201);

    // Store the token for later use
    token = response.body.token;

    // Ensure the response contains the token
    expect(response.body).toHaveProperty("token");
  });

  it("should authenticate an existing user", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({
        username: "testuser",
        password: "Testpass1",
      })
      .expect(200);

    // Ensure the response contains the token
    expect(response.body).toHaveProperty("token");

    // Store the token for later use
    token = response.body.token;
  });
});

// Use the stored token for subsequent authenticated requests
describe("Protected Routes", () => {
  it("should access protected route with stored token", async () => {
    const response = await request(app)
      .delete("/api/hydration/logs/reset")
      .set("Authorization", `Bearer ${token}`)
      .expect(204);
  });
});

describe('Authentication Controller', () => {
    // Test case for access granted
    it('should grant access to authenticated users', async () => {
      const response = await request(app)
        .post('auth/access')
        .set('Authorization', `Bearer ${token}`);
      
      // Verify that the response status code is 200 and contains the expected message
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Access granted to protected route');
    });
  
    // Test case for access denied (invalid or missing token)
    it('should deny access if token is missing or invalid', async () => {
      // Send a request without setting the Authorization header
      const response = await request(app).post('auth/access');
  
      // Verify that the response status code is 403 and contains the expected error message
      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty('error', 'Access Denied');
    });
  });
