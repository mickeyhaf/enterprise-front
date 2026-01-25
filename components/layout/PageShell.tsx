export function PageShell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`min-h-screen flex flex-col bg-background overflow-x-hidden ${className}`}>
      <main className="flex-grow">{children}</main>
    </div>
  );
}
