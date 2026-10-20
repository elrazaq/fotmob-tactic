@echo off
title Prototype Fotmob Tactic - Ver. 1.0
cd /d "%~dp0"

echo ============================================================
echo   PROTOTYPE FOTMOB TACTIC // Football Lineup Studio
echo   Ver. 1.0 - Zero-Install Local Edition + Proxy Server
echo ============================================================
echo.
echo Membuka aplikasi studio di browser default Anda...
echo.

where python >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo [OK] Menjalankan server studio dengan Bypass Proxy pada port 8000...
    start "" http://localhost:8000/
    python server.py
) else (
    echo [OK] Membuka langsung index.html...
    start "" "index.html"
)
