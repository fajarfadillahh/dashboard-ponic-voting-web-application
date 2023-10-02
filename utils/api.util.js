import prisma from "./database";
import { hash } from "./password";

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

export { createTestUser, createTestRoom, getTestUser, getTestRoom };
