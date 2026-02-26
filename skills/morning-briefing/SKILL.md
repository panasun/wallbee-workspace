# Skill: Morning Briefing

## Purpose
สรุปงานของวันนี้ — เริ่มต้นวันทำงานด้วย context ครบ

## Trigger
- Cron: ทุกเช้า 08:00 (ตาม cron-policy.yaml)
- Manual: "สรุปวันนี้" / "morning briefing"

## Output (ต่อ user ตาม role)

### Employee
1. 📧 Email ที่ยังไม่ได้อ่านที่สำคัญ
2. 📅 นัดประชุมวันนี้
3. ✅ Tasks ที่ต้อง complete วันนี้
4. 📊 KPI progress สัปดาห์นี้

### Sales
+ 🔥 Leads ที่ต้อง follow up วันนี้
+ 💰 Pipeline summary
+ ⚠️ Deals ที่ใกล้ deadline

### Manager
+ 👥 Team KPI overview
+ 🚨 ใครต้อง attention วันนี้
+ 📋 Sprint progress

### Admin / CEO
+ 🏢 Company OKR health
+ 📈 Revenue vs target
+ 🔔 Blockers ที่ต้องการ attention

## Data Sources
- Email (IMAP)
- Calendar (Google/Outlook)
- users/{email}/ACTIVITY_LOG.md
- users/{email}/PERFORMANCE.md
- CRM (ถ้าเปิดใช้)
- GitHub (ถ้าเป็น Dev)
