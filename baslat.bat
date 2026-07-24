@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo.
echo  BioCare baslatiliyor...
echo  Klasor: %cd%
echo.

where py >nul 2>&1
if %errorlevel%==0 (
  start "" "http://127.0.0.1:5500/"
  py -m http.server 5500
  goto end
)

where python >nul 2>&1
if %errorlevel%==0 (
  start "" "http://127.0.0.1:5500/"
  python -m http.server 5500
  goto end
)

echo  Python bulunamadi.
echo  Bunun yerine index.html dosyasina CIFT TIKLA.
echo.
start "" "%~dp0index.html"
pause
exit /b 1

:end
echo.
echo  Durdurmak icin bu pencerede Ctrl+C bas.
pause
