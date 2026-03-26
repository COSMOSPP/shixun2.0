import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  ChevronRight, 
  ChevronDown, 
  ChevronLeft,
  Users,
  Star,
  Monitor,
  Tag
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function UserProjects() {
  const projects = [
    {
      title: "图像分类项目",
      desc: "基于CNN的图像分类实战，涵盖数据预处理、模型构建与训练。",
      image: "https://picsum.photos/seed/proj1/400/225",
      participants: "1,234",
      rating: 4.8,
      difficulty: "中级",
      tags: ["AI", "CV"],
      status: "continue"
    },
    {
      title: "文本情感分析项目",
      desc: "NLP实战：使用深度学习模型对海量文本进行情感倾向分析。",
      image: "https://picsum.photos/seed/proj2/400/225",
      participants: "987",
      rating: 4.7,
      difficulty: "中高级",
      tags: ["AI", "NLP"],
      status: "start"
    },
    {
      title: "电商数据可视化大屏",
      desc: "使用 ECharts 和 React 构建实时动态的电商销售数据大屏。",
      image: "https://picsum.photos/seed/proj3/400/225",
      participants: "2,156",
      rating: 4.9,
      difficulty: "初级",
      tags: ["数据分析", "可视化"],
      status: "start"
    },
    {
      title: "目标检测系统开发",
      desc: "基于 YOLOv8 的实时目标检测系统，支持自定义数据集训练。",
      image: "https://picsum.photos/seed/proj4/400/225",
      participants: "856",
      rating: 4.6,
      difficulty: "高级",
      tags: ["AI", "CV"],
      status: "continue"
    },
    {
      title: "用户行为数据清洗",
      desc: "使用 Pandas 处理千万级用户行为日志，提取有效特征。",
      image: "https://picsum.photos/seed/proj5/400/225",
      participants: "1,432",
      rating: 4.8,
      difficulty: "中级",
      tags: ["数据分析", "数据清洗"],
      status: "start"
    },
    {
      title: "全栈博客系统开发",
      desc: "从零开始构建基于 Next.js 和 Node.js 的全栈博客平台。",
      image: "https://picsum.photos/seed/proj6/400/225",
      participants: "3,210",
      rating: 4.9,
      difficulty: "中级",
      tags: ["Web开发", "全栈"],
      status: "start"
    },
    {
      title: "智能问答机器人",
      desc: "结合大语言模型API，开发具备上下文记忆的智能客服机器人。",
      image: "https://picsum.photos/seed/proj7/400/225",
      participants: "1,890",
      rating: 4.8,
      difficulty: "中高级",
      tags: ["AI", "NLP"],
      status: "start"
    },
    {
      title: "房价预测机器学习模型",
      desc: "使用 Scikit-Learn 构建回归模型，预测城市二手房价格走势。",
      image: "https://picsum.photos/seed/proj8/400/225",
      participants: "2,450",
      rating: 4.7,
      difficulty: "初级",
      tags: ["数据分析", "机器学习"],
      status: "continue"
    }
  ];

  return (
    <div className="flex flex-col h-full bg-[#f5f6f8] relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-neutral-title">全部项目</h1>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-start gap-4">
          <span className="text-[14px] text-neutral-body font-medium whitespace-nowrap mt-1.5">项目标签</span>
          <div className="flex flex-wrap gap-2">
            {["全部", "AI实战", "数据分析", "Web开发", "图像分类", "目标检测", "NLP应用", "数据清洗", "可视化", "机器学习", "前端开发", "后端开发"].map((tag, i) => (
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
            placeholder="输入项目名称或描述搜索" 
            className="pl-9 h-10 text-[14px] rounded-full border-neutral-border bg-white focus-visible:ring-[#fa541c]" 
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 gap-6 min-h-0">
        {/* Project Grid */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto pr-2 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {projects.map((project, i) => (
                <div 
                  key={i} 
                  className="bg-white rounded-[12px] overflow-hidden border border-neutral-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group flex flex-col cursor-pointer"
                >
                  {/* Cover Image */}
                  <div className="relative aspect-video overflow-hidden bg-neutral-bg">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-[16px] font-bold text-neutral-title mb-2 line-clamp-1 group-hover:text-[#fa541c] transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-[13px] text-neutral-caption mb-3 line-clamp-1">
                      {project.desc}
                    </p>
                    
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-[#f5f6f8] text-neutral-body text-[12px] rounded-[4px]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-auto pt-3 border-t border-neutral-border flex items-center justify-between text-[12px] text-neutral-caption">
                      <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        <span>{project.participants} 参与</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-[#faad14] fill-[#faad14]" />
                        <span className="text-[#faad14] font-medium">{project.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
                <button className="w-8 h-8 flex items-center justify-center rounded-[4px] border border-neutral-border text-neutral-body hover:text-[#fa541c] hover:border-[#fa541c] transition-colors">4</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-[4px] border border-neutral-border text-neutral-body hover:text-[#fa541c] hover:border-[#fa541c] transition-colors">5</button>
                <span className="px-2 text-neutral-caption">...</span>
                <button className="w-8 h-8 flex items-center justify-center rounded-[4px] border border-neutral-border text-neutral-body hover:text-[#fa541c] hover:border-[#fa541c] transition-colors">20</button>
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
                <span>共 234 个项目</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
