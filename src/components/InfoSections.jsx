import { useState } from 'react';
import { Mail } from 'lucide-react';

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-lg border border-white/10 bg-white/5">
      <button
        className="w-full text-left px-4 py-3 flex items-center justify-between gap-4"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="font-medium text-white">{q}</span>
        <span className="text-zinc-400">{open ? '−' : '+'}</span>
      </button>
      {open && <div className="px-4 pb-4 text-sm text-zinc-300">{a}</div>}
    </div>
  );
}

export default function InfoSections() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  function handleSubscribe(e) {
    e.preventDefault();
    setError('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setSubscribed(true);
  }

  return (
    <div className="bg-zinc-950">
      <section id="faq" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="text-2xl font-bold text-white mb-6">FAQ</h3>
        <div className="space-y-3">
          <FAQItem q="What is AQI?" a="The Air Quality Index (AQI) is a standardized scale that indicates how polluted the air currently is or how polluted it is forecast to become. Higher values mean greater health concerns." />
          <FAQItem q="How often is the data updated?" a="Updates vary by station, but many provide readings every 15–60 minutes. We display the latest available data from public sources." />
          <FAQItem q="Which pollutants are tracked?" a="Common pollutants include PM2.5, PM10, CO, NO2, SO2, and O3. Availability depends on the reporting station; we show what the station provides." />
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="rounded-2xl border border-white/10 bg-black/60 p-6 sm:p-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">Stay Informed with AQI Alerts</h3>
                <p className="mt-1 text-zinc-300">Get real-time AQI alerts and health tips straight to your inbox.</p>
              </div>
              <form onSubmit={handleSubscribe} className="w-full max-w-md flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    aria-label="Email address"
                    className="w-full rounded-md bg-white/10 pl-10 pr-3 py-3 text-sm text-white placeholder-zinc-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-md bg-emerald-500 px-5 py-3 text-sm font-semibold text-black hover:bg-emerald-400 transition"
                >
                  Subscribe
                </button>
              </form>
            </div>
            {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
            {subscribed && !error && (
              <p className="mt-3 text-sm text-emerald-300">Thanks! You're subscribed for AQI alerts.</p>
            )}
          </div>
        </div>
      </section>

      <section id="health" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="text-2xl font-bold text-white mb-6">Health Advisory</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-3xl">😊</div>
            <div className="mt-2 font-semibold text-white">0–50: Safe for all activities</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-3xl">🙂</div>
            <div className="mt-2 font-semibold text-white">51–100: Minor impact for sensitive groups</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-3xl">😐</div>
            <div className="mt-2 font-semibold text-white">101–150: Limit outdoor activities</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-3xl">😷</div>
            <div className="mt-2 font-semibold text-white">151–200: Unhealthy for everyone</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-3xl">🤒</div>
            <div className="mt-2 font-semibold text-white">201–300: Avoid outdoor exposure</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-3xl">☠️</div>
            <div className="mt-2 font-semibold text-white">301+: Emergency conditions</div>
          </div>
        </div>
        <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="font-semibold text-white mb-2">Quick Tips</div>
          <ul className="list-disc pl-5 text-sm text-zinc-300 space-y-1">
            <li>Check AQI before outdoor activities</li>
            <li>Keep windows closed during high AQI</li>
            <li>Use air purifiers indoors if available</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
