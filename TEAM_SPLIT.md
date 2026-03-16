## ข้อมูลกลุ่ม

* กลุ่มที่: 06
* รายวิชา: ENGSE207 Software Architecture

---

## รายชื่อสมาชิก

* 67543210005-4 นางสาวสาริศา ถวัลย์วราศักดิ์

---

## การแบ่งงานหลัก

### สมาชิก: Sarisah Thawanwarasak

รับผิดชอบงานพัฒนาระบบทั้งหมดด้วยตนเอง ครอบคลุมทั้งการออกแบบ พัฒนา และทดสอบ โดยมีรายละเอียดดังนี้

**งานด้านสถาปัตยกรรมระบบ**

* ออกแบบระบบแบบ Microservices
* ออกแบบการแยกฐานข้อมูลแบบ Database-per-Service
* วางโครงสร้างโปรเจกต์และการเชื่อมต่อระหว่าง services

**งานพัฒนา Backend**

* พัฒนา **Auth Service** (Register, Login, JWT, Middleware)
* พัฒนา **User Service** (User Profile, Admin APIs)
* พัฒนา **Task Service** (CRUD Tasks APIs)
* ออกแบบ REST API ของแต่ละ service
* เชื่อมต่อ PostgreSQL แยกฐานข้อมูลต่อ service
* เขียน Database schema และ init scripts

**งานด้าน Security**

* พัฒนา JWT Authentication
* พัฒนา Middleware ตรวจสอบสิทธิ์การเข้าถึง
* ออกแบบ Role-Based Access Control (User / Admin)

**งานด้าน DevOps & Deployment**

* เขียน Dockerfile สำหรับทุก service
* เขียน docker-compose.yml สำหรับรันระบบทั้งหมด
* ตั้งค่า environment variables
* จัดการ container networking และ port mapping
* ทดสอบระบบในสภาพแวดล้อมแบบ container

**งานด้านการทดสอบระบบ**

* ทดสอบ API ด้วย curl และ Postman
* ทดสอบ JWT flow (Register → Login → ใช้งาน)
* ทดสอบการเรียกใช้งานข้าม service
* ทดสอบกรณี Unauthorized → 401

**งานเอกสารประกอบ**

* จัดทำ README.md
* จัดทำ INDIVIDUAL_REPORT
* สรุปขั้นตอนการติดตั้งและทดสอบระบบ

---

## งานที่ดำเนินการร่วมกัน

* ไม่มี (เป็นการพัฒนางานเดี่ยวทุกขั้นตอน)

---

## เหตุผลในการแบ่งงาน

เนื่องจากเป็นงานเดี่ยว ผู้จัดทำจึงรับผิดชอบทุกส่วนของระบบ
โดยแบ่งลำดับการทำงานตามขอบเขตของ service และขั้นตอนการพัฒนา ได้แก่

1. ออกแบบสถาปัตยกรรมระบบ
2. พัฒนา Backend Services
3. เชื่อมต่อฐานข้อมูล
4. จัดการ Authentication และ Security
5. ทดสอบระบบแบบ End-to-End
6. จัดทำเอกสารประกอบงาน

---

## สรุปการเชื่อมโยงงานของสมาชิก

แม้เป็นงานเดี่ยว แต่ลักษณะงานเป็นระบบ Microservices ที่แต่ละ service ต้องทำงานร่วมกัน ได้แก่

* Auth Service ออก Token ให้ผู้ใช้
* User Service และ Task Service ตรวจสอบ Token ก่อนให้ใช้งาน
* ทุก service เชื่อมต่อฐานข้อมูลของตนเอง
* Docker Compose ทำหน้าที่รวมทุก service ให้ทำงานร่วมกัน

ผู้จัดทำต้องออกแบบและทดสอบการทำงานร่วมกันของทุกส่วน
เพื่อให้ระบบสามารถทำงานแบบ End-to-End ได้อย่างถูกต้อง
