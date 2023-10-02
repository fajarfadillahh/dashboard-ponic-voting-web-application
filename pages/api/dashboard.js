import prisma from "@/utils/database";

export default async function handler(req, res) {
  if (req.method == "GET") {
    try {
      const [total_users, total_rooms, total_candidates] =
        await prisma.$transaction([
          prisma.user.count(),
          prisma.room.count(),
          prisma.candidate.count(),
        ]);

      res.status(200).json({
        success: true,
        data: {
          total_users,
          total_rooms,
          total_candidates,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error,
      });
    }
  }
}
