import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { Scale, ShieldCheck, AlertCircle, FileCheck } from "lucide-react";

export default function TermsOfServicePage() {
    const lastUpdated = "January 25, 2026";

    return (
        <PageShell>
            <Navbar />

            {/* Hero Section */}
            <header className="bg-primary text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/5 [mask:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.8))]"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-white/10">
                        <Scale size={14} className="text-accent" />
                        Legal Agreement
                    </div>
                    <h1 className="text-5xl md:text-6xl font-display font-extrabold mb-4 leading-tight">Terms of Service</h1>
                    <p className="text-slate-300 font-light max-w-2xl mx-auto">
                        Please read these terms carefully before using our services. By accessing our site, you agree to be bound by these terms.
                    </p>
                </div>
            </header>

            <section className="py-24 bg-white dark:bg-slate-950">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-extrabold prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:font-light prose-p:leading-relaxed">

                        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 mb-16 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <FileCheck className="text-primary" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold uppercase tracking-wider text-slate-400">Review Date</div>
                                    <div className="font-bold text-slate-900 dark:text-white">{lastUpdated}</div>
                                </div>
                            </div>
                            <div className="hidden sm:block text-right">
                                <p className="text-sm text-slate-500">Service Agreement</p>
                            </div>
                        </div>

                        <h2>1. Agreement to Terms</h2>
                        <p>
                            These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and MU Consultancy & Business Enterprise ("we," "us," or "our"), concerning your access to and use of our website and services.
                        </p>

                        <h2>2. Intellectual Property Rights</h2>
                        <p>
                            Unless otherwise indicated, the Site and Services are our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") are owned or controlled by us.
                        </p>

                        <div className="my-16 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 rounded-3xl p-10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            <h3 className="text-2xl text-amber-700 dark:text-amber-500 !mt-0 flex items-center gap-3">
                                <AlertCircle size={24} /> User Responsibility
                            </h3>
                            <p className="italic">
                                "Users are responsible for ensuring that all information provided for consultancy or trade inquiries is accurate, current, and complete."
                            </p>
                        </div>

                        <h2>3. User Representations</h2>
                        <p>
                            By using the site, you represent and warrant that:
                        </p>
                        <ul>
                            <li>All registration information you submit will be true, accurate, current, and complete.</li>
                            <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
                            <li>You are not a minor in the jurisdiction in which you reside.</li>
                            <li>You will not use the site for any illegal or unauthorized purpose.</li>
                        </ul>

                        <h2>4. Prohibited Activities</h2>
                        <p>
                            You may not access or use the site for any purpose other than that for which we make the site available. The site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
                        </p>

                        <h2>5. Service Modifications</h2>
                        <p>
                            We reserve the right to change, modify, or remove the contents of the site at any time or for any reason at our sole discretion without notice. We also reserve the right to modify or discontinue all or part of our services without notice at any time.
                        </p>

                        <div className="mt-16 p-8 rounded-2xl bg-primary text-white">
                            <h3 className="text-white !mt-0 flex items-center gap-3">
                                <ShieldCheck size={24} className="text-accent" /> Professional Integrity
                            </h3>
                            <p className="opacity-90 font-light !mb-0">
                                MU Consultancy & Business Enterprise adheres to the highest standards of professional and academic ethics as established by Mekelle University.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </PageShell>
    );
}
