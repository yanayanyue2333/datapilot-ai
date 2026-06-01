# DataPilot AI

DataPilot AI is a portfolio-grade AI data assistant and Agent Skill platform for product management internship applications.

It is designed to demonstrate AI data product thinking: metric governance, honest refusal, analyst review, human-in-the-loop validation, product operations, user research synthesis, and AI product trend research.

## Target Role Fit

This project is tailored for AI Data Assistant Product Manager, Agent Skill Product Manager, Data Product Manager, AI SaaS Product Manager, and Product Operations / Product Analytics Intern roles.

## Why This Is Not A Generic Chatbot

DataPilot AI does not invent analysis when the product lacks trusted definitions. If a user asks why profit declined and `profit` is not in the Metric Registry, the assistant blocks the answer, explains the missing definition, suggests governed proxy metrics, and routes the user to a metric definition request.

## Core Product Mechanisms

- Natural language data assistant with product-level analysis trace
- Metric Registry with owners, formulas, grain, dimensions, status, and review dates
- Honest refusal for undefined or ambiguous metrics
- Agent Skill Gallery for repeatable product analytics workflows
- Analyst review queue for risky or misleading findings
- Product operations feedback loop for false rejections and quality metrics

## Product Mechanism Highlights

### Daily Triage

DataPilot AI treats daily business review as an action workflow, not a static dashboard. The flow moves from anomaly detection to drilldown, cause hypothesis, recommendation, and follow-up task creation. This demonstrates how an AI data assistant can guide PMs through ambiguous business movement instead of only displaying KPI cards.

### False Rejection Learning Loop

The Product Ops dashboard shows how user corrections become semantic mapping updates. When users say things like "单量走得有点疲" or "投放是不是亏了", the product learns to map business language to orders decline analysis and channel ROI analysis. This improves Agent Skill routing and business-language understanding over time.

### Analyst Review Safety Mechanism

The Analyst Review queue demonstrates how human review catches SQL scope mistakes, abnormal event dates, metric ambiguity, and sample bias. The GMV review story shows an AI analysis overstating growth because it included the 6.18 promotion day, then revises the conclusion after analyst correction.

### Job Description Fit

These mechanisms support AI data assistant iteration, Agent Skill design, user insight synthesis, product operations, and cross-functional review with data teams. They show the product manager can design beyond a chat UI: defining governance loops, evaluation signals, review workflows, and operational learning mechanisms.

## Page Overview

- `/`: portfolio landing page and mechanism overview
- `/assistant`: governed assistant placeholder
- `/daily-triage`: daily PM operating workflow
- `/skills`: Agent Skill Gallery
- `/skills/[id]`: skill detail page
- `/metric-registry`: governed metric definitions and requests
- `/review`: analyst correction story
- `/ops`: product operations dashboard
- `/ai-radar`: AI product research notes
- `/prd`: PRD workspace placeholder
- `/case-study`: case study narrative

## Tech Stack

Next.js App Router, TypeScript, Tailwind CSS, shadcn-style local UI primitives, Recharts-ready mock data, Framer Motion, Zustand-ready architecture, and local mock data for MVP speed.

## Data Model Overview

The domain model includes metric definitions, metric requests, review actions, data questions, AI answers, analysis trace steps, agent skills, skill runs, skill evaluations, user research insights, usage logs, false rejection logs, analysis reviews, AI radar items, PRD sections, and case study sections.

## Agent Skill Design

Skills are treated as productized workflows with target users, use cases, input parameters, output structures, usage counts, satisfaction scores, failure rates, and iteration notes.

## Metric Registry Governance

The Metric Registry is the source of truth. It contains GMV, revenue, orders, paid orders, conversion rate, retention rate, CAC, and ROI. Profit is intentionally missing in the default data so the honest refusal flow can be demonstrated.

## Honest Refusal Mechanism

When required metric definitions are missing, DataPilot AI should refuse to answer directly, explain the missing governance asset, suggest alternative analysis paths using available metrics, and offer a CTA to submit a definition request.

## Analyst Review And Human-In-The-Loop Design

The review page shows a realistic correction story: an AI analysis overstates GMV growth because it includes the 6.18 promotion day. The analyst rejects the answer and requests a recalculation excluding the abnormal event.

## Product Operations Feedback Loop

The ops surface tracks DAU, question count, skill usage, satisfaction, failure rate, low-confidence answer ratio, human intervention rate, top failed questions, and false rejection logs.

## Local Development

```bash
npm install
npm run dev
```

## Deployment

Deploy to Vercel or any Next.js-compatible host:

```bash
npm run build
```

## Resume Bullet Points

- Designed a responsible AI data assistant that refuses undefined metric analysis instead of hallucinating business conclusions.
- Built an Agent Skill product foundation with metric governance, human review, product operations feedback, and portfolio-ready UI.
- Modeled realistic AI data product domain entities, including Metric Registry, analysis trace, analyst review, skill evaluation, and false rejection logs.
- Built a Daily Triage workflow that turns anomalies into drilldowns, hypotheses, recommendations, and follow-up tasks.
- Designed a false rejection learning loop where user corrections update semantic mappings and improve Agent Skill routing.
- Created an Analyst Review safety mechanism that catches SQL scope mistakes and abnormal-date bias before AI analysis informs product decisions.
