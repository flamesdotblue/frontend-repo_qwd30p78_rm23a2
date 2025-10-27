import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[90vh] w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/6tUXqVcUA0xgJugv/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-black/50 to-black"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            India's Air Quality
            <span className="ml-2">🌍</span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-zinc-300">
            🍃 Fresh air isn't a luxury, it's a right. Check your real-time AQI now 🍃
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#dashboard" className="inline-flex items-center rounded-md bg-emerald-500 px-5 py-3 text-sm font-semibold text-black hover:bg-emerald-400 transition">
              Get Started
            </a>
            <a href="#faq" className="inline-flex items-center rounded-md border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
