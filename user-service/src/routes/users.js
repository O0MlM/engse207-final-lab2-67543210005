const express = require("express");
const router = express.Router();
const db = require("../db");
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
router.get("/me", async (req,res)=>{

  const userId = req.user.sub;

  const result = await db.query(
    "SELECT * FROM user_profiles WHERE user_id=$1",
    [userId]
  );

  res.json(result.rows[0]);

});

// PUT /api/users/me
router.put("/me", async (req,res)=>{

  const userId = req.user.sub;
  const {display_name,bio} = req.body;

  const result = await db.query(
    `UPDATE user_profiles
     SET display_name=$1, bio=$2
     WHERE user_id=$3
     RETURNING *`,
     [display_name,bio,userId]
  );

  res.json(result.rows[0]);

});

module.exports = router;