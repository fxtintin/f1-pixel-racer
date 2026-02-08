@echo off
chcp 65001 >nul
echo ==========================================
echo    F1 Pixel Racer - 资源更新工具
echo ==========================================
echo.

cd /d "%~dp0"

echo [1/3] 复制车队图片到 public...
xcopy /Y /I /S "teams\cars\*.png" "public\teams\cars\" >nul 2>&1
echo     完成！

echo.
echo [2/3] 复制国旗图片到 public...
xcopy /Y /I /S "nation\flags\*.png" "public\nation\flags\" >nul 2>&1
echo     完成！

echo.
echo [3/3] 构建生产版本...
call npm run build
if %errorlevel% neq 0 (
    echo     构建失败！请检查错误信息。
    pause
    exit /b 1
)

echo.
echo [4/4] 复制资源到 dist...
xcopy /Y /I /S "teams\cars\*.png" "dist\teams\cars\" >nul 2>&1
xcopy /Y /I /S "nation\flags\*.png" "dist\nation\flags\" >nul 2>&1
xcopy /Y /I /S "nation\country.png" "dist\nation\" >nul 2>&1
echo     完成！

echo.
echo ==========================================
echo  ✅ 资源更新完成！
echo ==========================================
echo.
echo 访问地址:
echo   开发: http://localhost:5173
echo   生产: http://localhost:8080
echo.
pause
