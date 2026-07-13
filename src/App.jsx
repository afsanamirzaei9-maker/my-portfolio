import { useState } from 'react';
import { Sun, Moon, Languages } from 'lucide-react';
import { translations } from './locales/translations';
import { getMenuItems } from './components/sidbarData';
import Hero from './pages/Hero';

export default function App() {
  const [currentTab, setCurrentTab] = useState('hero');
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang] = useState('fa');

  const t = translations[lang];
  const menuItems = getMenuItems(lang);

  // سیستم رندر داینامیک صفحات داخلی
  const renderContent = () => {
    switch (currentTab) {
      case 'hero':
        return <Hero lang={lang} t={t} isDark={isDark} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h2 className="mb-2 text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text">
              {menuItems.find(m => m.id === currentTab)?.label}
            </h2>
            <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>{t.common.notImplemented}</p>
          </div>
        );
    }
  };

  return (
    <div 
      dir={lang === 'fa' ? 'rtl' : 'ltr'} 
      className={`h-screen w-screen overflow-hidden transition-colors duration-300 flex flex-col md:flex-row font-sans antialiased
        ${isDark 
          ? 'bg-[#0b0f19] text-slate-100 bg-gradient-to-br from-[#0b0f19] via-[#111827] to-[#070a12]' 
          : 'bg-slate-50 text-slate-800 bg-gradient-to-br from-slate-50 via-slate-100 to-zinc-200'
        }`}
    >
      
      {/* ─── ۱. سایدبار ناوبری (دسکتاپ: سمت چپ/راست | موبایل: پایین صفحه کاملاً باز) ─── */}
      <aside className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center w-full h-20 p-2 md:static md:h-full md:w-auto md:p-6">
        <div className={`flex flex-row md:flex-col items-center justify-around md:justify-center gap-2 md:gap-3 w-full h-full md:h-auto py-2 px-3 md:py-6 md:px-3 rounded-xl md:rounded-2xl border transition-all duration-300 shadow-xl
          ${isDark 
            ? 'bg-slate-950/80 md:bg-slate-950/40 backdrop-blur-xl border-slate-800/80 shadow-cyan-950/10' 
            : 'bg-white/95 md:bg-white/80 backdrop-blur-xl border-slate-200 shadow-slate-200/50'}`}
        >
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button 
                key={item.id} 
                onClick={() => setCurrentTab(item.id)} 
                className={`relative group p-3 rounded-xl transition-all flex flex-col md:flex-row items-center gap-1
                  ${isActive 
                    ? (item.isSpecial ? 'bg-purple-600 text-white shadow-purple-600/30' : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white') 
                    : (isDark ? 'text-slate-400 hover:text-cyan-400 hover:bg-slate-900/80' : 'text-slate-500 hover:text-blue-600 hover:bg-slate-100')
                  }`}
              >
                <Icon size={20} />
                {/* متن کوچک زیر آیکون فقط برای نسخه موبایل */}
                <span className="text-[10px] md:hidden font-medium">{item.label}</span>
                {/* تولتیپ شناور برای نسخه دسکتاپ */}
                <span className={`absolute whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium px-2 py-1 rounded-md shadow-md pointer-events-none hidden md:inline-block ${isDark ? 'bg-slate-900 text-slate-200 border border-slate-800' : 'bg-slate-800 text-white'} ${lang === 'fa' ? 'right-full mr-3' : 'left-full ml-3'}`}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* ─── ۲. بخش محتوایی اصلی شامل هدر کنترلی اختصاصی ─── */}
      <div className="flex flex-col flex-1 h-full pb-20 overflow-hidden md:pb-0">
        
        {/* هدر کنترل تم و زبان (بدون هیچ تداخلی با کادر اصلی) */}
        <header className="flex items-center justify-end w-full max-w-5xl gap-4 px-4 pt-6 mx-auto md:px-12">
          <button 
            onClick={() => setLang(lang === 'fa' ? 'en' : 'fa')} 
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${isDark ? 'bg-slate-900/60 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10' : 'bg-white border-slate-300 text-slate-700'}`}
          >
            <Languages size={16} /> 
            <span>{t.common.langName}</span>
          </button>
          
          <button 
            onClick={() => setIsDark(!isDark)} 
            className={`p-2 rounded-lg border transition-all ${isDark ? 'bg-slate-900/60 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10' : 'bg-white border-slate-300 text-slate-700'}`}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </header>

        {/* چوکات و کادر اصلی رندر کامپوننت‌ها */}
        <main className="flex flex-col justify-center flex-1 p-4 overflow-hidden md:p-12">
          <div className={`w-full max-w-5xl mx-auto h-full rounded-2xl p-6 md:p-8 border transition-all duration-300 overflow-y-auto custom-scrollbar 
            ${isDark ? 'bg-slate-950/20 backdrop-blur-md border-slate-800/40' : 'bg-white/40 backdrop-blur-md border-slate-200/60'}`}
          >
            {renderContent()}
          </div>
        </main>
      </div>

    </div>
  );
}
