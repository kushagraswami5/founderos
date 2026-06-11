import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, Plus, Calendar, ArrowRight } from "lucide-react";

export default async function ProjectsPage() {
  const user = await currentUser();
  if (!user) return null;

  const dbUser = await db.user.findUnique({
    where: { clerkId: user.id },
  });

  const projects = dbUser ? await db.project.findMany({
    where: { userId: dbUser.id },
    include: {
      _count: {
        select: { reports: true }
      }
    },
    orderBy: { createdAt: "desc" }
  }) : [];

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-display tracking-tight mb-2">My Projects</h1>
          <p className="text-charcoal text-lg">Manage your ventures and board configurations.</p>
        </div>
        <Link href="/projects/new">
          <Button className="gap-2">
            <Plus size={18} />
            New Project
          </Button>
        </Link>
      </header>

      {projects.length === 0 ? (
        <div className="bg-surface-card border border-hairline rounded-lg p-20 flex flex-col items-center justify-center text-center space-y-6">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center">
            <Rocket size={40} className="text-charcoal" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-medium">Initialize Your First Venture</h2>
            <p className="text-charcoal max-w-sm mx-auto">
              Your AI board is waiting. Create a project to start the executive cycle.
            </p>
          </div>
          <Link href="/projects/new">
            <Button size="lg" className="px-8">Get Started</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="group hover:border-hairline-strong transition-all overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold tracking-widest text-accent-blue uppercase">
                    {project.stage}
                  </span>
                  <span className="text-xs text-charcoal flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <CardTitle className="font-display group-hover:text-accent-blue transition-colors">
                  {project.name}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {project.goal}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between pt-4 border-t border-hairline">
                  <div className="text-sm">
                    <span className="text-ink font-bold">{project._count.reports}</span>
                    <span className="text-charcoal ml-1">Reports</span>
                  </div>
                  <Link 
                    href={`/reports?projectId=${project.id}`}
                    className="text-sm font-medium flex items-center gap-1 text-ink hover:gap-2 transition-all"
                  >
                    Submit Report <ArrowRight size={14} />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
