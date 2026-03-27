import React, { useState } from 'react';
import { Plus, Upload, Globe, Search, Brain, FileQuestion, Copy, Eye, Trash2, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function TeacherQuestions() {
  const [searchTerm, setSearchTerm] = useState('');

  const questions = [
    {
      id: 1,
      name: '什么是机器学习？',
      bank: '人工智能基础',
      type: '单选',
      status: '启用',
      source: '人工出题',
      difficulty: '简单',
      tags: ['概念', '基础'],
      grading: '自动评分',
      creator: '张老师',
      updateTime: '2026-03-25 10:00',
      scope: '公开',
      auditStatus: '审核通过'
    },
    {
      id: 2,
      name: '实现一个简单的线性回归模型',
      bank: '深度学习进阶',
      type: '编程',
      status: '启用',
      source: 'AI出题',
      difficulty: '困难',
      tags: ['算法', 'Python'],
      grading: '自动评分',
      creator: '张老师',
      updateTime: '2026-03-26 14:30',
      scope: '私有',
      auditStatus: '未申请'
    },
    {
      id: 3,
      name: '简述CNN和RNN的区别',
      bank: '深度学习进阶',
      type: '简答',
      status: '禁用',
      source: '人工出题',
      difficulty: '中等',
      tags: ['神经网络', '理论'],
      grading: '人工评分',
      creator: '李老师',
      updateTime: '2026-03-20 09:15',
      scope: '公开',
      auditStatus: '审核中'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-title flex items-center gap-2">
          <FileQuestion className="w-6 h-6 text-[#fa541c]" />
          试题管理
        </h1>
      </div>

      {/* Action Bar */}
      <div className="bg-white p-4 rounded-xl border border-neutral-border shadow-sm flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <Button className="bg-[#fa541c] hover:bg-[#e84a15] text-white flex items-center gap-1.5 shadow-sm">
            <Plus className="w-4 h-4" /> 新建试题
          </Button>
          <Button variant="outline" className="flex items-center gap-1.5 border-[#fa541c] text-[#fa541c] hover:bg-[#fff2e8]">
            <Brain className="w-4 h-4" /> 智能出题 (AI)
          </Button>
          <Button variant="outline" className="flex items-center gap-1.5">
            <Globe className="w-4 h-4" /> 批量公开
          </Button>
          <Button variant="outline" className="flex items-center gap-1.5">
            <Upload className="w-4 h-4" /> 导入
          </Button>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input 
              type="text" 
              placeholder="搜索试题名称/标签" 
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
                <th className="p-4 font-medium">试题名称</th>
                <th className="p-4 font-medium">所属题库</th>
                <th className="p-4 font-medium">题型</th>
                <th className="p-4 font-medium">难度</th>
                <th className="p-4 font-medium">来源</th>
                <th className="p-4 font-medium">状态</th>
                <th className="p-4 font-medium">范围/审核</th>
                <th className="p-4 font-medium">更新时间</th>
                <th className="p-4 font-medium text-right">操作</th>
              </tr>
            </thead>
            <tbody>
              {questions.map(q => (
                <tr key={q.id} className="border-b border-neutral-border/50 hover:bg-neutral-50/50 transition-colors group text-sm">
                  <td className="p-4">
                    <div className="font-medium text-neutral-title max-w-[200px] truncate" title={q.name}>{q.name}</div>
                    <div className="flex gap-1 mt-1">
                      {q.tags.map(tag => (
                        <span key={tag} className="px-1.5 py-0.5 text-[10px] bg-neutral-100 text-neutral-500 rounded">{tag}</span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-neutral-body">{q.bank}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded-md border border-blue-100">{q.type}</span>
                  </td>
                  <td className="p-4">
                    <span className={cn(
                      "text-xs font-medium",
                      q.difficulty === '简单' ? "text-green-600" : q.difficulty === '中等' ? "text-orange-500" : "text-red-600"
                    )}>{q.difficulty}</span>
                  </td>
                  <td className="p-4 text-neutral-body flex items-center gap-1">
                    {q.source === 'AI出题' && <Brain className="w-3 h-3 text-purple-500" />}
                    {q.source}
                  </td>
                  <td className="p-4">
                    <span className={cn("px-2 py-1 text-xs rounded-md", q.status === '启用' ? "bg-green-50 text-green-600" : "bg-neutral-100 text-neutral-500")}>
                      {q.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-xs text-neutral-title">{q.scope}</div>
                    <div className={cn("text-[10px] mt-0.5", q.auditStatus === '审核通过' ? "text-green-600" : q.auditStatus === '审核中' ? "text-orange-500" : "text-neutral-400")}>
                      {q.auditStatus}
                    </div>
                  </td>
                  <td className="p-4 text-xs text-neutral-caption">
                    <div>{q.updateTime}</div>
                    <div>{q.creator}</div>
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
            <span className="text-sm text-neutral-caption">共 <span className="font-medium text-neutral-title">{questions.length}</span> 条数据</span>
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
