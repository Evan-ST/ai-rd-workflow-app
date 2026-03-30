const { createApp, computed, ref, watch, nextTick } = Vue;

// ========== 预定义用户 ==========
const USERS = [
  { id: 'pm1', name: '张明', role: 'product_manager', title: '产品经理', department: '产品部', deptKey: 'product', avatar: '👤' },
  { id: 'dept_mgr', name: '李总', role: 'dept_manager', title: '项目部经理', department: '项目部', deptKey: 'project', avatar: '👔' },
  { id: 'pm_wang', name: '王强', role: 'project_manager', title: '项目经理', department: '项目部', deptKey: 'project', avatar: '📊' },
  { id: 'pm_zhao', name: '赵刚', role: 'project_manager', title: '项目经理', department: '项目部', deptKey: 'project', avatar: '📋' },
  { id: 'hw_lead', name: '陈华', role: 'dept_lead', title: '硬件负责人', department: '硬件部', deptKey: 'hardware', avatar: '⚡' },
  { id: 'sw_lead', name: '刘洋', role: 'dept_lead', title: '软件负责人', department: '软件部', deptKey: 'software', avatar: '💻' },
  { id: 'st_lead', name: '周磊', role: 'dept_lead', title: '结构负责人', department: '结构部', deptKey: 'structure', avatar: '🔧' },
  { id: 'test_lead', name: '吴芳', role: 'dept_lead', title: '测试负责人', department: '测试部', deptKey: 'testing', avatar: '🧪' },
  { id: 'eng_lead', name: '郑伟', role: 'dept_lead', title: '工程部负责人', department: '工程部', deptKey: 'engineering', avatar: '🏭' },
  { id: 'qa_lead', name: '孙丽', role: 'dept_lead', title: '品质部负责人', department: '品质部', deptKey: 'quality', avatar: '✅' },
  { id: 'hw_eng1', name: '钱波', role: 'engineer', title: '硬件工程师', department: '硬件部', deptKey: 'hardware', specialty: '硬件工程师', avatar: '🔌' },
  { id: 'hw_eng2', name: '韩超', role: 'engineer', title: '硬件工程师', department: '硬件部', deptKey: 'hardware', specialty: '硬件工程师', avatar: '🔌' },
  { id: 'layout1', name: '冯达', role: 'engineer', title: 'Layout工程师', department: '硬件部', deptKey: 'hardware', specialty: 'Layout工程师', avatar: '📐' },
  { id: 'sw_eng1', name: '杨帆', role: 'engineer', title: '软件工程师', department: '软件部', deptKey: 'software', specialty: '软件工程师', avatar: '⌨️' },
  { id: 'sw_eng2', name: '徐涛', role: 'engineer', title: '软件工程师', department: '软件部', deptKey: 'software', specialty: '软件工程师', avatar: '⌨️' },
  { id: 'st_eng1', name: '何鑫', role: 'engineer', title: '结构工程师', department: '结构部', deptKey: 'structure', specialty: '结构工程师', avatar: '📏' },
  { id: 'st_eng2', name: '马军', role: 'engineer', title: '结构工程师', department: '结构部', deptKey: 'structure', specialty: '结构工程师', avatar: '📏' },
  { id: 'test_eng1', name: '曹静', role: 'engineer', title: '测试工程师', department: '测试部', deptKey: 'testing', specialty: '测试工程师', avatar: '🔍' },
  { id: 'test_eng2', name: '谢敏', role: 'engineer', title: '测试工程师', department: '测试部', deptKey: 'testing', specialty: '测试工程师', avatar: '🔍' },
  { id: 'eng_eng1', name: '邓辉', role: 'engineer', title: '工程师', department: '工程部', deptKey: 'engineering', specialty: '工程师', avatar: '⚙️' },
  { id: 'eng_eng2', name: '田勇', role: 'engineer', title: '工程师', department: '工程部', deptKey: 'engineering', specialty: '工程师', avatar: '⚙️' },
  { id: 'qa_eng1', name: '彭洁', role: 'engineer', title: '品质工程师', department: '品质部', deptKey: 'quality', specialty: '品质工程师', avatar: '📋' },
  { id: 'qa_eng2', name: '罗敏', role: 'engineer', title: '品质工程师', department: '品质部', deptKey: 'quality', specialty: '品质工程师', avatar: '📋' },
];

