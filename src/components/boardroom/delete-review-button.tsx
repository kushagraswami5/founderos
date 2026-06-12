"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteWeeklyReport } from "@/lib/actions/reports";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeleteReviewButtonProps {
  reportId: string;
  className?: string;
  redirectPath?: string;
  variant?: "ghost" | "destructive" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
}

export function DeleteReviewButton({ 
  reportId, 
  className,
  redirectPath = "/boardroom",
  variant = "ghost",
  size = "icon"
}: DeleteReviewButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (confirm("Are you sure you want to delete this entire boardroom review? This action cannot be undone.")) {
      setIsDeleting(true);
      try {
        await deleteWeeklyReport(reportId);
        router.push(redirectPath);
        router.refresh();
      } catch (error) {
        console.error("Failed to delete review:", error);
        alert("Failed to delete review. Please try again.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={cn("text-charcoal hover:text-accent-red hover:bg-accent-red/10", className)}
      onClick={handleDelete}
      disabled={isDeleting}
    >
      <Trash2 size={size === "icon" ? 18 : 16} className={cn(size !== "icon" && "mr-2")} />
      {size !== "icon" && (isDeleting ? "Deleting..." : "Delete Review")}
    </Button>
  );
}
