# Decision Log: ใช้ GitHub เป็น Org Brain
**Date:** 2026-02-25 | **Ref:** DEC-2026-001

## Context
ต้องการ Single Source of Truth สำหรับ AI-Driven Org ที่ Bot อ่านได้
Options ที่พิจารณา: Notion, Confluence, GitHub, custom DB

## Decision
ใช้ GitHub (private repo) เพราะ:
- ✅ Git versioned — ประวัติทุก change ครบ
- ✅ AI-readable markdown
- ✅ Portable — ย้าย machine ไหนก็ sync ได้
- ✅ Free สำหรับ private repo
- ✅ Branch/PR สำหรับ review changes
- ❌ ไม่มี real-time search (แต่ Bot อ่านไฟล์โดยตรงได้)

## Outcome
สร้าง panasun/wallbee-workspace — ใช้งานแล้วตั้งแต่ 2026-02-25
