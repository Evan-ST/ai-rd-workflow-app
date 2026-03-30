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
  // 产品部
  { id: 'prod_mgr', name: '王芳', role: 'dept_manager', title: '产品部经理', department: '产品部', deptKey: 'product', avatar: '👩‍💼' },
  { id: 'pm1', name: '张明', role: 'product_manager', title: '产品经理', department: '产品部', deptKey: 'product', avatar: '👤' },
  { id: 'graphic1', name: '林雪', role: 'engineer', title: '平面工程师', department: '产品部', deptKey: 'product', specialty: '平面工程师', avatar: '🎨' },
  { id: 'brand1', name: '黄涛', role: 'engineer', title: '品牌设计师', department: '产品部', deptKey: 'product', specialty: '品牌设计师', avatar: '✏️' },
  // 项目部
  { id: 'dept_mgr', name: '李总', role: 'dept_manager', title: '项目部经理', department: '项目部', deptKey: 'project', avatar: '👔' },
  { id: 'pm_wang', name: '王强', role: 'project_manager', title: '项目经理', department: '项目部', deptKey: 'project', avatar: '📊' },
  { id: 'pm_zhao', name: '赵刚', role: 'project_manager', title: '项目经理', department: '项目部', deptKey: 'project', avatar: '📋' },
  { id: 'pm_assist', name: '小陈', role: 'engineer', title: '项目助理', department: '项目部', deptKey: 'project', specialty: '项目助理', avatar: '📎' },
  // 硬件研发部
  { id: 'hw_lead', name: '陈华', role: 'dept_lead', title: '硬件经理', department: '硬件研发部', deptKey: 'hardware', avatar: '⚡' },
  { id: 'hw_eng1', name: '钱波', role: 'engineer', title: '硬件工程师', department: '硬件研发部', deptKey: 'hardware', specialty: '硬件工程师', avatar: '🔌' },
  { id: 'hw_eng2', name: '韩超', role: 'engineer', title: '硬件工程师', department: '硬件研发部', deptKey: 'hardware', specialty: '硬件工程师', avatar: '🔌' },
  { id: 'hw_test1', name: '宋磊', role: 'engineer', title: '硬件测试工程师', department: '硬件研发部', deptKey: 'hardware', specialty: '硬件测试工程师', avatar: '🧪' },
  { id: 'layout1', name: '冯达', role: 'engineer', title: 'Layout工程师', department: '硬件研发部', deptKey: 'hardware', specialty: 'Layout工程师', avatar: '📐' },
  { id: 'rf_eng1', name: '唐峰', role: 'engineer', title: '射频工程师', department: '硬件研发部', deptKey: 'hardware', specialty: '射频工程师', avatar: '📡' },
  { id: 'optics1', name: '蒋明', role: 'engineer', title: '光学工程师', department: '硬件研发部', deptKey: 'hardware', specialty: '光学工程师', avatar: '🔭' },
  // 结构组
  { id: 'st_lead', name: '周磊', role: 'dept_lead', title: '结构经理', department: '结构组', deptKey: 'structure', avatar: '🔧' },
  { id: 'st_eng1', name: '何鑫', role: 'engineer', title: '结构工程师', department: '结构组', deptKey: 'structure', specialty: '结构工程师', avatar: '📏' },
  { id: 'st_eng2', name: '马军', role: 'engineer', title: '结构工程师', department: '结构组', deptKey: 'structure', specialty: '结构工程师', avatar: '📏' },
  // 软件组
  { id: 'sw_lead', name: '刘洋', role: 'dept_lead', title: '软件经理', department: '软件组', deptKey: 'software', avatar: '💻' },
  { id: 'sw_eng1', name: '杨帆', role: 'engineer', title: '软件工程师', department: '软件组', deptKey: 'software', specialty: '软件工程师', avatar: '⌨️' },
  { id: 'sw_eng2', name: '徐涛', role: 'engineer', title: '软件工程师', department: '软件组', deptKey: 'software', specialty: '软件工程师', avatar: '⌨️' },
  { id: 'sw_test1', name: '曹静', role: 'engineer', title: '软件研发测试工程师', department: '软件组', deptKey: 'software', specialty: '软件测试工程师', avatar: '🔍' },
  // 工程部
  { id: 'eng_lead', name: '郑伟', role: 'dept_lead', title: '工程部经理', department: '工程部', deptKey: 'engineering', avatar: '🏭' },
  { id: 'npi_eng1', name: '邓辉', role: 'engineer', title: 'NPI工程师', department: '工程部', deptKey: 'engineering', specialty: 'NPI工程师', avatar: '⚙️' },
  { id: 'process_eng1', name: '田勇', role: 'engineer', title: '工艺工程师', department: '工程部', deptKey: 'engineering', specialty: '工艺工程师', avatar: '🔩' },
  { id: 'prod_eng1', name: '吕亮', role: 'engineer', title: '生产工程师', department: '工程部', deptKey: 'engineering', specialty: '生产工程师', avatar: '🏭' },
  // 品质部
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
    sch_review: `【原理图审查报告】\n审查日期：${date}\n\n审查范围：${input}\n\n发现问题 3 项：\n\n[严重] 1. 电源去耦电容不足\n  位置：U1供电引脚\n  建议：在VDD引脚增加100nF+10uF去耦电容\n\n[警告] 2. 未使用引脚未做处理\n  位置：MCU GPIO_PA5, PA6\n  建议：通过电阻下拉或上拉处理\n\n[建议] 3. ESD防护缺失\n  位置：USB接口\n  建议：增加TVS保护二极管\n\n审查通过率：87%\n建议修改后重新审查\n\n[AI审查结果，请资深工程师复核]`,
    fmea_gen: `【FMEA分析报告】\n生成日期：${date}\n分析对象：${input}\n\n| 序号 | 失效模式 | 失效影响 | 严重度S | 发生度O | 检测度D | RPN | 建议措施 |\n|------|----------|----------|---------|---------|---------|-----|----------|\n| 1 | 主板短路 | 产品无法工作 | 9 | 3 | 4 | 108 | 增加ICT测试 |\n| 2 | 固件崩溃 | 功能异常 | 7 | 4 | 5 | 140 | 增加看门狗+OTA |\n| 3 | 外壳变形 | 外观不良 | 5 | 3 | 3 | 45 | 优化模具冷却 |\n| 4 | 电池膨胀 | 安全隐患 | 10 | 2 | 4 | 80 | 增加电池管理IC |\n\n高风险项（RPN>100）需优先改善\n\n[AI生成，请品质团队评审确认]`,
    sop_gen: `【标准作业指导书 SOP】\n文档编号：SOP-${Date.now().toString(36).toUpperCase()}\n生成日期：${date}\n\n工艺描述：${input}\n\n一、目的\n规范产线作业流程，确保产品质量一致性\n\n二、适用范围\n适用于XXX产品的SMT贴片和组装工站\n\n三、作业步骤\n\n工站1：来料检验\n  ① 核对物料编码与BOM一致\n  ② 检查外观无破损\n  ③ 记录批次号\n\n工站2：SMT上料\n  ① 确认钢网与PCB型号匹配\n  ② 锡膏厚度检测（目标150±30μm）\n  ③ 首件确认\n\n工站3：回流焊接\n  ① 温度曲线确认\n  ② 每2小时检测一次焊接质量\n\n工站4：功能测试\n  ① 连接测试治具\n  ② 执行自动化测试脚本\n  ③ 记录测试结果\n\n[AI生成SOP模板，请工程部根据实际工艺完善]`,
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
  const t = (n, dept, dk, h, pid) => ({ id:'task_'+(++tid), name:n, department:dept, deptKey:dk, estimatedHours:h, parentId:pid||null, assignee:'', status:'pending', progress:0, isRed:false });
  const tasks = [];
  const hw1 = t('硬件方案设计','硬件研发部','hardware',40,null); tasks.push(hw1);
  tasks.push(t('主控方案选型与评估','硬件研发部','hardware',16,hw1.id));
  tasks.push(t('原理图设计','硬件研发部','hardware',24,hw1.id));
  tasks.push(t('PCB Layout设计','硬件研发部','hardware',32,hw1.id));
  tasks.push(t('硬件调试与验证','硬件研发部','hardware',24,hw1.id));
  const sw1 = t('软件开发','软件组','software',60,null); tasks.push(sw1);
  tasks.push(t('嵌入式固件架构设计','软件组','software',16,sw1.id));
  tasks.push(t('驱动层开发','软件组','software',24,sw1.id));
  tasks.push(t('应用层功能开发','软件组','software',40,sw1.id));
  tasks.push(t('通信协议开发','软件组','software',20,sw1.id));
  const st1 = t('结构设计','结构组','structure',40,null); tasks.push(st1);
  tasks.push(t('ID外观设计','结构组','structure',16,st1.id));
  tasks.push(t('3D建模与仿真','结构组','structure',24,st1.id));
  tasks.push(t('模具评审与开模','结构组','structure',32,st1.id));
  const en1 = t('工程导入','工程部','engineering',30,null); tasks.push(en1);
  tasks.push(t('BOM整理与物料导入','工程部','engineering',12,en1.id));
  tasks.push(t('生产工艺制定','工程部','engineering',16,en1.id));
  tasks.push(t('试产与产线验证','工程部','engineering',20,en1.id));
  const qa1 = t('品质管控','品质部','quality',24,null); tasks.push(qa1);
  tasks.push(t('IQC来料检验标准','品质部','quality',8,qa1.id));
  tasks.push(t('制程品质管控方案','品质部','quality',10,qa1.id));
  tasks.push(t('OQC出货检验标准','品质部','quality',8,qa1.id));
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
      // AI Tools
      showToolModal: false, activeTool: {}, toolInput: '', toolOutput: '',
      routeTarget: '', routeNote: '',
      toolOutputs: [], // { id, toolId, toolName, toolIcon, content, preview, fromUser, routedTo, routedTask, routeNote, date, read }
      showOutputDetailModal: false, viewingOutput: {},
      showAddToolModal: false, customTool: { name: '', icon: '🔧', description: '', deptKey: '' },
      customTools: [], // user-added tools
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
    inProgressTasks() { return this.currentProject ? this.currentProject.wbs.filter(t => t.status==='in_progress').length : 0; },
    completedTasks() { return this.currentProject ? this.currentProject.wbs.filter(t => t.status==='completed').length : 0; },
    redTasks() { return this.currentProject ? this.currentProject.wbs.filter(t => t.isRed).length : 0; },
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

    // Tool-related
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

  methods: {
    getDeptUsers(deptKey) { return this.users.filter(u => u.deptKey === deptKey); },
    login(user) { this.currentUser = user; this.view = 'dashboard'; this.showToast(`欢迎，${user.name}（${user.title}）`, 'success'); },
    goToAction(a) { this.openProject(a.projectId); this.currentStage = a.stage; },
    openProject(id) { this.currentProjectId = id; const p = this.projects.find(pp => pp.id === id); if (p) this.currentStage = p.status; this.editingPRD = false; this.view = 'project'; },
    openCreateProject() { this.newProject = { name:'', description:'', type:'智能硬件' }; this.showCreateModal = true; },

    createProject() {
      const p = { id:'proj_'+Date.now(), name:this.newProject.name, description:this.newProject.description, type:this.newProject.type, status:'prd_draft', createdBy:this.currentUser.id, createdAt:new Date().toISOString().slice(0,10), projectManager:null, prd:{content:'',version:1,confirmed:false}, wbs:[], team:{hardware:[],software:[],structure:[],engineering:[],quality:[]}, teamConfirmed:{hardware:false,software:false,structure:false,engineering:false,quality:false}, meeting:{scheduled:false,date:null,time:null,room:null,summary:null}, files:[] };
      this.projects.push(p); this.showCreateModal = false; this.saveProjects(); this.showToast('项目创建成功','success'); this.openProject(p.id);
    },

    generatePRD() { const p=this.currentProject; p.prd.content=generatePRDContent(p.name,p.description,p.type); this.saveProjects(); this.showToast('AI 已生成PRD文档','info'); },
    submitPRD() { this.currentProject.status='prd_review'; this.currentStage='prd_review'; this.saveProjects(); this.showToast('PRD已提交审核','success'); },
    approvePRD() { this.currentProject.status='pm_assign'; this.currentStage='pm_assign'; this.saveProjects(); this.showToast('PRD审核通过','success'); },
    assignPM() { this.currentProject.status='wbs_generate'; this.currentStage='wbs_generate'; this.saveProjects(); this.showToast('项目经理已指派','success'); },
    generateWBS() { this.currentProject.wbs=generateWBSTasks(this.currentProject.name,this.currentProject.type); this.saveProjects(); this.showToast('AI 已生成WBS','info'); },
    submitWBS() { this.currentProject.status='team_building'; this.currentStage='team_building'; this.saveProjects(); this.showToast('任务已分发','success'); },
    confirmDeptTeam(dk) { this.currentProject.teamConfirmed[dk]=true; this.saveProjects(); this.showToast('人员已确认','success'); },
    completeTeamBuilding() { this.currentProject.status='meeting'; this.currentStage='meeting'; this.saveProjects(); this.showToast('团队组建完成','success'); },
    scheduleMeeting() { const p=this.currentProject; p.meeting.scheduled=true; p.meeting.date=this.meetingDate; p.meeting.time=this.meetingTime; p.meeting.room=this.meetingRoom; this.saveProjects(); this.showToast('会议已预约','success'); },
    generateMeetingSummary() { this.currentProject.meeting.summary=generateMeetingSummaryContent(this.currentProject); this.saveProjects(); this.showToast('AI 已生成会议纪要','info'); },
    advanceToConfirm() { const p=this.currentProject; p.prd.content=generateRevisedPRD(p.prd.content); p.prd.version=2; p.status='prd_confirm'; this.currentStage='prd_confirm'; this.saveProjects(); this.showToast('AI 已修改PRD','info'); },
    confirmFinalPRD() { const p=this.currentProject; p.prd.confirmed=true; p.status='started'; this.currentStage='started'; this.saveProjects(); this.showToast('🚀 项目正式启动！','success'); },

    addSubTask(parent) { this.subTaskParentId=parent.id; this.newSubTask={name:'',hours:8}; this.showSubTaskModal=true; },
    confirmAddSubTask() { if(!this.newSubTask.name)return; const par=this.currentProject.wbs.find(t=>t.id===this.subTaskParentId); this.currentProject.wbs.push({id:'task_'+Date.now(),name:this.newSubTask.name,department:par?.department||'',deptKey:par?.deptKey||'',estimatedHours:this.newSubTask.hours,parentId:this.subTaskParentId,assignee:'',status:'pending',progress:0,isRed:false}); this.showSubTaskModal=false; this.saveProjects(); },
    getChildren(pid) { return this.currentProject ? this.currentProject.wbs.filter(t=>t.parentId===pid) : []; },

    canSelectForDept(dk) { if(!this.currentProject||this.currentProject.status!=='team_building')return false; if(this.currentProject.teamConfirmed[dk])return false; const d=DEPARTMENTS.find(x=>x.key===dk); return this.currentUser.id===d?.leadId||this.currentUser.role==='dept_manager'; },
    getEngineersForDept(dk) { return this.users.filter(u=>u.role==='engineer'&&u.deptKey===dk); },
    isTeamMember(dk,uid) { return this.currentProject.team[dk]?.includes(uid); },
    toggleTeamMember(dk,uid) { const a=this.currentProject.team[dk]; const i=a.indexOf(uid); if(i>=0)a.splice(i,1); else a.push(uid); this.saveProjects(); },

    onRedToggle(task) { this.saveProjects(); if(task.isRed&&task.assignee) this.showToast(`任务已标红并抄送${this.getUserName(task.assignee)}的主管`,'warn'); },
    onTaskProgress(t) { if(t.task.progress>=100){t.task.status='completed';t.task.isRed=false;} else if(t.task.progress>0)t.task.status='in_progress'; this.saveProjects(); },
    onTaskStatusChange(t) { if(t.task.status==='completed'){t.task.progress=100;t.task.isRed=false;this.showToast('任务已完成，标红取消','success');} this.saveProjects(); },

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
    openTool(tool) { this.activeTool=tool; this.toolInput=''; this.toolOutput=''; this.routeTarget=''; this.routeNote=''; this.showToolModal=true; },
    runTool() {
      this.toolOutput = generateToolOutput(this.activeTool, this.toolInput);
      this.showToast('AI 生成完成','info');
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
    openToolResult(n) { this.viewingOutput = n; this.showOutputDetailModal = true; },
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
      }catch(e){}
    },
    loadData() {
      try{
        const p=localStorage.getItem('ai_rd_projects'); if(p) this.projects=JSON.parse(p);
        const r=localStorage.getItem('ai_rd_reports'); if(r) this.reports=JSON.parse(r);
        const f=localStorage.getItem('ai_rd_files'); if(f) this.allUploadedFiles=JSON.parse(f);
        const to=localStorage.getItem('ai_rd_tool_outputs'); if(to) this.toolOutputs=JSON.parse(to);
        const ct=localStorage.getItem('ai_rd_custom_tools'); if(ct) this.customTools=JSON.parse(ct);
      }catch(e){}
    },
  },
  mounted() { this.loadData(); },
}).mount('#app');
