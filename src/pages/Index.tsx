
import { SEO } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { BriefcaseBusiness, Users, Newspaper } from "lucide-react";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <SEO title="Job Portal – Find your next role" description="Search jobs with boolean operators. Explore jobs, posts, people, groups, and companies." canonicalPath="/" />
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">Find your next opportunity</h1>
        <p className="mt-3 text-lg text-muted-foreground">Use AND, OR, NOT to refine your search. Try: Java AND Developer NOT Senior</p>
      </section>

      <section className="container mx-auto px-4 pb-16 grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6 text-left">
            <BriefcaseBusiness className="h-6 w-6 text-primary" />
            <h2 className="mt-3 font-semibold">Jobs</h2>
            <p className="text-sm text-muted-foreground">Explore thousands of roles tailored to your skills.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-left">
            <Users className="h-6 w-6 text-primary" />
            <h2 className="mt-3 font-semibold">People & Groups</h2>
            <p className="text-sm text-muted-foreground">Grow your network and join communities.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-left">
            <Newspaper className="h-6 w-6 text-primary" />
            <h2 className="mt-3 font-semibold">Posts & Companies</h2>
            <p className="text-sm text-muted-foreground">Stay updated with insights and companies you like.</p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default Index;
