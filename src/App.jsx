import About from './pages/About'; 
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { translations } from './locales/translations';

// ایمپورت پوسته اصلی پورتفولیو و صفحات
import PortfolioLayout from './components/PortfolioLayout';
import Hero from './pages/Hero';

// کامپوننت‌های فرضی برای مراحل بعدی (جهت جلوگیری از ارور رندر روت‌ها)
const PlaceholderPage = ({ title }) => (
  <div className="h-full flex items-center justify-center text-slate-400 font-['IranYekan']">
    بخش {title} در قدم‌های بعدی کدنویسی خواهد شد.
  </div>
);

// کامپوننت فرضی لاگین و داشبورد برای تست روت
const LoginPage = ({ onLogin }) => (
  <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-950 text-white font-['IranYekan']">
    <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md text-center">
      <h2 className="text-2xl font-bold mb-6 text-cyan-400">ورود به مدیریت پورتفولیو</h2>
      <input type="password" placeholder="رمز عبور" className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl mb-4 text-center text-white" />
      <button onClick={onLogin} className="w-full py-3 bg-cyan-600 rounded-xl font-bold">ورود امن</button>
    </div>
  </div>
);

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang] = useState('fa');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const t = translations[lang];

  return (
    <Routes>
      {/* ─── روت‌های پورتفولیو عمومی ─── */}
      <Route path="/" element={<PortfolioLayout isDark={isDark} setIsDark={setIsDark} lang={lang} setLang={setLang} t={t} />}>
        <Route index element={<Hero lang={lang} t={t} isDark={isDark} />} />
        <Route path="about" element={<About lang={lang} t={t} isDark={isDark} />} />
        <Route path="skills" element={<PlaceholderPage title={lang === 'fa' ? 'مهارت‌ها' : 'Skills'} />} />
        <Route path="projects" element={<PlaceholderPage title={lang === 'fa' ? 'پروژه‌ها' : 'Projects'} />} />
        <Route path="certificates" element={<PlaceholderPage title={lang === 'fa' ? 'گواهینامه‌ها' : 'Certificates'} />} />
        <Route path="contact" element={<PlaceholderPage title={lang === 'fa' ? 'تماس' : 'Contact'} />} />
      </Route>

      {/* ─── روت مدیریت و لاگین ─── */}
      <Route 
        path="/dashboard" 
        element={
          isAuthenticated ? (
            <div className="p-8 text-white font-['IranYekan']">به داشبورد خوش آمدید! (در قدم‌های بعد طراحی می‌شود)</div>
          ) : (
            <LoginPage onLogin={() => setIsAuthenticated(true)} />
          )
        } 
      />

      {/* هدایت روت‌های اشتباه به صفحه اصلی */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
