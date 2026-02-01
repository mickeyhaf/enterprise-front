"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Building2 } from "lucide-react";
import { useUIStore } from "@/lib/store";
import { useContent } from "@/lib/use-content";
import type { NavbarContent } from "@/lib/api-client";

const DEFAULT_NAVBAR: NavbarContent = {
  siteName: "Mekelle University",
  tagline: "Consultancy & Business Enterprise",
  mainLinks: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
  ],
  dropdowns: [
    {
      label: "Trade Solutions",
      href: "/trade",
      items: [
        { label: "Import/Export Services", href: "/trade/import-export" },
        { label: "Supply Chain Management", href: "/trade/supply-chain" },
        { label: "Partnerships & Collaborations", href: "/trade/partnerships" },
        { label: "Industry-Specific Expertise", href: "/trade/expertise" },
      ],
    },
    {
      label: "Projects",
      href: "/portfolio",
      items: [
        { label: "Featured Projects", href: "/portfolio" },
        { label: "Community Engagement", href: "/portfolio/community-engagement" },
      ],
    },
  ],
  trailingLinks: [{ label: "News & Updates", href: "/news" }],
  resourcesDropdown: {
    label: "Resources",
    href: "/resources",
    items: [
      { label: "Brochures", href: "/resources/brochures" },
      { label: "Whitepapers", href: "/resources/whitepapers" },
      { label: "Case Studies", href: "/resources/case-studies" },
      { label: "Annual Reports", href: "/resources/reports" },
    ],
  },
  adminLoginHref: "/login",
  adminLoginLabel: "Admin Login",
  languages: ["EN", "አማ"],
};

