"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const projectSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  goal: z.string().min(10, "Goal must be at least 10 characters"),
  niche: z.string().min(2, "Niche is required"),
  constraints: z.string().optional(),
});

export async function createProject(values: z.infer<typeof projectSchema>) {
  const user = await currentUser();
  
  if (!user) {
    throw new Error("Unauthorized");
  }

  // Ensure user exists in our DB
  let dbUser = await db.user.findUnique({
    where: { clerkId: user.id },
  });

  if (!dbUser) {
    dbUser = await db.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
      },
    });
  }

  const project = await db.project.create({
    data: {
      userId: dbUser.id,
      name: values.name,
      goal: values.goal,
      niche: values.niche,
      constraints: values.constraints,
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/projects");

  return project;
}
