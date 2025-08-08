import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import SearchBar, { parseBooleanQuery } from "@/components/SearchBar";
import { companies, groups, jobs, people, posts } from "@/data/mock";
import JobCard from "@/components/jobs/JobCard";
import JobDetail from "@/components/jobs/JobDetail";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchPage() {
  const query = useQuery();
  const navigate = useNavigate();
  const q = query.get("q")?.trim() ?? "";
  const locParam = query.get("loc")?.trim() ?? "";
  const [active, setActive] = useState("jobs");
  const [selectedJobId, setSelectedJobId] = useState<string | undefined>(undefined);

  // Filters
  const [datePosted, setDatePosted] = useState<string | undefined>(undefined);
  const [experience, setExperience] = useState<string | undefined>(undefined);
  const [company, setCompany] = useState<string | undefined>(undefined);
  const [location, setLocation] = useState<string | undefined>(undefined);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [easyApplyOnly, setEasyApplyOnly] = useState(false);

  useEffect(() => {
    setSelectedJobId(undefined);
  }, [q]);

  useEffect(() => {
    setLocation(locParam || undefined);
  }, [locParam]);

  const parsed = useMemo(() => parseBooleanQuery(q), [q]);

  const filteredJobs = useMemo(() => {
    const textMatch = (text: string) => {
      const lower = text.toLowerCase();
      const inc = parsed.include.every((t) => lower.includes(t.toLowerCase()));
      const any = parsed.any.length === 0 || parsed.any.some((t) => lower.includes(t.toLowerCase()));
      const exc = parsed.exclude.every((t) => !lower.includes(t.toLowerCase()));
      return inc && any && exc;
    };

    return jobs.filter((j) => {
      const haystack = `${j.title} ${j.company} ${j.location} ${(j.tags ?? []).join(" ")}`;
      if (!textMatch(haystack)) return false;
      if (datePosted === "24h" && j.postedAtHoursAgo > 24) return false;
      if (datePosted === "week" && j.postedAtHoursAgo > 24 * 7) return false;
      if (experience === "entry" && !(j.tags ?? []).some((t) => /intern|entry/i.test(t))) return false;
      if (company && j.company !== company) return false;
      if (location && !j.location.toLowerCase().includes(location.toLowerCase())) return false;
      if (remoteOnly && !(j.tags ?? []).some((t) => /remote/i.test(t))) return false;
      if (easyApplyOnly && !j.easyApply) return false;
      return true;
    });
  }, [parsed, datePosted, experience, company, location, remoteOnly, easyApplyOnly]);

  return (
    <main className="container mx-auto px-4 py-6">
      <SEO title={`${q ? `${q} – ` : ""}Search Results | Job Portal`} description="Search jobs, posts, people, groups and companies with boolean operators." canonicalPath="/search" />
      <h1 className="sr-only">Search results for {q}</h1>

      <div className="mb-4">
        <SearchBar initial={q} initialLocation={locParam} />
      </div>

      <Tabs value={active} onValueChange={setActive}>
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="people">People</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="mt-6">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <Select onValueChange={setDatePosted} value={datePosted}>
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="Date Posted" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Past 24 hours</SelectItem>
                <SelectItem value="week">Past week</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={setExperience} value={experience}>
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="Experience Level" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="entry">Entry Level</SelectItem>
                <SelectItem value="mid">Mid-Senior</SelectItem>
                <SelectItem value="director">Director</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={setCompany} value={company}>
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="Company" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="NVIDIA">NVIDIA</SelectItem>
                <SelectItem value="Microsoft">Microsoft</SelectItem>
                <SelectItem value="WorldFirst">WorldFirst</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={setLocation} value={location}>
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="Location" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="India">India</SelectItem>
                <SelectItem value="Pune">Pune</SelectItem>
                <SelectItem value="Gurugram">Gurugram</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <Switch id="remote" checked={remoteOnly} onCheckedChange={setRemoteOnly} />
              <Label htmlFor="remote">Remote</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="easy" checked={easyApplyOnly} onCheckedChange={setEasyApplyOnly} />
              <Label htmlFor="easy">Easy Apply</Label>
            </div>

            <Button variant="outline" onClick={() => { setDatePosted(undefined); setExperience(undefined); setCompany(undefined); setLocation(undefined); setRemoteOnly(false); setEasyApplyOnly(false); }}>All Filters</Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
            <div className="lg:col-span-2 space-y-3">
              {filteredJobs.map((j) => (
                <JobCard key={j.id} job={j} onSelect={setSelectedJobId} />
              ))}
              {filteredJobs.length === 0 && (
                <Card><CardContent className="p-8 text-sm text-muted-foreground">No jobs match your filters.</CardContent></Card>
              )}
            </div>
            <div>
              <JobDetail job={filteredJobs.find((j) => j.id === selectedJobId) ?? filteredJobs[0]} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="posts" className="mt-6">
          <div className="space-y-3">
            {posts.map((p) => (
              <Card key={p.id}><CardContent className="p-4"><p className="font-medium">{p.title}</p><p className="text-sm text-muted-foreground mt-1">by {p.author} • {p.ago}</p><Button variant="link" className="p-0 text-primary">View job</Button></CardContent></Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="people" className="mt-6">
          <div className="space-y-3">
            {people.map((pe) => (
              <Card key={pe.id}><CardContent className="p-4"><p className="font-medium">{pe.name}</p><p className="text-sm text-muted-foreground">{pe.title} • {pe.connection}</p><Button variant="outline" className="mt-2">Connect</Button></CardContent></Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="groups" className="mt-6">
          <div className="space-y-3">
            {groups.map((g) => (
              <Card key={g.id}><CardContent className="p-4"><p className="font-medium">{g.name}</p><p className="text-sm text-muted-foreground">{g.members.toLocaleString()} members</p><Button variant="outline" className="mt-2">Follow</Button></CardContent></Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="companies" className="mt-6">
          <div className="space-y-3">
            {companies.map((c) => (
              <Card key={c.id}><CardContent className="p-4"><p className="font-medium">{c.name}</p><p className="text-sm text-muted-foreground">{c.industry}</p><Button variant="outline" className="mt-2">Follow</Button></CardContent></Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
