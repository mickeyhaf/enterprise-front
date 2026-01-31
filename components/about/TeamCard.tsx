import { Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TeamCardProps {
  name: string;
  role: string;
  description: string;
  image: string;
  email?: string | null;
  linkedin?: string | null;
}

export function TeamCard({ name, role, description, image, email, linkedin }: TeamCardProps) {
  const hasSocial = email || linkedin;

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 text-center group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
      <div className="relative mb-8 mx-auto w-36 h-36">
        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-slate-50 dark:border-slate-800 shadow-inner">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>
        <div className="absolute inset-0 rounded-full border-2 border-primary scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
      </div>
      <h3 className="font-bold text-2xl text-slate-900 dark:text-white font-display mb-2">{name}</h3>
      <p className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-4">{role}</p>
      <p className="text-base text-slate-600 dark:text-slate-400 mb-8 font-light leading-relaxed">{description}</p>
      {hasSocial && (
        <div className="flex justify-center gap-5">
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all duration-300"
              aria-label={`${name} on LinkedIn`}
            >
              <Linkedin size={18} />
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all duration-300"
              aria-label={`Email ${name}`}
            >
              <Mail size={18} />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
