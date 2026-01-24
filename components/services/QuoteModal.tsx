"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  itemType: "product" | "service";
}

export function QuoteModal({ isOpen, onClose, itemName, itemType }: QuoteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <X size={24} />
        </button>
        
        <div className="mb-6">
          <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-2">Request a Quote</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Please fill out the form below to receive a quotation for <span className="font-bold text-primary">{itemName}</span>.
          </p>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Quote request submitted!"); onClose(); }}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
              <input 
                id="name" 
                type="text" 
                required
                className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-medium text-slate-700 dark:text-slate-300">Company (Optional)</label>
              <input 
                id="company" 
                type="text" 
                className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Company Ltd."
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
            <input 
              id="email" 
              type="email" 
              required
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="john@example.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="details" className="text-sm font-medium text-slate-700 dark:text-slate-300">Project Details / Requirements</label>
            <textarea 
              id="details" 
              rows={4}
              required
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              placeholder={`Please describe your requirements for ${itemName}...`}
            ></textarea>
          </div>

          <input type="hidden" name="item_name" value={itemName} />
          <input type="hidden" name="item_type" value={itemType} />

          <Button type="submit" className="w-full text-base py-6 font-bold">
            Submit Request
          </Button>
        </form>
      </div>
    </div>
  );
}
