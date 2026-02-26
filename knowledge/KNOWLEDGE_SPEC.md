# KNOWLEDGE_SPEC.md — ระบบความรู้องค์กร

## 3 ประเภทที่แตกต่างกัน

---

### 1. 📚 KNOWLEDGE — สิ่งที่รู้และเป็นความจริงถาวร
> "สิ่งที่องค์กรรู้" — structured, validated, reusable

```
knowledge/
├── policies/       ← กฎ นโยบาย ที่บังคับใช้
├── okr/            ← OKR/KPI ที่ตกลงกันแล้ว
├── products/       ← ข้อมูลสินค้า spec ที่แน่นอน
├── playbooks/      ← วิธีทำงานที่ proven แล้ว
├── sop/            ← ขั้นตอนที่ standardize แล้ว
└── topics/         ← ← ใหม่: knowledge cross-dept
    ├── pricing/    ← ราคา discount policy ทุก BU
    ├── compliance/ ← PDPA, legal requirements
    ├── security/   ← IT security cross-org
    ├── onboarding/ ← process ที่ทุกแผนกต้องรู้
    └── customer/   ← customer journey, personas
```

**ลักษณะ:**
- ✅ Validated โดย owner
- ✅ Versioned (มี updated date)
- ✅ อ้างอิงได้
- ✅ ทุกคนในองค์กรเชื่อถือได้

---

### 2. 🧠 MEMORY — สิ่งที่เกิดขึ้นและบันทึกไว้
> "สิ่งที่องค์กรจำ" — temporal, contextual, searchable

```
memory/
├── YYYY-MM-DD.md      ← daily session (auto)
├── org/               ← org-level decisions
│   └── YYYY-MM.md
├── bu/                ← BU-level events
│   └── {bu-id}/YYYY-MM.md
├── dept/              ← dept-level events
│   └── {dept-id}/YYYY-MM.md
├── topics/            ← ← ใหม่: topic-based memory
│   ├── pricing/       ← ประวัติการเปลี่ยน pricing
│   ├── customer/      ← customer conversations & history
│   ├── tech-decisions/ ← ADR (Architecture Decision Records)
│   └── incidents/     ← incident logs & learnings
└── projects/
    └── {project-id}/  ← project-specific memory
```

**ลักษณะ:**
- 📅 Timestamped
- 🔍 Searchable
- 📝 Auto-logged โดย Bot
- ♻️ Informs future knowledge

---

### 3. 📋 SPECS — สิ่งที่กำลังจะทำ (OpenSpec style)
> "สิ่งที่องค์กรกำลังตัดสินใจ" — proposals, decisions in progress

```
specs/
├── changes/           ← กำลังดำเนินการ
│   └── {spec-id}/
│       ├── PROPOSAL.md    ← ทำไม? อะไร? ใคร?
│       ├── SPECS.md       ← requirements, scenarios
│       ├── DESIGN.md      ← technical/process approach
│       ├── TASKS.md       ← implementation checklist
│       └── DECISION.md    ← final decision + rationale
├── archive/           ← เสร็จแล้ว / ยกเลิก
│   └── YYYY-MM-DD-{spec-id}/
└── templates/
    ├── SPEC_PRODUCT.md    ← template: new product
    ├── SPEC_PROCESS.md    ← template: process change
    ├── SPEC_POLICY.md     ← template: policy change
    ├── SPEC_HIRE.md       ← template: hiring decision
    └── SPEC_TECH.md       ← template: tech decision
```

**ลักษณะ:**
- 🔄 Living documents
- 👥 Cross-team collaboration
- ✅ → Knowledge เมื่อ approved
- 🗄️ → Archive เมื่อเสร็จ

---

## Flow: Spec → Knowledge → Memory

```
1. PROPOSE     → สร้าง specs/changes/{id}/PROPOSAL.md
2. DESIGN      → เพิ่ม SPECS.md + DESIGN.md
3. PLAN        → เพิ่ม TASKS.md
4. IMPLEMENT   → ทำตาม tasks
5. DECIDE      → เขียน DECISION.md
6. GRADUATE    → ย้ายไป knowledge/ (ถ้าเป็น policy/process)
7. ARCHIVE     → ย้ายไป specs/archive/
8. REMEMBER    → บันทึกใน memory/topics/ (lessons learned)
```

---

## Topics Knowledge (Cross-dept)

```
knowledge/topics/
├── pricing/
│   ├── PRICING_POLICY.md     ← discount rules, approval matrix
│   └── PRICE_LIST.md         ← ราคาปัจจุบัน
│
├── customer/
│   ├── PERSONAS.md           ← ICP, buyer personas
│   ├── JOURNEY_MAP.md        ← customer journey
│   └── CASE_STUDIES.md       ← success stories
│
├── compliance/
│   ├── PDPA.md               ← data privacy
│   └── REGULATORY.md         ← legal requirements
│
├── tech/
│   ├── STACK.md              ← tech stack ที่ใช้
│   ├── ADR/                  ← Architecture Decision Records
│   │   └── ADR-001.md
│   └── SECURITY.md           ← security standards
│
├── onboarding/
│   ├── NEW_EMPLOYEE.md       ← cross-dept onboarding
│   └── NEW_CLIENT.md         ← client onboarding
│
└── incidents/
    └── INCIDENT_LEARNINGS.md ← learnings from incidents
```

---

## Bot Commands (ตาม layer)

| Command | Layer | Action |
|---------|-------|--------|
| "นโยบาย X คืออะไร?" | Knowledge | อ่าน policies/ |
| "เราเคยตัดสินใจเรื่อง Y ยังไง?" | Memory | ค้น memory/topics/ |
| "เสนอเปลี่ยน process Z" | Specs | สร้าง specs/changes/ |
| "ราคา product A คือเท่าไหร่?" | Knowledge | อ่าน topics/pricing/ |
| "incident เดือนที่แล้วเกิดอะไร?" | Memory | อ่าน memory/topics/incidents/ |
| "ADR ของ tech decision นี้คืออะไร?" | Memory+Knowledge | อ่าน topics/tech/ADR/ |
