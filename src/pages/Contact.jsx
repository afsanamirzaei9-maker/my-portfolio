import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Network, Camera, MessageSquare, GitBranch, Copy, Check } from 'lucide-react';

export default function Contact({ lang, t, isDark }) {
  const fontClass = lang === 'fa' ? 'font-["IranYekan"]' : 'font-["Montserrat"]';
  const [copiedId, setCopiedId] = useState(null);

  const contactData = [
    { id: "email", name: t.contact.email, value: "afsanamirzaei9@gmail.com", icon: Mail, color: "#a855f7", isCopy: true },
    { id: "phone", name: t.contact.phone, value: "+93766923552", icon: Phone, color: "#06b6d4", isCopy: true },
    { id: "linkedin", name: t.contact.linkedin, value: "https://www.linkedin.com/in/afsana-mirzaei-764bb33a7?trk=contact-info", icon: Network, color: "#3b82f6", isLink: true },
    { id: "whatsapp", name: t.contact.whatsapp, value: "https://wa.me/qr/JGU4QJARRK5EO1", icon: MessageSquare, color: "#10b981", isLink: true },
    { id: "instagram", name: t.contact.instagram, value: "https://instagram.com/bj172119", icon: Camera, color: "#ec4899", isLink: true },
    { id: "github", name: t.contact.github, value: "https://github.com/afsanamirzaei9-maker", icon: GitBranch, color: "#94a3b8", isLink: true }
  ];

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div dir="ltr" className={`h-full flex flex-col justify-between py-1 text-left select-none ${fontClass}`}>
      
      <div className={lang === 'fa' ? 'text-right' : 'text-left'}>
        <h2 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent w-fit">
          {t.contact.title}
        </h2>
        <p className="text-base text-slate-500 mt-1 font-bold">{t.contact.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 flex-1 my-5 overflow-y-auto max-h-[52vh] md:max-h-[56vh] pr-1 custom-scrollbar items-center">
        {contactData.map((item, index) => {
          const Icon = item.icon;
          const isCopied = copiedId === item.id;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06, duration: 0.35 }}
              className={`p-3.5 rounded-xl border flex items-center justify-between gap-4 relative overflow-hidden transition-all duration-300 min-h-[75px] w-full
                ${isDark 
                  ? 'bg-slate-950/40 border-slate-900 hover:border-slate-800 shadow-md' 
                  : 'bg-white border-slate-200 shadow-sm hover:bg-slate-50/50'
                }`}
            >
              <div className="flex items-center gap-3.5 overflow-hidden">
                <div className="p-2.5 rounded-xl border shrink-0 transition-transform duration-300" style={{ backgroundColor: isDark ? '#0b0f19' : '#f8fafc', color: item.color, borderColor: isDark ? '#1e293b' : '#e2e8f0' }}>
                  <Icon size={18} />
                </div>

                <div className="flex flex-col text-left overflow-hidden">
                  <span className={`text-sm font-black ${isDark ? 'text-slate-200' : 'text-slate-950'}`}>
                    {item.name}
                  </span>
                  {!item.isLink && (
                    <span className="text-xs text-slate-500 font-mono truncate mt-0.5 max-w-[160px] sm:max-w-[200px]">
                      {item.value}
                    </span>
                  )}
                </div>
              </div>

              {item.isLink ? (
                <a 
                  href={item.value} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center shrink-0 text-xs font-black bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-xl shadow-md transition-opacity hover:opacity-90"
                >
                  OPEN
                </a>
              ) : (
                <button 
                  onClick={() => handleCopy(item.value, item.id)}
                  className="p-2 rounded-lg border flex items-center justify-center shrink-0 transition-all"
                  style={{ 
                    borderColor: isCopied ? '#10b981' : (isDark ? '#1e293b' : '#e2e8f0'),
                    color: isCopied ? '#10b981' : (isDark ? '#94a3b8' : '#64748b'),
                    backgroundColor: isCopied ? 'rgba(16,185,129,0.05)' : 'transparent'
                  }}
                  title={t.contact.clickToCopy}
                >
                  {isCopied ? <Check size={14} /> : <Copy size={14} />}
                </button>
              )}
            </motion.div>
          );
        })}
      </div>

    </div>
  );
}
