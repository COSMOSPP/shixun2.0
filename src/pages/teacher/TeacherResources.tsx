import React, { useState } from 'react';
import { Search, Database, Plus, Filter, Cpu, Server, HardDrive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function TeacherResources() {
  const [searchTerm, setSearchTerm] = useState('');

  const students = [
    {
      id: '2024001',
      name: '王小明',
      grade: '2024级',
      college: '计算机科学与技术学院',
      major: '软件工程',
      class: '软工1班',
      gpuHours: 50,
      gpuUsed: 12.5,
      projects: 3,
      datasets: 5,
      storageUsed: '2.5GB',
      storageTotal: '10GB'
    },
    {
      id: '2024002',
      name: '李华',
      grade: '2024级',
      college: '人工智能学院',
      major: '人工智能',
      class: 'AI 2班',
      gpuHours: 100,
      gpuUsed: 85.2,
      projects: 8,
      datasets: 12,
      storageUsed: '8.1GB',
      storageTotal: '20GB'
    },
    {
      id: '2024003',
      name: '张三',
      grade: '2023级',
      college: '数据科学学院',
      major: '数据科学与大数据技术',
      class: '数据1班',
      gpuHours: 30,
      gpuUsed: 5.0,
      projects: 1,
      datasets: 2,
      storageUsed: '0.8GB',
      storageTotal: '10GB'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-title flex items-center gap-2">
          <Database className="w-6 h-6 text-[#fa541c]" />
          资源分配
        </h1>
      </div>

      {/* Resource Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-neutral-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-neutral-caption mb-1">总分配 GPU 算力</div>
            <div className="text-2xl font-bold text-neutral-title">12,500 <span className="text-sm font-normal text-neutral-body">小时</span></div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-neutral-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
            <HardDrive className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-neutral-caption mb-1">总分配存储空间</div>
            <div className="text-2xl font-bold text-neutral-title">5.2 <span className="text-sm font-normal text-neutral-body">TB</span></div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-neutral-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-neutral-caption mb-1">活跃项目数</div>
            <div className="text-2xl font-bold text-neutral-title">342 <span className="text-sm font-normal text-neutral-body">个</span></div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-white p-4 rounded-xl border border-neutral-border shadow-sm flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <Button className="bg-[#fa541c] hover:bg-[#e84a15] text-white flex items-center gap-1.5 shadow-sm">
            <Plus className="w-4 h-4" /> 批量增配
          </Button>
          <select className="text-sm border border-neutral-border rounded-md px-3 py-2 focus:outline-none focus:border-[#fa541c] bg-white">
            <option value="">所有年级</option>
            <option value="2024">2024级</option>
            <option value="2023">2023级</option>
          </select>
          <select className="text-sm border border-neutral-border rounded-md px-3 py-2 focus:outline-none focus:border-[#fa541c] bg-white">
            <option value="">所有学院</option>
            <option value="cs">计算机科学与技术学院</option>
            <option value="ai">人工智能学院</option>
          </select>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input 
              type="text" 
              placeholder="输入学号/姓名筛选" 
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
                <th className="p-4 font-medium">学生信息</th>
                <th className="p-4 font-medium">学院/专业/班级</th>
                <th className="p-4 font-medium">GPU 资源 (小时)</th>
                <th className="p-4 font-medium">存储空间</th>
                <th className="p-4 font-medium">项目/数据集</th>
                <th className="p-4 font-medium text-right">操作</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => (
                <tr key={s.id} className="border-b border-neutral-border/50 hover:bg-neutral-50/50 transition-colors group text-sm">
                  <td className="p-4">
                    <div className="font-medium text-neutral-title">{s.name}</div>
                    <div className="text-xs text-neutral-caption mt-0.5">{s.id}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-neutral-body">{s.college}</div>
                    <div className="text-xs text-neutral-caption mt-0.5">{s.grade} · {s.major} · {s.class}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden w-24">
                        <div 
                          className={cn(
                            "h-full rounded-full",
                            (s.gpuUsed / s.gpuHours) > 0.8 ? "bg-red-500" : "bg-[#fa541c]"
                          )}
                          style={{ width: `${(s.gpuUsed / s.gpuHours) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-neutral-title">{s.gpuUsed}/{s.gpuHours}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-neutral-body font-medium">{s.storageUsed} <span className="text-neutral-caption font-normal">/ {s.storageTotal}</span></div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <span className="text-xs text-neutral-caption">项目</span>
                        <span className="font-medium text-neutral-title">{s.projects}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-xs text-neutral-caption">数据集</span>
                        <span className="font-medium text-neutral-title">{s.datasets}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="outline" size="sm" className="h-8 text-xs border-[#fa541c] text-[#fa541c] hover:bg-[#fff2e8] rounded-full px-4">
                      <Plus className="w-3.5 h-3.5 mr-1" /> 增配
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-neutral-border bg-neutral-50/50">
          <div className="flex items-center gap-4">
            <span className="text-sm text-neutral-caption">共 <span className="font-medium text-neutral-title">{students.length}</span> 条数据</span>
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
