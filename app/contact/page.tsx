import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <PageShell>
      <Navbar />
      <div className="bg-slate-50 dark:bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-6">Contact Us</h1>
           <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl">
             Get in touch with us for quotes, consultations, or partnerships.
           </p>
        </div>
      </div>

      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid lg:grid-cols-2 gap-16">
             {/* Contact Info */}
             <div>
                <h2 className="text-2xl font-bold font-display mb-8">Contact Information</h2>
                <div className="space-y-8">
                   <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg text-primary">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">Visit Us</h4>
                        <p className="text-slate-600 dark:text-slate-400">
                          Main Campus, Mekelle University<br />
                          Mekelle, Tigray, Ethiopia
                        </p>
                      </div>
                   </div>

                   <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg text-primary">
                        <Mail size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">Email Us</h4>
                        <p className="text-slate-600 dark:text-slate-400">
                          info.consultancy@mu.edu.et<br />
                          support@mu.edu.et
                        </p>
                      </div>
                   </div>

                   <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg text-primary">
                        <Phone size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">Call Us</h4>
                        <p className="text-slate-600 dark:text-slate-400">
                          +251 344 40 40 05<br />
                          Mon - Fri, 8am - 5pm
                        </p>
                      </div>
                   </div>
                </div>
             </div>

             {/* Form */}
             <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-800">
                <h2 className="text-2xl font-bold font-display mb-6">Send a Message</h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">First Name</label>
                      <input type="text" className="w-full p-3 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Last Name</label>
                      <input type="text" className="w-full p-3 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <input type="email" className="w-full p-3 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900" placeholder="john@example.com" />
                  </div>
                   <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <textarea className="w-full p-3 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 h-32" placeholder="How can we help you?"></textarea>
                  </div>
                  <Button className="w-full bg-primary text-white hover:bg-primary/90">Send Message</Button>
                </form>
             </div>
           </div>
        </div>
      </section>
      <Footer />
    </PageShell>
  );
}
