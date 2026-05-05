import React from 'react';
import { Play, Star, Info, CheckCircle } from 'lucide-react';

const SiteDemoPage = () => {
  const reviews = [
    { name: "Alex Rivera", role: "UI Designer", text: "The most intuitive builder I've used this year. Game changer.", rating: 5 },
    { name: "Sarah Chen", role: "Freelancer", text: "Clean code output and amazing dark aesthetics. Highly recommend!", rating: 5 },
    { name: "James Watt", role: "Startup Founder", text: "Saved us weeks of development time. The AI suggestions are spot on.", rating: 5 },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30">
      
      <section className="relative pt-20 pb-32 px-6 flex flex-col items-center overflow-hidden">
        <div className="absolute top-0 w-full h-[500px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />
        
        <div className="text-center max-w-3xl mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
            Experience the Future
          </h1>
          <p className="text-zinc-400 text-lg">
            No sign-up required. Watch how easy it is to transform your ideas into reality.
          </p>
        </div>

        <div className="relative group max-w-5xl w-full aspect-video rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden shadow-2xl shadow-blue-500/5">
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all cursor-pointer">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-xl group-hover:scale-110 transition-transform">
              <Play fill="currentColor" size={32} />
            </div>
          </div>
          <video 

            className="w-full h-full object-cover opacity-60"
            poster="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
          />
        </div>
      </section>

      <section className="py-24 bg-zinc-950">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-sm text-zinc-400 mb-6">
              <Info size={16} />
              <span>About the Platform</span>
            </div>
            <h2 className="text-4xl font-bold mb-6">Crafting web experiences with precision.</h2>
            <p className="text-zinc-400 leading-relaxed mb-8">
              We built this tool for developers who value speed without sacrificing quality. 
              Our platform handles the heavy lifting of layout and state management so you 
              can focus on what makes your product unique.
            </p>
            <ul className="space-y-4">
              {['No-auth preview mode', 'Real-time synchronization', 'Clean React output'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-zinc-300">
                  <CheckCircle size={18} className="text-blue-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-40 rounded-2xl bg-zinc-900 border border-zinc-800 p-6 flex flex-col justify-end">
              <span className="text-3xl font-bold italic">99%</span>
              <span className="text-zinc-500 text-sm">Efficiency</span>
            </div>
            <div className="h-40 mt-8 rounded-2xl bg-blue-600 p-6 flex flex-col justify-end">
              <span className="text-3xl font-bold italic">24/7</span>
              <span className="text-blue-100 text-sm">Reliability</span>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Loved by Developers</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <div key={i} className="p-8 rounded-2xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm">
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-zinc-300 italic mb-6 text-sm">"{review.text}"</p>
                <div>
                  <p className="font-bold">{review.name}</p>
                  <p className="text-zinc-500 text-xs">{review.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Call to Action */}
      <footer className="py-20 border-t border-zinc-900 text-center">
        <p className="text-zinc-500 mb-6">Ready to start building?</p>
        <button className="px-8 py-3 rounded-full bg-white text-black font-bold hover:bg-zinc-200 transition-colors">
          Join the Beta
        </button>
      </footer>
    </div>
  );
};

export default SiteDemoPage;