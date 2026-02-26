#!/usr/bin/env node
// morning-summary.js — อ่าน Gmail สรุปหุ้น/การลงทุน แล้วส่ง Telegram

const Imap = require('imap');
const { simpleParser } = require('mailparser');
const https = require('https');

const IMAP_CONFIG = {
  user: 'panasun@i17.co',
  password: 'xlzfhlafqomaqudu',
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
  tlsOptions: { rejectUnauthorized: false }
};

const TELEGRAM_TOKEN = '8671625441:AAGJSLKOJPy_Ph3TEnSYbsx6mts_2RC9tP8';
const TELEGRAM_CHAT_ID = '8436327384';

const INVESTMENT_SENDERS = [
  'admin@nextinvestors.com',
  'account@seekingalpha.com',
  'no-reply@q4inc.com',
  'no-reply@notification.gcs-web.com',
];

function sendTelegram(text) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: 'HTML' });
    const req = https.request({
      hostname: 'api.telegram.org',
      path: `/bot${TELEGRAM_TOKEN}/sendMessage`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function fetchEmails() {
  return new Promise((resolve, reject) => {
    const imap = new Imap(IMAP_CONFIG);
    const emails = [];

    imap.once('ready', () => {
      imap.openBox('INBOX', true, (err) => {
        if (err) return reject(err);

        // ดึงอีเมลใน 24 ชั่วโมงที่ผ่านมา
        const since = new Date();
        since.setDate(since.getDate() - 1);
        const dateStr = since.toDateString();

        imap.search([['SINCE', dateStr]], (err, results) => {
          if (err || !results.length) {
            imap.end();
            return resolve([]);
          }

          const f = imap.fetch(results, { bodies: '' });
          f.on('message', (msg) => {
            msg.on('body', (stream) => {
              simpleParser(stream, (err, parsed) => {
                if (!err && parsed) {
                  emails.push({
                    from: parsed.from?.text || '',
                    subject: parsed.subject || '',
                    text: (parsed.text || '').slice(0, 2000),
                    date: parsed.date
                  });
                }
              });
            });
          });
          f.once('end', () => { imap.end(); });
        });
      });
    });

    imap.once('end', () => resolve(emails));
    imap.once('error', reject);
    imap.connect();
  });
}

function isInvestmentEmail(email) {
  const from = email.from.toLowerCase();
  const subject = email.subject.toLowerCase();
  const text = email.text.toLowerCase();

  const investmentKeywords = ['stock', 'mining', 'invest', 'market', 'mineral', 'share', 'asx', 'nyse', 'gold', 'silver', 'lithium', 'tungsten', 'copper', 'fund', 'portfolio', 'trading', 'equity', 'ipo'];

  if (INVESTMENT_SENDERS.some(s => from.includes(s))) return true;
  if (investmentKeywords.some(k => subject.includes(k) || text.includes(k))) return true;
  return false;
}

function summarizeEmail(email) {
  // ตัดส่วน disclaimer ออก
  let text = email.text
    .replace(/disclosure:.*?forward-looking statements are uncertain.*?outcome\./gis, '')
    .replace(/this information is general.*?advice\./gis, '')
    .trim()
    .slice(0, 800);

  return `📧 <b>${email.subject}</b>\n👤 ${email.from}\n\n${text}...\n`;
}

async function main() {
  console.log('Fetching emails...');
  const emails = await fetchEmails();
  console.log(`Found ${emails.length} emails in last 24h`);

  const investmentEmails = emails.filter(isInvestmentEmail);
  console.log(`Investment-related: ${investmentEmails.length}`);

  if (!investmentEmails.length) {
    await sendTelegram('🐝 <b>สรุปอีเมลเช้านี้</b>\n\nไม่มีอีเมลเกี่ยวกับหุ้น/การลงทุนใหม่ใน 24 ชั่วโมงที่ผ่านมาครับ');
    return;
  }

  let message = `🐝 <b>สรุปอีเมลเช้านี้ — ${new Date().toLocaleDateString('th-TH')}</b>\n`;
  message += `📬 พบ ${investmentEmails.length} อีเมลเกี่ยวกับหุ้น/การลงทุน\n\n`;
  message += '─────────────────\n\n';

  for (const email of investmentEmails.slice(0, 5)) {
    message += summarizeEmail(email);
    message += '\n─────────────────\n\n';
  }

  if (investmentEmails.length > 5) {
    message += `และอีก ${investmentEmails.length - 5} อีเมล...`;
  }

  // ถ้า message ยาวเกิน แยกส่ง
  if (message.length > 4000) {
    const chunks = message.match(/.{1,4000}/gs) || [];
    for (const chunk of chunks) {
      await sendTelegram(chunk);
    }
  } else {
    await sendTelegram(message);
  }

  console.log('Done!');
}

main().catch(console.error);
