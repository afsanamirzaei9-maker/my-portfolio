import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserRound } from 'lucide-react';

export default function Hero({ lang, t, isDark }) {
  const [avatarUrl, setAvatarUrl] = useState("https://media.gettyimages.com/id/2012746910/photo/professional-it-worker-working-late-coding-and-machine-learning-working-with-ai.jpg?s=612x612&w=0&k=20&c=pzIo43asgvFKZ1tpC3pWTQiK8FRTByk3YVgD4-rxIyQ="); 

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
      
      {/* آواتار هوشمند */}
      <div className={`w-28 h-28 rounded-2xl mb-6 border-2 flex items-center justify-center transition-all duration-500 group relative overflow-hidden
        ${isDark 
          ? 'bg-slate-950/60 border-cyan-500/50 shadow-[0_0_25px_rgba(6,182,212,0.25)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] border-dashed' 
          : 'bg-white border-blue-600 shadow-md'}`}>
        
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-purple-500 z-10"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-purple-500 z-10"></div>

        {avatarUrl ? (
          <img 
            src={avatarUrl} 
            alt={lang === 'fa' ? t.hero.name : t.hero.nameEn} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <UserRound 
            size={44} 
            className={`transition-transform duration-300 group-hover:scale-110
              ${isDark ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'text-blue-600'}`} 
          />
        )}
      </div>

      <div className="text-sm md:text-base font-bold tracking-wider text-purple-400 mb-2 uppercase">
        {t.hero.greeting}
      </div>

      {/* تغییر گریدینت نام به صورت هوشمند بر اساس حالت دارک یا لایت */}
      <h1 className={`text-4xl md:text-6xl font-black mb-4 py-1 tracking-tight bg-gradient-to-r bg-clip-text text-transparent transition-all duration-300
        ${isDark 
          ? 'from-white via-slate-200 to-slate-400' 
          : 'from-slate-950 via-slate-800 to-zinc-700'
        }`}
      >
        {lang === 'fa' ? t.hero.name : t.hero.nameEn}
      </h1>

      <div className="text-xl md:text-2xl font-bold mb-8 min-h-[40px] text-slate-300">
        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent font-bold">
          {currentText}
        </span>
        <span className="animate-pulse text-cyan-400 font-normal ml-1">_</span>
      </div>

      <p className={`text-sm md:text-base max-w-xl mb-10 leading-relaxed font-normal transition-colors duration-300
        ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
        {t.hero.sub}
      </p>

      <div className="flex flex-row gap-4 justify-center w-full sm:w-auto">
        <Link 
          to="/projects"
          className={`px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-bold rounded-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 inline-block text-center
            ${isDark ? 'shadow-[0_4px_20px_rgba(6,182,212,0.25)] hover:shadow-[0_4px_25px_rgba(6,182,212,0.4)]' : 'shadow-lg'}`}
        >
          {t.hero.projectBtn}
        </Link>

        {/* <button className={`px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-bold rounded-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0
          ${isDark ? 'shadow-[0_4px_20px_rgba(6,182,212,0.25)] hover:shadow-[0_4px_25px_rgba(6,182,212,0.4)]' : 'shadow-lg'}`}>
          {t.hero.projectBtn}
        </button> */}
        
        {/* <button className={`px-6 py-3 text-sm font-bold rounded-xl border transition-all transform hover:-translate-y-0.5 active:translate-y-0
          ${isDark 
            ? 'bg-slate-900/40 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700' 
            : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'}`}>
          {t.hero.cvBtn}
        </button> */}
      </div>

    </div>
  );
}
