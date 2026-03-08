@echo off
cd /d C:\Users\Ghost-Face\Desktop\CyberPortfolio
echo Installing dependencies...
call npm install
echo.
echo Starting development server...
echo Server will be available at http://localhost:5173
echo.
call npm run dev
pause
