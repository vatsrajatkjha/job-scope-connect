import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bookmark, Building2, MapPin, Sparkles } from "lucide-react";
import type { Job } from "@/data/mock";

export default function JobCard({ job, onSelect }: { job: Job; onSelect: (id: string) => void }) {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onSelect(job.id)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-foreground line-clamp-1">
              {job.title}
            </h3>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1"><Building2 className="h-4 w-4" /> {job.company}</span>
              <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {job.location}</span>
              <span>Posted {job.postedAtHoursAgo}h ago</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {job.promoted && (
                <Badge variant="secondary" className="inline-flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> Promoted
                </Badge>
              )}
              {job.easyApply && <Badge>Easy Apply</Badge>}
              {job.tags?.slice(0,3).map((t) => (
                <Badge key={t} variant="outline">{t}</Badge>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <Button size="sm">Apply</Button>
            <Button size="icon" variant="outline" aria-label="Save">
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
