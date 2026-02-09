# VS Code 开发指南

## 🚀 快速开始

### 1. 打开项目

**方法 1：右键打开**
```
打开文件夹 Y:\软件\kimi\F1Project\F1
右键 → 打开方式 → Visual Studio Code
```

**方法 2：VS Code 内打开**
```
1. 打开 VS Code
2. 点击 "打开文件夹"
3. 选择 Y:\软件\kimi\F1Project\F1
```

**方法 3：命令行（最快）**
```bash
code "Y:\软件\kimi\F1Project\F1"
```

---

## 🔧 安装推荐插件

打开 VS Code 后，按 `Ctrl+Shift+X` 打开插件面板，搜索并安装：

### 必装插件

| 插件名 | 作用 |
|--------|------|
| **ES7+ React/Redux/React-Native snippets** | React 代码片段，输入 `rafce` 自动生成组件 |
| **Tailwind CSS IntelliSense** | Tailwind 自动补全和提示 |
| **TypeScript Importer** | 自动导入类型 |
| **Prettier - Code: formatter** | 代码格式化 |
| **GitLens** | Git 增强，显示代码作者和提交历史 |

### 推荐插件

| 插件名 | 作用 |
|--------|------|
| **Auto Rename Tag** | 自动重命名 HTML/JSX 标签 |
| **Bracket Pair Colorizer** | 括号颜色配对 |
| **Material Icon Theme** | 文件图标美化 |
| **One Dark Pro** | 主题配色 |

---

## 📁 项目结构（VS Code 中）

打开后左侧文件树应该是这样：

```
📁 F1/
├── 📁 .vscode/              ← 配置文件（自动创建）
├── 📁 node_modules/         ← 依赖（无需修改）
├── 📁 public/               ← 静态资源
│   ├── 📁 nation/flags/     ← 国旗图片
│   └── 📁 teams/cars/       ← 车队图片
├── 📁 scripts/              ← Python 脚本
├── 📁 src/                  ← ⚠️ 主要代码在这里
│   ├── 📁 components/       ← UI组件
│   │   ├── 📁 race/         ← 比赛相关
│   │   ├── 📁 standings/    ← 积分榜相关
│   │   └── 📁 ui/           ← 基础UI组件
│   ├── 📁 hooks/            ← React Hooks
│   ├── 📁 pages/            ← 页面
│   ├── 📁 utils/            ← 工具函数
│   ├── 📄 index.css         ← 全局样式
│   └── 📄 main.tsx          ← 入口文件
├── 📁 teams/cars/           ← 车队图片源文件
├── 📄 package.json          ← 项目配置
└── 📄 README.md             ← 说明文档
```

---

## 💻 常用操作

### 1. 打开终端

**快捷键：** `` Ctrl+` ``（数字 1 左边的那个键）

或者在菜单栏：
```
终端 → 新建终端
```

### 2. 启动开发服务器

在 VS Code 终端中输入：

```bash
npm run dev
```

看到以下输出表示成功：
```
VITE v5.4.21  ready in 1234 ms

➜  Local:   http://localhost:5173/
➜  Network: http://192.168.2.215:5173/
➜  press h + enter to show help
```

然后按 `Ctrl+点击` 链接打开浏览器。

### 3. 修改代码并查看效果

**示例：修改标题颜色**

1. 打开 `src/index.css`
2. 找到 `--f1-red: #e10600;`
3. 改成 `--f1-red: #ff0000;`
4. 按 `Ctrl+S` 保存
5. 浏览器自动刷新，标题变红色了！

### 4. 格式化代码

按 `Shift+Alt+F` 自动格式化当前文件

或保存时自动格式化：
```
文件 → 首选项 → 设置 → 搜索 "format on save" → 勾选
```

---

## 🎨 修改示例

### 修改 1：改变主题颜色

打开 `tailwind.config.js`：

```javascript
colors: {
  // 主色调 - F1红
  'f1-red': '#e10600',      // ← 改这里
  'f1-red-dark': '#8b0000', // ← 和这里
  // ...
}
```

### 修改 2：添加新车队

打开 `src/utils/teams.ts`，找到 `teamConfigs` 数组，复制一个车队配置修改。

### 修改 3：调整卡片样式

打开 `src/components/race/RaceCard.tsx`：

```tsx
// 找到 className 部分，修改样式
className={cn(
  'relative overflow-hidden border-4 bg-pixel-surface transition-all',
  // 添加你的样式
  'hover:shadow-lg',  // 添加悬停阴影
)}
```

