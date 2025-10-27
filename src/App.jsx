import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AQDashboard from './components/AQDashboard';
import InfoSections from './components/InfoSections';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main>
        <Hero />
        <AQDashboard />
        <InfoSections />
        <section id="compare" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold">Compare</h3>
            <p className="mt-2 text-sm text-zinc-300">Coming soon: Compare AQI across multiple Indian cities side-by-side.</p>
          </div>
        </section>
        <section id="contact" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold">Contact</h3>
            <p className="mt-2 text-sm text-zinc-300">Questions or feedback? Reach us at hello@aqpulse.example</p>
          </div>
        </section>
      </main>
      <footer className="border-t border-white/10 py-6 text-center text-sm text-zinc-400">
        © {new Date().getFullYear()} AQPulse. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
