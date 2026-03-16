# ENGSE207 Software Architecture

## Final Lab — Set 2: Cloud Microservices Task Board

---

# 1. Course Information

**Course:** ENGSE207 Software Architecture
**Assignment:** Final Lab — Set 2
**Topic:** Cloud-Native Microservices with JWT, Database-per-Service, and Deployment

**Student:**
67543210005-4 นางสาวสาริศา ถวัลย์วราศักดิ์

**Repository:**
`engse207-final-lab2-67543210005`

---

# 2. System Overview

โปรเจกต์นี้เป็นระบบ **Task Board แบบ Cloud Microservices** ที่พัฒนาต่อยอดจาก Set 1
โดยเน้นการแยกบริการอย่างสมบูรณ์และการ deploy ขึ้น Cloud

แนวคิดหลักของระบบ

* Microservices Architecture เต็มรูปแบบ
* แยกฐานข้อมูลต่อ service (Database-per-Service)
* สื่อสารผ่าน REST APIs
* ยืนยันตัวตนด้วย JWT
* Deploy บน Cloud Platform
* ทดสอบ API ผ่าน curl และ Frontend

ฟีเจอร์หลักของระบบ

* Register / Login ด้วย JWT Authentication
* จัดการข้อมูลผู้ใช้ (User Profile)
* สร้าง / แก้ไข / ลบ Tasks
* สิทธิ์การใช้งานตาม Role (User / Admin)
* แต่ละ service มีฐานข้อมูลของตัวเอง
* รันผ่าน Docker Compose (Local)
* Deploy บน Railway (Cloud)

---

# 3. System Architecture

ระบบออกแบบตามแนวคิด **Cloud Microservices Architecture**

```text
Client (Browser / Postman / curl)
            │
            │ HTTPS
            ▼
        API Services (Cloud)
            │
 ┌──────────┼──────────┐
 ▼          ▼          ▼
Auth      User       Task
Service   Service    Service
 │          │          │
 ▼          ▼          ▼
Auth DB   User DB    Task DB
(Postgres)(Postgres) (Postgres)
```

---

## Services ในระบบ

| Service      | Description                  |
| ------------ | ---------------------------- |
| auth-service | Authentication และ JWT       |
| user-service | จัดการข้อมูลผู้ใช้           |
| task-service | CRUD operations สำหรับ tasks |
| auth-db      | ฐานข้อมูลของ auth-service    |
| user-db      | ฐานข้อมูลของ user-service    |
| task-db      | ฐานข้อมูลของ task-service    |

---

# 4. Repository Structure

```text
final-lab/set2/
├── README.md
├── TEAM_SPLIT.md
├── INDIVIDUAL_REPORT_[studentid].md
├── docker-compose.yml
├── .env.example
│
├── auth-service/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│
├── user-service/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│
├── task-service/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│
└── frontend/
    ├── index.html
    └── assets/
```

---

# 5. Technologies Used

* Node.js
* Express.js
* PostgreSQL
* Docker
* Docker Compose
* JWT (jsonwebtoken)
* bcryptjs
* HTML / JavaScript
* Railway (Cloud Deployment)

---

# 6. Database Design (Database-per-Service)

| Service      | Database | Purpose                    |
| ------------ | -------- | -------------------------- |
| auth-service | auth_db  | เก็บบัญชีผู้ใช้และรหัสผ่าน |
| user-service | user_db  | เก็บข้อมูลโปรไฟล์ผู้ใช้    |
| task-service | task_db  | เก็บข้อมูลงาน (tasks)      |

ข้อดีของการแยกฐานข้อมูล

* ลดการพึ่งพากันระหว่าง service
* เพิ่มความปลอดภัยของข้อมูล
* รองรับการขยายระบบในอนาคต

---

# 7. Running the System (Local)

## 7.1 สร้างไฟล์ .env

ตัวอย่าง

```env
JWT_SECRET=dev-secret
JWT_EXPIRES=1h
```

---

## 7.2 รันระบบด้วย Docker

```bash
docker compose down -v
docker compose up --build
```

---

## 7.3 Ports ที่ใช้

