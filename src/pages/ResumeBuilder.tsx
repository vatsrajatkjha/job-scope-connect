import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { generateResumeAI } from "@/lib/api";

export default function ResumeBuilder() {
  const [fullName, setFullName] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  const onGenerate = async () => {
    setLoading(true);
    try {
      const res = await generateResumeAI({ fullName, title, summary, targetRole, experience, skills });
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

      <div className="grid gap-6 mt-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6 space-y-4">
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
              <Label htmlFor="summary">Summary</Label>
              <Textarea id="summary" value={summary} onChange={(e)=>setSummary(e.target.value)} placeholder="2-3 sentences about your impact" />
            </div>
            <div>
              <Label htmlFor="skills">Skills (comma separated)</Label>
              <Input id="skills" value={skills} onChange={(e)=>setSkills(e.target.value)} placeholder="Java, Spring, React, SQL" />
            </div>
            <div>
              <Label htmlFor="experience">Experience bullets</Label>
              <Textarea id="experience" value={experience} onChange={(e)=>setExperience(e.target.value)} placeholder="- Led migration to Spring Boot...\n- Improved query performance by 30%..." rows={6} />
            </div>
            <div className="pt-2">
              <Button onClick={onGenerate} disabled={loading} className="min-w-32">
                {loading ? "Generating..." : "Generate"}
              </Button>
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
