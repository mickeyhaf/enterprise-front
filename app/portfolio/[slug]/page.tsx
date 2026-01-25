"use client";

import { use, useState } from "react";
import { getProjectBySlug } from "@/lib/projects";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, Building } from "lucide-react";
import { QuoteModal } from "@/components/services/QuoteModal";

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const project = getProjectBySlug(slug);
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!project) {
        return (
            <PageShell>
                <Navbar />
                <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-6">Project Not Found</h1>
                        <Link href="/portfolio">
                            <Button className="h-12 px-8 rounded-xl font-bold">Return to Portfolio</Button>
                        </Link>
                    </div>
                </div>
                <Footer />
            </PageShell>
        );
    }

    return (
        <PageShell>
            <Navbar />

            {/* Hero Section */}
            <div className="relative h-[65vh] min-h-[500px] w-full">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-[2px]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
                        <Link href="/portfolio" className="inline-flex items-center text-[10px] font-bold bg-white/10 hover:bg-white/20 backdrop-blur px-5 py-2 rounded-full mb-10 transition-all uppercase tracking-[0.2em] border border-white/10">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Portfolio
                        </Link>
                        <div className="flex items-center gap-3 text-accent font-bold uppercase tracking-[0.2em] text-[11px] mb-6">
                            <project.icon size={16} />
                            {project.category}
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-8 max-w-5xl leading-[1.1]">
                            {project.title}
                        </h1>
                    </div>
                </div>
            </div>

            <section className="py-32 bg-white dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-20">

                        {/* Sidebar / Key Details */}
                        <div className="lg:col-span-1 order-2 lg:order-1">
                            <div className="bg-slate-50 dark:bg-slate-950/50 rounded-2xl p-10 border border-slate-200 dark:border-slate-800 sticky top-28 shadow-sm">
                                <h3 className="text-2xl font-bold font-display mb-8 border-b border-slate-200 dark:border-slate-800 pb-6 text-slate-900 dark:text-white uppercase tracking-wider text-sm">Project Overview</h3>

                                <div className="space-y-8">
                                    {project.location && (
                                        <div className="group">
                                            <div className="flex items-center gap-3 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2 group-hover:text-primary transition-colors">
                                                <MapPin size={14} /> Location
                                            </div>
                                            <div className="font-bold text-slate-900 dark:text-white text-lg">{project.location}</div>
                                        </div>
                                    )}

                                    {project.year && (
                                        <div className="group">
                                            <div className="flex items-center gap-3 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2 group-hover:text-primary transition-colors">
                                                <Calendar size={14} /> Year
                                            </div>
                                            <div className="font-bold text-slate-900 dark:text-white text-lg">{project.year}</div>
                                        </div>
                                    )}

                                    {project.client && (
                                        <div className="group">
                                            <div className="flex items-center gap-3 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2 group-hover:text-primary transition-colors">
                                                <Building size={14} /> Client
                                            </div>
                                            <div className="font-bold text-slate-900 dark:text-white text-lg">{project.client}</div>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-10 pt-10 border-t border-slate-200 dark:border-slate-800">
                                    <Button className="w-full h-14 font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all" onClick={() => setIsModalOpen(true)}>
                                        Request Similar Service
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-2 order-1 lg:order-2">
                            <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-extrabold prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:font-light prose-p:leading-relaxed">
                                <h2 className="text-4xl mb-8">The Challenge</h2>
                                <p className="mb-16">
                                    {project.challenge}
                                </p>

                                <h2 className="text-4xl mb-8">Our Solution</h2>
                                <p className="mb-16">
                                    {project.solution}
                                </p>

                                <div className="rounded-3xl p-10 border border-primary/20 bg-primary/5 dark:bg-primary/10 relative overflow-hidden my-16">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                                    <h2 className="text-3xl mb-6 text-primary !mt-0">Key Impact</h2>
                                    <p className="text-2xl font-medium text-slate-900 dark:text-white leading-tight !mb-0 italic">
                                        "{project.impact}"
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <QuoteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                itemName={project.title}
                itemType="service"
                interestOptions={[project.category]}
            />

            <Footer />
        </PageShell>
    );
}
