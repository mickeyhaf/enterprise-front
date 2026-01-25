import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { Cookie, Info, Settings, ShieldAlert } from "lucide-react";

export default function CookiesPolicyPage() {
    const lastUpdated = "January 25, 2026";

    return (
        <PageShell>
            <Navbar />

            {/* Hero Section */}
            <header className="bg-primary text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/5 [mask:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.8))]"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-white/10">
                        <Cookie size={14} className="text-accent" />
                        Cookie Usage
                    </div>
                    <h1 className="text-5xl md:text-6xl font-display font-extrabold mb-4 leading-tight">Cookies Policy</h1>
                    <p className="text-slate-300 font-light max-w-2xl mx-auto">
                        This policy explains how we use cookies and similar technologies to recognize you when you visit our website.
                    </p>
                </div>
            </header>

            <section className="py-24 bg-white dark:bg-slate-950">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-extrabold prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:font-light prose-p:leading-relaxed">

                        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 mb-16 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Info className="text-primary" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold uppercase tracking-wider text-slate-400">Policy Date</div>
                                    <div className="font-bold text-slate-900 dark:text-white">{lastUpdated}</div>
                                </div>
                            </div>
                            <div className="hidden sm:block text-right">
                                <p className="text-sm text-slate-500">Cookie Management</p>
                            </div>
                        </div>

                        <h2>1. What are Cookies?</h2>
                        <p>
                            Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
                        </p>

                        <h2>2. Why We Use Cookies</h2>
                        <p>
                            We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies.
                        </p>

                        <div className="my-16 grid gap-8">
                            <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                                <h3 className="text-xl font-bold flex items-center gap-3 !mt-0">
                                    <Settings size={20} className="text-primary" /> Essential Cookies
                                </h3>
                                <p className="text-base text-slate-500 dark:text-slate-400 font-light !mb-0">
                                    These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas.
                                </p>
                            </div>
                            <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                                <h3 className="text-xl font-bold flex items-center gap-3 !mt-0">
                                    <Settings size={20} className="text-primary" /> Analytics & Customization
                                </h3>
                                <p className="text-base text-slate-500 dark:text-slate-400 font-light !mb-0">
                                    These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are.
                                </p>
                            </div>
                        </div>

                        <h2>3. How Can I Control Cookies?</h2>
                        <p>
                            You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in your web browser. As the means by which you can refuse cookies through your web browser controls vary from browser-to-browser, you should visit your browser's help menu for more information.
                        </p>

                        <div className="mt-16 p-8 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 flex gap-6 items-start">
                            <ShieldAlert size={24} className="shrink-0 text-amber-500" />
                            <div>
                                <h4 className="font-bold !mt-0">Note on Disabling Cookies</h4>
                                <p className="text-base !mb-0">
                                    If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
                                </p>
                            </div>
                        </div>

                        <h2 className="mt-16">4. More Information</h2>
                        <p>
                            If you would like more information about how we use cookies on our website, please feel free to contact us at:
                        </p>
                        <p className="font-bold text-primary">info.consultancy@mu.edu.et</p>
                    </div>
                </div>
            </section>

            <Footer />
        </PageShell>
    );
}