export function Navbar() {
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();
  const pathname = usePathname();
  const { data: navContent } = useContent<NavbarContent>("navbar");
  const nav = navContent ?? DEFAULT_NAVBAR;
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const languages = nav.languages ?? DEFAULT_NAVBAR.languages ?? ["EN", "አማ"];
  const [language, setLanguage] = useState<string>(languages[0] ?? "EN");
  const languageMenuRef = useRef<HTMLDivElement | null>(null);

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    if (!languageMenuOpen) return;
    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (languageMenuRef.current && !languageMenuRef.current.contains(target)) {
        setLanguageMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [languageMenuOpen]);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <div className="bg-primary p-2 rounded-lg group-hover:bg-primary/90 transition-colors">
              <Building2 className="text-white w-8 h-8" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-primary dark:text-white leading-tight uppercase tracking-tight">
                {nav.siteName ?? DEFAULT_NAVBAR.siteName}
              </h1>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-[0.2em]">
                {nav.tagline ?? DEFAULT_NAVBAR.tagline}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {(nav.mainLinks ?? DEFAULT_NAVBAR.mainLinks)?.map((item) => (
              <NavLink key={item.href} href={item.href} active={isActive(item.href)}>
                {item.label}
              </NavLink>
            ))}

            {(nav.dropdowns ?? DEFAULT_NAVBAR.dropdowns)?.map((d) => (
              <div key={d.href} className="relative group">
                <Link
                  href={d.href}
                  onClick={(e) => {
                    if (pathname === d.href) {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className={`flex items-center gap-1 text-sm font-semibold transition-colors py-4 ${pathname.startsWith(d.href)
                    ? "text-primary dark:text-white"
                    : "text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white"
                    }`}
                >
                  {d.label} <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                </Link>
                <div className="absolute top-full left-0 w-64 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                  <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 p-2 overflow-hidden flex flex-col">
                    {d.items?.map((item) => (
                      <DropdownLink key={item.href} href={item.href} active={isActive(item.href)}>
                        {item.label}
                      </DropdownLink>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {(nav.trailingLinks ?? DEFAULT_NAVBAR.trailingLinks)?.map((item) => (
              <NavLink key={item.href} href={item.href} active={isActive(item.href)}>
                {item.label}
              </NavLink>
            ))}

            {(nav.resourcesDropdown ?? DEFAULT_NAVBAR.resourcesDropdown) && (() => {
              const rd = nav.resourcesDropdown ?? DEFAULT_NAVBAR.resourcesDropdown!;
              return (
                <div key="resources" className="relative group">
                  <Link
                    href={rd.href}
                    onClick={(e) => {
                      if (pathname === rd.href) {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    className={`flex items-center gap-1 text-sm font-semibold transition-colors py-4 ${pathname.startsWith(rd.href)
                      ? "text-primary dark:text-white"
                      : "text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white"
                      }`}
                  >
                    {rd.label} <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  </Link>
                  <div className="absolute top-full left-0 w-64 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 p-2 overflow-hidden flex flex-col">
                      {rd.items?.map((item) => (
                        <DropdownLink key={item.href} href={item.href} active={isActive(item.href)}>
                          {item.label}
                        </DropdownLink>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Admin Login + Language Switcher */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href={nav.adminLoginHref ?? "/login"}
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
            >
              {nav.adminLoginLabel ?? "Admin Login"}
            </Link>
            <div className="relative" ref={languageMenuRef}>
              <button
                type="button"
                onClick={() => setLanguageMenuOpen((v) => !v)}
                className="h-11 px-5 rounded-xl border border-slate-300/70 dark:border-slate-700/80 bg-transparent text-slate-700 dark:text-slate-100 font-bold text-sm flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                aria-haspopup="menu"
                aria-expanded={languageMenuOpen}
              >
                <span>{language}</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {languageMenuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-40 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      role="menuitem"
                      type="button"
                      onClick={() => {
                        setLanguage(lang);
                        setLanguageMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm font-semibold transition-colors ${language === lang
                        ? "bg-slate-50 dark:bg-slate-800 text-primary"
                        : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                        }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {(nav.mainLinks ?? DEFAULT_NAVBAR.mainLinks)?.map((item) => (
              <MobileNavLink key={item.href} href={item.href} onClick={closeMobileMenu} active={isActive(item.href)}>
                {item.label}
              </MobileNavLink>
            ))}
            {(nav.dropdowns ?? DEFAULT_NAVBAR.dropdowns)?.map((d) => (
              <div key={d.href}>
                <MobileNavLink href={d.href} onClick={closeMobileMenu} active={isActive(d.href)}>
                  {d.label}
                </MobileNavLink>
                <div className="pl-4 space-y-1 border-l-2 border-slate-100 dark:border-slate-800 ml-2">
                  {d.items?.map((item) => (
                    <MobileNavLink key={item.href} href={item.href} onClick={closeMobileMenu} active={isActive(item.href)} className="text-sm py-2">
                      {item.label}
                    </MobileNavLink>
                  ))}
                </div>
              </div>
            ))}
            {(nav.trailingLinks ?? DEFAULT_NAVBAR.trailingLinks)?.map((item) => (
              <MobileNavLink key={item.href} href={item.href} onClick={closeMobileMenu} active={isActive(item.href)}>
                {item.label}
              </MobileNavLink>
            ))}
            {(nav.resourcesDropdown ?? DEFAULT_NAVBAR.resourcesDropdown) && (() => {
              const rd = nav.resourcesDropdown ?? DEFAULT_NAVBAR.resourcesDropdown!;
              return (
                <div key="resources">
                  <MobileNavLink href={rd.href} onClick={closeMobileMenu} active={isActive(rd.href)}>
                    {rd.label}
                  </MobileNavLink>
                  <div className="pl-4 space-y-1 border-l-2 border-slate-100 dark:border-slate-800 ml-2">
                    {rd.items?.map((item) => (
                      <MobileNavLink key={item.href} href={item.href} onClick={closeMobileMenu} active={isActive(item.href)} className="text-sm py-2">
                        {item.label}
                      </MobileNavLink>
                    ))}
                  </div>
                </div>
              );
            })()}
            <MobileNavLink href={nav.adminLoginHref ?? "/login"} onClick={closeMobileMenu} active={isActive(nav.adminLoginHref ?? "/login")}>
              {nav.adminLoginLabel ?? "Admin Login"}
            </MobileNavLink>
            <div className="pt-4 flex gap-4 justify-center border-t border-slate-100 dark:border-slate-800 mt-4">
              <div className="relative" ref={languageMenuRef}>
                <button
                  type="button"
                  onClick={() => setLanguageMenuOpen((v) => !v)}
                  className="h-11 px-5 rounded-xl border border-slate-300/70 dark:border-slate-700/80 bg-transparent text-slate-700 dark:text-slate-100 font-bold text-sm flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                  aria-haspopup="menu"
                  aria-expanded={languageMenuOpen}
                >
                  <span>{language}</span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>
                {languageMenuOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 w-40 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        role="menuitem"
                        type="button"
                        onClick={() => {
                          setLanguage(lang);
                          setLanguageMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm font-semibold transition-colors ${language === lang
                          ? "bg-slate-50 dark:bg-slate-800 text-primary"
                          : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                          }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active?: boolean }) {
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === href) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`text-sm font-semibold transition-colors ${active
        ? "text-primary dark:text-white"
        : "text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white"
        }`}
    >
      {children}
    </Link>
  );
}

function DropdownLink({ href, children, active }: { href: string; children: React.ReactNode; active?: boolean }) {
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === href) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`px-4 py-3 text-sm rounded-lg transition-colors text-left ${active
        ? "bg-slate-50 dark:bg-slate-800 text-primary font-medium"
        : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary"
        }`}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  onClick,
  children,
  className = "",
  active
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  active?: boolean;
}) {
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === href) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    onClick();
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`block py-3 px-4 text-base font-medium rounded-md transition-colors ${active
        ? "bg-primary/5 text-primary dark:text-white"
        : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
        } ${className}`}
    >
      {children}
    </Link>
  );
}
