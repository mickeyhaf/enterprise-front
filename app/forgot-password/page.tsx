"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api-client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    try {
      await api.forgotPassword(email);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <PageShell>
      <Navbar />

      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 py-6">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="bg-primary text-white p-8 text-center">
              <h1 className="text-3xl font-display font-extrabold mb-2">Forgot Password</h1>
              <p className="text-slate-100">Enter your email and we&apos;ll send you a reset link</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {status === "success" && (
                <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 text-sm">
                  If an account exists with this email, you will receive a password reset link shortly.
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
                    <label htmlFor="email" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={status === "submitting"}
                        className="block w-full pl-12 pr-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 transition-colors disabled:opacity-60"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full h-14 bg-primary text-white font-bold hover:bg-primary/90 py-3 text-base rounded-xl shadow-lg shadow-primary/20 disabled:opacity-60"
                  >
                    {status === "submitting" ? "Sending..." : "Send Reset Link"} <ArrowRight className="ml-2 w-5 h-5" />
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
