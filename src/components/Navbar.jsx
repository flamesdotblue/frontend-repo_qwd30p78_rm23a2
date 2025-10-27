import { useState } from 'react';
import { Menu, X, User } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Dashboard', href: '#dashboard' },
    { label: 'Forecast', href: '#forecast' },
    { label: 'Compare', href: '#compare' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#home" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-emerald-500/20 ring-1 ring-emerald-400/50 flex items-center justify-center">
              <span className="text-emerald-400 font-bold">AQ</span>
            </div>
            <span className="text-white font-semibold tracking-wide">AQPulse</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="text-sm text-zinc-300 hover:text-white transition-colors">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex">
            <button className="inline-flex items-center gap-2 rounded-md bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-300 ring-1 ring-emerald-400/40 hover:bg-emerald-500/30 transition">
              <User size={16} /> Login
            </button>
          </div>

          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-zinc-300 hover:text-white hover:bg-white/10"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-white/10 py-3 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-zinc-200 hover:bg-white/5"
              >
                {item.label}
              </a>
            ))}
            <button className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-300 ring-1 ring-emerald-400/40 hover:bg-emerald-500/30 transition">
              <User size={16} /> Login
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
