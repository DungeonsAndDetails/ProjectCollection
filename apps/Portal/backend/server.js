const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4999;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "portal-backend" });
});

app.get("/api/session", (req, res) => {
  res.json({
    isAuthenticated: false,
    role: "owner",
    primaryTheme: "daylight",
  });
});

app.listen(PORT, () => {
  console.log(`Portal backend listening on port ${PORT}`);
});
