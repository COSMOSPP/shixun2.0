import React from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { 
  Search,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  LayoutTemplate, 
  FileQuestion, 
  BookOpenCheck, 
  Lightbulb, 
  Presentation, 
  BookText, 
  ClipboardCheck, 
  Image as ImageIcon, 
  Video, 
  MessageSquareMore, 
  Network, 
  MonitorPlay 
} from "lucide-react";
import { cn } from "@/lib/utils";

const assistants = [
  {
    id: 1,
    title: "AI 可视化助手（推荐）",
    description: "支持输入教学主题，一键生成教学知识并转化为可视化精美网页，还推荐相关学习资料。",
    icon: LayoutTemplate,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    id: 2,
    title: "AI 出题助手（推荐）",
    description: "根据输入主题、难度、题型、知识点、题目数量，自动生成题目。",
    icon: FileQuestion,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    id: 3,
    title: "AI 生成教案（推荐）",
    description: "支持根据主题方向、特定需求、参考标准等，一站式生成单元教案及作业。",
    icon: BookOpenCheck,
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
  },
  {
    id: 4,
    title: "解题助手",
    description: "支持题目截图、文字输入解题等等。",
    icon: Lightbulb,
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-500",
  },
  {
    id: 5,
    title: "课堂教学设计生成",
    description: "根据输入主题课程内容，自动生成课堂教学设计方案大纲。",
    icon: Presentation,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
  },
  {
    id: 6,
    title: "论文速读",
    description: "智能总结论文研究背景、核心方法、主要结论和应用价值等。",
    icon: BookText,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-500",
  },
  {
    id: 7,
    title: "作业批改",
    description: "根据输入的作业、试卷，智能生成批改结果、打分、以及评语，为教师提升评阅效率。",
    icon: ClipboardCheck,
    iconBg: "bg-teal-50",
    iconColor: "text-teal-500",
  },
  {
    id: 8,
    title: "图片生成",
    description: "根据文案生成不同风格图片。",
    icon: ImageIcon,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-500",
  },
  {
    id: 9,
    title: "视频生成",
    description: "根据文本描述的内容快速生成视频，支持根据用户需求调整风格和时长。",
    icon: Video,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-600",
  },
  {
    id: 10,
    title: "多模态聊天助手",
    description: "支持文生文、文生图、文生视频、文档解析的多模态 AI 助手。",
    icon: MessageSquareMore,
    iconBg: "bg-cyan-50",
    iconColor: "text-cyan-500",
  },
  {
    id: 11,
    title: "AI 知识图谱",
    description: "AI 辅助绘制知识图谱，图谱化数据。",
    icon: Network,
    iconBg: "bg-fuchsia-50",
    iconColor: "text-fuchsia-500",
  },
  {
    id: 12,
    title: "PPT 制作助手",
    description: "PPT 生成工具，一句话生成完整 PPT 内容。",
    icon: MonitorPlay,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
  }
];

export default function UserAIAssistant() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col bg-[#f5f6f8] relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-neutral-title">AI 助手</h1>
        </div>
        <button 
          onClick={() => navigate('/user/ai/assistant/studio')}
          className="flex items-center gap-2 px-6 py-2 bg-[#fa541c] text-white rounded-full text-[14px] font-bold hover:bg-[#e64a19] transition-colors shadow-sm"
        >
          <span className="text-[16px] leading-none mb-[2px]">+</span> 创建新助手
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-start gap-4">
          <span className="text-[14px] text-neutral-body font-medium whitespace-nowrap mt-1.5">助手类型</span>
          <div className="flex flex-wrap gap-2">
            {["全部", "教学辅助", "学习工具", "内容生成", "数据分析"].map((tag, i) => (
              <button 
                key={i}
                className={cn(
                  "px-4 py-1.5 rounded-full text-[13px] transition-colors",
                  i === 0 ? "bg-[#fa541c] text-white" : "bg-white border border-neutral-border text-neutral-body hover:text-[#fa541c] hover:border-[#fa541c]"
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center bg-white rounded-full p-1 border border-neutral-border">
          <button className="px-6 py-1.5 rounded-full text-[14px] font-medium bg-[#f5f6f8] text-neutral-title">
            最新
          </button>
          <button className="px-6 py-1.5 rounded-full text-[14px] font-medium text-neutral-body hover:text-neutral-title">
            最热
          </button>
        </div>
        
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-caption" />
          <Input 
            placeholder="输入助手名称搜索" 
            className="pl-9 h-10 text-[14px] rounded-full border-neutral-border bg-white focus-visible:ring-[#fa541c]" 
          />
        </div>
      </div>

        <div className="flex-1 pr-2 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {assistants.map((assistant) => {
                const Icon = assistant.icon;
                return (
                  <div 
                    key={assistant.id} 
                    className="bg-white rounded-[12px] overflow-hidden border border-neutral-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group flex flex-col cursor-pointer p-6"
                  >
                    <div className={cn("w-12 h-12 rounded-[12px] flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110", assistant.iconBg, assistant.iconColor)}>
                      <Icon className="w-6 h-6" strokeWidth={2} />
                    </div>
                    <h3 className="text-[16px] font-bold text-neutral-title mb-3 group-hover:text-[#fa541c] transition-colors">
                      {assistant.title}
                    </h3>
                    <p className="text-[13px] text-neutral-caption leading-relaxed flex-1">
                      {assistant.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Load More / Pagination */}
            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 flex items-center justify-center rounded-[4px] border border-neutral-border text-neutral-caption hover:text-[#fa541c] hover:border-[#fa541c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-[4px] bg-[#fa541c] text-white font-medium">1</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-[4px] border border-neutral-border text-neutral-body hover:text-[#fa541c] hover:border-[#fa541c] transition-colors">2</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-[4px] border border-neutral-border text-neutral-body hover:text-[#fa541c] hover:border-[#fa541c] transition-colors">3</button>
                <span className="px-2 text-neutral-caption">...</span>
                <button className="w-8 h-8 flex items-center justify-center rounded-[4px] border border-neutral-border text-neutral-body hover:text-[#fa541c] hover:border-[#fa541c] transition-colors">5</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-[4px] border border-neutral-border text-neutral-body hover:text-[#fa541c] hover:border-[#fa541c] transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center gap-4 text-[13px] text-neutral-body">
                <div className="flex items-center gap-2">
                  <span>每页</span>
                  <button className="flex items-center gap-1 px-2 py-1 border border-neutral-border rounded-[4px] hover:border-[#fa541c] transition-colors">
                    20 <ChevronDown className="w-3 h-3" />
                  </button>
                  <span>条</span>
                </div>
                <span>共 45 个助手</span>
              </div>
            </div>
        </div>
    </div>
  );
}

