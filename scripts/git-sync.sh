#!/bin/bash
cd /root/.openclaw/workspace
git add -A
git diff --cached --quiet && echo "Nothing to commit" && exit 0
git commit -m "Auto sync: $(date '+%Y-%m-%d %H:%M UTC')"
git push origin main
echo "Sync done: $(date)"
