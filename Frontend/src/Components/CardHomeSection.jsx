import React from "react";
import { motion } from "motion/react";
const CardHomeSection = () => {
  const highLights = [
    "AI Generated Code",
    "Fully Responsive Layouts",
    "Production Ready Output",
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 pb-32">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {highLights.map((h, i) => (
          <motion.div
           key={i}
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           className="rounded-2xl bg-white/5 border border-white/10 p-8"
           >
            <h1 className="text-xl font-semibold mb-3">{h}</h1>
            <p className="text-sm text-zinc-400">
              CrafticWeb.ai builds real websites - clean code, animations,
              responsiveness and scalable stucture.
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CardHomeSection;
