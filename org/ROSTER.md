# ROSTER.md — Employee Registry

> **Single source of truth** สำหรับ user mapping ทั้งหมด
> แก้ไขที่นี่ที่เดียว bot ทุกตัวจะอ่านจากไฟล์นี้

## วิธีใช้
- เพิ่มพนักงาน: เพิ่มแถวใน USERS.csv + สร้าง folder `users/{email}/`
- พนักงานออก: เปลี่ยน `status` เป็น `inactive`
- เพิ่ม Telegram: กรอก `telegram_chat_id` เมื่อพนักงาน start bot

## Access Levels
| Level | ความหมาย | เห็นข้อมูล |
|-------|----------|-----------|
| 5 | Admin | ทุกอย่าง รวม memory ทุกคน |
| 3 | Manager | แผนกตัวเอง + org knowledge |
| 1 | Employee | ของตัวเอง + org knowledge เท่านั้น |

## Departments
| Code | ชื่อแผนก |
|------|---------|
| SNO | SNO Department |

## Bot Mapping
Bot อ่าน `telegram_chat_id` จาก USERS.csv แล้ว load:
1. `org/COMPANY.md` — ทุกคนเห็น
2. `users/{email}/USER.md` — เฉพาะของตัวเอง
3. `users/{email}/MEMORY.md` — เฉพาะของตัวเอง
4. `knowledge/department/{dept}.md` — เฉพาะแผนกตัวเอง
