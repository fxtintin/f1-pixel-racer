@echo off
chcp 65001 >nul
echo ==========================================
echo    F1 Pixel Racer - 快速测试工具
echo ==========================================
echo.

cd /d "%~dp0"

echo [1/3] 确保已构建...
if not exist "dist\index.html" (
    echo 正在构建...
    call npm run build
    xcopy /Y /I "teams\cars\*.png" "dist\teams\cars\" >nul 2>&1
    xcopy /Y /I "nation\flags\*.png" "dist\nation\flags\" >nul 2>&1
)

echo.
echo [2/3] 添加防火墙规则（需要管理员权限）...
echo 如果弹出UAC提示，请点击"是"
echo.

REM 尝试添加防火墙规则
powershell -Command "New-NetFirewallRule -DisplayName 'F1-Test-8080' -Direction Inbound -Protocol TCP -LocalPort 8080 -Action Allow -Profile Any -ErrorAction SilentlyContinue" >nul 2>&1

echo [3/3] 启动服务器...
echo.
echo ==========================================
echo  本机访问: http://localhost:8080
echo  局域网:   http://192.168.2.215:8080
echo ==========================================
echo.
echo 如果手机无法访问，请检查：
echo 1. 手机和电脑是否连接同一个WiFi
echo 2. 关闭Windows防火墙（暂时测试）
echo 3. 检查路由器AP隔离设置
echo.

cd dist
python -m http.server 8080 --bind 0.0.0.0

pause
