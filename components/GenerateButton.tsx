"use client";

interface GenerateButtonProps {
  loading: boolean;
  disabled?: boolean;
  label?: string;
}

export function GenerateButton({
  loading,
  disabled,
  label = "Сгенерировать сторис",
}: GenerateButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading || disabled}
      className="group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-accent px-6 py-3.5 text-base font-medium text-white shadow-[0_16px_36px_-20px_rgba(232,164,184,0.95)] transition duration-300 enabled:hover:-translate-y-0.5 enabled:hover:brightness-[0.98] enabled:hover:shadow-[0_22px_44px_-18px_rgba(232,164,184,1)] enabled:active:translate-y-0 enabled:active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
    >
      <span
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.28),transparent)] opacity-0 transition group-enabled:group-hover:opacity-100"
        aria-hidden
      />
      {loading ? (
        <>
          <span
            className="h-5 w-5 animate-spin-slow rounded-full border-2 border-white/30 border-t-white"
            aria-hidden
          />
          <span>Генерируем…</span>
        </>
      ) : (
        <>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.8" />
          </svg>
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
