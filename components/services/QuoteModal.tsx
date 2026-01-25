"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  itemType: "product" | "service";
  interestOptions?: string[];
}

export function QuoteModal({ isOpen, onClose, itemName, itemType, interestOptions = [] }: QuoteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-2xl lg:max-w-4xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-8 animate-in fade-in zoom-in-95 duration-200 max-h-[calc(100vh-2rem)] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-2">Request a Quote</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Fill out the form below and we'll get back to you with a customized quote for your needs.
          </p>
        </div>

        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Quote request submitted!");
            onClose();
          }}
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-bold text-slate-700 dark:text-slate-300">Full Name *</label>
              <input
                id="name"
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-bold text-slate-700 dark:text-slate-300">Email Address *</label>
              <input
                id="email"
                type="email"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-bold text-slate-700 dark:text-slate-300">Phone Number</label>
              <input
                id="phone"
                type="tel"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="+251 111 223 344"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-bold text-slate-700 dark:text-slate-300">Company Name</label>
              <input
                id="company"
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="Your Company"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="interest" className="text-sm font-bold text-slate-700 dark:text-slate-300">Product/Service Interest *</label>
            <select
              id="interest"
              name="interest"
              required
              defaultValue={itemName}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
            >
              {/* Always include selected item, even if not present in list */}
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
              <label htmlFor="quantity" className="text-sm font-bold text-slate-700 dark:text-slate-300">Estimated Quantity</label>
              <input
                id="quantity"
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="e.g., 100 units, 500 kg, etc."
              />
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="details" className="text-sm font-bold text-slate-700 dark:text-slate-300">Additional Details *</label>
            <textarea
              id="details"
              rows={4}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all h-32 resize-none"
              placeholder="Tell us more about your requirements, timeline, or any specific needs..."
            ></textarea>
          </div>

          <input type="hidden" name="item_name" value={itemName} />
          <input type="hidden" name="item_type" value={itemType} />

          <Button
            type="submit"
            className="w-full h-14 text-base font-bold bg-primary text-white hover:bg-primary/90 rounded-xl shadow-lg shadow-primary/20 transition-all"
          >
            Submit Quote Request
          </Button>
        </form>
      </div>
    </div>
  );
}
