import { useState } from 'react';

export default function Skills({ lang, t, isDark }) {
  const fontClass = lang === 'fa' ? 'font-["IranYekan"]' : 'font-["Montserrat"]';

  // لیست کامل مهارت‌های شما همراه با درصد سیگنال فنی و معماری
  const skillData = [
    { name: "React", techLevel: 9, leadLevel: 8, status: t.skills.statusCore, color: "from-cyan-500 to-blue-500" },
    { name: "JavaScript", techLevel: 9, leadLevel: 7, status: t.skills.statusCore, color: "from-amber-400 to-yellow-500" },
    { name: "Tailwind CSS", techLevel: 9, leadLevel: 8, status: t.skills.statusStyling, color: "from-sky-400 to-indigo-500" },
    { name: "Bootstrap", techLevel: 8, leadLevel: 6, status: t.skills.statusStyling, color: "from-purple-500 to-indigo-600" },
    { name: "HTML & CSS", techLevel: 9, leadLevel: 7, status: t.skills.statusStyling, color: "from-orange-500 to-red-500" },
    { name: "Git & GitHub", techLevel: 8, leadLevel: 8, status: t.skills.statusTool, color: "from-zinc-400 to-slate-600" },
    { name: "Project Architecture", techLevel: 8, leadLevel: 9, status: t.skills.statusLead, color: "from-purple-500 to-pink-500" },
    { name: "Tech Lead & Mentoring", techLevel: 7, leadLevel: 9, status: t.skills.statusLead, color: "from-emerald-500 to-teal-500" },
    { name: "Next.js", techLevel: 4, leadLevel: 3, status: t.skills.statusLearning, color: "from-fuchsia-500 to-pink-600" },
  ];

  // متغیر وضعیت برای انیمیشن گره‌ها هنگام کلیک کاربر
  const [activeSkill, setActiveSkill] = useState(null);

  // تابع کمکی برای رندر کردن ۱۰ بلوک فرکانسی سیگنال
  const renderSignalBlocks = (level, gradientColor) => {
    return (
      <div className="flex gap-[3px] items-center mt-1.5 w-full">
        {[...Array(10)].map((_, i) => {
          const isActive = i < level;
          return (
            <div
              key={i}
              className={`h-4 flex-1 rounded-[2px] transition-all duration-300
                ${isActive 
                  ? `bg-gradient-to-t ${gradientColor} ${isDark ? 'opacity-100 shadow-[0_0_8px_rgba(6,182,212,0.4)]' : 'opacity-90'}` 
                  : (isDark ? 'bg-slate-900 opacity-30' : 'bg-slate-200 opacity-60')
                }`}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className={`h-full flex flex-col justify-center py-2 ${fontClass}`}>
      
      {/* هدر صفحه و خط فرمان ترمینال هکری */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent w-fit">
          {t.skills.title}
        </h2>
        <div className="mt-2 text-xs md:text-sm font-mono tracking-wider text-emerald-400 opacity-80 select-none">
          {t.skills.terminalLine}
        </div>
      </div>

      {/* شبکه اصلی گره‌های فرکانسی (اسکرول داخلی داینامیک فقط برای باکس مهارت‌ها در دسکتاپ و موبایل) */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[58vh] overflow-y-auto pr-1 custom-scrollbar">
        {skillData.map((skill, index) => {
          const isSelected = activeSkill === index;

          return (
            <div
              key={index}
              onClick={() => setActiveSkill(isSelected ? null : index)}
              className={`p-4 rounded-xl border cursor-pointer select-none transition-all duration-300 relative overflow-hidden flex flex-col justify-between
                ${isDark 
                  ? 'bg-slate-950/40 border-slate-800/80 hover:border-cyan-500/40 shadow-sm shadow-cyan-950/5' 
                  : 'bg-white border-slate-200 hover:border-blue-500/40 shadow-sm'
                }
                ${isSelected && isDark ? 'border-cyan-400/80 bg-slate-950/80 shadow-[0_0_20px_rgba(6,182,212,0.05)]' : ''}
                ${isSelected && !isDark ? 'border-blue-500 bg-slate-50/50' : ''}
              `}
            >
              {/* خط نئونی بالای کارتی که کاربر روش کلیک کرده */}
              {isSelected && (
                <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${skill.color} animate-pulse`} />
              )}

              {/* ردیف اول: نام تکنولوژی و تگ وضعیت */}
              <div className="flex justify-between items-start gap-2">
                <span className={`text-sm md:text-base font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  {skill.name}
                </span>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border 
                  ${isDark 
                    ? 'bg-slate-900/80 border-slate-800 text-slate-400' 
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  {skill.status}
                </span>
              </div>

              {/* ردیف دوم: فرکانس‌های پیاده‌سازی و لیدری */}
              <div className="mt-4 flex flex-col gap-3">
                {/* بخش اول: پیاده‌سازی فنی */}
                <div>
                  <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                    <span>{t.skills.techImplementation}</span>
                    <span className="font-mono">{skill.techLevel * 10}%</span>
                  </div>
                  {renderSignalBlocks(skill.techLevel, skill.color)}
                </div>

                {/* بخش دوم: لیدری و مدیریت (فقط برای مهارت‌های بالا رندر شکیل‌تر دارد) */}
                <div>
                  <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                    <span>{t.skills.architectureLead}</span>
                    <span className="font-mono">{skill.leadLevel * 10}%</span>
                  </div>
                  {renderSignalBlocks(skill.leadLevel, skill.color)}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
