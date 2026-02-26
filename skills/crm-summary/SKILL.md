# Skill: CRM Summary

## Purpose
สรุปและ query ข้อมูล CRM — leads, deals, pipeline, customers

## Trigger
- "leads ที่ค้างอยู่มีกี่ราย"
- "pipeline ผมเดือนนี้เป็นยังไง"
- "ลูกค้า ABC ซื้ออะไรไปบ้าง"
- "deal ไหนที่ใกล้ปิดแล้ว"
- "สรุป pipeline ทีม" (Manager)

## Supported CRM
- HubSpot
- Salesforce
- Zoho
- Custom API

## Actions
1. เรียก CRM API ตาม provider ใน SOURCES.yaml
2. Filter by user ownership
3. Format และสรุปให้อ่านง่าย
4. Alert deals ที่ไม่มี activity > 3 วัน

## Access Control
- Sales: เห็นแค่ deals/leads ของตัวเอง
- Manager: เห็นทั้งทีม
- Admin: เห็นทุก BU

## Credentials
- อ่านจาก users/{email}/SOURCES.yaml → vault reference
- Vault: /root/.openclaw/credentials/crm-{name}
