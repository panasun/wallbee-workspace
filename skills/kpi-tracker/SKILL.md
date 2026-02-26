# Skill: KPI Tracker

## Purpose
อ่านและอัปเดต KPI progress ใน PERFORMANCE.md
วัดผลงานและ alert เมื่อ at-risk

## Trigger
- "KPI ผมถึงไหนแล้ว"
- "อัปเดต KPI: ปิด deal X แล้ว"
- "ทีมฉัน KPI เป็นยังไง" (Manager)
- "ใครยัง KPI ต่ำกว่า 70%?" (Manager)

## Actions
1. READ: อ่าน users/{email}/PERFORMANCE.md
2. UPDATE: แก้ไข Actual + คำนวณ Score
3. ALERT: แจ้งเมื่อ KPI < 50% และเหลือ < 30 วัน

## Data Sources
- users/{email}/PERFORMANCE.md
- knowledge/okr/templates/KPI_{ROLE}.md
- knowledge/okr/{year}/dept/{dept-id}_Q{X}.md

## Access Control
- employee: เห็นแค่ของตัวเอง
- manager: เห็น team ทั้งหมด
- admin: เห็นทุกคน
