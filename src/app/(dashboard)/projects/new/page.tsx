import { ProjectForm } from "@/components/projects/project-form";

export default function NewProjectPage() {
  return (
    <div className="space-y-8 py-8">
      <header className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-4xl font-display tracking-tight">Create Project</h1>
        <p className="text-charcoal text-lg">
          Initialize your project memory. This allows the Boardroom to understand 
          your context, niche, and specific hurdles.
        </p>
      </header>

      <ProjectForm />
    </div>
  );
}
