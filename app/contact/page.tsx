import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
  return (
    <PageShell>
      <Navbar />
      
      {/* Hero Section */}
      <header className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
           <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCtxVlcl-gnjzWsuPlV6PxBvqqR1hdBZEw6kBWG6u07uAL4mBktYhy_vE5wOVnSn86F4SyCqTNkBGnOAZFmT2L1J4BmV-j-41sFOkGVi8H-0b63_se1gelW8aW-bmS1k3fa9-ZtNaRirti2pAl6mFEsKhuUTT_tzlyw3jIr0ilKu2CSyndyw73u-KJsjEJvJndBI3P1cV0zIvFyIPAeVCnzK4M3400wYIaIvX668JrC7NiRwlEeOjKg8DF97Gd31pFa7i1j4zIkZQZ"
              alt="Customer support team"
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
               <Phone size={16} />
               Get in Touch
             </div>
             <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-6 leading-[1.1]">
               Contact <span className="text-accent italic">Us</span>
             </h1>
             <p className="text-lg text-slate-100 mb-8 max-w-xl font-light">
               We are here to help. Reach out to us for quotes, consultations, or partnership opportunities. Let's build something great together.
             </p>
          </div>
        </div>
      </header>

      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <SectionHeader 
             title="Get in Touch" 
             description="Have a question or need a custom solution? Our team is ready to assist you."
             className="mb-16"
           />

           <div className="grid lg:grid-cols-2 gap-16">
             {/* Contact Info */}
             <div>
                <h3 className="text-2xl font-bold font-display mb-8 text-slate-900 dark:text-white">Contact Information</h3>
                <div className="space-y-8">
                   <div className="flex items-start gap-4 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border-l-4 border-primary transition-all hover:shadow-lg group">
                      <div className="p-3 bg-white dark:bg-slate-700 rounded-full text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-2 text-slate-900 dark:text-white">Visit Our Office</h4>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                          Main Campus, Mekelle University<br />
                          Mekelle, Tigray, Ethiopia
                        </p>
                      </div>
                   </div>

                   <div className="flex items-start gap-4 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border-l-4 border-accent transition-all hover:shadow-lg group">
                      <div className="p-3 bg-white dark:bg-slate-700 rounded-full text-accent shadow-sm group-hover:bg-accent group-hover:text-primary transition-colors">
                        <Mail size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-2 text-slate-900 dark:text-white">Email Us</h4>
                        <p className="text-slate-600 dark:text-slate-400 mb-2">
                          <span className="font-medium text-slate-900 dark:text-slate-300">General Inquiries:</span><br />
                          <a href="mailto:info.consultancy@mu.edu.et" className="hover:text-primary transition-colors">info.consultancy@mu.edu.et</a>
                        </p>
                        <p className="text-slate-600 dark:text-slate-400">
                          <span className="font-medium text-slate-900 dark:text-slate-300">Support:</span><br />
                          <a href="mailto:support@mu.edu.et" className="hover:text-primary transition-colors">support@mu.edu.et</a>
                        </p>
                      </div>
                   </div>

                   <div className="flex items-start gap-4 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border-l-4 border-green-500 transition-all hover:shadow-lg group">
                      <div className="p-3 bg-white dark:bg-slate-700 rounded-full text-green-500 shadow-sm group-hover:bg-green-500 group-hover:text-white transition-colors">
                        <Phone size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-2 text-slate-900 dark:text-white">Call Us</h4>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">
                          <a href="tel:+251344404005" className="text-lg font-bold hover:text-primary transition-colors">+251 344 40 40 05</a>
                        </p>
                        <div className="flex items-center gap-2 text-sm text-slate-500 bg-white dark:bg-slate-700/50 px-3 py-1 rounded-full w-fit border border-slate-100 dark:border-slate-600">
                          <Clock size={14} />
                          <span>Mon - Fri, 8:00 AM - 5:00 PM</span>
                        </div>
                      </div>
                   </div>
                </div>
             </div>

             {/* Form */}
             <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 relative overflow-hidden">
                {/* Decorative blob */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
                
                <h2 className="text-3xl font-bold font-display mb-2 text-slate-900 dark:text-white relative z-10">Send a Message</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-8 relative z-10">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>
                
                <form className="space-y-6 relative z-10">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">First Name</label>
                      <input 
                        type="text" 
                        className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
                        placeholder="John" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Last Name</label>
                      <input 
                        type="text" 
                        className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
                        placeholder="Doe" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
                      placeholder="john@example.com" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Subject</label>
                    <select className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none">
                      <option>General Inquiry</option>
                      <option>Request for Quote</option>
                      <option>Partnership Proposal</option>
                      <option>Careers</option>
                    </select>
                  </div>
                   <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Message</label>
                    <textarea 
                      className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all h-40 resize-none" 
                      placeholder="How can we help you today?"
                    ></textarea>
                  </div>
                  <Button size="lg" className="w-full bg-primary text-white font-bold hover:bg-primary/90 py-6 rounded-xl shadow-lg shadow-primary/20">
                    Send Message <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </form>
             </div>
           </div>
        </div>
      </section>
      
      <Footer />
    </PageShell>
  );
}
