import { describe, it, expect, beforeAll, afterAll } from "vitest";
import supertest from "supertest";
import {
  createTestRoom,
  createTestUser,
  getTestRoom,
  getTestUser,
} from "../utils/api.util";

const URL = "http://localhost:3000/api";

describe("GET /api/dashboard", function () {
  it.concurrent("should can get data dashboard", async () => {
    const response = await supertest(URL).get("/dashboard");

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
});

describe("GET /api/users", function () {
  it.concurrent("should can get data users", async () => {
    const response = await supertest(URL).get("/users");

    expect(response.status).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          fullname: expect.any(String),
          email: expect.any(String),
        }),
      ]),
    );
  });
});

describe("DELETE /api/users", function () {
  beforeAll(async () => {
    await createTestUser();
    await createTestRoom();
  });

  it.concurrent("should can delete data users", async () => {
    const testuser = await getTestUser();

    const response = await supertest(URL).delete("/users").send({
      user_id: testuser.id,
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBeDefined();
  });

  it.concurrent("should return 400", async () => {
    const response = await supertest(URL).delete("/users").send();

    expect(response.status).toBe(400);
    expect(response.body.success).toBeFalsy();
    expect(response.body.message).toBeDefined();
  });

  it.concurrent("should return 404", async () => {
    const response = await supertest(URL).delete("/users").send({
      user_id: 696969,
    });

    expect(response.status).toBe(404);
    expect(response.body.success).toBeFalsy();
    expect(response.body.message).toBeDefined();
  });
});

describe("GET /api/rooms", function () {
  it.concurrent("should can get data rooms", async () => {
    const response = await supertest(URL).get("/rooms");

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
});

describe("DELETE /api/rooms", function () {
  beforeAll(async () => {
    await createTestUser();
    await createTestRoom();
  });

  afterAll(async () => {
    const testuser = await getTestUser();
    await supertest(URL).delete("/users").send({
      user_id: testuser.id,
    });
  });

  it.concurrent("should can delete data rooms", async () => {
    const testroom = await getTestRoom();

    const response = await supertest(URL).delete("/rooms").send({
      room_id: testroom.id,
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBeDefined();
  });

  it.concurrent("should return 400", async () => {
    const response = await supertest(URL).delete("/rooms").send();

    expect(response.status).toBe(400);
    expect(response.body.success).toBeFalsy();
    expect(response.body.message).toBeDefined();
  });

  it.concurrent("should return 404", async () => {
    const response = await supertest(URL).delete("/rooms").send({
      room_id: 696969,
    });

    expect(response.status).toBe(404);
    expect(response.body.success).toBeFalsy();
    expect(response.body.message).toBeDefined();
  });
});

describe("GET /api/logs", function () {
  it.concurrent("should can get data logs", async () => {
    const response = await supertest(URL).get("/logs");

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
});
