const { createApp } = Vue;

// ========== 部门配置（角色 + AI工具） ==========
const DEPT_CONFIG = [
  {
    key: 'product', name: '产品部', icon: '📦', color: '#c2410c',
    defaultTools: [
      { id: 'cost_calc', name: '成本核算工具', icon: '💰', description: '基于BOM清单和供应链数据，AI自动计算产品成本，含物料、人工、制造费用', placeholder: '请输入产品名称和主要物料信息...' },
      { id: 'material_query', name: '物料查询工具', icon: '🔍', description: '搜索物料数据库，查询元器件规格、库存、价格和替代方案', placeholder: '请输入物料名称/型号/规格...' },
      { id: 'market_research', name: '产品调研工具', icon: '📊', description: 'AI分析市场趋势、竞品信息、用户需求，生成调研报告', placeholder: '请输入产品品类和调研方向...' },
      { id: 'prd_gen', name: 'PRD生成工具', icon: '📄', description: '根据产品描述和需求要点，AI自动生成结构化PRD文档', placeholder: '请输入产品名称和核心需求要点...' },
      { id: 'competitor_analysis', name: '竞品分析工具', icon: '⚔️', description: 'AI抓取竞品信息，从功能、价格、市场表现等维度对比分析', placeholder: '请输入竞品名称或产品品类...' },
      { id: 'user_persona', name: '用户画像生成', icon: '👥', description: '基于目标市场数据，AI生成详细的用户画像和场景分析', placeholder: '请描述目标用户群体特征...' },
    ],
  },
  {
    key: 'project', name: '项目部', icon: '📋', color: '#166534',
    defaultTools: [
      { id: 'wbs_gen', name: 'WBS分解工具', icon: '📊', description: '基于PRD自动生成WBS任务分解，含工时估算和依赖关系', placeholder: '请输入项目名称和主要模块...' },
      { id: 'gantt_gen', name: '甘特图生成', icon: '📅', description: 'AI根据任务列表和依赖关系，自动生成项目甘特图', placeholder: '请输入任务列表和时间约束...' },
      { id: 'risk_assess', name: '风险评估工具', icon: '⚠️', description: 'AI识别项目风险点，评估影响等级，推荐应对策略', placeholder: '请描述项目概况和已知约束...' },
      { id: 'weekly_report', name: '项目周报生成', icon: '📝', description: '汇总本周进度数据，AI自动生成项目周报', placeholder: '请输入本周主要进展和问题...' },
      { id: 'meeting_summary', name: '会议纪要生成', icon: '🗣️', description: 'AI根据会议录音/笔记自动生成结构化会议纪要', placeholder: '请输入会议讨论内容要点...' },
      { id: 'resource_plan', name: '资源排期优化', icon: '🧮', description: 'AI分析团队人力和任务负载，优化资源排期方案', placeholder: '请输入可用人力和待排任务...' },
    ],
  },
  {
    key: 'hardware', name: '硬件研发部', icon: '⚡', color: '#2563eb',
    defaultTools: [
      { id: 'sch_review', name: '原理图审查', icon: '🔬', description: 'AI审查原理图设计，检测常见错误和优化建议', placeholder: '请描述电路功能和关键参数...' },
      { id: 'bom_analysis', name: 'BOM成本分析', icon: '💲', description: '分析BOM物料成本，推荐替代方案和降本策略', placeholder: '请输入BOM关键物料清单...' },
      { id: 'thermal_sim', name: '热仿真分析', icon: '🌡️', description: 'AI预估产品热分布，推荐散热方案', placeholder: '请描述主要发热器件和功耗...' },
      { id: 'pcb_drc', name: 'PCB规则检查', icon: '📐', description: 'AI检查PCB Layout设计规则，输出DRC报告', placeholder: '请描述PCB层数、线宽线距要求...' },
      { id: 'component_select', name: '元器件选型', icon: '🔌', description: 'AI推荐元器件方案，综合性能、成本、供货周期', placeholder: '请输入器件功能需求和约束...' },
      { id: 'signal_integrity', name: '信号完整性分析', icon: '📡', description: 'AI分析高速信号链路，预测SI/PI问题', placeholder: '请描述信号类型和速率...' },
    ],
  },
  {
    key: 'structure', name: '结构组', icon: '🔧', color: '#d97706',
    defaultTools: [
      { id: '3d_assist', name: '3D建模辅助', icon: '🎨', description: 'AI辅助生成3D模型草案和结构设计建议', placeholder: '请描述产品外形尺寸和结构要求...' },
      { id: 'tolerance_analysis', name: '公差分析工具', icon: '📏', description: 'AI分析装配公差链，预测装配良率', placeholder: '请输入关键尺寸和公差要求...' },
      { id: 'material_select', name: '材料选型推荐', icon: '🧱', description: '根据功能需求推荐最优材料方案', placeholder: '请描述使用环境和性能需求...' },
      { id: 'mold_review', name: '模具评审工具', icon: '🏭', description: 'AI审查模具设计方案，检查脱模角、壁厚等', placeholder: '请描述结构件类型和材料...' },
      { id: 'fea_analysis', name: '有限元分析', icon: '🔬', description: 'AI辅助FEA应力/变形分析，推荐优化方向', placeholder: '请描述受力条件和约束...' },
    ],
  },
  {
    key: 'software', name: '软件组', icon: '💻', color: '#7c3aed',
    defaultTools: [
      { id: 'code_review', name: '代码审查工具', icon: '🔍', description: 'AI自动审查代码质量，发现潜在Bug和优化空间', placeholder: '请粘贴代码片段或描述模块...' },
      { id: 'api_doc', name: 'API文档生成', icon: '📖', description: '根据接口定义自动生成API文档', placeholder: '请输入接口名称和参数说明...' },
      { id: 'test_gen', name: '自动化测试生成', icon: '🧪', description: 'AI根据功能描述自动生成测试用例', placeholder: '请描述需要测试的功能模块...' },
      { id: 'bug_diagnosis', name: 'Bug分析诊断', icon: '🐛', description: 'AI分析Bug现象，定位可能原因和修复建议', placeholder: '请描述Bug现象和复现步骤...' },
      { id: 'code_gen', name: '代码生成助手', icon: '⌨️', description: 'AI根据需求描述生成代码骨架', placeholder: '请描述功能需求和技术栈...' },
      { id: 'perf_analyzer', name: '性能分析工具', icon: '📈', description: 'AI分析性能瓶颈，推荐优化方案', placeholder: '请描述性能问题和系统配置...' },
    ],
  },
  {
    key: 'engineering', name: '工程部', icon: '🏭', color: '#059669',
    defaultTools: [
      { id: 'sop_gen', name: 'SOP文档生成', icon: '📋', description: 'AI根据工艺流程自动生成标准作业指导书', placeholder: '请描述产品工艺流程和关键工站...' },
      { id: 'process_optimize', name: '工艺流程优化', icon: '⚙️', description: 'AI分析产线数据，推荐工艺优化方案', placeholder: '请描述当前工艺流程和问题...' },
      { id: 'line_balance', name: '产线平衡分析', icon: '⚖️', description: 'AI优化产线各工站节拍，提升产线效率', placeholder: '请输入各工站工时数据...' },
      { id: 'yield_analysis', name: '良率分析工具', icon: '📊', description: 'AI分析不良数据，识别主要不良原因和改善方向', placeholder: '请输入不良数据和现象描述...' },
      { id: 'maintenance_pred', name: '设备维护预测', icon: '🔧', description: 'AI预测设备维护周期，预防非计划停机', placeholder: '请输入设备运行数据和维护历史...' },
    ],
  },
  {
    key: 'quality', name: '品质部', icon: '✅', color: '#4338ca',
    defaultTools: [
      { id: 'fmea_gen', name: 'FMEA分析工具', icon: '📊', description: 'AI辅助生成FMEA分析表，识别失效模式和风险', placeholder: '请描述产品/工艺功能和潜在失效...' },
      { id: 'spc_analysis', name: 'SPC统计分析', icon: '📈', description: 'AI分析SPC数据，判定过程能力和异常趋势', placeholder: '请输入检测数据或描述测量项...' },
      { id: '8d_report', name: '8D报告生成', icon: '📝', description: 'AI根据问题描述自动生成8D纠正报告', placeholder: '请描述问题现象和初步分析...' },
      { id: 'inspection_std', name: '检验标准生成', icon: '📏', description: 'AI生成IQC/IPQC/OQC检验标准文档', placeholder: '请描述产品类型和关键质量特性...' },
      { id: 'quality_trend', name: '质量趋势分析', icon: '📉', description: 'AI分析质量数据趋势，预测质量风险', placeholder: '请输入质量数据或描述关注项...' },
      { id: 'supplier_eval', name: '供应商评估', icon: '🏪', description: 'AI综合评估供应商质量、交期、价格表现', placeholder: '请输入供应商名称和评估维度...' },
    ],
  },
];

// ========== 用户列表（按部门组织） ==========
const USERS = [
  { id: 'prod_mgr', name: '王芳', role: 'dept_manager', title: '产品部经理', department: '产品部', deptKey: 'product', avatar: '👩‍💼' },
  { id: 'pm1', name: '张明', role: 'product_manager', title: '产品经理', department: '产品部', deptKey: 'product', avatar: '👤' },
  { id: 'graphic1', name: '林雪', role: 'engineer', title: '平面工程师', department: '产品部', deptKey: 'product', specialty: '平面工程师', avatar: '🎨' },
  { id: 'brand1', name: '黄涛', role: 'engineer', title: '品牌设计师', department: '产品部', deptKey: 'product', specialty: '品牌设计师', avatar: '✏️' },
  { id: 'dept_mgr', name: '李总', role: 'dept_manager', title: '项目部经理', department: '项目部', deptKey: 'project', avatar: '👔' },
  { id: 'pm_wang', name: '王强', role: 'project_manager', title: '项目经理', department: '项目部', deptKey: 'project', avatar: '📊' },
  { id: 'pm_zhao', name: '赵刚', role: 'project_manager', title: '项目经理', department: '项目部', deptKey: 'project', avatar: '📋' },
  { id: 'pm_assist', name: '小陈', role: 'engineer', title: '项目助理', department: '项目部', deptKey: 'project', specialty: '项目助理', avatar: '📎' },
  { id: 'hw_lead', name: '陈华', role: 'dept_lead', title: '硬件经理', department: '硬件研发部', deptKey: 'hardware', avatar: '⚡' },
  { id: 'hw_eng1', name: '钱波', role: 'engineer', title: '硬件工程师', department: '硬件研发部', deptKey: 'hardware', specialty: '硬件工程师', avatar: '🔌' },
  { id: 'hw_eng2', name: '韩超', role: 'engineer', title: '硬件工程师', department: '硬件研发部', deptKey: 'hardware', specialty: '硬件工程师', avatar: '🔌' },
  { id: 'hw_test1', name: '宋磊', role: 'engineer', title: '硬件测试工程师', department: '硬件研发部', deptKey: 'hardware', specialty: '硬件测试工程师', avatar: '🧪' },
  { id: 'layout1', name: '冯达', role: 'engineer', title: 'Layout工程师', department: '硬件研发部', deptKey: 'hardware', specialty: 'Layout工程师', avatar: '📐' },
  { id: 'rf_eng1', name: '唐峰', role: 'engineer', title: '射频工程师', department: '硬件研发部', deptKey: 'hardware', specialty: '射频工程师', avatar: '📡' },
  { id: 'optics1', name: '蒋明', role: 'engineer', title: '光学工程师', department: '硬件研发部', deptKey: 'hardware', specialty: '光学工程师', avatar: '🔭' },
  { id: 'st_lead', name: '周磊', role: 'dept_lead', title: '结构经理', department: '结构组', deptKey: 'structure', avatar: '🔧' },
  { id: 'st_eng1', name: '何鑫', role: 'engineer', title: '结构工程师', department: '结构组', deptKey: 'structure', specialty: '结构工程师', avatar: '📏' },
  { id: 'st_eng2', name: '马军', role: 'engineer', title: '结构工程师', department: '结构组', deptKey: 'structure', specialty: '结构工程师', avatar: '📏' },
  { id: 'sw_lead', name: '刘洋', role: 'dept_lead', title: '软件经理', department: '软件组', deptKey: 'software', avatar: '💻' },
  { id: 'sw_eng1', name: '杨帆', role: 'engineer', title: '软件工程师', department: '软件组', deptKey: 'software', specialty: '软件工程师', avatar: '⌨️' },
  { id: 'sw_eng2', name: '徐涛', role: 'engineer', title: '软件工程师', department: '软件组', deptKey: 'software', specialty: '软件工程师', avatar: '⌨️' },
  { id: 'sw_test1', name: '曹静', role: 'engineer', title: '软件研发测试工程师', department: '软件组', deptKey: 'software', specialty: '软件测试工程师', avatar: '🔍' },
  { id: 'eng_lead', name: '郑伟', role: 'dept_lead', title: '工程部经理', department: '工程部', deptKey: 'engineering', avatar: '🏭' },
  { id: 'npi_eng1', name: '邓辉', role: 'engineer', title: 'NPI工程师', department: '工程部', deptKey: 'engineering', specialty: 'NPI工程师', avatar: '⚙️' },
  { id: 'process_eng1', name: '田勇', role: 'engineer', title: '工艺工程师', department: '工程部', deptKey: 'engineering', specialty: '工艺工程师', avatar: '🔩' },
  { id: 'prod_eng1', name: '吕亮', role: 'engineer', title: '生产工程师', department: '工程部', deptKey: 'engineering', specialty: '生产工程师', avatar: '🏭' },
  { id: 'qa_lead', name: '孙丽', role: 'dept_lead', title: '品质经理', department: '品质部', deptKey: 'quality', avatar: '✅' },
  { id: 'qa_eng1', name: '彭洁', role: 'engineer', title: '品质工程师', department: '品质部', deptKey: 'quality', specialty: '品质工程师', avatar: '📋' },
  { id: 'qa_eng2', name: '罗敏', role: 'engineer', title: '品质工程师', department: '品质部', deptKey: 'quality', specialty: '品质工程师', avatar: '📋' },
  { id: 'rel_eng1', name: '谢敏', role: 'engineer', title: '可靠性工程师', department: '品质部', deptKey: 'quality', specialty: '可靠性工程师', avatar: '🔬' },
];

