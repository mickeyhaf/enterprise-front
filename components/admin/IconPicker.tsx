import { useState, useRef, useEffect } from "react";
import { ICON_MAP, getIcon } from "@/lib/icon-map";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, X, ChevronDown, ChevronUp } from "lucide-react";

interface IconPickerProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

export function IconPicker({ label, value, onChange }: IconPickerProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const SelectedIcon = getIcon(value);

    // Shrink on scroll or click outside
    useEffect(() => {
        if (!isExpanded) return;

        const handleScroll = () => setIsExpanded(false);
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsExpanded(false);
            }
        };

        window.addEventListener("scroll", handleScroll, { capture: true });
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("scroll", handleScroll, { capture: true });
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isExpanded]);

    return (
        <div className="space-y-3" ref={containerRef}>
            <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    {label}
                </label>
            </div>

            {/* Compact View / Toggle Button */}
            <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className={cn(
                    "flex items-center gap-4 w-full px-4 py-3 rounded-xl border transition-all text-left",
                    isExpanded
                        ? "border-primary ring-2 ring-primary/10 bg-white dark:bg-slate-900"
                        : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 hover:border-primary/50"
                )}
            >
                <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center border",
                    value ? "bg-primary/10 border-primary/20 text-primary" : "bg-slate-100 dark:bg-slate-800 border-transparent text-slate-400"
                )}>
                    {value ? <SelectedIcon className="w-6 h-6" /> : <X className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {value ? value : "No icon selected"}
                    </p>
                    <p className="text-xs text-slate-500">
                        {isExpanded ? "Click to collapse" : "Click to choose symbol"}
                    </p>
                </div>
                {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>

            {/* Expanded Grid */}
            {isExpanded && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="max-h-64 overflow-y-auto p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
                        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                            <button
                                type="button"
                                onClick={() => {
                                    onChange("");
                                    setIsExpanded(false);
                                }}
                                className={cn(
                                    "relative flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-all border",
                                    value === ""
                                        ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                                        : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-primary/50 text-slate-600 dark:text-slate-400"
                                )}
                            >
                                <X className="w-5 h-5" />
                                <span className="text-[10px] font-medium truncate w-full text-center">None</span>
                                {value === "" && (
                                    <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                                        <Check className="w-2.5 h-2.5 text-primary" strokeWidth={4} />
                                    </div>
                                )}
                            </button>

                            {Object.entries(ICON_MAP).map(([name, Icon]) => {
                                const isSelected = value === name;
                                return (
                                    <button
                                        key={name}
                                        type="button"
                                        onClick={() => {
                                            onChange(isSelected ? "" : name);
                                            setIsExpanded(false);
                                        }}
                                        className={cn(
                                            "relative flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-all border",
                                            isSelected
                                                ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                                                : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-primary/50 text-slate-600 dark:text-slate-400"
                                        )}
                                        title={name}
                                    >
                                        <Icon className={cn("w-5 h-5", isSelected ? "text-white" : "text-current")} />
                                        <span className={cn("text-[10px] font-medium truncate w-full text-center", isSelected ? "text-white" : "text-slate-500")}>
                                            {name}
                                        </span>
                                        {isSelected && (
                                            <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                                                <Check className="w-2.5 h-2.5 text-primary" strokeWidth={4} />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

