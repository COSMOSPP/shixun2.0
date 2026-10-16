import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, Check, CheckCircle, ChevronRight, ClipboardList, ShieldCheck, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Competition } from "./CompetitionList";

interface RegistrationProps {
  competition: Competition;
  isRegistered: boolean;
  onSubmit: () => void;
}

const fields = [
  { name: "name", label: "姓名", placeholder: "请输入姓名", autoComplete: "name", maxLength: 50 },
  { name: "phone", label: "手机号码", placeholder: "请输入手机号码", autoComplete: "tel", maxLength: 11, type: "tel" },
  { name: "code", label: "短信验证码", placeholder: "请输入验证码", autoComplete: "one-time-code", maxLength: 6 },
  { name: "organization", label: "单位/企业名称", placeholder: "请输入单位/企业名称", autoComplete: "organization", maxLength: 100 },
  { name: "position", label: "职位", placeholder: "请输入职位", autoComplete: "organization-title", maxLength: 50 },
  { name: "email", label: "邮箱", placeholder: "请输入邮箱", autoComplete: "email", maxLength: 100, type: "email" },
  { name: "industry", label: "您所属的行业", placeholder: "请输入企业所属行业", autoComplete: "off", maxLength: 50 },
] as const;
type FieldName = typeof fields[number]["name"];
type FormValues = Record<FieldName, string>;
const emptyForm: FormValues = { name: "", phone: "", code: "", organization: "", position: "", email: "", industry: "" };
const demoCode = "123456";

