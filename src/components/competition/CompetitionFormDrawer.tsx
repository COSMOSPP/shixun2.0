import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FileText, Minus, Plus, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { competitionDrawerStyles as styles } from "./competitionDrawerStyles";

export interface CompetitionAttachment { id: string; name: string; size: number; file: File }
export interface CompetitionFormValues {
  name: string;
  type: string;
  participants: number;
  startAt: string;
  endAt: string;
  organizer: string;
  coOrganizer: string;
  description: string;
  notice: string;
  competitionFiles: CompetitionAttachment[];
  cloudPlatform: string;
  environmentScript: string;
}
interface InitialCompetition extends Partial<CompetitionFormValues> { duration: string }
interface Props {
  initialCompetition: InitialCompetition | null;
  onClose: () => void;
  onSave: (values: CompetitionFormValues) => void;
}
type FormTab = "basic" | "env";
type Errors = Partial<Record<keyof CompetitionFormValues, string>>;
const inputClass = styles.input;
const secondaryClass = styles.secondary;
const primaryClass = styles.primary;

export default function CompetitionFormDrawer({ initialCompetition, onClose, onSave }: Props) {
  const [tab, setTab] = useState<FormTab>("basic");
  const [values, setValues] = useState<CompetitionFormValues>(() => {
    const [start = "", end = ""] = initialCompetition?.duration.split(" 至 ") || [];
    return {
      name: initialCompetition?.name || "", type: initialCompetition?.type || "",
      participants: initialCompetition?.participants || 0,
      startAt: initialCompetition?.startAt || (start ? `${start.slice(0, 10)}T09:00` : ""),
      endAt: initialCompetition?.endAt || (end ? `${end.slice(0, 10)}T18:00` : ""),
      organizer: initialCompetition?.organizer || "", coOrganizer: initialCompetition?.coOrganizer || "",
      description: initialCompetition?.description || "", notice: initialCompetition?.notice || "",
      competitionFiles: initialCompetition?.competitionFiles || [],
      cloudPlatform: initialCompetition?.cloudPlatform || "", environmentScript: initialCompetition?.environmentScript || ""
    };
  });
  const [errors, setErrors] = useState<Errors>({});
  const [scriptError, setScriptError] = useState("");
  const [scriptFilename, setScriptFilename] = useState("");
  const drawerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLFormElement>(null);
  const filesRef = useRef<HTMLInputElement>(null);
  const scriptFileRef = useRef<HTMLInputElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);
  const scriptLoadVersion = useRef(0);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawerRef.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); onClose(); }
      if (event.key !== "Tab") return;
      const nodes = Array.from<HTMLElement>(drawerRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled)') || []).filter(node => node.getClientRects().length > 0);
      const first = nodes[0], last = nodes[nodes.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === drawerRef.current)) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || document.activeElement === drawerRef.current)) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", handleKey);
    return () => { scriptLoadVersion.current++; document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", handleKey); if (previousFocus?.isConnected) previousFocus.focus(); };
  }, []);

  const update = <K extends keyof CompetitionFormValues>(key: K, value: CompetitionFormValues[K]) => {
    setValues(previous => ({ ...previous, [key]: value }));
    setErrors(previous => ({ ...previous, [key]: undefined, ...(key === "startAt" ? { endAt: undefined } : {}) }));
  };
  const switchTab = (next: FormTab) => { setTab(next); bodyRef.current?.scrollTo({ top: 0 }); };
  const save = (event: React.FormEvent) => {
    event.preventDefault();
    const next: Errors = {};
    if (!values.name.trim()) next.name = "请输入竞赛名称";
    if (!values.type) next.type = "请选择专业方向";
    if (!Number.isSafeInteger(values.participants) || values.participants < 0) next.participants = "报名人数须为非负整数";
    if (!values.startAt || !Number.isFinite(Date.parse(values.startAt))) next.startAt = "请选择开始时间";
    if (!values.endAt || !Number.isFinite(Date.parse(values.endAt))) next.endAt = "请选择结束时间";
    else if (values.startAt && values.endAt <= values.startAt) next.endAt = "结束时间须晚于开始时间";
    if (!values.notice.trim()) next.notice = "请输入竞赛须知";
    if (!values.competitionFiles.length) next.competitionFiles = "请上传竞赛文件";
    if (!values.cloudPlatform) next.cloudPlatform = "请选择云平台";
    if (!values.environmentScript.trim()) next.environmentScript = "请输入或加载配置文件";
    setErrors(next);
    const first = Object.keys(next)[0] as keyof CompetitionFormValues | undefined;
    if (first) {
      switchTab(first === "cloudPlatform" || first === "environmentScript" ? "env" : "basic");
      requestAnimationFrame(() => document.getElementById(`competition-${first}`)?.focus());
      return;
    }
    onSave({ ...values, name: values.name.trim(), organizer: values.organizer.trim(), coOrganizer: values.coOrganizer.trim(), notice: values.notice.trim() });
  };
  const field = (key: keyof CompetitionFormValues, label: string, required: boolean, children: React.ReactNode, alignTop = false) => <div className={cn("grid grid-cols-1 sm:grid-cols-[100px_minmax(0,1fr)] gap-2 sm:gap-4", alignTop ? "items-start" : "items-center")}>
    <label htmlFor={`competition-${key}`} className={cn(styles.label, alignTop && "sm:pt-2")}>{required && <span className="text-[#fa541c] mr-1">*</span>}{label}</label>
    <div className="min-w-0">{children}{errors[key] && <p id={`competition-${key}-error`} role="alert" className="text-red-500 text-xs mt-1.5">{errors[key]}</p>}</div>
  </div>;
  const attrs = (key: keyof CompetitionFormValues) => ({ id: `competition-${key}`, "aria-invalid": !!errors[key], "aria-describedby": errors[key] ? `competition-${key}-error` : undefined });
  const textField = (key: "name" | "organizer" | "coOrganizer" | "description" | "notice", placeholder: string, multiline = false) => {
    const maximum = multiline ? 1000 : 100;
    const shared = { ...attrs(key), value: values[key], maxLength: maximum, placeholder, onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => update(key, event.target.value), className: cn(inputClass, errors[key] && "border-red-400", multiline ? "pr-3 pb-6 min-h-[94px] resize-y block" : "pr-20") };
    return <div className="relative">{multiline ? <textarea {...shared} rows={3} /> : <input {...shared} />}<span className={cn("absolute right-3 text-[11px] text-neutral-400 pointer-events-none tabular-nums", multiline ? "bottom-2" : "top-1/2 -translate-y-1/2")}>{values[key].length} / {maximum}</span></div>;
  };

  return createPortal(<div className={styles.overlay} onClick={onClose}>
    <div ref={drawerRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="competition-form-title" className={cn(styles.panel, "max-w-[680px]")} onClick={event => event.stopPropagation()}>
      <header className={styles.header}><h2 id="competition-form-title" className={styles.title}>{initialCompetition ? "编辑竞赛" : "新建竞赛"}</h2><button type="button" aria-label="关闭竞赛表单" onClick={onClose} className={styles.close}><X className="w-4 h-4" /></button></header>
      <div role="tablist" aria-label="竞赛配置步骤" className={styles.tabList}>{[{ key: "basic" as const, label: "1. 基础信息" }, { key: "env" as const, label: "2. 初始化环境配置" }].map(item => <button key={item.key} type="button" role="tab" id={`competition-tab-${item.key}`} aria-selected={tab === item.key} aria-controls="competition-form-panel" onClick={() => switchTab(item.key)} className={cn(styles.tab, "flex-1", tab === item.key ? styles.activeTab : styles.inactiveTab)}>{item.label}</button>)}</div>
      <form ref={bodyRef} id="competition-form" noValidate onSubmit={save} className={styles.body}>
        <div id="competition-form-panel" role="tabpanel" aria-labelledby={`competition-tab-${tab}`} className="space-y-5 animate-fade-in">
          {tab === "basic" ? <>
            {field("name", "竞赛名称", true, textField("name", "请输入竞赛名称"))}
            {field("type", "专业方向", true, <select {...attrs("type")} value={values.type} onChange={event => update("type", event.target.value)} className={cn(inputClass, !values.type && "text-neutral-400", errors.type && "border-red-400")}><option value="" disabled>请选择专业方向</option>{Array.from(new Set(["大模型开发", "计算机视觉", "机器学习", "自然语言处理", "安全对抗", "云计算", "大数据", "人工智能", ...(initialCompetition?.type ? [initialCompetition.type] : [])])).map(option => <option key={option} value={option}>{option}</option>)}</select>)}
            {field("participants", "报名人数", false, <div className="inline-flex h-9 border border-neutral-200 rounded-[4px] overflow-hidden"><button aria-label="减少报名人数" type="button" disabled={values.participants <= 0} onClick={() => update("participants", Math.max(0, values.participants - 1))} className="px-3 bg-neutral-50 border-r border-neutral-200 text-neutral-500 hover:text-[#fa541c] disabled:opacity-40 cursor-pointer"><Minus className="w-3.5 h-3.5" /></button><input {...attrs("participants")} type="number" min={0} step={1} value={values.participants} onChange={event => update("participants", event.target.value === "" ? 0 : Number(event.target.value))} className="w-24 outline-none text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none" /><button aria-label="增加报名人数" type="button" onClick={() => update("participants", values.participants + 1)} className="px-3 bg-neutral-50 border-l border-neutral-200 text-neutral-500 hover:text-[#fa541c] cursor-pointer"><Plus className="w-3.5 h-3.5" /></button></div>)}
            {field("startAt", "场次时间", true, <div className="space-y-1.5"><div className="flex flex-col min-[480px]:flex-row items-center gap-2"><input {...attrs("startAt")} aria-label="开始时间" type="datetime-local" value={values.startAt} onInput={event => update("startAt", event.currentTarget.value)} onChange={event => update("startAt", event.target.value)} className={cn(inputClass, "flex-1 px-2 text-xs", errors.startAt && "border-red-400")} /><span className="text-neutral-400 hidden min-[480px]:inline">至</span><input {...attrs("endAt")} aria-label="结束时间" type="datetime-local" value={values.endAt} onInput={event => update("endAt", event.currentTarget.value)} onChange={event => update("endAt", event.target.value)} className={cn(inputClass, "flex-1 px-2 text-xs", errors.endAt && "border-red-400")} /></div>{errors.endAt && <p id="competition-endAt-error" role="alert" className="text-red-500 text-xs">{errors.endAt}</p>}</div>)}
            {field("organizer", "主办方", false, textField("organizer", "请输入主办方"))}
            {field("coOrganizer", "协办方", false, textField("coOrganizer", "请输入协办方"))}
            {field("description", "竞赛介绍", false, textField("description", "请输入竞赛介绍", true), true)}
            {field("notice", "竞赛须知", true, textField("notice", "请输入竞赛须知", true), true)}
            {field("competitionFiles", "竞赛文件", true, <div className="space-y-3"><button {...attrs("competitionFiles")} type="button" onClick={() => filesRef.current?.click()} className={cn(secondaryClass, "px-4 inline-flex items-center gap-2")}><Upload className="w-3.5 h-3.5" />上传文件</button><input ref={filesRef} type="file" multiple aria-label="选择竞赛文件" className="hidden" onChange={event => { const files = Array.from<File>(event.target.files || []); update("competitionFiles", [...values.competitionFiles, ...files.map(file => ({ id: crypto.randomUUID(), name: file.name, size: file.size, file }))]); event.target.value = ""; }} />{values.competitionFiles.map(file => <div key={file.id} className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-[4px] px-3 py-2 text-xs"><FileText className="w-3.5 h-3.5 text-[#fa541c] shrink-0" /><span className="truncate flex-1" title={file.name}>{file.name}</span><span className="text-neutral-400 shrink-0">{file.size < 1024 ? `${file.size} B` : `${(file.size / 1024).toFixed(1)} KB`}</span><button type="button" aria-label={`移除${file.name}`} onClick={() => update("competitionFiles", values.competitionFiles.filter(item => item.id !== file.id))} className="text-neutral-400 hover:text-red-500 cursor-pointer p-1"><X className="w-3.5 h-3.5" /></button></div>)}</div>, true)}
          </> : <>
            {field("cloudPlatform", "云平台", true, <select {...attrs("cloudPlatform")} value={values.cloudPlatform} onChange={event => update("cloudPlatform", event.target.value)} className={cn(inputClass, !values.cloudPlatform && "text-neutral-400", errors.cloudPlatform && "border-red-400")}><option value="" disabled>请选择云平台</option>{["天翼云", "阿里云", "华为云", "腾讯云"].map(option => <option key={option}>{option}</option>)}</select>)}
            {field("environmentScript", "配置文件", true, <div><div className={cn("border border-neutral-200 rounded-[4px] overflow-hidden focus-within:border-[#fa541c] focus-within:ring-1 focus-within:ring-[#fa541c]/25 transition-all", errors.environmentScript && "border-red-400")}><div className="flex justify-end items-center gap-2 px-3 py-2 border-b border-neutral-100 bg-neutral-50/50 min-h-9"><span className="truncate text-[11px] text-neutral-400 flex-1">{scriptFilename}</span><button type="button" onClick={() => scriptFileRef.current?.click()} className="text-[#fa541c] hover:text-[#e84a15] font-semibold text-xs cursor-pointer inline-flex items-center gap-1.5"><Upload className="w-3.5 h-3.5" />加载文件</button><input ref={scriptFileRef} type="file" aria-label="选择配置文件" className="hidden" onChange={async event => { const file = event.target.files?.[0]; event.target.value = ""; if (!file) return; const version = ++scriptLoadVersion.current; try { const text = await file.text(); if (version !== scriptLoadVersion.current) return; update("environmentScript", text); setScriptFilename(file.name); setScriptError(""); } catch { if (version === scriptLoadVersion.current) setScriptError("文件读取失败，请重新选择"); } }} /></div><div className="flex h-[360px]"><div ref={gutterRef} aria-hidden="true" className="w-10 shrink-0 bg-neutral-50 border-r border-neutral-200 text-neutral-400 text-right py-3 pr-2.5 font-mono text-xs leading-6 overflow-hidden select-none">{Array.from({ length: Math.max(1, values.environmentScript.split("\n").length) }, (_, index) => <div key={index}>{index + 1}</div>)}</div><textarea {...attrs("environmentScript")} spellCheck={false} wrap="off" value={values.environmentScript} onChange={event => { scriptLoadVersion.current++; update("environmentScript", event.target.value); setScriptFilename(""); setScriptError(""); }} onScroll={event => { if (gutterRef.current) gutterRef.current.scrollTop = event.currentTarget.scrollTop; }} placeholder="请输入脚本文件" className="w-full min-w-0 p-3 resize-none outline-none font-mono text-xs leading-6 placeholder:text-neutral-400 text-neutral-700" /></div></div>{scriptError && <p role="alert" className="text-red-500 text-xs mt-1.5">{scriptError}</p>}</div>, true)}
          </>}
        </div>
      </form>
      <footer className={styles.footer}>{tab === "env" && <button type="button" onClick={() => switchTab("basic")} className={cn(secondaryClass, "mr-auto")}>上一步</button>}<button type="button" onClick={onClose} className={secondaryClass}>取消</button>{tab === "basic" ? <button key="next" type="button" onClick={event => { event.preventDefault(); switchTab("env"); }} className={primaryClass}>下一步</button> : <button key="save" type="submit" form="competition-form" className={primaryClass}>保存</button>}</footer>
    </div>
  </div>, document.body);
}
