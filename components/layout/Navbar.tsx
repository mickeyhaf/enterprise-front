"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Building2 } from "lucide-react";
import { useUIStore } from "@/lib/store";

export function Navbar() {
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();
  const pathname = usePathname();
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"EN" | "አማ">("EN");
  const languageMenuRef = useRef<HTMLDivElement | null>(null);

  const isActive = (path: string) => pathname === path;
  const isTradeActive = pathname.startsWith("/trade");

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
                Mekelle University
              </h1>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-[0.2em]">
                Consultancy & Business Enterprise
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="/" active={isActive("/")}>Home</NavLink>
            <NavLink href="/about" active={isActive("/about")}>About Us</NavLink>
            <NavLink href="/services" active={isActive("/services")}>Services</NavLink>

            {/* Trade Solutions Dropdown */}
            <div className="relative group">
              <Link
                href="/trade"
                onClick={(e) => {
                  if (pathname === "/trade") {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className={`flex items-center gap-1 text-sm font-semibold transition-colors py-4 ${isTradeActive
                  ? "text-primary dark:text-white"
                  : "text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white"
                  }`}
              >
                Trade Solutions <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </Link>
              <div className="absolute top-full left-0 w-64 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 p-2 overflow-hidden flex flex-col">
                  <DropdownLink href="/trade/import-export" active={isActive("/trade/import-export")}>
                    Import/Export Services
                  </DropdownLink>
                  <DropdownLink href="/trade/supply-chain" active={isActive("/trade/supply-chain")}>
                    Supply Chain Management
                  </DropdownLink>
                  <DropdownLink href="/trade/partnerships" active={isActive("/trade/partnerships")}>
                    Partnerships & Collaborations
                  </DropdownLink>
                  <DropdownLink href="/trade/expertise" active={isActive("/trade/expertise")}>
                    Industry-Specific Expertise
                  </DropdownLink>
                </div>
              </div>
            </div>

            {/* Projects Dropdown */}
            <div className="relative group">
              <Link
                href="/portfolio"
                onClick={(e) => {
                  if (pathname === "/portfolio") {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className={`flex items-center gap-1 text-sm font-semibold transition-colors py-4 ${pathname.startsWith("/portfolio")
                  ? "text-primary dark:text-white"
                  : "text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white"
                  }`}
              >
                Projects <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </Link>
              <div className="absolute top-full left-0 w-64 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 p-2 overflow-hidden flex flex-col">
                  <DropdownLink href="/portfolio" active={isActive("/portfolio")}>
                    Featured Projects
                  </DropdownLink>
                  <DropdownLink href="/portfolio/community-engagement" active={isActive("/portfolio/community-engagement")}>
                    Community Engagement
                  </DropdownLink>
                </div>
              </div>
            </div>
            <NavLink href="/news" active={isActive("/news")}>News & Updates</NavLink>

            {/* Resources Dropdown */}
            <div className="relative group">
              <Link
                href="/resources"
                onClick={(e) => {
                  if (pathname === "/resources") {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className={`flex items-center gap-1 text-sm font-semibold transition-colors py-4 ${pathname.startsWith("/resources")
                  ? "text-primary dark:text-white"
                  : "text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white"
                  }`}
              >
                Resources <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </Link>
              <div className="absolute top-full left-0 w-64 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 p-2 overflow-hidden flex flex-col">
                  <DropdownLink href="/resources/brochures" active={isActive("/resources/brochures")}>
                    Brochures
                  </DropdownLink>
                  <DropdownLink href="/resources/whitepapers" active={isActive("/resources/whitepapers")}>
                    Whitepapers
                  </DropdownLink>
                  <DropdownLink href="/resources/case-studies" active={isActive("/resources/case-studies")}>
                    Case Studies
                  </DropdownLink>
                  <DropdownLink href="/resources/reports" active={isActive("/resources/reports")}>
                    Annual Reports
                  </DropdownLink>
                </div>
              </div>
            </div>
          </div>

          {/* Language Switcher */}
          <div className="hidden md:flex items-center gap-4">
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
                  <button
                    role="menuitem"
                    type="button"
                    onClick={() => {
                      setLanguage("EN");
                      setLanguageMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm font-semibold transition-colors ${language === "EN"
                      ? "bg-slate-50 dark:bg-slate-800 text-primary"
                      : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`}
                  >
                    EN
                  </button>
                  <button
                    role="menuitem"
                    type="button"
                    onClick={() => {
                      setLanguage("አማ");
                      setLanguageMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm font-semibold transition-colors ${language === "አማ"
                      ? "bg-slate-50 dark:bg-slate-800 text-primary"
                      : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`}
                  >
                    አማ
                  </button>
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
            <MobileNavLink href="/" onClick={closeMobileMenu} active={isActive("/")}>
              Home
            </MobileNavLink>
            <MobileNavLink href="/about" onClick={closeMobileMenu} active={isActive("/about")}>
              About Us
            </MobileNavLink>
            <MobileNavLink href="/services" onClick={closeMobileMenu} active={isActive("/services")}>
              Services
            </MobileNavLink>
            <MobileNavLink href="/trade" onClick={closeMobileMenu} active={isActive("/trade")}>
              Trade Solutions
            </MobileNavLink>
            {/* Mobile Submenu */}
            <div className="pl-4 space-y-1 border-l-2 border-slate-100 dark:border-slate-800 ml-2">
              <MobileNavLink href="/trade/import-export" onClick={closeMobileMenu} active={isActive("/trade/import-export")} className="text-sm py-2">
                Import/Export
              </MobileNavLink>
              <MobileNavLink href="/trade/supply-chain" onClick={closeMobileMenu} active={isActive("/trade/supply-chain")} className="text-sm py-2">
                Supply Chain
              </MobileNavLink>
              <MobileNavLink href="/trade/partnerships" onClick={closeMobileMenu} active={isActive("/trade/partnerships")} className="text-sm py-2">
                Partnerships
              </MobileNavLink>
              <MobileNavLink href="/trade/expertise" onClick={closeMobileMenu} active={isActive("/trade/expertise")} className="text-sm py-2">
                Industry Expertise
              </MobileNavLink>
            </div>
            <MobileNavLink href="/portfolio" onClick={closeMobileMenu} active={isActive("/portfolio")}>
              Projects
            </MobileNavLink>
            {/* Mobile Projects Submenu */}
            <div className="pl-4 space-y-1 border-l-2 border-slate-100 dark:border-slate-800 ml-2">
              <MobileNavLink href="/portfolio" onClick={closeMobileMenu} active={isActive("/portfolio")} className="text-sm py-2">
                Featured Projects
              </MobileNavLink>
              <MobileNavLink href="/portfolio/community-engagement" onClick={closeMobileMenu} active={isActive("/portfolio/community-engagement")} className="text-sm py-2">
                Community Engagement
              </MobileNavLink>
            </div>
            <MobileNavLink href="/news" onClick={closeMobileMenu} active={isActive("/news")}>
              News & Updates
            </MobileNavLink>

            <MobileNavLink href="/resources" onClick={closeMobileMenu} active={isActive("/resources")}>
              Resources
            </MobileNavLink>
            {/* Mobile Resources Submenu */}
            <div className="pl-4 space-y-1 border-l-2 border-slate-100 dark:border-slate-800 ml-2">
              <MobileNavLink href="/resources/brochures" onClick={closeMobileMenu} active={isActive("/resources/brochures")} className="text-sm py-2">
                Brochures
              </MobileNavLink>
              <MobileNavLink href="/resources/whitepapers" onClick={closeMobileMenu} active={isActive("/resources/whitepapers")} className="text-sm py-2">
                Whitepapers
              </MobileNavLink>
              <MobileNavLink href="/resources/case-studies" onClick={closeMobileMenu} active={isActive("/resources/case-studies")} className="text-sm py-2">
                Case Studies
              </MobileNavLink>
              <MobileNavLink href="/resources/reports" onClick={closeMobileMenu} active={isActive("/resources/reports")} className="text-sm py-2">
                Annual Reports
              </MobileNavLink>
            </div>

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
                    <button
                      role="menuitem"
                      type="button"
                      onClick={() => {
                        setLanguage("EN");
                        setLanguageMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm font-semibold transition-colors ${language === "EN"
                        ? "bg-slate-50 dark:bg-slate-800 text-primary"
                        : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                        }`}
                    >
                      EN
                    </button>
                    <button
                      role="menuitem"
                      type="button"
                      onClick={() => {
                        setLanguage("አማ");
                        setLanguageMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm font-semibold transition-colors ${language === "አማ"
                        ? "bg-slate-50 dark:bg-slate-800 text-primary"
                        : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                        }`}
                    >
                      አማ
                    </button>
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
