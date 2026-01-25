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
                        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                        <Link href="/portfolio">
                            <Button>Return to Portfolio</Button>
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
            <div className="relative h-[60vh] min-h-[400px] w-full">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-slate-900/60"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="max-w-7xl mx-auto px-4 w-full text-white">
                        <Link href="/portfolio" className="inline-flex items-center text-sm font-bold bg-white/10 hover:bg-white/20 backdrop-blur px-4 py-2 rounded-full mb-8 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Portfolio
                        </Link>
                        <div className="flex items-center gap-2 text-accent font-bold uppercase tracking-wider mb-4">
                            <project.icon className="w-5 h-5" />
                            {project.category}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-display font-extrabold mb-6 max-w-4xl">
                            {project.title}
                        </h1>
                    </div>
                </div>
            </div>

            <section className="py-24 bg-white dark:bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-16">

                        {/* Sidebar / Key Details */}
                        <div className="lg:col-span-1 order-2 lg:order-1">
                            <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 sticky top-24">
                                <h3 className="text-xl font-bold font-display mb-6 border-b border-slate-200 dark:border-slate-700 pb-4">Project Overview</h3>

                                <div className="space-y-6">
                                    {project.location && (
                                        <div>
                                            <div className="flex items-center gap-2 text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">
                                                <MapPin size={14} /> Location
                                            </div>
                                            <div className="font-semibold">{project.location}</div>
                                        </div>
                                    )}

                                    {project.year && (
                                        <div>
                                            <div className="flex items-center gap-2 text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">
                                                <Calendar size={14} /> Year
                                            </div>
                                            <div className="font-semibold">{project.year}</div>
                                        </div>
                                    )}

                                    {project.client && (
                                        <div>
                                            <div className="flex items-center gap-2 text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">
                                                <Building size={14} /> Client
                                            </div>
                                            <div className="font-semibold">{project.client}</div>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
                                    <Button className="w-full font-bold" onClick={() => setIsModalOpen(true)}>
                                        Request Similar Service
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-2 order-1 lg:order-2">
                            <div className="prose dark:prose-invert max-w-none">
                                <h2 className="text-3xl font-display font-bold mb-6">The Challenge</h2>
                                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-12">
                                    {project.challenge}
                                </p>

                                <h2 className="text-3xl font-display font-bold mb-6">Our Solution</h2>
                                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-12">
                                    {project.solution}
                                </p>

                                <div className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-8 border border-primary/20 my-12">
                                    <h2 className="text-3xl font-display font-bold mb-4 text-primary">Key Impact</h2>
                                    <p className="text-xl font-medium text-slate-900 dark:text-white leading-relaxed">
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
