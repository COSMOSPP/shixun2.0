import { useState } from "react";
import { ChevronDown, FileSearch, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface LearningExamResult {
  title: string;
  score: number;
  startTime: string;
  attempts: number;
}

const examResults: LearningExamResult[] = [
  { title: "Python高级数据处理与可视化期末考", startTime: "2026-05-04 10:00", score: 95, attempts: 1 },
  { title: "电商用户行为预测实战考评", startTime: "2026-04-28 14:00", score: 88, attempts: 1 },
  { title: "机器学习基础期中测试", startTime: "2026-04-15 09:00", score: 55, attempts: 1 },
];

export default function LearningScores({ onPreview }: { onPreview: (exam: LearningExamResult) => void }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const records = examResults.filter(exam => exam.title.toLowerCase().includes(query.trim().toLowerCase()));
  const pageCount = Math.max(1, Math.ceil(records.length / pageSize));
  const visibleRecords = records.slice((page - 1) * pageSize, page * pageSize);

  return (
    <section aria-label="考试成绩" className="min-h-[600px] rounded-xl border border-neutral-border bg-white p-6 shadow-sm">
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="relative w-full sm:max-w-[320px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
          <input type="search" aria-label="搜索考试名称" placeholder="搜索考试名称" value={query}
            onChange={event => { setQuery(event.target.value); setPage(1); }}
            className="h-9 w-full rounded-[6px] border border-neutral-border bg-white py-2 pl-9 pr-4 text-[13px] text-neutral-title outline-none transition-all placeholder:text-neutral-400 hover:border-[#fa541c]/60 focus:border-[#fa541c] focus:ring-1 focus:ring-[#fa541c]/25" />
        </div>
        {query && <button onClick={() => { setQuery(""); setPage(1); }} className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-[#fa541c]"><X className="size-3.5" />清空搜索</button>}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse whitespace-nowrap text-left text-[13px]">
          <caption className="sr-only">考试成绩记录</caption>
          <thead>
            <tr className="border-b border-neutral-border/50 bg-neutral-50/50 text-neutral-600">
              <th scope="col" className="w-16 py-3.5 pl-6 pr-3 font-medium">序号</th>
              <th scope="col" className="min-w-[260px] px-3 py-3.5 font-medium">考试名称</th>
              <th scope="col" className="px-3 py-3.5 font-medium">考试时间</th>
              <th scope="col" className="px-3 py-3.5 font-medium">考试成绩</th>
              <th scope="col" className="py-3.5 pl-3 pr-6 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {visibleRecords.map((exam, index) => (
              <tr key={exam.title} className={cn("border-b border-neutral-100 transition-colors hover:bg-neutral-50/30", index === visibleRecords.length - 1 && "border-b-0")}>
                <td className="py-3 pl-6 pr-3 tabular-nums text-neutral-600">{String((page - 1) * pageSize + index + 1).padStart(2, "0")}</td>
                <th scope="row" className="px-3 py-3 text-left font-medium leading-5 text-neutral-800">{exam.title}</th>
                <td className="px-3 py-3 text-xs tabular-nums text-neutral-500"><time dateTime={exam.startTime.replace(" ", "T") + "+08:00"}>{exam.startTime}</time></td>
                <td className="px-3 py-3"><span className={cn("font-medium tabular-nums", exam.score >= 60 ? "text-[#fa541c]" : "text-red-500")}>{exam.score}</span><span className="ml-1 text-xs text-neutral-400">分</span></td>
                <td className="py-3 pl-3 pr-6">
                  <button onClick={() => onPreview(exam)} aria-label={`查看试卷：${exam.title}`}
                    className="cursor-pointer text-[13px] font-medium text-[#fa541c] no-underline hover:text-[#e84a15] hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400">查看试卷</button>
                </td>
              </tr>
            ))}
            {!visibleRecords.length && <tr><td colSpan={5} className="px-6 py-20 text-center"><FileSearch className="mx-auto mb-4 size-9 text-neutral-300" /><p className="text-sm text-neutral-600">未找到符合条件的考试成绩</p><p className="mt-2 text-xs text-neutral-400">试试其他关键词。</p></td></tr>}
          </tbody>
        </table>
      </div>

      <nav aria-label="考试成绩分页" className="mt-5 flex flex-wrap items-center justify-end gap-4">
        <span aria-live="polite" className="text-[13px] text-neutral-500">共 {records.length} 条</span>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" aria-label="上一页" disabled={page === 1} onClick={() => setPage(page - 1)} className="h-7 w-7 rounded-[4px] bg-white p-0 disabled:opacity-40">&lt;</Button>
          {Array.from({ length: pageCount }, (_, index) => index + 1).map(pageNumber => (
            <Button key={pageNumber} variant="outline" size="sm" aria-label={`第 ${pageNumber} 页`} aria-current={page === pageNumber ? "page" : undefined} onClick={() => setPage(pageNumber)}
              className={cn("h-7 w-7 cursor-pointer rounded-[4px] p-0 text-xs font-medium transition-colors", page === pageNumber ? "border-[#fa541c] bg-[#fa541c] text-white hover:bg-[#ff7a45]" : "border-neutral-200 bg-white text-neutral-600 hover:border-[#fa541c] hover:text-[#fa541c]")}>{pageNumber}</Button>
          ))}
          <Button variant="outline" size="sm" aria-label="下一页" disabled={page === pageCount} onClick={() => setPage(page + 1)} className="h-7 w-7 rounded-[4px] bg-white p-0 disabled:opacity-40">&gt;</Button>
        </div>
        <div className="relative rounded-[6px] bg-white">
          <select aria-label="每页条数" value={pageSize} onChange={event => { setPageSize(Number(event.target.value)); setPage(1); }}
            className="h-7 min-w-[95px] cursor-pointer appearance-none rounded-[6px] border border-neutral-200 bg-white py-1 pl-3 pr-8 text-[13px] text-neutral-600 shadow-sm transition-colors hover:border-[#fa541c]/60 focus:border-[#fa541c] focus:outline-none">
            <option value={10}>10 条/页</option><option value={20}>20 条/页</option><option value={50}>50 条/页</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-3 -translate-y-1/2 text-neutral-400" />
        </div>
      </nav>
    </section>
  );
}
