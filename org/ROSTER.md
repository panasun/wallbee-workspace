# ROSTER.md — คู่มือ AI-Driven Organization Workspace

## 🎯 เป้าหมาย
ใช้ GitHub เป็น **Single Source of Truth** ขององค์กร
Bot อ่าน context ครบถ้วนและบริหารองค์กรด้วย AI

---

## 📁 โครงสร้างทั้งหมด

```
wallbee-workspace/
│
├── org/                          # ทะเบียนองค์กร
│   ├── COMPANY.md                # vision / mission / values
│   ├── BU.csv                    # Business Units
│   ├── DEPARTMENTS.csv           # แผนก + bu_id
│   ├── POSITIONS.csv             # ตำแหน่ง 5 ระดับ
│   ├── ROLES.csv                 # role → permissions
│   ├── USERS.csv                 # พนักงานทุกคน (source of truth)
│   ├── ORG_CHART.md              # สายบังคับบัญชา
│   └── ROSTER.md                 # คู่มือนี้
│
├── bu/                           # ข้อมูลรายธุรกิจ
│   └── {bu-id}/
│       ├── BU.md                 # overview + KPI + revenue
│       └── PRODUCTS.md           # product ของ BU นี้
│
├── config/                       # การตั้งค่า
│   ├── openclaw.json             # bot config
│   ├── tools-policy.yaml         # ใครใช้ tool อะไร
│   ├── cron-policy.yaml          # cron jobs
│   └── integrations.yaml         # email/crm/github/erp
│
├── knowledge/                    # ฐานความรู้
│   ├── policies/
│   │   ├── HR_POLICY.md          # company default
│   │   ├── IT_SECURITY_POLICY.md
│   │   ├── COMMUNICATION_POLICY.md
│   │   ├── bu/{bu-id}/           # override ต่อ BU
│   │   ├── dept/{dept-id}/       # override ต่อแผนก
│   │   └── employment-types/     # fulltime / contract / parttime
│   ├── okr/
│   │   ├── OKR_COMPANY_YYYY_QX.md
│   │   ├── bu/{bu-id}/           # OKR ต่อ BU
│   │   ├── dept/{dept-id}/       # OKR ต่อแผนก
│   │   └── templates/            # KPI templates ต่อ role
│   ├── products/
│   │   └── {bu-id}/              # product detail ต่อ BU
│   ├── playbooks/                # Onboarding / Offboarding
│   └── sop/                      # SOP ต่างๆ
│
├── plans/                        # แผนงาน
│   ├── ROADMAP_YYYY.md           # roadmap รายปี
│   ├── sprints/                  # SPRINT_YYYY-MM-WX.md
│   └── projects/                 # PROJECT_{NAME}.md
│
├── memory/                       # org memory
│   ├── YYYY-MM-DD.md             # daily session memory
│   ├── org/                      # org-level memory
│   └── dept/                     # dept-level memory
│
├── scripts/                      # automation scripts
│   ├── lookup-user.js            # map chat_id → user
│   ├── morning-summary.js        # สรุปอีเมลเช้า
│   └── git-sync.sh               # auto push GitHub
│
└── users/                        # ข้อมูลรายบุคคล
    ├── _TEMPLATE/                # template สำหรับพนักงานใหม่
    │   ├── USER.md
    │   ├── MEMORY.md
    │   ├── PERFORMANCE.md
    │   ├── ACTIVITY_LOG.md
    │   ├── IDP.md
    │   ├── CONTRACT.md
    │   └── SOURCES.yaml
    └── {email}/
        ├── USER.md               # profile
        ├── MEMORY.md             # personal memory (bot)
        ├── PERFORMANCE.md        # KPI + achievements
        ├── ACTIVITY_LOG.md       # บันทึกกิจกรรม
        ├── IDP.md                # development plan
        ├── CONTRACT.md           # ข้อตกลงรายบุคคล (HR only)
        └── SOURCES.yaml          # data sources
```

---

## 🔄 Policy Cascade

```
Company Default (HR_POLICY.md)
    ↓ override
BU Policy (knowledge/policies/bu/{bu-id}/)
    ↓ override
Dept Policy (knowledge/policies/dept/{dept-id}/)
    ↓ override
Individual Contract (users/{email}/CONTRACT.md)
```

---

## 📊 OKR Cascade

```
Company OKR
    ↓ aligns with
BU OKR (แต่ละ BU)
    ↓ aligns with
Dept OKR (แต่ละแผนก)
    ↓ aligns with
Individual KPI (แต่ละคน ตาม role template)
```

---

## 🤖 Bot Context Loading

```
message เข้า
→ lookup chat_id จาก USERS.csv
→ โหลด org/COMPANY.md
→ โหลด bu/{bu_id}/BU.md
→ โหลด knowledge/policies/ (cascade)
→ โหลด knowledge/okr/bu + dept
→ โหลด users/{email}/USER.md
→ โหลด users/{email}/MEMORY.md
→ โหลด users/{email}/PERFORMANCE.md (ถ้าถามเรื่อง KPI)
→ โหลด users/{email}/SOURCES.yaml (ถ้าต้องการ data)
→ ตอบด้วย context ครบถ้วน
```

---

## 👤 เพิ่มพนักงานใหม่

1. เพิ่มแถวใน `org/USERS.csv`
2. `cp -r users/_TEMPLATE users/{email}/`
3. กรอกข้อมูลใน USER.md, CONTRACT.md, SOURCES.yaml
4. เพิ่ม telegram_chat_id ใน `config/openclaw.json → allowFrom`
5. `git push` → Bot พร้อมใช้งานทันที

---

## 📈 AI บริหารองค์กร — Use Cases

| ใคร | ถาม Bot ว่า | Bot ทำอะไร |
|-----|------------|-----------|
| CEO | "สรุป KPI ทุก BU ไตรมาสนี้" | อ่าน OKR ทุก BU + aggregate |
| Manager | "ทีมฉันมีใคร underperform?" | อ่าน PERFORMANCE ทุกคนในทีม |
| Sales | "leads ที่ค้างอยู่มีกี่ราย?" | เรียก CRM API |
| Dev | "issue ที่ assign ให้ฉันมีกี่อัน?" | เรียก GitHub API |
| HR | "ใครลาพักร้อนเกินสิทธิ์?" | อ่าน ACTIVITY_LOG + CONTRACT |
| พนักงาน | "KPI ฉันถึงไหนแล้ว?" | อ่าน PERFORMANCE.md ของตัวเอง |
