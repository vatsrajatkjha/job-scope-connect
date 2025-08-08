import { Link, NavLink } from "react-router-dom";
import { Bell, BriefcaseBusiness, Home, MessageSquareText, Search, UserCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function SiteHeader() {
  const [q, setQ] = useState("");

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-14 items-center gap-3 px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="text-primary">JobPortal</span>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search for jobs, people, posts..."
              className="pl-9 w-64"
              onKeyDown={(e) => {
                if (e.key === "Enter" && q.trim()) {
                  window.location.href = `/search?q=${encodeURIComponent(q.trim())}`;
                }
              }}
              aria-label="Global search"
            />
          </div>
        </div>

        <nav className="ml-auto flex items-center gap-4 text-sm">
          <NavLink to="/" className={({isActive})=>isActive?"text-primary font-medium":"hover:text-primary"}>
            <Home className="inline h-4 w-4 mr-1" /> Home
          </NavLink>
          <NavLink to="/search?q=jobs" className={({isActive})=>isActive?"text-primary font-medium":"hover:text-primary"}>
            <BriefcaseBusiness className="inline h-4 w-4 mr-1" /> Jobs
          </NavLink>
          <button className="relative hover:text-primary" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">3</span>
          </button>
          <button className="hover:text-primary" aria-label="Messages">
            <MessageSquareText className="h-5 w-5" />
          </button>
          <button className="hover:text-primary" aria-label="Profile">
            <UserCircle className="h-6 w-6" />
          </button>
        </nav>
      </div>
    </header>
  );
}
