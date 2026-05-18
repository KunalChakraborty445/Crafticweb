import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../App';

const plans = [
  {
    name: "free",
    price: 0,
    description: "For hobbyists and side projects.",
    features: ["100 credits", "Up to 3 projects", "Community support"],
    buttonText: "Get started",
    highlight: false,
    accent: "from-zinc-500/10 to-transparent",
    glow: "",
  },
  {
    name: "Premium",
    price: 499,
    description: "For power users who need more.",
    features: ["500 credits", "Unlimited projects", "Priority support", "Custom domains"],
    buttonText: "Go Pro",
    highlight: true,
    accent: "from-blue-500/20 to-transparent",
    glow: "shadow-[0_0_60px_rgba(59,130,246,0.15)]",
  },
  {
    name: "Enterprise",
    price: 1499,
    description: "For teams that need everything.",
    features: ["2000 credits", "Unlimited projects", "24/7 support", "Full API access"],
    buttonText: "Contact sales",
    highlight: false,
    accent: "from-violet-500/10 to-transparent",
    glow: "",
  },
];

const PricingPage = () => {
  const navigate = useNavigate();
  const { userData } = useSelector(state => state.user);
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const [loading, setLoading] = useState(null); 

  const handleBuy = async (planName) => { 
    if (!userData) {
      navigate("/");
      return;
    }
    if (planName === "free") {
      navigate("/dashboard");
      return;
    }
    setLoading(planName);
    try {
      const result = await axios.post(
        `${serverUrl}/api/v1/billing`,
        { planType: planName },
        { withCredentials: true }
      );
      window.location.href = result.data.sessionUrl; // FIX 3: = assignment, not () call
    } catch (error) {
      console.error("Error purchasing plan:", error);
      setLoading(null);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="relative min-h-screen bg-[#050505] text-white px-6 py-14 flex flex-col items-center overflow-hidden"
      >

        {/* Background blobs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.2 }}
          className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.3 }}
          className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none"
        />

        {/* Close button */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-5xl flex justify-end mb-10 relative z-10"
        >
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-lg text-zinc-600 hover:text-white hover:bg-white/5 transition"
          >
            <X size={18} />
          </button>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative z-10 text-center mb-12"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.3em" }}
            animate={{ opacity: 1, letterSpacing: "0.2em" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[11px] tracking-[.2em] uppercase text-zinc-600 mb-3"
          >
            Pricing
          </motion.p>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-transparent">
            Simple plans.<br />No surprises.
          </h1>
          <p className="text-zinc-600 text-sm">Pay once a month. Use as you build.</p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-5xl relative z-10">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              onHoverStart={() => setHoveredPlan(plan.name)}
              onHoverEnd={() => setHoveredPlan(null)}
              className={`relative flex flex-col p-6 rounded-2xl border transition-colors duration-300 overflow-hidden cursor-default ${
                plan.highlight
                  ? `bg-[#080e1f] border-blue-500/40 ${plan.glow}`
                  : 'bg-white/[0.03] border-white/[0.08] hover:border-white/15'
              }`}
            >
              {/* card inner glow */}
              <div className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${plan.accent} pointer-events-none`} />

              {/* Popular badge */}
              <AnimatePresence>
                {plan.highlight && (
                  <motion.span
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -top-1 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full z-10"
                  >
                    POPULAR
                  </motion.span>
                )}
              </AnimatePresence>

              <div className="relative z-10">
                <p className={`text-[11px] font-semibold uppercase tracking-[.15em] mb-4 ${
                  plan.highlight ? 'text-blue-400' : plan.name === 'Enterprise' ? 'text-violet-400' : 'text-zinc-600'
                }`}>
                  {plan.name}
                </p>

                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-5xl font-bold tracking-tight">
                    ₹{plan.price.toLocaleString()}
                  </span>
                  <span className="text-zinc-600 text-sm">/mo</span>
                </div>

                <p className="text-zinc-600 text-xs mt-2 mb-6 leading-relaxed">{plan.description}</p>

                <div className="h-px bg-white/[0.06] mb-5" />

                <ul className="flex flex-col gap-3 flex-1 mb-7">
                  {plan.features.map((f, i) => (
                    <motion.li
                      key={f}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 + i * 0.05 }}
                      className="flex items-center gap-2.5 text-xs text-zinc-400"
                    >
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                        plan.highlight ? 'bg-blue-500/15 text-blue-400' :
                        plan.name === 'Enterprise' ? 'bg-violet-500/15 text-violet-400' :
                        'bg-white/5 text-zinc-500'
                      }`}>
                        <Check size={10} strokeWidth={3} />
                      </span>
                      {f}
                    </motion.li>
                  ))}
                </ul>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  disabled={loading === plan.name}
                  onClick={() => handleBuy(plan.name)} // FIX 4: plan.name instead of plan.key
                  whileHover={{ scale: 1.02 }}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-colors ${
                    plan.highlight
                      ? 'bg-blue-600 hover:bg-blue-500 text-white'
                      : plan.name === 'Enterprise'
                      ? 'bg-violet-500/10 hover:bg-violet-500/20 text-violet-400 border border-violet-500/20'
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                  }`}
                >
                  {loading == plan.name? "Processing..." : plan.buttonText}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PricingPage;