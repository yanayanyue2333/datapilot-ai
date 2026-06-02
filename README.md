# DataPilot AI

DataPilot AI is a responsible AI data assistant that knows when not to answer, turns missing metric definitions into governance workflows, and converts data anomalies into actionable triage tasks.

## Live Demo

Live demo: _Add Vercel URL here after deployment._

## Screenshots

Screenshots: _Add portfolio screenshots here after capturing the flows in `SCREENSHOT_CHECKLIST.md`._

## Tech Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- shadcn-style local UI primitives
- Zustand with localStorage persistence
- Recharts-ready mock data
- Framer Motion-ready frontend foundation
- Mock mode by default, no backend required

## Best Demo Path

1. Open `/assistant` and ask `为什么本月利润下降？`.
2. Show honest refusal because `profit / 利润` is missing.
3. Submit the metric definition request.
4. Approve it in `/review`.
5. Confirm it appears in `/metric-registry`.
6. Ask the same question again in `/assistant` and show the governed answer.
7. Open `/daily-triage`, `/ops`, `/review`, and `/case-study` for the portfolio highlights.

For a scripted walkthrough, see `DEMO_GUIDE.md`.

## Target Role Fit

This project is tailored for:

- AI Data Assistant Product Manager
- Agent Skill Product Manager
- Data Product Manager
- AI SaaS Product Manager
- Product Operations / Product Analytics Intern

## Key Product Highlights

- Honest refusal when metric definitions are missing
- Metric Registry approval loop from user request to analyst approval
- Daily Triage workflow for anomaly -> drilldown -> hypothesis -> recommendation -> follow-up task
- Product Ops dashboard with False Rejection Log and semantic mapping updates
- Analyst Review safety mechanism for SQL scope, abnormal dates, and business caveats
- Agent Skill Gallery with usage, satisfaction, failure rate, and iteration metadata

## Local Run Commands

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Why This Project Is Different

DataPilot AI is not a generic chatbot or a static BI dashboard.

- It does not hallucinate undefined metrics.
- It turns user questions into metric governance assets.
- It uses analyst review for risky data analysis.
- It learns from false rejections and user corrections.
- It frames BI as a workflow, not a static dashboard.

## Core Product Mechanisms

- Natural language data assistant with product-level analysis trace
- Metric Registry with owners, formulas, aliases, data sources, caveats, and status
- Honest refusal for undefined or ambiguous metrics
- Agent Skill Gallery for repeatable product analytics workflows
- Analyst review queue for risky or misleading findings
- Product operations feedback loop for false rejections and quality metrics

## Product Mechanism Highlights

### Daily Triage

DataPilot AI treats daily business review as an action workflow. The flow moves from anomaly detection to drilldown, cause hypothesis, recommendation, and follow-up task creation. This demonstrates how an AI data assistant can guide PMs through ambiguous business movement instead of only displaying KPI cards.

### False Rejection Learning Loop

The Product Ops dashboard shows how user corrections become semantic mapping updates. When users say things like `单量走得有点疲` or `投放是不是亏了`, the product learns to map business language to orders decline analysis and channel ROI analysis. This improves Agent Skill routing and business-language understanding over time.

### Analyst Review Safety Mechanism

The Analyst Review queue demonstrates how human review catches SQL scope mistakes, abnormal event dates, metric ambiguity, and sample bias. The GMV review story shows an AI analysis overstating growth because it included the 6.18 promotion day, then revises the conclusion after analyst correction.

### Job Description Fit

These mechanisms support AI data assistant iteration, Agent Skill design, user insight synthesis, product operations, and cross-functional review with data teams. They show the product manager can design beyond a chat UI: defining governance loops, evaluation signals, review workflows, and operational learning mechanisms.

## Page Overview

- `/`: portfolio landing page and recommended demo flow
- `/assistant`: honest refusal and governed answer experience
- `/daily-triage`: daily PM anomaly triage workflow
- `/skills`: Agent Skill Gallery
- `/skills/[id]`: skill detail page
- `/metric-registry`: governed metric definitions and approved profit state
- `/review`: metric approval loop and GMV correction story
- `/ops`: product operations dashboard and false rejection learning loop
- `/ai-radar`: AI product research notes
- `/prd`: PRD workspace placeholder
- `/case-study`: portfolio narrative and JD fit

## Data Model Overview

The domain model includes metric definitions, metric requests, review actions, data questions, AI answers, analysis trace steps, agent skills, skill runs, skill evaluations, user research insights, usage logs, false rejection logs, analysis reviews, AI radar items, PRD sections, and case study sections.

## Agent Skill Design

Skills are treated as productized workflows with target users, use cases, input parameters, output structures, usage counts, satisfaction scores, failure rates, and iteration notes.

## Metric Registry Governance

The Metric Registry is the source of truth. It contains GMV, revenue, orders, paid orders, conversion rate, retention rate, CAC, and ROI. Profit is intentionally missing in the default mock data so the honest refusal and approval loop can be demonstrated.

## Honest Refusal Mechanism

When required metric definitions are missing, DataPilot AI refuses to answer directly, explains the missing governance asset, suggests alternative analysis paths using available metrics, and offers a CTA to submit a metric definition request.

## Analyst Review And Human-In-The-Loop Design

The review page supports both metric definition approval and analysis correction. The GMV correction story shows a realistic issue: the AI analysis included the 6.18 promotion day and overstated natural GMV growth.

## Product Operations Feedback Loop

The ops surface tracks DAU, question count, skill usage, satisfaction, failure rate, low-confidence answer ratio, human intervention rate, top failed question types, recent iteration notes, and false rejection logs.

## Deployment Readiness

The project runs in mock mode by default.

- No required secrets
- No external database
- No real API calls
- No real LLM calls
- Optional API placeholders are documented in `.env.example`

## Vercel Deployment

1. Push the repository to GitHub.
2. Import the repository in Vercel.
3. Use the default Next.js settings.
4. No environment variables are required for the current MVP.
5. Run command: `npm run build`
6. Output is handled by Next.js automatically.

The repository also includes `vercel.json` with the same deployment defaults:

```json
{
  "framework": "nextjs",
  "installCommand": "npm install",
  "buildCommand": "npm run build",
  "outputDirectory": ".next"
}
```

## Resume Bullet Points

- Designed a responsible AI data assistant that refuses undefined metric analysis instead of hallucinating business conclusions.
- Built an Agent Skill product foundation with metric governance, human review, product operations feedback, and portfolio-ready UI.
- Modeled realistic AI data product domain entities, including Metric Registry, analysis trace, analyst review, skill evaluation, and false rejection logs.
- Built a Daily Triage workflow that turns anomalies into drilldowns, hypotheses, recommendations, and follow-up tasks.
- Designed a false rejection learning loop where user corrections update semantic mappings and improve Agent Skill routing.
- Created an Analyst Review safety mechanism that catches SQL scope mistakes and abnormal-date bias before AI analysis informs product decisions.
