# DataPilot AI

DataPilot AI 是一个负责任的 AI 数据助手作品集项目。它不会在指标未定义时编造业务结论，而是把缺失口径转化为可审核、可入库、可追踪的产品治理流程。

## 在线演示

- Live demo: [https://datapilot-ai-dusky.vercel.app](https://datapilot-ai-dusky.vercel.app)
- Impact Simulation: [https://datapilot-ai-dusky.vercel.app/impact](https://datapilot-ai-dusky.vercel.app/impact)
- AI Radar page: [https://datapilot-ai-dusky.vercel.app/ai-radar](https://datapilot-ai-dusky.vercel.app/ai-radar)

## GitHub 仓库

GitHub repo: [https://github.com/yanayanyue2333/datapilot-ai](https://github.com/yanayanyue2333/datapilot-ai)

## 技术栈

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- shadcn 风格本地 UI primitives
- Zustand + localStorage 持久化
- Recharts mock 效果图表
- 默认 mock 模式，无需后端

## 推荐演示路径

1. 打开 `/assistant`，提问：`为什么本月利润下降？`
2. 展示因为 `profit / 利润` 缺失而触发的诚实拒答。
3. 提交指标口径申请。
4. 在 `/review` 审批利润口径。
5. 在 `/metric-registry` 确认 profit / 利润 已进入指标口径库。
6. 回到 `/assistant` 再问同一个问题，展示基于经营毛利口径的受治理回答。
7. 继续查看 `/daily-triage`、`/ops`、`/review`、`/impact` 和 `/case-study` 的产品机制亮点。

更完整的讲解脚本见 `DEMO_GUIDE.md`。

## 目标岗位匹配

- AI 数据助手产品经理
- Agent Skill 产品经理
- 数据产品经理
- AI SaaS 产品经理
- 产品运营 / 产品分析实习岗位

## 产品亮点

- 当指标口径缺失时诚实拒答，而不是幻觉式回答。
- Metric Registry 审批闭环：从用户申请到分析师审核，再到口径入库。
- Daily Triage 工作流：异常发现、下钻拆解、假设形成、建议动作和复盘任务。
- Product Ops 看板：False Rejection Log、语义映射更新和产品迭代信号。
- Analyst Review 机制：在 SQL 范围、异常日期和业务 caveat 上提供人工审核。
- Agent Skill Gallery：展示技能使用次数、满意度、失败率和迭代记录。
- Impact Simulation：用明确标注的 mock 数据说明上线成功指标和业务影响评估框架。

## 核心产品机制

- 自然语言 AI 数据助手与产品级 Analysis Trace
- 带 owner、formula、aliases、data sources、caveats 和状态的 Metric Registry
- 面向未定义或含糊指标的 Honest Refusal
- 可复用产品分析工作流的 Agent Skill Gallery
- 面向高风险结论的 Analyst Review 队列
- 基于误拒和用户纠正的 Product Ops 反馈闭环
- 用于上线效果讲述的 Impact Simulation

## Impact Simulation

Impact Simulation 页面使用清晰标注的 mock 数据，说明 DataPilot AI 会如何评估上线成功。选择这些指标是因为它们直接对应产品机制：分析耗时和 GMV 异常定位耗时对应 Daily Triage，ROI 和 CAC 对应 Agent Skill 与增长运营，指标口径确认周期对应 Metric Registry 与 Analyst Review，答案采纳率对应诚实拒答、caveat 和产品级 Analysis Trace。

本项目中的数字均为作品集模拟数据，不代表真实商业结果。真实上线后，可以通过产品事件、Agent Skill 运行日志、分析师审核时间戳、语义映射更新和业务 KPI 监控来衡量。

## 页面概览

- `/`：作品集首页和推荐演示路径
- `/assistant`：诚实拒答与受治理回答体验
- `/daily-triage`：每日数据分诊工作流
- `/skills`：Agent Skill Gallery
- `/skills/[id]`：技能详情页
- `/metric-registry`：指标口径库和已审批 profit 状态
- `/review`：指标审批闭环和 GMV 纠错案例
- `/ops`：产品运营看板和误拒学习闭环
- `/impact`：上线效果模拟和成功指标框架
- `/ai-radar`：AI 产品研究记录
- `/prd`：PRD 工作区
- `/case-study`：项目案例和 JD Fit

## 本地运行

```bash
npm install
npm run dev
npm run lint
npm run build
```

## 部署说明

项目已部署到 Vercel：

- Production URL: [https://datapilot-ai-dusky.vercel.app](https://datapilot-ai-dusky.vercel.app)
- GitHub source: [https://github.com/yanayanyue2333/datapilot-ai](https://github.com/yanayanyue2333/datapilot-ai)

当前 MVP 不需要环境变量，不调用真实 LLM、不依赖外部数据库。

## 简历要点

- 设计负责任的 AI 数据助手，在指标未定义时诚实拒答，避免编造业务结论。
- 搭建 Agent Skill 产品底座，覆盖指标治理、人机审核、产品运营反馈和作品集级 UI。
- 建模 Metric Registry、Analysis Trace、Analyst Review、Skill Evaluation、False Rejection Log 等 AI 数据产品核心实体。
- 设计 Daily Triage 工作流，将业务异常转化为下钻路径、原因假设、建议动作和复盘任务。
- 设计误拒学习闭环，将用户纠正转化为语义映射更新并提升 Agent Skill 路由质量。
- 创建 Analyst Review 安全机制，在 AI 分析影响产品决策前识别 SQL 范围错误和异常日期偏差。
- 设计 Impact Simulation 上线效果模拟模块，围绕 GMV 异常定位、渠道 ROI、CAC、分析耗时、指标口径确认周期等指标建立产品成功指标体系，模拟评估 AI 数据助手对业务决策效率和增长运营的潜在影响。
