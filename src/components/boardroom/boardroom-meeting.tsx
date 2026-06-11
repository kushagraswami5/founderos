"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { runBoardroomMeeting } from "@/lib/actions/boardroom";
import { BoardroomView } from "./boardroom-view";
import { DepartmentAdvice } from "@prisma/client";

export function BoardroomMeeting({ 
  reportId, 
  existingAdvice 
}: { 
  reportId: string, 
  existingAdvice: DepartmentAdvice[] 
}) {
  const router = useRouter();
  const [advice, setAdvice] = useState<DepartmentAdvice[]>(existingAdvice);
  const [loading, setLoading] = useState(existingAdvice.length === 0);

  useEffect(() => {
    async function startMeeting() {
      if (existingAdvice.length === 0) {
        try {
          const results = await runBoardroomMeeting(reportId);
          setAdvice(results);
          // Force a refresh to sync server state and "redirect" to the review view
          router.refresh();
        } catch (error) {
          console.error("Failed to run boardroom meeting:", error);
        } finally {
          setLoading(false);
        }
      }
    }

    startMeeting();
  }, [reportId, existingAdvice, router]);

  return <BoardroomView reportId={reportId} initialAdvice={advice} />;
}
