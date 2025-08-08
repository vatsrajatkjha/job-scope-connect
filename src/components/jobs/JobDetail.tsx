import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Job } from "@/data/mock";
import { Building2, MapPin, Save } from "lucide-react";

export default function JobDetail({ job }: { job: Job | undefined }) {
  if (!job) {
    return (
      <Card>
        <CardContent className="p-8 text-sm text-muted-foreground">
          Select a job to view details.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="sticky top-20">
      <CardContent className="p-6 space-y-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">{job.title}</h2>
          <p className="text-sm text-muted-foreground flex flex-wrap items-center gap-2 mt-1">
            <span className="inline-flex items-center gap-1"><Building2 className="h-4 w-4" /> {job.company}</span>
            <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {job.location}</span>
            <span>{job.type}</span>
          </p>
        </div>

        <div className="flex gap-2">
          <Button>Apply</Button>
          <Button variant="outline"><Save className="h-4 w-4 mr-2" /> Save</Button>
        </div>

        <section>
          <h3 className="font-semibold">About the job</h3>
          <p className="mt-2 text-sm text-foreground/90">{job.description}</p>
        </section>

        <section>
          <h3 className="font-semibold">What you'll be doing</h3>
          <ul className="mt-2 list-disc pl-5 text-sm space-y-1">
            {job.responsibilities.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="font-semibold">Qualifications</h3>
          <ul className="mt-2 list-disc pl-5 text-sm space-y-1">
            {job.qualifications.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </section>

        {job.recruiter && (
          <section>
            <h3 className="font-semibold">Recruiter</h3>
            <p className="text-sm text-muted-foreground mt-1">{job.recruiter.name}</p>
          </section>
        )}
      </CardContent>
    </Card>
  );
}
