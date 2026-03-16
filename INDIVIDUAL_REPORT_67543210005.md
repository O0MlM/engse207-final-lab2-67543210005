## ข้อมูลผู้จัดทำ

ชื่อ-นามสกุล: นางสาวสาริศา ถวัลย์วราศักดิ์   
รหัสนักศึกษา: 67543210005-4   
กลุ่ม: 06   

## ขอบเขตงานที่รับผิดชอบ
รับผิดชอบพัฒนาระบบทั้งหมดด้วยตนเอง ครอบคลุมทั้งการออกแบบ พัฒนา ทดสอบ และแก้ไขปัญหา โดยมีส่วนงานดังนี้
- ออกแบบสถาปัตยกรรมแบบ Microservices
- พัฒนา Auth Service
- พัฒนา User Service
- พัฒนา Task Service
- ออกแบบโครงสร้างฐานข้อมูลแบบ Database-per-Service
- เขียน REST API สำหรับทุก service
- พัฒนา JWT Authentication และ Authorization
- จัดการสิทธิ์ผู้ใช้ตาม Role (User / Admin)
- ตั้งค่า Dockerfile ของทุก service
- เขียน docker-compose.yml สำหรับรันระบบทั้งหมด
- ทดสอบระบบผ่าน curl และ Postman
- แก้ไขปัญหาการเชื่อมต่อระหว่าง services
- จัดทำเอกสาร README และรายงานประกอบงาน

## สิ่งที่ได้ดำเนินการด้วยตนเอง
### การพัฒนา Backend Services
- เขียนโค้ด Node.js และ Express สำหรับทุก service
- ออกแบบ routes และ controllers ของแต่ละ API
- เชื่อมต่อ PostgreSQL แยกฐานข้อมูลต่อ service
- ออกแบบ schema และ init database scripts
### Authentication & Security
- พัฒนา Register และ Login API
- เขียน middleware ตรวจสอบ JWT token
- จัดการ Authorization ผ่าน HTTP Header
- ออกแบบ Role-Based Access Control
### Docker & Deployment
- เขียน Dockerfile สำหรับทุก service
- ตั้งค่า environment variables
- จัดการ container networking
- แก้ปัญหา port ชนกันระหว่าง services
- ทดสอบการรันระบบแบบ containerized
### System Integration
- ทดสอบการเรียก API ข้าม service
- ตรวจสอบความถูกต้องของ JWT secret ระหว่าง services
- แก้ปัญหาการเชื่อมต่อฐานข้อมูล
- ทดสอบ end-to-end flow ตั้งแต่ Register → Login → ใช้งานระบบ

## ปัญหาที่พบและวิธีการแก้ไข
### ปัญหาที่ 1: JWT ใช้งานไม่ได้ระหว่าง Services
**สาเหตุ**   
แต่ละ service ใช้ JWT secret ไม่ตรงกัน ทำให้ token verification ล้มเหลว

**วิธีแก้ไข**   
กำหนดค่า JWT_SECRET ให้เหมือนกันทุก service ผ่าน environment variables ใน docker-compose

### ปัญหาที่ 2: Port ชนกันระหว่าง Containers
**สาเหตุ**   
หลาย services ใช้ port เดียวกัน ทำให้ container ไม่สามารถเริ่มทำงานได้

**วิธีแก้ไข**   
กำหนด port ใหม่ให้แต่ละ service และตรวจสอบ mapping ใน docker-compose.yml

### ปัญหาที่ 3: Docker Volume ทำให้ข้อมูลเก่าค้าง
**สาเหตุ**   
PostgreSQL เก็บข้อมูลเดิมไว้ ทำให้ seed และ schema ใหม่ไม่ถูกโหลด

**วิธีแก้ไข**
ใช้คำสั่ง
```
docker compose down -v
```
เพื่อลบ volume แล้วเริ่มระบบใหม่

## สิ่งที่ได้เรียนรู้จากงานนี้
### ด้านเทคนิค
- การออกแบบระบบแบบ Microservices
- การแยกฐานข้อมูลต่อ service (Database-per-Service)
- การออกแบบ REST API ที่สื่อสารกันหลายบริการ
- การทำงานของ JWT Authentication
- การจัดการสิทธิ์ด้วย Role-Based Access Control
- การใช้งาน Docker และ Docker Compose
- การแก้ปัญหา container networking
### ด้านสถาปัตยกรรมระบบ
- การแยกความรับผิดชอบของแต่ละ service
- ลดการพึ่งพากันระหว่างระบบย่อย
- ข้อดีข้อเสียของ shared database vs database-per-service
- การออกแบบระบบให้รองรับการขยายในอนาคต
### ด้านกระบวนการพัฒนา
- การวางแผนโครงสร้างโปรเจกต์
- การทดสอบระบบแบบเป็นขั้นตอน
- การวิเคราะห์และแก้ไขปัญหา integration

## แนวทางการพัฒนาต่อไปใน Set 2
### หากพัฒนาต่อยอดระบบนี้เพิ่มเติม ควรปรับปรุงดังนี้
- เพิ่ม API Gateway สำหรับรวมศูนย์การเข้าถึง services
- เพิ่ม HTTPS และใช้งาน Domain จริง
- เพิ่ม Refresh Token เพื่อความปลอดภัย
- เพิ่มระบบ Centralized Logging
- เพิ่ม Monitoring และ Observability
- ใช้ Container Orchestration เช่น Kubernetes
- ปรับระบบให้รองรับการ Deploy แบบ Production
