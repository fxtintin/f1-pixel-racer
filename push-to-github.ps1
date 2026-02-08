# F1 Pixel Racer - GitHub 上传脚本
param(
    [Parameter(Mandatory=$true)]
    [string]$GitHubUsername,
    
    [string]$RepoName = "f1-pixel-racer",
    
    [switch]$Private
)

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "   F1 Pixel Racer - GitHub Uploader" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

Set-Location -Path $PSScriptRoot

# 检查 git
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "错误: 未安装 Git" -ForegroundColor Red
    Write-Host "请从 https://git-scm.com/download/win 下载安装" -ForegroundColor Yellow
    exit 1
}

# 检查远程仓库是否已配置
$remote = git remote get-url origin 2>$null
if ($remote) {
    Write-Host "远程仓库已配置: $remote" -ForegroundColor Green
    Write-Host ""
    Write-Host "是否要更新代码? (y/n)" -ForegroundColor Yellow -NoNewline
    $confirm = Read-Host
    if ($confirm -eq 'y') {
        Write-Host "正在推送更新..." -ForegroundColor Cyan
        git push origin master -u
        Write-Host "完成!" -ForegroundColor Green
    }
    exit
}

# 配置远程仓库
$repoUrl = "https://github.com/$GitHubUsername/$RepoName.git"

Write-Host "仓库信息:" -ForegroundColor Yellow
Write-Host "  用户名: $GitHubUsername" -ForegroundColor Gray
Write-Host "  仓库名: $RepoName" -ForegroundColor Gray
Write-Host "  完整URL: $repoUrl" -ForegroundColor Gray
Write-Host ""
Write-Host "请确认上述信息正确，然后按 Enter 继续..." -ForegroundColor Yellow
Read-Host

# 添加远程仓库
git remote add origin $repoUrl

if ($LASTEXITCODE -ne 0) {
    Write-Host "添加远程仓库失败" -ForegroundColor Red
    exit 1
}

# 推送
git branch -M master
git push -u origin master

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ 上传成功!" -ForegroundColor Green
    Write-Host ""
    Write-Host "仓库地址: $repoUrl" -ForegroundColor Cyan
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ 上传失败" -ForegroundColor Red
    Write-Host ""
    Write-Host "可能的原因:" -ForegroundColor Yellow
    Write-Host "1. GitHub 仓库不存在 - 请先创建仓库" -ForegroundColor Gray
    Write-Host "2. 未登录 GitHub - 请配置 Git 凭证" -ForegroundColor Gray
    Write-Host "3. 仓库名或用户名错误" -ForegroundColor Gray
    Write-Host ""
    Write-Host "手动创建仓库:" -ForegroundColor Yellow
    Write-Host "https://github.com/new?name=$RepoName" -ForegroundColor Cyan
}

Read-Host "按 Enter 退出"
