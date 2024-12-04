## **Backend**
### **คำแนะนำการตั้งค่า**
1. **แก้ไขไฟล์ `.env`**:
   ไฟล์ `.env` ใช้สำหรับเก็บค่า environment variables สำหรับการตั้งค่า Backend:
   - `DB_HOST`: ที่อยู่ของฐานข้อมูล
   - `DB_USER`: ชื่อผู้ใช้สำหรับเชื่อมต่อกับฐานข้อมูล
   - `DB_PASS`: รหัสผ่านสำหรับผู้ใช้ฐานข้อมูล
   - `DB_NAME`: ชื่อของฐานข้อมูลที่ต้องการใช้

   

2. **เริ่มต้นฐานข้อมูล**:
รันคำสั่งด้านล่างเพื่อสร้างฐานข้อมูลใหม่และเพิ่มข้อมูลเริ่มต้น (seed data):
```bash
node setupDatabase.js

