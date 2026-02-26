# ARCHITECTURE.md — Scalable AI-Driven Organization

## Design Principles

1. **Flat files over database** — Git is the database, markdown is the schema
2. **Convention over configuration** — folder structure = org structure
3. **Cascade over duplication** — policy inherits, only override what's different
4. **Bot-readable first** — every file has a clear purpose the bot can act on
5. **Human-editable** — no special tools needed, just GitHub
6. **Scalable** — works for 5 people, works for 5,000

---

## Scalability Model

```
Level 1: Single BU, Single Dept, <20 people     ← ตอนนี้
Level 2: Multi BU, Multi Dept, <100 people
Level 3: Multi Country, Multi BU, <500 people
Level 4: Enterprise, Global, 500-5,000 people
```

แต่ละ level เพิ่มแค่ **folder** — ไม่ต้องเปลี่ยน structure เดิม

---

## Full Scalable Structure

```
wallbee-workspace/
│
├── .github/
│   └── CODEOWNERS                    # ใครแก้ไขไฟล์ไหนได้
│
├── org/                              # Org Registry (immutable source of truth)
│   ├── COMPANY.md
│   ├── COUNTRIES.csv                 # รองรับ multi-country
│   ├── ENTITIES.csv                  # legal entities (บจก./สาขา)
│   ├── BU.csv
│   ├── DEPARTMENTS.csv
│   ├── POSITIONS.csv
│   ├── ROLES.csv
│   ├── USERS.csv                     # master user registry
│   ├── ORG_CHART.md
│   └── ROSTER.md
│
├── bu/                               # Business Units
│   └── {bu-id}/
│       ├── BU.md                     # overview + strategy + P&L
│       ├── PRODUCTS.md               # product catalog
│       ├── CUSTOMERS.md              # key accounts (ถ้าไม่ใช้ CRM)
│       └── MEMORY.md                 # BU-level org memory
│
├── config/                           # System Config
│   ├── openclaw.json                 # bot config (secrets replaced)
│   ├── tools-policy.yaml             # role → tool permissions
│   ├── cron-policy.yaml              # scheduled jobs policy
│   ├── integrations.yaml             # all external system connections
│   └── bot-personas.yaml             # ถ้ามีหลาย bot ต่างแผนก
│
├── knowledge/                        # Org Knowledge Base
│   ├── policies/
│   │   ├── HR_POLICY.md              # company default
│   │   ├── IT_SECURITY_POLICY.md
│   │   ├── COMMUNICATION_POLICY.md
│   │   ├── FINANCE_POLICY.md
│   │   ├── DATA_PRIVACY_POLICY.md    # PDPA / GDPR
│   │   ├── country/
│   │   │   └── {country-code}/       # TH / SG / US
│   │   ├── bu/
│   │   │   └── {bu-id}/
│   │   ├── dept/
│   │   │   └── {dept-id}/
│   │   └── employment-types/
│   │       ├── FULLTIME.md
│   │       ├── PARTTIME.md
│   │       ├── CONTRACT.md
│   │       └── INTERN.md
│   │
│   ├── okr/
│   │   ├── {YYYY}/
│   │   │   ├── COMPANY_Q{X}.md
│   │   │   ├── bu/
│   │   │   │   └── {bu-id}_Q{X}.md
│   │   │   └── dept/
│   │   │       └── {dept-id}_Q{X}.md
│   │   └── templates/
│   │       ├── KPI_SALES.md
│   │       ├── KPI_DEV.md
│   │       ├── KPI_HR.md
│   │       ├── KPI_FINANCE.md
│   │       ├── KPI_OPS.md
│   │       ├── KPI_MANAGER.md
│   │       └── KPI_EXECUTIVE.md
│   │
│   ├── products/
│   │   └── {bu-id}/
│   │       ├── CATALOG.md
│   │       ├── {product-id}.md
│   │       └── PRICING.md
│   │
│   ├── playbooks/
│   │   ├── ONBOARDING.md
│   │   ├── OFFBOARDING.md
│   │   ├── SALES_PLAYBOOK.md
│   │   ├── HIRING_PLAYBOOK.md
│   │   └── INCIDENT_PLAYBOOK.md
│   │
│   └── sop/
│       ├── MEETING_SOP.md
│       ├── EXPENSE_SOP.md
│       ├── LEAVE_SOP.md
│       └── ESCALATION_SOP.md
│
├── plans/
│   ├── {YYYY}/
│   │   ├── ROADMAP.md
│   │   ├── BUDGET.md                 # annual budget plan
│   │   └── HEADCOUNT_PLAN.md
│   ├── sprints/
│   │   └── {YYYY}-{MM}-W{X}.md
│   └── projects/
│       └── {PROJECT-ID}/
│           ├── PROJECT.md            # brief + owner + timeline
│           ├── STATUS.md             # weekly update
│           └── RETROSPECTIVE.md
│
├── memory/                           # AI Memory Layer
│   ├── {YYYY}-{MM}-{DD}.md           # daily session (auto)
│   ├── org/
│   │   └── {YYYY}-{MM}.md            # org-level monthly
│   ├── bu/
│   │   └── {bu-id}/
│   │       └── {YYYY}-{MM}.md
│   └── dept/
│       └── {dept-id}/
│           └── {YYYY}-{MM}.md
│
├── scripts/                          # Automation
│   ├── lookup-user.js                # chat_id → user profile
│   ├── morning-summary.js            # daily email digest
│   ├── kpi-checker.js                # check KPI progress
│   ├── activity-logger.js            # log activities to ACTIVITY_LOG
│   └── git-sync.sh                   # auto push
│
├── credentials/                      # Secrets (gitignored)
│   └── .gitkeep
│
└── users/
    ├── _TEMPLATE/                    # copy สำหรับพนักงานใหม่
    │   ├── USER.md
    │   ├── MEMORY.md
    │   ├── PERFORMANCE.md
    │   ├── ACTIVITY_LOG.md
    │   ├── IDP.md
    │   ├── CONTRACT.md               # HR fills this
    │   └── SOURCES.yaml
    │
    └── {email}/                      # 1 folder ต่อพนักงาน 1 คน
        ├── USER.md
        ├── MEMORY.md
        ├── PERFORMANCE.md
        ├── ACTIVITY_LOG.md
        ├── IDP.md
        ├── CONTRACT.md
        └── SOURCES.yaml
```

