export const getProjectsStructure = (t) => [
  // ۱. دسته‌بندی پروژه‌های مدیریت‌شده (managed)
  { 
    id: "btb", 
    title: t.projects.btb_title, 
    desc: t.projects.btb_desc, 
    role: t.projects.btb_role, 
    category: "managed", 
    tech: ["HTML5", "CSS3", "JS"], 
    github: "https://github.com/BTB-Team/BTB-Website.git", 
    demo: "https://btb-team.github.io/BTB-Website/",
    image: "projects/02.jpg" // 👈 نمونه آدرس عکس در پوشه public/projects/
  },
  { 
    id: "astronomy", 
    title: t.projects.astronomy_title, 
    desc: t.projects.astronomy_desc, 
    role: t.projects.astronomy_role, 
    category: "managed", 
    tech: ["React", "Tailwind 4", "Vite 6"], 
    github: "https://github.com/BTB-Team/Astronomy.git", 
    demo: "https://btb-team.github.io/Astronomy/", 
    image: "/projects/astronomy.png" // 👈 نمونه آدرس عکس
  },
  { 
    id: "delaram", 
    title: t.projects.delaram_title, 
    desc: t.projects.delaram_desc, 
    role: t.projects.delaram_role, 
    category: "managed", 
    tech: ["HTML5", "CSS3", "JavaScript"], 
    github: "https://github.com/BTB-Team/Delaram-Foundation-.git", 
    demo: null,
    image: null 
  },
  { 
    id: "dorna", 
    title: t.projects.dorna_title, 
    desc: t.projects.dorna_desc, 
    role: t.projects.dorna_role, 
    category: "managed", 
    tech: ["React", "Tailwind 3", "Vite 5"], 
    github: "https://github.com/BTB-Team/Dorna-React.git", 
    demo: null,
    image: null 
  },
  { 
    id: "banfes blog", 
    title: t.projects.banfes_title, 
    desc: t.projects.banfes_desc, 
    role: t.projects.banfes_role, 
    category: "managed", 
    tech: ["Architecture", "Docs"], 
    github: null, 
    demo: "https://banfes.blog",
    image: null 
  },
  
  // ۲. دسته‌بندی پروژه‌های اختصاصی (exclusive)
  { 
    id: "luxura", 
    title: t.projects.luxura_title, 
    desc: t.projects.luxura_desc, 
    role: t.projects.luxura_role, 
    category: "exclusive", 
    tech: ["HTML5", "CSS3", "JavaScript"], 
    github: "https://github.com/BTB-Team/OnlineShope.git", 
    demo: null,
    image: null 
  },
  { 
    id: "arifi", 
    title: t.projects.arifi_title, 
    desc: t.projects.arifi_desc, 
    role: t.projects.arifi_role, 
    category: "exclusive", 
    tech: ["HTML5", "CSS3", "JS", "AOS"], 
    github:"https://github.com/afsanamirzaei9-maker/AliArifi.git",  
    demo: "https://afsanamirzaei9-maker.github.io/AliArifi/",
    image: null 
  },
  
  // ۳. دسته‌بندی پروژه‌های تمرینی (practice)
  { 
    id: "clock", 
    title: t.projects.clock_title, 
    desc: t.projects.clock_desc, 
    role: t.projects.clock_role, 
    category: "practice", 
    tech: ["HTML5", "CSS3", "JS"], 
    github: "https://github.com/afsanamirzaei9-maker/ClockProject.git", 
    demo: "https://digital-clock2025-9-3.netlify.app/",
    image: null 
  },
  { 
    id: "quran", 
    title: t.projects.quran_title, 
    desc: t.projects.quran_desc, 
    role: t.projects.quran_role, 
    category: "practice", 
    tech: ["HTML5", "Bootstrap", "JS"], 
    github: null, 
    demo: "https://tarteeluidesign.netlify.app/",
    image: null 
  },
  { 
    id: "menu", 
    title: t.projects.menu_title, 
    desc: t.projects.menu_desc, 
    role: t.projects.menu_role, 
    category: "practice", 
    tech: ["HTML5", "TailwindCss", "Git & GitHub"], 
    github: "https://github.com/afsanamirzaei9-maker/Digital-Menu.git", 
    demo: "https://afsanamirzaei9-maker.github.io/Digital-Menu/",
    image: null 
  },
  { 
    id: "ama", 
    title: t.projects.ama_title, 
    desc: t.projects.ama_desc, 
    role: t.projects.ama_role, 
    category: "practice", 
    tech: ["HTML5", "CSS3", "JavaScript"], 
    github: null, 
    demo: "https://amaupdate.netlify.app/",
    image: null 
  },
  { 
    id: "edu", 
    title: t.projects.edu_title, 
    desc: t.projects.edu_desc, 
    role: t.projects.edu_role, 
    category: "practice", 
    tech: ["HTML5", "Bootstrap", "JS"], 
    github: null, 
    demo: "https://btbt-landing-page.netlify.app/",
    image: null 
  },
  { 
    id: "team", 
    title: t.projects.team_title, 
    desc: t.projects.team_desc, 
    role: t.projects.team_role, 
    category: "practice", 
    tech: ["HTML5", "Bootstrap", "JS"], 
    github: null, 
    demo: "https://uni-bootstrap-project.netlify.app/",
    image: null 
  },
  { 
    id: "Eid", 
    title: t.projects.eid_title, 
    desc: t.projects.eid_desc, 
    role: t.projects.eid_role, 
    category: "practice", 
    tech: ["FormSpree", "JS"], 
    github: "https://github.com/afsanamirzaei9-maker/Uni-Eid-Message.git", 
    demo: "https://afsanamirzaei9-maker.github.io/Uni-Eid-Message/",
    image: null 
  }
];
