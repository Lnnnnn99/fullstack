## **Backend**
1. **แก้ไขไฟล์ `.env`**:
   สิ่งที่ต้องแก้ในไฟล์ `.env` ได้แก่:
   - `SERVER_PORT`: Port ของ Backend
   - `DB_PORT`: Port ของ Database
   - `DB_USER`: ชื่อผู้ใช้สำหรับเชื่อมต่อกับฐานข้อมูล
   - `DB_PASS`: รหัสผ่านสำหรับผู้ใช้ฐานข้อมูล
   - `DB_NAME`: ชื่อของฐานข้อมูลที่ต้องการใช้
   
2. **เริ่มต้นฐานข้อมูล**:
สร้าง Database และ Tables เริ่มต้น:
```bash
node setupDatabase.js

3. **ติดตั้ง Library ที่จำเป็น**:
ติดตั้ง Library ที่จำเป็น:
```bash
npm install

3. **รัน server**:
รัน server:
```bash
npm start


## **Frontend**
1. **ติดตั้ง Library ที่จำเป็น**:
ติดตั้ง Library ที่จำเป็น:
```bash
npm install

2. **รัน server**:
รัน server:
```bash
npm start
