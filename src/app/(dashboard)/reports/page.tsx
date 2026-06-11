import { getProjects } from "@/lib/actions/reports";
import { ReportForm } from "@/components/reports/report-form";

export default async function NewReportPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-8 py-8">
      <header className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-4xl font-display tracking-tight">Weekly Review</h1>
        <p className="text-charcoal text-lg">
          The quality of your report determines the quality of the board's advice. 
          Be honest, be brutal, be thorough.
        </p>
      </header>

      <ReportForm projects={projects} />
    </div>
  );
}
