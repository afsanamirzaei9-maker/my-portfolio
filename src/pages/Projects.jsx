import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, FolderGit, Briefcase, Terminal, Menu, X, ChevronRight } from 'lucide-react';
import { getProjectsStructure } from './projectsStructure.js';

export default function Projects({ lang, t, isDark }) {
  const fontClass = lang === 'fa' ? 'font-["IranYekan"]' : 'font-["Montserrat"]';
  
  const [activeTab, setActiveTab] = useState('real'); 
  const [selectedProjectId, setSelectedProjectId] = useState('btb');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const allProjects = getProjectsStructure(t);
  const realProjects = allProjects.filter(p => p.category === 'managed' || p.category === 'exclusive');
  const practiceProjects = allProjects.filter(p => p.category === 'practice');

  const currentList = activeTab === 'real' ? realProjects : practiceProjects;
  const currentProject = allProjects.find(p => p.id === selectedProjectId) || currentList;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedProjectId(tab === 'real' ? 'btb' : 'clock');
  };

  const handleProjectSelect = (id) => {
    setSelectedProjectId(id);
    setIsMenuOpen(false); 
  };

  return (
    <div dir="ltr" className={`h-full flex flex-col justify-between py-1 text-left select-none relative ${fontClass}`}>
      
      <div className="flex justify-between items-center border-b border-slate-800/10 dark:border-slate-800/40 pb-3 z-30">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`p-2.5 rounded-xl border transition-all flex items-center gap-2 font-bold text-xs md:text-sm
            ${isDark 
              ? 'bg-slate-900 border-slate-800 text-cyan-400 shadow-md shadow-cyan-950/20 hover:border-cyan-500/40' 
              : 'bg-white border-slate-200 text-slate-800 shadow-sm hover:bg-slate-50'
            }`}
        >
          {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
          <span>{lang === 'fa' ? 'لیست پروژه‌ها' : 'Projects List'}</span>
        </button>

        <div className={lang === 'fa' ? 'text-right' : 'text-left'}>
          <h2 className="text-xl md:text-2xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent w-fit">
            {t.projects.title}
          </h2>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center relative w-full overflow-hidden my-3">
        
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`absolute left-0 top-0 bottom-0 w-[260px] md:w-[300px] rounded-2xl border p-4 z-40 flex flex-col justify-start backdrop-blur-xl shadow-2xl
                ${isDark ? 'bg-slate-950/95 border-slate-800' : 'bg-white/95 border-slate-200'}`}
            >
              <div className="flex gap-1.5 mb-4 border-b border-slate-800/10 pb-2.5 w-full">
                <button
                  onClick={() => handleTabChange('real')}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] md:text-xs font-black flex items-center justify-center gap-1.5 border transition-all
                    ${activeTab === 'real'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                      : (isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600')
                    }`}
                >
                  <span>{lang === 'fa' ? 'واقعی' : 'Real'}</span>
                </button>

                <button
                  onClick={() => handleTabChange('practice')}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] md:text-xs font-black flex items-center justify-center gap-1.5 border transition-all
                    ${activeTab === 'practice'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                      : (isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600')
                    }`}
                >
                  <span>{lang === 'fa' ? 'تمرینی' : 'Practice'}</span>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar flex flex-col gap-2 max-h-[35vh] md:max-h-[42vh]">
                {currentList.map((project) => {
                  const isSelected = selectedProjectId === project.id;
                  return (
                    <button
                      key={project.id}
                      onClick={() => handleProjectSelect(project.id)}
                      className={`p-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-between gap-3 transition-all duration-150 w-full text-left
                        ${isSelected 
                          ? (isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-950') 
                          : (isDark ? 'text-slate-400 border-transparent hover:bg-slate-900/40 hover:text-slate-200' : 'text-slate-600 border-transparent hover:bg-slate-50')
                        }`}
                    >
                      <div className="flex items-center gap-2 overflow-hidden truncate">
                        <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-cyan-400 animate-pulse' : 'bg-slate-500/30'}`} />
                        <span className="truncate">{project.title}</span>
                      </div>
                      <ChevronRight size={12} className={`transition-transform ${isSelected ? 'translate-x-0.5 text-cyan-400' : 'opacity-10'}`} />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-full flex items-center justify-center h-full">
          <AnimatePresence mode="wait">
            {currentProject && (
              <motion.div
                key={currentProject.id}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`w-full max-w-[380px] h-[220px] md:h-[250px] rounded-2xl border p-5 flex flex-col justify-between relative overflow-hidden transition-colors duration-300 shadow-xl
                  ${isDark 
                    ? 'bg-slate-950/40 border-slate-900 shadow-cyan-950/5' 
                    : 'bg-white border-slate-200 shadow-slate-200/50'
                  }`}
              >
                {currentProject.image ? (
                  <>
                    <img src={currentProject.image} alt={currentProject.title} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
                    <div className={`absolute inset-0 backdrop-blur-[3px] pointer-events-none ${isDark ? 'bg-slate-950/85' : 'bg-white/90'}`} />
                  </>
                ) : (
                  <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none font-mono text-[8px] p-2 leading-tight overflow-hidden">
                    {"const prj = { id: '" + currentProject.id + "' };"}
                  </div>
                )}

                <div className="flex justify-between items-center z-10">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-md tracking-wider border uppercase
                    ${isDark ? 'bg-slate-900 border-slate-800 text-purple-400' : 'bg-slate-50 border-slate-200 text-purple-600'}`}>
                    {currentProject.role}
                  </span>
                </div>

                <div className={`my-1.5 z-10 ${lang === 'fa' ? 'text-right' : 'text-left'}`} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
                  <h3 className={`text-base md:text-lg font-black truncate ${isDark ? 'text-white' : 'text-slate-950'}`}>
                    {currentProject.title}
                  </h3>
                  <p className={`text-xs mt-1.5 leading-relaxed line-clamp-3 md:line-clamp-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {currentProject.desc}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-slate-800/10 dark:border-slate-800/40 z-10">
                  <div className="flex gap-1 overflow-hidden max-w-[50%]">
                    {currentProject.tech && currentProject.tech.slice(0, 2).map((techName, i) => (
                      <span key={i} className="text-[9px] font-bold px-1.5 py-0.5 bg-slate-500/10 text-slate-500 rounded">
                        {techName}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-1.5">
                    {currentProject.github ? (
                      <a href={currentProject.github} target="_blank" rel="noreferrer" className={`p-1.5 rounded-lg border transition-all ${isDark ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`} title={t.projects.btnCode}>
                        <FolderGit size={14} />
                      </a>
                    ) : (
                      <div className="p-1.5 rounded-lg border opacity-20 cursor-not-allowed bg-slate-500/5 border-transparent text-slate-500"><FolderGit size={14} /></div>
                    )}

                    {currentProject.demo ? (
                      <a href={currentProject.demo} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg border bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm border-transparent hover:opacity-90 transition-opacity" title={t.projects.btnLive}>
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
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
                    