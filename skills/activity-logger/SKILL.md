# Skill: Activity Logger

## Purpose
บันทึกกิจกรรมลงใน ACTIVITY_LOG.md อัตโนมัติ
เชื่อม activity กับ KPI

## Trigger
- "ปิด deal ABC แล้ว มูลค่า 50K"
- "โทรหาลูกค้า XYZ แล้ว"
- "merge PR #123 แล้ว"
- "ลาพักร้อนวันนี้"
- "เข้าประชุม Daily standup"

## Actions
1. Parse intent → activity type
2. Append to users/{email}/ACTIVITY_LOG.md
3. ถ้าเป็น DEAL → update PERFORMANCE.md KPI
4. ถ้าเป็น LEAVE → check CONTRACT.md วันลาคงเหลือ

## Activity Types
DEAL | CALL | EMAIL | MEETING | TASK | LOST | 
TRAINING | LEAVE | NOTE | COMMIT | PR | ISSUE

## Format
```
[YYYY-MM-DD] [TYPE] รายละเอียด (value: X, customer: Y)
```
