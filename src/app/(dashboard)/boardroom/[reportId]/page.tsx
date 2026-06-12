import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { BoardroomMeeting } from "@/components/boardroom/boardroom-meeting";
import { Calendar, Rocket } from "lucide-react";
import { DeleteReviewButton } from "@/components/boardroom/delete-review-button";

export default async function BoardroomReportPage({
  params,
}: {
  params: Promise<{ reportId: string }>;
}) {
  const { reportId } = await params;

  const report = await db.weeklyReport.findUnique({
    where: { id: reportId },
    include: {
      project: true,
      advice: true,
    },
  });

  if (!report) {
    notFound();
  }

  return (
    <div className="space-y-12 py-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-hairline pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-accent-blue font-bold tracking-widest text-[10px] uppercase">
            <Rocket size={14} />
            {report.project.name}
          </div>
          <h1 className="text-3xl md:text-5xl font-display tracking-tight">Boardroom Review</h1>
          <p className="text-charcoal text-base md:text-lg max-w-2xl">
            The executive board has convened to analyze your progress for Week {report.weekNumber}.
          </p>
        </div>
        <div className="flex items-center gap-3 self-start md:self-end">
          <div className="flex items-center gap-2 text-charcoal bg-white/5 px-4 py-2 rounded-full text-xs md:text-sm">
            <Calendar size={16} />
            {new Date(report.createdAt).toLocaleDateString("en-US", { 
              month: "long", 
              day: "numeric", 
              year: "numeric" 
            })}
          </div>
          <DeleteReviewButton 
            reportId={reportId} 
            variant="outline" 
            size="default" 
            className="rounded-full h-10 px-4"
          />
        </div>
      </header>

      <BoardroomMeeting reportId={reportId} existingAdvice={report.advice} />
    </div>
  );
}
