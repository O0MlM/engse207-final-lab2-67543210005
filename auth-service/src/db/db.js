const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST || "auth-db",
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || "auth_user",
  password: process.env.DB_PASSWORD || "auth_pass",
  database: process.env.DB_NAME || "auth_db"
});

module.exports = pool;