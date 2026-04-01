import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, AlertTriangle, Monitor, Flag, Play, CheckCircle2, Circle, AlertCircle, Bookmark, FileCode2, Save, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

interface ExamSessionProps {
  exam: any;
  onBack: () => void;
  onSubmit: () => void;
}

export default function ExamSession({ exam, onBack, onSubmit }: ExamSessionProps) {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [markedQuestions, setMarkedQuestions] = useState<number[]>([]);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours
  const [autoSavedTime, setAutoSavedTime] = useState(new Date());

  const questions = [
    { id: 1, type: 'single', content: '在Python中，以下哪个不是正确的数据类型？', options: ['A. list', 'B. dict', 'C. array', 'D. tuple'] },
    { id: 2, type: 'multi', content: '机器学习中常见的分类算法包括：', options: ['A. SVM', 'B. 决策树', 'C. K-Means', 'D. 逻辑回归'] },
    { id: 3, type: 'judge', content: 'HTTP协议是基于TCP/IP协议之上的应用层协议。', options: ['正确', '错误'] },
    { id: 4, type: 'blank', content: 'Python 想要开启一个简单的 HTTP 服务，可以使用命令：python -m ____' },
    { id: 5, type: 'code', content: '请编写一段Python代码，实现斐波那契数列的前10项输出。' },
    { id: 6, type: 'practical', content: '实操综合：配置本地 Nginx 反向代理，并将结果截图提交保存到实验环境。', env: 'Ubuntu 22.04 + Nginx' },
    // Fill up to 10 for grid
    { id: 7, type: 'single', content: '以下哪项属于前端框架？', options: ['A. Django', 'B. React', 'C. Flask', 'D. Spring'] },
    { id: 8, type: 'single', content: '默认的 SSH 端口号是？', options: ['A. 21', 'B. 22', 'C. 80', 'D. 3306'] },
    { id: 9, type: 'single', content: '以下哪个数据库属于 NoSQL？', options: ['A. MySQL', 'B. PostgreSQL', 'C. MongoDB', 'D. Oracle'] },
    { id: 10, type: 'single', content: '算法的时间复杂度中最优的是？', options: ['A. O(n)', 'B. O(1)', 'C. O(n^2)', 'D. O(log n)'] },
  ];

  const q = questions[currentQuestion - 1];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleMark = (id: number) => {
    setMarkedQuestions(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleAnswer = (val: any) => {
    setAnswers(prev => ({ ...prev, [q.id]: val }));
    setAutoSavedTime(new Date());
  };

  const answeredCount = Object.keys(answers).length;
  const unansweredCount = questions.length - answeredCount;

  return (
    <div className="fixed inset-0 z-[200] bg-[#f5f6f8] flex flex-col font-sans w-[100vw] h-[100vh]">
      {/* Top Navigation */}
      <div className="h-16 bg-white border-b border-neutral-border px-6 flex items-center justify-between shrink-0 shadow-sm relative z-10">
        <div className="flex items-center gap-4">
           <Button variant="ghost" onClick={onBack} className="text-neutral-caption hover:text-neutral-title hover:bg-neutral-100 h-9 px-3 gap-1 flex">
             <ChevronLeft className="w-5 h-5 -ml-1" /> 退出
           </Button>
           <div className="h-6 w-px bg-neutral-border"></div>
           <h1 className="font-bold text-[18px] text-neutral-title">{exam.title}</h1>
        </div>
        
        <div className="flex items-center gap-8">
           <div className="flex items-center gap-2 text-neutral-body text-[13px]">
             <Save className="w-4 h-4 text-green-500" />
             系统已于 {autoSavedTime.toLocaleTimeString()} 自动保存
           </div>
           
           <div className={cn("px-6 py-2 rounded-full border flex items-center gap-3 font-mono font-bold text-xl", timeLeft < 600 ? "border-red-200 bg-red-50 text-red-600 animate-pulse" : "border-neutral-border bg-neutral-50 text-neutral-title")}>
              <Clock className={cn("w-5 h-5", timeLeft < 600 ? "text-red-500" : "text-neutral-caption")} />
              {Math.floor(timeLeft / 3600).toString().padStart(2, '0')}:
              {Math.floor((timeLeft % 3600) / 60).toString().padStart(2, '0')}:
              {(timeLeft % 60).toString().padStart(2, '0')}
              {timeLeft < 600 && <span className="text-[12px] ml-2 text-red-500 tracking-wide font-sans">时间预警</span>}
           </div>

           <Button onClick={onSubmit} className="bg-[#fa541c] hover:bg-[#d4380d] text-white font-bold h-10 px-8 rounded-full shadow-md">
             交卷并查看成绩
           </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden max-w-[1440px] mx-auto w-full gap-6 p-6">
         {/* Main Question Area */}
         <div className="flex-1 bg-white border border-neutral-border rounded-[16px] shadow-sm flex flex-col relative overflow-hidden">
            <div className="flex-1 overflow-y-auto p-10">
               {/* Question Header */}
               <div className="flex justify-between items-start mb-8 border-b border-neutral-100 pb-6">
                 <div className="flex items-start gap-4">
                    <span className="w-10 h-10 bg-[#fff2e8] text-[#fa541c] text-[18px] font-bold rounded-[8px] flex items-center justify-center border border-[#ffbb96]">
                       {currentQuestion}
                    </span>
                    <div>
                      <div className="text-[13px] font-bold text-neutral-caption uppercase tracking-widest mb-1.5 flex gap-2">
                         <span>
                           {q.type === 'single' ? '单项选择题' : 
                            q.type === 'multi' ? '多项选择题' : 
                            q.type === 'judge' ? '判断题' : 
                            q.type === 'blank' ? '填空题' : 
                            q.type === 'code' ? '代码编辑题' : '实操综合题'}
                         </span>
                         <span className="text-neutral-300">|</span>
                         <span className="text-[#fa541c]">本题 10.0 分</span>
                      </div>
                      <h2 className="text-[20px] font-bold text-neutral-title leading-relaxed max-w-4xl">
                         {q.content}
                      </h2>
                    </div>
                 </div>
                 
                 <Button 
                   variant="outline"
                   onClick={() => toggleMark(q.id)}
                   className={cn("gap-2 shadow-sm rounded-full transition-colors", markedQuestions.includes(q.id) ? "border-[#ffba00] bg-[#fffbf0] text-[#ffba00] hover:bg-[#fff7e0]" : "border-neutral-300 text-neutral-body hover:bg-neutral-50")}
                 >
                    <Flag className="w-4 h-4 fill-current" />
                    {markedQuestions.includes(q.id) ? "已标记 (复查)" : "标记本题"}
                 </Button>
               </div>

               {/* Answering Interfaces */}
               <div className="max-w-4xl ml-14">
                 {(q.type === 'single' || q.type === 'judge') && (
                   <div className="space-y-4">
                     {q.options?.map((opt, i) => (
                       <label 
                         key={i} 
                         onClick={() => handleAnswer(opt)}
                         className={cn(
                           "flex items-center p-4 border rounded-[12px] cursor-pointer transition-all hover:bg-neutral-50",
                           answers[q.id] === opt ? "border-[#fa541c] bg-[#fff2e8] ring-1 ring-[#fa541c]" : "border-neutral-border bg-white"
                         )}
                       >
                         <div className={cn("w-5 h-5 rounded-full border flex items-center justify-center mr-4 transition-colors", answers[q.id] === opt ? "border-[#fa541c] bg-[#fa541c]" : "border-neutral-300")}>
                           {answers[q.id] === opt && <div className="w-2 h-2 rounded-full bg-white"></div>}
                         </div>
                         <span className={cn("text-[15px]", answers[q.id] === opt ? "font-bold text-[#fa541c]" : "text-neutral-title")}>{opt}</span>
                       </label>
                     ))}
                   </div>
                 )}

                 {q.type === 'multi' && (
                   <div className="space-y-4">
                     {q.options?.map((opt, i) => {
                       const selected = answers[q.id] || [];
                       const isSelected = selected.includes(opt);
                       return (
                         <label 
                           key={i} 
                           onClick={() => {
                             if(isSelected) handleAnswer(selected.filter((item:any) => item !== opt));
                             else handleAnswer([...selected, opt]);
                           }}
                           className={cn(
                             "flex items-center p-4 border rounded-[12px] cursor-pointer transition-all hover:bg-neutral-50",
                             isSelected ? "border-[#fa541c] bg-[#fff2e8] ring-1 ring-[#fa541c]" : "border-neutral-border bg-white"
                           )}
                         >
                           <div className={cn("w-5 h-5 rounded border flex items-center justify-center mr-4 transition-colors", isSelected ? "border-[#fa541c] bg-[#fa541c]" : "border-neutral-300")}>
                             {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                           </div>
                           <span className={cn("text-[15px]", isSelected ? "font-bold text-[#fa541c]" : "text-neutral-title")}>{opt}</span>
                         </label>
                       )
                     })}
                   </div>
                 )}

                 {q.type === 'blank' && (
                   <div className="space-y-6">
                     <p className="text-[14px] text-neutral-caption mb-2">请直接在下方横线按顺序依次填入您的答案。</p>
                     <Input 
                       value={answers[q.id] || ''} 
                       onChange={(e) => handleAnswer(e.target.value)}
                       placeholder="在此填入正确的内容..." 
                       className="w-full text-[15px] h-12 border-neutral-300 rounded-[8px] focus-visible:ring-[#fa541c]" 
                     />
                   </div>
                 )}

                 {q.type === 'code' && (
                   <div className="space-y-4">
                     <div className="flex justify-between items-center bg-[#f5f6f8] px-4 py-3 rounded-t-[12px] border border-neutral-border border-b-0">
                       <div className="flex items-center gap-2 text-[13px] font-bold text-neutral-title">
                          <FileCode2 className="w-4 h-4 text-[#1890ff]" /> <span>Python IDE</span>
                       </div>
                       <Button size="sm" variant="outline" className="h-8 text-[12px] bg-white gap-1 hover:text-[#fa541c]">
                         <Play className="w-3.5 h-3.5" /> 本地运行自测
                       </Button>
                     </div>
                     <textarea 
                       value={answers[q.id] || ''} 
                       onChange={(e) => handleAnswer(e.target.value)}
                       placeholder="# Write your python code here..." 
                       className="w-full h-64 p-4 font-mono text-[14px] bg-[#282c34] text-[#abb2bf] rounded-b-[12px] border border-neutral-border focus:outline-none focus:ring-1 focus:ring-[#fa541c]"
                     />
                   </div>
                 )}

                 {q.type === 'practical' && (
                   <div className="space-y-8 bg-[#fafafa] p-8 rounded-[12px] border border-dashed border-neutral-300 text-center">
                     <Monitor className="w-16 h-16 text-[#fa541c]/50 mx-auto mb-4" />
                     <div>
                       <h3 className="text-xl font-bold text-neutral-title mb-2">这是一道实地考核题</h3>
                       <p className="text-neutral-body text-[14px]">
                          此题需要在提供的在线 Linux 沙盒环境中完成服务器配置任务。点击下方按钮后，将弹出实训 IDE。系统将自动提取沙盒运行日志作为判卷依据。
                       </p>
                     </div>
                     <Button className="h-12 px-8 rounded-full bg-[#1890ff] hover:bg-[#096dd9] text-white shadow-xl flex items-center gap-2 mx-auto">
                        <PlayCircle className="w-6 h-6" /> 进入在线实操环境 ({q.env})
                     </Button>
                     {answers[q.id] && (
                        <div className="text-green-600 text-[14px] font-bold flex justify-center items-center gap-2">
                           <CheckCircle2 className="w-5 h-5" /> 实验日志及结果已成功抓取并封存保存
                        </div>
                     )}
                   </div>
                 )}
               </div>
            </div>
            
            {/* Prev / Next Bottom Bar */}
            <div className="h-20 bg-white border-t border-neutral-border shrink-0 px-8 flex justify-between items-center">
               <Button 
                 variant="outline" 
                 disabled={currentQuestion === 1}
                 onClick={() => setCurrentQuestion(prev => prev - 1)}
                 className="h-11 px-8 rounded-full border-neutral-300 gap-2 text-[15px]"
               >
                 <ChevronLeft className="w-5 h-5" /> 上一题
               </Button>
               <Button 
                 disabled={currentQuestion === questions.length}
                 onClick={() => setCurrentQuestion(prev => prev + 1)}
                 className="h-11 px-8 rounded-full bg-[#fa541c] hover:bg-[#d4380d] text-white shadow-md gap-2 text-[15px]"
               >
                 下一题 <ChevronRight className="w-5 h-5" />
               </Button>
            </div>
         </div>

         {/* Sidebar Navigation */}
         <div className="w-80 bg-white border border-neutral-border rounded-[16px] shadow-sm flex flex-col shrink-0">
            <div className="p-6 border-b border-neutral-border bg-[#fafafa] rounded-t-[16px]">
               <h3 className="font-bold text-[16px] text-neutral-title mb-4 flex items-center gap-2">
                 <Bookmark className="w-5 h-5 text-[#fa541c]" /> 答题卡与状态
               </h3>
               <div className="grid grid-cols-2 gap-y-3 text-[13px]">
                 <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#fa541c] rounded-full"></div>已作答 ({answeredCount})</div>
                 <div className="flex items-center gap-2"><div className="w-3 h-3 border-2 border-neutral-300 rounded-full bg-white"></div>未作答 ({unansweredCount})</div>
                 <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#ffba00] rounded-sm flex items-center justify-center text-white"><Flag className="w-2 h-2" /></div>星标疑点 ({markedQuestions.length})</div>
               </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <h4 className="text-[13px] font-bold text-neutral-title mb-4 border-l-4 border-[#fa541c] pl-2">所有题目序列</h4>
              <div className="grid grid-cols-5 gap-3">
                 {questions.map((ques) => {
                    const isAnswered = !!answers[ques.id] || (Array.isArray(answers[ques.id]) && answers[ques.id].length > 0);
                    const isMarked = markedQuestions.includes(ques.id);
                    const isCurrent = currentQuestion === ques.id;
                    return (
                       <button 
                         key={ques.id}
                         onClick={() => setCurrentQuestion(ques.id)}
                         className={cn(
                           "aspect-square rounded-[8px] flex items-center justify-center text-[15px] font-bold border transition-all relative overflow-hidden",
                           isCurrent ? "ring-2 ring-offset-1 ring-[#fa541c] z-10" : "",
                           isAnswered ? "bg-[#fa541c] text-white border-[#fa541c]" : "bg-white text-neutral-body border-neutral-300 hover:border-[#fa541c] hover:text-[#fa541c]"
                         )}
                       >
                         {ques.id}
                         {isMarked && (
                           <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#ffba00] rotate-45 transform origin-center"></div>
                         )}
                       </button>
                    )
                 })}
              </div>
            </div>
            
            <div className="p-6 bg-[#fff2e8] border-t border-[#ffbb96] rounded-b-[16px]">
              <div className="flex items-start gap-3">
                 <AlertCircle className="w-5 h-5 text-[#fa541c] shrink-0 mt-0.5" />
                 <p className="text-[12px] text-neutral-title leading-relaxed">
                   小贴士：主观题和代码题可随意涂写，系统每隔3秒自动提交备份。务必在倒计时结束前主动点击上方 [交卷] 按钮。
                 </p>
              </div>
            </div>
         </div>
      </div>
    </div>
  );
}