export default function CompetitionRegistration({ competition, isRegistered, onSubmit }: RegistrationProps) {
  const [values, setValues] = useState<FormValues>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [codePhone, setCodePhone] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [codeNotice, setCodeNotice] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setValues(emptyForm);
    setErrors({});
    setCodePhone("");
    setCountdown(0);
    setCodeNotice("");
  }, [competition.id]);

  useEffect(() => {
    if (!countdown) return;
    const timer = window.setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    if (isRegistered) {
      window.scrollTo({ top: 0, behavior: "instant" });
      successRef.current?.focus({ preventScroll: true });
    }
  }, [isRegistered]);

  const sendCode = () => {
    if (!/^1[3-9]\d{9}$/.test(values.phone)) {
      setErrors(prev => ({ ...prev, phone: "请输入有效的 11 位手机号码" }));
      formRef.current?.querySelector<HTMLInputElement>('[name="phone"]')?.focus();
      return;
    }
    setErrors(prev => ({ ...prev, phone: undefined, code: undefined }));
    setCodePhone(values.phone);
    setCountdown(60);
    setCodeNotice(`演示验证码：${demoCode}，仅用于本页体验，不会发送真实短信。`);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (competition.status === "已结束" || isRegistered) return;
    const nextErrors: Partial<Record<FieldName, string>> = {};
    fields.forEach(field => {
      if (!values[field.name].trim()) nextErrors[field.name] = `请填写${field.label}`;
    });
    if (values.phone && !/^1[3-9]\d{9}$/.test(values.phone)) nextErrors.phone = "请输入有效的 11 位手机号码";
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = "请输入有效的邮箱地址";
    if (values.code.trim()) {
      if (!codePhone || codePhone !== values.phone) nextErrors.code = "请先为当前手机号码获取验证码";
      else if (values.code !== demoCode) nextErrors.code = "验证码不正确，请重新输入";
    }
    setErrors(nextErrors);
    const firstError = fields.find(field => nextErrors[field.name]);
    if (firstError) {
      formRef.current?.querySelector<HTMLInputElement>(`[name="${firstError.name}"]`)?.focus();
      return;
    }
    onSubmit();
  };

  const ended = competition.status === "已结束";
  return (
    <div className="mx-auto w-full max-w-[1200px] px-5 pt-6 sm:px-8 sm:pt-8 lg:px-10">
      <nav aria-label="面包屑导航" className="mb-7 flex flex-wrap items-center gap-2 text-sm text-[#9a8375]">
        <Link to="/competition" className="inline-flex items-center gap-2 hover:text-[#fa541c]"><ArrowLeft className="size-4" />赛事列表</Link>
        <ChevronRight className="size-3.5" />
        <Link to={`/competition/${competition.id}`} className="hover:text-[#fa541c]">赛事详情</Link>
        <ChevronRight className="size-3.5" /><span className="text-[#554238]">赛事报名</span>
      </nav>

      {isRegistered ? (
        <section className="competition-detail-section mx-auto max-w-[760px] py-14 text-center sm:py-20">
          <span className="mx-auto flex size-20 items-center justify-center rounded-full bg-[#fff0e5] text-[#fa641f]"><CheckCircle className="size-10" /></span>
          <h1 ref={successRef} tabIndex={-1} className="mt-6 text-2xl font-bold text-[#49372c] outline-none">报名信息已提交</h1>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#947b6a]">{competition.name}</p>
          <p className="mt-5 text-sm text-slate-500">演示报名已完成，报名状态将在本次浏览会话中保留。</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link className="competition-registration-link" to={`/competition/${competition.id}`}>查看赛事详情<ArrowRight className="size-4" /></Link>
            <Link className="competition-registration-link secondary" to="/competition">返回赛事列表</Link>
          </div>
        </section>
      ) : (
        <>
          <header className="mb-8">
            <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-[#c98d68]">COMPETITION REGISTRATION</p>
            <h1 className="text-3xl font-bold tracking-tight text-[#3f3028]">赛事报名</h1>
            <p className="mt-3 text-sm leading-6 text-[#947b6a]">填写参赛信息，开启你的下一场挑战。</p>
          </header>

          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8">
            <section className="competition-detail-section">
              <div className="mb-7 flex flex-wrap items-center justify-between gap-3 border-b border-[#f2e7df] pb-5">
                <h2 className="competition-detail-heading"><ClipboardList className="size-5 text-[#fa713b]" />报名信息</h2>
                <span className="text-xs text-slate-400"><span className="text-[#fa641f]">*</span> 为必填项</span>
              </div>
              <form ref={formRef} onSubmit={submit} noValidate>
                <fieldset disabled={ended} className="min-w-0 space-y-5">
                  <legend className="sr-only">参赛人信息</legend>
                  {fields.map(field => (
                    <div key={field.name}>
                      <div className={`competition-registration-field ${errors[field.name] ? "has-error" : ""}`}>
                        <label htmlFor={`registration-${field.name}`}><span aria-hidden="true">*</span>{field.label}</label>
                        <input id={`registration-${field.name}`} name={field.name} required
                          type={"type" in field ? field.type : "text"}
                          inputMode={field.name === "code" ? "numeric" : undefined}
                          autoComplete={field.autoComplete} maxLength={field.maxLength}
                          placeholder={field.placeholder} value={values[field.name]}
                          aria-invalid={!!errors[field.name]}
                          aria-describedby={errors[field.name] ? `registration-${field.name}-error` : field.name === "code" ? "registration-code-notice" : undefined}
                          onChange={event => {
                            const value = event.target.value;
                            setValues(prev => ({ ...prev, [field.name]: value, ...(field.name === "phone" ? { code: "" } : {}) }));
                            setErrors(prev => ({ ...prev, [field.name]: undefined }));
                            if (field.name === "phone") {
                              setCodePhone("");
                              setCodeNotice("");
                            }
                          }} />
                        {field.name === "code" && <Button type="button" disabled={countdown > 0} onClick={sendCode} className="competition-primary competition-code-button text-white">{countdown > 0 ? `${countdown}s 后重试` : "获取验证码"}</Button>}
                      </div>
                      {errors[field.name] && <p role="alert" id={`registration-${field.name}-error`} className="mt-2 text-xs text-red-600">{errors[field.name]}</p>}
                      {field.name === "code" && <p id="registration-code-notice" role="status" className="mt-2 text-xs leading-5 text-[#a48976]">{codeNotice || "当前为演示报名，点击获取验证码后可体验填写流程。"}</p>}
                    </div>
                  ))}
                  <div className="border-t border-[#f2e7df] pt-5">
                    <p className="flex items-start gap-2 text-xs leading-6 text-[#a08c7e]"><ShieldCheck className="mt-1 size-4 shrink-0 text-[#d69c76]" />请确保信息真实、准确，手机和邮箱将用于赛事通知与联系。</p>
                    <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
                      <Link to={`/competition/${competition.id}`} className="px-5 py-3 text-center text-sm text-[#947b6a] hover:text-[#fa541c]">返回赛事详情</Link>
                      <Button type="submit" className="competition-primary h-12 px-10 text-white">提交报名<ArrowRight className="size-4" /></Button>
                    </div>
                  </div>
                </fieldset>
                {ended && <p role="status" className="mt-5 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">该赛事已结束，无法报名。<Link to="/competition" className="ml-2 text-[#fa541c]">查看其他赛事</Link></p>}
              </form>
            </section>

            <aside className="space-y-5 lg:sticky lg:top-24" aria-label="报名赛事信息">
              <section className="competition-detail-section !overflow-hidden !p-0">
                <div className="competition-registration-cover">
                  <img src={`${import.meta.env.BASE_URL}images/covers/competition-${competition.id}-vivid.webp`} alt="" />
                  <span><Trophy className="size-4" />为热爱而挑战</span>
                </div>
                <div className="p-6">
                  <span className="rounded-md bg-[#fff0e5] px-2.5 py-1 text-xs text-[#d7622c]">{competition.type}</span>
                  <h2 className="mt-4 text-lg font-bold leading-7 text-[#49372c]">{competition.name}</h2>
                  <p className="mt-3 text-xs leading-6 text-[#947b6a]">主办方：{competition.sponsor}</p>
                  <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-[#947b6a]"><Calendar className="mt-0.5 size-3.5 shrink-0" />{competition.time}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-[#f2e7df] pt-5"><span className="text-xs text-[#a08c7e]">赛事总奖金池</span><strong className="text-2xl text-[#fa641f]">{competition.prize}</strong></div>
                </div>
              </section>
              <section className="rounded-2xl border border-[#f0e5dd] bg-[#fff5ec] p-6">
                <h2 className="text-sm font-semibold text-[#725442]">报名须知</h2>
                <ul className="mt-4 space-y-3 text-xs leading-6 text-[#a08069]">
                  {["请使用本人信息完成报名。", "请仔细阅读赛事详情中的参赛规则。", "提交前请核对手机号码和邮箱。"].map(item => <li key={item} className="flex gap-2"><Check className="mt-1 size-3.5 shrink-0 text-[#df9a68]" />{item}</li>)}
                </ul>
              </section>
            </aside>
          </div>
        </>
      )}
    </div>
  );
}
