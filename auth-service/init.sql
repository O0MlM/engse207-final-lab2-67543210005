CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'user'
);

INSERT INTO users (username, email, password_hash, role)
VALUES 
    ('alice', 'alice@lab.local', '$2a$10$7EqJtq98hPqEX7fNZaFWoO.H4Gq7Z0vYhE6C0Bpvy.bukgqS0bkk2', 'member'),
    ('bob',   'bob@lab.local',   '$2b$10$cY3xDvgHoILRgqW0wZDsXuP3itju30a/C27ohmYTcFoDxoMFBk6ny',   'member'),
    ('admin', 'admin@lab.local', '$2b$10$WImz3yWATeTWJ70/wFl4Z.nNkz8oY0f1b2LOz0EXK7urcXI9KEHve','admin');