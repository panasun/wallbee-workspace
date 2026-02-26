# Skill: Org Query

## Purpose
Query ข้อมูลองค์กรจาก GitHub workspace files
ตอบคำถามเกี่ยวกับโครงสร้างองค์กร, คน, แผนก, BU

## Trigger
ใช้ skill นี้เมื่อ user ถามเกี่ยวกับ:
- "ใครอยู่แผนกไหน"
- "หัวหน้าของ X คือใคร"
- "แผนก Y มีกี่คน"
- "BU Z มี product อะไรบ้าง"

## Data Sources
- org/USERS.csv
- org/DEPARTMENTS.csv
- org/BU.csv
- org/ORG_CHART.md
- bu/{bu-id}/BU.md

## Access Control
- ตอบได้เฉพาะข้อมูลตาม access_level ของ user
- employee (L1): เห็นแค่ org chart + ชื่อคน
- manager (L3+): เห็นข้อมูล team ตัวเอง
- admin (L5): เห็นทุกอย่าง
