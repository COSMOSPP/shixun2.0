import { useState } from "react";
import { BookOpen, CalendarDays, Clock3, FolderKanban, Hourglass } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { cn } from "@/lib/utils";

// Prototype study records, in minutes. All summaries use the same daily records.
const dailyMinutes = [
  [45, 30], [90, 45], [60, 60], [0, 0], [80, 40], [50, 70], [100, 30],
  [70, 50], [40, 90], [85, 35], [0, 0], [60, 75], [95, 45], [45, 60],
  [75, 40], [90, 60], [65, 35], [50, 70], [80, 55], [0, 0], [100, 60],
  [65, 75], [85, 45], [75, 45], [90, 60], [60, 90], [100, 80], [0, 0], [80, 70], [90, 60],
];

const records = dailyMinutes.map(([course, project], index) => {
  const date = new Date(Date.UTC(2026, 8, 20 + index));
  return {
    date: date.toISOString().slice(0, 10),
    label: `${String(date.getUTCMonth() + 1).padStart(2, "0")}/${String(date.getUTCDate()).padStart(2, "0")}`,
    course, project, total: course + project,
    courseHours: course / 60, projectHours: project / 60,
  };
});

const sumMinutes = (days: typeof records) => days.reduce((sum, day) => sum + day.total, 0);
const hours = (minutes: number) => (minutes / 60).toFixed(1);
const duration = (minutes: number) => {
  const rounded = Math.round(minutes);
  const h = Math.floor(rounded / 60);
  const m = rounded % 60;
  return h ? `${h} 小时${m ? ` ${m} 分钟` : ""}` : `${m} 分钟`;
};

function DurationTooltip({ active, payload }: { active?: boolean; payload?: readonly { payload?: typeof records[number] }[] }) {
  const day = payload?.[0]?.payload;
  if (!active || !day) return null;
  return (
    <div className="min-w-44 rounded-xl border border-neutral-100 bg-white p-4 text-xs shadow-lg">
      <p className="mb-3 font-medium text-neutral-800">{day.date.replaceAll("-", ".")}</p>
      <div className="space-y-2 text-neutral-500">
        <p className="flex items-center justify-between gap-6"><span className="flex items-center gap-2"><span className="size-2 rounded-full bg-[#fa7c45]" />课程学习</span><span className="text-neutral-700">{duration(day.course)}</span></p>
        <p className="flex items-center justify-between gap-6"><span className="flex items-center gap-2"><span className="size-2 rounded-full bg-[#7f8ee3]" />项目实训</span><span className="text-neutral-700">{duration(day.project)}</span></p>
        <p className="flex justify-between border-t border-neutral-100 pt-2 font-medium text-neutral-800"><span>合计</span><span>{duration(day.total)}</span></p>
      </div>
    </div>
  );
}

