import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Award, Calendar, CheckCircle, ChevronRight, Clock, FileText, Trophy, UserCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Competition } from "./CompetitionList";

interface CompetitionDetailProps {
  competition?: Competition;
  isRegistered: boolean;
  onRegister: (competition: Competition) => void;
}

export default function CompetitionDetail({ competition, isRegistered, onRegister }: CompetitionDetailProps) {
  if (!competition) {
    return (
      <div className="mx-auto max-w-[1440px] px-5 py-24 text-center sm:px-8 lg:px-12">
        <Trophy className="mx-auto mb-5 size-12 text-orange-300" />
        <h1 className="text-2xl font-bold">未找到该赛事</h1>
        <p className="mt-3 text-sm text-slate-500">该赛事可能已下架，请返回列表查看其他挑战。</p>
        <Link to="/competition" className="mt-6 inline-flex items-center gap-2 text-[#fa541c]"><ArrowLeft className="size-4" />返回赛事列表</Link>
      </div>
    );
  }

  const ended = competition.status === "已结束";
  return (
    <div className="mx-auto w-full max-w-[1440px] px-5 pt-6 sm:px-8 sm:pt-8 lg:px-12">
      <nav aria-label="面包屑导航" className="mb-6 flex items-center gap-2 text-sm text-[#9a8375]">
        <Link to="/competition" className="inline-flex items-center gap-2 hover:text-[#fa541c]"><ArrowLeft className="size-4" />赛事列表</Link>
        <ChevronRight className="size-3.5" />
        <span className="text-[#554238]">赛事详情</span>
      </nav>

      <header className="competition-detail-hero relative isolate overflow-hidden rounded-3xl border border-[#f3dfd0] px-6 py-9 sm:p-10 lg:p-12">
        <img aria-hidden="true" alt="" src={`${import.meta.env.BASE_URL}images/covers/competition-${competition.id}-detail.webp`} fetchPriority="high" className="competition-detail-art" />
        <div className="competition-detail-copy relative">
          <div className="mb-5 flex flex-wrap items-center gap-2 text-xs font-medium">
            <span className="rounded-md border border-white/90 bg-white/85 px-3 py-1.5 text-[#c9753f]">{competition.type}</span>
            <span className="rounded-md bg-white/80 px-3 py-1.5 text-[#8b7364]">{competition.difficulty}</span>
            <span className={cn("inline-flex items-center gap-1.5 rounded-md px-3 py-1.5", ended ? "bg-slate-100 text-slate-500" : "bg-[#ffede0] text-[#d7622c]")}><span className="size-1.5 rounded-full bg-current" />{competition.status}</span>
          </div>
          <h1 className="text-2xl font-bold leading-snug tracking-tight text-[#3f3028] sm:text-3xl lg:text-4xl">{competition.name}</h1>
          <p className="mt-5 text-sm leading-7 text-[#947864]">主办方：{competition.sponsor}</p>
          <div className="mt-5 flex flex-wrap gap-x-7 gap-y-3 text-xs text-[#866e5e] sm:text-sm">
            <span className="flex items-center gap-2"><Calendar className="size-4 shrink-0" />{competition.time}</span>
            <span className="flex items-center gap-2"><Users className="size-4" />{(competition.participants + (isRegistered ? 1 : 0)).toLocaleString()} 队参与</span>
          </div>
        </div>
      </header>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8">
        <div className="min-w-0 space-y-6">
          <section className="competition-detail-section" aria-labelledby="competition-introduction">
            <h2 id="competition-introduction" className="competition-detail-heading"><FileText className="size-5 text-[#fa713b]" />赛事简介</h2>
            <p className="mt-5 text-sm leading-8 text-slate-600 sm:text-base">{competition.desc}</p>
          </section>

          <section className="competition-detail-section" aria-labelledby="competition-rewards">
            <h2 id="competition-rewards" className="competition-detail-heading"><Award className="size-5 text-[#fa713b]" />奖项分配</h2>
            <div className="mt-5 divide-y divide-[#f1e6de] rounded-2xl border border-[#f1e6de] bg-[#fffcf9] px-5">
              {competition.rewards.map((reward, index) => (
                <div key={reward.rank} className="flex flex-col gap-2 py-5 sm:flex-row sm:items-start sm:justify-between sm:gap-5">
                  <span className="flex items-center gap-3 text-sm font-semibold text-[#5c4537]"><span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#fff0df] text-xs text-[#db7a31]">{String(index + 1).padStart(2, "0")}</span>{reward.rank}</span>
                  <span className="text-sm font-semibold leading-7 text-[#ef6a32] sm:text-right">{reward.prize}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="competition-detail-section" aria-labelledby="competition-rules">
            <h2 id="competition-rules" className="competition-detail-heading"><Clock className="size-5 text-[#fa713b]" />参赛规则及评审</h2>
            <ol className="mt-5 space-y-5">
              {competition.rules.map((rule, index) => (
                <li key={rule} className="flex items-start gap-3 text-sm leading-7 text-slate-600"><span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-orange-50 text-[11px] font-semibold text-[#e77944]">{index + 1}</span><span>{rule}</span></li>
              ))}
            </ol>
          </section>
        </div>

        <aside aria-label="赛事报名信息" className="competition-detail-section lg:sticky lg:top-24">
          <p className="flex items-center gap-2 text-sm text-[#947b6a]"><Trophy className="size-4 text-[#f18c38]" />赛事总奖金池</p>
          <p className="mt-3 text-4xl font-bold tracking-tight text-[#fa641f]">{competition.prize}</p>
          <dl className="my-6 space-y-5 border-y border-[#f2e7df] py-6 text-sm">
            <div><dt className="mb-2 text-[#a08c7e]">赛事时间</dt><dd className="leading-6 text-[#5f4b40]">{competition.time}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-[#a08c7e]">赛事状态</dt><dd className="text-[#5f4b40]">{competition.status}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-[#a08c7e]">参与队伍</dt><dd className="text-[#5f4b40]">{(competition.participants + (isRegistered ? 1 : 0)).toLocaleString()} 队</dd></div>
          </dl>
          <Button disabled={ended || isRegistered} onClick={() => onRegister(competition)} className={cn("competition-skew-button h-12 w-full font-semibold", ended ? "bg-slate-100 text-slate-400 disabled:opacity-100" : isRegistered ? "bg-orange-50 text-orange-600 disabled:opacity-100" : "competition-primary text-white")}>
            <span className="competition-skew-label">{isRegistered ? <><UserCheck className="size-4" />已报名</> : ended ? "赛事已结束" : <>立即报名参赛<ArrowRight className="size-4" /></>}</span>
          </Button>
          <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-[#a18b7b]"><CheckCircle className="size-3.5 text-[#e6a17b]" />真实企业命题 · 专属实训环境</p>
        </aside>
      </div>
      <Link to="/competition" className="mt-8 inline-flex items-center gap-2 text-sm text-[#987c68] hover:text-[#fa541c]"><ArrowLeft className="size-4" />返回赛事列表</Link>
    </div>
  );
}
