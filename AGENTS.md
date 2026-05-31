# AGENTS.md

## Project Purpose

DataPilot AI is a portfolio-grade AI data assistant and Agent Skill platform for demonstrating AI data product management thinking.

## Product Principles

- The assistant must not hallucinate business analysis.
- Undefined metrics must block direct answers.
- Refusals should explain the missing product asset and suggest governed alternatives.
- Human review is part of the product, not an afterthought.
- Product operations data should drive iteration.

## UI Quality Bar

Keep the UI polished, quiet, and B2B SaaS-oriented. The target feel is closer to Linear, Vercel, Notion, Retool, or Metabase than a generic admin template.

## Important Routes

`/`, `/assistant`, `/daily-triage`, `/skills`, `/skills/[id]`, `/metric-registry`, `/review`, `/ops`, `/ai-radar`, `/prd`, and `/case-study`.

## Important Product Mechanisms

Metric Registry, honest refusal, Agent Skill Gallery, analyst review, false rejection logging, product operations feedback, AI product research, and case study storytelling.

## Code Quality Rules

- Keep mock data separate from UI.
- Keep product logic separate from components.
- Do not create one giant file.
- Use TypeScript domain types for product concepts.
- Show only product-level analysis trace, never model chain-of-thought.
- Prefer focused, readable components over clever abstractions.

## What Not To Do

- Do not make the assistant answer questions about undefined metrics.
- Do not include `profit` in the default Metric Registry until a future approval-loop task explicitly adds it.
- Do not expose model chain-of-thought.
- Do not mix mock data directly into route component logic when a reusable data module is appropriate.
- Do not degrade the portfolio UI into a generic admin dashboard.
