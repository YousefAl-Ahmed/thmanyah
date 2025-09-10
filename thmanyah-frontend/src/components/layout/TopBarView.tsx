// src/components/layout/topbar/TopBarView.tsx
'use client';

type TopBarViewProps = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  onForward: () => void;
  placeholder: string;
  onFocusPlaceholder: () => void;
  onBlurPlaceholder: () => void;
};

export default function TopBarView({
  value,
  onChange,
  onSubmit,
  onBack,
  onForward,
  placeholder,
  onFocusPlaceholder,
  onBlurPlaceholder,
}: TopBarViewProps) {
  return (
    <header className="sticky top-0 z-30 bg-[#0f1115]/80 backdrop-blur supports-[backdrop-filter]:bg-[#0f1115]/60">
      <div className="grid grid-cols-[auto,1fr,auto] items-center gap-4 px-8 py-3">
        {/* Left controls */}
        <div className="flex items-center gap-2 text-gray-400">
          <button
            onClick={onBack}
            className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 hover:bg-white/5"
          >
            ‹
          </button>
          <button
            onClick={onForward}
            className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 hover:bg-white/5"
          >
            ›
          </button>
        </div>

        {/* Middle: search box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="min-w-0"
        >
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            onFocus={onFocusPlaceholder}
            onBlur={onBlurPlaceholder}
            className="w-full rounded-full border border-white/10 bg-[#12141a] px-5 py-3 text-center text-gray-200 placeholder:text-gray-400 outline-none focus:border-white/20"
            aria-label="Search"
          />
        </form>

        {/* Right controls */}
        <div className="flex items-center justify-end gap-2">
          <button className="rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-200 hover:bg-white/5">
            Log in
          </button>
          <button className="rounded-lg bg-indigo-500 px-3 py-2 text-sm font-medium hover:bg-indigo-600">
            Sign up
          </button>
        </div>
      </div>
      <div className="h-px w-full bg-white/5" />
    </header>
  );
}
