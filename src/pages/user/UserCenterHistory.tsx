import { ChevronRight, MonitorPlay, FolderKanban } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function UserCenterHistory() {
  return (
    <div className="space-y-6">
      <div className="flex items-center text-sm text-neutral-caption mb-4">
        <Link to="/user" className="hover:text-primary cursor-pointer transition-colors">首页</Link>
        <ChevronRight className="w-4 h-4 mx-1" />
        <Link to="/user/center" className="hover:text-primary cursor-pointer transition-colors">个人中心</Link>
        <ChevronRight className="w-4 h-4 mx-1" />
        <span className="text-neutral-title font-medium">历史记录</span>
      </div>

      <div className="bg-white rounded-xl border border-neutral-border shadow-sm p-6 min-h-[600px]">
        {/* Content */}
        <div className="relative border-l-2 border-neutral-border/50 ml-6 pl-6 space-y-8 pb-8">
          {/* Today */}
          <div className="relative">
            <div className="absolute w-3 h-3 bg-primary rounded-full -left-[31px] top-1.5 ring-4 ring-primary/20" />
            <h3 className="text-base font-bold text-neutral-title mb-4">今天</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 border border-neutral-border rounded-lg hover:bg-neutral-bg transition-colors">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                  <MonitorPlay className="w-6 h-6 text-blue-500" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-neutral-title">Python数据分析与实战</h4>
                </div>
                <Button variant="outline" size="sm" className="ml-4 h-8">继续学习</Button>
              </div>
            </div>
          </div>

          {/* Yesterday */}
          <div className="relative">
            <div className="absolute w-3 h-3 bg-neutral-border rounded-full -left-[31px] top-1.5" />
            <h3 className="text-base font-bold text-neutral-title mb-4">昨天</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 border border-neutral-border rounded-lg hover:bg-neutral-bg transition-colors">
                <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
                  <FolderKanban className="w-6 h-6 text-indigo-500" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-neutral-title">个人博客系统开发 (项目实训)</h4>
                </div>
                <Button variant="outline" size="sm" className="ml-4 h-8">进入项目</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