const STAGES = [
  { key: 'prd_draft', label: 'PRD编写' },
  { key: 'prd_review', label: 'PRD审核' },
  { key: 'pm_assign', label: '指派PM' },
  { key: 'wbs_generate', label: 'WBS分解' },
  { key: 'team_building', label: '团队组建' },
  { key: 'meeting', label: '项目评审' },
  { key: 'prd_confirm', label: 'PRD确认' },
  { key: 'started', label: '已启动' },
];

const STAGE_ORDER = STAGES.map(s => s.key);

const DEPARTMENTS = [
  { key: 'hardware', name: '硬件部', icon: '⚡', leadId: 'hw_lead', leadName: '陈华' },
  { key: 'software', name: '软件部', icon: '💻', leadId: 'sw_lead', leadName: '刘洋' },
  { key: 'structure', name: '结构部', icon: '🔧', leadId: 'st_lead', leadName: '周磊' },
  { key: 'testing', name: '测试部', icon: '🧪', leadId: 'test_lead', leadName: '吴芳' },
  { key: 'engineering', name: '工程部', icon: '🏭', leadId: 'eng_lead', leadName: '郑伟' },
  { key: 'quality', name: '品质部', icon: '✅', leadId: 'qa_lead', leadName: '孙丽' },
];

// ========== AI 文档生成模板 ==========
function generatePRDContent(name, description, type) {
  const date = new Date().toISOString().slice(0, 10);
  return `===================================================
    产品需求文档（PRD）
    ${name}
===================================================

【文档信息】
项目名称：${name}
产品类型：${type}
创建日期：${date}
文档版本：V1.0
状态：草稿

---

一、项目背景与目标

1.1 背景
${description}

当前市场对${type}产品需求持续增长，用户对产品智能化、可靠性和易用性的要求不断提高。本项目旨在打造新一代${name}，提升市场竞争力。

1.2 项目目标
• 完成${name}的全部功能开发和验证
• 产品通过相关行业标准认证
• 实现量产并达到目标成本控制
• 产品上市后6个月内达成预定销售目标

---

二、用户分析

2.1 目标用户
• 主要用户群体：终端消费者 / 行业客户
• 使用场景：日常使用、专业应用
• 用户痛点：现有产品智能化不足、操作复杂、可靠性待提升

2.2 用户需求优先级
[P0] 核心功能稳定可靠
[P0] 产品安全性满足行业标准
[P1] 智能化功能（AI辅助、远程控制）
[P1] 良好的用户交互体验
[P2] 外观设计美观、符合人体工程学
[P2] 支持OTA升级

---

三、功能需求

3.1 硬件功能需求
• 主控方案选型及电路设计
• 传感器模组集成
• 电源管理方案
• 通信模块（WiFi/BLE/4G可选）
• PCB Layout设计及优化

3.2 软件功能需求
• 嵌入式固件开发
• 设备端AI算法集成
• 通信协议栈开发
• OTA升级功能
• APP/小程序对接

3.3 结构设计需求
• 产品外壳ID设计
• 结构件建模及公差分析
• 防水防尘设计（IP等级）
• 散热方案设计
• 模具开发

3.4 测试需求
• 功能测试用例设计
• 可靠性测试（高低温、盐雾、振动）
• EMC测试
• 安规测试
• 用户体验测试

---

四、非功能需求

4.1 性能要求
• 响应时间 < 500ms
• 待机功耗 < 指定阈值
• 工作温度范围：-20°C ~ 60°C

4.2 质量要求
• 产品不良率 < 0.5%
• MTBF > 50,000小时

4.3 合规要求
• 满足CCC/CE/FCC等认证要求
• 满足RoHS/REACH环保要求

---

五、项目里程碑（初步）

M1：需求评审完成
M2：方案设计评审
M3：EVT样机完成
M4：DVT测试通过
M5：PVT试产
M6：量产导入

---

六、风险评估

| 风险项 | 等级 | 应对策略 |
|--------|------|----------|
| 关键物料供应 | 中 | 提前备料，备选方案 |
| 技术难点突破 | 高 | 预研验证，专家评审 |
| 进度延期 | 中 | 关键路径监控，预留缓冲 |
| 认证不通过 | 低 | 提前送检，预测试 |

---

[本文档由AI自动生成，请根据实际情况修改完善]`;
}

