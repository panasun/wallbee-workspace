# Config

ไฟล์นี้คือ template ของ `openclaw.json` ครับ

## วิธีใช้บนเครื่องใหม่

1. Clone repo นี้
2. Copy `config/openclaw.json` ไปที่ `~/.openclaw/openclaw.json`
3. แทนที่ placeholder:
   - `TELEGRAM_BOT_TOKEN` → bot token จริง
   - `GATEWAY_AUTH_TOKEN` → สร้างใหม่ด้วย `openssl rand -hex 32`
4. รัน `openclaw gateway start`

## Secrets (อย่า commit)
- Bot token จริง
- Gateway auth token จริง
- API keys ต่างๆ

เก็บ secrets ไว้ใน `~/.openclaw/secrets.env` แทนครับ
