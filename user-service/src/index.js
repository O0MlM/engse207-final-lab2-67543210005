require("dotenv").config();
const express = require("express");
const cors = require("cors");
const usersRoute = require("./routes/users");
const auth = require("./middleware/authMiddleware");

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));
app.options("*", cors());

app.use(express.json());

// ✅ health ต้องมาก่อน auth
app.get("/api/users/health", (req,res)=>{
  res.json({
    status:"ok",
    service:"user-service"
  });
});

// routes ที่ต้องใช้ JWT
app.use("/api/users", auth, usersRoute);

const PORT = process.env.PORT || 3003;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`User service running on port ${PORT}`);
});