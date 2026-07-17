import { Calendar, FolderGit2, Award } from 'lucide-react';

export default function About({ lang, t, isDark }) {
  const fontClass = lang === 'fa' ? 'font-["IranYekan"]' : 'font-["Montserrat"]';

  const stats = [
    { number: t.about.stat1Number, title: t.about.stat1Title, icon: Calendar, color: 'from-cyan-500 to-blue-500' },
    { number: t.about.stat2Number, title: t.about.stat2Title, icon: FolderGit2, color: 'from-purple-500 to-pink-500' },
    { number: t.about.stat3Number, title: t.about.stat3Title, icon: Award, color: 'from-emerald-500 to-teal-500' },
  ];

  return (
    <div className={`h-full flex flex-col justify-center overflow-auto py-2 md:py-4 ${fontClass}`}>
      
      {/* عنوان اصلی صفحه */}
      <h2 className="text-2xl md:text-3xl font-black mb-6 md:mb-8 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent w-fit">
        {t.about.title}
      </h2>

      {/* چیدمان دو ستونه بهینه شده */}
      <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-center">
        
        {/* ستون متن بیوگرافی (فضای بیشتر برای جلوگیری از اسکرول) */}
        <div className="md:col-span-7 flex flex-col justify-center">
          <h3 className={`text-lg md:text-xl font-bold mb-3 transition-colors ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
            {t.about.storyTitle}
          </h3>
          <p className={`text-xs md:text-sm leading-relaxed text-justify transition-colors ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {t.about.storyParagraph}
          </p>
        </div>

        {/* ستون کارت‌های آمار عمودی منظم */}
        <div className="md:col-span-5 flex flex-col gap-4 ">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index}
                className={`p-4 md:p-5 rounded-xl border transition-all duration-300 flex items-center gap-4 md:gap-5 group relative overflow-hidden
                  ${isDark 
                    ? 'bg-slate-950/40 border-slate-800/80 hover:border-cyan-500/50 shadow-md shadow-cyan-950/5' 
                    : 'bg-white border-slate-200 hover:border-blue-500/50 shadow-sm'
                  }`}
              >
                {isDark && <div className={`absolute top-0 bottom-0 ${lang === 'fa' ? 'right-0' : 'left-0'} w-[3px] bg-gradient-to-b ${stat.color}`}></div>}

                <div className={`p-2.5 md:p-3 rounded-lg border transition-colors
                  ${isDark ? 'bg-slate-900 border-slate-800 text-cyan-400 group-hover:text-purple-400' : 'bg-slate-50 border-slate-200 text-blue-600'}`}>
                  <Icon size={18} />
                </div>

                <div>
                  <div className={`text-xl md:text-2xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent font-["Montserrat"]`}>
                    {stat.number}
                  </div>
                  <div className={`text-[11px] md:text-xs mt-0.5 font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {stat.title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
