# DataPilot AI Demo Guide

## 3-Minute Demo Flow

1. Open `/assistant`.
2. Ask `为什么本月利润下降？`.
3. Show the honest refusal and product-level Analysis Trace.
4. Click `Submit request` to create the profit metric definition request.
5. Go to `/review`.
6. Approve the profit metric definition.
7. Go to `/metric-registry`.
8. Confirm `profit / 利润` has been added with formula, aliases, owner, data sources, and caveat.
9. Return to `/assistant`.
10. Ask `为什么本月利润下降？` again and show that the assistant can now answer using the approved operating gross profit definition.
11. Open `/daily-triage` and click `继续拆解` to show anomaly drilldown.
12. Open `/ops` and show the False Rejection Log.
13. Open `/review` and show the GMV correction story.
14. Open `/case-study` to summarize product thinking and JD fit.

## 60-Second Demo Flow

1. Start at `/assistant` and ask `为什么本月利润下降？`.
2. Show refusal because `profit / 利润` is missing.
3. Submit the metric request and approve it in `/review`.
4. Open `/metric-registry` to show the approved profit definition.
5. Ask the same question again in `/assistant` and show the governed answer.
6. Quickly open `/daily-triage`, `/ops`, and `/review` to show triage, learning loop, and analyst safety.

## Demo Notes

- The MVP runs fully in mock mode.
- Metric approval state is persisted in browser `localStorage`.
- No API keys, database, or real LLM calls are required.
- If you need to reset the demo, clear browser site data for the local app.
