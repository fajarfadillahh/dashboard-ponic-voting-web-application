import prisma from "@/utils/database";

export default async function handler(req, res) {
  if (req.method == "GET") {
    try {
      const logs = await prisma.log.findMany({
        select: {
          log_id: true,
          name: true,
          device: true,
          created_at: true,
        },
      });

      res.status(200).json({
        success: true,
        data: logs,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error,
      });
    }
  }
}
