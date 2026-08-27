import type { ErrorComponentProps } from "@tanstack/react-router";

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-6 text-center bg-bg text-fg">
      <h1 className="font-serif text-2xl italic">Something went wrong</h1>
      <p className="max-w-md text-sm break-words text-fg-muted">
        {error.message || "An unexpected error occurred. Try reloading the page."}
      </p>
    </main>
  );
}
