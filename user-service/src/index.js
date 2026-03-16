const express = require("express");
const cors = require("cors");
const usersRoute = require("./routes/users");
const auth = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", auth, usersRoute);

app.listen(process.env.PORT || 3003, ()=>{
  console.log("User service running");
});

app.get("/health", (req,res)=>{
    res.json({
      status:"ok",
      service:"user-service"
    });
  });