export default function LearningDuration() {
  const [range, setRange] = useState<7 | 30>(7);
  const selectedRecords = records.slice(-range);
  const totalMinutes = sumMinutes(selectedRecords);
  const courseMinutes = selectedRecords.reduce((sum, day) => sum + day.course, 0);
  const projectMinutes = totalMinutes - courseMinutes;
  const courseShare = totalMinutes ? Math.round(courseMinutes / totalMinutes * 100) : 0;
  const activeDays = selectedRecords.filter(day => day.total > 0).length;
  const longestDay = selectedRecords.reduce((longest, day) => day.total > longest.total ? day : longest);
  const last30Minutes = sumMinutes(records);
  const summary = [
    { label: "今日学习", minutes: records.at(-1)!.total, icon: Clock3, note: "课程与项目的今日投入" },
    { label: "近 7 天", minutes: sumMinutes(records.slice(-7)), icon: CalendarDays, note: "最近一周学习时长" },
    { label: "近 30 天", minutes: last30Minutes, icon: Hourglass, note: "最近一个月学习时长" },
  ];

  return (
    <div className="min-w-0 space-y-5 pb-4">
      <section aria-label="学习时长概览" className="grid overflow-hidden rounded-2xl border border-neutral-border bg-white shadow-sm xl:grid-cols-[1.1fr_2.4fr]">
        <div className="relative isolate overflow-hidden border-b border-orange-100 bg-gradient-to-br from-[#fff5ed] via-[#fff9f5] to-white px-7 py-7 xl:border-b-0 xl:border-r">
          <div aria-hidden="true" className="absolute -right-14 -top-20 -z-10 size-56 rounded-full border-[28px] border-orange-100/40" />
          <div className="flex items-center gap-2 text-[13px] font-medium text-[#a85832]"><span className="flex size-7 items-center justify-center rounded-lg bg-white/80"><Clock3 className="size-4 text-[#fa541c]" /></span>累计学习时长</div>
          <div className="mt-4 flex items-baseline gap-2"><span className="text-[44px] font-semibold leading-none tracking-tight text-neutral-900 tabular-nums">{hours(14580 + last30Minutes)}</span><span className="text-[13px] text-neutral-500">小时</span></div>
          <p className="mt-4 text-xs text-[#a8775b]">每一次专注，都是新的积累</p>
        </div>
        <div className="grid grid-cols-1 divide-y divide-neutral-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {summary.map(item => (
            <div key={item.label} className="flex flex-col justify-center px-6 py-6">
              <div className="flex items-center gap-2 text-[13px] text-neutral-500"><item.icon className="size-4 text-neutral-400" />{item.label}</div>
              <div className="mt-4 flex items-baseline gap-1.5"><span className="text-[30px] font-semibold leading-none tracking-tight text-neutral-800 tabular-nums">{hours(item.minutes)}</span><span className="text-xs text-neutral-400">小时</span></div>
              <p className="mt-3 text-xs text-neutral-400">{item.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-label="学习时间分析" className="overflow-hidden rounded-2xl border border-neutral-border bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-100 px-6 py-5">
          <div className="flex flex-wrap items-center gap-3"><h2 className="text-[15px] font-semibold text-neutral-800">时间投入分析</h2><span className="text-xs tabular-nums text-neutral-400">{selectedRecords[0].date.replaceAll("-", ".")} — {selectedRecords.at(-1)!.date.replaceAll("-", ".")}</span></div>
          <div role="group" aria-label="统计时间范围" className="inline-flex gap-1 rounded-lg bg-neutral-100/80 p-1">
            {([7, 30] as const).map(days => <button key={days} aria-pressed={range === days} onClick={() => setRange(days)} className={cn("cursor-pointer rounded-md px-4 py-1.5 text-xs font-medium transition-all focus-visible:outline-2 focus-visible:outline-orange-400", range === days ? "bg-white text-[#fa541c] shadow-sm" : "text-neutral-500 hover:text-neutral-800")}>近 {days} 天</button>)}
          </div>
        </div>

        <div className="grid xl:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0 p-6">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div><h3 className="text-[13px] font-medium text-neutral-600">学习趋势</h3><p className="mt-2 flex items-baseline gap-1.5"><span className="text-[28px] font-semibold tracking-tight tabular-nums text-neutral-800">{hours(totalMinutes)}</span><span className="text-xs text-neutral-400">小时 / 近 {range} 天</span></p></div>
              <div className="flex items-center gap-4 text-xs text-neutral-500"><span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-[#fa7c45]" />课程学习</span><span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-[#7f8ee3]" />项目实训</span></div>
            </div>
            <p className="mb-3 text-[11px] text-neutral-400">时长（小时）</p>
            <div className="h-[260px] w-full" role="img" aria-label={`近${range}天学习趋势，总计${duration(totalMinutes)}，课程${duration(courseMinutes)}，项目${duration(projectMinutes)}`}>
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <AreaChart data={selectedRecords} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
                  <defs>
                    <linearGradient id="learning-course-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#fa7c45" stopOpacity={0.24} /><stop offset="100%" stopColor="#fa7c45" stopOpacity={0.04} /></linearGradient>
                    <linearGradient id="learning-project-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7f8ee3" stopOpacity={0.18} /><stop offset="100%" stopColor="#7f8ee3" stopOpacity={0.03} /></linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="#f0f0f0" strokeDasharray="4 5" />
                  <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#a3a3a3", fontSize: 11 }} tickMargin={12} minTickGap={24} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#a3a3a3", fontSize: 11 }} tickFormatter={value => Number(value).toFixed(1)} />
                  <Tooltip content={<DurationTooltip />} cursor={{ stroke: "#d4d4d4", strokeDasharray: "3 3" }} />
                  <Area type="monotone" dataKey="courseHours" name="课程学习" stroke="#fa7c45" strokeWidth={2.5} fill="url(#learning-course-fill)" activeDot={{ r: 5, stroke: "#fff", strokeWidth: 2 }} />
                  <Area type="monotone" dataKey="projectHours" name="项目实训" stroke="#7f8ee3" strokeWidth={2.5} fill="url(#learning-project-fill)" activeDot={{ r: 5, stroke: "#fff", strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <dl className="mt-6 grid grid-cols-1 gap-4 border-t border-neutral-100 pt-5 sm:grid-cols-3">
              <div><dt className="text-xs text-neutral-400">日均学习</dt><dd className="mt-1.5 text-sm font-medium tabular-nums text-neutral-700">{duration(totalMinutes / range)}</dd></div>
              <div><dt className="text-xs text-neutral-400">单日最高 <span className="ml-1 text-neutral-300">{longestDay.label}</span></dt><dd className="mt-1.5 text-sm font-medium tabular-nums text-neutral-700">{duration(longestDay.total)}</dd></div>
              <div><dt className="text-xs text-neutral-400">有学习记录的天数</dt><dd className="mt-1.5 text-sm font-medium text-neutral-700"><span className="tabular-nums">{activeDays}</span> <span className="font-normal text-neutral-400">/ {range} 天</span></dd></div>
            </dl>
          </div>

          <aside aria-label="学习时间分布" className="border-t border-neutral-100 bg-[#fcfcfd] p-6 xl:border-l xl:border-t-0">
            <h3 className="text-[13px] font-medium text-neutral-600">学习时间分布</h3>
            <p className="mt-1 text-xs text-neutral-400">近 {range} 天 · 课程与项目</p>
            <div className="relative mx-auto my-7 flex size-[176px] items-center justify-center rounded-full" role="img" aria-label={`课程学习占${courseShare}%，项目实训占${100 - courseShare}%`} style={{ background: `conic-gradient(#fa7c45 0% ${courseShare}%, #7f8ee3 ${courseShare}% 100%)` }}>
              <div className="flex size-[140px] flex-col items-center justify-center rounded-full bg-[#fcfcfd]"><span className="text-xs text-neutral-400">总学习时长</span><span className="mt-1 text-[28px] font-semibold tracking-tight tabular-nums text-neutral-800">{hours(totalMinutes)}</span><span className="text-[11px] text-neutral-400">小时</span></div>
            </div>
            <div className="space-y-4">
              {[
                { label: "课程学习", minutes: courseMinutes, share: courseShare, icon: BookOpen, color: "bg-[#fa7c45]", iconStyle: "bg-orange-50 text-[#e77842]" },
                { label: "项目实训", minutes: projectMinutes, share: 100 - courseShare, icon: FolderKanban, color: "bg-[#7f8ee3]", iconStyle: "bg-indigo-50 text-[#7f8ee3]" },
              ].map(item => (
                <div key={item.label} className="rounded-xl border border-neutral-100 bg-white p-3.5">
                  <div className="flex items-center justify-between text-xs"><span className="flex items-center gap-2 text-neutral-600"><span className={cn("flex size-7 items-center justify-center rounded-lg", item.iconStyle)}><item.icon className="size-3.5" /></span>{item.label}</span><span className="font-medium tabular-nums text-neutral-800">{item.share}%</span></div>
                  <div className="mt-3 flex items-center gap-3"><div className="h-1 flex-1 overflow-hidden rounded-full bg-neutral-100"><div className={cn("h-full rounded-full transition-all", item.color)} style={{ width: `${item.share}%` }} /></div><span className="text-xs tabular-nums text-neutral-500">{hours(item.minutes)} 小时</span></div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
