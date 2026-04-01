import React, { useState } from 'react';
import { ChevronLeft, Download, Bookmark, Plus, FileText, Database, HardDrive, Clock, Search, Folder, Image as ImageIcon, FileCode2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

interface DatasetDetailProps {
  dataset: any;
  onBack: () => void;
}

export default function DatasetDetail({ dataset, onBack }: DatasetDetailProps) {
  const [activeTab, setActiveTab] = useState('files');
  const [showAddToProjectModal, setShowAddToProjectModal] = useState(false);

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)] bg-[#f5f5f5] w-[100vw] relative left-1/2 -translate-x-1/2 -mt-6">
      {/* Banner / Header */}
      <div className="bg-white border-b border-neutral-border pt-8 pb-8 px-14 shadow-sm relative shrink-0">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-start mb-6">
             <div>
                <div className="flex items-center text-[13px] text-neutral-caption mb-4">
                  <button onClick={onBack} className="hover:text-[#fa541c] flex items-center gap-1 transition-colors">
                    <ChevronLeft className="w-4 h-4" /> 返回数据集列表
                  </button>
                  <span className="mx-2">/</span>
                  <span className="text-neutral-title font-medium">{dataset.title}</span>
                </div>
                <div className="flex items-center gap-4 mb-3">
                   <h1 className="text-3xl font-bold text-neutral-title">{dataset.title}</h1>
                   <span className="px-2 py-1 bg-[#fff2e8] text-[#fa541c] text-[12px] font-bold rounded border border-[#ffbb96]">{dataset.type}</span>
                </div>
                <div className="flex items-center gap-6 text-[13px] text-neutral-body">
                   <div className="flex items-center gap-2">
                     <img src="https://i.pravatar.cc/150?u=1" alt="avatar" className="w-6 h-6 rounded-full" />
                     <span className="font-bold text-neutral-title">数据科学实验室</span>
                   </div>
                   <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-neutral-caption" /> {dataset.updated} 更新</div>
                   <div className="flex items-center gap-1.5"><HardDrive className="w-4 h-4 text-neutral-caption" /> 总容量: {dataset.size}</div>
                   <div className="flex items-center gap-1.5"><Database className="w-4 h-4 text-neutral-caption" /> 样本数: {dataset.items} 条</div>
                </div>
             </div>
             
             <div className="flex items-center gap-3">
                 <Button variant="outline" className="h-10 px-4 rounded-[6px] border-neutral-300 gap-2">
                    <Bookmark className="w-4 h-4 text-neutral-caption" /> 收藏数据集
                 </Button>
                 <Button variant="outline" className="h-10 px-4 rounded-[6px] border-neutral-300 gap-2 hover:bg-neutral-50 hover:text-[#fa541c]">
                    <Download className="w-4 h-4 text-[#fa541c]" /> 下载数据集
                 </Button>
                 <Button 
                   onClick={() => setShowAddToProjectModal(true)}
                   className="h-10 px-6 rounded-[6px] bg-[#fa541c] hover:bg-[#d4380d] text-white shadow-md gap-2"
                 >
                    <Plus className="w-4 h-4" /> 添加到项目
                 </Button>
             </div>
          </div>
          <p className="text-[14px] text-neutral-body max-w-4xl leading-relaxed">
             {dataset.desc} 当前版本汇集了最新采集的高精度特征数据，经清洗与脱敏处理，具备良好的统计分布特性。您可以直接在实验环境中挂载该数据集用于大模型训练与微调。
          </p>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full py-6 flex flex-col gap-6">
         {/* Tabs */}
         <div className="flex items-center gap-6 border-b border-neutral-border px-2">
            {[
              { id: 'files', label: '文件树与在线预览' },
              { id: 'projects', label: '关联与衍生项目 (24)' },
              { id: 'discuss', label: '讨论区' }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "py-3 text-[15px] font-bold transition-all relative",
                  activeTab === tab.id ? "text-[#fa541c]" : "text-neutral-body hover:text-neutral-title"
                )}
              >
                 {tab.label}
                 {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#fa541c]"></div>}
              </button>
            ))}
         </div>

         {/* Tab Content */}
         {activeTab === 'files' && (
           <div className="bg-white rounded-[12px] border border-neutral-border shadow-sm flex flex-1 min-h-[500px] overflow-hidden">
              {/* Left Tree */}
              <div className="w-80 border-r border-neutral-border bg-[#fafafa] flex flex-col shrink-0">
                 <div className="p-3 border-b border-neutral-border">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-caption" />
                      <Input placeholder="搜索文件名称..." className="pl-8 h-8 text-[13px] bg-white border-neutral-300" />
                    </div>
                 </div>
                 <div className="flex-1 p-2 space-y-1 overflow-y-auto w-full">
                    {/* Mock tree items */}
                    <div className="flex flex-col w-full text-[13px]">
                       <div className="flex items-center py-1.5 px-2 hover:bg-neutral-100 rounded cursor-pointer text-neutral-title font-medium gap-2">
                          <Folder className="w-4 h-4 text-[#fa541c] fill-current" /> data_samples
                       </div>
                       <div className="ml-5 flex flex-col w-full">
                          <div className="flex items-center py-1.5 px-2 bg-neutral-100 rounded cursor-pointer text-[#fa541c] font-medium gap-2">
                             <FileText className="w-4 h-4" /> validation_set.csv
                          </div>
                          <div className="flex items-center py-1.5 px-2 hover:bg-neutral-100 rounded cursor-pointer text-neutral-title font-medium gap-2 group">
                             <FileCode2 className="w-4 h-4 text-orange-400" /> train_metadata.json
                          </div>
                       </div>
                       <div className="flex items-center py-1.5 px-2 hover:bg-neutral-100 rounded cursor-pointer text-neutral-title font-medium gap-2 mt-1">
                          <Folder className="w-4 h-4 text-neutral-400 fill-current" /> raw_images
                       </div>
                    </div>
                 </div>
              </div>
              
              {/* Right Preview */}
              <div className="flex-1 bg-white flex flex-col min-w-0">
                 <div className="h-12 border-b border-neutral-border flex items-center px-4 justify-between bg-white text-[13px]">
                    <div className="flex items-center gap-2 font-bold text-neutral-title">
                       <FileText className="w-4 h-4 text-neutral-caption" /> validation_set.csv <span className="text-neutral-caption font-normal ml-2">1.2 MB</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 text-[#fa541c] hover:bg-[#fff2e8] gap-2 text-[12px]">
                       <Eye className="w-3.5 h-3.5" /> 预览全屏
                    </Button>
                 </div>
                 <div className="flex-1 p-4 overflow-auto bg-[#fafafa]">
                    <table className="w-full text-left border-collapse text-[13px] bg-white border border-neutral-200 shadow-sm rounded">
                       <thead className="bg-[#f5f6f8] text-neutral-caption border-b border-neutral-200 sticky top-0">
                         <tr>
                            <th className="p-2 border-r">ID</th>
                            <th className="p-2 border-r">feature_1</th>
                            <th className="p-2 border-r">feature_2</th>
                            <th className="p-2 border-r">label</th>
                            <th className="p-2">timestamp</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-neutral-100">
                         {[1,2,3,4,5,6,7,8,9,10].map(row => (
                            <tr key={row} className="hover:bg-neutral-50 font-mono text-neutral-body">
                               <td className="p-2 border-r">{row}</td>
                               <td className="p-2 border-r">0.{Math.random().toString().slice(2, 6)}</td>
                               <td className="p-2 border-r">-0.{Math.random().toString().slice(2, 6)}</td>
                               <td className="p-2 border-r">{'Class_A'}</td>
                               <td className="p-2">2026-03-{(10+row).toString()}</td>
                            </tr>
                         ))}
                       </tbody>
                    </table>
                 </div>
              </div>
           </div>
         )}
         
         {activeTab === 'projects' && (
           <div className="text-[14px] text-neutral-body text-center py-20 bg-white rounded-[12px] border border-neutral-border">
             该功能展示正在使用此数据集的项目列表。
           </div>
         )}
      </div>

      {/* Modal Tool Add to Project... */}
      {showAddToProjectModal && (
         <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="w-[500px] bg-white rounded-[16px] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
               <div className="px-6 py-4 flex justify-between items-center border-b border-neutral-100">
                  <h3 className="font-bold text-[18px] text-neutral-title">将数据集添加到你的项目</h3>
                  <button onClick={() => setShowAddToProjectModal(false)} className="text-neutral-caption hover:text-neutral-title text-xl">&times;</button>
               </div>
               <div className="p-6 space-y-6">
                  <p className="text-[14px] text-neutral-body">请选择将 <strong>{dataset.title}</strong> 挂载到哪个项目中：</p>
                  <div className="space-y-3 max-h-48 overflow-y-auto p-2 border border-neutral-200 rounded-[8px] bg-[#fafafa]">
                     {["智能问答机器人实验", "房价预测分析模型", "电商数据多维清洗脚本"].map(p => (
                        <label key={p} className="flex items-center gap-3 p-3 bg-white border border-neutral-200 rounded cursor-pointer hover:border-[#fa541c] transition-colors">
                           <input type="radio" name="project_bind" className="accent-[#fa541c]" />
                           <span className="text-[14px] font-medium text-neutral-title">{p}</span>
                        </label>
                     ))}
                  </div>
                  <div className="flex justify-between items-center mt-4">
                     <span className="text-[13px] text-neutral-caption">没找到想要的？</span>
                     <Button variant="link" className="text-[#fa541c] h-auto p-0">新建项目</Button>
                  </div>
               </div>
               <div className="bg-[#f5f6f8] px-6 py-4 flex justify-end gap-3 border-t border-neutral-border">
                  <Button variant="outline" onClick={() => setShowAddToProjectModal(false)}>取消</Button>
                  <Button onClick={() => setShowAddToProjectModal(false)} className="bg-[#fa541c] hover:bg-[#d4380d] text-white">确定挂载</Button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
}
