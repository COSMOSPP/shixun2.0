import React, { useState } from 'react';
import { ChevronLeft, CheckCircle2, XCircle, Award, BarChart2, Clock, Target, Hash, ShieldCheck, Zap, AlertTriangle, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ExamResultProps {
  exam: any;
  onBack: () => void;
}

export default function ExamResult({ exam, onBack }: ExamResultProps) {
  const [activeTab, setActiveTab] = useState('overview'); // overview, detail, practical

  return (
    <div className="flex flex-col h-full bg-[#f5f6f8] relative w-[100vw] left-1/2 -translate-x-1/2 -mt-6">
      <div className="bg-[#1e1e2d] pt-8 pb-16 px-14 shadow-md relative overflow-hidden shrink-0">
        <div className="absolute right-0 top-0 w-96 h-96 bg-gradient-to-br from-[#fa541c]/20 to-transparent rounded-full blur-3xl rounded-tl"></div>
        <div className="max-w-6xl mx-auto flex items-start gap-8 relative z-10">
           <div className="flex-1">
             <div className="flex items-center text-[13px] text-neutral-400 mb-6 font-medium">
                <button onClick={onBack} className="hover:text-white flex items-center gap-1 transition-colors">
                  <ChevronLeft className="w-4 h-4" /> 返回我的考试
                </button>
             </div>
             <h1 className="text-3xl font-bold text-white mb-2">{exam.title} - 成绩报告</h1>
             <p className="text-neutral-400 text-[14px] mb-8">报告基于 AI 双盲评卷模型与自动化判分系统生成，客观公正。</p>
             
             <div className="flex flex-wrap gap-12 text-white">
                <div className="flex flex-col gap-1">
                  <div className="text-[13px] text-neutral-400 flex items-center gap-1.5"><Target className="w-4 h-4" /> 最终得分</div>
                  <div className="text-[36px] font-bold text-[#fa541c] leading-none">95<span className="text-[18px] text-neutral-400 ml-1">/ 100</span></div>
                  <div className="text-[12px] text-green-400 mt-1 bg-green-500/10 px-2 py-0.5 rounded inline-block w-fit">已达及格线 (60分)</div>
                </div>
                <div className="w-px h-16 bg-white/10"></div>
                
                <div className="flex flex-col gap-1">
                  <div className="text-[13px] text-neutral-400 flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> 综合正确率</div>
                  <div className="text-[28px] font-bold text-white leading-tight">92.5%</div>
                </div>
                
                <div className="flex flex-col gap-1">
                  <div className="text-[13px] text-neutral-400 flex items-center gap-1.5"><Award className="w-4 h-4" /> 击败参考人数</div>
                  <div className="text-[28px] font-bold text-white leading-tight">88%</div>
                  <div className="text-[12px] text-neutral-400 mt-1">班级排行: 5 / 42</div>
                </div>
                
                <div className="flex flex-col gap-1">
                  <div className="text-[13px] text-neutral-400 flex items-center gap-1.5"><Clock className="w-4 h-4" /> 用时统计</div>
                  <div className="text-[28px] font-bold text-white leading-tight">45:12</div>
                  <div className="text-[12px] text-neutral-400 mt-1">总允许时长: 120 分钟</div>
                </div>
             </div>
           </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full -mt-8 relative z-20 pb-12 flex gap-6">
         {/* Sidebar Tabs */}
         <div className="w-64 bg-white rounded-[12px] shadow-sm flex flex-col p-2 shrink-0 h-fit">
            {[
              { id: 'overview', label: '能力总览与错题', icon: BarChart2 },
              { id: 'detail', label: '客观题对错对比', icon: Hash },
              { id: 'practical', label: 'AI 主观与实操判卷', icon: Zap },
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-[8px] text-[14px] font-bold transition-colors text-left",
                  activeTab === tab.id ? "bg-[#fff2e8] text-[#fa541c]" : "text-neutral-body hover:bg-neutral-50 hover:text-neutral-title"
                )}
              >
                <tab.icon className="w-4 h-4" /> {tab.label}
              </button>
            ))}
         </div>

         {/* Content Area */}
         <div className="flex-1 flex flex-col gap-6">
            {activeTab === 'overview' && (
              <>
                {/* Score Breakdown Radar / Progress */}
                <div className="bg-white rounded-[12px] border border-neutral-border shadow-sm p-8">
                  <h3 className="font-bold text-[16px] text-neutral-title flex items-center gap-2 mb-6">
                     <BarChart2 className="w-5 h-5 text-[#fa541c]" /> 各题型表现雷达图
                  </h3>
                  <div className="grid grid-cols-2 gap-8">
                     <div className="space-y-4">
                       {[
                         { name: '单项选择题', score: '30 / 30', pct: 100 },
                         { name: '多项选择题', score: '15 / 20', pct: 75 },
                         { name: '判断题', score: '10 / 10', pct: 100 },
                         { name: '填空题', score: '10 / 10', pct: 100 },
                         { name: '代码与实操能力', score: '30 / 30', pct: 100 },
                       ].map((t, i) => (
                         <div key={i}>
                           <div className="flex justify-between text-[13px] mb-1">
                              <span className="font-bold text-neutral-title">{t.name}</span>
                              <span className="font-mono text-neutral-caption">{t.score} 分</span>
                           </div>
                           <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                              <div className={cn("h-full", t.pct === 100 ? "bg-green-500" : "bg-[#fa541c]")} style={{ width: `${t.pct}%` }}></div>
                           </div>
                         </div>
                       ))}
                     </div>
                     <div className="bg-[#fafafa] rounded-[12px] p-6 border border-neutral-border flex items-center justify-center relative">
                        <div className="w-48 h-48 rounded-full border-4 border-[#fff2e8] border-t-[#fa541c] border-r-[#fa541c] animate-[spin_3s_linear_infinite]"></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                           <ShieldCheck className="w-10 h-10 text-green-500 mb-2" />
                           <span className="font-bold text-neutral-title">综合评价: 优秀</span>
                        </div>
                     </div>
                  </div>
                </div>

                {/* Wrong Questions Recap */}
                <div className="bg-white rounded-[12px] border border-neutral-border shadow-sm p-8">
                  <h3 className="font-bold text-[16px] text-neutral-title flex items-center gap-2 mb-6">
                     <AlertTriangle className="w-5 h-5 text-[#fa541c]" /> 错题与薄弱点汇总
                  </h3>
                  <div className="space-y-4">
                     <div className="p-4 rounded-[8px] bg-red-50 border border-red-100 flex gap-4 items-start">
                        <span className="w-8 h-8 flex items-center justify-center bg-white text-red-500 font-bold rounded shadow-sm shrink-0">12</span>
                        <div>
                          <p className="text-[14px] font-bold text-neutral-title mb-2">多选题：在 Pandas 中如何对缺失值进行填充？</p>
                          <div className="text-[13px] text-neutral-body space-y-1">
                             <div><span className="text-red-500 font-medium">您的答案:</span> A. dropna() , B. fillna()</div>
                             <div><span className="text-green-600 font-medium">正确答案:</span> B. fillna() , C. interpolate()</div>
                             <div className="text-neutral-caption mt-2 p-2 bg-white rounded border border-neutral-200">
                                <strong>AI 诊断建议:</strong> 分析显示您对插值函数 interpolate() 的掌握不够熟练，建议复习《数据清洗》模块。
                             </div>
                          </div>
                        </div>
                     </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'detail' && (
              <div className="bg-white rounded-[12px] border border-neutral-border shadow-sm p-8">
                <h3 className="font-bold text-[16px] text-neutral-title flex items-center gap-2 mb-6">
                   <Hash className="w-5 h-5 text-[#fa541c]" /> 单题答案全景对比 (AI 自动判分)
                </h3>
                <div className="border border-neutral-200 rounded-[8px] overflow-hidden">
                   <table className="w-full text-left border-collapse text-[13px]">
                     <thead className="bg-[#f5f6f8] text-neutral-caption font-bold border-b border-neutral-200">
                       <tr>
                         <th className="p-3 w-16 text-center">题号</th>
                         <th className="p-3">题目类型</th>
                         <th className="p-3">您的答案</th>
                         <th className="p-3">标准答案</th>
                         <th className="p-3 w-20 text-center">结果</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-neutral-100 bg-white text-neutral-body">
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                           <tr key={num} className="hover:bg-neutral-50 transition-colors">
                             <td className="p-3 text-center font-mono font-bold">{num}</td>
                             <td className="p-3 text-neutral-title font-bold">单项选择题</td>
                             <td className="p-3 text-green-600 font-bold">C. list</td>
                             <td className="p-3">C. list</td>
                             <td className="p-3 flex justify-center"><CheckCircle2 className="w-4 h-4 text-green-500" /></td>
                           </tr>
                        ))}
                        <tr className="hover:bg-neutral-50 transition-colors bg-red-50/30">
                          <td className="p-3 text-center font-mono font-bold">7</td>
                          <td className="p-3 text-neutral-title font-bold">判断题</td>
                          <td className="p-3 text-red-500 font-bold">错误</td>
                          <td className="p-3">正确</td>
                          <td className="p-3 flex justify-center"><XCircle className="w-4 h-4 text-red-500" /></td>
                        </tr>
                     </tbody>
                   </table>
                </div>
              </div>
            )}

            {activeTab === 'practical' && (
              <div className="bg-white rounded-[12px] border border-neutral-border shadow-sm p-8">
                <h3 className="font-bold text-[16px] text-neutral-title flex items-center gap-2 mb-6">
                   <Zap className="w-5 h-5 text-[#fa541c]" /> AI 主观与实操综合评判链
                </h3>
                
                <div className="mb-8">
                  <div className="font-bold text-[15px] mb-3 text-neutral-title">代码题：合并两个有序数组</div>
                  <div className="p-5 bg-[#fafafa] border border-neutral-200 rounded-[8px]">
                     <div className="flex items-center justify-between mb-4 border-b border-neutral-200 pb-3">
                        <span className="text-[13px] font-bold text-neutral-body">AI 审查结果：满分 (10/10)</span>
                        <div className="flex gap-2 text-[12px]">
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full border border-green-200">时空复杂度达标</span>
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full border border-blue-200">无溢出缺陷</span>
                        </div>
                     </div>
                     <p className="text-[13px] text-neutral-caption leading-relaxed">
                       学员使用的双指针算法非常出色地在 O(N+M) 的时间复杂度内完成了归并操作，没有触发任何边界溢出，满足了本考点的所有要求，系统予以满分放行。
                     </p>
                  </div>
                </div>

                <div>
                  <div className="font-bold text-[15px] mb-3 text-neutral-title">实操题：Nginx 配置与测试 (沙盒探针取证)</div>
                  <div className="p-5 bg-[#fafafa] border border-neutral-200 rounded-[8px]">
                     <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 bg-white p-3 border border-neutral-100 shadow-sm rounded">
                           <CheckCircle2 className="w-5 h-5 text-green-500" />
                           <div className="text-[13px]">
                             <div className="font-bold text-neutral-title">端口监视器状态</div>
                             <div className="text-neutral-caption">Nginx 成功代理在 8080 端口，且启动成功。</div>
                           </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white p-3 border border-neutral-100 shadow-sm rounded">
                           <CheckCircle2 className="w-5 h-5 text-green-500" />
                           <div className="text-[13px]">
                             <div className="font-bold text-neutral-title">配置文件验证 (nginx.conf)</div>
                             <div className="text-neutral-caption">语法审查完毕，无多余的分号遗漏。</div>
                           </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white p-3 border border-neutral-100 shadow-sm rounded">
                           <XCircle className="w-5 h-5 text-red-500" />
                           <div className="text-[13px]">
                             <div className="font-bold text-neutral-title">请求转发连通性 (curl test)</div>
                             <div className="text-neutral-caption">未正确拦截 /api/ 开头的路径。</div>
                           </div>
                        </div>
                     </div>
                     <div className="mt-4 pt-4 border-t border-neutral-200 text-[13px] text-[#fa541c] font-bold text-right">
                        该题得分：12 / 20 分 (部分达标)
                     </div>
                  </div>
                </div>
              </div>
            )}
         </div>
      </div>
    </div>
  );
}
