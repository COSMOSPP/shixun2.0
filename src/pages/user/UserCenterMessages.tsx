import { useState } from "react";
import { ArrowLeft, CheckCircle2, ChevronRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import MessageCenterList, { initialMessageListState } from "@/components/MessageCenterList";

interface StudentNotification {
  id: number;
  type: string;
  title: string;
  content: string;
  detail: string;
  time: string;
  read: boolean;
}

const initialNotifications: StudentNotification[] = [
  {
    id: 6, type: "审核结果通知", title: "GPU配额申请已通过", time: "2026-10-19 10:00:00", read: false,
    content: "您申请的 100 卡时 GPU 资源额度已通过审批，现已发放至您的账户。",
    detail: `您好，您申请的 100 卡时 GPU 资源额度已通过管理员审批，现已发放至您的账户。

【申请信息】
申请单号：REQ-20261018-001
申请额度：100 卡时
处理人：系统管理员
有效期至：2026-11-19

您可以前往个人中心的「资源额度」页面查看可用额度及使用情况。请合理安排训练任务，及时保存实验成果。`,
  },
  {
    id: 1, type: "系统通知", title: "系统升级通知", time: "2026-10-19 08:00:00", read: false,
    content: "实训平台将于 10 月 25 日凌晨进行系统升级，请合理安排学习时间。",
    detail: `为提升平台的稳定性与使用体验，实训平台计划于 2026 年 10 月 25 日 02:00—04:00 进行系统升级维护。

【维护期间影响说明】
1. 平台登录、课程学习及项目实训服务将暂时无法使用；
2. 请提前保存学习记录、实验代码和相关文件；
3. 服务恢复后，您可继续原有课程及项目的学习。

请合理安排学习时间，感谢您的理解与支持。`,
  },
  {
    id: 4, type: "考试提醒", title: "《机器学习基础》期中考试提醒", time: "2026-10-18 18:00:00", read: false,
    content: "《机器学习基础》期中考试将于 10 月 20 日上午 10:00 开始，请提前准备考试环境。",
    detail: `您参加的《机器学习基础》期中考试即将开始，请提前做好准备。

【考试信息】
考试名称：《机器学习基础》期中测试
考试时间：2026 年 10 月 20 日 10:00—12:00
考试时长：120 分钟

【考前准备】
请提前检查网络连接及浏览器环境，阅读考试须知，并在学生端「考试」页面进入对应考试。考试期间请遵守考场纪律，按时提交试卷。`,
  },
  {
    id: 2, type: "系统通知", title: "实名认证成功", time: "2026-10-18 09:30:00", read: true,
    content: "您的实名认证已通过审核，现在可以使用需要实名认证的平台功能。",
    detail: `您的实名认证已通过审核。

您现在可以使用需要实名认证的平台功能。可前往「个人中心 > 个人资料」查看认证状态。

请妥善保管账号信息。如个人信息发生变更，请及时更新资料或联系平台管理员。`,
  },
  {
    id: 7, type: "审核结果通知", title: "最佳实践申请被驳回", time: "2026-10-17 14:20:00", read: true,
    content: "您的《大模型微调》实践申请未通过审核，请补充实践描述和核心代码后重新提交。",
    detail: `您提交的《大模型微调》最佳实践申请未通过本次审核。

【审核意见】
实践描述不够详细，缺少核心代码片段。请补充模型配置、操作步骤、实验结果及关键实现代码，确保其他学习者能够理解并复现实验。

您可以前往「最佳实践」页面修改申请材料后重新提交审核。`,
  },
  {
    id: 3, type: "课程更新通知", title: "《Python高级编程》课程上新", time: "2026-10-16 15:00:00", read: false,
    content: "您关注的课程已更新第 8 章：并发编程实战，涵盖多线程、多进程和异步 IO。",
    detail: `您关注的《Python高级编程》课程已更新第 8 章：并发编程实战。

【本次更新内容】
1. 多线程的创建与线程安全；
2. 多进程任务调度与进程通信；
3. 异步 IO 与并发请求实践；
4. 配套示例代码和章节练习。

前往课程页面即可查看新内容，也可以在「学习中心 > 我的学习」继续之前的学习。`,
  },
  {
    id: 5, type: "活动通知", title: "AI创新挑战赛报名开启", time: "2026-10-14 10:00:00", read: true,
    content: "2026 年度 AI 大模型应用创新挑战赛现已开放报名，欢迎参与。",
    detail: `2026 年度 AI 大模型应用创新挑战赛现已开放报名，欢迎对大模型应用与创新实践感兴趣的同学参与。

请前往「竞赛」模块查看赛事介绍、赛程安排、报名要求及参赛须知。报名时请按要求填写个人信息，并确认提交的材料准确完整。

具体报名截止时间与赛事安排以竞赛详情页为准。`,
  },
];

export default function UserCenterMessages() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [messageListState, setMessageListState] = useState(initialMessageListState);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const selected = notifications.find(notification => notification.id === selectedId);
  const unreadCount = notifications.filter(notification => !notification.read).length;


  const openNotification = (id: number) => {
    setSelectedId(id);
    setNotifications(previous => previous.map(notification => notification.id === id ? { ...notification, read: true } : notification));
  };

  const markAllAsRead = () => {
    setNotifications(previous => previous.map(notification => ({ ...notification, read: true })));
    setAnnouncement(unreadCount ? "已将所有消息标记为已读" : "暂无未读消息");
  };

  return (
    <div className="w-full space-y-4 text-left">
      <div className="flex flex-wrap items-center justify-between gap-3">
      <nav aria-label="面包屑" className="flex items-center text-sm text-neutral-caption">
        <Link to="/user" className="cursor-pointer transition-colors hover:text-primary">首页</Link>
        <ChevronRight aria-hidden="true" className="mx-1 size-4" />
        <Link to="/user/center" className="cursor-pointer transition-colors hover:text-primary">个人中心</Link>
        <ChevronRight aria-hidden="true" className="mx-1 size-4" />
        {selected ? <><button type="button" onClick={() => setSelectedId(null)} className="cursor-pointer transition-colors hover:text-primary">消息中心</button><ChevronRight aria-hidden="true" className="mx-1 size-4" /><span aria-current="page" className="max-w-[280px] truncate font-medium text-neutral-title">{selected.title}</span></> : <span aria-current="page" className="font-medium text-neutral-title">消息中心</span>}
      </nav>
      {!selected && <div className="flex shrink-0 items-center gap-3">
        <span role="status" className="text-xs text-neutral-500">{announcement}</span>
        <button type="button" onClick={markAllAsRead} className={cn("flex cursor-pointer items-center gap-1.5 rounded-full border bg-white px-3.5 py-1.5 text-xs font-medium shadow-2xs transition-all focus-visible:outline-2 focus-visible:outline-orange-400", unreadCount === 0 ? "border-orange-200 bg-orange-50/30 text-[#fa541c]" : "border-neutral-200 text-neutral-700 hover:border-[#fa541c] hover:bg-orange-50/40 hover:text-[#fa541c]")}>
          <CheckCircle2 className={cn("size-3.5", unreadCount === 0 ? "text-[#fa541c]" : "text-neutral-400")} />全部已读
        </button>
      </div>}
      </div>

      {selected ? (
        <div className="space-y-5 pb-10">
          <div className="flex items-center gap-4 rounded-xl border border-neutral-200/80 bg-white p-4 shadow-2xs">
            <Button onClick={() => setSelectedId(null)} variant="outline" className="h-8 cursor-pointer rounded-[4px] border-neutral-200 bg-white px-3 text-xs font-medium text-neutral-700 transition-colors hover:border-orange-200 hover:bg-orange-50 hover:text-[#fa541c]">
              <ArrowLeft className="mr-1 size-3.5" />返回消息列表
            </Button>
          </div>
          <article className="overflow-hidden rounded-xl border border-neutral-200/80 bg-white shadow-xs">
            <header className="border-b border-neutral-100 bg-gradient-to-b from-neutral-50/60 to-white p-6 md:p-8">
              <h1 className="mb-4 text-xl font-bold leading-snug tracking-tight text-neutral-900 md:text-2xl">{selected.title}</h1>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-neutral-500">
                <span className="flex items-center gap-1.5"><Clock className="size-3.5 text-neutral-400" />通知时间：<time className="font-mono text-neutral-700" dateTime={selected.time.replace(" ", "T") + "+08:00"}>{selected.time}</time></span>
              </div>
            </header>
            <div className="p-6 md:p-8"><p className="whitespace-pre-wrap text-xs font-normal leading-relaxed text-neutral-800 md:text-sm">{selected.detail}</p></div>
          </article>
        </div>
      ) : (
        <MessageCenterList notifications={notifications} state={messageListState}
          onStateChange={state => { setMessageListState(state); setAnnouncement(""); }}
          onOpen={openNotification} />
      )}
    </div>
  );
}