function generateWBSTasks(projectName, projectType) {
  let taskId = 0;
  const t = (name, dept, deptKey, hours, parentId) => ({
    id: 'task_' + (++taskId),
    name,
    department: dept,
    deptKey,
    estimatedHours: hours,
    parentId: parentId || null,
    assignee: '',
    status: 'pending',
    progress: 0,
    isRed: false,
  });

  const tasks = [];

  // 硬件
  const hw1 = t('硬件方案设计', '硬件部', 'hardware', 40, null); tasks.push(hw1);
  tasks.push(t('主控方案选型与评估', '硬件部', 'hardware', 16, hw1.id));
  tasks.push(t('原理图设计', '硬件部', 'hardware', 24, hw1.id));
  tasks.push(t('PCB Layout设计', '硬件部', 'hardware', 32, hw1.id));
  tasks.push(t('硬件调试与验证', '硬件部', 'hardware', 24, hw1.id));

  // 软件
  const sw1 = t('软件开发', '软件部', 'software', 60, null); tasks.push(sw1);
  tasks.push(t('嵌入式固件架构设计', '软件部', 'software', 16, sw1.id));
  tasks.push(t('驱动层开发', '软件部', 'software', 24, sw1.id));
  tasks.push(t('应用层功能开发', '软件部', 'software', 40, sw1.id));
  tasks.push(t('通信协议开发', '软件部', 'software', 20, sw1.id));

  // 结构
  const st1 = t('结构设计', '结构部', 'structure', 40, null); tasks.push(st1);
  tasks.push(t('ID外观设计', '结构部', 'structure', 16, st1.id));
  tasks.push(t('3D建模与仿真', '结构部', 'structure', 24, st1.id));
  tasks.push(t('模具评审与开模', '结构部', 'structure', 32, st1.id));

  // 测试
  const te1 = t('测试验证', '测试部', 'testing', 40, null); tasks.push(te1);
  tasks.push(t('测试方案与用例编写', '测试部', 'testing', 12, te1.id));
  tasks.push(t('功能测试', '测试部', 'testing', 16, te1.id));
  tasks.push(t('可靠性与环境测试', '测试部', 'testing', 24, te1.id));
  tasks.push(t('EMC/安规测试', '测试部', 'testing', 16, te1.id));

  // 工程
  const en1 = t('工程导入', '工程部', 'engineering', 30, null); tasks.push(en1);
  tasks.push(t('BOM整理与物料导入', '工程部', 'engineering', 12, en1.id));
  tasks.push(t('生产工艺制定', '工程部', 'engineering', 16, en1.id));
  tasks.push(t('试产与产线验证', '工程部', 'engineering', 20, en1.id));

  // 品质
  const qa1 = t('品质管控', '品质部', 'quality', 24, null); tasks.push(qa1);
  tasks.push(t('IQC来料检验标准', '品质部', 'quality', 8, qa1.id));
  tasks.push(t('制程品质管控方案', '品质部', 'quality', 10, qa1.id));
  tasks.push(t('OQC出货检验标准', '品质部', 'quality', 8, qa1.id));

  return tasks;
}