const STAGES = [
  { key: 'prd_draft', label: 'PRD编写' }, { key: 'prd_review', label: 'PRD审核' },
  { key: 'pm_assign', label: '指派PM' }, { key: 'wbs_generate', label: 'WBS分解' },
  { key: 'team_building', label: '团队组建' }, { key: 'meeting', label: '项目评审' },
  { key: 'prd_confirm', label: 'PRD确认' }, { key: 'started', label: '已启动' },
];
const STAGE_ORDER = STAGES.map(s => s.key);

const DEPARTMENTS = [
  { key: 'hardware', name: '硬件研发部', icon: '⚡', leadId: 'hw_lead', leadName: '陈华' },
  { key: 'software', name: '软件组', icon: '💻', leadId: 'sw_lead', leadName: '刘洋' },
  { key: 'structure', name: '结构组', icon: '🔧', leadId: 'st_lead', leadName: '周磊' },
  { key: 'engineering', name: '工程部', icon: '🏭', leadId: 'eng_lead', leadName: '郑伟' },
  { key: 'quality', name: '品质部', icon: '✅', leadId: 'qa_lead', leadName: '孙丽' },
];

// ========== AI 工具输出模板 ==========
function generateToolOutput(tool, input) {
  const date = new Date().toISOString().slice(0, 10);
  const templates = {
    cost_calc: `【成本核算报告】\n生成日期：${date}\n\n一、物料成本\n根据输入信息分析：\n${input}\n\n预估物料成本：¥45.80/pcs\n- 主控芯片：¥12.50\n- 传感器模组：¥8.20\n- 通信模块：¥6.80\n- PCB板：¥3.50\n- 被动器件：¥5.30\n- 结构件：¥6.50\n- 包材：¥3.00\n\n二、制造费用\n- SMT加工：¥2.80/pcs\n- 组装人工：¥3.50/pcs\n- 测试费用：¥1.20/pcs\n\n三、总成本预估\n单台成本：¥53.30\n建议零售价：¥199 (毛利率73.2%)\n\n[AI自动生成，请结合实际数据核实]`,
    material_query: `【物料查询结果】\n查询日期：${date}\n查询条件：${input}\n\n找到 5 条匹配结果：\n\n1. STM32F407VGT6\n   厂商：ST | 封装：LQFP-100 | 库存：2,500pcs\n   单价：¥18.50 | 交期：4周\n\n2. ESP32-S3-WROOM-1\n   厂商：Espressif | 封装：模组 | 库存：5,000pcs\n   单价：¥12.80 | 交期：2周\n\n3. nRF52840\n   厂商：Nordic | 封装：QFN-73 | 库存：1,200pcs\n   单价：¥22.00 | 交期：6周\n\n[数据来自物料数据库，实时价格请与采购确认]`,
    market_research: `【产品调研报告】\n生成日期：${date}\n\n调研方向：${input}\n\n一、市场规模\n- 2025年全球市场规模约$XX亿\n- 预计2026年增长率15%+\n- 中国市场占比约35%\n\n二、竞品分析\n- 品牌A：市场份额25%，主打高端\n- 品牌B：市场份额18%，性价比路线\n- 品牌C：市场份额12%，技术领先\n\n三、用户需求TOP5\n1. 操作简便 (85%提及)\n2. 稳定可靠 (78%)\n3. 智能化 (72%)\n4. 性价比 (65%)\n5. 外观设计 (58%)\n\n四、机会点\n- AI功能集成度低，存在差异化空间\n- 中端市场竞争相对较少\n\n[AI分析结果，建议结合一手调研数据验证]`,
    prd_gen: `【PRD文档草案】\n生成日期：${date}\n\n产品概述：${input}\n\n一、核心功能\n1. 主控制功能 — 设备核心控制逻辑\n2. 传感采集 — 多维度数据实时采集\n3. 智能分析 — AI算法辅助决策\n4. 远程控制 — APP/小程序远程操控\n5. OTA升级 — 固件远程更新\n\n二、性能指标\n- 响应时延：<200ms\n- 连续工作：>24h\n- 待机功耗：<50mW\n\n三、兼容性\n- 支持 iOS 14+ / Android 10+\n- 兼容主流智能家居平台\n\n[AI草案，请产品经理补充完善]`,
    competitor_analysis: `【竞品分析报告】\n生成日期：${date}\n\n分析对象：${input}\n\n┌──────────┬──────────┬──────────┬──────────┐\n│ 维度     │ 竞品A    │ 竞品B    │ 我方     │\n├──────────┼──────────┼──────────┼──────────┤\n│ 价格     │ ¥299     │ ¥199     │ ¥249     │\n│ 功能数   │ 12项     │ 8项      │ 15项     │\n│ AI能力   │ 基础     │ 无       │ 高级     │\n│ 续航     │ 7天      │ 5天      │ 10天     │\n│ 口碑     │ 4.2/5    │ 3.8/5    │ —        │\n└──────────┴──────────┴──────────┴──────────┘\n\n核心优势：AI能力、续航表现\n需关注：价格敏感度、品牌认知\n\n[AI分析，数据需验证]`,
    user_persona: `【用户画像报告】\n生成日期：${date}\n\n目标群体：${input}\n\n画像一：技术爱好者「小张」\n- 年龄：25-35岁 | 一线城市\n- 收入：15-25K/月\n- 特征：追求新技术、愿意尝鲜\n- 痛点：现有产品智能化不足\n- 场景：居家自动化控制\n\n画像二：品质家庭用户「王姐」\n- 年龄：30-45岁 | 二三线城市\n- 收入：10-20K/月\n- 特征：注重实用性和稳定性\n- 痛点：操作复杂、售后不便\n- 场景：家庭安全与便利\n\n[AI生成画像，建议结合用户访谈验证]`,
    sch_review: `【原理图审查报告】\n审查日期：${date}\n\n审查范围：${input}\n\n发现问题 3 项：\n\n[严重] 1. 电源去耦电容不足\n  位置：U1供电引脚\n  建议：在VDD引脚增加100nF+10uF去耦电容\n\n[警告] 2. 未使用引脚未做处理\n  位置：MCU GPIO_PA5, PA6\n  建议：通过电阻下拉或上拉处理\n\n[建议] 3. ESD防护缺失\n  位置：USB接口\n  建议：增加TVS保护二极管\n\n审查通过率：87%\n建议修改后重新审查\n\n[AI审查结果，请资深工程师复核]`,
    bom_analysis: `【BOM成本分析报告】\n分析日期：${date}\n\n分析内容：${input}\n\n一、成本构成\n物料总成本：¥42.30/pcs\n├ 主动器件（IC）：¥18.50（43.7%）\n├ 被动器件（R/C/L）：¥3.20（7.6%）\n├ 连接器：¥4.80（11.3%）\n├ 模组：¥12.80（30.3%）\n└ 其他：¥3.00（7.1%）\n\n二、降本建议\n1. 主控替换为国产平替，可降¥3.50/pcs\n2. 合并阻容封装规格，减少种类数\n3. 批量采购通信模组，预计降8%\n\n预估降本空间：¥5.20/pcs (12.3%)\n\n[AI分析，请采购确认供应商报价]`,
    thermal_sim: `【热仿真分析报告】\n分析日期：${date}\n\n分析条件：${input}\n\n一、温度分布\n- 主控芯片：68°C（限值85°C）✅\n- 电源IC：72°C（限值125°C）✅\n- PA模块：81°C（限值95°C）⚠️\n- PCB最高温：65°C\n\n二、散热建议\n1. PA模块需增加散热铜箔面积（≥400mm²）\n2. 建议在主控上方开散热孔\n3. 考虑增加导热硅胶垫\n\n热安全余量：14°C（建议≥20°C）\n\n[AI仿真预估，请用实际样机验证]`,
    pcb_drc: `【PCB DRC检查报告】\n检查日期：${date}\n\n检查内容：${input}\n\n错误：0项 | 警告：3项 | 建议：5项\n\n[警告] W1. 线距不足\n  层：TOP | 位置：U1-Pin32附近\n  当前：4mil | 要求：≥5mil\n\n[警告] W2. 过孔到焊盘距离\n  层：BOTTOM | 位置：J3区域\n  当前：6mil | 建议：≥8mil\n\n[警告] W3. 铜箔开窗重叠\n  层：GND | 位置：BGA扇出区\n\n[建议] 高速信号线建议加保护地\n[建议] 电源平面分割需优化\n\n[AI DRC检查，请Layout工程师复核]`,
    component_select: `【元器件选型推荐】\n生成日期：${date}\n\n需求描述：${input}\n\n推荐方案对比：\n\n方案A（推荐）：ESP32-S3\n  优势：高性价比、丰富生态、AI加速器\n  单价：¥12.80 | 供货：稳定\n  风险：低\n\n方案B：STM32H7 + 外置WiFi\n  优势：性能强劲、工具链成熟\n  单价：¥28.50 | 供货：稳定\n  风险：成本较高\n\n方案C：RTL8720DN\n  优势：双频WiFi、BLE5.0\n  单价：¥15.00 | 供货：一般\n  风险：交期不稳定\n\n综合推荐：方案A\n\n[AI选型建议，请硬件工程师评估]`,
    signal_integrity: `【信号完整性分析报告】\n分析日期：${date}\n\n分析条件：${input}\n\n一、时域分析\n- 上升时间：0.8ns（满足要求）\n- 过冲：12%（限值15%）✅\n- 下冲：-8%（限值-10%）✅\n- 振铃：3个周期内收敛 ✅\n\n二、串扰分析\n- 近端串扰(NEXT)：-38dB ✅\n- 远端串扰(FEXT)：-42dB ✅\n\n三、建议\n1. DDR信号建议等长匹配在±50mil内\n2. USB差分对间距保持5mil\n3. 高速时钟需包地处理\n\n[AI预分析，建议用仿真工具验证]`,
    code_review: `【代码审查报告】\n审查日期：${date}\n\n审查范围：${input}\n\n一、代码质量评分：78/100\n\n二、发现问题 5 项：\n\n[严重] 1. 内存泄漏风险\n  位置：data_handler.c:L142\n  问题：malloc后异常路径未释放\n  建议：添加goto cleanup模式\n\n[中等] 2. 缓冲区溢出隐患\n  位置：protocol.c:L89\n  问题：memcpy未检查源长度\n  建议：添加长度校验\n\n[中等] 3. 魔法数字\n  多处硬编码数字，建议使用宏定义\n\n[轻微] 4. 函数过长（>100行）\n  建议拆分为子函数\n\n[轻微] 5. 注释缺失\n  核心接口缺少文档注释\n\n[AI审查，请团队review确认]`,
    api_doc: `【API接口文档】\n生成日期：${date}\n\n接口描述：${input}\n\n━━━━━━━━━━━━━━━━━━━━━━━━\nPOST /api/v1/device/control\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n功能：设备控制指令下发\n\n请求参数：\n{\n  "device_id": "string (必填)",\n  "command": "string (必填)",\n  "params": "object (可选)"\n}\n\n响应示例：\n{\n  "code": 200,\n  "data": {\n    "task_id": "ctrl_20260330_001",\n    "status": "executing"\n  }\n}\n\n错误码：\n- 400：参数错误\n- 404：设备不存在\n- 503：设备离线\n\n[AI生成文档，请开发确认接口规范]`,
    test_gen: `【自动化测试用例】\n生成日期：${date}\n\n测试对象：${input}\n\n┌────┬──────────────────────┬──────┬──────┐\n│ ID │ 测试用例             │ 优先级│ 类型 │\n├────┼──────────────────────┼──────┼──────┤\n│ T01│ 正常功能启动         │ P0   │ 冒烟 │\n│ T02│ 边界值输入测试       │ P0   │ 功能 │\n│ T03│ 异常输入处理         │ P1   │ 异常 │\n│ T04│ 并发请求压力测试     │ P1   │ 性能 │\n│ T05│ 断网恢复测试         │ P1   │ 鲁棒 │\n│ T06│ 长时间运行稳定性     │ P2   │ 稳定 │\n│ T07│ 兼容性验证           │ P2   │ 兼容 │\n└────┴──────────────────────┴──────┴──────┘\n\n共 7 条用例，覆盖率预估：85%\n\n[AI生成，请测试工程师补充完善]`,
    bug_diagnosis: `【Bug诊断报告】\n诊断日期：${date}\n\n问题描述：${input}\n\n一、根因分析\n可能原因排序：\n1. [概率70%] 竞态条件 — 多线程访问共享资源未加锁\n2. [概率20%] 栈溢出 — 递归深度过大或局部变量过多\n3. [概率10%] 硬件异常 — 电源纹波导致误触发\n\n二、定位建议\n1. 在关键代码段添加日志打印\n2. 使用GDB设置watchpoint监控变量\n3. 检查线程间同步机制\n\n三、修复方案\n- 添加互斥锁保护共享数据\n- 增加异常捕获和恢复机制\n- 添加看门狗保底重启\n\n[AI诊断，请结合实际调试验证]`,
    code_gen: `【代码骨架生成】\n生成日期：${date}\n\n需求描述：${input}\n\n// ===== 模块头文件 =====\n#ifndef MODULE_H\n#define MODULE_H\n\ntypedef struct {\n    uint32_t id;\n    uint8_t  status;\n    void    *data;\n} module_ctx_t;\n\nint module_init(module_ctx_t *ctx);\nint module_process(module_ctx_t *ctx, const uint8_t *input, size_t len);\nint module_deinit(module_ctx_t *ctx);\n\n#endif\n\n// ===== 模块实现 =====\n#include "module.h"\n\nint module_init(module_ctx_t *ctx) {\n    // TODO: 初始化逻辑\n    return 0;\n}\n\nint module_process(module_ctx_t *ctx, const uint8_t *input, size_t len) {\n    // TODO: 核心处理逻辑\n    return 0;\n}\n\n[AI生成骨架，请开发补充业务逻辑]`,
    perf_analyzer: `【性能分析报告】\n分析日期：${date}\n\n分析对象：${input}\n\n一、瓶颈定位\n1. CPU占用峰值：87%（热点：数据处理循环）\n2. 内存峰值：68MB（碎片率：15%）\n3. I/O等待：平均23ms（目标<10ms）\n\n二、优化建议\n┌──────────────────┬──────┬──────────┐\n│ 优化项           │ 收益 │ 难度     │\n├──────────────────┼──────┼──────────┤\n│ 算法优化O(n²→nlogn)│ 高 │ 中       │\n│ 内存池替换malloc │ 中   │ 低       │\n│ DMA替换CPU搬运   │ 高   │ 中       │\n│ 异步I/O          │ 中   │ 高       │\n└──────────────────┴──────┴──────────┘\n\n预估整体提升：40-60%\n\n[AI分析，请用profiling工具验证]`,
    fmea_gen: `【FMEA分析报告】\n生成日期：${date}\n分析对象：${input}\n\n| 序号 | 失效模式 | 失效影响 | 严重度S | 发生度O | 检测度D | RPN | 建议措施 |\n|------|----------|----------|---------|---------|---------|-----|----------|\n| 1 | 主板短路 | 产品无法工作 | 9 | 3 | 4 | 108 | 增加ICT测试 |\n| 2 | 固件崩溃 | 功能异常 | 7 | 4 | 5 | 140 | 增加看门狗+OTA |\n| 3 | 外壳变形 | 外观不良 | 5 | 3 | 3 | 45 | 优化模具冷却 |\n| 4 | 电池膨胀 | 安全隐患 | 10 | 2 | 4 | 80 | 增加电池管理IC |\n| 5 | 信号丢失 | 通信中断 | 7 | 3 | 5 | 105 | 增加重连机制 |\n| 6 | 传感器漂移 | 数据不准 | 6 | 4 | 4 | 96 | 定期校准+补偿 |\n\n高风险项（RPN>100）需优先改善\n\n[AI生成，请品质团队评审确认]`,
    spc_analysis: `【SPC统计分析报告】\n分析日期：${date}\n\n分析项目：${input}\n\n一、过程能力\n- Cp = 1.45（≥1.33 ✅）\n- Cpk = 1.32（≥1.33 ⚠️ 略偏）\n- 均值偏移：+0.8σ\n\n二、控制图判定\n- X-bar图：无超控制限 ✅\n- R图：第15点接近UCL ⚠️\n- 无连续7点趋势 ✅\n- 无连续8点在中线同侧 ✅\n\n三、建议\n1. Cpk略低，需调整过程中心\n2. 关注R图第15点异常，排查根因\n3. 建议增加抽样频次至每2小时\n\n[AI统计分析，请品质工程师确认]`,
    '8d_report': `【8D纠正报告】\n报告编号：8D-${Date.now().toString(36).toUpperCase()}\n日期：${date}\n\nD0 问题描述：${input}\n\nD1 团队组建\n组长：品质经理 | 成员：品质工程师、工艺工程师、硬件工程师\n\nD2 问题定义\n发生频率：约2%不良率\n影响范围：近2周生产批次\n\nD3 临时措施\n- 隔离库存疑似品\n- 加严OQC抽样比例至200%\n\nD4 根本原因\n- 直接原因：焊接温度偏高\n- 根本原因：回流焊温度曲线未定期校验\n\nD5 永久纠正措施\n- 修订温度曲线，增加校验频次\n- 增加首件确认流程\n\nD6 验证\n- 后续3批次验证，不良率降至0.1%\n\nD7 预防措施\n- 将温度校验纳入PM计划\n- 更新作业指导书\n\nD8 总结\n问题已关闭，纳入经验库\n\n[AI生成8D模板，请团队补充实际数据]`,
    inspection_std: `【检验标准文档】\n文档编号：QC-STD-${Date.now().toString(36).toUpperCase()}\n生成日期：${date}\n\n产品描述：${input}\n\n一、IQC来料检验\n┌──────────────┬──────────┬──────────┬─────┐\n│ 检验项       │ 标准     │ 方法     │ AQL │\n├──────────────┼──────────┼──────────┼─────┤\n│ 外观         │ 无破损   │ 目视     │ 0.65│\n│ 尺寸         │ ±0.1mm  │ 卡尺     │ 1.0 │\n│ 电气性能     │ 规格书   │ 万用表   │ 0.4 │\n│ 可焊性       │ ≥95%    │ 沾锡试验 │ 1.0 │\n└──────────────┴──────────┴──────────┴─────┘\n\n二、IPQC制程检验\n- 每2小时巡检一次\n- 首件确认必检项：功能+外观+关键尺寸\n\n三、OQC出货检验\n- 抽样方案：GB/T 2828.1 Level II\n- 必检：功能测试、外观、包装\n\n[AI生成标准模板，请品质部定制完善]`,
    quality_trend: `【质量趋势分析报告】\n分析日期：${date}\n\n分析内容：${input}\n\n一、不良率趋势（近4周）\n  W1: 1.8% → W2: 1.5% → W3: 2.1% ⚠️ → W4: 1.2% ✅\n  趋势：W3异常后已恢复\n\n二、TOP3不良项\n  1. 焊接不良 — 35%（下降趋势）\n  2. 功能异常 — 28%（持平）\n  3. 外观缺陷 — 18%（上升趋势 ⚠️）\n\n三、预测\n  下周预估不良率：1.0-1.4%\n  关注：外观缺陷呈上升趋势\n\n四、建议\n  1. 针对外观缺陷增加工站照明\n  2. 焊接不良持续改善效果良好\n  3. 建议开展功能异常专项分析\n\n[AI趋势分析，数据需品质确认]`,
    supplier_eval: `【供应商评估报告】\n评估日期：${date}\n\n评估对象：${input}\n\n综合评分：78/100（B级·合格）\n\n┌──────────┬──────┬──────┬──────────────────┐\n│ 维度     │ 权重 │ 得分 │ 说明             │\n├──────────┼──────┼──────┼──────────────────┤\n│ 质量     │ 35%  │ 82分 │ 来料合格率98.5%  │\n│ 交期     │ 25%  │ 70分 │ 准时交付率88%    │\n│ 价格     │ 20%  │ 85分 │ 市场竞争力强     │\n│ 服务     │ 10%  │ 75分 │ 响应速度一般     │\n│ 技术     │ 10%  │ 68分 │ 研发能力待提升   │\n└──────────┴──────┴──────┴──────────────────┘\n\n改善建议：\n- 交期需提升至95%准时率\n- 建议增加备选供应商\n\n[AI评估，请采购和品质确认]`,
    sop_gen: `【标准作业指导书 SOP】\n文档编号：SOP-${Date.now().toString(36).toUpperCase()}\n生成日期：${date}\n\n工艺描述：${input}\n\n一、目的\n规范产线作业流程，确保产品质量一致性\n\n二、适用范围\n适用于XXX产品的SMT贴片和组装工站\n\n三、作业步骤\n\n工站1：来料检验\n  ① 核对物料编码与BOM一致\n  ② 检查外观无破损\n  ③ 记录批次号\n\n工站2：SMT上料\n  ① 确认钢网与PCB型号匹配\n  ② 锡膏厚度检测（目标150±30μm）\n  ③ 首件确认\n\n工站3：回流焊接\n  ① 温度曲线确认\n  ② 每2小时检测一次焊接质量\n\n工站4：功能测试\n  ① 连接测试治具\n  ② 执行自动化测试脚本\n  ③ 记录测试结果\n\n[AI生成SOP模板，请工程部根据实际工艺完善]`,
    process_optimize: `【工艺优化建议报告】\n生成日期：${date}\n\n当前工艺：${input}\n\n一、分析发现\n- 瓶颈工站：功能测试（CT=45s，最长）\n- 等待浪费：SMT→回流焊间等待约15min\n- 不良热点：焊接工站（占总不良65%）\n\n二、优化方案\n1. 测试工站增加并行治具（CT降至25s）\n2. 增加缓冲线体减少等待\n3. 优化回流焊温度曲线\n\n预期效果：产能提升30%，不良率降50%\n\n[AI分析，请工艺工程师评估可行性]`,
    line_balance: `【产线平衡分析报告】\n分析日期：${date}\n\n分析数据：${input}\n\n当前产线平衡率：72%\n\n工站分布（CT单位：秒）：\n  上料：25s ▇▇▇▇▇░░░░░\n  贴片：38s ▇▇▇▇▇▇▇▇░░\n  焊接：30s ▇▇▇▇▇▇░░░░\n  测试：45s ▇▇▇▇▇▇▇▇▇░ ← 瓶颈\n  包装：20s ▇▇▇▇░░░░░░\n\n优化后预估平衡率：89%\n建议：测试工站增加一个工位\n\n[AI分析，请IE工程师核实]`,
    yield_analysis: `【良率分析报告】\n分析日期：${date}\n\n分析内容：${input}\n\n一、整体良率\n  直通良率：96.2%（目标98%）⚠️\n  最终良率：98.8%（含返工）\n\n二、不良Pareto\n  1. 焊接不良 — 42%\n  2. 功能失效 — 25%\n  3. 外观缺陷 — 18%\n  4. 尺寸超差 — 10%\n  5. 其他 — 5%\n\n三、焊接不良细分\n  - 虚焊：55%\n  - 连锡：30%\n  - 少锡：15%\n\n改善建议：优先解决虚焊问题\n\n[AI分析，需结合实际不良数据]`,
    maintenance_pred: `【设备维护预测报告】\n预测日期：${date}\n\n设备信息：${input}\n\n一、健康度评估\n  整体健康度：76/100\n  ├ 机械部件：72/100 ⚠️\n  ├ 电气系统：85/100 ✅\n  └ 控制系统：80/100 ✅\n\n二、预测维护计划\n  ┌────────────┬──────────┬───────┐\n  │ 部件       │ 预计寿命 │ 优先级│\n  ├────────────┼──────────┼───────┤\n  │ 主轴轴承   │ 约30天   │ 高    │\n  │ 传送皮带   │ 约60天   │ 中    │\n  │ 润滑系统   │ 约15天   │ 高    │\n  └────────────┴──────────┴───────┘\n\n三、建议\n  - 立即安排润滑系统保养\n  - 30天内更换主轴轴承\n  - 备件采购提前规划\n\n[AI预测，请设备工程师确认]`,
    wbs_gen: `【WBS任务分解】\n生成日期：${date}\n\n项目信息：${input}\n\n1. 需求分析阶段（2周）\n   1.1 需求梳理与确认\n   1.2 技术可行性评估\n   1.3 资源评估与排期\n\n2. 设计阶段（3周）\n   2.1 系统架构设计\n   2.2 详细设计文档\n   2.3 设计评审\n\n3. 开发阶段（6周）\n   3.1 核心功能开发\n   3.2 接口联调\n   3.3 单元测试\n\n4. 测试阶段（2周）\n   4.1 集成测试\n   4.2 系统测试\n   4.3 UAT验收\n\n5. 上线阶段（1周）\n   5.1 部署与发布\n   5.2 监控与反馈\n\n[AI分解，请PM调整确认]`,
    gantt_gen: `【甘特图规划】\n生成日期：${date}\n\n项目信息：${input}\n\n时间线规划：\n\n        W1  W2  W3  W4  W5  W6  W7  W8\n需求    ████\n设计        ██████\n硬件开发        ████████████\n软件开发            ████████████\n结构设计        ████████\n工程导入                    ████████\n测试                    ████████\n试产                            ████\n\n关键路径：需求→硬件开发→测试→试产\n总工期：8周\n\n[AI生成，请PM调整关键节点]`,
    risk_assess: `【项目风险评估报告】\n评估日期：${date}\n\n项目信息：${input}\n\n┌──────────────────┬──────┬──────┬──────────────────────┐\n│ 风险项           │ 概率 │ 影响 │ 应对策略             │\n├──────────────────┼──────┼──────┼──────────────────────┤\n│ 关键物料断供     │ 中   │ 高   │ 备选供应商+安全库存  │\n│ 技术方案不可行   │ 低   │ 高   │ 原型验证+专家评审    │\n│ 人力资源不足     │ 中   │ 中   │ 跨部门调配+外包      │\n│ 进度延期         │ 高   │ 中   │ 关键路径监控+缓冲    │\n│ 需求频繁变更     │ 中   │ 高   │ 变更控制流程         │\n│ 测试不充分       │ 低   │ 高   │ 自动化+多轮测试      │\n└──────────────────┴──────┴──────┴──────────────────────┘\n\n风险等级：中等\n建议每周做一次风险复盘\n\n[AI评估，请项目组补充实际风险]`,
    weekly_report: `【项目周报】\n生成日期：${date}\n\n周报内容：${input}\n\n一、本周进展\n- 整体进度：按计划推进（偏差+2%）\n- 完成任务：5项\n- 进行中：3项\n- 延期：1项\n\n二、关键里程碑\n✅ M1 需求评审 — 已完成\n🔄 M2 方案设计 — 进行中(65%)\n⏳ M3 样机制作 — 待开始\n\n三、风险与问题\n- [问题] 某物料交期延迟2周\n  措施：已启动备选方案\n- [风险] 测试资源紧张\n  措施：协调增加1名测试人员\n\n四、下周计划\n- 完成方案设计评审\n- 启动原理图设计\n- 采购长交期物料\n\n[AI汇总周报，请PM核实补充]`,
    meeting_summary: `【会议纪要】\n生成日期：${date}\n\n会议内容：${input}\n\n一、会议要点\n1. 各方就核心技术方案达成一致\n2. 项目时间线确认无调整\n3. 需补充3项技术细节\n\n二、决议事项\n- 采用方案A作为主方案\n- 增加一轮技术评审\n- 测试方案下周提交\n\n三、行动项\n| 事项 | 负责人 | 截止日期 |\n|------|--------|----------|\n| 方案细化 | 技术负责人 | +3工作日 |\n| 测试计划 | 测试经理 | +5工作日 |\n| 物料确认 | 采购 | +2工作日 |\n\n[AI生成纪要，请与会人员确认]`,
    resource_plan: `【资源排期方案】\n生成日期：${date}\n\n输入条件：${input}\n\n一、人力负载分析\n  硬件组：负载 85% ⚠️（接近饱和）\n  软件组：负载 72% ✅\n  结构组：负载 60% ✅\n  测试组：负载 90% ⚠️（需关注）\n\n二、优化建议\n1. 硬件组：将Layout工作外包，释放20%\n2. 测试组：自动化替代30%手动测试\n3. 错峰安排：结构设计提前1周启动\n\n三、排期方案\n  硬件开发：W1-W6（优化后W1-W5）\n  软件开发：W2-W7\n  结构设计：W1-W4\n  联调测试：W5-W8\n\n整体优化效果：缩短1周\n\n[AI排期建议，请PM确认可行性]`,
    '3d_assist': `【3D建模建议报告】\n生成日期：${date}\n\n设计要求：${input}\n\n一、外形建议\n- 整体尺寸建议：120×80×35mm\n- 圆角半径：R3-R5\n- 壁厚：均匀2.0mm（±0.1mm）\n\n二、结构优化\n1. 增加加强筋（高度≤壁厚3倍）\n2. 卡扣设计采用悬臂梁式\n3. 出模角建议1°-2°\n\n三、材料建议\n- 外壳：ABS+PC（阻燃V0级）\n- 内部支架：PA66+GF30\n\n四、模具建议\n- 建议1出2腔\n- 进胶位置：底部侧进胶\n\n[AI建议，请结构工程师细化设计]`,
    tolerance_analysis: `【公差分析报告】\n分析日期：${date}\n\n分析条件：${input}\n\n一、尺寸链分析\n装配间隙 = ΣA - ΣB\n\n最大间隙：0.35mm\n最小间隙：0.05mm\n中间值：0.20mm\n\n二、统计公差（6σ法）\nT_total = √(ΣTi²) = 0.18mm\n装配合格率：99.73%（3σ）\n\n三、关键尺寸\n- A面配合尺寸：50±0.05mm（关键）\n- B面装配面：30±0.1mm\n- 间隙要求：0.1-0.3mm\n\n建议：A面公差需控制在±0.03mm以内\n\n[AI分析，请结构工程师验证]`,
    material_select: `【材料选型报告】\n生成日期：${date}\n\n需求描述：${input}\n\n推荐材料对比：\n\n┌──────────┬──────────┬──────────┬──────────┐\n│ 材料     │ ABS+PC   │ PA66+GF30│ POM      │\n├──────────┼──────────┼──────────┼──────────┤\n│ 强度     │ 中等     │ 高       │ 高       │\n│ 耐温     │ 90°C    │ 200°C   │ 110°C   │\n│ 阻燃     │ V0可选   │ 需添加   │ 困难     │\n│ 成本     │ ¥25/kg  │ ¥35/kg  │ ¥28/kg  │\n│ 加工性   │ 优       │ 良       │ 优       │\n└──────────┴──────────┴──────────┴──────────┘\n\n推荐：外壳用ABS+PC，内部结构件用PA66+GF30\n\n[AI选型，请结构工程师确认]`,
    mold_review: `【模具评审报告】\n评审日期：${date}\n\n模具信息：${input}\n\n一、设计检查\n✅ 出模角：1.5°（满足要求）\n✅ 壁厚均匀性：偏差<15%\n⚠️ 熔接线位置：位于外观面\n❌ 排气不足：2处死角区域\n\n二、风险项\n1. 熔接线位置影响外观\n   建议：调整进胶位置或增加溢流井\n2. 排气不足可能导致困气\n   建议：增加排气槽和排气镶件\n\n三、建议\n- 模具钢材建议：P20（产品部件）\n- 冷却水路需优化变形控制\n- 试模T1后评估表面处理方案\n\n[AI评审，请模具工程师确认]`,
    fea_analysis: `【FEA分析预估报告】\n分析日期：${date}\n\n分析条件：${input}\n\n一、应力分析\n- 最大应力：28.5MPa\n- 材料屈服强度：55MPa\n- 安全系数：1.93（≥1.5 ✅）\n- 应力集中位置：卡扣根部\n\n二、变形分析\n- 最大变形：0.12mm\n- 允许变形：0.5mm\n- 变形位置：顶盖中心\n\n三、优化建议\n1. 卡扣根部增加R角（R≥0.5mm）\n2. 顶盖增加加强筋\n3. 关键区域壁厚可减薄至1.5mm\n\n优化后预计减重：8%\n\n[AI预估分析，建议用CAE工具精确仿真]`,
  };

  if (templates[tool.id]) return templates[tool.id];

  return `【${tool.name} — AI分析报告】\n生成日期：${date}\n\n输入信息：\n${input}\n\n一、分析结果\n基于您提供的信息，AI已完成分析。以下是关键发现：\n\n1. 核心要点\n   - 根据行业最佳实践和历史数据分析\n   - 综合评估多个维度的指标\n   - 识别出3个关键改进方向\n\n2. 建议方案\n   - 优先处理高优先级事项\n   - 建立定期复审机制\n   - 持续跟踪数据变化\n\n3. 风险提示\n   - 需关注外部环境变化\n   - 建议增加备选方案\n\n二、下一步行动\n   建议将此报告发送给相关负责人审阅，并在下次评审会议中讨论\n\n[AI自动生成，请结合实际情况判断和调整]`;
}

