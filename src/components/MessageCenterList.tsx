import { ChevronDown, Inbox, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MessageItem {
  id: number;
  title: string;
  type: string;
  time: string;
  read: boolean;
  content: string;
  sender?: string;
}

export interface MessageListState {
  query: string;
  filter: "全部" | "未读" | "已读";
  page: number;
  pageSize: number;
}

export const initialMessageListState: MessageListState = { query: "", filter: "全部", page: 1, pageSize: 10 };

interface MessageCenterListProps {
  notifications: readonly MessageItem[];
  state: MessageListState;
  onStateChange: (state: MessageListState) => void;
  onOpen: (id: number) => void;
}

export default function MessageCenterList({ notifications, state, onStateChange, onOpen }: MessageCenterListProps) {
  const keyword = state.query.trim().toLowerCase();
  const unreadCount = notifications.filter(message => !message.read).length;
  const filteredMessages = notifications.filter(message => {
    if (state.filter === "未读" && message.read) return false;
    if (state.filter === "已读" && !message.read) return false;
    return [message.title, message.content, message.type, message.sender ?? ""].some(value => value.toLowerCase().includes(keyword));
  });
  const pageCount = Math.max(1, Math.ceil(filteredMessages.length / state.pageSize));
  const page = Math.min(state.page, pageCount);
  const visibleMessages = filteredMessages.slice((page - 1) * state.pageSize, page * state.pageSize);

  return (
    <section aria-label="消息通知列表" className="min-h-[600px] min-w-0 rounded-xl border border-neutral-border bg-white p-6 shadow-sm">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3">
          <div className="relative w-full sm:max-w-[320px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
            <input type="search" aria-label="搜索消息" placeholder="搜索消息名称或内容" value={state.query}
              onChange={event => onStateChange({ ...state, query: event.target.value, page: 1 })}
              className="h-9 w-full rounded-full border border-neutral-border bg-white py-2 pl-9 pr-4 text-[13px] text-neutral-title outline-none transition-all placeholder:text-neutral-400 hover:border-[#fa541c]/60 focus:border-[#fa541c] focus:ring-1 focus:ring-[#fa541c]/25" />
          </div>
          {state.query && <button type="button" onClick={() => onStateChange({ ...state, query: "", page: 1 })} className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-[#fa541c]"><X className="size-3.5" />清空搜索</button>}
        </div>
        <div role="group" aria-label="消息阅读状态筛选" className="ml-auto flex shrink-0 rounded-full border border-neutral-200/50 bg-neutral-100 p-1">
          {(["全部", "未读", "已读"] as const).map(filter => (
            <button key={filter} type="button" aria-pressed={state.filter === filter}
              onClick={() => onStateChange({ ...state, filter, page: 1 })}
              className={cn("flex cursor-pointer items-center gap-1 rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-orange-400", state.filter === filter ? "bg-white font-bold text-[#fa541c] shadow-sm" : "text-neutral-600 hover:text-neutral-900")}>
              {filter}{filter === "未读" && unreadCount > 0 && <span className="ml-1 rounded-full bg-[#fa541c] px-1.5 text-[10px] font-bold text-white">{unreadCount}</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse whitespace-nowrap text-left text-[13px]">
          <caption className="sr-only">消息通知记录</caption>
          <thead>
            <tr className="border-b border-neutral-border/50 bg-neutral-50/50 text-neutral-600">
              <th scope="col" className="min-w-[260px] py-3.5 pl-6 pr-3 font-medium">消息名称</th>
              <th scope="col" className="px-3 py-3.5 font-medium">消息分类</th>
              <th scope="col" className="px-3 py-3.5 font-medium">消息时间</th>
              <th scope="col" className="py-3.5 pl-3 pr-6 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {visibleMessages.map((message, index) => (
              <tr key={message.id} onClick={() => onOpen(message.id)} className={cn("cursor-pointer border-b border-neutral-100 text-[13px] transition-colors hover:bg-neutral-50/30", index === visibleMessages.length - 1 && "border-b-0")}>
                <th scope="row" className="py-3 pl-6 pr-3 text-left font-normal">
                  <div className="flex items-center gap-2.5">
                    <span aria-hidden="true" className={cn("size-2 shrink-0 rounded-full", message.read ? "bg-transparent" : "bg-[#fa541c]")} />
                    <span className={cn("whitespace-normal leading-5 text-neutral-800", message.read ? "font-medium" : "font-semibold")}>
                      {!message.read && <span className="sr-only">未读：</span>}{message.title}
                    </span>
                  </div>
                </th>
                <td className="px-3 py-3"><span className="rounded-[4px] border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-xs text-neutral-600">{message.type}</span></td>
                <td className="px-3 py-3 text-xs tabular-nums text-neutral-500"><time dateTime={message.time.replace(" ", "T") + "+08:00"}>{message.time}</time></td>
                <td className="py-3 pl-3 pr-6">
                  <button type="button" aria-label={`查看详情：${message.title}`} onClick={event => { event.stopPropagation(); onOpen(message.id); }}
                    className="inline-flex cursor-pointer items-center text-[13px] font-medium text-[#fa541c] no-underline hover:text-[#e84a15] hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400">查看详情</button>
                </td>
              </tr>
            ))}
            {!visibleMessages.length && <tr><td colSpan={4} className="px-6 py-20 text-center"><Inbox className="mx-auto mb-4 size-9 text-neutral-300" /><p className="text-sm text-neutral-600">暂无相关通知记录</p>{state.query && <p className="mt-2 text-xs text-neutral-400">试试其他关键词。</p>}</td></tr>}
          </tbody>
        </table>
      </div>

      <nav aria-label="消息通知分页" className="mt-5 flex flex-wrap items-center justify-end gap-4">
        <span aria-live="polite" className="text-[13px] text-neutral-500">共 {filteredMessages.length} 条</span>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" aria-label="上一页" disabled={page === 1} onClick={() => onStateChange({ ...state, page: page - 1 })} className="h-7 w-7 rounded-[4px] bg-white p-0 disabled:opacity-40">&lt;</Button>
          {Array.from({ length: pageCount }, (_, index) => index + 1).map(pageNumber => (
            <Button key={pageNumber} variant="outline" size="sm" aria-label={`第 ${pageNumber} 页`} aria-current={page === pageNumber ? "page" : undefined}
              onClick={() => onStateChange({ ...state, page: pageNumber })}
              className={cn("h-7 w-7 cursor-pointer rounded-[4px] p-0 text-xs font-medium transition-colors", page === pageNumber ? "border-[#fa541c] bg-[#fa541c] text-white hover:bg-[#ff7a45]" : "border-neutral-200 bg-white text-neutral-600 hover:border-[#fa541c] hover:text-[#fa541c]")}>{pageNumber}</Button>
          ))}
          <Button variant="outline" size="sm" aria-label="下一页" disabled={page === pageCount} onClick={() => onStateChange({ ...state, page: page + 1 })} className="h-7 w-7 rounded-[4px] bg-white p-0 disabled:opacity-40">&gt;</Button>
        </div>
        <div className="relative rounded-[6px] bg-white">
          <select aria-label="每页条数" value={state.pageSize} onChange={event => onStateChange({ ...state, pageSize: Number(event.target.value), page: 1 })}
            className="h-7 min-w-[95px] cursor-pointer appearance-none rounded-[6px] border border-neutral-200 bg-white py-1 pl-3 pr-8 text-[13px] text-neutral-600 shadow-sm transition-colors hover:border-[#fa541c]/60 focus:border-[#fa541c] focus:outline-none">
            <option value={10}>10 条/页</option><option value={20}>20 条/页</option><option value={50}>50 条/页</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-3 -translate-y-1/2 text-neutral-400" />
        </div>
      </nav>
    </section>
  );
}
