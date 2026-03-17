const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db/db");

const JWT_SECRET = process.env.JWT_SECRET || "secret";

/* =========================
   HEALTH CHECK
========================= */
router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "auth-service"
  });
});

/* =========================
   LOGIN
========================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email และ Password จำเป็นต้องกรอก"
      });
    }

    const result = await pool.query(
      `SELECT id, username, email, password_hash, role 
       FROM users 
       WHERE email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        error: "Email หรือ Password ไม่ถูกต้อง"
      });
    }

    const user = result.rows[0];

    const passwordMatch = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordMatch) {
      return res.status(401).json({
        error: "Email หรือ Password ไม่ถูกต้อง"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("[AUTH] Login error:", error.message);

    res.status(500).json({
      error: "Server error"
    });
  }
});

router.post("/register", async (req, res) => {
  try {

    const { username, email, password } = req.body

    if (!username || !email || !password) {
      return res.status(400).json({ error: "missing fields" })
    }

    const hash = await bcrypt.hash(password, 10)

    const result = await pool.query(
      `INSERT INTO users (username,email,password_hash)
       VALUES ($1,$2,$3)
       RETURNING id,username,email`,
      [username,email,hash]
    )

    res.status(201).json({
      message: "User registered",
      user: result.rows[0]
    })

  } catch (err) {

    if (err.code === "23505") {
      return res.status(409).json({ error: "Email already exists" })
    }

    res.status(500).json({ error: "Server error" })
  }
})

router.get("/me", (req, res) => {

  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: "Missing token" })
  }

  const token = authHeader.split(" ")[1]

  try {

    const decoded = jwt.verify(token, JWT_SECRET)

    res.json({
      id: decoded.id,
      email: decoded.email,
      role: decoded.role
    })

  } catch (err) {

    return res.status(401).json({
      error: "Invalid token"
    })

  }
})

module.exports = router;