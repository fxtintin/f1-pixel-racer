# F1 Pixel Racer - 网络诊断工具
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "   F1 Pixel Racer - 网络诊断" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# 1. 检查 IP 配置
Write-Host "[1] 网络配置:" -ForegroundColor Yellow
$ipInfo = Get-NetIPAddress -AddressFamily IPv4 | 
    Where-Object { $_.IPAddress -notlike "127.*" -and $_.IPAddress -notlike "169.254.*" }
    
$ipInfo | ForEach-Object {
    Write-Host "    IP: $($_.IPAddress) / $($_.PrefixLength)" -ForegroundColor Gray
    Write-Host "    接口: $($_.InterfaceAlias)" -ForegroundColor Gray
    Write-Host ""
}

# 2. 检查端口状态
Write-Host "[2] 端口 8080 状态:" -ForegroundColor Yellow
$tcpConn = Get-NetTCPConnection -LocalPort 8080 -ErrorAction SilentlyContinue
if ($tcpConn) {
    Write-Host "    状态: $($tcpConn.State)" -ForegroundColor Green
    Write-Host "    监听地址: $($tcpConn.LocalAddress)" -ForegroundColor Gray
} else {
    Write-Host "    状态: 未启动" -ForegroundColor Red
}
Write-Host ""

# 3. 检查防火墙规则
Write-Host "[3] 防火墙规则:" -ForegroundColor Yellow
$firewallRules = Get-NetFirewallRule -DisplayName "F1-*" -ErrorAction SilentlyContinue
if ($firewallRules) {
    $firewallRules | ForEach-Object {
        Write-Host "    规则: $($_.DisplayName) - $($_.Enabled)" -ForegroundColor $(if($_.Enabled -eq 'True'){'Green'}else{'Red'})
    }
} else {
    Write-Host "    未找到 F1 相关规则" -ForegroundColor Red
}
Write-Host ""

# 4. 检查路由器连通性
Write-Host "[4] 路由器连通性:" -ForegroundColor Yellow
$routerPing = Test-Connection -ComputerName "192.168.2.1" -Count 1 -Quiet
if ($routerPing) {
    Write-Host "    路由器 192.168.2.1: 可达 ✅" -ForegroundColor Green
} else {
    Write-Host "    路由器 192.168.2.1: 不可达 ❌" -ForegroundColor Red
}
Write-Host ""

# 5. 提供解决方案
Write-Host "==========================================" -ForegroundColor Yellow
Write-Host "诊断结果和建议:" -ForegroundColor Yellow
Write-Host "==========================================" -ForegroundColor Yellow
Write-Host ""

if (-not $tcpConn) {
    Write-Host "❌ 问题: 服务器未启动" -ForegroundColor Red
    Write-Host "   解决: 运行 quick-test.bat 启动服务器" -ForegroundColor Cyan
    Write-Host ""
}

if (-not $firewallRules) {
    Write-Host "❌ 问题: 防火墙未放行端口 8080" -ForegroundColor Red
    Write-Host "   解决: 以管理员身份运行:" -ForegroundColor Cyan
    Write-Host "   New-NetFirewallRule -DisplayName 'F1-8080' -Direction Inbound -Protocol TCP -LocalPort 8080 -Action Allow" -ForegroundColor Gray
    Write-Host ""
}

Write-Host "📋 推荐的三种解决方案:" -ForegroundColor Green
Write-Host ""
Write-Host "方案1 - Ngrok（最简单，有公网链接）:" -ForegroundColor Cyan
Write-Host "   1. 下载 https://ngrok.com/download" -ForegroundColor Gray
Write-Host "   2. 解压 ngrok.exe 到本文件夹" -ForegroundColor Gray
Write-Host "   3. 双击运行 ngrok-start.bat" -ForegroundColor Gray
Write-Host ""
Write-Host "方案2 - 路由器端口映射:" -ForegroundColor Cyan
Write-Host "   1. 访问 http://192.168.2.1" -ForegroundColor Gray
Write-Host "   2. 找到 端口转发/虚拟服务器 设置" -ForegroundColor Gray
Write-Host "   3. 添加规则: 外部8080 → 内部192.168.2.215:8080" -ForegroundColor Gray
Write-Host "   详见 ROUTER-SETUP.md" -ForegroundColor Gray
Write-Host ""
Write-Host "方案3 - 关闭防火墙测试:" -ForegroundColor Cyan
Write-Host "   以管理员运行: netsh advfirewall set allprofiles state off" -ForegroundColor Gray
Write-Host "   （测试后记得开启: state on）" -ForegroundColor Gray
Write-Host ""

Read-Host "按 Enter 退出"
