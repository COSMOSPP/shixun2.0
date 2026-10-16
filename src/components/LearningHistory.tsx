import { useState, type KeyboardEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { BookOpen, FolderKanban, History, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type HistoryTab = "courses" | "projects";

interface LearningRecord {
  id: string;
  name: string;
  category: string;
  lastContent: string;
  completed: number;
  total: number;
  minutes: number;
  lastLearnedAt: string;
}

const courseHistory: LearningRecord[] = [
  { id: "course-1", name: "Python高级数据处理与可视化", category: "数据分析", lastContent: "第4章 · 复杂数据清洗与异常处理 / 4.2", completed: 13, total: 20, minutes: 765, lastLearnedAt: "2026-10-16 10:30" },
  { id: "course-2", name: "深度学习基础与 PyTorch 实战", category: "深度学习", lastContent: "第3章 · 卷积神经网络基础 / 3.1", completed: 8, total: 24, minutes: 420, lastLearnedAt: "2026-10-15 16:45" },
  { id: "course-3", name: "大语言模型 RAG 应用开发指南", category: "大模型应用", lastContent: "第2章 · 向量数据库与知识检索 / 2.3", completed: 6, total: 18, minutes: 285, lastLearnedAt: "2026-10-14 14:20" },
  { id: "course-4", name: "Python核心编程与实战 (第1卷)", category: "编程基础", lastContent: "第8章 · 综合实践与课程总结 / 8.4", completed: 32, total: 32, minutes: 1480, lastLearnedAt: "2026-10-12 11:10" },
  { id: "course-5", name: "Prompt 工程与 Agent 智能体架构", category: "智能体开发", lastContent: "第1章 · 结构化提示词设计 / 1.2", completed: 2, total: 16, minutes: 95, lastLearnedAt: "2026-10-10 09:25" },
  { id: "course-6", name: "数据分析与 Pandas 大规模数据挖掘", category: "数据分析", lastContent: "第6章 · 数据挖掘综合实践 / 6.3", completed: 26, total: 26, minutes: 1120, lastLearnedAt: "2026-10-08 15:40" },
];

const projectHistory: LearningRecord[] = [
  { id: "project-1", name: "电商用户行为预测", category: "机器学习", lastContent: "特征工程与用户购买转化率预测", completed: 4, total: 8, minutes: 530, lastLearnedAt: "2026-10-16 09:15" },
  { id: "project-2", name: "图像分类项目", category: "计算机视觉", lastContent: "模型训练与超参数调优", completed: 4, total: 5, minutes: 760, lastLearnedAt: "2026-10-15 15:30" },
  { id: "project-3", name: "个人博客系统开发", category: "Web 开发", lastContent: "用户认证与鉴权模块设计", completed: 3, total: 10, minutes: 315, lastLearnedAt: "2026-10-14 14:00" },
  { id: "project-4", name: "文本情感分析项目", category: "自然语言处理", lastContent: "评估报告与项目成果提交", completed: 6, total: 6, minutes: 925, lastLearnedAt: "2026-10-11 17:20" },
];

const formatDuration = (minutes: number) => `${Math.floor(minutes / 60)} 小时${minutes % 60 ? ` ${minutes % 60} 分钟` : ""}`;

export default function LearningHistory() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<HistoryTab>(location.state?.historyTab === "projects" ? "projects" : "courses");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const isCourses = activeTab === "courses";
  const label = isCourses ? "课程" : "项目";
  const records = isCourses ? courseHistory : projectHistory;
  const filteredRecords = records.filter(record => {
    const keyword = query.trim().toLowerCase();
    const matchesQuery = [record.name, record.category, record.lastContent].some(value => value.toLowerCase().includes(keyword));
    return matchesQuery;
  }).sort((a, b) => b.lastLearnedAt.localeCompare(a.lastLearnedAt));
  const pageCount = Math.max(1, Math.ceil(filteredRecords.length / pageSize));
  const visibleRecords = filteredRecords.slice((page - 1) * pageSize, page * pageSize);

  const switchTab = (tab: HistoryTab) => {
    setActiveTab(tab);
    setQuery("");
    setPage(1);
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const nextTab = event.key === "Home" ? "courses" : event.key === "End" ? "projects" : isCourses ? "projects" : "courses";
    switchTab(nextTab);
    event.currentTarget.parentElement?.querySelector<HTMLButtonElement>(`#learning-${nextTab}-tab`)?.focus();
  };

  return (
    <div className="min-w-0 space-y-6">
      <header className="flex flex-col gap-2 text-left sm:flex-row sm:items-end sm:gap-4">
        <h1 className="shrink-0 text-xl font-bold text-neutral-900">我的学习</h1>
        <p className="text-sm text-neutral-500 sm:mb-0.5">回顾课程与项目的学习历史，查看每一次学习进展。</p>
      </header>

      <section className="overflow-hidden rounded-[8px] border border-neutral-border bg-white" aria-label="学习历史记录">
        <div role="tablist" aria-label="学习记录类型" className="flex gap-8 border-b border-neutral-100 px-5 sm:px-6">
          {([
            { id: "courses", label: "课程", icon: BookOpen, count: courseHistory.length },
            { id: "projects", label: "项目", icon: FolderKanban, count: projectHistory.length },
          ] as const).map(tab => (
            <button key={tab.id} id={`learning-${tab.id}-tab`} role="tab" aria-selected={activeTab === tab.id}
              aria-controls={`learning-${tab.id}-panel`} tabIndex={activeTab === tab.id ? 0 : -1}
              onKeyDown={handleTabKeyDown} onClick={() => switchTab(tab.id)}
              className={cn("relative flex items-center gap-2 py-5 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-300", activeTab === tab.id ? "text-[#fa541c]" : "text-neutral-500 hover:text-neutral-900")}>
              <tab.icon className="size-4" />{tab.label}
              <span className={cn("rounded-md px-1.5 py-0.5 text-xs tabular-nums", activeTab === tab.id ? "bg-[#fff2e8] text-[#fa541c]" : "bg-neutral-100 text-neutral-500")}>{tab.count}</span>
              {activeTab === tab.id && <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-t-full bg-[#fa541c]" />}
            </button>
          ))}
        </div>

        <div id={`learning-${activeTab}-panel`} role="tabpanel" aria-labelledby={`learning-${activeTab}-tab`} tabIndex={0} className="outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-200">
          <div className="flex flex-wrap items-center gap-3 border-b border-neutral-border/50 px-6 py-4">
            <div className="relative w-full sm:max-w-[320px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
              <input type="search" aria-label={`搜索${label}历史记录`} placeholder={`搜索${label}名称、分类或学习内容`}
                value={query} onChange={event => { setQuery(event.target.value); setPage(1); }}
                className="w-full rounded-full border border-neutral-border bg-white py-2 pl-9 pr-4 text-sm text-neutral-800 outline-none transition-all placeholder:text-neutral-400 focus:border-[#fa541c] focus:ring-1 focus:ring-[#fa541c]" />
            </div>
            {query && <button onClick={() => { setQuery(""); setPage(1); }} className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-[#fa541c]"><X className="size-3.5" />清空搜索</button>}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px] border-collapse text-left text-[13px] whitespace-nowrap">
              <caption className="sr-only">{label}学习历史记录</caption>
              <thead>
                <tr className="border-b border-neutral-border/50 bg-neutral-50/50 text-[13px] text-neutral-600">
                  <th scope="col" className="w-16 pl-6 pr-3 py-3.5 font-medium text-left">序号</th>
                  <th scope="col" className="min-w-[260px] px-3 py-3.5 font-medium text-left">{label}名称 / 最近学习内容</th>
                  <th scope="col" className="px-3 py-3.5 font-medium text-left">分类</th>
                  <th scope="col" className="min-w-[160px] px-3 py-3.5 font-medium text-left">{isCourses ? "学习进度" : "项目进度"}</th>
                  <th scope="col" className="px-3 py-3.5 font-medium text-left">累计学习时长</th>
                  <th scope="col" className="px-3 py-3.5 font-medium text-left">最近学习时间</th>
                  <th scope="col" className="px-3 py-3.5 font-medium text-left">状态</th>
                  <th scope="col" className="pl-3 pr-6 py-3.5 font-medium text-left">操作</th>
                </tr>
              </thead>
              <tbody>
                {visibleRecords.map((record, index) => {
                  const completed = record.completed === record.total;
                  const progress = Math.round(record.completed / record.total * 100);
                  return (
                    <tr key={record.id} className={cn("border-b border-neutral-100 hover:bg-neutral-50/30 transition-colors text-[13px]", index === visibleRecords.length - 1 && "border-b-0")}>
                      <td className="pl-6 pr-3 py-3 tabular-nums text-neutral-600">{String((page - 1) * pageSize + index + 1).padStart(2, "0")}</td>
                      <th scope="row" className="px-3 py-3 font-normal">
                        <p className="font-medium leading-5 text-neutral-800">{record.name}</p>
                        <p className="mt-1 text-[12px] leading-5 text-neutral-500">{record.lastContent}</p>
                      </th>
                      <td className="px-3 py-3"><span className="rounded-[4px] border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[12px] text-neutral-600">{record.category}</span></td>
                      <td className="px-3 py-3">
                        <div className="flex items-center justify-between gap-3 text-xs"><span className="text-neutral-500">{record.completed}/{record.total} {isCourses ? "课时" : "任务"}</span><span className={cn("font-medium tabular-nums", completed ? "text-emerald-600" : "text-[#fa541c]")}>{progress}%</span></div>
                        <div role="progressbar" aria-label={`${record.name}进度`} aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} className="mt-2 h-1.5 overflow-hidden rounded-full bg-neutral-100"><div style={{width: `${progress}%`}} className={cn("h-full rounded-full", completed ? "bg-emerald-400" : "bg-[#ff966c]")} /></div>
                      </td>
                      <td className="px-3 py-3 text-[13px] tabular-nums text-neutral-600">{formatDuration(record.minutes)}</td>
                      <td className="px-3 py-3 text-[12px] tabular-nums text-neutral-500"><time dateTime={record.lastLearnedAt.replace(" ", "T") + "+08:00"}>{record.lastLearnedAt}</time></td>
                      <td className="px-3 py-3"><span className={cn("inline-flex items-center rounded-[4px] border px-2 py-0.5 text-[12px]", completed ? "bg-green-50 text-green-600 border-green-200" : "bg-[#fff2e8] text-[#fa541c] border-[#ffbb96]")}>{completed ? "已完成" : isCourses ? "学习中" : "进行中"}</span></td>
                      <td className="pl-3 pr-6 py-3">
                        <Link to={isCourses ? "/user/courses" : "/user/projects"}
                          state={isCourses ? { showDetail: true, resumeCourse: record } : { resumeProject: record }}
                          aria-label={`继续学习：${record.name}`}
                          className="inline-flex items-center text-[13px] font-medium text-[#fa541c] hover:text-[#e84a15] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400">
                          继续学习
                        </Link>
                      </td>
                    </tr>
                  );
                })}
                {!visibleRecords.length && <tr><td colSpan={8} className="px-6 py-20 text-center"><History className="mx-auto mb-4 size-9 text-neutral-300" /><p className="text-sm text-neutral-600">未找到符合条件的{label}学习记录</p><p className="mt-2 text-xs text-neutral-400">试试其他关键词。</p></td></tr>}
              </tbody>
            </table>
          </div>

          <nav aria-label="学习记录分页" className="flex flex-wrap items-center justify-end gap-4 border-t border-neutral-border/30 px-6 py-4">
            <span aria-live="polite" className="text-[13px] text-neutral-500">共 {filteredRecords.length} 条</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" aria-label="上一页" disabled={page === 1} onClick={() => setPage(page - 1)} className="h-7 w-7 rounded-sm bg-white p-0">&lt;</Button>
              {Array.from({ length: pageCount }, (_, index) => index + 1).map(pageNumber => (
                <Button key={pageNumber} variant="outline" size="sm" aria-label={`第 ${pageNumber} 页`} aria-current={page === pageNumber ? "page" : undefined}
                  onClick={() => setPage(pageNumber)}
                  className={cn("h-7 w-7 rounded-sm p-0", page === pageNumber ? "border-[#fa541c] bg-[#fa541c] text-white hover:bg-[#e84a15]" : "bg-white")}>
                  {pageNumber}
                </Button>
              ))}
              <Button variant="outline" size="sm" aria-label="下一页" disabled={page === pageCount} onClick={() => setPage(page + 1)} className="h-7 w-7 rounded-sm bg-white p-0">&gt;</Button>
            </div>
            <select aria-label="每页条数" value={pageSize} onChange={event => { setPageSize(Number(event.target.value)); setPage(1); }}
              className="rounded-sm border border-neutral-200 bg-white px-2 py-1 text-[13px] text-neutral-600 focus:border-[#fa541c] focus:outline-none">
              <option value={10}>10 条/页</option>
              <option value={20}>20 条/页</option>
              <option value={50}>50 条/页</option>
            </select>
          </nav>
        </div>
      </section>
    </div>
  );
}
