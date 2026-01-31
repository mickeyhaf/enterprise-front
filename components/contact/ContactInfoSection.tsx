"use client";

import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { useContent } from "@/lib/use-content";
import type { ContactInfo } from "@/lib/api-client";

const DEFAULT_CONTACT: ContactInfo = {
  address: "Main Campus, Mekelle University, Mekelle, Tigray, Ethiopia",
  email: "info.consultancy@mu.edu.et",
  supportEmail: "support@mu.edu.et",
  phone: "+251 344 40 40 05",
  hours: "Mon - Fri, 8:00 AM - 5:00 PM",
};

export function ContactInfoSection() {
  const { data: content } = useContent<ContactInfo>("contact_info");
  const { address, email, supportEmail, phone, hours } = content ?? DEFAULT_CONTACT;

  return (
    <div>
      <h3 className="text-2xl font-bold font-display mb-8 text-slate-900 dark:text-white">
        Contact Information
      </h3>
      <div className="space-y-8">
        <div className="flex items-start gap-4 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border-l-4 border-primary transition-all hover:shadow-lg group">
          <div className="p-3 bg-white dark:bg-slate-700 rounded-full text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
            <MapPin size={24} />
          </div>
          <div>
            <h4 className="font-bold text-xl mb-2 text-slate-900 dark:text-white">
              Visit Our Office
            </h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
              {address}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border-l-4 border-accent transition-all hover:shadow-lg group">
          <div className="p-3 bg-white dark:bg-slate-700 rounded-full text-accent shadow-sm group-hover:bg-accent group-hover:text-primary transition-colors">
            <Mail size={24} />
          </div>
          <div>
            <h4 className="font-bold text-xl mb-2 text-slate-900 dark:text-white">
              Email Us
            </h4>
            <p className="text-slate-600 dark:text-slate-400 mb-2">
              <span className="font-medium text-slate-900 dark:text-slate-300">
                General Inquiries:
              </span>
              <br />
              <a href={`mailto:${email}`} className="hover:text-primary transition-colors">
                {email}
              </a>
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              <span className="font-medium text-slate-900 dark:text-slate-300">
                Support:
              </span>
              <br />
              <a href={`mailto:${supportEmail}`} className="hover:text-primary transition-colors">
                {supportEmail}
              </a>
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border-l-4 border-green-500 transition-all hover:shadow-lg group">
          <div className="p-3 bg-white dark:bg-slate-700 rounded-full text-green-500 shadow-sm group-hover:bg-green-500 group-hover:text-white transition-colors">
            <Phone size={24} />
          </div>
          <div>
            <h4 className="font-bold text-xl mb-2 text-slate-900 dark:text-white">
              Call Us
            </h4>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              <a
                href={`tel:${phone?.replace(/\s/g, "")}`}
                className="text-lg font-bold hover:text-primary transition-colors"
              >
                {phone}
              </a>
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-500 bg-white dark:bg-slate-700/50 px-3 py-1 rounded-full w-fit border border-slate-100 dark:border-slate-600">
              <Clock size={14} />
              <span>{hours}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
