import { BrainCircuitIcon } from "lucide-react";

const footerLinks = {
  Product: ["Features", "Templates", "Pricing", "Changelog"],
  Resources: ["Docs", "Blog", "Examples", "Community"],
  Company: ["About", "Privacy", "Terms", "Contact"],
};

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 px-10 pt-8 pb-6">
      <div className="flex flex-wrap items-start justify-between gap-8 mb-8">

        {/* Brand */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center">
              <BrainCircuitIcon size={15} className="text-black" />
            </div>
            <span className="text-sm font-medium text-white">CrafticWeb.Ai</span>
          </div>
          <p className="text-xs text-zinc-500 max-w-45 leading-relaxed">
            Build beautiful websites with AI — no code needed.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-12">
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group} className="flex flex-col gap-2.5">
              <span className="text-[11px] font-medium uppercase
               tracking-wider text-zinc-400">
                {group}
              </span>
              {links.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-[13px] text-zinc-500 hover:text-white transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-wrap items-center
       justify-between gap-3 pt-6 border-t border-zinc-800">
        <span className="text-xs text-zinc-600">
          © 2025 CrafticWeb.Ai. All rights reserved.
        </span>
        <div className="flex gap-2">
          {[
            { label: "X", href: "#" },
            { label: "GitHub", href: "#" },
            { label: "Discord", href: "#" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="w-8 h-8 rounded-md border border-zinc-800 
              flex items-center justify-center text-xs text-zinc-500 hover:text-white hover:border-zinc-600 transition-colors"
            >
              {label[0]}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}