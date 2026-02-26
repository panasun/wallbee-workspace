# MEMORY_DESIGN.md — Org Memory Architecture
## Inspired by OpenSpec: current state + delta + archive

---

## ปัญหาของ flat memory

ถ้าเก็บแบบ `memory/2026-02-26.md` เรื่อยๆ โดยไม่มี structure:
- หา "KPI ปัจจุบันของทีม" ไม่เจอ → ต้องอ่านทุกไฟล์
- ไม่รู้ว่า policy ที่ใช้อยู่ตอนนี้คืออะไร → ปนกับ history
- Bot context ใหญ่ขึ้นเรื่อยๆ → ช้าลง แพงขึ้น

---

## Solution: 3-Zone Memory Model

```
┌─────────────────────────────────────────────────────────────────┐
│                        memory/                                   │
│                                                                  │
│   ┌─────────────────┐   ┌──────────────────┐   ┌─────────────┐ │
│   │   current/      │   │   {YYYY}/        │   │  archive/   │ │
│   │                 │◄──│                  │◄──│             │ │
│   │ Source of Truth │   │ Year in progress │   │ Old years   │ │
│   │ ณ ปัจจุบัน      │   │ daily + monthly  │   │ read-only   │ │
│   │ (always fresh)  │   │ deltas           │   │             │ │
│   └─────────────────┘   └──────────────────┘   └─────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## Full Structure

```
memory/
│
├── current/                          ← SOURCE OF TRUTH (ปัจจุบัน)
│   ├── ORG_STATE.md                  ← สถานะองค์กรตอนนี้ (bot อ่านก่อนเสมอ)
│   ├── ACTIVE_DECISIONS.md           ← decisions ที่ยังมีผลบังคับใช้
│   ├── OPEN_ISSUES.md                ← issues/blockers ที่ยังค้างอยู่
│   ├── ACTIVE_PROJECTS.md            ← projects ที่กำลัง active
│   └── bu/
│       └── {bu-id}/
│           └── STATE.md              ← BU current state
│
├── {YYYY}/                           ← YEAR IN PROGRESS
│   ├── _YEAR_SUMMARY.md              ← สรุปปีนี้ (bot update รายเดือน)
│   ├── {MM}/
│   │   ├── _MONTH_SUMMARY.md         ← สรุปเดือนนี้ (auto)
│   │   ├── {DD}.md                   ← daily session logs (auto)
│   │   └── decisions/
│   │       └── {topic}.md            ← decisions made this month
│   ├── org/
│   │   └── {MM}.md                   ← org-level monthly
│   ├── bu/
│   │   └── {bu-id}/
│   │       └── {MM}.md
│   ├── dept/
│   │   └── {dept-id}/
│   │       └── {MM}.md
│   └── topics/
│       ├── incidents/
│       ├── tech-decisions/
│       └── customer/
│
└── archive/                          ← COMPLETED YEARS (read-only)
    └── {YYYY}/                       ← same structure as year above
        ├── _YEAR_SUMMARY.md          ← ถูก freeze เมื่อปีสิ้นสุด
        └── ...
```

---

## current/ คืออะไร? (OpenSpec: specs/)

คือ **snapshot ล่าสุดขององค์กร** — bot อ่านไฟล์นี้ก่อนตอบทุกครั้ง
ไม่ใช่ history, ไม่ใช่ log — คือ **ปัจจุบัน**

### ORG_STATE.md — อัปเดตเมื่อมีการเปลี่ยนแปลง
```markdown
# Org State — อัปเดตล่าสุด: YYYY-MM-DD

## Headcount
- Total: X คน | Active: X | Probation: X

## Active Projects
- [PROJECT-001] WallBee Deploy — 80% complete
- [PROJECT-002] CRM Integration — planning

## Open Blockers
- [ ] ซาวด์ยังไม่มี Telegram ID
- [ ] ADR ยังไม่ได้เขียน 2 ฉบับ

## Last Quarter KPI Health
- BU_A SNO: on track 🟢
```

### ACTIVE_DECISIONS.md — decisions ที่ยังมีผล
```markdown
# Active Decisions

## [DEC-2026-001] ใช้ GitHub เป็น org brain
- Decided: 2026-02-25 | By: บิน
- Impact: ทุกแผนก
- Review: Q3 2026

## [DEC-2026-002] OpenClaw + Telegram เป็น primary bot
- Decided: 2026-02-25 | By: บิน
- Impact: ทุกคน
- Review: Q2 2026
```

---

## Delta Flow (OpenSpec-inspired)

```
วันต่อวัน:
  Bot → append to memory/{YYYY}/{MM}/{DD}.md

เมื่อมี decision:
  Bot → append to current/ACTIVE_DECISIONS.md
       + log to memory/{YYYY}/{MM}/decisions/{topic}.md

สิ้นเดือน:
  Bot → สรุป memory/{YYYY}/{MM}/_MONTH_SUMMARY.md
       + update current/ORG_STATE.md
       + archive closed decisions

สิ้นปี:
  Bot → สรุป memory/{YYYY}/_YEAR_SUMMARY.md
       + freeze → move to archive/{YYYY}/
       + สร้าง memory/{YYYY+1}/ ใหม่
       + reset current/ state
```

---

## Bot Context Loading Priority

```
1. memory/current/ORG_STATE.md          ← เสมอ (เล็ก, fresh)
2. memory/current/ACTIVE_DECISIONS.md  ← เสมอ (เล็ก)
3. memory/current/OPEN_ISSUES.md       ← ถ้าถามเรื่อง blockers
4. memory/{YYYY}/{MM}/{DD}.md          ← ถ้าถามเรื่องวันนี้
5. memory/{YYYY}/{MM}/_MONTH_SUMMARY   ← ถ้าถามเรื่องเดือนนี้
6. memory/archive/{YYYY}/              ← ถ้าถามเรื่องประวัติศาสตร์
```

ผลลัพธ์: Bot อ่านแค่ 2 ไฟล์เล็กๆ เสมอ → fast + cheap
และอ่านเพิ่มเฉพาะเมื่อจำเป็น

---

## Year-end Ritual

```
ทุก 31 ธ.ค.:
1. Bot สร้าง memory/{YYYY}/_YEAR_SUMMARY.md
2. Copy memory/{YYYY}/ → memory/archive/{YYYY}/
3. Reset memory/current/ → ปี 2027
4. สร้าง memory/2027/ structure ใหม่
5. Commit → "Year-end archive: {YYYY}"
```
