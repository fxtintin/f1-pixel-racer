# 测试局域网连通性
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "   F1 Pixel Racer - 局域网连通性测试" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

$LocalIP = "192.168.2.215"
$Port = 8080

# 1. 检查服务器是否运行
Write-Host "[测试 1/4] 检查本地服务器..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:$Port" -TimeoutSec 2 -UseBasicParsing
    Write-Host "    ✅ 本地服务器正常运行 (状态码: $($response.StatusCode))" -ForegroundColor Green
} catch {
    Write-Host "    ❌ 本地服务器未启动或无法访问" -ForegroundColor Red
    Write-Host "    请先运行 start-safe-server.ps1 启动服务器" -ForegroundColor Cyan
    exit
}
Write-Host ""

# 2. 检查绑定地址
Write-Host "[测试 2/4] 检查服务器绑定地址..." -ForegroundColor Yellow
$tcpListeners = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
if ($tcpListeners) {
    $listeners = $tcpListeners | Select-Object -ExpandProperty LocalAddress -Unique
    Write-Host "    服务器监听地址:" -ForegroundColor Gray
    $listeners | ForEach-Object {
        $status = if ($_ -eq "0.0.0.0" -or $_ -eq "::" -or $_ -eq $LocalIP) { "✅" } else { "⚠️" }
        Write-Host "      $status $_`:$Port" -ForegroundColor $(if($status -eq "✅"){"Green"}else{"Yellow"})
    }
    
    if ($listeners -contains "0.0.0.0" -or $listeners -contains "::") {
        Write-Host "    ✅ 服务器已绑定所有接口，局域网可访问" -ForegroundColor Green
    } elseif ($listeners -contains $LocalIP) {
        Write-Host "    ✅ 服务器已绑定局域网IP" -ForegroundColor Green
    } else {
        Write-Host "    ⚠️ 服务器可能只监听了 localhost，局域网可能无法访问" -ForegroundColor Yellow
    }
} else {
    Write-Host "    ❌ 未找到监听端口 $Port 的进程" -ForegroundColor Red
}
Write-Host ""

# 3. 检查防火墙
Write-Host "[测试 3/4] 检查防火墙规则..." -ForegroundColor Yellow
$firewallRules = Get-NetFirewallRule -DisplayName "F1-Pixel-Racer-*" -ErrorAction SilentlyContinue
if ($firewallRules) {
    Write-Host "    ✅ 找到防火墙规则:" -ForegroundColor Green
    $firewallRules | ForEach-Object {
        $portFilter = $_ | Get-NetFirewallPortFilter
        $addrFilter = $_ | Get-NetFirewallAddressFilter
        Write-Host "      - $($_.DisplayName)" -ForegroundColor Gray
        Write-Host "        端口: $($portFilter.LocalPort), 远程IP: $($addrFilter.RemoteAddress)" -ForegroundColor DarkGray
    }
} else {
    Write-Host "    ⚠️ 未找到 F1 防火墙规则" -ForegroundColor Yellow
    Write-Host "    服务器可能无法被其他设备访问" -ForegroundColor Gray
}
Write-Host ""

# 4. 检查同网段设备连通性（模拟）
Write-Host "[测试 4/4] 网络配置检查..." -ForegroundColor Yellow
$netConfig = Get-NetIPConfiguration | Where-Object { $_.NetIPv4IPInterface -and $_.IPv4Address.IPAddress -like "192.168.2.*" } | Select-Object -First 1
if ($netConfig) {
    Write-Host "    接口: $($netConfig.InterfaceAlias)" -ForegroundColor Gray
    Write-Host "    IP: $($netConfig.IPv4Address.IPAddress)" -ForegroundColor Gray
    Write-Host "    子网掩码: $($netConfig.IPv4Address.PrefixLength)" -ForegroundColor Gray
    Write-Host "    网关: $($netConfig.IPv4DefaultGateway.NextHop)" -ForegroundColor Gray
    Write-Host "    ✅ 确认在 192.168.2.x 网段" -ForegroundColor Green
} else {
    Write-Host "    ❌ 未找到 192.168.2.x 网段的网络接口" -ForegroundColor Red
}
Write-Host ""

# 总结
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "测试结果总结" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📱 请在你的手机（192.168.2.104）上测试：" -ForegroundColor Green
Write-Host ""
Write-Host "  浏览器输入: http://$LocalIP`:$Port" -ForegroundColor White -BackgroundColor DarkBlue
Write-Host ""
Write-Host "如果无法访问，请检查：" -ForegroundColor Yellow
Write-Host "  1. 路由器是否开启 AP 隔离（见 check-router-ap-isolation.md）" -ForegroundColor Gray
Write-Host "  2. Windows 防火墙是否放行（重新运行 start-safe-server.ps1）" -ForegroundColor Gray
Write-Host "  3. 手机和电脑是否连接同一个 WiFi" -ForegroundColor Gray
Write-Host ""
Write-Host "替代方案：" -ForegroundColor Yellow
Write-Host "  • 使用 Ngrok（公网访问）：运行 ngrok http $Port" -ForegroundColor Gray
Write-Host "  • 使用 USB 共享网络（最稳定）" -ForegroundColor Gray
Write-Host ""

Read-Host "按 Enter 退出"