### 修改 4：更新年份

打开 `src/hooks/useF1Data.ts`：

```typescript
export const GROUND_EFFECT_YEARS = ['2022', '2023', '2024', '2025', '2026']; // 添加 2026
```

---

## ⌨️ 快捷键大全

| 快捷键 | 作用 |
|--------|------|
| `Ctrl+P` | 快速打开文件 |
| `Ctrl+Shift+F` | 全局搜索 |
| `Ctrl+Shift+P` | 命令面板 |
| `Ctrl+`` | 显示/隐藏终端 |
| `Ctrl+S` | 保存 |
| `Ctrl+Z` | 撤销 |
| `Ctrl+Shift+Z` | 重做 |
| `F12` | 跳转到定义 |
| `Alt+←` | 返回上一位置 |
| `Ctrl+/` | 注释/取消注释 |
| `Ctrl+D` | 选中下一个相同单词 |
| `Ctrl+Shift+L` | 选中所有相同单词 |

---

## 🐛 调试方法

### 1. 浏览器开发者工具

按 `F12` 打开：
- **Console**：查看报错信息
- **Network**：查看网络请求（图片是否加载）
- **Elements**：查看 DOM 结构

### 2. VS Code 调试

1. 按 `Ctrl+Shift+D` 打开调试面板
2. 点击「创建 launch.json 文件」
3. 选择 "Chrome" 或 "Edge"
4. 按 `F5` 启动调试

### 3. 查看错误

终端报错时：
1. 看红色错误信息
2. 点击错误中的文件路径直接跳转
3. 根据行号修改

---

## 📝 常用代码片段

输入以下前缀按 `Tab` 自动补全：

| 前缀 | 生成 |
|------|------|
| `rafce` | React 箭头函数组件 + 导出 |
| `clg` | console.log() |
| `imp` | import module from 'module' |
| `imr` | import React from 'react' |
| `useState` | const [state, setState] = useState() |
| `useEffect` | useEffect(() => {}, []) |

---

## 🔄 完整开发流程示例

假设你要添加一个 "最快圈速" 图标：

```bash
# 1. 确保服务器在运行（终端 1）
npm run dev

# 2. 新建终端（终端 2），按 Ctrl+Shift+`

# 3. 找到要修改的文件
code src/components/race/RaceResults.tsx

# 4. 修改代码...
# 添加图标、调整样式等

# 5. 保存（Ctrl+S），浏览器自动刷新查看效果

# 6. 提交更改
git add .
git commit -m "feat: 添加最快圈速图标"
git push
```

---

## 🆘 常见问题

### Q: 终端显示 "npm 不是内部命令"
**A:** 需要安装 Node.js，https://nodejs.org

### Q: 保存后浏览器没刷新
**A:** 
1. 检查服务器是否运行（看终端是否有 VITE 字样）
2. 按 `Ctrl+Shift+R` 强制刷新浏览器

### Q: 代码报错红色波浪线
**A:** 
1. 按 `Ctrl+Shift+P` → "TypeScript: Restart TS Server"
2. 或重启 VS Code

### Q: 找不到文件
**A:** 
1. 按 `Ctrl+P` 快速搜索文件名
2. 注意大小写，Windows 不区分，但 import 区分

### Q: Git 提交不了
**A:** 
```bash
# 检查状态
git status

# 添加所有更改
git add .

# 提交
git commit -m "描述"

# 推送
git push
```

---

## 💡 高效技巧

### 1. 分屏编辑
```
文件 → 首选项 → 设置 → 搜索 "split" → 找到分屏快捷键
或拖拽文件标签到侧边
```

### 2. 多光标编辑
- `Alt+点击`：多个光标
- `Ctrl+D`：选中下一个相同单词
- `Ctrl+Shift+L`：选中所有相同单词

### 3.  Emmet 缩写
HTML/JSX 中输入：
```
div.container>ul>li*5
按 Tab 生成：
<div class="container">
  <ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</div>
```

### 4. 智能提示
- `Ctrl+Space`：强制触发提示
- `Ctrl+Shift+Space`：参数提示

---

## 📞 需要帮助？

1. 按 `Ctrl+Shift+P` 打开命令面板
2. 输入 "help" 查看帮助
3. 或访问 https://code.visualstudio.com/docs

祝编码愉快！🎮
