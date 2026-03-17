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

app.use("/api/users", auth, usersRoute);

app.get("/health", (req,res)=>{
  res.json({
    status:"ok",
    service:"user-service"
  });
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`User service running on port ${PORT}`);
});