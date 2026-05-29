@echo off
cd /d "%~dp0"
set PATH=%PATH%;%USERPROFILE%\.cargo\bin
npm run tauri dev
pause
