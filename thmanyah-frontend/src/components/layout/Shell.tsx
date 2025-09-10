// src/components/Shell.tsx

import Sidebar from '@/components/layout/Sidebar';

export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0f1115] text-gray-200">
      <Sidebar />
      {/* Reserve exact width for the fixed sidebar */}
      <div className="min-h-screen" style={{ paddingLeft: 'var(--sidebar-w)' }}>
        {children}
      </div>
    </div>
  );
}
