import React, { useState } from 'react';
import { Plus, Search, FileText, Copy, Eye, Trash2, Filter, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function TeacherPapers() {
  const [searchTerm, setSearchTerm] = useState('');

  const papers = [
    {
      id: 1,
      name: '2026春季机器学习期中考试',
      description: '涵盖线性回归、逻辑回归、SVM等基础算法',
      questionCount: 50,
      types: ['单选', '多选', '编程'],
      type: '考试',
      status: '启用',
      creator: '张老师',
      updateTime: '2026-03-25 10:00'
    },
    {
      id: 2,
      name: '深度学习第一周随堂测验',
      description: '神经网络基础概念测试',
      questionCount: 15,
      types: ['单选', '填空'],
      type: '测验',
      status: '启用',
      creator: '李老师',
      updateTime: '2026-03-26 14:30'
    },
    {
      id: 3,
      name: 'Python编程实战练习卷',
      description: '基础语法与数据结构综合练习',
      questionCount: 10,
      types: ['编程', '实训'],
      type: '练习',
      status: '禁用',
      creator: '王老师',
      updateTime: '2026-03-20 09:15'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-title flex items-center gap-2">
          <FileText className="w-6 h-6 text-[#fa541c]" />
          试卷管理
        </h1>
      </div>

      {/* Action Bar */}
      <div className="bg-white p-4 rounded-xl border border-neutral-border shadow-sm flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <Button className="bg-[#fa541c] hover:bg-[#e84a15] text-white flex items-center gap-1.5 shadow-sm">
            <Plus className="w-4 h-4" /> 新建试卷
          </Button>
          <Button variant="outline" className="flex items-center gap-1.5">
            <Settings className="w-4 h-4" /> 批量设置
          </Button>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input 
              type="text" 
              placeholder="搜索试卷名称/说明" 
              className="pl-9 pr-4 py-2 text-sm border border-neutral-border rounded-lg focus:outline-none focus:border-[#fa541c] focus:ring-1 focus:ring-[#fa541c] w-64 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="px-3">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-neutral-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b border-neutral-border bg-neutral-50 text-sm text-neutral-caption">
                <th className="p-4 font-medium">试卷名称</th>
                <th className="p-4 font-medium">包含题型</th>
                <th className="p-4 font-medium">题目数量</th>
                <th className="p-4 font-medium">试卷类型</th>
                <th className="p-4 font-medium">状态</th>
                <th className="p-4 font-medium">更新时间</th>
                <th className="p-4 font-medium text-right">操作</th>
              </tr>
            </thead>
            <tbody>
              {papers.map(p => (
                <tr key={p.id} className="border-b border-neutral-border/50 hover:bg-neutral-50/50 transition-colors group text-sm">
                  <td className="p-4">
                    <div className="font-medium text-neutral-title max-w-[250px] truncate" title={p.name}>{p.name}</div>
                    <div className="text-xs text-neutral-caption max-w-[250px] truncate mt-1" title={p.description}>{p.description}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1 flex-wrap max-w-[150px]">
                      {p.types.map(type => (
                        <span key={type} className="px-1.5 py-0.5 text-[10px] bg-blue-50 text-blue-600 rounded border border-blue-100">{type}</span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-neutral-title">{p.questionCount}</span> <span className="text-xs text-neutral-caption">题</span>
                  </td>
                  <td className="p-4">
                    <span className={cn(
                      "px-2 py-1 text-xs rounded-md border",
                      p.type === '考试' ? "bg-purple-50 text-purple-600 border-purple-100" : 
                      p.type === '测验' ? "bg-orange-50 text-orange-600 border-orange-100" : 
                      "bg-green-50 text-green-600 border-green-100"
                    )}>{p.type}</span>
                  </td>
                  <td className="p-4">
                    <span className={cn("px-2 py-1 text-xs rounded-md", p.status === '启用' ? "bg-green-50 text-green-600" : "bg-neutral-100 text-neutral-500")}>
                      {p.status}
                    </span>
                  </td>
                  <td className="p-4 text-xs text-neutral-caption">
                    <div>{p.updateTime}</div>
                    <div>{p.creator}</div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-500 hover:text-[#fa541c] hover:bg-[#fff2e8]" title="查看">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-500 hover:text-blue-600 hover:bg-blue-50" title="复制">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-500 hover:text-red-600 hover:bg-red-50" title="删除">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-neutral-border bg-neutral-50/50">
          <div className="flex items-center gap-4">
            <span className="text-sm text-neutral-caption">共 <span className="font-medium text-neutral-title">{papers.length}</span> 条数据</span>
            <select className="text-sm border border-neutral-border rounded-md px-2 py-1 focus:outline-none focus:border-[#fa541c]">
              <option>10条/页</option>
              <option>20条/页</option>
              <option>50条/页</option>
            </select>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-md" disabled>&lt;</Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-md bg-[#fa541c] text-white border-[#fa541c]">1</Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-md">&gt;</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
