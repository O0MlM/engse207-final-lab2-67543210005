CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP
);

INSERT INTO users (username, email, password_hash, role)
VALUES
(
  'alice',
  'alice@lab.local',
  '$2a$12$feUyrVfuSMR2q/QMkZVKVOIWOqOrvAS7efMmm7zpMtGicAoSEWhE2',
  'user'
),
(
  'bob',
  'bob@lab.local',
  '$2a$12$vQhU/RYLP78TG3I/EAFF4etkMZ0WxRfIvh.I4Pv/yHgUVIcWfRgZG',
  'user'
),
(
  'admin',
  'admin@lab.local',
  '$2a$12$RMzAZkaA9csXJcj3oGzga.kJPECLxZW6lWj8W2gIKUMqvF6QfrVxi',
  'admin'
);