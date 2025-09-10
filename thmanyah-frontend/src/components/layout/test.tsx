// components/Layout.tsx
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <main className="max-w-7xl mx-auto px-8 py-6">
        {children}
      </main>
    </div>
  )
}
