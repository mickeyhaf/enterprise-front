import { Share2, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TeamCardProps {
  name: string;
  role: string;
  description: string;
  image: string;
}

export function TeamCard({ name, role, description, image }: TeamCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-center group hover:shadow-xl transition-all">
      <div className="relative mb-6 mx-auto w-32 h-32">
        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-slate-50 dark:border-slate-800">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 rounded-full border-2 border-primary scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"></div>
      </div>
      <h3 className="font-bold text-xl text-slate-900 dark:text-white font-display">{name}</h3>
      <p className="text-primary font-semibold text-sm mb-4">{role}</p>
      <p className="text-sm text-slate-500 mb-6">{description}</p>
      <div className="flex justify-center gap-3">
        <Link href="#" className="text-slate-400 hover:text-primary transition-colors">
          <Share2 size={20} />
        </Link>
        <Link href="#" className="text-slate-400 hover:text-primary transition-colors">
          <Mail size={20} />
        </Link>
      </div>
    </div>
  );
}
