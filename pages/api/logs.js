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
      const logs = await prisma.log.findMany({
        select: {
          log_id: true,
          name: true,
          device: true,
          created_at: true,
        },
        orderBy: {
          created_at: "desc",
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
