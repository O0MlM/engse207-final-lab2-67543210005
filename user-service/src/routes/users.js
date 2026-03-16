const express = require("express");
const router = express.Router();
const pool = require("../db");
const { verifyToken } = require("../middleware/jwtUtils");

// health endpoint (ไม่ต้องใช้ token)
router.get("/health",(req,res)=>{
  res.json({
    status:"ok",
    service:"user-service",
    time:new Date()
  });
});

// หลังจากนี้ต้องมี JWT
router.use(verifyToken);

// GET /api/users/me
router.get("/me", async (req, res) => {
  try {

    const userId = req.user.id

    const result = await pool.query(
      `SELECT id, username, email, display_name, bio
       FROM users
       WHERE id = $1`,
      [userId]
    )

    res.json(result.rows[0])

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
})

// PUT /api/users/me
router.put("/me", async (req, res) => {
  try {

    const userId = req.user.id
    const { display_name, bio } = req.body

    const result = await pool.query(
      `UPDATE users
       SET display_name=$1, bio=$2
       WHERE id=$3
       RETURNING id,username,email,display_name,bio`,
      [display_name, bio, userId]
    )

    res.json(result.rows[0])

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
})

// GET /api/users (admin only)
router.get("/", async (req, res) => {
  try {

    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" })
    }

    const result = await pool.query(
      `SELECT id, username, email, display_name, bio
       FROM users
       ORDER BY id`
    )

    res.json(result.rows)

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
})

module.exports = router;