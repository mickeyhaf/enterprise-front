import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPolicyPage() {
    const lastUpdated = "January 25, 2026";

    return (
        <PageShell>
            <Navbar />

            {/* Standard Hero for Legal Pages */}
            <header className="bg-primary text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/5 [mask:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.8))]"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-white/10">
                        <Lock size={14} className="text-accent" />
                        Data Protection
                    </div>
                    <h1 className="text-5xl md:text-6xl font-display font-extrabold mb-4 leading-tight">Privacy Policy</h1>
                    <p className="text-slate-300 font-light max-w-2xl mx-auto">
                        Your privacy is important to us. This policy outlines how we handle and protect your personal data at MU Consultancy & Business Enterprise.
                    </p>
                </div>
            </header>

            <section className="py-24 bg-white dark:bg-slate-950">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-extrabold prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:font-light prose-p:leading-relaxed">

                        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 mb-16 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <FileText className="text-primary" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold uppercase tracking-wider text-slate-400">Effective Date</div>
                                    <div className="font-bold text-slate-900 dark:text-white">{lastUpdated}</div>
                                </div>
                            </div>
                            <div className="hidden sm:block text-right">
                                <p className="text-sm text-slate-500">Version 1.0</p>
                            </div>
                        </div>

                        <h2>1. Introduction</h2>
                        <p>
                            MU Consultancy & Business Enterprise ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                        </p>

                        <h2>2. Information We Collect</h2>
                        <p>
                            We may collect information about you in a variety of ways. The information we may collect on the site includes:
                        </p>
                        <ul>
                            <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, that you voluntarily give to us when you request services or information.</li>
                            <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the site, such as your IP address, your browser type, your operating system, and your access times.</li>
                        </ul>

                        <h2>3. Use of Your Information</h2>
                        <p>
                            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the site to:
                        </p>
                        <ul>
                            <li>Deliver specialized consultancy and trade services.</li>
                            <li>Improve our website and service offerings.</li>
                            <li>Send you administrative information and service updates.</li>
                            <li>Respond to your quote requests and inquiries.</li>
                        </ul>

                        <div className="my-16 bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-3xl p-10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            <h3 className="text-2xl text-primary !mt-0 flex items-center gap-3">
                                <Shield size={24} /> Data Security Commitment
                            </h3>
                            <p className="italic">
                                "We implement robust technical and organizational security measures to protect the integrity and confidentiality of your data against unauthorized access, alteration, or destruction."
                            </p>
                        </div>

                        <h2>4. Disclosure of Your Information</h2>
                        <p>
                            We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
                        </p>
                        <ul>
                            <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process.</li>
                            <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf.</li>
                        </ul>

                        <h2>5. Contact Us</h2>
                        <p>
                            If you have questions or comments about this Privacy Policy, please contact us at:
                        </p>
                        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 mt-8">
                            <p className="font-bold text-slate-900 dark:text-white !mb-1">MU Consultancy & Business Enterprise</p>
                            <p className="!mb-1">Main Campus, Mekelle</p>
                            <p className="!mb-4">Tigray, Ethiopia</p>
                            <p className="font-bold text-primary">info.consultancy@mu.edu.et</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </PageShell>
    );
}
