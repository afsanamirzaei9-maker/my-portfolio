import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Calendar, Building, ChevronRight } from 'lucide-react';
import { getCertificatesStructure } from '../config/certificatesStructure.js';

export default function Certificates({ lang, t, isDark }) {
  const fontClass = lang === 'fa' ? 'font-["IranYekan"]' : 'font-["Montserrat"]';
  const [selectedCertId, setSelectedCertId] = useState('cert1');

  const certificatesList = getCertificatesStructure(t);
  const currentCert = certificatesList.find(c => c.id === selectedCertId) || certificatesList;

  return (
    <div dir="ltr" className={`h-full flex flex-col justify-between py-1 text-left select-none ${fontClass}`}>
      
      <div className={lang === 'fa' ? 'text-right' : 'text-left'}>
        <h2 className="text-xl md:text-3xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent w-fit">
          {t.certificates.title}
        </h2>
        <p className="text-xs text-slate-500 mt-0.5 font-medium">{t.certificates.subtitle}</p>
      </div>

      <div className="flex flex-col md:grid md:grid-cols-12 gap-5 items-center flex-1 my-3 overflow-hidden">
        
        <div className="md:col-span-4 w-full flex flex-col justify-center gap-2 md:max-h-[45vh] pb-2 md:pb-0 pr-1 custom-scrollbar snap-x">
          <div className={`text-slate-500 mb-1 hidden md:flex items-center gap-1.5 text-xs font-bold border-b border-slate-800/10 pb-1.5 ${lang === 'fa' ? 'justify-end' : 'justify-start'}`}>
            <span>{t.certificates.selectLabel}</span>
          </div>

          <div className="flex md:flex-col gap-2 w-full overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 custom-scrollbar">
            {certificatesList.map((cert, index) => {
              const isSelected = selectedCertId === cert.id;
              return (
                <button
                  key={cert.id}
                  onClick={() => setSelectedCertId(cert.id)}
                  className={`p-2.5 px-3.5 rounded-xl border text-xs font-bold flex items-center justify-between gap-2 whitespace-nowrap snap-center shrink-0 md:w-full
                    ${isSelected 
                      ? (isDark ? 'bg-slate-900 border-slate-700 text-white shadow-md' : 'bg-white border-slate-300 text-slate-950 shadow-sm') 
                      : (isDark ? 'bg-slate-950/20 border-slate-900 text-slate-400 hover:text-slate-200' : 'bg-slate-100/50 border-slate-200 text-slate-600')
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <Award size={14} className={isSelected ? 'text-cyan-400' : 'text-slate-500'} />
                    <span>{lang === 'fa' ? `گواهینامه شماره ${index + 1}` : `Certificate 0${index + 1}`}</span>
                  </div>
                  <ChevronRight size={12} className={`hidden md:block transition-transform ${isSelected ? 'translate-x-1 text-cyan-400' : 'opacity-10'}`} />
                </button>
              );
            })}
          </div>
        </div>

        <div className="md:col-span-8 h-full flex flex-col justify-center items-center w-full overflow-hidden">
          <AnimatePresence mode="wait">
            {currentCert && (
              <motion.div
                key={currentCert.id}
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`w-full max-w-[480px] h-[190px] sm:h-[220px] md:h-[350px] rounded-2xl border flex flex-col overflow-hidden transition-all duration-300 shadow-xl
                  ${isDark ? 'bg-slate-950/40 border-slate-900 shadow-cyan-950/5' : 'bg-white border-slate-200 shadow-slate-200/50'}`}
              >
                <div className="w-full flex-1 relative overflow-hidden bg-slate-950/10">
                  <img 
                    src={currentCert.image} 
                    alt={currentCert.title} 
                    className="w-full h-full object-contain pointer-events-none select-none"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                  />
                  <div className="absolute inset-0 z-20 bg-transparent pointer-events-auto" onContextMenu={(e) => e.preventDefault()} />
                </div>

                <div className={`p-3 md:p-4 border-t border-slate-800/10 dark:border-slate-800/40 bg-slate-900/10 backdrop-blur-sm z-10 ${lang === 'fa' ? 'text-right' : 'text-left'}`} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
                  <h3 className={`text-xs md:text-sm font-black leading-snug transition-colors mb-2 ${isDark ? 'text-white' : 'text-slate-950'}`}>
                    {currentCert.title}
                  </h3>
                  
                  <div className="flex flex-col gap-1 text-[11px] font-bold">
                    <div className="flex items-center gap-2">
                      <Building size={12} className="text-purple-400 shrink-0" />
                      <span className="text-slate-500">{t.certificates.issuerLabel}</span>
                      <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>{currentCert.issuer}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={12} className="text-cyan-400 shrink-0" />
                      <span className="text-slate-500">{t.certificates.dateLabel}</span>
                      <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>{currentCert.date}</span>
                    </div>
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
