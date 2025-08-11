import { useEffect, useMemo, useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchSuggestions } from "@/lib/api";

export function parseBooleanQuery(query: string) {
  const tokens = query.replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
  const include: string[] = [];
  const exclude: string[] = [];
  const any: string[] = [];
  let lastOp: "AND" | "OR" | "NOT" | null = null;
  tokens.forEach((t) => {
    const up = t.toUpperCase();
    if (["AND", "OR", "NOT"].includes(up)) { lastOp = up as any; return; }
    if (lastOp === "NOT") exclude.push(t);
    else if (lastOp === "OR") any.push(t);
    else include.push(t);
  });
  return { include, exclude, any };
}

export default function SearchBar({ initial, initialLocation, hideLocation, hideButton }: { initial?: string; initialLocation?: string; hideLocation?: boolean; hideButton?: boolean }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState(initial ?? "");
  const [loc, setLoc] = useState(initialLocation ?? "");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const abortRef = useRef<AbortController | null>(null);
  const navigate = useNavigate();

  useEffect(() => setQ(initial ?? ""), [initial]);
  useEffect(() => setLoc(initialLocation ?? ""), [initialLocation]);

  // Debounced, cancelable AJAX suggestions
  useEffect(() => {
    if (!q) { setItems([]); return; }
    setLoading(true);
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    const t = setTimeout(async () => {
      try {
        const res = await fetchSuggestions(q, ctrl.signal);
        setItems(res);
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => { clearTimeout(t); ctrl.abort(); };
  }, [q]);

  const goSearch = (value?: string) => {
    const query = (value ?? q).trim();
    const location = loc.trim();
    if (!query && !location) return;
    const u = new URL(window.location.origin + "/search");
    if (query) u.searchParams.set("q", query);
    if (location) u.searchParams.set("loc", location);
    navigate(u.pathname + u.search);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative w-full max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_220px_auto] gap-2 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => { setQ(e.target.value); setOpen(true); }}
                onFocus={() => setOpen(true)}
                onKeyDown={(e) => { if (e.key === "Enter") goSearch(); if (e.key === "Escape") setOpen(false); }}
                placeholder="Search (use AND, OR, NOT)"
                aria-label="Search terms"
                className="pl-9 pr-10"
              />
              {q && (
                <button aria-label="Clear terms" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setQ("")}> 
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            {!hideLocation && (
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={loc}
                  onChange={(e) => setLoc(e.target.value)}
                  placeholder="Location (e.g., India)"
                  aria-label="Location"
                  className="pl-9 pr-10"
                  onKeyDown={(e) => { if (e.key === "Enter") goSearch(); }}
                />
                {loc && (
                  <button aria-label="Clear location" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setLoc("")}> 
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}
            {!hideButton && (
              <div className="md:ml-2">
                <Button onClick={() => goSearch()} className="w-full md:w-auto">Search</Button>
              </div>
            )}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[var(--radix-popover-trigger-width)] p-0 z-50 bg-popover shadow-lg">
        {q ? (
          <div>
            <div className="px-4 py-2 text-xs text-muted-foreground">Suggestions {loading && <span className="ml-1">• Loading…</span>}</div>
            <ul className="max-h-80 overflow-auto">
              {items.map((s) => (
                <li key={s.id}>
                  <button className="w-full text-left px-4 py-3 hover:bg-muted/60" onMouseDown={() => goSearch(s.label)}>
                    <div className="flex items-center gap-3">
                      {s.icon ? (
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-secondary text-[10px] font-bold text-foreground" aria-hidden>
                          {s.icon}
                        </span>
                      ) : (
                        <span className="h-6 w-6 rounded bg-secondary" aria-hidden />
                      )}
                      <div>
                        <p className="text-sm font-medium text-primary">{s.label}</p>
                        {s.sublabel && <p className="text-xs text-muted-foreground">{s.type} • {s.sublabel}</p>}
                      </div>
                    </div>
                  </button>
                </li>
              ))}
              {items.length === 0 && (
                <li className="px-4 py-3 text-sm text-muted-foreground">No suggestions</li>
              )}
            </ul>
            <div className="border-t p-2 text-right">
              <Button variant="link" className="text-primary" onMouseDown={() => goSearch()}>See all results</Button>
            </div>
          </div>
        ) : (
          <div className="p-4 text-sm text-muted-foreground">Type to search…</div>
        )}
      </PopoverContent>
    </Popover>
  );
}
