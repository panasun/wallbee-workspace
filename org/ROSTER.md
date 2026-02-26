# ROSTER.md — คู่มือ Workspace

## ไฟล์สำคัญ

| ไฟล์ | หน้าที่ |
|------|---------|
| `org/USERS.csv` | ทะเบียนพนักงานทั้งหมด — single source of truth |
| `org/DEPARTMENTS.csv` | แผนกทั้งหมด + สายบังคับบัญชา |
| `org/POSITIONS.csv` | ตำแหน่งงานทั้งหมด 5 ระดับ |
| `org/ROLES.csv` | role → permissions mapping |
| `org/ORG_CHART.md` | แผนผังองค์กร |
| `org/COMPANY.md` | ข้อมูลบริษัท |
| `config/tools-policy.yaml` | ใครใช้ tool อะไรได้บ้าง |
| `config/cron-policy.yaml` | ใครตั้ง cron ได้ + default cron jobs |
| `config/integrations.yaml` | integration ทั้งหมด |
| `users/{email}/USER.md` | profile ส่วนตัว |
| `users/{email}/MEMORY.md` | memory ส่วนตัว |
| `users/{email}/SOURCES.yaml` | data sources ของแต่ละคน |
| `knowledge/department/{dept}.md` | knowledge แต่ละแผนก |
| `knowledge/sop/` | SOP และนโยบาย |
| `knowledge/products/` | ข้อมูลสินค้า/บริการ |

## วิธีเพิ่มพนักงานใหม่

1. เพิ่มแถวใน `org/USERS.csv`
2. สร้าง folder `users/{email}/`
3. copy template `USER.md`, `MEMORY.md`, `SOURCES.yaml`
4. เพิ่ม telegram_chat_id ใน `openclaw.json → allowFrom`
5. git push → bot จะอ่าน config ใหม่อัตโนมัติ

## วิธีเพิ่มแผนกใหม่

1. เพิ่มแถวใน `org/DEPARTMENTS.csv`
2. สร้างไฟล์ `knowledge/department/{dept_id}.md`
3. อัปเดต `org/ORG_CHART.md`

## Access Control Flow

```
message เข้า
  → เช็ค chat_id จาก USERS.csv
  → หา role_id และ org_level
  → โหลด tools-policy ตาม role
  → โหลด SOURCES.yaml ของคนนั้น
  → โหลด memory + department knowledge
  → ตอบกลับด้วย context ที่ถูกต้อง
```
