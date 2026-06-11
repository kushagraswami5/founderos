"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { LayoutDashboard, Rocket, FileText, Settings, Users, Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-canvas text-ink">
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 w-full z-30 border-b border-hairline bg-canvas/80 backdrop-blur-md px-6 h-16 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2" onClick={() => setIsSidebarOpen(false)}>
          <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
            <span className="text-black font-bold text-xl">F</span>
          </div>
        </Link>
        <button 
          onClick={toggleSidebar}
          className="p-2 text-charcoal hover:text-white transition-colors"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "w-64 border-r border-hairline flex flex-col fixed h-full bg-canvas z-50 transition-transform duration-300 md:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 hidden md:block">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
              <span className="text-black font-bold text-xl">F</span>
            </div>
            <span className="font-display text-xl tracking-tight">FounderOS</span>
          </Link>
        </div>

        <div className="p-6 md:hidden border-b border-hairline mb-4">
           <span className="font-display text-xl tracking-tight">FounderOS</span>
        </div>

        <nav className="flex-1 px-4 space-y-2 py-4">
          <NavItem 
            href="/dashboard" 
            icon={<LayoutDashboard size={18} />} 
            label="Overview" 
            active={pathname === "/dashboard"}
            onClick={() => setIsSidebarOpen(false)}
          />
          <NavItem 
            href="/projects" 
            icon={<Rocket size={18} />} 
            label="Projects" 
            active={pathname.startsWith("/projects")}
            onClick={() => setIsSidebarOpen(false)}
          />
          <NavItem 
            href="/boardroom" 
            icon={<Users size={18} />} 
            label="Boardroom" 
            active={pathname.startsWith("/boardroom")}
            onClick={() => setIsSidebarOpen(false)}
          />
          <NavItem 
            href="/reports" 
            icon={<FileText size={18} />} 
            label="Reports" 
            active={pathname.startsWith("/reports")}
            onClick={() => setIsSidebarOpen(false)}
          />
        </nav>

        <div className="p-4 border-t border-hairline flex items-center justify-between mt-auto">
          <div className="flex items-center gap-3">
            <UserButton afterSignOutUrl="/" />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-ink">Founder</span>
              <span className="text-xs text-charcoal">Pro Plan</span>
            </div>
          </div>
          <Link 
            href="/settings" 
            className="text-charcoal hover:text-white transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <Settings size={18} />
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-6 md:p-8 min-h-screen relative pt-24 md:pt-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
        
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-accent-blue-glow blur-[80px] md:blur-[120px] rounded-full -mr-32 md:-mr-64 -mt-32 md:-mt-64 opacity-10 md:opacity-20 pointer-events-none" />
      </main>
    </div>
  );
}

function NavItem({ 
  href, 
  icon, 
  label, 
  active,
  onClick
}: { 
  href: string; 
  icon: React.ReactNode; 
  label: string; 
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link 
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-all group",
        active 
          ? "bg-white/10 text-white" 
          : "text-charcoal hover:text-white hover:bg-white/5"
      )}
    >
      <span className={cn(
        "group-hover:scale-110 transition-transform",
        active && "scale-110 text-white"
      )}>{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}
