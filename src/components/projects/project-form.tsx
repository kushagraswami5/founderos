"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProject } from "@/lib/actions/projects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export function ProjectForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const values = {
      name: formData.get("name") as string,
      goal: formData.get("goal") as string,
      niche: formData.get("niche") as string,
      constraints: formData.get("constraints") as string,
    };

    try {
      await createProject(values);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="max-w-2xl mx-auto border-hairline bg-surface-card">
      <CardHeader>
        <CardTitle className="font-display text-2xl">Initialize New Venture</CardTitle>
        <CardDescription>
          Define your project goals and constraints to set up your executive boardroom.
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g. Freelance MVP Agency"
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="niche">Niche / Industry</Label>
            <Input
              id="niche"
              name="niche"
              placeholder="e.g. SaaS MVP Development for Solo Founders"
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal">Primary Goal</Label>
            <Textarea
              id="goal"
              name="goal"
              placeholder="e.g. Get first ₹50,000 client within 30 days"
              required
              disabled={loading}
            />
            <p className="text-[10px] text-charcoal">
              Be specific. Your AI board will use this to measure your progress.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="constraints">Constraints (Optional)</Label>
            <Textarea
              id="constraints"
              name="constraints"
              placeholder="e.g. Working 6 hours/day, Zero ad budget"
              disabled={loading}
            />
          </div>

          {error && (
            <p className="text-sm text-accent-red font-medium">{error}</p>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t border-hairline pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading} className="gap-2">
            {loading && <Loader2 size={16} className="animate-spin" />}
            Create Project
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
