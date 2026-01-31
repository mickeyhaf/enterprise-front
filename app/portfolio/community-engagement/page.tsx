"use client";

import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Users, Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { fetchEngagementPosts } from "@/lib/community-engagement";

export default function CommunityEngagementPage() {
    const { data: posts = [], isLoading } = useQuery({
        queryKey: ["engagement"],
        queryFn: fetchEngagementPosts,
    });
    return (
        <PageShell>
            <Navbar />

            {/* Hero Section */}
            <header className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                    <Image
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCtxVlcl-gnjzWsuPlV6PxBvqqR1hdBZEw6kBWG6u07uAL4mBktYhy_vE5wOVnSn86F4SyCqTNkBGnOAZFmT2L1J4BmV-j-41sFOkGVi8H-0b63_se1gelW8aW-bmS1k3fa9-ZtNaRirti2pAl6mFEsKhuUTT_tzlyw3jIr0ilKu2CSyndyw73u-KJsjEJvJndBI3P1cV0zIvFyIPAeVCnzK4M3400wYIaIvX668JrC7NiRwlEeOjKg8DF97Gd31pFa7i1j4zIkZQZ"
                        alt="Community engagement hero"
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
                            <Users size={16} />
                            Community Engagement
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-6 leading-[1.1]">
                            Impact & <span className="text-accent italic">Service</span>
                        </h1>
                        <p className="text-lg text-slate-100 mb-8 max-w-xl font-light">
                            Mekelle University is dedicated to fostering growth and resilience through direct community service, consultancy, and sustainable development initiatives.
                        </p>
                    </div>
                </div>
            </header>

            {/* Engagement Posts Grid Section */}
            <section className="py-32 bg-slate-50 dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionHeader
                        title="Engagement Projects"
                        description="Explore our recent activities and impact in the communities we serve."
                        centered
                        className="mb-20"
                    />

                    {isLoading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-96 bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse" />
                            ))}
                        </div>
                    ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((item) => (
                            <div key={item.id} className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-2xl transition-all duration-500 flex flex-col h-full hover:-translate-y-1">
                                <div className="relative h-64 w-full overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                                        {item.category ?? "Engagement"}
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex items-center gap-6 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
                                        <span className="flex items-center gap-2"><Calendar size={14} className="text-primary" /> {item.date}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold font-display mb-4 group-hover:text-primary transition-colors line-clamp-2 leading-tight">{item.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 mb-8 text-base flex-grow leading-relaxed line-clamp-3 font-light">
                                        {item.excerpt}
                                    </p>
                                    <Link href={`/portfolio/community-engagement/${item.slug}`} className="inline-flex items-center text-primary font-bold text-sm hover:gap-3 transition-all group/link mt-auto">
                                        View Details <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    )}

                    {posts.length > 0 && (
                    <div className="mt-20 flex justify-center items-center gap-3">
                        <Button variant="outline" size="icon" className="w-12 h-12 rounded-xl border-slate-200 dark:border-slate-800" disabled>
                            <ChevronLeft className="w-5 h-5" />
                        </Button>
                        <Button variant="default" size="icon" className="w-12 h-12 rounded-xl bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20">
                            1
                        </Button>
                        <Button variant="outline" size="icon" className="w-12 h-12 rounded-xl border-slate-200 dark:border-slate-800 hover:bg-primary hover:text-white transition-all shadow-sm">
                            <ChevronRight className="w-5 h-5" />
                        </Button>
                    </div>
                    )}
                </div>
            </section>


            <Footer />
        </PageShell>
    );
}
