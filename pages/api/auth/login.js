import prisma from "@/utils/database";
import { verify } from "@/utils/password";
import { SignJWT } from "jose";
import UAParser from "ua-parser-js";

export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: "required username or password",
        });
      }

      const admin = await prisma.admin.findFirst({
        where: {
          username,
        },
      });

      if (!admin) {
        return res.status(400).json({
          success: false,
          message: "username or password wrong",
        });
      }

      if (!(await verify(password, admin.password))) {
        return res.status(400).json({
          success: false,
          message: "username or password wrong",
        });
      }

      const UA = req.headers["user-agent"];
      const parser = new UAParser(UA);

      const device = parser.getOS().name
        ? `${parser.getOS().name} ${parser.getOS().version}`
        : "unknown";

      const api_token = crypto.randomUUID().replace(/-/g, "");

      await prisma.$transaction([
        prisma.token.create({
          data: {
            value: api_token,
            expired: Date.now() + 1000 * 60 * 60,
          },
        }),
        prisma.log.create({
          data: {
            device,
            name: admin.fullname,
            log_id: crypto.randomUUID().replace(/-/g, "").slice(0, 10),
          },
        }),
      ]);

      const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

      const payload = {
        fullname: admin.fullname,
        email: admin.email,
        api_token,
      };

      const token = await new SignJWT(payload)
        .setExpirationTime("1h")
        .setProtectedHeader({ alg: "HS256" })
        .sign(secret);

      res.status(200).json({
        success: true,
        data: {
          token,
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
