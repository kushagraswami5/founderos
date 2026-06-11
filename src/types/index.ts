import { DepartmentType, PriorityLevel } from "@prisma/client";

export interface ProjectWithStats {
  id: string;
  name: string;
  goal: string;
  niche: string;
  stage: string;
  reportCount: number;
  lastReportDate: Date | null;
}

export interface BoardroomState {
  isGenerating: boolean;
  currentDepartment: DepartmentType | null;
  completedDepartments: DepartmentType[];
  reports: Record<DepartmentType, DepartmentAnalysis | null>;
}

export interface DepartmentAnalysis {
  assessment: string;
  problems: string[];
  opportunities: string[];
  recommendations: string[];
  priority: PriorityLevel;
}

export interface CEOSummary {
  executiveSummary: string;
  bottleneck: string;
  leverageAction: string;
  sevenDayPlan: string[];
  metrics: string[];
}
