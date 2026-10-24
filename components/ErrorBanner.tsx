"use client";

interface ErrorBannerProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorBanner({ message, onRetry }: ErrorBannerProps) {
  return (
    <div
      role="alert"
      className="animate-fade-up flex flex-col gap-3 rounded-2xl border border-danger/30 bg-danger/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="text-sm text-text">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex h-11 shrink-0 items-center justify-center rounded-xl border border-danger/40 bg-surface px-4 text-sm font-medium text-text transition hover:bg-accent-soft"
        >
          Попробовать снова
        </button>
      ) : null}
    </div>
  );
}
