import { User, BookOpen, BarChart2, Briefcase, Award, Mail, LayoutDashboard } from 'lucide-react';

export const getMenuItems = (lang) => [
  { id: 'hero', label: lang === 'fa' ? 'خانه' : 'Home', icon: User },
  { id: 'about', label: lang === 'fa' ? 'درباره من' : 'About', icon: BookOpen },
  { id: 'skills', label: lang === 'fa' ? 'مهارت‌ها' : 'Skills', icon: BarChart2 },
  { id: 'projects', label: lang === 'fa' ? 'پروژه‌ها' : 'Projects', icon: Briefcase },
  { id: 'certificates', label: lang === 'fa' ? 'گواهینامه‌ها' : 'Certificates', icon: Award },
  { id: 'contact', label: lang === 'fa' ? 'تماس' : 'Contact', icon: Mail },
  // { id: 'dashboard', label: lang === 'fa' ? 'داشبورد' : 'Dashboard', icon: LayoutDashboard, isSpecial: true },
];
