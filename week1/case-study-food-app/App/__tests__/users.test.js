const request = require("supertest");

const db = require("../dbconnection");

const app = require("../food_app");

describe("GET / Users", () => {
    test("It should respond with an array of users", async () => {
      const response = await request(app).get("/api/users");
      expect(response.statusCode).toBe(200);
    });
});

describe("GET / User with specific userid", () => {
    test("It should respond the details of user", async () => {
      const response = await request(app).get("/api/users/10");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("username");
      expect(response.body).toHaveProperty("email");
    });
});

describe("GET / User with specific userid", () => {
    test("userid not found", async () => {
      const response = await request(app).get("/api/users/100");
      expect(response.statusCode).toBe(404);
      expect(response.text).toBe("Sorry user With 100 not found");
    });
});

describe("POST /api/register", () => {
    test("It should create a new user", async () => {
      const newUser = await request(app)
        .post("/api/register")
        .send({
            "username": "jaya",
            "email": "tanwanijaya@gmail.com",
            "password": "jaya1234",
            "address": {
            "houseno": 125,
            "street": "bhatia chowk",
            "city": "ulhasnagar",
            "state": "maharashtra",
            "zip": 421003
            }
        });
  
      expect(newUser.body).toHaveProperty("id");
      expect(newUser.body.username).toBe("jaya");
      expect(newUser.statusCode).toBe(201);
    });
});

describe("POST /api/authenticate", () => {
    test("It should authenticate user credentials", async () => {
      const newUser = await request(app)
        .post("/api/authenticate")
        .send({
            "username": "tanwanijaya2000",
            "password": "jaya@march"
        });

      expect(newUser.text).toBe("User logged in successful");
      expect(newUser.statusCode).toBe(200);
    });
});

describe("POST /api/authenticate", () => {
    test("wrong user credentials", async () => {
      const newUser = await request(app)
        .post("/api/authenticate")
        .send({
            "username": "tanwanijaya",
            "password": "jaya@march"
        });

      expect(newUser.text).toBe("user details are wrong");
      expect(newUser.statusCode).toBe(403);
    });
});

describe("PUT /api/users", () => {
    test("update existing user details", async () => {
      const updatedUser = await request(app)
        .put("/api/users")
        .send({
                "id": 13,
                "username": "tanwanijaya2000",
                "email": "tanwanijaya@gmail.com",
                "password": "jaya@march",
                "address": {
                    "houseno": 1200,
                    "street": "prem nagar tekdi",
                    "city": "unr",
                    "state": "maharashtra",
                    "zip": 421003
                }
        });

      expect(updatedUser.text).toBe("details updated successfully for user: 13");
      expect(updatedUser.statusCode).toBe(200);
    });
});

describe("PUT /api/users", () => {
    test("user doesn't exist, cannot update the data", async () => {
      const updatedUser = await request(app)
        .put("/api/users")
        .send({
                "id": 130,
                "username": "tanwanijaya2000",
                "email": "tanwanijaya@gmail.com",
                "password": "jaya@march",
                "address": {
                    "houseno": 1200,
                    "street": "prem nagar tekdi",
                    "city": "unr",
                    "state": "maharashtra",
                    "zip": 421003
                }
        });

      expect(updatedUser.text).toBe("Sorry user With 130 not found");
      expect(updatedUser.statusCode).toBe(404);
    });
});

describe("DELETE /api/users", () => {
    test("user doesn't exist, cannot delete", async () => {
      const deleteUser = await request(app).delete("/api/users/130");
      expect(deleteUser.text).toBe("Sorry user With 130 not found");
      expect(deleteUser.statusCode).toBe(404);
    });
});

describe("DELETE /api/users", () => {
    test("delete valid user", async () => {
      const deleteUser = await request(app).delete("/api/users/3");
      expect(deleteUser.text).toBe("User Deleted Successfully");
      expect(deleteUser.statusCode).toBe(200);
    });
});