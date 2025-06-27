"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Book,
  DollarSign,
  PlayCircle,
  User,
  FileText,
  Languages,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * ================================
 *  Landing Page – Unitec Associates
 *  - Split into reusable components
 *  - Framer Motion animations
 *  - Simple i18n (PT / EN)
 *  - Fully responsive with Tailwind
 * ================================
 */

/* -------------------------------------------------------------------------- */
/*                               Translations                                 */
/* -------------------------------------------------------------------------- */

const translations = {
  pt: {
    nav: {
      how: "Como Funciona",
      courses: "Cursos",
      ebooks: "Ebooks",
      mentorships: "Mentorias",
      withdraw: "Saque",
      login: "Entrar",
    },
    hero: {
      title: "Transforme seu conhecimento em renda com a Unitec",
      subtitle:
        "Crie conteúdos, venda cursos e ebooks, ofereça mentorias e saque seus ganhos diretamente na plataforma.",
      cta: "Quero me tornar um associado",
    },
    steps: {
      title: "Como Funciona",
      items: [
        "Criar conteúdos",
        "Curso",
        "Ebook",
        "Mentoria",
        "Saque",
      ],
    },
    courses: {
      title: "Cursos e Ebooks",
      course: "Curso",
      ebook: "Ebook",
      priceCourse: "R$ 150,00",
      priceEbook: "R$ 20,00",
      seeMore: "Ver mais",
    },
    mentorships: {
      title: "Mentorias",
      text:
        "Realize videochamadas e agende aulas individualmente com seus seguidores. Uma forma prática e rentável de compartilhar conhecimento.",
    },
    withdraw: {
      title: "Ganhos e Saque",
      text:
        "Acompanhe seus ganhos em tempo real e saque via M-Pesa, conta bancária ou outros métodos integrados. Simples, seguro e rápido.",
    },
    footer: {
      rights: "Todos os direitos reservados.",
    },
  },
  en: {
    nav: {
      how: "How It Works",
      courses: "Courses",
      ebooks: "Ebooks",
      mentorships: "Mentorships",
      withdraw: "Withdraw",
      login: "Login",
    },
    hero: {
      title: "Turn your knowledge into income with Unitec",
      subtitle:
        "Create content, sell courses and ebooks, offer mentorships, and withdraw your earnings directly on the platform.",
      cta: "Become an associate",
    },
    steps: {
      title: "How It Works",
      items: [
        "Create content",
        "Course",
        "Ebook",
        "Mentorship",
        "Withdraw",
      ],
    },
    courses: {
      title: "Courses & Ebooks",
      course: "Course",
      ebook: "Ebook",
      priceCourse: "$30.00",
      priceEbook: "$5.00",
      seeMore: "See more",
    },
    mentorships: {
      title: "Mentorships",
      text:
        "Host video calls and schedule one‑on‑one lessons with your audience. A practical and profitable way to share knowledge.",
    },
    withdraw: {
      title: "Earnings & Withdrawals",
      text:
        "Track your earnings in real time and cash out via M‑Pesa, bank transfer or other integrated methods. Simple, secure and fast.",
    },
    footer: {
      rights: "All rights reserved.",
    },
  },
} as const;

type Lang = keyof typeof translations;

/* -------------------------------------------------------------------------- */
/*                                  Header                                    */
/* -------------------------------------------------------------------------- */

