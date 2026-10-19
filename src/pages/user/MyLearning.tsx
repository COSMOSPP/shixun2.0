import { useState } from "react";
import { Link } from "react-router-dom";
import { Award, BookOpen, ChevronRight, Clock } from "lucide-react";
import ExamResult from "@/components/ExamResult";
import LearningHistory from "@/components/LearningHistory";
import LearningDuration from "@/components/LearningDuration";
import LearningScores, { type LearningExamResult } from "@/components/LearningScores";
import { cn } from "@/lib/utils";

const sections = [
  { id: "learning", label: "我的学习", icon: BookOpen },
  { id: "duration", label: "学习时长", icon: Clock },
  { id: "scores", label: "查看成绩", icon: Award },
] as const;

type LearningSection = typeof sections[number]["id"];

export default function MyLearning() {
  const [activeTab, setActiveTab] = useState<LearningSection>("learning");
  const [selectedExam, setSelectedExam] = useState<LearningExamResult | null>(null);
  const activeSection = sections.find(section => section.id === activeTab)!;

  if (selectedExam) {
    return <ExamResult exam={selectedExam} directPreview onBack={() => setSelectedExam(null)} />;
  }

  return (
    <div className="relative flex h-full w-full overflow-hidden bg-white font-sans shadow-sm">
      <aside className="flex w-[200px] shrink-0 flex-col border-r border-neutral-200 bg-white">
        <div className="border-b border-neutral-200 p-5">
          <h2 className="text-lg font-semibold text-neutral-900">学习中心</h2>
        </div>
        <nav aria-label="学习中心" className="flex-1 space-y-1 p-4">
          {sections.map(section => (
            <button key={section.id} onClick={() => setActiveTab(section.id)}
              aria-current={activeTab === section.id ? "page" : undefined}
              className={cn("flex w-full cursor-pointer items-center gap-3 rounded-[8px] px-3 py-2.5 text-left text-[14px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-orange-400",
                activeTab === section.id ? "bg-[#fff2e8] text-[#fa541c]" : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900")}>
              <section.icon className="size-5" />{section.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="min-w-0 flex-1 overflow-auto bg-[#f5f6f8] p-4 sm:p-6">
        <nav aria-label="面包屑" className="mb-4 flex shrink-0 items-center text-sm text-neutral-caption">
          <Link to="/user" className="cursor-pointer transition-colors hover:text-primary">首页</Link>
          <ChevronRight aria-hidden="true" className="mx-1 size-4" />
          <button type="button" onClick={() => setActiveTab("learning")} className="cursor-pointer transition-colors hover:text-primary">学习中心</button>
          <ChevronRight aria-hidden="true" className="mx-1 size-4" />
          <span aria-current="page" className="font-medium text-neutral-title">{activeSection.label}</span>
        </nav>
        {activeTab === "learning" && <LearningHistory />}
        {activeTab === "duration" && <LearningDuration />}
        {activeTab === "scores" && <LearningScores onPreview={setSelectedExam} />}
      </main>
    </div>
  );
}