function generateMeetingSummaryContent(project) {
  const date = new Date().toISOString().slice(0, 10);
  const members = [];
  for (const dept of DEPARTMENTS) {
    for (const mid of (project.team[dept.key] || [])) {
      const u = USERS.find(u => u.id === mid);
      if (u) members.push(u.name);
    }
  }
  if (project.projectManager) {
    const pm = USERS.find(u => u.id === project.projectManager);
    if (pm) members.unshift(pm.name);
  }

  return `===================================================
    项目评审会议纪要
    ${project.name}
===================================================

【会议信息】
会议时间：${project.meeting.date} ${project.meeting.time}
会议地点：${project.meeting.room}
参会人员：${members.join('、')}
记录方式：AI自动记录

---

一、会议议题

本次会议对「${project.name}」项目进行了全面评审，重点讨论以下内容：
1. PRD需求完整性和可行性评审
2. 各部门任务分工确认
3. 项目关键风险和应对方案
4. 项目时间节点和里程碑确认

---

二、评审结论

2.1 需求评审
• PRD整体需求描述清晰，功能范围合理
• 建议补充：用户数据安全与隐私保护方案
• 建议增加：产品兼容性需求说明
• 软件部建议：增加API接口规范文档

2.2 技术方案
• 硬件方案总体可行，主控选型建议增加备选方案
• 软件架构设计合理，建议增加模块化设计说明
• 结构设计需考虑后期维护和可拆卸性

2.3 资源与排期
• 当前人力资源满足项目需求
• 建议关键路径增加1周缓冲时间
• 物料采购需提前2周启动

---

三、待修改事项（PRD修订）

【需要在PRD中新增/修改的内容】
1. 新增「数据安全与隐私保护」章节
2. 补充产品兼容性需求
3. 细化软件接口规范
4. 调整项目里程碑时间节点
5. 增加备选硬件方案描述

---

四、行动项

| 序号 | 行动项 | 负责人 | 截止日期 |
|------|--------|--------|----------|
| 1 | 更新PRD文档 | 产品经理 | +3工作日 |
| 2 | 硬件备选方案评估 | 硬件负责人 | +5工作日 |
| 3 | 软件接口文档输出 | 软件负责人 | +5工作日 |
| 4 | 物料清单初稿 | 工程部 | +7工作日 |

---

[本纪要由AI自动生成，请各位确认补充]`;
}

function generateRevisedPRD(originalContent, projectName) {
  const insertAfterSection5 = `
---

五-附、数据安全与隐私保护（会议新增）

5.1 数据安全要求
• 用户数据传输全程加密（TLS 1.3）
• 本地存储敏感数据加密
• 设备端不留存用户隐私数据

5.2 隐私保护
• 满足GDPR/个人信息保护法要求
• 提供用户数据导出和删除功能
• 隐私政策在用户首次使用时展示

---

五-附2、产品兼容性需求（会议新增）

• 兼容主流智能家居平台（米家/HomeKit/Alexa）
• 支持Android 10+ / iOS 14+ APP控制
• 向下兼容上一代产品的配件接口

---

五-附3、软件接口规范（会议新增）

• 设备与云端通信采用MQTT协议
• APP端通过RESTful API与云端交互
• 预留第三方接入SDK接口
`;

  let revised = originalContent.replace('文档版本：V1.0', '文档版本：V2.0（会议修订版）');
  revised = revised.replace('状态：草稿', '状态：会议修订');
  revised = revised.replace(
    '六、风险评估',
    insertAfterSection5 + '\n六、风险评估'
  );
  revised = revised.replace(
    'M1：需求评审完成',
    'M0：PRD确认与项目启动 ← 当前\nM1：需求评审完成（+1周缓冲）'
  );

  return revised;
}

