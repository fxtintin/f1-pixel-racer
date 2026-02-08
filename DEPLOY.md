# F1 Pixel Racer - 部署指南

## 📤 上传到 GitHub

### 1. 初始化 Git 仓库

```bash
# 在项目根目录执行
cd "Y:\软件\kimi\F1Project\F1"

# 初始化 git
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: F1 Pixel Racer project"
```

### 2. 创建 GitHub 仓库

1. 访问 https://github.com/new
2. 输入仓库名: `f1-pixel-racer` (或你喜欢的名字)
3. 选择 Public (公开) 或 Private (私有)
4. **不要**勾选 "Initialize this repository with a README"
5. 点击 "Create repository"

### 3. 上传代码

在 GitHub 页面会显示类似以下的命令，复制执行：

```bash
# 添加远程仓库 (替换 YOUR_USERNAME 为你的 GitHub 用户名)
git remote add origin https://github.com/YOUR_USERNAME/f1-pixel-racer.git

# 上传
git branch -M main
git push -u origin main
```

---

## 🌐 局域网内访问

### 方案一：开发服务器模式（临时测试）

```bash
# 在项目目录执行
cd "Y:\软件\kimi\F1Project\F1"
npm run dev -- --host

# 或使用 npx
npx vite --host
```

访问地址：
- 本机: http://localhost:5173
- 局域网: http://你的IP:5173 (如 http://192.168.1.5:5173)

**缺点**: 需要保持命令行窗口开启

---

### 方案二：静态文件服务器（推荐）

#### 1. 构建生产版本

```bash
cd "Y:\软件\kimi\F1Project\F1"
npm run build
```

#### 2. 使用 Python 简易服务器

```bash
# 进入构建输出目录
cd dist

# Python 3
python -m http.server 8080

# 或 Python 2
python -m SimpleHTTPServer 8080
```

访问: http://你的IP:8080

#### 3. 使用 Node.js 的 serve

```bash
# 全局安装 serve
npm install -g serve

# 启动服务器
serve -s dist -l 8080
```

#### 4. 使用 Windows IIS (专业方案)

1. 打开 "控制面板" → "程序" → "启用或关闭 Windows 功能"
2. 勾选 "Internet Information Services"
3. 将 `dist` 文件夹内容复制到 `C:\inetpub\wwwroot\f1`
4. 访问: http://你的IP/f1

---

### 方案三：GitHub Pages（公网访问）

#### 1. 安装 gh-pages

```bash
npm install --save-dev gh-pages
```

#### 2. 修改 package.json

```json
{
  "scripts": {
    "build": "tsc && vite build",
    "preview": "vite preview",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://YOUR_USERNAME.github.io/f1-pixel-racer"
}
```

#### 3. 修改 vite.config.ts

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/f1-pixel-racer/',  // 添加这一行
  // ...
})
```

#### 4. 部署

```bash
npm run build
npm run deploy
```

访问: https://YOUR_USERNAME.github.io/f1-pixel-racer

---

## 🔧 原理说明

### 局域网访问原理

```
┌─────────────────┐      局域网/WiFi      ┌─────────────────┐
│   你的电脑       │ ←────────────────→    │   手机/平板      │
│  (192.168.1.5)  │    同一网络下可直接访问 │  (192.168.1.8)  │
│                 │                      │                 │
│  ┌───────────┐  │                      │  浏览器输入:     │
│  │ 开发服务器  │  │                      │  192.168.1.5    │
│  │ (Vite)    │  │                      │  :5173          │
│  │ 端口 5173  │  │                      │                 │
│  └───────────┘  │                      └─────────────────┘
└─────────────────┘
```

**关键点**:
1. 所有设备必须在 **同一局域网** 内
2. 需要知道电脑的 **内网 IP 地址**
3. Windows 防火墙需要允许该端口的访问

### 查看本机 IP

```bash
# Windows
ipconfig

# 找 "IPv4 地址" 一行，如: 192.168.1.5
```

---

## 🛡️ Windows 防火墙设置

如果其他设备无法访问，需要添加防火墙规则：

### 方法 1: PowerShell (管理员)

```powershell
# 允许 8080 端口 (静态服务器)
New-NetFirewallRule -DisplayName "F1 Web Server" -Direction Inbound -Protocol TCP -LocalPort 8080 -Action Allow

# 允许 5173 端口 (Vite 开发服务器)
New-NetFirewallRule -DisplayName "F1 Dev Server" -Direction Inbound -Protocol TCP -LocalPort 5173 -Action Allow
```

### 方法 2: 图形界面

1. 打开 "Windows Defender 防火墙"
2. 点击 "高级设置"
3. 右键 "入站规则" → "新建规则"
4. 选择 "端口" → "TCP" → 输入端口号 (5173 或 8080)
5. 选择 "允许连接" → 勾选所有配置文件 → 输入名称 "F1 Server"

---

## 🔧 日常维护

### 更新代码后重新部署

```bash
# 1. 修改代码后提交到 GitHub
git add .
git commit -m "更新描述"
git push

# 2. 重新构建并部署 (如使用 GitHub Pages)
npm run build
npm run deploy
```

### 添加新赛季数据

1. 更新 `src/utils/teams.ts` 中的 `GROUND_EFFECT_YEARS`
2. 添加新车队图片到 `teams/cars/`
3. 更新车队配置

### 备份重要数据

需要备份的文件夹：
- `teams/cars/` - 车队赛车图片
- `nation/flags/` - 国旗图片
- `src/` - 源代码

不需要备份（可重新生成）：
- `node_modules/` - 依赖
- `dist/` - 构建输出
- `data/` - 缓存数据

---

## 📱 移动端优化建议

### 1. 添加 PWA 支持

创建 `public/manifest.json`:

```json
{
  "name": "F1 Pixel Racer",
  "short_name": "F1Pixel",
  "description": "F1 Ground Effect Era Data",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0a0f1a",
  "theme_color": "#e10600",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

### 2. 添加到手机主屏幕

在手机上访问网站 → 浏览器菜单 → "添加到主屏幕"

---

## ❓ 常见问题

**Q: 其他设备显示 "无法访问此网站"**
A: 检查:
1. 防火墙是否放行端口
2. 设备是否在同一 WiFi
3. IP 地址是否正确

**Q: 图片不显示**
A: 检查:
1. `teams/cars/` 和 `nation/flags/` 是否在 `dist/` 中
2. 文件名是否与配置匹配

**Q: GitHub Pages 部署后空白页**
A: 检查 `vite.config.ts` 中的 `base` 配置是否正确

---

## 📞 需要帮助？

遇到问题请检查：
1. 浏览器控制台报错 (F12)
2. 命令行输出信息
3. Windows 防火墙日志