// ========== PRD / WBS / Meeting 生成函数 ==========
function generatePRDContent(name, desc, type) {
  const d = new Date().toISOString().slice(0, 10);
  return `===================================================\n    产品需求文档（PRD）\n    ${name}\n===================================================\n\n【文档信息】\n项目名称：${name}\n产品类型：${type}\n创建日期：${d}\n文档版本：V1.0\n状态：草稿\n\n---\n\n一、项目背景与目标\n\n1.1 背景\n${desc}\n\n当前市场对${type}产品需求持续增长，用户对产品智能化、可靠性和易用性的要求不断提高。本项目旨在打造新一代${name}，提升市场竞争力。\n\n1.2 项目目标\n• 完成${name}的全部功能开发和验证\n• 产品通过相关行业标准认证\n• 实现量产并达到目标成本控制\n• 产品上市后6个月内达成预定销售目标\n\n---\n\n二、用户分析\n\n2.1 目标用户\n• 主要用户群体：终端消费者 / 行业客户\n• 使用场景：日常使用、专业应用\n• 用户痛点：现有产品智能化不足、操作复杂、可靠性待提升\n\n2.2 用户需求优先级\n[P0] 核心功能稳定可靠\n[P0] 产品安全性满足行业标准\n[P1] 智能化功能（AI辅助、远程控制）\n[P1] 良好的用户交互体验\n[P2] 外观设计美观、符合人体工程学\n[P2] 支持OTA升级\n\n---\n\n三、功能需求\n\n3.1 硬件功能需求\n• 主控方案选型及电路设计\n• 传感器模组集成\n• 电源管理方案\n• 通信模块（WiFi/BLE/4G可选）\n• PCB Layout设计及优化\n\n3.2 软件功能需求\n• 嵌入式固件开发\n• 设备端AI算法集成\n• 通信协议栈开发\n• OTA升级功能\n• APP/小程序对接\n\n3.3 结构设计需求\n• 产品外壳ID设计\n• 结构件建模及公差分析\n• 防水防尘设计（IP等级）\n• 散热方案设计\n• 模具开发\n\n3.4 测试需求\n• 功能测试用例设计\n• 可靠性测试（高低温、盐雾、振动）\n• EMC测试\n• 安规测试\n• 用户体验测试\n\n---\n\n四、非功能需求\n\n• 响应时间 < 500ms\n• 待机功耗 < 指定阈值\n• 工作温度：-20°C ~ 60°C\n• 不良率 < 0.5%\n• 满足CCC/CE/FCC认证\n\n---\n\n五、项目里程碑\nM1：需求评审完成\nM2：方案设计评审\nM3：EVT样机完成\nM4：DVT测试通过\nM5：PVT试产\nM6：量产导入\n\n---\n\n六、风险评估\n| 风险项 | 等级 | 应对策略 |\n|--------|------|----------|\n| 关键物料供应 | 中 | 提前备料，备选方案 |\n| 技术难点突破 | 高 | 预研验证，专家评审 |\n| 进度延期 | 中 | 关键路径监控，预留缓冲 |\n\n[本文档由AI自动生成，请根据实际情况修改完善]`;
}

