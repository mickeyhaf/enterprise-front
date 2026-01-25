import Link from "next/link";
import { Building2, MapPin, Mail, Phone, Facebook, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary pt-20 pb-10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="text-white w-8 h-8" />
              <h2 className="text-lg font-display font-bold leading-tight">
                MU CONSULTANCY & BUSINESS ENTERPRISE
              </h2>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-8">
              Mekelle, Ethiopia. Providing excellence in research, industrial consultancy, and trade solutions since 1993.
            </p>
            <div className="flex gap-4 mb-8">
              <Link href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300">
                <Facebook size={18} />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300">
                <Twitter size={18} />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300">
                <Linkedin size={18} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm text-slate-300">
              <li>
                <Link href="/services" className="hover:text-accent transition-colors">
                  Service Catalog
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-accent transition-colors">
                  Project Portfolio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors">
                  Request a Proposal
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-accent transition-colors">
                  Tender Announcements
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Resource Center</h3>
            <ul className="space-y-4 text-sm text-slate-300">
              <li>
                <Link href="/resources/brochures" className="hover:text-accent transition-colors">
                  Brochures
                </Link>
              </li>
              <li>
                <Link href="/resources/whitepapers" className="hover:text-accent transition-colors">
                  Whitepapers
                </Link>
              </li>
              <li>
                <Link href="/resources/case-studies" className="hover:text-accent transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/resources/reports" className="hover:text-accent transition-colors">
                  Annual Reports
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <MapPin className="text-accent w-5 h-5 shrink-0" />
                <span>
                  Main Campus, Mekelle,
                  <br />
                  Tigray, Ethiopia
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-accent w-5 h-5 shrink-0" />
                <a href="mailto:info.consultancy@mu.edu.et" className="hover:text-white transition-colors">
                  info.consultancy@mu.edu.et
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-accent w-5 h-5 shrink-0" />
                <a href="tel:+251344404005" className="hover:text-white transition-colors">
                  +251 344 40 40 05
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          <p>© {new Date().getFullYear()} Mekelle University Business Enterprise. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-white">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
