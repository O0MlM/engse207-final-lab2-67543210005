const express = require("express");
const cors = require("cors");

const { Pool } = require("pg");
const jwt = require("jsonwebtoken");

const app = express();

const taskRoutes = require("./routes/tasks");

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);

app.listen(3002, () => {
  console.log("Task service running");
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: "No token" });

  const token = header.split(" ")[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

app.get("/health", (req, res) => {
  res.json({ status: "task-service ok" });
});

app.get("/api/tasks", authMiddleware, async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM tasks WHERE user_id=$1 ORDER BY id",
    [req.user.id]
  );
  res.json(result.rows);
});

app.post("/api/tasks", authMiddleware, async (req, res) => {
  const { title, description } = req.body;

  const result = await pool.query(
    "INSERT INTO tasks (user_id,title,description) VALUES ($1,$2,$3) RETURNING *",
    [req.user.id, title, description]
  );

  res.json(result.rows[0]);
});