"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { Lock, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api-client";

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token") ?? "";

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [hasToken, setHasToken] = useState(true);

    useEffect(() => {
        setHasToken(!!token);
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setStatus("error");
            setErrorMessage("Passwords do not match.");
            return;
        }
        if (password.length < 8) {
            setStatus("error");
            setErrorMessage("Password must be at least 8 characters.");
            return;
        }
        setStatus("submitting");
        setErrorMessage("");
        try {
            await api.resetPassword(token, password);
            setStatus("success");
            setTimeout(() => router.push("/login"), 2000);
        } catch (err) {
            setStatus("error");
            setErrorMessage(err instanceof Error ? err.message : "Invalid or expired reset link. Please request a new one.");
        }
    };

    if (!hasToken) {
        return (
            <PageShell>
                <Navbar />
                <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 py-6">
                    <div className="max-w-md w-full mx-4">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-8 text-center">
                            <h1 className="text-2xl font-display font-extrabold mb-4 text-slate-900 dark:text-white">Invalid Reset Link</h1>
                            <p className="text-slate-600 dark:text-slate-400 mb-6">
                                This password reset link is invalid or has expired. Please request a new one.
                            </p>
                            <Link href="/forgot-password">
                                <Button className="bg-primary text-white font-bold hover:bg-primary/90">
                                    Request New Link <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </PageShell>
        );
    }

    return (
        <PageShell>
            <Navbar />

            <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 py-6">
                <div className="max-w-md w-full mx-4">

                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">

                        <div className="bg-primary text-white p-8 text-center">
                            <h1 className="text-3xl font-display font-extrabold mb-2">Reset Password</h1>
                            <p className="text-slate-100">Enter your new password below</p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            {status === "success" && (
                                <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 text-sm">
                                    Your password has been updated. Redirecting to login...
                                </div>
                            )}
                            {status === "error" && (
                                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 text-sm">
                                    {errorMessage}
                                </div>
                            )}

                            {status !== "success" && (
                                <>
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                            New Password
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Lock className="h-5 w-5 text-slate-400" />
                                            </div>
                                            <input
                                                id="password"
                                                type="password"
                                                required
                                                minLength={8}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                disabled={status === "submitting"}
                                                className="block w-full pl-12 pr-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 transition-colors disabled:opacity-60"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Must be at least 8 characters</p>
                                    </div>

                                    <div>
                                        <label htmlFor="confirmPassword" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                            Confirm Password
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Lock className="h-5 w-5 text-slate-400" />
                                            </div>
                                            <input
                                                id="confirmPassword"
                                                type="password"
                                                required
                                                minLength={8}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                disabled={status === "submitting"}
                                                className="block w-full pl-12 pr-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 transition-colors disabled:opacity-60"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={status === "submitting"}
                                        className="w-full h-14 bg-primary text-white font-bold hover:bg-primary/90 py-3 text-base rounded-xl shadow-lg shadow-primary/20 disabled:opacity-60"
                                    >
                                        {status === "submitting" ? "Updating..." : "Reset Password"} <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </>
                            )}

                            <Link
                                href="/login"
                                className="flex items-center justify-center gap-2 text-sm font-bold text-primary hover:underline"
                            >
                                <ArrowLeft className="w-4 h-4" /> Back to Login
                            </Link>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </PageShell>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <PageShell>
                <Navbar />
                <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
                    <div className="animate-pulse text-slate-500">Loading...</div>
                </div>
                <Footer />
            </PageShell>
        }>
            <ResetPasswordForm />
        </Suspense>
    );
}
