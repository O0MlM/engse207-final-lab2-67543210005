CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'TODO',
  priority TEXT DEFAULT 'medium',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE logs (
  id SERIAL PRIMARY KEY,
  level TEXT,
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO tasks (user_id, title, description, status, priority) VALUES
(1,'ออกแบบ UI หน้า Login','ใช้ Figma ออกแบบ mockup','TODO','high'),
(1,'เขียน API สำหรับ Task CRUD','Express.js + PostgreSQL','IN_PROGRESS','high'),
(2,'ทดสอบ JWT Authentication','ใช้ Postman ทดสอบทุก endpoint','TODO','medium'),
(3,'Deploy บน Railway','ทำ Final Lab ชุดที่ 2','TODO','medium');