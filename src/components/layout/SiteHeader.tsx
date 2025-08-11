import { Link, NavLink, useLocation } from "react-router-dom";
import { Bell, BriefcaseBusiness, Home, MessageSquareText, UserCircle } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import { useCallback } from "react";

export default function SiteHeader() {
  const location = useLocation();
  const onHome = location.pathname === "/";

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-14 items-center gap-3 px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="text-primary">JobPortal</span>
        </Link>

        <div className="hidden md:flex flex-1 items-center">
          <div className="w-full max-w-2xl">
            <SearchBar hideLocation={onHome} hideButton={onHome} />
          </div>
        </div>

        <nav className="ml-auto flex items-center gap-4 text-sm">
          <NavLink to="/" className={({isActive})=>isActive?"text-primary font-medium":"hover:text-primary"}>
            <Home className="inline h-4 w-4 mr-1" /> Home
          </NavLink>
          <NavLink to="/search?q=jobs" className={({isActive})=>isActive?"text-primary font-medium":"hover:text-primary"}>
            <BriefcaseBusiness className="inline h-4 w-4 mr-1" /> Jobs
          </NavLink>
          <NavLink to="/resume" className={({isActive})=>isActive?"text-primary font-medium":"hover:text-primary"}>
            Resume Builder
          </NavLink>
          <button className="relative hover:text-primary" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">3</span>
          </button>
          <button className="hover:text-primary" aria-label="Toggle theme" onClick={useCallback(()=>{
            const el = document.documentElement;
            el.classList.toggle('dark');
            try { localStorage.setItem('theme', el.classList.contains('dark') ? 'dark' : 'light'); } catch {}
          }, [])}>
            {/* Simple theme dot */}
            <span className="inline-block h-4 w-4 rounded-full bg-primary" />
          </button>
          <button className="hover:text-primary" aria-label="Profile">
            <UserCircle className="h-6 w-6" />
          </button>
        </nav>
      </div>
    </header>
  );
}