function generateWBSTasks(name, type) {
  let tid = 0;
  const today = new Date();
  const t = (n, dept, dk, h, pid, dayOffset) => ({
    id: 'task_' + (++tid),
    name: n, department: dept, deptKey: dk, estimatedHours: h,
    parentId: pid || null, assignee: '', status: 'pending', progress: 0, isRed: false,
    startDay: dayOffset || 0,
    duration: Math.ceil(h / 8),
  });
  const tasks = [];
  const hw1 = t('硬件方案设计','硬件研发部','hardware',40,null,0); tasks.push(hw1);
  tasks.push(t('主控方案选型与评估','硬件研发部','hardware',16,hw1.id,0));
  tasks.push(t('原理图设计','硬件研发部','hardware',24,hw1.id,2));
  tasks.push(t('PCB Layout设计','硬件研发部','hardware',32,hw1.id,5));
  tasks.push(t('硬件调试与验证','硬件研发部','hardware',24,hw1.id,9));
  const sw1 = t('软件开发','软件组','software',60,null,2); tasks.push(sw1);
  tasks.push(t('嵌入式固件架构设计','软件组','software',16,sw1.id,2));
  tasks.push(t('驱动层开发','软件组','software',24,sw1.id,4));
  tasks.push(t('应用层功能开发','软件组','software',40,sw1.id,7));
  tasks.push(t('通信协议开发','软件组','software',20,sw1.id,12));
  const st1 = t('结构设计','结构组','structure',40,null,0); tasks.push(st1);
  tasks.push(t('ID外观设计','结构组','structure',16,st1.id,0));
  tasks.push(t('3D建模与仿真','结构组','structure',24,st1.id,2));
  tasks.push(t('模具评审与开模','结构组','structure',32,st1.id,5));
  const en1 = t('工程导入','工程部','engineering',30,null,10); tasks.push(en1);
  tasks.push(t('BOM整理与物料导入','工程部','engineering',12,en1.id,10));
  tasks.push(t('生产工艺制定','工程部','engineering',16,en1.id,12));
  tasks.push(t('试产与产线验证','工程部','engineering',20,en1.id,14));
  const qa1 = t('品质管控','品质部','quality',24,null,5); tasks.push(qa1);
  tasks.push(t('IQC来料检验标准','品质部','quality',8,qa1.id,5));
  tasks.push(t('制程品质管控方案','品质部','quality',10,qa1.id,6));
  tasks.push(t('OQC出货检验标准','品质部','quality',8,qa1.id,8));
  return tasks;
}

