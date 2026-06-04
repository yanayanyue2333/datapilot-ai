"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Bot, Loader2, Send, UserRound } from "lucide-react";
import { analyzeDataQuestion } from "@/lib/ai/dataAssistantEngine";
import { useMetricRegistryStore } from "@/lib/metrics/metricRegistryStore";
import type { DataAssistantResult } from "@/types";
import { AnalysisTrace } from "@/components/assistant/AnalysisTrace";
import { HonestRefusalCard } from "@/components/assistant/HonestRefusalCard";
import { Card } from "@/components/ui/card";

const suggestedQuestions = ["为什么本月利润下降？", "本周 GMV 为什么下降？", "哪个渠道 ROI 最高？", "老用户是不是不太回来了？"];

export function DataAssistantChat() {
  const definitions = useMetricRegistryStore((state) => state.definitions);
  const [input, setInput] = useState("为什么本月利润下降？");
  const [submittedQuestion, setSubmittedQuestion] = useState("");
  const [result, setResult] = useState<DataAssistantResult | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [visibleTraceCount, setVisibleTraceCount] = useState(0);

  const isComplete = result ? visibleTraceCount >= result.trace.length : false;

  function submitQuestion(question: string) {
    const trimmed = question.trim();
    if (!trimmed || isThinking) return;
    setInput(trimmed);
    setSubmittedQuestion(trimmed);
    setResult(null);
    setVisibleTraceCount(0);
    setIsThinking(true);

    window.setTimeout(() => {
      setResult(analyzeDataQuestion(trimmed, definitions));
      setIsThinking(false);
    }, 650);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitQuestion(input);
  }

  useEffect(() => {
    if (!result || isThinking) return;
    if (visibleTraceCount >= result.trace.length) return;

    const timer = window.setTimeout(() => {
      setVisibleTraceCount((count) => Math.min(count + 1, result.trace.length));
    }, visibleTraceCount === 0 ? 250 : 520);

    return () => window.clearTimeout(timer);
  }, [isThinking, result, visibleTraceCount]);

  const answerCard = useMemo(() => {
    if (!result || !isComplete) return null;
    if (result.answerType === "honest_refusal" && result.refusal) {
      return <HonestRefusalCard refusal={result.refusal} />;
    }

    if (!result.mockAnswer) return null;
    return (
      <Card>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">受治理的 Mock 答案</p>
        <h2 className="mt-2 text-lg font-semibold text-slate-950">{result.mockAnswer.title}</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">{result.mockAnswer.summary}</p>
        {result.mockAnswer.formula ? (
          <div className="mt-4 rounded-md bg-slate-50 p-4">
            <h3 className="text-sm font-semibold text-slate-950">当前使用的指标口径</h3>
            <code className="mt-2 block rounded bg-white p-2 text-xs text-slate-700">{result.mockAnswer.formula}</code>
            {result.mockAnswer.caveat ? <p className="mt-2 text-sm leading-6 text-amber-700">{result.mockAnswer.caveat}</p> : null}
          </div>
        ) : null}
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {result.mockAnswer.supportingSignals.map((signal) => (
            <div key={signal} className="rounded-md bg-slate-50 p-3 text-sm text-slate-600">{signal}</div>
          ))}
        </div>
        {result.mockAnswer.drivers ? (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-md bg-slate-50 p-4">
              <h3 className="text-sm font-semibold text-slate-950">可能驱动因素</h3>
              <ul className="mt-3 space-y-2">
                {result.mockAnswer.drivers.map((driver) => (
                  <li key={driver} className="text-sm text-slate-600">{driver}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-md bg-slate-50 p-4">
              <h3 className="text-sm font-semibold text-slate-950">建议动作</h3>
              <ul className="mt-3 space-y-2">
                {result.mockAnswer.recommendations?.map((recommendation) => (
                  <li key={recommendation} className="text-sm text-slate-600">{recommendation}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-600">
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-800">置信度 {Math.round(result.mockAnswer.confidence * 100)}%</span>
          {result.mockAnswer.reportingNote ? <span>{result.mockAnswer.reportingNote}</span> : null}
        </div>
      </Card>
    );
  }, [isComplete, result]);

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <section className="space-y-5">
        <Card className="bg-slate-950 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white/10">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold">DataPilot AI 数据助手</h2>
              <p className="text-sm text-slate-300">先查口径，再给结论；必要时诚实拒答。</p>
            </div>
          </div>
          <form className="mt-6" onSubmit={onSubmit}>
            <label className="text-sm font-medium text-slate-200" htmlFor="assistant-question">输入一个业务数据问题</label>
            <textarea
              id="assistant-question"
              className="mt-3 min-h-28 w-full resize-none rounded-md border border-white/10 bg-white/5 p-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-blue-300"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="例如：为什么本月利润下降？"
            />
            <button className="mt-3 inline-flex h-10 items-center rounded-md bg-white px-4 text-sm font-medium text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={isThinking}>
              {isThinking ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
              开始分析
            </button>
          </form>
        </Card>
        <Card>
          <h3 className="text-sm font-semibold text-slate-950">推荐问题</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {suggestedQuestions.map((question) => (
              <button key={question} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700" type="button" onClick={() => submitQuestion(question)}>
                {question}
              </button>
            ))}
          </div>
        </Card>
      </section>
      <section className="space-y-5">
        {submittedQuestion ? (
          <Card>
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                <UserRound className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">用户问题</p>
                <p className="mt-1 text-base font-semibold text-slate-950">{submittedQuestion}</p>
              </div>
            </div>
          </Card>
        ) : null}
        {isThinking ? (
          <Card>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
              正在识别意图、检索指标口径库，并评估可用的受治理信号...
            </div>
          </Card>
        ) : null}
        {result ? <AnalysisTrace steps={result.trace} visibleCount={visibleTraceCount} /> : null}
        {answerCard}
      </section>
    </div>
  );
}
