import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Layers, Briefcase, Code, Terminal, FolderGit } from 'lucide-react';
import { getProjectsStructure } from './projectsStructure.js';

export default function Projects({ lang, t, isDark }) {
  const fontClass = lang === 'fa' ? 'font-["IranYekan"]' : 'font-["Montserrat"]';
  const [filter, setFilter] = useState('all');

  const projectsData = getProjectsStructure(t);

  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  const filterButtons = [
    { id: 'all', label: t.projects.filterAll, icon: Layers },
    { id: 'managed', label: t.projects.filterManaged, icon: Briefcase },
    { id: 'exclusive', label: t.projects.filterExclusive, icon: Code },
    { id: 'practice', label: t.projects.filterPractice, icon: Terminal }
  ];

  const handleMouseDown = (e) => {
    const el = e.currentTarget;
    el.isDown = true;
    el.startX = e.pageX - el.offsetLeft;
    el.scrollLeftStart = el.scrollLeft;
  };
  const handleMouseLeaveOrUp = (e) => { e.currentTarget.isDown = false; };
  const handleMouseMove = (e) => {
    const el = e.currentTarget;
    if (!el.isDown) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - el.startX) * 1.5;
    el.scrollLeft = el.scrollLeftStart - walk;
  };

  return (
    <div dir="ltr" className={`h-full flex flex-col justify-between py-1 text-left ${fontClass}`}>
      
      {/* هدر صفحه */}
      <div className={lang === 'fa' ? 'text-right' : 'text-left'}>
        <h2 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent w-fit">
          {t.projects.title}
        </h2>
        <p className="text-sm text-slate-500 mt-1 font-medium">{t.projects.subtitle}</p>
      </div>

      {/* نوار دکمه‌های فیلتر */}
      <div className={`flex gap-2 overflow-x-auto my-4 pb-1 custom-scrollbar snap-x ${lang === 'fa' ? 'md:justify-end' : 'md:justify-start'}`} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
        {filterButtons.map((btn) => {
          const BtnIcon = btn.icon;
          const isSelected = filter === btn.id;
          return (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id)}
              className={`p-2 px-4 rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 border transition-all whitespace-nowrap snap-center
                ${isSelected 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md' 
                  : (isDark ? 'bg-slate-950/40 border-slate-900 text-slate-400 hover:text-slate-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200')
                }`}
            >
              <BtnIcon size={14} />
              <span>{btn.label}</span>
            </button>
          );
        })}
      </div>

      {/* کاروسل کارت‌ها */}
      <div className="flex-1 overflow-hidden flex items-center w-full">
        <motion.div 
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeaveOrUp}
          onMouseUp={handleMouseLeaveOrUp}
          onMouseMove={handleMouseMove}
          className="flex gap-4 overflow-x-auto w-full py-4 pr-1 custom-scrollbar snap-x cursor-grab active:cursor-grabbing select-none"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9, x: 50 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  x: 0,
                  y: [0, index % 2 === 0 ? -5 : 5, 0]
                }}
                exit={{ opacity: 0, scale: 0.8, x: -50 }}
                transition={{ 
                  y: { repeat: Infinity, duration: 4 + (index % 3), ease: "easeInOut" },
                  layout: { duration: 0.4 },
                  opacity: { duration: 0.3 }
                }}
                className={`w-[280px] md:w-[320px] h-[210px] md:h-[240px] rounded-2xl border p-4 md:p-5 flex flex-col justify-between shrink-0 snap-center relative overflow-hidden transition-all duration-300 group
                  ${isDark 
                    ? 'bg-slate-950/40 border-slate-900 shadow-md shadow-cyan-950/5 hover:border-cyan-500/30' 
                    : 'bg-white border-slate-200 shadow-sm hover:border-blue-500/30'
                  }`}
              >
                {/* ─── لایه پس‌زمینه داینامیک: نمایش تصویر یا کدهای فرضی ─── */}
                {project.image ? (
                  <>
                    {/* تصویر پروژه با افکت بزرگ‌نمایی ملایم هنگام هاور */}
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                    />
                    {/* پوشش شیشه‌ای تیره/روشن جهت خوانایی ۱۰۰٪ متون روی عکس */}
                    <div className={`absolute inset-0 backdrop-blur-[3px] transition-colors duration-300 pointer-events-none
                      ${isDark ? 'bg-slate-950/80 group-hover:bg-slate-950/75' : 'bg-white/85 group-hover:bg-white/80'}`} 
                    />
                  </>
                ) : (
                  /* در صورت نبودن عکس، موکاپ کدهای نئونی فرضی رندر می‌شود */
                  <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none font-mono text-[8px] p-2 leading-tight overflow-hidden">
                    {"const app = () => { return (<div className='w-full'><Header />\n<ProjectCard id='" + project.id + "' />\n</div>) }"}
                  </div>
                )}

                {/* برچسب نقش تخصصی */}
                <div className="flex justify-between items-center z-10">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-md tracking-wider border uppercase
                    ${isDark ? 'bg-slate-900 border-slate-800 text-purple-400' : 'bg-slate-50 border-slate-200 text-purple-600'}`}>
                    {project.role}
                  </span>
                </div>

                {/* متون عنوان و توضیحات کامپوننت */}
                <div className={`my-2 z-10 ${lang === 'fa' ? 'text-right' : 'text-left'}`} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
                  <h3 className={`text-sm md:text-base font-black truncate transition-colors ${isDark ? 'text-white' : 'text-slate-950'}`}>
                    {project.title}
                  </h3>
                  <p className={`text-[11px] md:text-xs mt-1.5 leading-relaxed line-clamp-3 md:line-clamp-4 transition-colors ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {project.desc}
                  </p>
                </div>

                {/* تکنولوژی‌ها و دکمه‌های اکشن */}
                <div className="flex justify-between items-center pt-2 border-t border-slate-800/10 dark:border-slate-800/40 z-10">
                  <div className="flex gap-1 overflow-hidden max-w-[50%]">
                    {project.tech.slice(0, 2).map((t, i) => (
                      <span key={i} className="text-[9px] font-bold px-1.5 py-0.5 bg-slate-500/10 text-slate-500 rounded">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-1.5">
                    {project.github ? (
                      <a href={project.github} target="_blank" rel="noreferrer" className={`p-1.5 rounded-lg border transition-all ${isDark ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`} title={t.projects.btnCode}>
                        <FolderGit size={14} />
                      </a>
                    ) : (
                      <div className="p-1.5 rounded-lg border opacity-20 cursor-not-allowed bg-slate-500/5 border-transparent text-slate-500">
                        <FolderGit size={14} />
                      </div>
                    )}

                    {project.demo ? (
                      <a href={project.demo} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg border bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm border-transparent hover:opacity-90 transition-opacity" title={t.projects.btnLive}>
                        <ExternalLink size={14} />
                      </a>
                    ) : (
                      <span className="text-[9px] font-black text-slate-500 bg-slate-500/10 px-2 py-1.5 rounded-lg border border-transparent whitespace-nowrap">
                        {t.projects.noDemo}
                      </span>
                    )}
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

    </div>
  );
}
