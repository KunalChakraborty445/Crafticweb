import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

const PricingPage = () => {
  const plans = [
    {
      name: "Starter",
      price: "0",
      description: "Perfect for hobbyists and individuals.",
      features: ["Basic Analytics", "Up to 3 Projects", "Community Support"],
      buttonText: "Get Started",
      highlight: false,
    },
    {
      name: "Premium",
      price: "19.99",
      description: "Advanced tools for power users.",
      features: ["Advanced Analytics", "Unlimited Projects", "Priority Support", "Custom Domains"],
      buttonText: "Go Pro",
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "49.99",
      description: "Tailored solutions for large teams.",
      features: ["Enterprise Analytics", "Unlimited Projects", "24/7 Support", "API Access"],
      buttonText: "Contact Sales",
      highlight: false,
    },
  ];

  const [closeTab, setCloseTab] = useState(false);
  return (


<div className="min-h-screen bg-black text-white py-20 px-6 flex flex-col items-center">
      {/* Header */}
        <X onClick={() => setCloseTab(true)} size={24} className="text-zinc-500 mx-auto mb-4 cursor-pointer flex justify-end" />
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-gray-100 to-zinc-500 bg-clip-text text-transparent">
          Simple, Transparent Pricing
        </h1>
        <p className="text-zinc-400 text-lg">Choose the plan that works best for you.</p>
      </div>

      {/* Pricing Cards - Updated to 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full">
        {plans.map((plan, index) => (
          <div 
            key={index}
            className={`relative flex flex-col p-8 rounded-2xl border transition-all duration-300 hover:scale-[1.02] ${
              plan.highlight 
                ? "border-blue-500 bg-zinc-900/40 shadow-[0_0_20px_rgba(59,130,246,0.1)]" 
                : "border-zinc-800 bg-zinc-950 hover:border-zinc-700"
            }`}
          >
            {plan.highlight && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                Most Popular
              </span>
            )}
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-zinc-500 text-sm">/month</span>
              </div>
              <p className="text-zinc-400 mt-4 text-sm leading-relaxed">{plan.description}</p>
            </div>

            <ul className="space-y-4 mb-10 flex-grow">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                  <Check size={16} className="text-blue-500 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <button className={`w-full py-3 rounded-xl font-bold text-sm transition-all active:scale-95 ${
              plan.highlight 
                ? "bg-blue-600 hover:bg-blue-700 text-white" 
                : "bg-white hover:bg-zinc-200 text-black"
            }`}>
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;