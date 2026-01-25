import { ArrowRight, Verified } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <header className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
         <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuq25mY3vXtdcC6waRuuYWdh-edBAMgq6MdS_JXCUmLFWfLOoyvNpZoj_099FXdAgo9XaQ8KE8PLMnWwdiQ7MyBH8IGsagy-as-ltkMky2oJGuxvfaONJ99VOQReAmppFueZxJ47Ycar9VSmxPWdSXnw7WzSRmNzGz9fYWQM84mOzB0uRpiD6zNa5QAHqZND5H5k0IyHOohMJrcRfAw9nUa8zYUh0NNjbxcNf0XrtPydzrGQfxKG0nfWx0zSDgwyVglJ7HL0HJW3ir"
            alt="Corporate office building"
            fill
            className="object-cover grayscale-[20%]"
            priority
         />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/40"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-accent text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            <Verified size={16} />
            Est. 1993
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-6 leading-[1.1]">
            Pioneering <span className="text-accent italic">Excellence</span> in Industry.
          </h1>
          <p className="text-lg text-slate-100 mb-8 max-w-xl font-light">
            Mekelle University Consultancy and Business Enterprise serves as the bridge between academic rigor and practical industrial solutions.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact">
              <Button className="bg-accent text-primary px-8 py-6 rounded-md font-bold hover:bg-white transition-all flex items-center gap-2 text-base">
                Contact Us
                <ArrowRight size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