---

## Scalability Rules

### เพิ่มพนักงาน
```
1. เพิ่มแถวใน org/USERS.csv
2. cp -r users/_TEMPLATE users/{email}/
3. กรอก USER.md + CONTRACT.md + SOURCES.yaml
4. เพิ่ม telegram_chat_id ใน allowFrom
5. git push → done
```

### เพิ่ม BU ใหม่
```
1. เพิ่มแถวใน org/BU.csv
2. mkdir bu/{bu-id}/
3. สร้าง BU.md + PRODUCTS.md
4. สร้าง knowledge/okr/bu/{bu-id}/
5. สร้าง knowledge/policies/bu/{bu-id}/ (ถ้าต่างจาก default)
6. git push → done
```

### เพิ่มประเทศใหม่
```
1. เพิ่มใน org/COUNTRIES.csv
2. สร้าง knowledge/policies/country/{code}/
3. เพิ่ม timezone ใน USERS.csv
4. git push → done
```

### เพิ่ม Bot ใหม่ (ต่อ BU หรือ Dept)
```
1. สร้าง Telegram bot ใหม่
2. เพิ่มใน config/bot-personas.yaml
3. กำหนด workspace + knowledge scope
4. git push → done
```

---

## Data Access Matrix

| Role | org/ | bu/ | knowledge/ | users/others | plans/ |
|------|------|-----|------------|--------------|--------|
| admin (L5) | ✅ all | ✅ all | ✅ all | ✅ all | ✅ all |
| exec (L5) | ✅ | ✅ own BU | ✅ | ✅ own BU | ✅ own BU |
| manager (L4) | org only | ✅ own BU | ✅ | ✅ own team | ✅ own |
| team_lead (L3) | org only | read | ✅ | ✅ own team | ✅ own |
| senior (L2) | org only | read | dept only | ❌ | own |
| employee (L1) | org only | read | dept only | ❌ | own |
