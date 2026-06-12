"use server";

import { db } from "@/lib/db";
import { analyzeFullBoardroom } from "@/lib/ai/boardroom";
import { DepartmentType, PriorityLevel } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function runBoardroomMeeting(reportId: string) {
  const report = await db.weeklyReport.findUnique({
    where: { id: reportId },
    include: { 
      project: true,
      advice: true
    },
  });

  if (!report) throw new Error("Report not found");
  if (report.advice.length > 0) return report.advice;

  const projectContext = `
    Name: ${report.project.name}
    Goal: ${report.project.goal}
    Niche: ${report.project.niche}
    Constraints: ${report.project.constraints || "None"}
  `;

  // Fetch previous reports for history
  const previousReports = await db.weeklyReport.findMany({
    where: { 
      projectId: report.projectId,
      createdAt: { lt: report.createdAt }
    },
    orderBy: { createdAt: "desc" },
    take: 3
  });

  const history = previousReports.length > 0 
    ? previousReports.map(r => `Week ${r.weekNumber}: ${r.content}`).join("\n\n")
    : "No previous history.";

  // Single AI request for all departments
  const fullAnalysis = await analyzeFullBoardroom(projectContext, report.content, history);
  
  const adviceResults = [];
  const departments: DepartmentType[] = [
    "MARKETING",
    "SALES",
    "PRODUCT",
    "UX",
    "DEVELOPMENT",
    "FINANCE",
    "CEO"
  ];

  // Process and save results
  for (const dept of departments) {
    const analysis = fullAnalysis[dept];
    
    if (analysis) {
      const savedAdvice = await db.departmentAdvice.create({
        data: {
          reportId: report.id,
          department: dept,
          assessment: analysis.assessment,
          problems: analysis.problems || [],
          opportunities: analysis.opportunities || [],
          recommendations: analysis.recommendations || [],
          priority: (analysis.priority as PriorityLevel) || "MEDIUM",
        },
      });
      adviceResults.push(savedAdvice);
    }
  }

  revalidatePath(`/boardroom/${reportId}`);
  return adviceResults;
}

export async function deleteDepartmentAdvice(adviceId: string, reportId: string) {
  await db.departmentAdvice.delete({
    where: { id: adviceId }
  });

  revalidatePath(`/boardroom/${reportId}`);
}
