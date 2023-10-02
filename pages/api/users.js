import prisma from "@/utils/database";

export default async function handler(req, res) {
  if (req.method == "GET") {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          fullname: true,
          email: true,
        },
      });

      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error,
      });
    }
  }

  if (req.method == "DELETE") {
    try {
      const { user_id } = req.body;

      if (!user_id) {
        return res.status(400).json({
          success: false,
          message: "required user_id",
        });
      }

      const user = await prisma.user.count({
        where: {
          id: user_id,
        },
      });

      if (user < 1) {
        return res.status(404).json({
          success: false,
          message: "user not found",
        });
      }

      const rooms = await prisma.room.findMany({
        where: {
          user_id,
        },
      });

      await Promise.all(
        rooms.map(async (room) => {
          await prisma.$transaction([
            prisma.vote.deleteMany({
              where: {
                room_id: room.id,
              },
            }),
            prisma.candidate.deleteMany({
              where: {
                room_id: room.id,
              },
            }),
          ]);
        }),
      );

      await prisma.$transaction([
        prisma.room.deleteMany({
          where: {
            user_id,
          },
        }),
        prisma.user.deleteMany({
          where: {
            id: user_id,
          },
        }),
      ]);

      res.status(200).json({
        success: true,
        message: "delete users successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error,
      });
    }
  }
}
