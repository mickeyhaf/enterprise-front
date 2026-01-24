"use client";

import Link from "next/link";
import { Building2, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/lib/store";

export function Navbar() {
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-primary p-2 rounded-lg group-hover:bg-primary/90 transition-colors">
              <Building2 className="text-white w-8 h-8" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-primary dark:text-white leading-tight uppercase tracking-tight">
                MU Consultancy
              </h1>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-[0.2em]">
                Business Enterprise
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About Us</NavLink>
            <NavLink href="/services">Services</NavLink>
            
            {/* Trade Solutions Dropdown */}
            <div className="relative group">
              <Link 
                href="/trade"
                className="flex items-center gap-1 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors py-4"
              >
                Trade Solutions <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </Link>
              <div className="absolute top-full left-0 w-64 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 p-2 overflow-hidden flex flex-col">
                  <Link href="/trade/import-export" className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary rounded-lg transition-colors text-left">
                    Import/Export Services
                  </Link>
                  <Link href="/trade/supply-chain" className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary rounded-lg transition-colors text-left">
                    Supply Chain Management
                  </Link>
                  <Link href="/trade/partnerships" className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary rounded-lg transition-colors text-left">
                    Partnerships & Collaborations
                  </Link>
                  <Link href="/trade/expertise" className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary rounded-lg transition-colors text-left">
                    Industry-Specific Expertise
                  </Link>
                </div>
              </div>
            </div>

            <NavLink href="/portfolio">Projects</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </div>

          {/* Language Switcher */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" className="font-semibold text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white">
              EN
            </Button>
            <div className="h-4 w-[1px] bg-slate-300 dark:bg-slate-700"></div>
            <Button variant="ghost" className="font-semibold text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white">
              አማ
            </Button>
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
            <MobileNavLink href="/" onClick={closeMobileMenu}>
              Home
            </MobileNavLink>
            <MobileNavLink href="/about" onClick={closeMobileMenu}>
              About Us
            </MobileNavLink>
            <MobileNavLink href="/services" onClick={closeMobileMenu}>
              Services
            </MobileNavLink>
            <MobileNavLink href="/trade" onClick={closeMobileMenu}>
              Trade Solutions
            </MobileNavLink>
            {/* Mobile Submenu */}
            <div className="pl-4 space-y-1 border-l-2 border-slate-100 dark:border-slate-800 ml-2">
              <MobileNavLink href="/trade/import-export" onClick={closeMobileMenu} className="text-sm py-2">
                Import/Export
              </MobileNavLink>
              <MobileNavLink href="/trade/supply-chain" onClick={closeMobileMenu} className="text-sm py-2">
                Supply Chain
              </MobileNavLink>
              <MobileNavLink href="/trade/partnerships" onClick={closeMobileMenu} className="text-sm py-2">
                Partnerships
              </MobileNavLink>
              <MobileNavLink href="/trade/expertise" onClick={closeMobileMenu} className="text-sm py-2">
                Industry Expertise
              </MobileNavLink>
            </div>
            <MobileNavLink href="/portfolio" onClick={closeMobileMenu}>
              Projects
            </MobileNavLink>
            <MobileNavLink href="/contact" onClick={closeMobileMenu}>
              Contact
            </MobileNavLink>
            <div className="pt-4 flex gap-4 justify-center border-t border-slate-100 dark:border-slate-800 mt-4">
               <Button variant="ghost" className="font-semibold">EN</Button>
               <Button variant="ghost" className="font-semibold">አማ</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors"
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
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block py-3 px-4 text-base font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-colors ${className}`}
    >
      {children}
    </Link>
  );
}
