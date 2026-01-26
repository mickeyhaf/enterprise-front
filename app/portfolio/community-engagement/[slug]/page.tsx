"use client";

import { use } from "react";
import { getEngagementPostBySlug } from "@/lib/community-engagement";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Users } from "lucide-react";

export default function EngagementPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const post = getEngagementPostBySlug(slug);

    if (!post) {
        return (
            <PageShell>
                <Navbar />
                <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4 font-display">Activity Not Found</h1>
                        <Link href="/portfolio/community-engagement">
                            <Button className="rounded-xl px-8 py-6 font-bold">Return to Engagement</Button>
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
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-slate-900/75 backdrop-blur-[2px]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
                        <Link href="/portfolio/community-engagement" className="inline-flex items-center text-[10px] font-bold bg-white/10 hover:bg-white/20 backdrop-blur px-5 py-2 rounded-full mb-10 transition-all uppercase tracking-[0.2em] border border-white/10">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Engagement
                        </Link>
                        <div className="inline-block bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-widest shadow-lg">
                            {post.category}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-display font-extrabold mb-8 max-w-4xl leading-[1.1]">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-slate-300">
                            <span className="flex items-center gap-2">
                                <Calendar size={16} className="text-accent" /> {post.date}
                            </span>
                            <span className="flex items-center gap-2">
                                <Users size={16} className="text-accent" /> {post.author}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Post Content */}
            <article className="py-32 bg-white dark:bg-slate-900/50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-extrabold prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:font-light prose-p:leading-relaxed">
                        {post.content.split('\n\n').map((paragraph, index) => {
                            // Check if it's a heading
                            if (paragraph.startsWith('## ')) {
                                return (
                                    <h2 key={index} className="text-3xl mt-12 mb-6 first:mt-0 font-display font-bold">
                                        {paragraph.replace('## ', '')}
                                    </h2>
                                );
                            }
                            // Regular paragraph
                            return (
                                <p key={index} className="mb-6">
                                    {paragraph.split('**').map((part, i) =>
                                        i % 2 === 1 ? <strong key={i} className="font-bold text-slate-900 dark:text-white">{part}</strong> : part
                                    ) || paragraph}
                                </p>
                            );
                        })}
                    </div>

                    <div className="mt-20 pt-10 border-t border-slate-200 dark:border-slate-800">
                        <Link href="/portfolio/community-engagement">
                            <Button variant="outline" className="font-bold h-12 px-6 rounded-xl border-slate-200 dark:border-slate-700 hover:bg-primary hover:text-white transition-all group">
                                <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" /> Back to All Activities
                            </Button>
                        </Link>
                    </div>
                </div>
            </article>

            <Footer />
        </PageShell>
    );
}
