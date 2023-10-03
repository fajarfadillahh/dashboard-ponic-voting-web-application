import { describe, it, expect, beforeAll, afterAll } from "vitest";
import supertest from "supertest";
import {
  createTestAdmin,
  createTestRoom,
  createTestUser,
  getTestRoom,
  getTestUser,
  removeTestAdmin,
  loginTestAdmin,
} from "../utils/api.util";

const URL = "http://localhost:3000/api";

describe("GET /api/dashboard", function () {
  beforeAll(async () => {
    await createTestAdmin();
  });

  afterAll(async () => {
    await removeTestAdmin();
  });

  it.concurrent("should can get data dashboard", async () => {
    const api_token = await loginTestAdmin(URL);

    const response = await supertest(URL)
      .get("/dashboard")
      .set("API_TOKEN", api_token);

    expect(response.status).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.data).toEqual(
      expect.objectContaining({
        total_users: expect.any(Number),
        total_rooms: expect.any(Number),
        total_candidates: expect.any(Number),
      }),
    );
  });

  it.concurrent("should return 401", async () => {
    const response = await supertest(URL).get("/dashboard");

    expect(response.status).toBe(401);
    expect(response.body.success).toBeFalsy();
    expect(response.body.message).toBeDefined();
  });
});

describe("GET /api/users", function () {
  beforeAll(async () => {
    await createTestAdmin();
  });

  afterAll(async () => {
    await removeTestAdmin();
  });

  it.concurrent("should can get data users", async () => {
    const api_token = await loginTestAdmin(URL);

    const response = await supertest(URL)
      .get("/users")
      .set("API_TOKEN", api_token);

    expect(response.status).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          fullname: expect.any(String),
          email: expect.any(String),
          created_at: expect.any(String),
        }),
      ]),
    );
  });

  it.concurrent("should return 401", async () => {
    const response = await supertest(URL).get("/users");

    expect(response.status).toBe(401);
    expect(response.body.success).toBeFalsy();
    expect(response.body.message).toBeDefined();
  });
});

describe("DELETE /api/users", function () {
  beforeAll(async () => {
    await createTestAdmin();
    await createTestUser();
    await createTestRoom();
  });

  afterAll(async () => {
    await removeTestAdmin();
  });

  it.concurrent("should can delete data users", async () => {
    const testuser = await getTestUser();
    const api_token = await loginTestAdmin(URL);

    const response = await supertest(URL)
      .delete("/users")
      .send({
        user_id: testuser.id,
      })
      .set("API_TOKEN", api_token);

    expect(response.status).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBeDefined();
  });

  it.concurrent("should return 400", async () => {
    const api_token = await loginTestAdmin(URL);
    const response = await supertest(URL)
      .delete("/users")
      .send()
      .set("API_TOKEN", api_token);

    expect(response.status).toBe(400);
    expect(response.body.success).toBeFalsy();
    expect(response.body.message).toBeDefined();
  });

  it.concurrent("should return 404", async () => {
    const api_token = await loginTestAdmin(URL);
    const response = await supertest(URL)
      .delete("/users")
      .send({
        user_id: 696969,
      })
      .set("API_TOKEN", api_token);

    expect(response.status).toBe(404);
    expect(response.body.success).toBeFalsy();
    expect(response.body.message).toBeDefined();
  });

  it.concurrent("should return 401", async () => {
    const response = await supertest(URL).get("/users");

    expect(response.status).toBe(401);
    expect(response.body.success).toBeFalsy();
    expect(response.body.message).toBeDefined();
  });
});

describe("GET /api/rooms", function () {
  beforeAll(async () => {
    await createTestAdmin();
  });

  afterAll(async () => {
    await removeTestAdmin();
  });

  it.concurrent("should can get data rooms", async () => {
    const api_token = await loginTestAdmin(URL);
    const response = await supertest(URL)
      .get("/rooms")
      .set("API_TOKEN", api_token);

    expect(response.status).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          start: expect.any(Number),
          end: expect.any(Number),
          code: expect.any(String),
          owner: expect.any(String),
          created_at: expect.any(String),
          candidates: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
            }),
          ]),
        }),
      ]),
    );
  });

  it.concurrent("should return 401", async () => {
    const response = await supertest(URL).get("/rooms");

    expect(response.status).toBe(401);
    expect(response.body.success).toBeFalsy();
    expect(response.body.message).toBeDefined();
  });
});

describe("DELETE /api/rooms", function () {
  beforeAll(async () => {
    await createTestAdmin();
    await createTestUser();
    await createTestRoom();
  });

  afterAll(async () => {
    const api_token = await loginTestAdmin(URL);
    const testuser = await getTestUser();
    await supertest(URL)
      .delete("/users")
      .send({
        user_id: testuser.id,
      })
      .set("API_TOKEN", api_token);
    await removeTestAdmin();
  });

  it.concurrent("should can delete data rooms", async () => {
    const api_token = await loginTestAdmin(URL);
    const testroom = await getTestRoom();

    const response = await supertest(URL)
      .delete("/rooms")
      .send({
        room_id: testroom.id,
      })
      .set("API_TOKEN", api_token);

    expect(response.status).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBeDefined();
  });

  it.concurrent("should return 400", async () => {
    const api_token = await loginTestAdmin(URL);
    const response = await supertest(URL)
      .delete("/rooms")
      .send()
      .set("API_TOKEN", api_token);

    expect(response.status).toBe(400);
    expect(response.body.success).toBeFalsy();
    expect(response.body.message).toBeDefined();
  });

  it.concurrent("should return 404", async () => {
    const api_token = await loginTestAdmin(URL);
    const response = await supertest(URL)
      .delete("/rooms")
      .send({
        room_id: 696969,
      })
      .set("API_TOKEN", api_token);

    expect(response.status).toBe(404);
    expect(response.body.success).toBeFalsy();
    expect(response.body.message).toBeDefined();
  });

  it.concurrent("should return 401", async () => {
    const response = await supertest(URL).get("/rooms");

    expect(response.status).toBe(401);
    expect(response.body.success).toBeFalsy();
    expect(response.body.message).toBeDefined();
  });
});

describe("GET /api/logs", function () {
  beforeAll(async () => {
    await createTestAdmin();
  });

  afterAll(async () => {
    await removeTestAdmin();
  });

  it.concurrent("should can get data logs", async () => {
    const api_token = await loginTestAdmin(URL);
    const response = await supertest(URL)
      .get("/logs")
      .set("API_TOKEN", api_token);

    expect(response.status).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          log_id: expect.any(String),
          name: expect.any(String),
          device: expect.any(String),
          created_at: expect.any(String),
        }),
      ]),
    );
  });

  it.concurrent("should return 401", async () => {
    const response = await supertest(URL).get("/logs");

    expect(response.status).toBe(401);
    expect(response.body.success).toBeFalsy();
    expect(response.body.message).toBeDefined();
  });
});

describe("POST /api/auth/login", function () {
  beforeAll(async () => {
    await createTestAdmin();
  });

  afterAll(async () => {
    await removeTestAdmin();
  });

  it.concurrent("should can login", async () => {
    const response = await supertest(URL).post("/auth/login").send({
      username: "unittest",
      password: "unittest",
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.data).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      }),
    );
  });

  it.concurrent("should return 400", async () => {
    const response = await supertest(URL).post("/auth/login").send({
      username: "unittest",
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBeFalsy();
    expect(response.body.message).toBeDefined();
  });
});
