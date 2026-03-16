const { Pool } = require('pg');
const fs   = require('fs');
const path = require('path');

const { Pool } = require('pg')

const pool = new Pool({
  host: 'task-db',
  user: 'admin',
  password: 'secret',
  database: 'taskdb',
  port: 5432
})

pool.on('connect', () => {
  console.log('Connected to task database')
})

pool.on('error', (err) => {
  console.error('DB ERROR:', err)
})

module.exports = pool

async function initDB() {
  const sql = fs.readFileSync(path.join(__dirname, 'init.sql'), 'utf8');
  await pool.query(sql);
  console.log('[task-db] Tables initialized');
}

module.exports = { pool, initDB };