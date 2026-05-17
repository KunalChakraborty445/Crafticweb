import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  "No-auth preview mode",
  "Real-time synchronization",
  "Clean React output",
];

const cards = [
  { label: "Components shipped", value: "2,400+", accent: false },
  { label: "Avg. build time",    value: "3 days",  accent: true  },
  { label: "Integrations",       value: "60+",     accent: false },
  { label: "Uptime",             value: "99.98%",  accent: false },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0 },
};

export default function AboutSection() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center bg-[#08080c] px-6 py-28 overflow-hidden">

      <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none">
        <defs>
          <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div className="absolute -left-48 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/[0.07] blur-[80px] pointer-events-none" />
      <div className="absolute -right-24 bottom-1/4 w-96 h-96 rounded-full bg-blue-500/[0.05] blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto w-full grid md:grid-cols-2 gap-20 items-center">

        <motion.div
          className="grid grid-cols-2 gap-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.1 }}
        >
          {cards.map((card, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={[
                "rounded-2xl p-6 cursor-default",
                i % 2 === 1 ? "mt-6" : "",
                card.accent
                  ? "bg-gradient-to-br from-violet-500/10 to-blue-500/10 border border-gradient-to-br from-blue-500/30 to-yellow-300/10"
                  : "bg-white/[0.03] border border-white/[0.06]",
              ].join(" ")}
            >
              <p
                className={`text-4xl tracking-tight leading-none mb-2 ${card.accent ? "text-blue-400" : "text-white"}`}
                style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
              >
                {card.value}
              </p>
              <p className="text-[11px] uppercase tracking-widest text-white/35">
                {card.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
        >
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.4 }}
            className="text-[11px] uppercase tracking-[0.14em] text-blue-500 mb-5"
          >
            About the Platform
          </motion.p>

          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl md:text-5xl font-normal leading-[1.15] tracking-tight text-white mb-6"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Precision tooling for teams that ship.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-base leading-[1.8] text-white/40 mb-9"
          >
            We built this for developers who value speed without sacrificing quality.
            Our platform handles layout, state management, and integration so you can
            focus on what makes your product unique.
          </motion.p>

          <motion.ul
            className="flex flex-col gap-3.5"
            transition={{ staggerChildren: 0.1 }}
          >
            {features.map((item, i) => (
              <motion.li
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-3 text-white/65 text-[15px]"
              >
                <CheckCircle size={16} className="text-yellow-500 shrink-0" />
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

      </div>
    </section>
  );
}