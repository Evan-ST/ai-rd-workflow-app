# AI研发流程管理平台 — 项目上下文

> 新 Agent 接手时请先读此文件，快速了解项目全貌。

## 项目地址

- **GitHub**: https://github.com/Evan-ST/ai-rd-workflow-app
- **在线访问**: https://evan-st.github.io/ai-rd-workflow-app/
- **本地路径**: `/Users/openclaw/项目/ai-rd-workflow-app/`
- **方案展示页**（独立）: https://evan-st.github.io/ai-rd-workflow/ （路径 `/Users/openclaw/项目/ai-rd-workflow/`）

## 技术栈

- **纯前端 SPA**，无后端，数据存 localStorage
- Vue 3 CDN（`vue.global.prod.js`）
- 原生 CSS（无框架）
- 部署在 GitHub Pages（legacy 模式，push 即更新）

## 文件结构

```
ai-rd-workflow-app/
├── index.html   # HTML 模板（Vue 模板语法，所有视图）
├── style.css    # 全部样式
├── app.js       # Vue 应用逻辑（数据、方法、AI生成模板）
└── PROJECT.md   # 本文件
```

## 核心架构

### 数据模型（app.js 顶部）

| 常量 | 说明 |
|------|------|
| `DEPT_CONFIG` | 7大部门配置：产品部、项目部、硬件研发部、结构组、软件组、工程部、品质部。每个部门含角色列表和 AI 工具列表 |
| `USERS` | 30+ 预定义用户，按部门组织，含 id/name/role/title/department/deptKey/avatar |
| `STAGES` | 8 个工作流阶段：prd_draft → prd_review → pm_assign → wbs_generate → team_building → meeting → prd_confirm → started |
| `DEPARTMENTS` | 用于团队组建的 5 个研发部门（硬件、软件、结构、工程、品质） |

### 视图（index.html）

| 视图 | 路由 key | 说明 |
|------|----------|------|
| 登录页 | `login` | 按部门卡片分组展示角色 + AI工具预览 |
| 工作台 | `dashboard` | 统计卡片 + 工具通知（高亮） + 待办列表 |
| AI工具箱 | `toolbox` | 当前部门工具 + 其他部门工具 + 自定义添加 + 使用记录 |
| 项目列表 | `projects` | 项目卡片 + 创建项目 |
| 项目详情 | `project` | 8阶段导航 + 阶段内容（PRD/WBS/团队/会议等） |
| 我的任务 | `mytasks` | 工程师视角，标红任务高亮 |
| 每日上报 | `report` | 日报提交 + 历史 |
| 文件中心 | `files` | 文件列表 + 上传 |

### AI 工具系统

- 每个部门 5-6 个预置 AI 工具（`DEPT_CONFIG[].defaultTools`）
- 用户可自定义添加工具（`customTools[]`，存 localStorage）
- 工具执行：输入 → `generateToolOutput()` → 输出
- **路由机制**：输出可指定接收人 → 接收人看到金色高亮通知 → 点击查看 → 标记已处理

### 关键方法（app.js methods）

| 类别 | 方法 |
|------|------|
| 流程推进 | `generatePRD()`, `submitPRD()`, `approvePRD()`, `assignPM()`, `generateWBS()`, `submitWBS()`, `confirmDeptTeam()`, `scheduleMeeting()`, `generateMeetingSummary()`, `confirmFinalPRD()` |
| AI工具 | `openTool()`, `runTool()`, `routeToolOutput()`, `markOutputRead()`, `addCustomTool()` |
| 任务管理 | `onRedToggle()`, `onTaskProgress()`, `onTaskStatusChange()` |
| 持久化 | `saveProjects()`, `saveAll()`, `loadData()` — 使用 localStorage |

## 当前已完成

- [x] 登录页按 7 大部门分组
- [x] 30+ 角色覆盖所有部门岗位
- [x] 8 阶段完整工作流（PRD → 启动）
- [x] AI PRD 自动生成
- [x] AI WBS 任务分解
- [x] 团队组建（6部门负责人选人）
- [x] 一键预约会议
- [x] AI 会议纪要 + 自动修改 PRD
- [x] 7 大部门 AI 工具箱（40+ 工具）
- [x] 工具输出路由 + 高亮通知
- [x] 自定义工具添加
- [x] 任务标红 + 抄送主管
- [x] 每日进度上报
- [x] 文件上传
- [x] GitHub Pages 部署

## 待改进 / 可继续的方向

- [ ] AI 工具输出模板更丰富（目前只有几个有专属模板，其余用通用模板）
- [ ] 甘特图可视化（可引入 ECharts/D3）
- [ ] 工具输出支持编辑后再路由
- [ ] 角色权限更细化（目前靠 role 字段简单判断）
- [ ] 消息通知中心（汇总所有通知类型）
- [ ] 移动端适配优化
- [ ] 项目看板拖拽排序
- [ ] 多项目切换时的 WBS 甘特图
- [ ] 接入真实 AI API（替换模板生成）
- [ ] 后端支持（用户认证、数据库持久化）
- [ ] 方案展示页（`ai-rd-workflow/`）与应用关联

## 部署方式

```bash
cd /Users/openclaw/项目/ai-rd-workflow-app
# 修改代码后：
git add -A && git commit -m "描述" && git push
# GitHub Pages 约 30 秒后自动更新
```
