#!/usr/bin/env node
/**
 * lookup-user.js
 * Map Telegram chat_id → user profile จาก USERS.csv
 * Usage: node lookup-user.js <chat_id>
 */

const fs = require('fs');
const path = require('path');

const WORKSPACE = path.resolve(__dirname, '..');
const USERS_CSV = path.join(WORKSPACE, 'org', 'USERS.csv');

function loadUsers() {
  const content = fs.readFileSync(USERS_CSV, 'utf8');
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',');
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const user = {};
    headers.forEach((h, i) => user[h.trim()] = (values[i] || '').trim());
    return user;
  });
}

function lookupByChatId(chatId) {
  const users = loadUsers();
  return users.find(u => u.telegram_chat_id === String(chatId)) || null;
}

function getUserContext(chatId) {
  const user = lookupByChatId(chatId);
  if (!user) return null;

  const userDir = path.join(WORKSPACE, 'users', user.email);
  const userMd = path.join(userDir, 'USER.md');
  const memoryMd = path.join(userDir, 'MEMORY.md');
  const deptMd = path.join(WORKSPACE, 'knowledge', 'department', `${user.department}.md`);

  return {
    user,
    files: {
      userProfile: fs.existsSync(userMd) ? fs.readFileSync(userMd, 'utf8') : null,
      memory: fs.existsSync(memoryMd) ? fs.readFileSync(memoryMd, 'utf8') : null,
      department: fs.existsSync(deptMd) ? fs.readFileSync(deptMd, 'utf8') : null,
    }
  };
}

// CLI usage
if (require.main === module) {
  const chatId = process.argv[2];
  if (!chatId) {
    console.log('Usage: node lookup-user.js <chat_id>');
    process.exit(1);
  }
  const ctx = getUserContext(chatId);
  if (!ctx) {
    console.log(JSON.stringify({ error: 'User not found', chat_id: chatId }));
    process.exit(1);
  }
  console.log(JSON.stringify(ctx.user, null, 2));
}

module.exports = { loadUsers, lookupByChatId, getUserContext };