function generateMeetingSummaryContent(project) {
  const members = [];
  for (const dept of DEPARTMENTS) { for (const mid of (project.team[dept.key]||[])) { const u=USERS.find(x=>x.id===mid); if(u) members.push(u.name); } }
  if (project.projectManager) { const pm=USERS.find(u=>u.id===project.projectManager); if(pm) members.unshift(pm.name); }
  return `===================================================\n    项目评审会议纪要\n    ${project.name}\n===================================================\n\n会议时间：${project.meeting.date} ${project.meeting.time}\n会议地点：${project.meeting.room}\n参会人员：${members.join('、')}\n\n---\n\n一、评审结论\n• PRD需求描述清晰，功能范围合理\n• 建议补充：用户数据安全与隐私保护方案\n• 建议增加：产品兼容性需求说明\n• 软件组建议：增加API接口规范文档\n• 硬件方案总体可行，主控选型建议增加备选\n\n二、待修改事项\n1. 新增「数据安全与隐私保护」章节\n2. 补充产品兼容性需求\n3. 细化软件接口规范\n4. 调整里程碑时间节点\n\n三、行动项\n| 行动项 | 负责人 | 截止日期 |\n|--------|--------|----------|\n| 更新PRD | 产品经理 | +3工作日 |\n| 备选方案评估 | 硬件经理 | +5工作日 |\n| 接口文档 | 软件经理 | +5工作日 |\n| BOM初稿 | 工程部 | +7工作日 |\n\n[本纪要由AI自动生成]`;
}

function generateRevisedPRD(original) {
  let r = original.replace('V1.0','V2.0（会议修订版）').replace('草稿','会议修订');
  const extra = `\n---\n\n五-附、数据安全与隐私保护（会议新增）\n• 用户数据传输全程加密（TLS 1.3）\n• 满足GDPR/个人信息保护法要求\n• 提供用户数据导出和删除功能\n\n五-附2、产品兼容性需求（会议新增）\n• 兼容主流智能家居平台\n• 支持Android 10+ / iOS 14+\n• 向下兼容上一代配件接口\n`;
  r = r.replace('六、风险评估', extra + '\n六、风险评估');
  return r;
}

// ========== 简单文本 Diff 算法 ==========
function computeSimpleDiff(oldText, newText) {
  const oldLines = oldText.split('\n');
  const newLines = newText.split('\n');
  const result = [];
  const maxLen = Math.max(oldLines.length, newLines.length);
  let oi = 0, ni = 0;
  while (oi < oldLines.length || ni < newLines.length) {
    if (oi < oldLines.length && ni < newLines.length) {
      if (oldLines[oi] === newLines[ni]) {
        result.push({ type: 'same', text: oldLines[oi] });
        oi++; ni++;
      } else {
        result.push({ type: 'removed', text: oldLines[oi] });
        result.push({ type: 'added', text: newLines[ni] });
        oi++; ni++;
      }
    } else if (oi < oldLines.length) {
      result.push({ type: 'removed', text: oldLines[oi] });
      oi++;
    } else {
      result.push({ type: 'added', text: newLines[ni] });
      ni++;
    }
  }
  return result;
}

