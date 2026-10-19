import React, { useState } from "react";
import { ChevronDown, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { CompetitionCandidate, CompetitionOperationData, competitionScore } from "./competitionOperations";
import { competitionDrawerStyles as styles } from "./competitionDrawerStyles";

interface Props {
  candidate: CompetitionCandidate;
  data: CompetitionOperationData;
  onNotify: (message: string) => void;
}

export default function CompetitionCandidateGrading({ candidate, data, onNotify }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [refreshedAt, setRefreshedAt] = useState("");
  const score = competitionScore(candidate, data);
  // Request types are templates; grade the environment and configured request checks.
  const checks = data.checks.filter(check => check.category !== "request");

  return <section aria-label={`${candidate.name}的批阅内容`} className="space-y-5">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-xs text-neutral-500">{candidate.name}<span className="mx-2 text-neutral-200">|</span>{candidate.account}</p>
      <div className="flex items-center gap-3">
        <span role="status" className="text-[11px] text-neutral-400">{refreshedAt && `更新于 ${refreshedAt}`}</span>
        <button type="button" onClick={() => { setRefreshedAt(new Date().toLocaleTimeString("zh-CN", { hour12: false })); onNotify("批阅信息已刷新"); }} className={cn(styles.secondary, "inline-flex items-center gap-1.5 px-4")}><RefreshCw className="w-3.5 h-3.5" />刷新</button>
      </div>
    </div>
    <div className="flex flex-wrap justify-end gap-x-8 gap-y-3 text-[14px] font-semibold text-neutral-600 tabular-nums">
      <p>总得分：<span className="text-neutral-800">{score.total}</span></p>
      <p>固定得分：<span>{score.fixed ?? "--"}</span></p>
      <p>浮动得分：<span>{score.floating ?? "--"}</span></p>
    </div>
    <div className={styles.table}>
      <table className="w-full text-left border-collapse min-w-[540px] table-fixed text-[13px]">
        <colgroup><col className="w-[66%]" /><col className="w-[22%]" /><col className="w-[12%]" /></colgroup>
        <thead className="bg-neutral-50 text-neutral-500 text-xs"><tr>{["检查项", "结果", "得分"].map(label => <th key={label} scope="col" className="px-4 py-3 font-medium border-b border-neutral-200 [&:not(:last-child)]:border-r">{label}</th>)}</tr></thead>
        <tbody>{checks.length ? checks.map(check => {
          const result = candidate.checkResults?.find(item => item.checkId === check.id);
          const expanded = expandedId === check.id;
          const detailId = `grading-result-${candidate.id}-${check.id}`;
          return <React.Fragment key={check.id}>
            <tr className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50 transition-colors">
              <td className="px-4 py-6 text-neutral-600 border-r border-neutral-200 break-words">{check.name}</td>
              <td className="px-4 py-6 border-r border-neutral-200"><button type="button" aria-label={`查看${check.name}详情`} aria-expanded={expanded} aria-controls={detailId} onClick={() => setExpandedId(expanded ? null : check.id)} className="text-[#fa541c] hover:text-[#e84a15] text-xs font-semibold cursor-pointer inline-flex items-center gap-1 whitespace-nowrap">{expanded ? "收起详情" : "查看详情"}<ChevronDown className={cn("w-3 h-3 transition-transform", expanded && "rotate-180")} /></button></td>
              <td className="px-4 py-6 text-neutral-600 tabular-nums">{result?.score ?? "--"}</td>
            </tr>
            {expanded && <tr className="border-b border-neutral-100"><td colSpan={3} className="p-4 bg-neutral-50/60"><section id={detailId} aria-label={`${check.name}的检查详情`} className="space-y-3 text-xs text-neutral-600">
              <h3 className="font-semibold text-neutral-800">{check.name}</h3>
              <p className="leading-5 whitespace-pre-wrap">{check.description}</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2"><p>检查结果：{result?.result ? "已返回" : "暂无执行结果"}</p><p>得分：{result?.score ?? "--"}</p>{result?.executedAt && <p>执行时间：{result.executedAt}</p>}</div>
              {result?.result && <pre className="whitespace-pre-wrap break-words bg-white border border-neutral-200 rounded-[4px] p-3 leading-6 font-mono">{result.result}</pre>}
              <div><p className="font-medium mb-2 text-neutral-700">检查内容</p><pre className="whitespace-pre-wrap break-words bg-white border border-neutral-200 rounded-[4px] p-3 leading-6 font-mono">{check.content || "暂无检查内容"}</pre></div>
            </section></td></tr>}
          </React.Fragment>;
        }) : <tr><td colSpan={3} className="text-center text-neutral-400 py-14">暂无检查项</td></tr>}</tbody>
      </table>
    </div>
  </section>;
}
