"use client";

import { useState, useRef } from "react";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";

interface ImageUploadProps {
    label: string;
    value: string;
    onChange: (url: string) => void;
}

export function ImageUpload({ label, value, onChange }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const { url } = await api.uploads.upload(file);
            // Construct absolute URL for preview
            const fullUrl = `${process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") || "http://localhost:3000"}${url}`;
            onChange(fullUrl);
        } catch (err) {
            console.error("Upload failed:", err);
            alert("Failed to upload image. Please try again.");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleRemove = () => {
        onChange("");
    };

    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                {label}
            </label>

            {value ? (
                <div className="relative group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 aspect-video bg-slate-50 dark:bg-slate-900/50 max-w-md">
                    <img
                        src={value}
                        alt="Preview"
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                        >
                            <Upload className="w-4 h-4 mr-2" />
                            Change
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={handleRemove}
                            disabled={isUploading}
                        >
                            <X className="w-4 h-4 mr-2" />
                            Remove
                        </Button>
                    </div>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="w-full max-w-md aspect-video rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-primary/50 dark:hover:border-primary/40 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-all flex flex-col items-center justify-center gap-3 group"
                >
                    <div className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:scale-110 transition-transform">
                        {isUploading ? (
                            <Loader2 className="w-6 h-6 text-primary animate-spin" />
                        ) : (
                            <ImageIcon className="w-6 h-6 text-slate-400 group-hover:text-primary transition-colors" />
                        )}
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                            {isUploading ? "Uploading..." : "Click to upload image"}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                            PNG, JPG, GIF up to 5MB
                        </p>
                    </div>
                </button>
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
            />
        </div>
    );
}