// ========== Vue App ==========
createApp({
  data() {
    return {
      view: 'login', currentUser: null,
      projects: [], currentProjectId: null, currentStage: 'prd_draft', editingPRD: false,
      showCreateModal: false, newProject: { name: '', description: '', type: '智能硬件' },
      showSubTaskModal: false, subTaskParentId: null, newSubTask: { name: '', hours: 8 },
      meetingDate: '', meetingTime: '14:00', meetingRoom: '',
      reportProjectId: '', reportTaskId: '', reportContent: '', reportProgress: 50,
      reports: [], allUploadedFiles: [],
      showToolModal: false, activeTool: {}, toolInput: '', toolOutput: '',
      toolOutputAnimating: false,
      routeTarget: '', routeNote: '',
      toolOutputs: [],
      showOutputDetailModal: false, viewingOutput: {},
      showAddToolModal: false, customTool: { name: '', icon: '🔧', description: '', deptKey: '' },
      customTools: [],
      // Notification center
      systemNotifications: [],
      notificationFilter: 'all',
      // Kanban drag
      draggedTask: null,
      kanbanView: true,
      // Gantt
      ganttProjectId: '',
      // Dashboard charts
      chartsInitialized: false,
      // Version history
      showVersionModal: false, versionDiff: [], comparingVersions: [0, 0],
      // Export
      exportFormat: 'txt',
      // Mobile
      showMobileMenu: false,
      // Toast
      toast: { show: false, msg: '', type: 'success' },
      users: USERS, stages: STAGES, departments: DEPARTMENTS, deptConfig: DEPT_CONFIG,
    };
  },

  computed: {
    today() { return new Date().toLocaleDateString('zh-CN', { year:'numeric', month:'long', day:'numeric', weekday:'long' }); },
    isEngineerOrLead() { return ['engineer','dept_lead','project_manager'].includes(this.currentUser?.role); },
    projectManagers() { return this.users.filter(u => u.role === 'project_manager'); },
    currentProject() { return this.projects.find(p => p.id === this.currentProjectId) || null; },
    topLevelTasks() { return this.currentProject ? this.currentProject.wbs.filter(t => !t.parentId) : []; },
    canOperateAsProjectManager() { if (!this.currentProject) return false; return this.currentUser.id === this.currentProject.projectManager || this.currentUser.role === 'dept_manager'; },
    allTeamsConfirmed() { return this.currentProject ? Object.values(this.currentProject.teamConfirmed).every(v => v) : false; },
    getAllProjectMembers() {
      if (!this.currentProject) return [];
      const ids = new Set();
      if (this.currentProject.createdBy) ids.add(this.currentProject.createdBy);
      if (this.currentProject.projectManager) ids.add(this.currentProject.projectManager);
      for (const d of DEPARTMENTS) { ids.add(d.leadId); for (const m of (this.currentProject.team[d.key]||[])) ids.add(m); }
      return [...ids];
    },
    getAllProjectEngineers() {
      if (!this.currentProject) return [];
      const ids = [];
      for (const d of DEPARTMENTS) for (const m of (this.currentProject.team[d.key]||[])) ids.push(m);
      return ids;
    },
    startedProjects() { return this.projects.filter(p => p.status === 'started').length; },
    myRedCount() { let c=0; for (const p of this.projects) for (const t of p.wbs) if (t.isRed && t.assignee===this.currentUser?.id) c++; return c; },
    myTasks() {
      const tasks = [];
      for (const p of this.projects) for (const t of p.wbs) if (t.assignee === this.currentUser?.id) tasks.push({task:t, projectId:p.id, projectName:p.name});
      tasks.sort((a,b) => (b.task.isRed?1:0) - (a.task.isRed?1:0));
      return tasks;
    },
    myProjects() { return this.projects.filter(p => p.status==='started' && p.wbs.some(t=>t.assignee===this.currentUser?.id)); },
    myReports() { return this.reports.filter(r => r.userId===this.currentUser?.id).sort((a,b) => b.date.localeCompare(a.date)); },
    allFiles() { return this.allUploadedFiles.sort((a,b) => b.date.localeCompare(a.date)); },

    currentDeptConfig() {
      return DEPT_CONFIG.find(d => d.key === this.currentUser?.deptKey) || DEPT_CONFIG[0];
    },
    myDeptTools() {
      const base = this.currentDeptConfig.defaultTools || [];
      const custom = this.customTools.filter(t => t.deptKey === this.currentUser?.deptKey);
      return [...base, ...custom];
    },
    otherDepts() {
      return DEPT_CONFIG.filter(d => d.key !== this.currentUser?.deptKey).map(d => ({
        ...d,
        allTools: [...d.defaultTools, ...this.customTools.filter(t => t.deptKey === d.key)]
      }));
    },
    myToolOutputs() {
      return this.toolOutputs.filter(o => o.fromUser === this.currentUser?.id).sort((a,b) => b.date.localeCompare(a.date));
    },
    myNotifications() {
      return this.toolOutputs.filter(o => o.routedTo === this.currentUser?.id && !o.read);
    },

    // ===== Notification Center =====
    allNotificationsList() {
      const list = [];
      const u = this.currentUser;
      if (!u) return list;

      for (const o of this.toolOutputs) {
        if (o.routedTo === u.id) {
          list.push({ id: 'tool_'+o.id, type: 'tool', icon: o.toolIcon, title: `${o.toolName} 产出`, body: `来自 ${this.getUserName(o.fromUser)}`, date: o.date, read: o.read, ref: o });
        }
      }

      for (const n of this.systemNotifications) {
        if (n.userId === u.id) {
          list.push({ id: n.id, type: n.type, icon: n.icon, title: n.title, body: n.body, date: n.date, read: n.read, ref: n });
        }
      }

      for (const p of this.projects) {
        for (const t of p.wbs) {
          if (t.isRed && t.assignee === u.id) {
            const nid = 'red_' + t.id;
            if (!list.find(x => x.id === nid)) {
              list.push({ id: nid, type: 'urgent', icon: '🔴', title: `紧急任务：${t.name}`, body: `项目：${p.name}`, date: new Date().toISOString().slice(0,10), read: false, ref: { projectId: p.id, taskId: t.id } });
            }
          }
        }
      }

      list.sort((a, b) => {
        if (a.read !== b.read) return a.read ? 1 : -1;
        return b.date.localeCompare(a.date);
      });
      return list;
    },
    filteredNotifications() {
      if (this.notificationFilter === 'all') return this.allNotificationsList;
      if (this.notificationFilter === 'unread') return this.allNotificationsList.filter(n => !n.read);
      return this.allNotificationsList.filter(n => n.type === this.notificationFilter);
    },
    unreadNotificationCount() {
      return this.allNotificationsList.filter(n => !n.read).length;
    },

    // ===== Permission =====
    canCreateProject() {
      return this.currentUser?.role === 'product_manager' || this.currentUser?.role === 'dept_manager';
    },
    canSeeAllProjects() {
      return ['dept_manager', 'project_manager'].includes(this.currentUser?.role);
    },
    visibleProjects() {
      if (!this.currentUser) return [];
      if (this.canSeeAllProjects) return this.projects;
      return this.projects.filter(p => {
        if (p.createdBy === this.currentUser.id) return true;
        if (p.projectManager === this.currentUser.id) return true;
        for (const dk of Object.keys(p.team)) {
          if (p.team[dk].includes(this.currentUser.id)) return true;
        }
        const dept = DEPARTMENTS.find(d => d.leadId === this.currentUser.id);
        if (dept) return true;
        return false;
      });
    },

    // ===== Multi-project =====
    crossProjectTaskGroups() {
      const groups = {};
      for (const p of this.projects) {
        const tasks = p.wbs.filter(t => t.assignee === this.currentUser?.id);
        if (tasks.length) {
          groups[p.id] = { projectName: p.name, projectId: p.id, tasks };
        }
      }
      return groups;
    },
    crossProjectStats() {
      let total = 0, completed = 0, inProgress = 0, urgent = 0;
      for (const p of this.projects) {
        for (const t of p.wbs) {
          if (t.assignee === this.currentUser?.id) {
            total++;
            if (t.status === 'completed') completed++;
            else if (t.status === 'in_progress') inProgress++;
            if (t.isRed) urgent++;
          }
        }
      }
      return { total, completed, inProgress, urgent };
    },

    // ===== Kanban =====
    kanbanPending() { return this.currentProject ? this.currentProject.wbs.filter(t => !t.parentId && t.status === 'pending') : []; },
    kanbanInProgress() { return this.currentProject ? this.currentProject.wbs.filter(t => !t.parentId && t.status === 'in_progress') : []; },
    kanbanCompleted() { return this.currentProject ? this.currentProject.wbs.filter(t => !t.parentId && t.status === 'completed') : []; },
    inProgressTasks() { return this.currentProject ? this.currentProject.wbs.filter(t => t.status==='in_progress').length : 0; },
    completedTasks() { return this.currentProject ? this.currentProject.wbs.filter(t => t.status==='completed').length : 0; },
    redTasks() { return this.currentProject ? this.currentProject.wbs.filter(t => t.isRed).length : 0; },

    // ===== Gantt =====
    ganttProject() {
      return this.projects.find(p => p.id === this.ganttProjectId) || null;
    },
    ganttData() {
      const p = this.ganttProject;
      if (!p || !p.wbs.length) return { tasks: [], maxDay: 1 };
      const tasks = p.wbs.filter(t => !t.parentId);
      let maxDay = 1;
      tasks.forEach(t => {
        const end = (t.startDay || 0) + (t.duration || Math.ceil(t.estimatedHours / 8));
        if (end > maxDay) maxDay = end;
      });
      return { tasks, maxDay };
    },

    // ===== Dashboard Stats =====
    dashboardStats() {
      const stats = {
        projectsByStatus: {},
        tasksByDept: {},
        tasksByStatus: { pending: 0, in_progress: 0, completed: 0 },
        totalHours: 0, completedHours: 0,
        reportsThisWeek: 0,
      };
      for (const p of this.projects) {
        const sl = this.statusLabel(p.status);
        stats.projectsByStatus[sl] = (stats.projectsByStatus[sl] || 0) + 1;
        for (const t of p.wbs) {
          if (!t.parentId) {
            const dk = t.department || '其他';
            stats.tasksByDept[dk] = (stats.tasksByDept[dk] || 0) + 1;
            stats.tasksByStatus[t.status] = (stats.tasksByStatus[t.status] || 0) + 1;
            stats.totalHours += t.estimatedHours || 0;
            if (t.status === 'completed') stats.completedHours += t.estimatedHours || 0;
          }
        }
      }
      const weekAgo = new Date(); weekAgo.setDate(weekAgo.getDate() - 7);
      const weekStr = weekAgo.toISOString().slice(0, 10);
      stats.reportsThisWeek = this.reports.filter(r => r.date >= weekStr).length;
      return stats;
    },

    myPendingActions() {
      const actions = []; const u = this.currentUser; if (!u) return actions;
      for (const p of this.projects) {
        if (u.role==='product_manager' && p.createdBy===u.id) {
          if (p.status==='prd_draft' && !p.prd.content) actions.push({id:p.id+'_prd',type:'generate',typeLabel:'生成',text:`${p.name}：生成PRD文档`,projectId:p.id,stage:'prd_draft'});
          if (p.status==='prd_draft' && p.prd.content) actions.push({id:p.id+'_sub',type:'confirm',typeLabel:'提交',text:`${p.name}：提交PRD审核`,projectId:p.id,stage:'prd_draft'});
          if (p.status==='prd_confirm') actions.push({id:p.id+'_cfm',type:'confirm',typeLabel:'确认',text:`${p.name}：确认修改后的PRD`,projectId:p.id,stage:'prd_confirm'});
        }
        if (u.role==='dept_manager' && u.deptKey==='project') {
          if (p.status==='prd_review') actions.push({id:p.id+'_rv',type:'review',typeLabel:'审核',text:`${p.name}：审核PRD`,projectId:p.id,stage:'prd_review'});
          if (p.status==='pm_assign') actions.push({id:p.id+'_as',type:'assign',typeLabel:'指派',text:`${p.name}：指派项目经理`,projectId:p.id,stage:'pm_assign'});
        }
        if (u.role==='project_manager' && p.projectManager===u.id) {
          if (p.status==='wbs_generate' && p.wbs.length===0) actions.push({id:p.id+'_wbs',type:'generate',typeLabel:'生成',text:`${p.name}：生成WBS`,projectId:p.id,stage:'wbs_generate'});
          if (p.status==='wbs_generate' && p.wbs.length>0) actions.push({id:p.id+'_dist',type:'assign',typeLabel:'分发',text:`${p.name}：分发任务至各部门`,projectId:p.id,stage:'wbs_generate'});
          if (p.status==='meeting' && !p.meeting.scheduled) actions.push({id:p.id+'_mt',type:'assign',typeLabel:'预约',text:`${p.name}：预约评审会议`,projectId:p.id,stage:'meeting'});
        }
        if (u.role==='dept_lead' && p.status==='team_building') {
          const dk = u.deptKey; if (dk && DEPARTMENTS.find(d=>d.key===dk) && !p.teamConfirmed[dk]) actions.push({id:p.id+'_t_'+dk,type:'select',typeLabel:'选人',text:`${p.name}：选择${u.department}工程师`,projectId:p.id,stage:'team_building'});
        }
        if (u.role==='engineer') { for (const rt of p.wbs.filter(t=>t.isRed&&t.assignee===u.id)) actions.push({id:rt.id+'_red',type:'task',typeLabel:'紧急',text:`${p.name}：${rt.name}（标红）`,projectId:p.id,stage:'started'}); }
      }
      return actions;
    },
  },

  watch: {
    view(newView) {
      if (newView === 'analytics') {
        this.$nextTick(() => this.initDashboardCharts());
      }
      this.showMobileMenu = false;
    },
  },

  methods: {
    getDeptUsers(deptKey) { return this.users.filter(u => u.deptKey === deptKey); },
    login(user) { this.currentUser = user; this.view = 'dashboard'; this.showToast(`欢迎，${user.name}（${user.title}）`, 'success'); },
    goToAction(a) { this.openProject(a.projectId); this.currentStage = a.stage; },
    openProject(id) { this.currentProjectId = id; const p = this.projects.find(pp => pp.id === id); if (p) this.currentStage = p.status; this.editingPRD = false; this.view = 'project'; },
    openCreateProject() { this.newProject = { name:'', description:'', type:'智能硬件' }; this.showCreateModal = true; },

    createProject() {
      const p = {
        id:'proj_'+Date.now(), name:this.newProject.name, description:this.newProject.description,
        type:this.newProject.type, status:'prd_draft', createdBy:this.currentUser.id,
        createdAt:new Date().toISOString().slice(0,10), projectManager:null,
        prd:{ content:'', version:1, confirmed:false, versions:[] },
        wbs:[], team:{hardware:[],software:[],structure:[],engineering:[],quality:[]},
        teamConfirmed:{hardware:false,software:false,structure:false,engineering:false,quality:false},
        meeting:{scheduled:false,date:null,time:null,room:null,summary:null}, files:[]
      };
      this.projects.push(p); this.showCreateModal = false; this.saveProjects();
      this.addSystemNotification('system', '📁', '新项目创建', `${p.name} 已创建`, this.currentUser.id);
      this.showToast('项目创建成功','success'); this.openProject(p.id);
    },

    generatePRD() { const p=this.currentProject; p.prd.content=generatePRDContent(p.name,p.description,p.type); this.savePRDVersion(p, '初始AI生成'); this.saveProjects(); this.showToast('AI 已生成PRD文档','info'); },
    submitPRD() {
      this.currentProject.status='prd_review'; this.currentStage='prd_review'; this.saveProjects();
      this.addSystemNotification('approval', '📋', 'PRD待审核', `${this.currentProject.name} PRD已提交审核`, 'dept_mgr');
      this.showToast('PRD已提交审核','success');
    },
    approvePRD() {
      this.currentProject.status='pm_assign'; this.currentStage='pm_assign'; this.saveProjects();
      this.addSystemNotification('approval', '✅', 'PRD审核通过', `${this.currentProject.name} PRD已通过审核`, this.currentProject.createdBy);
      this.showToast('PRD审核通过','success');
    },
    assignPM() { this.currentProject.status='wbs_generate'; this.currentStage='wbs_generate'; this.saveProjects(); this.showToast('项目经理已指派','success'); },
    generateWBS() { this.currentProject.wbs=generateWBSTasks(this.currentProject.name,this.currentProject.type); this.saveProjects(); this.showToast('AI 已生成WBS','info'); },
    submitWBS() { this.currentProject.status='team_building'; this.currentStage='team_building'; this.saveProjects(); this.showToast('任务已分发','success'); },
    confirmDeptTeam(dk) { this.currentProject.teamConfirmed[dk]=true; this.saveProjects(); this.showToast('人员已确认','success'); },
    completeTeamBuilding() {
      this.currentProject.status='meeting'; this.currentStage='meeting'; this.saveProjects();
      for (const uid of this.getAllProjectMembers) {
        this.addSystemNotification('meeting', '📅', '会议预约', `${this.currentProject.name} 需要预约评审会议`, uid);
      }
      this.showToast('团队组建完成','success');
    },
    scheduleMeeting() {
      const p=this.currentProject; p.meeting.scheduled=true; p.meeting.date=this.meetingDate; p.meeting.time=this.meetingTime; p.meeting.room=this.meetingRoom; this.saveProjects();
      for (const uid of this.getAllProjectMembers) {
        this.addSystemNotification('meeting', '📅', '会议邀请', `${p.name} 评审会议：${this.meetingDate} ${this.meetingTime} ${this.meetingRoom}`, uid);
      }
      this.showToast('会议已预约','success');
    },
    generateMeetingSummary() { this.currentProject.meeting.summary=generateMeetingSummaryContent(this.currentProject); this.saveProjects(); this.showToast('AI 已生成会议纪要','info'); },
    advanceToConfirm() {
      const p=this.currentProject;
      this.savePRDVersion(p, '会议前版本');
      p.prd.content=generateRevisedPRD(p.prd.content); p.prd.version=2; p.status='prd_confirm'; this.currentStage='prd_confirm';
      this.savePRDVersion(p, '会议修改版');
      this.saveProjects(); this.showToast('AI 已修改PRD','info');
    },
    confirmFinalPRD() {
      const p=this.currentProject; p.prd.confirmed=true; p.status='started'; this.currentStage='started'; this.saveProjects();
      this.savePRDVersion(p, '最终确认版');
      this.showToast('项目正式启动！','success');
    },

    addSubTask(parent) { this.subTaskParentId=parent.id; this.newSubTask={name:'',hours:8}; this.showSubTaskModal=true; },
    confirmAddSubTask() { if(!this.newSubTask.name)return; const par=this.currentProject.wbs.find(t=>t.id===this.subTaskParentId); this.currentProject.wbs.push({id:'task_'+Date.now(),name:this.newSubTask.name,department:par?.department||'',deptKey:par?.deptKey||'',estimatedHours:this.newSubTask.hours,parentId:this.subTaskParentId,assignee:'',status:'pending',progress:0,isRed:false,startDay:par?.startDay||0,duration:Math.ceil(this.newSubTask.hours/8)}); this.showSubTaskModal=false; this.saveProjects(); },
    getChildren(pid) { return this.currentProject ? this.currentProject.wbs.filter(t=>t.parentId===pid) : []; },

    canSelectForDept(dk) { if(!this.currentProject||this.currentProject.status!=='team_building')return false; if(this.currentProject.teamConfirmed[dk])return false; const d=DEPARTMENTS.find(x=>x.key===dk); return this.currentUser.id===d?.leadId||this.currentUser.role==='dept_manager'; },
    getEngineersForDept(dk) { return this.users.filter(u=>u.role==='engineer'&&u.deptKey===dk); },
    isTeamMember(dk,uid) { return this.currentProject.team[dk]?.includes(uid); },
    toggleTeamMember(dk,uid) { const a=this.currentProject.team[dk]; const i=a.indexOf(uid); if(i>=0)a.splice(i,1); else a.push(uid); this.saveProjects(); },

    onRedToggle(task) {
      this.saveProjects();
      if (task.isRed && task.assignee) {
        this.addSystemNotification('urgent', '🔴', '任务标红', `任务「${task.name}」已被标红，请紧急处理`, task.assignee);
        this.showToast(`任务已标红并通知${this.getUserName(task.assignee)}`,'warn');
      }
    },
    onTaskProgress(t) { if(t.task.progress>=100){t.task.status='completed';t.task.isRed=false;} else if(t.task.progress>0)t.task.status='in_progress'; this.saveProjects(); },
    onTaskStatusChange(t) { if(t.task.status==='completed'){t.task.progress=100;t.task.isRed=false;this.showToast('任务已完成','success');} this.saveProjects(); },

    onTaskProgressDirect(task) { if(task.progress>=100){task.status='completed';task.isRed=false;} else if(task.progress>0)task.status='in_progress'; this.saveProjects(); },
    onTaskStatusDirect(task) { if(task.status==='completed'){task.progress=100;task.isRed=false;this.showToast('任务已完成','success');} this.saveProjects(); },
    myTasksForProject(pid) { const p=this.projects.find(pp=>pp.id===pid); return p?p.wbs.filter(t=>t.assignee===this.currentUser.id):[]; },
    submitReport() {
      this.reports.push({id:'rpt_'+Date.now(),userId:this.currentUser.id,projectId:this.reportProjectId,taskId:this.reportTaskId,content:this.reportContent,progress:this.reportProgress,date:new Date().toISOString().slice(0,10)});
      if(this.reportTaskId&&this.reportProjectId){const p=this.projects.find(pp=>pp.id===this.reportProjectId);if(p){const t=p.wbs.find(t=>t.id===this.reportTaskId);if(t){t.progress=this.reportProgress;if(t.progress>=100){t.status='completed';t.isRed=false;}else if(t.progress>0)t.status='in_progress';}}}
      this.reportContent=''; this.saveAll(); this.showToast('日报提交成功','success');
    },
    getProjectName(id) { return this.projects.find(p=>p.id===id)?.name||''; },

    uploadFile(event, stage) {
      for (const f of event.target.files) { this.allUploadedFiles.push({id:'file_'+Date.now()+'_'+Math.random().toString(36).slice(2,6),name:f.name,size:f.size>1048576?(f.size/1048576).toFixed(1)+' MB':(f.size/1024).toFixed(0)+' KB',uploadedBy:this.currentUser.id,date:new Date().toISOString().slice(0,10),stage,projectId:this.currentProjectId||''}); }
      event.target.value=''; this.saveAll(); this.showToast('文件上传成功','success');
    },
    getStageFiles(stage) { return this.allUploadedFiles.filter(f=>f.stage===stage); },

    // ===== AI Tool Methods =====
    openTool(tool) { this.activeTool=tool; this.toolInput=''; this.toolOutput=''; this.toolOutputAnimating=false; this.routeTarget=''; this.routeNote=''; this.showToolModal=true; },
    runTool() {
      const fullOutput = generateToolOutput(this.activeTool, this.toolInput);
      this.toolOutput = '';
      this.toolOutputAnimating = true;
      let i = 0;
      const step = () => {
        if (i < fullOutput.length) {
          const chunk = Math.min(8, fullOutput.length - i);
          this.toolOutput += fullOutput.slice(i, i + chunk);
          i += chunk;
          setTimeout(step, 15);
        } else {
          this.toolOutputAnimating = false;
        }
      };
      step();
    },
    routeToolOutput() {
      const output = {
        id: 'to_'+Date.now(),
        toolId: this.activeTool.id, toolName: this.activeTool.name, toolIcon: this.activeTool.icon,
        content: this.toolOutput, preview: this.toolOutput.slice(0, 80),
        fromUser: this.currentUser.id, routedTo: this.routeTarget, routeNote: this.routeNote,
        date: new Date().toISOString().slice(0, 10), read: false,
      };
      this.toolOutputs.push(output);
      this.showToolModal = false;
      this.saveAll();
      const targetName = this.getUserName(this.routeTarget);
      this.showToast(`已发送给 ${targetName}，对方将收到高亮提醒`, 'success');
    },
    openToolResult(n) { this.viewingOutput = n.ref || n; this.showOutputDetailModal = true; },
    viewOutputDetail(o) { this.viewingOutput = o; this.showOutputDetailModal = true; },
    markOutputRead(o) { o.read = true; this.showOutputDetailModal = false; this.saveAll(); this.showToast('已标记为已处理','success'); },

    addCustomTool() {
      if (!this.customTool.name) return;
      this.customTools.push({
        id: 'custom_'+Date.now(), name: this.customTool.name, icon: this.customTool.icon || '🔧',
        description: this.customTool.description || '自定义AI工具', deptKey: this.customTool.deptKey || this.currentUser.deptKey,
        placeholder: '请输入需要AI处理的内容...',
      });
      this.showAddToolModal = false;
      this.customTool = { name:'', icon:'🔧', description:'', deptKey:'' };
      this.saveAll();
      this.showToast('工具添加成功','success');
    },

    // ===== Notification Center =====
    addSystemNotification(type, icon, title, body, userId) {
      this.systemNotifications.push({
        id: 'sn_' + Date.now() + '_' + Math.random().toString(36).slice(2, 5),
        type, icon, title, body, userId,
        date: new Date().toISOString().slice(0, 10),
        read: false,
      });
      this.saveAll();
    },
    markNotificationRead(n) {
      if (n.type === 'tool' && n.ref) {
        n.ref.read = true;
      } else if (n.ref && n.ref.id) {
        const sn = this.systemNotifications.find(s => s.id === n.ref.id);
        if (sn) sn.read = true;
      }
      n.read = true;
      this.saveAll();
    },
    markAllNotificationsRead() {
      for (const n of this.allNotificationsList) {
        if (!n.read) this.markNotificationRead(n);
      }
      this.showToast('全部标记为已读', 'success');
    },
    handleNotificationClick(n) {
      this.markNotificationRead(n);
      if (n.type === 'tool' && n.ref) {
        this.viewingOutput = n.ref;
        this.showOutputDetailModal = true;
      } else if (n.type === 'urgent' && n.ref?.projectId) {
        this.openProject(n.ref.projectId);
        this.currentStage = 'started';
      } else if (n.type === 'approval' && n.ref?.projectId) {
        this.openProject(n.ref.projectId);
      }
    },

    // ===== Kanban Drag & Drop =====
    onDragStart(task, event) {
      this.draggedTask = task;
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', task.id);
      event.target.classList.add('dragging');
    },
    onDragEnd(event) {
      event.target.classList.remove('dragging');
      this.draggedTask = null;
    },
    onDragOver(event) {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    },
    onDragEnter(event) {
      event.preventDefault();
      const col = event.currentTarget;
      col.classList.add('drag-over');
    },
    onDragLeave(event) {
      const col = event.currentTarget;
      if (!col.contains(event.relatedTarget)) {
        col.classList.remove('drag-over');
      }
    },
    onDrop(newStatus, event) {
      event.preventDefault();
      event.currentTarget.classList.remove('drag-over');
      if (!this.draggedTask) return;
      this.draggedTask.status = newStatus;
      if (newStatus === 'completed') { this.draggedTask.progress = 100; this.draggedTask.isRed = false; }
      else if (newStatus === 'in_progress' && this.draggedTask.progress === 0) { this.draggedTask.progress = 10; }
      else if (newStatus === 'pending') { this.draggedTask.progress = 0; }
      this.saveProjects();
      this.draggedTask = null;
    },

    // ===== Gantt Chart =====
    ganttBarStyle(task) {
      const gd = this.ganttData;
      const start = task.startDay || 0;
      const dur = task.duration || Math.ceil(task.estimatedHours / 8);
      const left = (start / gd.maxDay) * 100;
      const width = (dur / gd.maxDay) * 100;
      const colors = { hardware: '#3b82f6', software: '#8b5cf6', structure: '#f59e0b', engineering: '#10b981', quality: '#6366f1' };
      const bg = colors[task.deptKey] || '#6b7280';
      return { left: left + '%', width: Math.max(width, 2) + '%', background: bg };
    },
    ganttDayLabels() {
      const max = this.ganttData.maxDay;
      const labels = [];
      for (let i = 0; i <= max; i += Math.max(1, Math.floor(max / 10))) {
        labels.push({ day: i, left: (i / max) * 100 + '%' });
      }
      return labels;
    },

    // ===== Dashboard Charts (ECharts) =====
    initDashboardCharts() {
      if (typeof echarts === 'undefined') return;
      this.$nextTick(() => {
        this.renderProjectStatusChart();
        this.renderTaskDeptChart();
        this.renderTaskStatusChart();
        this.renderWorkloadChart();
      });
    },
    renderProjectStatusChart() {
      const el = document.getElementById('chart-project-status');
      if (!el) return;
      const chart = echarts.init(el);
      const data = Object.entries(this.dashboardStats.projectsByStatus).map(([name, value]) => ({ name, value }));
      chart.setOption({
        title: { text: '项目状态分布', left: 'center', textStyle: { fontSize: 14 } },
        tooltip: { trigger: 'item' },
        series: [{ type: 'pie', radius: ['40%', '70%'], data: data.length ? data : [{ name: '暂无项目', value: 1 }], label: { fontSize: 11 }, emphasis: { itemStyle: { shadowBlur: 10 } } }],
      });
    },
    renderTaskDeptChart() {
      const el = document.getElementById('chart-task-dept');
      if (!el) return;
      const chart = echarts.init(el);
      const entries = Object.entries(this.dashboardStats.tasksByDept);
      chart.setOption({
        title: { text: '各部门任务量', left: 'center', textStyle: { fontSize: 14 } },
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: entries.map(e => e[0]), axisLabel: { fontSize: 10, rotate: 20 } },
        yAxis: { type: 'value' },
        series: [{ type: 'bar', data: entries.map(e => e[1]), itemStyle: { borderRadius: [4, 4, 0, 0] }, colorBy: 'data' }],
      });
    },
    renderTaskStatusChart() {
      const el = document.getElementById('chart-task-status');
      if (!el) return;
      const chart = echarts.init(el);
      const s = this.dashboardStats.tasksByStatus;
      chart.setOption({
        title: { text: '任务进度', left: 'center', textStyle: { fontSize: 14 } },
        tooltip: { trigger: 'item' },
        color: ['#94a3b8', '#3b82f6', '#10b981'],
        series: [{ type: 'pie', radius: '65%', data: [{ name: '待办', value: s.pending }, { name: '进行中', value: s.in_progress }, { name: '已完成', value: s.completed }], label: { fontSize: 11 } }],
      });
    },
    renderWorkloadChart() {
      const el = document.getElementById('chart-workload');
      if (!el) return;
      const chart = echarts.init(el);
      const deptLoad = {};
      for (const p of this.projects) {
        for (const t of p.wbs) {
          if (!t.parentId) {
            const dk = t.deptKey || 'other';
            if (!deptLoad[dk]) deptLoad[dk] = { total: 0, completed: 0 };
            deptLoad[dk].total += t.estimatedHours;
            if (t.status === 'completed') deptLoad[dk].completed += t.estimatedHours;
          }
        }
      }
      const depts = Object.keys(deptLoad);
      const deptNames = depts.map(dk => { const d = DEPARTMENTS.find(x => x.key === dk); return d ? d.name : dk; });
      chart.setOption({
        title: { text: '部门工时负载', left: 'center', textStyle: { fontSize: 14 } },
        tooltip: { trigger: 'axis' },
        legend: { bottom: 0, textStyle: { fontSize: 10 } },
        xAxis: { type: 'category', data: deptNames, axisLabel: { fontSize: 10, rotate: 20 } },
        yAxis: { type: 'value', name: '工时(h)' },
        series: [
          { name: '总工时', type: 'bar', data: depts.map(dk => deptLoad[dk].total), itemStyle: { borderRadius: [4, 4, 0, 0] } },
          { name: '已完成', type: 'bar', data: depts.map(dk => deptLoad[dk].completed), itemStyle: { borderRadius: [4, 4, 0, 0] } },
        ],
      });
    },

    // ===== PRD Version History =====
    savePRDVersion(project, label) {
      if (!project.prd.versions) project.prd.versions = [];
      project.prd.versions.push({
        version: project.prd.versions.length + 1,
        content: project.prd.content,
        label: label || 'V' + (project.prd.versions.length + 1),
        date: new Date().toISOString().slice(0, 10),
        author: this.currentUser?.id || '',
      });
    },
    openVersionHistory() {
      if (!this.currentProject?.prd?.versions?.length) {
        this.showToast('暂无历史版本', 'warn');
        return;
      }
      const vs = this.currentProject.prd.versions;
      this.comparingVersions = [Math.max(0, vs.length - 2), vs.length - 1];
      this.computeVersionDiff();
      this.showVersionModal = true;
    },
    computeVersionDiff() {
      const vs = this.currentProject?.prd?.versions;
      if (!vs || vs.length < 2) { this.versionDiff = []; return; }
      const [oi, ni] = this.comparingVersions;
      const oldContent = vs[oi]?.content || '';
      const newContent = vs[ni]?.content || '';
      this.versionDiff = computeSimpleDiff(oldContent, newContent);
    },
    onVersionSelectChange() {
      this.computeVersionDiff();
    },

    // ===== Export Functions =====
    exportPRD() {
      if (!this.currentProject?.prd?.content) return;
      const content = this.currentProject.prd.content;
      this.downloadFile(content, `${this.currentProject.name}_PRD_V${this.currentProject.prd.version}.txt`, 'text/plain');
      this.showToast('PRD已导出', 'success');
    },
    exportWBS() {
      if (!this.currentProject?.wbs?.length) return;
      const lines = ['任务名称,部门,预估工时(h),状态,进度(%),负责人'];
      for (const t of this.currentProject.wbs) {
        lines.push(`"${t.name}","${t.department}",${t.estimatedHours},"${this.wbsStatusLabel(t.status)}",${t.progress},"${this.getUserName(t.assignee)}"`);
      }
      this.downloadFile(lines.join('\n'), `${this.currentProject.name}_WBS.csv`, 'text/csv');
      this.showToast('WBS已导出为CSV', 'success');
    },
    exportMeeting() {
      if (!this.currentProject?.meeting?.summary) return;
      const content = this.currentProject.meeting.summary;
      this.downloadFile(content, `${this.currentProject.name}_会议纪要.txt`, 'text/plain');
      this.showToast('会议纪要已导出', 'success');
    },
    downloadFile(content, filename, mimeType) {
      const bom = '\uFEFF';
      const blob = new Blob([bom + content], { type: mimeType + ';charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = filename;
      document.body.appendChild(a); a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    wbsStatusLabel(s) { return { pending: '待开始', in_progress: '进行中', completed: '已完成' }[s] || s; },

    // ===== Helpers =====
    getUserName(id) { return this.users.find(u=>u.id===id)?.name||'未知'; },
    statusLabel(s) { return {prd_draft:'PRD编写中',prd_review:'PRD审核中',pm_assign:'指派PM',wbs_generate:'WBS分解',team_building:'团队组建',meeting:'项目评审',prd_confirm:'PRD确认',started:'已启动'}[s]||s; },
    stageProgress(p) { return Math.round(((STAGE_ORDER.indexOf(p.status)+1)/STAGE_ORDER.length)*100); },
    isStageCompleted(sk,p) { return STAGE_ORDER.indexOf(sk)<STAGE_ORDER.indexOf(p.status); },
    renderDoc(c) { return c?c.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>'):''; },
    showToast(msg, type='success') { this.toast={show:true,msg,type}; setTimeout(()=>{this.toast.show=false;},2500); },

    saveProjects() { try{localStorage.setItem('ai_rd_projects',JSON.stringify(this.projects));}catch(e){} },
    saveAll() {
      this.saveProjects();
      try{
        localStorage.setItem('ai_rd_reports',JSON.stringify(this.reports));
        localStorage.setItem('ai_rd_files',JSON.stringify(this.allUploadedFiles));
        localStorage.setItem('ai_rd_tool_outputs',JSON.stringify(this.toolOutputs));
        localStorage.setItem('ai_rd_custom_tools',JSON.stringify(this.customTools));
        localStorage.setItem('ai_rd_sys_notifications',JSON.stringify(this.systemNotifications));
      }catch(e){}
    },
    loadData() {
      try{
        const p=localStorage.getItem('ai_rd_projects'); if(p) this.projects=JSON.parse(p);
        const r=localStorage.getItem('ai_rd_reports'); if(r) this.reports=JSON.parse(r);
        const f=localStorage.getItem('ai_rd_files'); if(f) this.allUploadedFiles=JSON.parse(f);
        const to=localStorage.getItem('ai_rd_tool_outputs'); if(to) this.toolOutputs=JSON.parse(to);
        const ct=localStorage.getItem('ai_rd_custom_tools'); if(ct) this.customTools=JSON.parse(ct);
        const sn=localStorage.getItem('ai_rd_sys_notifications'); if(sn) this.systemNotifications=JSON.parse(sn);
        // Migrate: ensure prd.versions exists
        for (const proj of this.projects) {
          if (proj.prd && !proj.prd.versions) proj.prd.versions = [];
        }
      }catch(e){}
    },
  },
  mounted() { this.loadData(); },
}).mount('#app');
