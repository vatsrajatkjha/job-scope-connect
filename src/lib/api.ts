export type SuggestionDTO = {
  id: string;
  type: string;
  label: string;
  sublabel?: string;
  icon?: string;
  href?: string;
};

// Config: optionally expose a Supabase Edge Function or REST endpoint at runtime via globals
// window.__SUGGESTIONS_URL__ -> GET <url>?q=...
// window.__RESUME_EDGE_URL__  -> POST <url>

export async function fetchSuggestions(q: string, signal?: AbortSignal): Promise<SuggestionDTO[]> {
  const url = (window as any)?.__SUGGESTIONS_URL__ as string | undefined;
  try {
    if (url) {
      const res = await fetch(`${url}?q=${encodeURIComponent(q)}`, { signal });
      if (!res.ok) throw new Error(`Suggestions fetch failed: ${res.status}`);
      return (await res.json()) as SuggestionDTO[];
    }
  } catch (e) {
    // fall through to local fallback
  }

  // Fallback to a static JSON (still AJAX) to keep UX working if backend not ready
  const res = await fetch(`/suggestions.json`, { signal });
  if (!res.ok) return [];
  const all = (await res.json()) as SuggestionDTO[];
  const ql = q.toLowerCase();
  return all.filter((s) => [s.label, s.sublabel].filter(Boolean).some((t) => t!.toLowerCase().includes(ql))).slice(0, 8);
}

export type ResumeGenInput = {
  fullName?: string;
  title?: string;
  summary?: string;
  targetRole?: string;
  experience?: string; // free text bullet points
  skills?: string;
  contactEmail?: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  education?: string;
  projects?: string;
  certifications?: string;
  template?: string;
};

export async function generateResumeAI(input: ResumeGenInput, signal?: AbortSignal): Promise<{ content: string }> {
  const url = (window as any)?.__RESUME_EDGE_URL__ as string | undefined;
  if (url) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
      signal,
    });
    if (!res.ok) throw new Error(`Resume generation failed: ${res.status}`);
    return await res.json();
  }
  // Fallback stub so UI works if edge function not yet wired
  const content = `# ${input.fullName || 'Your Name'}\n${input.title || 'Software Engineer'}\n\n## Contact\n${[input.contactEmail, input.phone, input.location, input.website, input.linkedin, input.github].filter(Boolean).join(' | ') || 'email@example.com | City, Country'}\n\n## Summary\n${input.summary || 'Passionate professional with a focus on impact.'}\n\n## Skills\n${input.skills || 'Java, React, SQL'}\n\n## Experience\n${input.experience || '- Describe your accomplishments here.'}\n\n${input.education ? `## Education\n${input.education}\n\n` : ''}${input.projects ? `## Projects\n${input.projects}\n\n` : ''}${input.certifications ? `## Certifications\n${input.certifications}\n\n` : ''}---\nTemplate: ${input.template || 'modern'}`;
  return { content };
}
