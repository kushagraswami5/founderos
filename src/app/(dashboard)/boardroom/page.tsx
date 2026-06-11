import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, ArrowRight, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function BoardroomIndexPage() {
  const user = await currentUser();
  if (!user) return null;

  const dbUser = await db.user.findUnique({
    where: { clerkId: user.id },
  });

  const reports = dbUser ? await db.weeklyReport.findMany({
    where: { project: { userId: dbUser.id } },
    include: {
      project: true,
      advice: {
        where: { department: "CEO" },
        take: 1
      }
    },
    orderBy: { createdAt: "desc" }
  }) : [];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl md:text-4xl font-display tracking-tight mb-2">The Boardroom</h1>
        <p className="text-charcoal text-base md:text-lg">Access your historical executive sessions and strategic archives.</p>
      </header>

      {reports.length === 0 ? (
        <div className="bg-surface-card border border-hairline rounded-lg p-20 flex flex-col items-center justify-center text-center space-y-6">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center">
            <Users size={40} className="text-charcoal" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-medium">No Sessions Convened</h2>
            <p className="text-charcoal max-w-sm mx-auto">
              Submit your first weekly report to trigger an executive board meeting.
            </p>
          </div>
          <Link href="/reports">
            <button className="bg-white text-black px-6 py-2 rounded-md font-medium text-sm hover:bg-surface-light transition-colors">
              Submit Report
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {reports.map((report) => (
            <Link key={report.id} href={`/boardroom/${report.id}`}>
              <Card className="group hover:border-hairline-strong transition-all overflow-hidden bg-surface-card">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-64 bg-white/5 p-6 flex flex-col justify-center border-b md:border-b-0 md:border-r border-hairline">
                    <div className="text-xs font-bold uppercase tracking-widest text-accent-blue mb-1">
                      {report.project.name}
                    </div>
                    <div className="text-2xl font-display mb-4">Week {report.weekNumber}</div>
                    <div className="flex items-center gap-2 text-charcoal text-xs">
                      <Calendar size={14} />
                      {new Date(report.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex-1 p-6 relative">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white">
                        <ShieldAlert size={16} />
                        CEO Assessment
                      </div>
                      <p className="text-charcoal line-clamp-2 text-sm italic">
                        {report.advice[0]?.assessment || "Analysis pending..."}
                      </p>
                    </div>
                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight size={20} className="text-white" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
