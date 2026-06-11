"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ShieldAlert, Users, Zap, Database, TrendingUp, ArrowRight, Menu, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
// ... existing GSAP logic ...

      // Hero reveal - using fromTo with clearProps for reliability
      gsap.fromTo(".hero-title", 
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          delay: 0.2,
          clearProps: "all"
        }
      );

      gsap.fromTo(".hero-sub", 
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.8,
          clearProps: "all"
        }
      );

      gsap.fromTo(".hero-cta", 
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          delay: 1,
          clearProps: "all"
        }
      );

      // Scroll reveal for features
      gsap.fromTo(".feature-card", 
        { y: 60, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".features-grid",
            start: "top 80%",
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          clearProps: "all"
        }
      );

      // Boardroom preview animation - Sequential reveal of elements
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".boardroom-section",
          start: "top 60%",
        }
      });

      tl.fromTo(".boardroom-preview", 
        { scale: 0.98, opacity: 0.8 },
        { scale: 1, opacity: 1, duration: 1, ease: "expo.out" }
      )
      .fromTo(".preview-status", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, "-=0.5")
      .fromTo(".preview-marketing", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5 }, "-=0.2")
      .fromTo(".preview-sales", { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.5 }, "-=0.3")
      .fromTo(".preview-product", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
      .fromTo(".preview-ceo", { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }, "-=0.2");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-canvas text-ink overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-hairline bg-canvas/80 backdrop-blur-md transition-all">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
              <span className="text-black font-bold text-xs">F</span>
            </div>
            <span className="font-display text-lg tracking-tight">FounderOS</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm text-charcoal">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#boardroom" className="hover:text-white transition-colors">The Boardroom</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              <Link href="/dashboard" className="text-sm text-charcoal hover:text-white transition-colors">Sign In</Link>
              <Link href="/dashboard" className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-200 transition-all">
                Get Started
              </Link>
            </div>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-charcoal hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-16 bg-canvas z-40 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="p-6 flex flex-col gap-6">
              <nav className="flex flex-col gap-4">
                <a href="#features" className="text-xl font-medium" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
                <a href="#boardroom" className="text-xl font-medium" onClick={() => setIsMobileMenuOpen(false)}>The Boardroom</a>
                <a href="#pricing" className="text-xl font-medium" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
              </nav>
              <hr className="border-hairline" />
              <div className="flex flex-col gap-4">
                <Link href="/dashboard" className="text-lg text-charcoal" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
                <Link href="/dashboard" className="bg-white text-black h-12 rounded-lg flex items-center justify-center font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-60 md:pb-40 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] md:h-[800px] glow-orange pointer-events-none opacity-30 md:opacity-40" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 md:space-y-8">
          <div className="hero-cta inline-flex items-center gap-2 px-3 py-1 rounded-full border border-hairline-strong bg-white/5 text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-accent-orange">
            <Zap size={12} /> Version 1.0 Now Live
          </div>
          
          <h1 className="hero-title text-5xl md:text-9xl font-display tracking-tight leading-[0.95] text-balance">
            Your AI <br /> <span className="text-ink/40 italic">Boardroom.</span>
          </h1>
          
          <p className="hero-sub text-lg md:text-3xl text-charcoal max-w-3xl mx-auto font-favorit leading-relaxed">
            Stop building in the dark. Meet your new executive board: 7 AI specialists 
            with persistent memory and lethal strategic focus.
          </p>

          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center pt-6 md:pt-8">
            <Link href="/dashboard" className="bg-white text-black h-12 md:h-14 px-8 md:px-10 rounded-lg flex items-center justify-center text-base md:text-lg font-medium hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95">
              Enter the Boardroom
            </Link>
            <button className="border border-hairline-strong h-12 md:h-14 px-8 md:px-10 rounded-lg flex items-center justify-center text-base md:text-lg font-medium hover:bg-white/5 transition-all">
              Watch Execution Loop
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6 border-t border-hairline">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-sm font-bold tracking-widest text-accent-blue uppercase mb-4">Core Architecture</h2>
            <h3 className="text-4xl md:text-5xl font-display tracking-tight">Built for Lethal Execution.</h3>
          </div>

          <div className="features-grid grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<Database />}
              title="Persistent Memory"
              description="FounderOS remembers every goal, pivot, and bottleneck. Your board's advice evolves as your startup grows."
            />
            <FeatureCard 
              icon={<Users />}
              title="7 Specialized VPs"
              description="Marketing, Sales, Product, UX, Engineering, and Finance. Each department gives rigorous, data-driven feedback."
            />
            <FeatureCard 
              icon={<TrendingUp />}
              title="Weekly Executive Reviews"
              description="Submit your report, trigger the meeting, and receive a high-leverage 7-day execution plan every single week."
            />
          </div>
        </div>
      </section>

      {/* Boardroom Section */}
      <section id="boardroom" className="boardroom-section py-40 px-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full glow-blue pointer-events-none opacity-20" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-hairline-strong bg-white/5 text-[10px] font-bold tracking-widest uppercase text-accent-blue">
              <ShieldAlert size={12} /> The Experience
            </div>
            <h2 className="text-5xl md:text-7xl font-display tracking-tight leading-tight">
              A Private Board <br /> in Your Pocket.
            </h2>
            <p className="text-xl text-charcoal leading-relaxed font-favorit">
              Experience a simulated executive meeting where your VPs debate your 
              strategy. Receive a ruthless CEO summary that cuts through the noise.
            </p>
            <ul className="space-y-4 pt-4">
              <li className="flex items-center gap-3 text-ink">
                <div className="w-6 h-6 rounded-full bg-accent-blue/20 flex items-center justify-center">
                  <ArrowRight size={14} className="text-accent-blue" />
                </div>
                Sequential Department reveals
              </li>
              <li className="flex items-center gap-3 text-ink">
                <div className="w-6 h-6 rounded-full bg-accent-blue/20 flex items-center justify-center">
                  <ArrowRight size={14} className="text-accent-blue" />
                </div>
                High-leverage action items
              </li>
              <li className="flex items-center gap-3 text-ink">
                <div className="w-6 h-6 rounded-full bg-accent-blue/20 flex items-center justify-center">
                  <ArrowRight size={14} className="text-accent-blue" />
                </div>
                Priority-coded bottlenecks
              </li>
            </ul>
          </div>

          <div className="boardroom-preview relative aspect-square md:aspect-video lg:aspect-square bg-zinc-900/90 border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(59,130,246,0.12)]">
             <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/5 pointer-events-none" />
             
             <div className="relative h-full p-8 flex flex-col">
                {/* Status Bar */}
                <div className="preview-status flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                    <span className="text-[10px] font-bold tracking-widest uppercase text-ink/60">Board Meeting Active</span>
                  </div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-accent-green">● Live</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {/* Marketing */}
                  <div className="preview-marketing p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-bold text-accent-red uppercase tracking-widest">Marketing</span>
                      <span className="text-[8px] bg-accent-red/20 text-accent-red px-1.5 py-0.5 rounded uppercase font-bold">Critical</span>
                    </div>
                    <p className="text-[11px] font-medium leading-tight">No founder visibility.</p>
                    <p className="text-[10px] text-charcoal">Publish LinkedIn content.</p>
                  </div>

                  {/* Sales */}
                  <div className="preview-sales p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-bold text-accent-orange uppercase tracking-widest">Sales</span>
                      <span className="text-[8px] bg-accent-orange/20 text-accent-orange px-1.5 py-0.5 rounded uppercase font-bold">High</span>
                    </div>
                    <p className="text-[11px] font-medium leading-tight">No outreach activity.</p>
                    <p className="text-[10px] text-charcoal">Send 20 founder DMs.</p>
                  </div>
                </div>

                {/* Product */}
                <div className="preview-product p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold text-accent-blue uppercase tracking-widest">Product</span>
                    <span className="text-[8px] bg-accent-blue/20 text-accent-blue px-1.5 py-0.5 rounded uppercase font-bold">Medium</span>
                  </div>
                  <p className="text-[11px] font-medium">FounderOS MVP progressing.</p>
                  <p className="text-[10px] text-charcoal">Focus on boardroom reliability.</p>
                </div>

                {/* CEO Summary */}
                <div className="preview-ceo mt-auto p-6 rounded-xl bg-ink text-canvas space-y-4">
                  <div className="flex items-center gap-2">
                    <ShieldAlert size={16} />
                    <span className="text-xs font-bold uppercase tracking-widest">CEO Summary</span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-canvas/40 block mb-1">Biggest Bottleneck</span>
                      <p className="text-xs font-medium">Distribution</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-canvas/40 block mb-1">Highest Leverage Action</span>
                      <p className="text-xs font-medium">Founder outreach and content.</p>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-hairline">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
              <span className="text-black font-bold text-xs">F</span>
            </div>
            <span className="font-display text-lg tracking-tight">FounderOS</span>
          </div>
          <p className="text-charcoal text-sm">
            © 2026 FounderOS. Built for the next generation of solo founders.
          </p>
          <div className="flex gap-8 text-sm text-charcoal">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: any) {
  return (
    <div className="feature-card p-8 rounded-2xl border border-hairline bg-surface-card hover:border-hairline-strong transition-all group">
      <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-accent-blue">
        {icon}
      </div>
      <h4 className="text-xl font-medium mb-4">{title}</h4>
      <p className="text-charcoal leading-relaxed">
        {description}
      </p>
    </div>
  );
}
