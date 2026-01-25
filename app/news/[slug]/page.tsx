"use client";

import { use } from "react";
import { getNewsArticleBySlug } from "@/lib/news";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";

export default function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const article = getNewsArticleBySlug(slug);

    if (!article) {
        return (
            <PageShell>
                <Navbar />
                <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
                        <Link href="/news">
                            <Button>Return to News</Button>
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
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-slate-900/70"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="max-w-4xl mx-auto px-4 w-full text-white">
                        <Link href="/news" className="inline-flex items-center text-sm font-bold bg-white/10 hover:bg-white/20 backdrop-blur px-4 py-2 rounded-full mb-8 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to News
                        </Link>
                        <div className="inline-block bg-primary text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                            {article.category}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-display font-extrabold mb-6 max-w-4xl leading-tight">
                            {article.title}
                        </h1>
                        <div className="flex items-center gap-6 text-sm text-slate-200">
                            <span className="flex items-center gap-2">
                                <Calendar size={16} /> {article.date}
                            </span>
                            <span className="flex items-center gap-2">
                                <User size={16} /> {article.author}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <article className="py-16 bg-white dark:bg-slate-900">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        {article.content.split('\n\n').map((paragraph, index) => {
                            // Check if it's a heading
                            if (paragraph.startsWith('## ')) {
                                return (
                                    <h2 key={index} className="text-3xl font-display font-bold mt-12 mb-6 first:mt-0">
                                        {paragraph.replace('## ', '')}
                                    </h2>
                                );
                            }
                            // Check if it's a bold section title
                            if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                                return (
                                    <h3 key={index} className="text-xl font-bold mt-8 mb-4">
                                        {paragraph.replace(/\*\*/g, '')}
                                    </h3>
                                );
                            }
                            // Check if it's a list item section marker
                            if (paragraph.includes('**Day') || paragraph.includes('### ')) {
                                return (
                                    <h3 key={index} className="text-xl font-bold mt-8 mb-4">
                                        {paragraph.replace(/\*\*/g, '').replace('### ', '')}
                                    </h3>
                                );
                            }
                            // Regular paragraph
                            return (
                                <p key={index} className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                                    {paragraph.split('**').map((part, i) =>
                                        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                                    )}
                                </p>
                            );
                        })}
                    </div>

                    {/* Share/Back Section */}
                    <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-700">
                        <Link href="/news">
                            <Button variant="outline" className="font-bold">
                                <ArrowLeft className="w-4 h-4 mr-2" /> Back to All News
                            </Button>
                        </Link>
                    </div>
                </div>
            </article>

            <Footer />
        </PageShell>
    );
}