| Service      | Port |
| ------------ | ---- |
| auth-service | 3001 |
| task-service | 3002 |
| user-service | 3003 |
| auth-db      | 5433 |
| task-db      | 5434 |
| user-db      | 5435 |

---

# 8. API Summary

## Auth Service

```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
GET  /api/auth/health
```

---

## User Service

```
GET  /api/users/me
PUT  /api/users/me
GET  /api/users        (admin only)
GET  /api/users/health
```

---

## Task Service

```
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
GET    /api/tasks/health
```

---

# 9. Authentication Flow

1. ผู้ใช้สมัครสมาชิกผ่าน Register API
2. Login สำเร็จ → ได้รับ JWT Token
3. ส่ง Token ผ่าน Header

```
Authorization: Bearer <token>
```

4. ทุก service ตรวจสอบ token ก่อนให้ใช้งาน

---

# 10. Role-Based Access Control

| Role  | Permissions                  |
| ----- | ---------------------------- |
| user  | จัดการ tasks และโปรไฟล์ตนเอง |
| admin | ดูข้อมูลผู้ใช้ทั้งหมด        |

---

# 11. Cloud Deployment (Railway)

ระบบถูก deploy แยก service บน Railway

| Service      | Deployment          |
| ------------ | ------------------- |
| auth-service | Railway Web Service |
| user-service | Railway Web Service |
| task-service | Railway Web Service |
| databases    | Railway PostgreSQL  |

---

# 12. Testing via curl (Cloud)

## Register

```bash
curl -X POST https://AUTH_URL/api/auth/register \
-H "Content-Type: application/json" \
-d '{
  "username":"testuser",
  "email":"testuser@example.com",
  "password":"123456"
}'
```

---

## Login

```bash
TOKEN=$(curl -s -X POST https://AUTH_URL/api/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email":"testuser@example.com",
  "password":"123456"
}' | jq -r '.token')
```

---

## Create Task

```bash
curl -X POST https://TASK_URL/api/tasks \
-H "Authorization: Bearer $TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "title":"My first cloud task",
  "description":"Deploy all services",
  "status":"TODO",
  "priority":"high"
}'
```

---

## Get Tasks

```bash
curl https://TASK_URL/api/tasks \
-H "Authorization: Bearer $TOKEN"
```

---

# 13. Test Cases

| Test | Description                     |
| ---- | ------------------------------- |
| T1   | Docker compose run successfully |
| T2   | Register success                |
| T3   | Login success                   |
| T4   | JWT authentication              |
| T5   | Create task                     |
| T6   | Get tasks                       |
| T7   | Update task                     |
| T8   | Delete task                     |
| T9   | Unauthorized request → 401      |
| T10  | Admin access users list         |
| T11  | Cloud deployment success        |

---

# 14. Screenshots

เก็บหลักฐานการทำงานไว้ในโฟลเดอร์

```
/screenshots
```

ตัวอย่างภาพ

* Docker containers running
* Register success
* Login success
* JWT token received
* Create task
* Get tasks
* Update task
* Delete task
* Unauthorized request
* Admin access
* Railway deployment

---

# 15. Problems Encountered

ปัญหาที่พบระหว่างพัฒนา

* JWT secret ไม่ตรงกันระหว่าง services
* Database schema ไม่ถูกสร้างอัตโนมัติ
* Docker volume เก็บข้อมูลเก่าทำให้ seed ไม่ทำงาน
* CORS error ระหว่าง frontend กับ backend
* Port ชนกันระหว่าง services

---

# 16. Known Limitations

ข้อจำกัดของระบบ

* ยังไม่มี API Gateway รวมศูนย์
* ไม่มี HTTPS ใน local environment
* ยังไม่มี refresh token
* ยังไม่มี monitoring/observability เต็มรูปแบบ

---

# 17. Future Improvements

แนวทางพัฒนาต่อ

* เพิ่ม API Gateway
* เพิ่ม HTTPS และ Domain จริง
* เพิ่ม Refresh Token
* เพิ่ม Centralized Logging
* เพิ่ม Monitoring Dashboard
* ใช้ Kubernetes orchestration

---

> เอกสารฉบับนี้เป็น README สำหรับงาน Final Lab Set 2 รายวิชา ENGSE207 Software Architecture
