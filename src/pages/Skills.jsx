import { useState } from 'react';
import { 
  Code2, Braces, Wind, GitBranch, 
  FileCode, Network, Users, Milestone, ChevronRight 
} from 'lucide-react';

export default function Skills({ lang, t, isDark }) {
  // فعال‌سازی فونت بومی روی کل المان‌ها
  const fontClass = lang === 'fa' ? 'font-["IranYekan"]' : 'font-["Montserrat"]';

  const skillTree = [
    { id: "html", name: "HTML & CSS", level: 80, package: "frontend-stack", icon: Code2, color: "#f97316", desc: t.skills.html_desc },
    { id: "tailwind", name: "Bootstrap & Tailwind", level: 50, package: "ui-styling-kit", icon: Wind, color: "#06b6d4", desc: t.skills.tailwind_desc },
    { id: "js", name: "JavaScript", level: 20, package: "core-logic", icon: Braces, color: "#eab308", desc: t.skills.js_desc },
    { id: "git", name: "Git & GitHub", level: 70, package: "devops-tools", icon: GitBranch, color: "#94a3b8", desc: t.skills.git_desc },
    { id: "react", name: "React.js", level: 30, package: "frontend-framework", icon: FileCode, color: "#3b82f6", desc: t.skills.react_desc },
    { id: "arch", name: "Project Architecture", level: 60, package: "afsana-lead-core", icon: Network, color: "#a855f7", desc: t.skills.arch_desc },
    { id: "lead", name: "Tech Lead & Mentoring", level: 70, package: "afsana-lead-core", icon: Users, color: "#10b981", desc: t.skills.lead_desc },
    { id: "next", name: "Next.js (Learning)", level: 0, package: "next-evolution", icon: Milestone, color: "#d946ef", desc: t.skills.next_desc },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const currentSkill = skillTree[activeIndex];

  const radius = 40;
  const strokeDashoffset = 251.2 - (251.2 * currentSkill.level) / 100;

  // هک ساده جاوااسکریپت برای قابلیت Drag & Scroll با موس در دسکتاپ
  const handleMouseDown = (e) => {
    const slider = e.currentTarget;
    slider.isDown = true;
    slider.startX = e.pageX - slider.offsetLeft;
    slider.scrollLeftStart = slider.scrollLeft;
  };

  const handleMouseLeaveOrUp = (e) => {
    e.currentTarget.isDown = false;
  };

  const handleMouseMove = (e) => {
    const slider = e.currentTarget;
    if (!slider.isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - slider.startX) * 1.5; // سرعت حرکت
    slider.scrollLeft = slider.scrollLeftStart - walk;
  };

  return (
    <div dir="ltr" className={`h-full flex flex-col justify-between py-1 text-left select-none ${fontClass}`}>
      
      {/* ─── هدر صفحه ─── */}
      <div className={lang === 'fa' ? 'text-right' : 'text-left'}>
        <h2 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent w-fit">
          {t.skills.title}
        </h2>
        <p className="text-sm text-slate-500 mt-1 font-bold">{t.skills.subtitle}</p>
      </div>

      {/* ─── کانتینر اصلی ─── */}
      <div className="grid md:grid-cols-12 gap-6 items-center flex-1 my-3 overflow-hidden">
        
        {/* ستون تب‌ها با فونت بزرگ‌تر و قابلیت درگ با موس در دسکتاپ */}
        <div className="md:col-span-7 w-full overflow-hidden flex flex-col justify-center">
          <div className={`text-slate-500 mb-3 hidden md:flex items-center gap-1.5 text-sm font-bold border-b border-slate-800/10 pb-2 ${lang === 'fa' ? 'justify-end' : 'justify-start'}`}>
            <span>{t.skills.importSection}</span>
          </div>

          {/* تب‌ها با کلاس custom-scrollbar جهت مخفی‌سازی و رویدادهای کشیدن با موس */}
          <div 
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeaveOrUp}
            onMouseUp={handleMouseLeaveOrUp}
            onMouseMove={handleMouseMove}
            className="flex md:grid md:grid-cols-2 gap-3 overflow-x-auto md:overflow-x-visible md:overflow-y-auto max-h-[35vh] md:max-h-[46vh] pt-1 pb-2 md:pb-0 pr-1 custom-scrollbar snap-x cursor-grab active:cursor-grabbing"
          >
            {skillTree.map((skill, index) => {
              const Icon = skill.icon;
              const isSelected = activeIndex === index;
              return (
                <button
                  key={skill.id}
                  onClick={() => setActiveIndex(index)}
                  className={`p-3 px-4 rounded-xl border text-sm font-bold flex items-center justify-between gap-3 transition-all duration-200 whitespace-nowrap snap-center shrink-0 md:w-full
                    ${isSelected 
                      ? (isDark ? 'bg-slate-900 border-slate-700 text-white shadow-md' : 'bg-white border-slate-300 text-slate-950 shadow-sm') 
                      : (isDark ? 'bg-slate-950/20 border-slate-900 text-slate-400 hover:text-slate-200' : 'bg-slate-100/50 border-slate-200 text-slate-600')
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg border" style={{ backgroundColor: isDark ? '#0b0f19' : '#f8fafc', color: skill.color, borderColor: isDark ? '#1e293b' : '#e2e8f0' }}>
                      <Icon size={16} />
                    </div>
                    <span>{skill.name}</span>
                  </div>
                  <ChevronRight size={14} className={`hidden md:block transition-transform ${isSelected ? 'translate-x-1 text-cyan-400' : 'opacity-10'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* ستون رادار فرکانسی با فونت‌های بزرگ‌تر برای عنوان */}
        <div className="md:col-span-5 h-full flex flex-col justify-center items-center">
          <div className="text-xs md:text-sm tracking-widest text-slate-400 uppercase mb-3 md:mb-4 text-center font-bold">
            {t.skills.radarSection}
          </div>

          <div className="relative w-28 h-28 md:w-40 md:h-40 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r={radius} className={isDark ? 'stroke-slate-900' : 'stroke-slate-200'} strokeWidth="5.5" fill="transparent" />
              <circle
                cx="50"
                cy="50"
                r={radius}
                stroke={currentSkill.color}
                strokeWidth="5.5"
                fill="transparent"
                strokeDasharray="251.2"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-700 ease-out"
                style={{ filter: isDark ? `drop-shadow(0 0 8px ${currentSkill.color})` : 'none' }}
              />
            </svg>

            <div className="absolute flex flex-col items-center justify-center font-mono">
              <span className={`text-xl md:text-3xl font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {currentSkill.level}%
              </span>
              <span className="text-[8px] md:text-[10px] text-slate-500 uppercase font-black tracking-widest mt-0.5">
                SIGNAL
              </span>
            </div>
          </div>

          <div className="text-center mt-3">
            <span className="text-sm font-black px-3 py-1.5 rounded-xl bg-slate-500/10 border border-slate-500/20" style={{ color: currentSkill.color }}>
              {currentSkill.name}
            </span>
          </div>
        </div>

      </div>

      {/* ─── باکس لاگ پایینی تصحیح شده با فونت بزرگ لوکال ─── */}
      <div className={`w-full ${lang === 'fa' ? 'text-right' : 'text-left'}`} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
        <div className={`p-4 rounded-xl border text-sm md:text-base leading-relaxed transition-all
          ${isDark ? 'bg-slate-950/40 border-slate-900 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'}`}>
          <div className="text-xs text-slate-500 mb-1.5 uppercase font-bold tracking-wider">
            ⚡ {t.skills.logSection}
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping inline-block shrink-0" />
            <span className={`font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{currentSkill.desc}</span>
          </div>
        </div>
      </div>

    </div>
  );
}
