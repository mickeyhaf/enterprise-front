"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  itemType: "product" | "service";
  interestOptions?: string[];
}

export function QuoteModal({
  isOpen,
  onClose,
  itemName,
  itemType,
  interestOptions = [],
}: QuoteModalProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const resetForm = () => {
    setStatus("idle");
    setErrorMessage("");
    const form = document.getElementById("quote-form") as HTMLFormElement;
    form?.reset();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={handleClose}
      ></div>
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-2xl lg:max-w-4xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-8 animate-in fade-in zoom-in-95 duration-200 max-h-[calc(100vh-2rem)] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-2">
            Request a Quote
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Fill out the form below and we&apos;ll get back to you with a
            customized quote for your needs.
          </p>
        </div>

        {status === "success" && (
          <div className="mb-6 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200">
            Thank you! Your quote request has been submitted. We&apos;ll get back
            to you shortly.
          </div>
        )}

        {status === "error" && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200">
            {errorMessage}
          </div>
        )}

        <form
          id="quote-form"
          className="space-y-6"
          onSubmit={async (e) => {
            e.preventDefault();
            setStatus("submitting");
            setErrorMessage("");

            const form = e.currentTarget;
            const formData = new FormData(form);

            const data = {
              fullName: formData.get("name") as string,
              email: formData.get("email") as string,
              phone: (formData.get("phone") as string) || undefined,
              company: (formData.get("company") as string) || undefined,
              productServiceInterest: formData.get("interest") as string,
              quantity: (formData.get("quantity") as string) || undefined,
              additionalDetails: (formData.get("details") as string) || undefined,
            };

            try {
              await api.submitQuote(data);
              setStatus("success");
              setTimeout(handleClose, 2000);
            } catch (err) {
              setStatus("error");
              setErrorMessage(
                err instanceof Error ? err.message : "Something went wrong. Please try again."
              );
            }
          }}
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-bold text-slate-700 dark:text-slate-300"
              >
                Full Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                disabled={status === "submitting"}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-60"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-bold text-slate-700 dark:text-slate-300"
              >
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                disabled={status === "submitting"}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-60"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="text-sm font-bold text-slate-700 dark:text-slate-300"
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                disabled={status === "submitting"}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-60"
                placeholder="+251 111 223 344"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="company"
                className="text-sm font-bold text-slate-700 dark:text-slate-300"
              >
                Company Name
              </label>
              <input
                id="company"
                name="company"
                type="text"
                disabled={status === "submitting"}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-60"
                placeholder="Your Company"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="interest"
              className="text-sm font-bold text-slate-700 dark:text-slate-300"
            >
              Product/Service Interest *
            </label>
            <select
              id="interest"
              name="interest"
              required
              defaultValue={itemName}
              disabled={status === "submitting"}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none disabled:opacity-60"
            >
              <option value={itemName}>{itemName}</option>
              {interestOptions
                .filter((v) => v && v !== itemName)
                .map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
            </select>
          </div>

          {itemType === "product" && (
            <div className="space-y-2">
              <label
                htmlFor="quantity"
                className="text-sm font-bold text-slate-700 dark:text-slate-300"
              >
                Estimated Quantity
              </label>
              <input
                id="quantity"
                name="quantity"
                type="text"
                disabled={status === "submitting"}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-60"
                placeholder="e.g., 100 units, 500 kg, etc."
              />
            </div>
          )}

          <div className="space-y-2">
            <label
              htmlFor="details"
              className="text-sm font-bold text-slate-700 dark:text-slate-300"
            >
              Additional Details *
            </label>
            <textarea
              id="details"
              name="details"
              rows={4}
              required
              disabled={status === "submitting"}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all h-32 resize-none disabled:opacity-60"
              placeholder="Tell us more about your requirements, timeline, or any specific needs..."
            ></textarea>
          </div>

          <Button
            type="submit"
            disabled={status === "submitting"}
            className="w-full h-14 text-base font-bold bg-primary text-white hover:bg-primary/90 rounded-xl shadow-lg shadow-primary/20 transition-all disabled:opacity-60"
          >
            {status === "submitting"
              ? "Submitting..."
              : "Submit Quote Request"}
          </Button>
        </form>
      </div>
    </div>
  );
}
