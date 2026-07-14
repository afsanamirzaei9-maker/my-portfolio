import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, Languages } from 'lucide-react';
import { getMenuItems } from './sidbarData'

export default function PortfolioLayout({ isDark, setIsDark, lang, setLang, t }) {
  const navigate = useNavigate();
  const location = useLocation();
  const menuItems = getMenuItems(lang);

  // تشخیص روت فعال برای استایل دادن به دکمه‌های سایدبار
  const currentPath = location.pathname === '/' ? 'hero' : location.pathname.replace('/', '');

  return (
    <div 
      dir={lang === 'fa' ? 'rtl' : 'ltr'} 
      className={`h-screen w-screen overflow-hidden transition-colors duration-300 flex flex-col md:flex-row font-sans antialiased
        ${isDark 
          ? 'bg-[#0b0f19] text-slate-100 bg-gradient-to-br from-[#0b0f19] via-[#111827] to-[#070a12]' 
          : 'bg-slate-50 text-slate-800 bg-gradient-to-br from-slate-50 via-slate-100 to-zinc-200'
        }`}
    >
      
      {/* ─── سایدبار عمومی (موبایل: پایین صفحه | دسکتاپ: کنار صفحه) ─── */}
      <aside className="fixed bottom-0 left-0 right-0 md:static h-20 md:h-full w-full md:w-auto flex items-center justify-center p-2 md:p-6 z-50">
        <div className={`flex flex-row md:flex-col items-center justify-around md:justify-center gap-2 md:gap-3 w-full h-full md:h-auto py-2 px-3 md:py-6 md:px-3 rounded-xl md:rounded-2xl border transition-all duration-300 shadow-xl
          ${isDark 
            ? 'bg-slate-950/80 md:bg-slate-950/40 backdrop-blur-xl border-slate-800/80 shadow-cyan-950/10' 
            : 'bg-white/95 md:bg-white/80 backdrop-blur-xl border-slate-200 shadow-slate-200/50'}`}
        >
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.id;
            
            // تعیین روت مقصد بر اساس تب انتخاب شده
            const targetRoute = item.id === 'hero' ? '/' : `/${item.id}`;

            return (
              <button 
                key={item.id} 
                onClick={() => navigate(targetRoute)} 
                className={`relative group p-3 rounded-xl transition-all flex flex-col md:flex-row items-center gap-1
                  ${isActive 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg' 
                    : (isDark ? 'text-slate-400 hover:text-cyan-400 hover:bg-slate-900/80' : 'text-slate-500 hover:text-blue-600 hover:bg-slate-100')
                  }`}
              >
                <Icon size={20} />
                <span className="text-[10px] md:hidden font-medium">{item.label}</span>
                <span className={`absolute whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium px-2 py-1 rounded-md shadow-md pointer-events-none hidden md:inline-block ${isDark ? 'bg-slate-900 text-slate-200 border border-slate-800' : 'bg-slate-800 text-white'} ${lang === 'fa' ? 'right-full mr-3' : 'left-full ml-3'}`}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* ─── بخش محتوای اصلی و هدر کنترلی ─── */}
      <div className="flex-1 h-full flex flex-col overflow-hidden pb-20 md:pb-0">
        
        {/* هدر کنترل زبان و تم بدون تداخل با بدنه اصلی */}
        <header className="w-full max-w-5xl mx-auto px-4 md:px-12 pt-6 flex justify-end items-center gap-4">
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

        {/* کادر رندر صفحات داخلی پورتفولیو */}
        <main className="flex-1 overflow-hidden p-4 md:p-12 flex flex-col justify-center">
          <div className={`w-full max-w-5xl mx-auto h-full rounded-2xl p-6 md:p-8 border transition-all duration-300 overflow-y-auto custom-scrollbar 
            ${isDark ? 'bg-slate-950/20 backdrop-blur-md border-slate-800/40' : 'bg-white/40 backdrop-blur-md border-slate-200/60'}`}
          >
            {/* خروجی کامپوننت‌های روتینگ این‌جا رندر می‌شود */}
            <Outlet />
          </div>
        </main>
      </div>

    </div>
  );
}
