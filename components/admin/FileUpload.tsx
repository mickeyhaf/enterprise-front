"use client";

import { useState, useRef } from "react";
import { Upload, X, FileIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";

interface FileUploadProps {
    label: string;
    value: string;
    onChange: (url: string) => void;
}

export function FileUpload({ label, value, onChange }: FileUploadProps) {
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
        } catch (err: any) {
            console.error("Upload failed:", err);
            alert(err?.response?.data?.message || err.message || "Failed to upload file. Please try again.");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleRemove = () => {
        onChange("");
    };

    // Extract filename from URL for display
    const fileName = value ? value.split('/').pop() || "Uploaded File" : "";

    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                {label}
            </label>

            {value ? (
                <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 max-w-md">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="p-2 bg-primary/10 text-primary rounded-lg shrink-0">
                            <FileIcon className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium truncate text-slate-700 dark:text-slate-300" title={fileName}>
                            {fileName}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-4">
                        <Button
                            type="button"
                            variant="outline"
                            size="icon-sm"
                            title="Change File"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                        >
                            <Upload className="w-4 h-4 text-slate-500" />
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon-sm"
                            title="Remove File"
                            onClick={handleRemove}
                            disabled={isUploading}
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="w-full max-w-md p-6 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-primary/50 dark:hover:border-primary/40 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-all flex flex-col items-center justify-center gap-3 group"
                >
                    <div className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:scale-110 transition-transform">
                        {isUploading ? (
                            <Loader2 className="w-6 h-6 text-primary animate-spin" />
                        ) : (
                            <FileIcon className="w-6 h-6 text-slate-400 group-hover:text-primary transition-colors" />
                        )}
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                            {isUploading ? "Uploading..." : "Click to upload a document"}
                        </p>
                        <p className="text-xs text-slate-500 mt-1 max-w-[200px] mx-auto leading-relaxed">
                            PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX up to 20MB
                        </p>
                    </div>
                </button>
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip"
                onChange={handleUpload}
                className="hidden"
            />
        </div>
    );
}
