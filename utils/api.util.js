import prisma from "./database";
import { hash } from "./password";
import supertest from "supertest";
import { jwtVerify } from "jose";

async function createTestUser() {
  await prisma.user.create({
    data: {
      email: "unittest@mail.com",
      fullname: "Unit Test",
      password: await hash("unittest"),
    },
  });
}

async function createTestRoom() {
  const user = await getTestUser();
  await prisma.room.create({
    data: {
      code: "TESTTEST",
      start: Date.now(),
      end: Date.now() + 1000 * 60 * 10,
      name: "Test Room",
      user_id: user.id,
      candidate: {
        createMany: {
          data: [
            {
              name: "candidate 1",
            },
            {
              name: "candidate 2",
            },
          ],
        },
      },
    },
  });
}

async function getTestUser() {
  return prisma.user.findFirst({
    where: {
      email: "unittest@mail.com",
    },
  });
}

async function getTestRoom() {
  const user = await getTestUser();

  return prisma.room.findFirst({
    where: {
      user_id: user.id,
    },
  });
}

async function createTestAdmin() {
  await prisma.admin.create({
    data: {
      fullname: "Unit Test",
      username: "unittest",
      email: "unittest@mail.com",
      password: await hash("unittest"),
      role: "NORMAL",
    },
  });
}

async function getTestAdmin() {
  await prisma.admin.findFirst({
    data: {
      fullname: "Unit Test",
      username: "unittest",
      email: "unittest@mail.com",
      password: await hash("unittest"),
      role: "NORMAL",
    },
  });
}

async function removeTestAdmin() {
  await prisma.admin.deleteMany({
    where: {
      username: "unittest",
    },
  });
}

async function loginTestAdmin(url) {
  const response = await supertest(url).post("/auth/login").send({
    username: "unittest",
    password: "unittest",
  });

  const { token } = response.body.data;

  const verify = await jwtVerify(
    token,
    new TextEncoder().encode(process.env.JWT_SECRET_KEY),
  );

  return verify.payload.api_token;
}

export {
  createTestUser,
  createTestRoom,
  getTestUser,
  getTestRoom,
  createTestAdmin,
  getTestAdmin,
  removeTestAdmin,
  loginTestAdmin,
};
