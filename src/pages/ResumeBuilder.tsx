import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";
import { generateResumeAI } from "@/lib/api";

export default function ResumeBuilder() {
  const [fullName, setFullName] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [website, setWebsite] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [education, setEducation] = useState("");
  const [projects, setProjects] = useState("");
  const [certs, setCerts] = useState("");
  const [template, setTemplate] = useState<string | undefined>("modern");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const edgeUrl = (window as any)?.__RESUME_EDGE_URL__ as string | undefined;

  const onGenerate = async () => {
    setLoading(true);
    try {
      const res = await generateResumeAI({
        fullName,
        title,
        summary,
        targetRole,
        experience,
        skills,
        contactEmail: email,
        phone,
        location: city,
        website,
        linkedin,
        github,
        education,
        projects,
        certifications: certs,
        template,
      });
      setOutput(res.content);
    } catch (e) {
      setOutput("Generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <SEO title="Resume Builder – AI powered" description="Generate and optimize your resume with AI." canonicalPath="/resume" />
      <h1 className="text-3xl font-bold">Resume Builder</h1>
      <p className="text-muted-foreground mt-1">Use AI to generate tailored bullet points and a polished resume.</p>

      {!edgeUrl && (
        <Alert className="mt-4">
          <AlertTitle>Using local AI stub</AlertTitle>
          <AlertDescription>
            Connect your Supabase Edge function with Gemini and set window.__RESUME_EDGE_URL__ to enable real AI generation.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 mt-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full name</Label>
                <Input id="fullName" value={fullName} onChange={(e)=>setFullName(e.target.value)} placeholder="Jane Doe" />
              </div>
              <div>
                <Label htmlFor="title">Professional title</Label>
                <Input id="title" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Senior Java Developer" />
              </div>
              <div>
                <Label htmlFor="targetRole">Target role</Label>
                <Input id="targetRole" value={targetRole} onChange={(e)=>setTargetRole(e.target.value)} placeholder="Java Backend Engineer" />
              </div>
              <div>
                <Label htmlFor="skills">Skills (comma separated)</Label>
                <Input id="skills" value={skills} onChange={(e)=>setSkills(e.target.value)} placeholder="Java, Spring, React, SQL" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="jane@acme.com" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="+1 555 123 4567" />
              </div>
              <div>
                <Label htmlFor="city">Location</Label>
                <Input id="city" value={city} onChange={(e)=>setCity(e.target.value)} placeholder="San Francisco, CA" />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input id="website" value={website} onChange={(e)=>setWebsite(e.target.value)} placeholder="https://janedoe.dev" />
              </div>
              <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input id="linkedin" value={linkedin} onChange={(e)=>setLinkedin(e.target.value)} placeholder="https://linkedin.com/in/janedoe" />
              </div>
              <div>
                <Label htmlFor="github">GitHub</Label>
                <Input id="github" value={github} onChange={(e)=>setGithub(e.target.value)} placeholder="https://github.com/janedoe" />
              </div>
            </div>

            <div>
              <Label htmlFor="summary">Summary</Label>
              <Textarea id="summary" value={summary} onChange={(e)=>setSummary(e.target.value)} placeholder="2-3 sentences about your impact" />
            </div>

            <div>
              <Label htmlFor="experience">Experience bullets</Label>
              <Textarea id="experience" value={experience} onChange={(e)=>setExperience(e.target.value)} placeholder="- Led migration to Spring Boot...\n- Improved query performance by 30%..." rows={6} />
            </div>

            <div>
              <Label htmlFor="education">Education</Label>
              <Textarea id="education" value={education} onChange={(e)=>setEducation(e.target.value)} placeholder="B.Tech, Computer Science – IIT Delhi (2019-2023)" />
            </div>

            <div>
              <Label htmlFor="projects">Projects</Label>
              <Textarea id="projects" value={projects} onChange={(e)=>setProjects(e.target.value)} placeholder="- Realtime chat app with WebSocket..." />
            </div>

            <div>
              <Label htmlFor="certs">Certifications</Label>
              <Textarea id="certs" value={certs} onChange={(e)=>setCerts(e.target.value)} placeholder="- AWS Solutions Architect Associate" />
            </div>

            <div className="grid md:grid-cols-2 gap-4 items-end">
              <div>
                <Label>Template</Label>
                <Select value={template} onValueChange={setTemplate}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Choose style" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="classic">Classic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="pt-2 flex gap-3 justify-end">
                <Button onClick={onGenerate} disabled={loading} className="min-w-32">
                  {loading ? "Generating..." : "Generate"}
                </Button>
                <Button variant="outline" onClick={() => window.print()}>Print / Save PDF</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="font-semibold mb-3">Preview</h2>
            <pre className="whitespace-pre-wrap text-sm leading-6">{output || "Your AI-generated resume will appear here."}</pre>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
