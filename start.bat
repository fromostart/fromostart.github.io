@echo off
cd /d "%~dp0"
call npm run dev -- --hostname 127.0.0.1 --port 4174
pause
