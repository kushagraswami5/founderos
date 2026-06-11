"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { submitWeeklyReport } from "@/lib/actions/reports";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Send } from "lucide-react";

interface Project {
  id: string;
  name: string;
}

export function ReportForm({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState(searchParams.get("projectId") || "");

  useEffect(() => {
    const pid = searchParams.get("projectId");
    if (pid) setSelectedProjectId(pid);
  }, [searchParams]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const values = {
      projectId: selectedProjectId,
      content: formData.get("content") as string,
      weekNumber: parseInt(formData.get("weekNumber") as string || "1"),
    };

    try {
      const report = await submitWeeklyReport(values);
      router.push(`/boardroom/${report.id}`);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="max-w-3xl mx-auto border-hairline bg-surface-card overflow-hidden">
      <div className="h-1 w-full bg-gradient-to-r from-accent-orange to-accent-red" />
      <CardHeader>
        <CardTitle className="font-display text-2xl">Weekly Executive Report</CardTitle>
        <CardDescription>
          Document your activities, wins, and bottlenecks. Your board is listening.
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="projectId">Select Project</Label>
              <select
                id="projectId"
                name="projectId"
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                required
                className="flex h-10 w-full rounded-md border border-hairline-strong bg-surface-card px-3 py-2 text-sm focus-visible:outline-none focus-visible:border-ink transition-colors appearance-none"
                disabled={loading}
              >
                <option value="" disabled>Select a project...</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="weekNumber">Week Number</Label>
              <input
                id="weekNumber"
                name="weekNumber"
                type="number"
                min="1"
                defaultValue="1"
                required
                className="flex h-10 w-full rounded-md border border-hairline-strong bg-surface-card px-3 py-2 text-sm focus-visible:outline-none focus-visible:border-ink transition-colors"
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Report Content</Label>
            <Textarea
              id="content"
              name="content"
              placeholder={`* Sent 40 DMs
* Posted 5 Instagram posts
* Got 3 founder replies
* Built 1 portfolio case study
* Revenue ₹0`}
              required
              className="min-h-[300px] font-mono text-sm leading-relaxed"
              disabled={loading}
            />
            <p className="text-[10px] text-charcoal flex justify-between">
              <span>Markdown supported. Be as detailed as possible.</span>
              <span>Min. 20 characters</span>
            </p>
          </div>

          {error && (
            <p className="text-sm text-accent-red font-medium">{error}</p>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t border-hairline pt-6 bg-white/5">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading || projects.length === 0} className="gap-2 px-8">
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}
            Submit to Boardroom
          </Button>
        </CardFooter>
      </form>
      
      {projects.length === 0 && !loading && (
        <div className="absolute inset-0 bg-canvas/80 backdrop-blur-sm flex items-center justify-center p-6 text-center z-10">
          <div className="max-w-xs space-y-4">
            <p className="text-ink font-medium">You need an active project to submit a report.</p>
            <Button onClick={() => router.push("/projects/new")}>
              Create Your First Project
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
