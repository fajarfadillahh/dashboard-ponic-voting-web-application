import prisma from "@/utils/database";

export default async function handler(req, res) {
  const api_token = req.headers["api_token"];

  if (!api_token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const token = await prisma.token.findFirst({
    where: {
      value: api_token,
    },
  });

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  if (Date.now() > Number(token.expired)) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  if (req.method == "GET") {
    try {
      const rooms = await prisma.room.findMany({
        select: {
          id: true,
          name: true,
          start: true,
          end: true,
          code: true,
          candidate: {
            select: {
              id: true,
              name: true,
            },
          },
          user: {
            select: {
              fullname: true,
            },
          },
          created_at: true,
        },
        orderBy: {
          created_at: "desc",
        },
      });

      res.status(200).json({
        success: true,
        data: rooms.map((room) => {
          room.owner = room.user.fullname;
          room.candidates = room.candidate;

          delete room.user;
          delete room.candidate;

          return {
            ...room,
            start: Number(room.start),
            end: Number(room.end),
          };
        }),
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
      const { room_id } = req.body;

      if (!room_id) {
        return res.status(400).json({
          success: false,
          message: "required room_id",
        });
      }

      const room = await prisma.room.findFirst({
        where: {
          id: room_id,
        },
      });

      if (!room) {
        return res.status(404).json({
          success: false,
          message: "room not found",
        });
      }

      await prisma.$transaction([
        prisma.vote.deleteMany({
          where: {
            room_id,
          },
        }),
        prisma.candidate.deleteMany({
          where: {
            room_id,
          },
        }),
        prisma.room.deleteMany({
          where: {
            id: room_id,
          },
        }),
      ]);

      res.status(200).json({
        success: true,
        message: "delete rooms successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error,
      });
    }
  }
}
