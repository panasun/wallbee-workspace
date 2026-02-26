# ORG_CHART.md — สายการบังคับบัญชา

> อัปเดตไฟล์นี้เมื่อมีการเปลี่ยนแปลงโครงสร้าง
> ข้อมูลจริงอยู่ใน USERS.csv + POSITIONS.csv

## โครงสร้างองค์กร (5 Levels)

```
Level 5 — C-Level / Executive
└── CEO
    ├── COO
    │   ├── Level 4 — Department Heads
    │   │   ├── Head of SNO
    │   │   ├── Head of HR
    │   │   ├── Head of Operations
    │   │   └── Head of Marketing
    │   │
    │   │   Level 3 — Team Leads / Senior Managers
    │   │   ├── SNO Team Lead
    │   │   ├── HR Team Lead
    │   │   └── ...
    │   │
    │   │   Level 2 — Senior Officers
    │   │   ├── Senior SNO Officer
    │   │   ├── Senior HR Officer
    │   │   └── ...
    │   │
    │   │   Level 1 — Officers / Employees
    │   │   ├── SNO Officer
    │   │   ├── HR Officer
    │   │   └── ...
    │
    ├── CFO → Finance Team
    ├── CTO → IT Team
    └── CMO → Marketing Team
```

## Escalation Policy

- Level 1 → reports to Level 2
- Level 2 → reports to Level 3
- Level 3 → reports to Level 4 (Dept Head)
- Level 4 → reports to Level 5 (C-Level)
- Level 5 → reports to CEO / Board

## การ Access ข้อมูล

- แต่ละคนเห็นข้อมูลตาม `access_level` ใน ROLES.csv
- Manager เห็นข้อมูลคนใต้บังคับบัญชาตาม `reports_to_email`
- Admin เห็นทุกอย่าง
