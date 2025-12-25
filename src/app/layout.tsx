import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          {/* Header */}
          <header className="border-b bg-white">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
              <h1 className="font-semibold text-lg tracking-tight">
                LeadFlow
              </h1>

              <nav className="flex items-center gap-6 text-sm">
                <a href="/" className="text-slate-600 hover:text-slate-900">
                  Dashboard
                </a>
                <a href="/leads" className="text-slate-600 hover:text-slate-900">
                  Leads
                </a>
              </nav>
            </div>
          </header>

          {/* Content */}
          <main className="max-w-7xl mx-auto px-6 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
