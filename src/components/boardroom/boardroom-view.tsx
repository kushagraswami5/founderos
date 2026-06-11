"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { DepartmentAdvice, DepartmentType } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  AlertCircle, 
  TrendingUp, 
  Lightbulb, 
  CheckCircle2, 
  ChevronRight,
  ShieldAlert,
  Target,
  BarChart3,
  Cpu,
  Palette,
  Users
} from "lucide-react";

const deptConfig: Record<string, { icon: any, color: string, glow: string }> = {
  MARKETING: { icon: Target, color: "text-accent-orange", glow: "glow-orange" },
  SALES: { icon: BarChart3, color: "text-accent-blue", glow: "glow-blue" },
  PRODUCT: { icon: Lightbulb, color: "text-accent-yellow", glow: "glow-yellow" },
  UX: { icon: Palette, color: "text-accent-red", glow: "glow-red" },
  DEVELOPMENT: { icon: Cpu, color: "text-accent-green", glow: "glow-green" },
  FINANCE: { icon: BarChart3, color: "text-accent-blue", glow: "glow-blue" },
  CEO: { icon: ShieldAlert, color: "text-white", glow: "glow-ceo" },
};

export function BoardroomView({ 
  reportId, 
  initialAdvice 
}: { 
  reportId: string, 
  initialAdvice: DepartmentAdvice[] 
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [advice, setAdvice] = useState<DepartmentAdvice[]>(initialAdvice);

  useEffect(() => {
    if (advice.length > 0) {
      const ctx = gsap.context(() => {
        gsap.fromTo(".dept-card", 
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            clearProps: "all"
          }
        );
      }, containerRef);
      return () => ctx.revert();
    }
  }, [advice]);

  if (advice.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-white/5 border-t-white rounded-full animate-spin" />
          <Users className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" size={32} />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-display">Meeting in Progress</h2>
          <p className="text-charcoal max-w-sm">
            Your executive board is analyzing your weekly performance. 
            This usually takes 15-30 seconds.
          </p>
        </div>
      </div>
    );
  }

  const ceoAdvice = advice.find(a => a.department === "CEO");
  const deptAdvice = advice.filter(a => a.department !== "CEO");

  return (
    <div ref={containerRef} className="space-y-12 pb-20">
      {/* CEO Summary Section */}
      {ceoAdvice && (
        <section className="dept-card relative overflow-hidden rounded-xl border border-hairline-strong bg-surface-elevated p-1">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          <div className="relative z-10 p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white text-black rounded-lg">
                <ShieldAlert size={24} />
              </div>
              <div>
                <h2 className="text-3xl font-display tracking-tight">Executive Summary</h2>
                <p className="text-charcoal">Lead CEO Advisor</p>
              </div>
            </div>
            
            <p className="text-xl leading-relaxed font-favorit">
              {ceoAdvice.assessment}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-hairline">
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-accent-red flex items-center gap-2">
                  <AlertCircle size={14} /> The Bottleneck
                </h3>
                <ul className="space-y-2">
                  {ceoAdvice.problems.map((p, i) => (
                    <li key={i} className="text-ink flex gap-3">
                      <ChevronRight size={18} className="text-charcoal shrink-0 mt-1" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-accent-green flex items-center gap-2">
                  <CheckCircle2 size={14} /> 7-Day Execution Plan
                </h3>
                <ul className="space-y-2">
                  {ceoAdvice.recommendations.map((r, i) => (
                    <li key={i} className="text-ink flex gap-3">
                      <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Department Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {deptAdvice.map((item) => {
          const config = deptConfig[item.department];
          const Icon = config.icon;
          
          return (
            <Card key={item.id} className="dept-card bg-surface-card border-hairline hover:border-hairline-strong transition-all relative overflow-hidden group">
              <div className={`absolute top-0 left-0 w-full h-32 opacity-20 pointer-events-none ${config.glow}`} />
              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <div className={`flex items-center gap-2 ${config.color}`}>
                    <Icon size={18} />
                    <span className="text-xs font-bold uppercase tracking-widest">{item.department}</span>
                  </div>
                  <Badge variant={item.priority === "CRITICAL" ? "destructive" : "outline"} className="text-[10px]">
                    {item.priority}
                  </Badge>
                </div>
                <CardTitle className="text-lg font-medium leading-snug">
                  {item.assessment}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 space-y-6">
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-charcoal">Recommendations</h4>
                  <ul className="space-y-2">
                    {item.recommendations.slice(0, 3).map((rec, i) => (
                      <li key={i} className="text-sm text-ink flex gap-2">
                        <TrendingUp size={14} className="text-accent-blue shrink-0 mt-0.5" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
