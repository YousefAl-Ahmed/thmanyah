// src/components/Sidebar.tsx
export default function Sidebar() {
  return (
    <aside
      className="
        fixed left-0 top-0 h-screen w-44
        border-r border-white/5 bg-[#0f1115] px-4 py-5
        z-40
      "
      style={{ width: 'var(--sidebar-w)' }}
    >
      {/* Logo */}
      <div className="mb-6 flex items-center gap-2">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-tr from-fuchsia-500 to-cyan-400 text-sm font-bold">
          <span>◎</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="space-y-6 text-sm">
        <div className="space-y-3">
          <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-white">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-fuchsia-400" />
            Home
          </a>
          <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-white">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-violet-400" />
            Discover
          </a>
        </div>

        <div className="pt-2 text-xs uppercase tracking-wide text-gray-500">Your Stuff</div>
        <div className="space-y-3 pt-2">
          <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-white">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-indigo-400" />
            My Queue
          </a>
          <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-white">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-indigo-400" />
            My Podcasts
          </a>
          <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-white">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-indigo-400" />
            Recents
          </a>
        </div>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-4 left-4 text-xs text-gray-500">
        Podbay v2.96
        <div>About · All Podcasts</div>
      </div>
    </aside>
  );
}