// ========== Vue 应用 ==========
createApp({
  data() {
    return {
      view: 'login',
      currentUser: null,
      projects: [],
      currentProjectId: null,
      currentStage: 'prd_draft',
      editingPRD: false,

      showCreateModal: false,
      newProject: { name: '', description: '', type: '智能硬件' },

      showSubTaskModal: false,
      subTaskParentId: null,
      newSubTask: { name: '', hours: 8 },

      meetingDate: '',
      meetingTime: '14:00',
      meetingRoom: '',

      reportProjectId: '',
      reportTaskId: '',
      reportContent: '',
      reportProgress: 50,
      reports: [],

      allUploadedFiles: [],

      toast: { show: false, msg: '', type: 'success' },

      users: USERS,
      stages: STAGES,
      departments: DEPARTMENTS,
    };
  },

  computed: {
    today() {
      return new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });
    },

    projectManagers() {
      return this.users.filter(u => u.role === 'project_manager');
    },

    currentProject() {
      return this.projects.find(p => p.id === this.currentProjectId) || null;
    },

    topLevelTasks() {
      if (!this.currentProject) return [];
      return this.currentProject.wbs.filter(t => !t.parentId);
    },

    canOperateAsProjectManager() {
      if (!this.currentProject) return false;
      return this.currentUser.id === this.currentProject.projectManager ||
             this.currentUser.role === 'dept_manager';
    },

    allTeamsConfirmed() {
      if (!this.currentProject) return false;
      return Object.values(this.currentProject.teamConfirmed).every(v => v);
    },

    getAllProjectMembers() {
      if (!this.currentProject) return [];
      const ids = new Set();
      if (this.currentProject.createdBy) ids.add(this.currentProject.createdBy);
      if (this.currentProject.projectManager) ids.add(this.currentProject.projectManager);
      for (const dept of DEPARTMENTS) {
        ids.add(dept.leadId);
        for (const mid of (this.currentProject.team[dept.key] || [])) {
          ids.add(mid);
        }
      }
      return [...ids];
    },

    getAllProjectEngineers() {
      if (!this.currentProject) return [];
      const ids = [];
      for (const dept of DEPARTMENTS) {
        for (const mid of (this.currentProject.team[dept.key] || [])) {
          ids.push(mid);
        }
      }
      return ids;
    },

    inProgressTasks() {
      if (!this.currentProject) return 0;
      return this.currentProject.wbs.filter(t => t.status === 'in_progress').length;
    },
    completedTasks() {
      if (!this.currentProject) return 0;
      return this.currentProject.wbs.filter(t => t.status === 'completed').length;
    },
    redTasks() {
      if (!this.currentProject) return 0;
      return this.currentProject.wbs.filter(t => t.isRed).length;
    },

    startedProjects() {
      return this.projects.filter(p => p.status === 'started').length;
    },

    myRedCount() {
      let count = 0;
      for (const p of this.projects) {
        for (const t of p.wbs) {
          if (t.isRed && t.assignee === this.currentUser?.id) count++;
        }
      }
      return count;
    },

    myTasks() {
      const tasks = [];
      for (const p of this.projects) {
        for (const t of p.wbs) {
          if (t.assignee === this.currentUser?.id) {
            tasks.push({ task: t, projectId: p.id, projectName: p.name });
          }
        }
      }
      tasks.sort((a, b) => (b.task.isRed ? 1 : 0) - (a.task.isRed ? 1 : 0));
      return tasks;
    },

    myProjects() {
      return this.projects.filter(p => {
        if (p.status !== 'started') return false;
        return p.wbs.some(t => t.assignee === this.currentUser?.id);
      });
    },

    myReports() {
      return this.reports
        .filter(r => r.userId === this.currentUser?.id)
        .sort((a, b) => b.date.localeCompare(a.date));
    },

    allFiles() {
      return this.allUploadedFiles.sort((a, b) => b.date.localeCompare(a.date));
    },

    myPendingActions() {
      const actions = [];
      const u = this.currentUser;
      if (!u) return actions;

      for (const p of this.projects) {
        if (u.role === 'product_manager' && p.createdBy === u.id) {
          if (p.status === 'prd_draft' && !p.prd.content) {
            actions.push({ id: p.id + '_prd', type: 'generate', typeLabel: '生成', text: `${p.name}：生成PRD文档`, projectId: p.id, stage: 'prd_draft' });
          }
          if (p.status === 'prd_draft' && p.prd.content) {
            actions.push({ id: p.id + '_sub', type: 'confirm', typeLabel: '提交', text: `${p.name}：提交PRD审核`, projectId: p.id, stage: 'prd_draft' });
          }
          if (p.status === 'prd_confirm') {
            actions.push({ id: p.id + '_cfm', type: 'confirm', typeLabel: '确认', text: `${p.name}：确认修改后的PRD`, projectId: p.id, stage: 'prd_confirm' });
          }
        }

        if (u.role === 'dept_manager') {
          if (p.status === 'prd_review') {
            actions.push({ id: p.id + '_rv', type: 'review', typeLabel: '审核', text: `${p.name}：审核PRD`, projectId: p.id, stage: 'prd_review' });
          }
          if (p.status === 'pm_assign') {
            actions.push({ id: p.id + '_as', type: 'assign', typeLabel: '指派', text: `${p.name}：指派项目经理`, projectId: p.id, stage: 'pm_assign' });
          }
        }

        if (u.role === 'project_manager' && p.projectManager === u.id) {
          if (p.status === 'wbs_generate' && p.wbs.length === 0) {
            actions.push({ id: p.id + '_wbs', type: 'generate', typeLabel: '生成', text: `${p.name}：生成WBS任务分解`, projectId: p.id, stage: 'wbs_generate' });
          }
          if (p.status === 'wbs_generate' && p.wbs.length > 0) {
            actions.push({ id: p.id + '_dist', type: 'assign', typeLabel: '分发', text: `${p.name}：分发任务至各部门`, projectId: p.id, stage: 'wbs_generate' });
          }
          if (p.status === 'meeting' && !p.meeting.scheduled) {
            actions.push({ id: p.id + '_mt', type: 'assign', typeLabel: '预约', text: `${p.name}：预约评审会议`, projectId: p.id, stage: 'meeting' });
          }
        }

        if (u.role === 'dept_lead' && p.status === 'team_building') {
          const deptKey = u.deptKey;
          if (deptKey && !p.teamConfirmed[deptKey]) {
            actions.push({ id: p.id + '_team_' + deptKey, type: 'select', typeLabel: '选人', text: `${p.name}：选择${u.department}工程师`, projectId: p.id, stage: 'team_building' });
          }
        }

        if (u.role === 'engineer') {
          const redTasks = p.wbs.filter(t => t.isRed && t.assignee === u.id);
          for (const rt of redTasks) {
            actions.push({ id: rt.id + '_red', type: 'task', typeLabel: '紧急', text: `${p.name}：${rt.name}（标红任务）`, projectId: p.id, stage: 'started' });
          }
        }
      }
      return actions;
    },
  },

  methods: {
    // ----- Auth -----
    login(user) {
      this.currentUser = user;
      this.view = 'dashboard';
      this.showToast(`欢迎，${user.name}`, 'success');
    },

    // ----- Navigation -----
    goToAction(action) {
      this.openProject(action.projectId);
      this.currentStage = action.stage;
    },

    openProject(id) {
      this.currentProjectId = id;
      const p = this.projects.find(pp => pp.id === id);
      if (p) this.currentStage = p.status;
      this.editingPRD = false;
      this.view = 'project';
    },

    openCreateProject() {
      this.newProject = { name: '', description: '', type: '智能硬件' };
      this.showCreateModal = true;
    },

    // ----- Project CRUD -----
    createProject() {
      const p = {
        id: 'proj_' + Date.now(),
        name: this.newProject.name,
        description: this.newProject.description,
        type: this.newProject.type,
        status: 'prd_draft',
        createdBy: this.currentUser.id,
        createdAt: new Date().toISOString().slice(0, 10),
        projectManager: null,
        prd: { content: '', version: 1, confirmed: false },
        wbs: [],
        team: { hardware: [], software: [], structure: [], testing: [], engineering: [], quality: [] },
        teamConfirmed: { hardware: false, software: false, structure: false, testing: false, engineering: false, quality: false },
        meeting: { scheduled: false, date: null, time: null, room: null, summary: null },
        files: [],
      };
      this.projects.push(p);
      this.showCreateModal = false;
      this.saveProjects();
      this.showToast('项目创建成功', 'success');
      this.openProject(p.id);
    },

    // ----- Stage Operations -----
    generatePRD() {
      const p = this.currentProject;
      p.prd.content = generatePRDContent(p.name, p.description, p.type);
      this.saveProjects();
      this.showToast('AI 已生成PRD文档', 'info');
    },

    submitPRD() {
      this.currentProject.status = 'prd_review';
      this.currentStage = 'prd_review';
      this.saveProjects();
      this.showToast('PRD已提交审核', 'success');
    },

    approvePRD() {
      this.currentProject.status = 'pm_assign';
      this.currentStage = 'pm_assign';
      this.saveProjects();
      this.showToast('PRD审核通过', 'success');
    },

    assignPM() {
      this.currentProject.status = 'wbs_generate';
      this.currentStage = 'wbs_generate';
      this.saveProjects();
      this.showToast('项目经理已指派：' + this.getUserName(this.currentProject.projectManager), 'success');
    },

    generateWBS() {
      const p = this.currentProject;
      p.wbs = generateWBSTasks(p.name, p.type);
      this.saveProjects();
      this.showToast('AI 已生成WBS任务分解', 'info');
    },

    submitWBS() {
      this.currentProject.status = 'team_building';
      this.currentStage = 'team_building';
      this.saveProjects();
      this.showToast('任务已分发至各部门', 'success');
    },

    confirmDeptTeam(deptKey) {
      this.currentProject.teamConfirmed[deptKey] = true;
      this.saveProjects();
      const dept = DEPARTMENTS.find(d => d.key === deptKey);
      this.showToast(`${dept.name}人员已确认`, 'success');
    },

    completeTeamBuilding() {
      this.currentProject.status = 'meeting';
      this.currentStage = 'meeting';
      this.saveProjects();
      this.showToast('团队组建完成，请预约会议', 'success');
    },

    scheduleMeeting() {
      const p = this.currentProject;
      p.meeting.scheduled = true;
      p.meeting.date = this.meetingDate;
      p.meeting.time = this.meetingTime;
      p.meeting.room = this.meetingRoom;
      this.saveProjects();
      this.showToast('会议已预约成功', 'success');
    },

    generateMeetingSummary() {
      const p = this.currentProject;
      p.meeting.summary = generateMeetingSummaryContent(p);
      this.saveProjects();
      this.showToast('AI 已生成会议纪要', 'info');
    },

    advanceToConfirm() {
      const p = this.currentProject;
      p.prd.content = generateRevisedPRD(p.prd.content, p.name);
      p.prd.version = 2;
      p.status = 'prd_confirm';
      this.currentStage = 'prd_confirm';
      this.saveProjects();
      this.showToast('AI 已修改PRD，请产品经理确认', 'info');
    },

    confirmFinalPRD() {
      const p = this.currentProject;
      p.prd.confirmed = true;
      p.status = 'started';
      this.currentStage = 'started';
      this.saveProjects();
      this.showToast('🚀 项目正式启动！', 'success');
    },

    // ----- Sub Tasks -----
    addSubTask(parentTask) {
      this.subTaskParentId = parentTask.id;
      this.newSubTask = { name: '', hours: 8 };
      this.showSubTaskModal = true;
    },

    confirmAddSubTask() {
      if (!this.newSubTask.name) return;
      this.currentProject.wbs.push({
        id: 'task_' + Date.now(),
        name: this.newSubTask.name,
        department: this.currentProject.wbs.find(t => t.id === this.subTaskParentId)?.department || '',
        deptKey: this.currentProject.wbs.find(t => t.id === this.subTaskParentId)?.deptKey || '',
        estimatedHours: this.newSubTask.hours,
        parentId: this.subTaskParentId,
        assignee: '',
        status: 'pending',
        progress: 0,
        isRed: false,
      });
      this.showSubTaskModal = false;
      this.saveProjects();
    },

    getChildren(parentId) {
      if (!this.currentProject) return [];
      return this.currentProject.wbs.filter(t => t.parentId === parentId);
    },

    // ----- Team -----
    canSelectForDept(deptKey) {
      if (!this.currentProject || this.currentProject.status !== 'team_building') return false;
      if (this.currentProject.teamConfirmed[deptKey]) return false;
      const dept = DEPARTMENTS.find(d => d.key === deptKey);
      return this.currentUser.id === dept.leadId || this.currentUser.role === 'dept_manager';
    },

    getEngineersForDept(deptKey) {
      return this.users.filter(u => u.role === 'engineer' && u.deptKey === deptKey);
    },

    isTeamMember(deptKey, userId) {
      return this.currentProject.team[deptKey].includes(userId);
    },

    toggleTeamMember(deptKey, userId) {
      const arr = this.currentProject.team[deptKey];
      const idx = arr.indexOf(userId);
      if (idx >= 0) arr.splice(idx, 1);
      else arr.push(userId);
      this.saveProjects();
    },

    // ----- Task Red -----
    onRedToggle(task) {
      this.saveProjects();
      if (task.isRed && task.assignee) {
        const eng = this.getUserName(task.assignee);
        this.showToast(`任务已标红并抄送${eng}的主管`, 'warn');
      }
    },

    onTaskProgress(t) {
      if (t.task.progress >= 100) {
        t.task.status = 'completed';
        t.task.isRed = false;
      } else if (t.task.progress > 0) {
        t.task.status = 'in_progress';
      }
      this.saveProjects();
    },

    onTaskStatusChange(t) {
      if (t.task.status === 'completed') {
        t.task.progress = 100;
        t.task.isRed = false;
        this.showToast('任务已完成，标红取消', 'success');
      }
      this.saveProjects();
    },

    // ----- Reports -----
    myTasksForProject(projectId) {
      const p = this.projects.find(pp => pp.id === projectId);
      if (!p) return [];
      return p.wbs.filter(t => t.assignee === this.currentUser.id);
    },

    submitReport() {
      this.reports.push({
        id: 'rpt_' + Date.now(),
        userId: this.currentUser.id,
        projectId: this.reportProjectId,
        taskId: this.reportTaskId,
        content: this.reportContent,
        progress: this.reportProgress,
        date: new Date().toISOString().slice(0, 10),
      });
      if (this.reportTaskId && this.reportProjectId) {
        const p = this.projects.find(pp => pp.id === this.reportProjectId);
        if (p) {
          const task = p.wbs.find(t => t.id === this.reportTaskId);
          if (task) {
            task.progress = this.reportProgress;
            if (task.progress >= 100) { task.status = 'completed'; task.isRed = false; }
            else if (task.progress > 0) task.status = 'in_progress';
          }
        }
      }
      this.reportContent = '';
      this.saveAll();
      this.showToast('日报提交成功', 'success');
    },

    getProjectName(id) {
      return this.projects.find(p => p.id === id)?.name || '';
    },

    // ----- Files -----
    uploadFile(event, stage) {
      const files = event.target.files;
      for (const f of files) {
        const fileObj = {
          id: 'file_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
          name: f.name,
          size: f.size > 1048576 ? (f.size / 1048576).toFixed(1) + ' MB' : (f.size / 1024).toFixed(0) + ' KB',
          uploadedBy: this.currentUser.id,
          date: new Date().toISOString().slice(0, 10),
          stage: stage,
          projectId: this.currentProjectId || '',
        };
        this.allUploadedFiles.push(fileObj);
      }
      event.target.value = '';
      this.saveAll();
      this.showToast(`${files.length}个文件上传成功`, 'success');
    },

    getStageFiles(stage) {
      return this.allUploadedFiles.filter(f => f.stage === stage);
    },

    // ----- Helpers -----
    getUserName(id) {
      return this.users.find(u => u.id === id)?.name || '未知';
    },

    statusLabel(status) {
      const map = {
        prd_draft: 'PRD编写中', prd_review: 'PRD审核中', pm_assign: '指派PM',
        wbs_generate: 'WBS分解', team_building: '团队组建', meeting: '项目评审',
        prd_confirm: 'PRD确认', started: '已启动',
      };
      return map[status] || status;
    },

    stageProgress(project) {
      const idx = STAGE_ORDER.indexOf(project.status);
      return Math.round(((idx + 1) / STAGE_ORDER.length) * 100);
    },

    isStageCompleted(stageKey, project) {
      return STAGE_ORDER.indexOf(stageKey) < STAGE_ORDER.indexOf(project.status);
    },

    renderDoc(content) {
      if (!content) return '';
      return content
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '<br>');
    },

    showToast(msg, type = 'success') {
      this.toast = { show: true, msg, type };
      setTimeout(() => { this.toast.show = false; }, 2500);
    },

    // ----- Persistence -----
    saveProjects() {
      try { localStorage.setItem('ai_rd_projects', JSON.stringify(this.projects)); } catch(e) {}
    },
    saveAll() {
      this.saveProjects();
      try {
        localStorage.setItem('ai_rd_reports', JSON.stringify(this.reports));
        localStorage.setItem('ai_rd_files', JSON.stringify(this.allUploadedFiles));
      } catch(e) {}
    },
    loadData() {
      try {
        const p = localStorage.getItem('ai_rd_projects');
        if (p) this.projects = JSON.parse(p);
        const r = localStorage.getItem('ai_rd_reports');
        if (r) this.reports = JSON.parse(r);
        const f = localStorage.getItem('ai_rd_files');
        if (f) this.allUploadedFiles = JSON.parse(f);
      } catch(e) {}
    },
  },

  mounted() {
    this.loadData();
  },
}).mount('#app');
