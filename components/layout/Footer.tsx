"use client";

import Link from "next/link";
import { Building2, MapPin, Mail, Phone, Facebook, Twitter, Linkedin } from "lucide-react";
import { useContent } from "@/lib/use-content";
import type { FooterContact, FooterSocialLinks } from "@/lib/api-client";

const DEFAULT_FOOTER: FooterContact = {
  companyName: "MU CONSULTANCY & BUSINESS ENTERPRISE",
  description:
    "Mekelle, Ethiopia. Providing excellence in research, industrial consultancy, and trade solutions since 1993.",
  address: "Main Campus, Mekelle, Tigray, Ethiopia",
  email: "info.consultancy@mu.edu.et",
  phone: "+251 344 40 40 05",
};

export function Footer() {
  const { data: content } = useContent<FooterContact>("footer_contact");
  const { data: socialContent } = useContent<FooterSocialLinks>("footer_social");
  const { companyName, description, address, email, phone } = content ?? DEFAULT_FOOTER;
  const social = socialContent ?? {};

  const mailHref = `mailto:${email}`;
  const telHref = `tel:${phone?.replace(/\s/g, "")}`;

  return (
    <footer className="bg-primary pt-20 pb-10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="text-white w-8 h-8" />
              <h2 className="text-lg font-display font-bold leading-tight">
                {companyName}
              </h2>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-8">
              {description}
            </p>
            {(social.facebook || social.twitter || social.linkedin) && (
              <div className="flex gap-4 mb-8">
                {social.facebook && (
                  <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300" aria-label="Facebook">
                    <Facebook size={18} />
                  </a>
                )}
                {social.twitter && (
                  <a href={social.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300" aria-label="Twitter">
                    <Twitter size={18} />
                  </a>
                )}
                {social.linkedin && (
                  <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300" aria-label="LinkedIn">
                    <Linkedin size={18} />
                  </a>
                )}
              </div>
            )}
          </div>

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

          <div>
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <MapPin className="text-accent w-5 h-5 shrink-0" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-accent w-5 h-5 shrink-0" />
                <a href={mailHref} className="hover:text-white transition-colors">
                  {email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-accent w-5 h-5 shrink-0" />
                <a href={telHref} className="hover:text-white transition-colors">
                  {phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

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
