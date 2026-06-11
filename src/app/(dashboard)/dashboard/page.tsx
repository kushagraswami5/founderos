import { db } from "@/lib/db";
import { currentUser, auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, TrendingUp, Users, Calendar, ArrowRight } from "lucide-react";

export default async function DashboardPage() {
  const { userId: clerkId } = await auth();
  const user = await currentUser();
  
  if (!clerkId) return null;

  // Sync/Find user
  const dbUser = await db.user.findUnique({
    where: { clerkId },
  });

  const userId = dbUser?.id;

  // Fetch real stats if user exists
  const statsData = userId ? {
    projects: await db.project.count({ where: { userId } }),
    reports: await db.weeklyReport.count({ where: { project: { userId } } }),
    insights: await db.departmentAdvice.count({ where: { report: { project: { userId } } } }),
  } : { projects: 0, reports: 0, insights: 0 };

  const recentProjects = userId ? await db.project.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 3,
  }) : [];

  const latestMemory = userId ? await db.departmentAdvice.findFirst({
    where: { 
      report: { project: { userId } },
      department: "CEO"
    },
    orderBy: { createdAt: "desc" },
  }) : null;

  const stats = [
    { label: "Active Projects", value: statsData.projects.toString(), icon: <Rocket size={20} className="text-accent-blue" /> },
    { label: "Reports Submitted", value: statsData.reports.toString(), icon: <Calendar size={20} className="text-accent-orange" /> },
    { label: "AI Insights", value: statsData.insights.toString(), icon: <TrendingUp size={20} className="text-accent-green" /> },
    { label: "Board Members", value: "7", icon: <Users size={20} className="text-accent-yellow" /> },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl md:text-4xl font-display tracking-tight mb-2">Welcome, {user?.firstName || "Founder"}</h1>
        <p className="text-charcoal text-base md:text-lg">Here's the status of your venture capital board.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="bg-surface-card border-hairline hover:border-hairline-strong transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-charcoal">{stat.label}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-medium flex items-center gap-2">
            Recent Projects
          </h2>
          
          {recentProjects.length > 0 ? (
            <div className="grid gap-4">
              {recentProjects.map((project) => (
                <Link key={project.id} href={`/projects`}>
                  <Card className="bg-surface-card border-hairline hover:border-hairline-strong transition-all">
                    <CardContent className="p-6 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
                          <Rocket size={20} className="text-charcoal" />
                        </div>
                        <div>
                          <h3 className="font-medium">{project.name}</h3>
                          <p className="text-xs text-charcoal">{project.stage}</p>
                        </div>
                      </div>
                      <ArrowRight size={18} className="text-charcoal" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-surface-card border border-hairline rounded-lg p-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center">
                <Rocket size={32} className="text-charcoal" />
              </div>
              <div>
                <h3 className="text-lg font-medium">No projects yet</h3>
                <p className="text-charcoal text-sm max-w-xs mx-auto">
                  Create your first project to start receiving weekly executive reviews.
                </p>
              </div>
              <Link 
                href="/projects/new"
                className="bg-white text-black px-6 py-2 rounded-md font-medium text-sm hover:bg-surface-light transition-colors"
              >
                Create Project
              </Link>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-medium">Executive Memory</h2>
          <div className="bg-surface-card border border-hairline rounded-lg p-6 space-y-4">
            {latestMemory ? (
              <>
                <p className="text-sm text-ink leading-relaxed font-favorit italic">
                  "{latestMemory.assessment.slice(0, 150)}..."
                </p>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-accent-blue w-full" />
                </div>
                <Link href="/boardroom" className="text-xs text-accent-blue hover:underline block">
                  View full boardroom analysis
                </Link>
              </>
            ) : (
              <>
                <p className="text-sm text-charcoal italic leading-relaxed">
                  "Your board hasn't analyzed any reports yet. Memory will populate here as you submit weekly updates."
                </p>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-accent-blue w-0" />
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
