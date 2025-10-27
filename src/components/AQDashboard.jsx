import { useEffect, useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';

function categoryForAQI(aqi) {
  if (aqi == null || isNaN(aqi)) return { label: 'No data', color: 'text-zinc-400', badge: 'bg-zinc-700/60 text-zinc-200' };
  if (aqi <= 50) return { label: 'Good', color: 'text-emerald-400', badge: 'bg-emerald-500/20 text-emerald-300' };
  if (aqi <= 100) return { label: 'Moderate', color: 'text-yellow-300', badge: 'bg-yellow-500/20 text-yellow-200' };
  if (aqi <= 150) return { label: 'Unhealthy (SG)', color: 'text-orange-300', badge: 'bg-orange-500/20 text-orange-200' };
  if (aqi <= 200) return { label: 'Unhealthy', color: 'text-red-400', badge: 'bg-red-500/20 text-red-200' };
  if (aqi <= 300) return { label: 'Very Unhealthy', color: 'text-fuchsia-300', badge: 'bg-fuchsia-500/20 text-fuchsia-200' };
  return { label: 'Hazardous', color: 'text-rose-300', badge: 'bg-rose-500/20 text-rose-200' };
}

function Gauge({ title, value, unit = '', subtitle }) {
  const max = 500;
  const pct = Math.max(0, Math.min(100, ((value || 0) / max) * 100));
  const cat = categoryForAQI(value);

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="text-sm text-zinc-400 mb-3">{title}</div>
      <div className="flex items-center gap-4">
        <div className="relative h-24 w-24">
          <svg viewBox="0 0 36 36" className="h-24 w-24">
            <path
              className="text-zinc-700"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              d="M18 2 a 16 16 0 0 1 0 32 a 16 16 0 0 1 0 -32"
              opacity="0.3"
            />
            <path
              className="text-emerald-400"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeDasharray={`${pct}, 100`}
              d="M18 2 a 16 16 0 0 1 0 32 a 16 16 0 0 1 0 -32"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-xl font-bold ${cat.color}`}>{value ?? '—'}</div>
              <div className="text-[10px] text-zinc-400">{unit}</div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${cat.badge}`}>{cat.label}</div>
          {subtitle && <div className="mt-2 text-xs text-zinc-400">{subtitle}</div>}
        </div>
      </div>
    </div>
  );
}

export default function AQDashboard() {
  const [city, setCity] = useState('Delhi');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);

  const cities = useMemo(
    () => [
      'Delhi',
      'Mumbai',
      'Bengaluru',
      'Chennai',
      'Hyderabad',
      'Kolkata',
      'Pune',
      'Ahmedabad',
      'Jaipur',
      'Lucknow',
      'Chandigarh',
      'Patna',
    ],
    []
  );

  async function fetchAQI() {
    setLoading(true);
    setError('');
    try {
      const url = `https://api.waqi.info/feed/${encodeURIComponent(city)}/?token=demo`;
      const res = await fetch(url);
      const json = await res.json();
      if (json.status !== 'ok') throw new Error(json.data || 'Unable to fetch AQI');

      const iaqi = json.data.iaqi || {};
      const aqi = Number(json.data.aqi) || null;
      const pm25 = iaqi.pm25?.v ?? null;
      const pm10 = iaqi.pm10?.v ?? null;
      const so2 = iaqi.so2?.v ?? null;
      const co = iaqi.co?.v ?? null; // CO (not CO2) – many free feeds provide CO

      // Forecast (best effort)
      let forecastAQI = null;
      const f = json.data.forecast?.daily?.pm25;
      if (Array.isArray(f) && f.length > 0) {
        // take tomorrow if exists, else last
        const tomorrow = f.find((d) => {
          const t = new Date();
          t.setDate(t.getDate() + 1);
          const yyyy = t.getFullYear();
          const mm = String(t.getMonth() + 1).padStart(2, '0');
          const dd = String(t.getDate()).padStart(2, '0');
          const key = `${yyyy}-${mm}-${dd}`;
          return d.day === key;
        });
        const pick = tomorrow || f[f.length - 1];
        if (pick) forecastAQI = Math.round((Number(pick.avg) || Number(pick.max) || Number(pick.min) || aqi || 0));
      }
      if (forecastAQI == null && aqi != null) {
        // heuristic fallback
        forecastAQI = Math.min(500, Math.max(0, Math.round(aqi * 0.95 + 10)));
      }

      setData({ aqi, pm25, pm10, so2, co, forecastAQI });
    } catch (e) {
      setError(e.message || 'Failed to fetch AQI');
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAQI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cat = categoryForAQI(data?.aqi ?? null);

  return (
    <section id="dashboard" className="relative bg-gradient-to-b from-black to-zinc-950 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              India's Air Quality <span>🌍</span>
            </h2>
            <p className="mt-1 text-zinc-400">Choose a city to view real-time AQI and pollutant details.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                className="appearance-none rounded-md bg-white/10 text-white px-4 py-2 pr-10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                {cities.map((c) => (
                  <option key={c} value={c} className="bg-zinc-900">
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
            </div>
            <button
              onClick={fetchAQI}
              className="rounded-md bg-emerald-500 px-4 py-2 font-medium text-black hover:bg-emerald-400 transition disabled:opacity-60"
              disabled={loading}
            >
              {loading ? 'Fetching…' : 'Get AQI'}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <div className="mb-8 rounded-xl border border-white/10 bg-white/5 p-4 sm:p-6">
          <div className="flex flex-wrap items-center gap-3 text-zinc-300">
            <span className="text-white/90 font-semibold">{city}</span>
            <span className="text-zinc-500">•</span>
            <span className="font-semibold text-white">AQI {data?.aqi ?? '—'}</span>
            <span className="text-zinc-500">•</span>
            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${cat.badge}`}>{cat.label}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Gauge title="PM2.5" value={data?.pm25 ?? null} unit="AQI" subtitle="Fine particles" />
          <Gauge title="PM10" value={data?.pm10 ?? null} unit="AQI" subtitle="Coarse particles" />
          <Gauge title="CO (Carbon Monoxide)" value={data?.co ?? null} unit="AQI" subtitle="Proxy for CO₂ not available in most free feeds" />
          <Gauge title="SO₂" value={data?.so2 ?? null} unit="AQI" subtitle="Sulfur dioxide" />
        </div>

        <div id="forecast" className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-white">Tomorrow's AQI Forecast 🌤</h3>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-zinc-300">Expected</span>
              <span className="font-semibold text-white">AQI {data?.forecastAQI ?? '—'}</span>
              {data?.forecastAQI != null && (
                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${categoryForAQI(data.forecastAQI).badge}`}>
                  {categoryForAQI(data.forecastAQI).label}
                </span>
              )}
            </div>
            <ul className="mt-4 list-disc pl-5 text-sm text-zinc-300 space-y-2">
              <li>Wear N95 masks outdoors</li>
              <li>Prefer indoor workouts</li>
              <li>Consult doctors if symptoms worsen</li>
            </ul>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-0 overflow-hidden">
            <div className="p-5 border-b border-white/10">
              <h3 className="text-lg font-semibold text-white">City Map</h3>
              <p className="mt-1 text-sm text-zinc-400">Quick view of the selected location</p>
            </div>
            <div className="h-72 w-full">
              <iframe
                title="Map"
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${encodeURIComponent(city)}%2C%20India&z=10&output=embed`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
