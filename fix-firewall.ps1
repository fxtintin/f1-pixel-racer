# 修复防火墙设置 - 以管理员身份运行
Write-Host "正在添加防火墙规则..." -ForegroundColor Yellow

# 添加 8080 端口规则
New-NetFirewallRule -DisplayName "F1 Web Server 8080" -Direction Inbound -Protocol TCP -LocalPort 8080 -Action Allow -ErrorAction SilentlyContinue

# 添加 5173 端口规则 (开发服务器)
New-NetFirewallRule -DisplayName "F1 Dev Server 5173" -Direction Inbound -Protocol TCP -LocalPort 5173 -Action Allow -ErrorAction SilentlyContinue

Write-Host "防火墙规则已添加!" -ForegroundColor Green
Read-Host "按 Enter 退出"
