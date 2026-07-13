import { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

export default function Hero({ lang, t, isDark }) {
  // سه تخصص یا نقش اصلی شما برای افکت تایپ‌شونده
  const roles = lang === 'fa' 
    ? ["توسعه‌دهنده ری‌اکت", "طراح رابط کاربری (UI/UX)", "متخصص فرانت‌آند"] 
    : ["React Developer", "UI/UX Designer", "Frontend Engineer"];
  
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const fullText = roles[currentRoleIndex];
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(fullText.substring(0, currentText.length - 1));
      }, 40);
    } else {
      timer = setTimeout(() => {
        setCurrentText(fullText.substring(0, currentText.length + 1));
      }, 80);
    }

    if (!isDeleting && currentText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, lang]);

  const fontClass = lang === 'fa' ? 'font-["IranYekan"]' : 'font-["Montserrat"]';

  return (
    <div className={`h-full flex flex-col justify-center items-center text-center px-4 ${fontClass}`}>
      
      {/* آواتار هکری نئونی */}
      <div className={`w-28 h-28 rounded-2xl mb-6 border-2 flex items-center justify-center transition-all duration-500 group relative
        ${isDark 
          ? 'bg-slate-950/60 border-cyan-500/50 shadow-[0_0_25px_rgba(6,182,212,0.25)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] border-dashed' 
          : 'bg-white border-blue-600 shadow-md'}`}>
        
        <div className="absolute w-3 h-3 border-t-2 border-l-2 border-purple-500 -top-1 -left-1"></div>
        <div className="absolute w-3 h-3 border-b-2 border-r-2 border-purple-500 -bottom-1 -right-1"></div>

        <Terminal 
          size={44} 
          className={`transition-transform duration-300 group-hover:scale-110
            ${isDark ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'text-blue-600'}`} 
        />
      </div>

      {/* نام و نام‌خانوادگی ثابت و بزرگ */}
      <div className="mb-2 text-sm font-bold tracking-wider text-purple-400 uppercase md:text-base">
        {t.hero.greeting}
      </div>
      <h1 className="mb-4 text-4xl font-black tracking-tight text-transparent md:text-6xl bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text">
        {lang === 'fa' ? t.hero.name : t.hero.nameEn}
      </h1>

      {/* بخش تایپ‌شونده وظایف و تخصص‌ها */}
      <div className="text-xl md:text-2xl font-bold mb-8 min-h-[40px] text-slate-300">
        <span className="font-bold text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 bg-clip-text">
          {currentText}
        </span>
        <span className="ml-1 font-normal animate-pulse text-cyan-400">_</span>
      </div>

      {/* توضیحات ثابت */}
      <p className={`text-sm md:text-base max-w-xl mb-10 leading-relaxed font-normal
        ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
        {t.hero.sub}
      </p>

      {/* دکمه‌های اکشن */}
      <div className="flex flex-row justify-center w-full gap-4 sm:w-auto">
        <button className={`px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-bold rounded-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0
          ${isDark ? 'shadow-[0_4px_20px_rgba(6,182,212,0.25)] hover:shadow-[0_4px_25px_rgba(6,182,212,0.4)]' : 'shadow-lg'}`}>
          {t.hero.projectBtn}
        </button>
        
        <button className={`px-6 py-3 text-sm font-bold rounded-xl border transition-all transform hover:-translate-y-0.5 active:translate-y-0
          ${isDark 
            ? 'bg-slate-900/40 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700' 
            : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'}`}>
          {t.hero.cvBtn}
        </button>
      </div>

    </div>
  );
}
