@echo off
chcp 65001 >nul
echo ==========================================
echo    F1 Pixel Racer - Ngrok 内网穿透
echo ==========================================
echo.
echo 这种方式可以生成公网链接，无需路由器设置
echo.

cd /d "%~dp0"

REM 检查 ngrok 是否安装
where ngrok >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未安装 ngrok
    echo.
    echo 请按以下步骤安装：
    echo 1. 访问 https://ngrok.com/download
    echo 2. 下载 Windows 版本并解压
    echo 3. 将 ngrok.exe 复制到本文件夹，或添加到系统 PATH
    echo.
    echo 或者使用 scoop 安装：
    echo    scoop install ngrok
    echo.
    pause
    exit /b 1
)

echo 启动本地服务器...
start /min python -m http.server 8080 --directory dist

echo 等待服务器启动...
timeout /t 2 /nobreak >nul

echo.
echo 启动 Ngrok 穿透...
echo 出现 "Forwarding" 后，复制 https://xxx.ngrok.io 链接到手机浏览器
echo.
echo 按 Ctrl+C 停止
echo.
ngrok http 8080
