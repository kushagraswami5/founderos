"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const reportSchema = z.object({
  projectId: z.string().min(1, "Project is required"),
  content: z.string().min(20, "Report content must be at least 20 characters"),
  weekNumber: z.coerce.number().int().min(1),
});

export async function submitWeeklyReport(values: z.infer<typeof reportSchema>) {
  const user = await currentUser();
  
  if (!user) {
    throw new Error("Unauthorized");
  }

  const dbUser = await db.user.findUnique({
    where: { clerkId: user.id },
  });

  if (!dbUser) {
    throw new Error("User not found in database");
  }

  // Verify project ownership
  const project = await db.project.findUnique({
    where: { id: values.projectId, userId: dbUser.id },
  });

  if (!project) {
    throw new Error("Project not found or unauthorized");
  }

  const report = await db.weeklyReport.create({
    data: {
      projectId: values.projectId,
      content: values.content,
      weekNumber: values.weekNumber,
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/reports");
  revalidatePath(`/projects/${values.projectId}`);

  return report;
}

export async function getProjects() {
  const user = await currentUser();
  if (!user) return [];

  const dbUser = await db.user.findUnique({
    where: { clerkId: user.id },
  });

  if (!dbUser) return [];

  return db.project.findMany({
    where: { userId: dbUser.id },
    select: { id: true, name: true },
    orderBy: { createdAt: "desc" },
  });
}
