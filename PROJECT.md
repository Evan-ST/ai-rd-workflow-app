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
- ECharts CDN（数据仪表盘图表）
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
| **通知中心** | `notifications` | 统一站内信列表，聚合工具路由/标红/审批/会议通知，支持分类筛选 |
| **数据仪表盘** | `analytics` | ECharts 图表：项目状态、任务分布、部门工时、工作负载 |
| **甘特图** | `gantt` | 纯CSS实现的任务时间线可视化，按部门配色 |
| 项目列表 | `projects` | 项目卡片 + 创建项目（含权限控制） |
| 项目详情 | `project` | 8阶段导航 + 阶段内容（PRD/WBS/团队/会议等）+ 看板拖拽 |
| 我的任务 | `mytasks` | **跨项目任务汇总**视图，按项目分组，含统计卡片 |
| 每日上报 | `report` | 日报提交 + 历史 |
| 文件中心 | `files` | 文件列表 + 上传 |

### AI 工具系统

- 每个部门 5-6 个预置 AI 工具（`DEPT_CONFIG[].defaultTools`）
- **40+ 专属输出模板**（每个工具都有独立模板，涵盖所有部门）
- 用户可自定义添加工具（`customTools[]`，存 localStorage）
- 工具执行：输入 → `generateToolOutput()` → **打字机动画效果** → 输出
- **路由机制**：输出可指定接收人 → 接收人看到金色高亮通知 → 点击查看 → 标记已处理

### 关键方法（app.js methods）

| 类别 | 方法 |
|------|------|
| 流程推进 | `generatePRD()`, `submitPRD()`, `approvePRD()`, `assignPM()`, `generateWBS()`, `submitWBS()`, `confirmDeptTeam()`, `scheduleMeeting()`, `generateMeetingSummary()`, `confirmFinalPRD()` |
| AI工具 | `openTool()`, `runTool()`, `routeToolOutput()`, `markOutputRead()`, `addCustomTool()` |
| 任务管理 | `onRedToggle()`, `onTaskProgress()`, `onTaskStatusChange()`, `onDragStart()`, `onDrop()` |
| 通知中心 | `addSystemNotification()`, `markNotificationRead()`, `markAllNotificationsRead()`, `handleNotificationClick()` |
| 数据仪表盘 | `initDashboardCharts()`, `renderProjectStatusChart()`, `renderTaskDeptChart()`, `renderTaskStatusChart()`, `renderWorkloadChart()` |
| 甘特图 | `ganttBarStyle()`, `ganttDayLabels()` |
| 版本历史 | `savePRDVersion()`, `openVersionHistory()`, `computeVersionDiff()` |
| 导出 | `exportPRD()`, `exportWBS()`, `exportMeeting()`, `downloadFile()` |
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
- [x] 7 大部门 AI 工具箱（40+ 工具，每个有专属模板）
- [x] 工具输出路由 + 高亮通知
- [x] 自定义工具添加
- [x] 任务标红 + 通知工程师
- [x] 每日进度上报
- [x] 文件上传
- [x] GitHub Pages 部署
- [x] **消息通知中心** — 统一站内信列表，聚合工具路由/标红/审批/会议通知
- [x] **看板拖拽** — 任务在待办→进行中→已完成三列间拖拽（HTML5 Drag & Drop）
- [x] **甘特图可视化** — 纯CSS实现任务时间线，按部门配色
- [x] **数据仪表盘** — ECharts图表（项目状态饼图、任务分布、部门工时、工作负载）
- [x] **导出功能** — PRD/会议纪要导出TXT，WBS导出CSV
- [x] **历史版本** — PRD文档版本对比diff展示
- [x] **权限细化** — 不同角色只能看到和操作自己权限范围内的内容
- [x] **多项目并行** — 跨项目任务汇总视图，按项目分组
- [x] **移动端适配** — 汉堡菜单 + 响应式布局 + 触控友好
- [x] **AI工具增强** — 所有工具专属输出模板 + 打字机动画效果

## 待改进 / 可继续的方向

- [ ] 接入真实 AI API（如通义千问），替换模板生成
- [ ] 后端支持（用户认证、数据库持久化）
- [ ] 更丰富的甘特图交互（拖拽调整时间、依赖连线）
- [ ] 任务评论/讨论功能
- [ ] 看板列间拖拽排序（同列内排序）
- [ ] 数据仪表盘更多图表维度
- [ ] 方案展示页（`ai-rd-workflow/`）与应用关联
- [ ] PWA 支持（离线使用）

## 部署方式

```bash
cd /Users/openclaw/项目/ai-rd-workflow-app
# 修改代码后：
git add -A && git commit -m "描述" && git push
# GitHub Pages 约 30 秒后自动更新
```
