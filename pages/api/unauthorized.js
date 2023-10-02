export default function handler(req, res) {
  res.status(401).json({
    success: false,
    message: "Unauthorized",
  });
}