function Header({ t, lang, setLang }: { t: any; lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <header className="flex justify-between items-center p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold">Unitec</h1>
      <nav className="space-x-6 hidden md:flex text-sm">
        <a href="#como-funciona" className="hover:underline">
          {t.nav.how}
        </a>
        <a href="#cursos" className="hover:underline">
          {t.nav.courses}
        </a>
        <a href="#ebooks" className="hover:underline">
          {t.nav.ebooks}
        </a>
        <a href="#mentorias" className="hover:underline">
          {t.nav.mentorships}
        </a>
        <a href="#saque" className="hover:underline">
          {t.nav.withdraw}
        </a>
      </nav>
      <div className="flex items-center gap-4">
        <Button variant="outline" className="text-white border-white hidden sm:inline-flex">
          {t.nav.login}
        </Button>
        <button
          onClick={() => setLang(lang === "pt" ? "en" : "pt")}
          className="flex items-center gap-1 text-white hover:opacity-80"
          aria-label="Toggle language"
        >
          <Languages size={20} /> {lang.toUpperCase()}
        </button>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Sections                                  */
/* -------------------------------------------------------------------------- */

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

function HeroSection({ t }: { t: any }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      variants={fadeIn}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center py-24 px-6"
    >
      <h2 className="text-4xl md:text-5xl font-extrabold mb-4 max-w-4xl mx-auto">
        {t.hero.title}
      </h2>
      <p className="text-lg max-w-3xl mx-auto mb-6 text-blue-100">
        {t.hero.subtitle}
      </p>
      <Button className="bg-white text-blue-700 font-semibold hover:bg-blue-200">
        {t.hero.cta}
      </Button>
    </motion.section>
  );
}

function StepsSection({ t, lang }: { t: any; lang: Lang }) {
  const icons = [FileText, PlayCircle, Book, User, DollarSign];
  return (
    <motion.section
      id="como-funciona"
      initial="hidden"
      whileInView="visible"
      variants={fadeIn}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white text-blue-900 py-20 px-6"
    >
      <h3 className="text-3xl font-bold text-center mb-10">{t.steps.title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-center max-w-6xl mx-auto">
        {t.steps.items.map((step: string, i: number) => {
          const Icon = icons[i];
          return (
            <div key={step} className="flex flex-col items-center">
              <Icon size={36} className="text-blue-600 mb-2" />
              <p>{step}</p>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}

function CoursesSection({ t }: { t: any }) {
  return (
    <motion.section
      id="cursos"
      initial="hidden"
      whileInView="visible"
      variants={fadeIn}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-blue-50 text-blue-900 py-20 px-6"
    >
      <h3 className="text-3xl font-bold text-center mb-10">{t.courses.title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Course Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold">{t.courses.course}</h4>
            <span className="text-yellow-500">★★★★★</span>
          </div>
          <p className="text-lg font-semibold">{t.courses.priceCourse}</p>
          <Button className="mt-4 w-full">{t.courses.seeMore}</Button>
        </div>
        {/* Ebook Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold">{t.courses.ebook}</h4>
            <span className="text-yellow-500">★★★★☆</span>
          </div>
          <p className="text-lg font-semibold">{t.courses.priceEbook}</p>
          <Button className="mt-4 w-full">{t.courses.seeMore}</Button>
        </div>
      </div>
    </motion.section>
  );
}

function MentoriasSection({ t }: { t: any }) {
  return (
    <motion.section
      id="mentorias"
      initial="hidden"
      whileInView="visible"
      variants={fadeIn}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white text-blue-900 py-20 px-6"
    >
      <h3 className="text-3xl font-bold text-center mb-10">{t.mentorships.title}</h3>
      <p className="text-center max-w-2xl mx-auto">{t.mentorships.text}</p>
    </motion.section>
  );
}

function SaqueSection({ t }: { t: any }) {
  return (
    <motion.section
      id="saque"
      initial="hidden"
      whileInView="visible"
      variants={fadeIn}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-blue-100 text-blue-900 py-20 px-6"
    >
      <h3 className="text-3xl font-bold text-center mb-10">{t.withdraw.title}</h3>
      <p className="text-center max-w-2xl mx-auto">{t.withdraw.text}</p>
    </motion.section>
  );
}

function Footer({ t }: { t: any }) {
  return (
    <footer className="bg-blue-900 text-white text-xs sm:text-sm py-6 px-6 text-center">
      <p>
        &copy; {new Date().getFullYear()} Unitec – {t.footer.rights}
      </p>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*                            Root Page Component                             */
/* -------------------------------------------------------------------------- */

export default function UnitecLandingPage() {
  const [lang, setLang] = useState<Lang>("pt");
  const t = translations[lang];

  return (
    <div className="bg-gradient-to-br from-blue-900 to-blue-500 text-white min-h-screen scroll-smooth">
      <Header t={t} lang={lang} setLang={setLang} />
      <HeroSection t={t} />
      <StepsSection t={t} lang={lang} />
      <CoursesSection t={t} />
      <MentoriasSection t={t} />
      <SaqueSection t={t} />
      <Footer t={t} />
    </div>
  );
}
