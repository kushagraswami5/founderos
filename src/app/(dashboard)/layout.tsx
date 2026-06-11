import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { LayoutDashboard, Rocket, FileText, Settings, Users } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-canvas text-ink">
      {/* Sidebar */}
      <aside className="w-64 border-r border-hairline flex flex-col fixed h-full bg-canvas z-20">
        <div className="p-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
              <span className="text-black font-bold text-xl">F</span>
            </div>
            <span className="font-display text-xl tracking-tight">FounderOS</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2 py-4">
          <NavItem href="/dashboard" icon={<LayoutDashboard size={18} />} label="Overview" />
          <NavItem href="/projects" icon={<Rocket size={18} />} label="Projects" />
          <NavItem href="/boardroom" icon={<Users size={18} />} label="Boardroom" />
          <NavItem href="/reports" icon={<FileText size={18} />} label="Reports" />
        </nav>

        <div className="p-4 border-t border-hairline flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserButton afterSignOutUrl="/" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">Founder</span>
              <span className="text-xs text-charcoal">Pro Plan</span>
            </div>
          </div>
          <Link href="/settings" className="text-charcoal hover:text-white transition-colors">
            <Settings size={18} />
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 min-h-screen relative">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
        
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-blue-glow blur-[120px] rounded-full -mr-64 -mt-64 opacity-20 pointer-events-none" />
      </main>
    </div>
  );
}

function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link 
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-md text-charcoal hover:text-white hover:bg-white/5 transition-all group"
    >
      <span className="group-hover:scale-110 transition-transform">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}
