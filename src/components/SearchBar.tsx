import { useEffect, useMemo, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { suggestions as allSuggestions } from "@/data/mock";
import { useNavigate } from "react-router-dom";

export function parseBooleanQuery(query: string) {
  // Simple boolean text parser: returns include, exclude, any tokens
  const tokens = query
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean);

  const include: string[] = [];
  const exclude: string[] = [];
  const any: string[] = [];

  let lastOp: "AND" | "OR" | "NOT" | null = null;
  tokens.forEach((t) => {
    const up = t.toUpperCase();
    if (["AND", "OR", "NOT"].includes(up)) {
      lastOp = up as any;
      return;
    }
    if (lastOp === "NOT") exclude.push(t);
    else if (lastOp === "OR") any.push(t);
    else include.push(t);
  });
  return { include, exclude, any };
}

export default function SearchBar({ initial }: { initial?: string }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState(initial ?? "");
  const navigate = useNavigate();

  useEffect(() => setQ(initial ?? ""), [initial]);

  const suggestions = useMemo(() => {
    if (!q) return [];
    const ql = q.toLowerCase();
    return allSuggestions.filter((s) =>
      [s.label, s.sublabel].filter(Boolean).some((txt) => txt!.toLowerCase().includes(ql))
    ).slice(0, 6);
  }, [q]);

  const goSearch = (value?: string) => {
    const query = (value ?? q).trim();
    if (!query) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative w-full max-w-2xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter") goSearch();
              if (e.key === "Escape") setOpen(false);
            }}
            placeholder="Search jobs with AND, OR, NOT"
            aria-label="Job search"
            className="pl-9 pr-10"
          />
          {q && (
            <button
              aria-label="Clear"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setQ("")}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[var(--radix-popover-trigger-width)] p-0 z-50 bg-background shadow-lg">
        {q ? (
          <div>
            <ul className="max-h-80 overflow-auto">
              {suggestions.map((s) => (
                <li key={s.id}>
                  <button
                    className="w-full text-left px-4 py-3 hover:bg-muted/60"
                    onClick={() => goSearch(s.label)}
                  >
                    <div className="flex items-center gap-3">
                      {s.icon ? (
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-yellow-300/80 text-[10px] font-bold text-black" aria-hidden>
                          {s.icon}
                        </span>
                      ) : (
                        <span className="h-6 w-6 rounded bg-secondary" aria-hidden />
                      )}
                      <div>
                        <p className="text-sm font-medium text-primary">
                          {s.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {s.sublabel ? `${s.type} • ${s.sublabel}` : s.type}
                        </p>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
            <div className="border-t p-2 text-right">
              <Button variant="link" className="text-primary" onClick={() => goSearch()}>
                See all results
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-4 text-sm text-muted-foreground">Type to search...</div>
        )}
      </PopoverContent>
    </Popover>
  );
}
