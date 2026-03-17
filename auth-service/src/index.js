require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const morgan  = require('morgan');
const authRoutes = require('./routes/auth');

const app  = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ──
app.use(cors({
  origin: "*",
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

app.options("*", cors()); // รองรับ preflight

app.use(express.json());

// Morgan: log ทุก request ในรูปแบบที่ Loki อ่านได้
morgan.token('body-size', (req) => {
  return req.body ? JSON.stringify(req.body).length + 'b' : '0b';
});
app.use(morgan(':method :url :status :response-time ms - body::body-size', {
  stream: {
    write: (msg) => console.log(msg.trim())  // stdout → Docker log driver
  }
}));

// ── Routes ──
app.use('/api/auth', authRoutes);

app.get("/health", (req,res)=>{
  res.json({ status:"ok", service:"auth-service-root" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.path });
});

// Error handler
app.use((err, req, res, _next) => {
  console.error('[ERROR]', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

// ── Start ──
app.listen(PORT, "0.0.0.0", () => {
  console.log(`[auth-service] Running on port ${PORT}`);
  console.log(`[auth-service] JWT_EXPIRES: ${process.env.JWT_EXPIRES || '1h'}`);
});