## 🍜 เว็บไซต์รีวิวร้านอาหาร (Restaurant Review Website)

เว็บแอปพลิเคชันแบบ Full-stack สำหรับการค้นหาและรีวิวร้านอาหาร ผู้ใช้สามารถให้คะแนน แสดงความคิดเห็น และดูข้อมูลร้านอาหารได้แบบเรียลไทม์
ภายในโปรเจกต์นี้ประกอบด้วย Backend (API Server) และ Frontend (เว็บไซต์ผู้ใช้)

📂 โครงสร้างโปรเจกต์
```
/Final_Exam
│
├── backend/         ← ฝั่งเซิร์ฟเวอร์ Node.js + Express
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── server.js
│
└── frontend/        ← ฝั่งผู้ใช้ React + Vite
    ├── src/
    ├── components/
    ├── pages/
    └── App.jsx
```
## ✅ ฟีเจอร์หลัก

- ลงทะเบียน / เข้าสู่ระบบ (Authentication)

- แสดงรายชื่อร้านอาหารทั้งหมด

- ดูรายละเอียดร้านอาหาร (ชื่อ ที่อยู่ เมนู คะแนน รีวิว)

- เขียนรีวิวและให้คะแนนร้านอาหาร

- รองรับการแสดงผลบนทั้งคอมพิวเตอร์และมือถือ (Responsive Design)

## 🛠 เทคโนโลยี
- **Backend:** Node.js, Express, (SQLite/MySQL/PostgreSQL เลือกได้)
- **Auth:** JWT + Middleware ตรวจสิทธิ์
- **Frontend:** React, Vite, React Router, Axios

## ⚙️ การติดตั้ง

> ต้องติดตั้ง Node.js เวอร์ชัน 18 ขึ้นไป

### 1) ติดตั้ง Backend
```bash
cd backend
npm install
cp .env.example .env
# แก้ไขค่าใน .env ให้เหมาะกับเครื่องของคุณ
npm run dev
# เซิร์ฟเวอร์เริ่มที่ http://localhost:3000 (ค่าเริ่มต้น)
```

### 2) ติดตั้ง Frontend
```bash
cd ../frontend
npm install
npm run dev
# เปิด http://localhost:5173 (หรือพอร์ตที่แสดงในเทอร์มินัล)
```

## 👤 ผู้พัฒนา
- Supakorn Sirimueangmoon
