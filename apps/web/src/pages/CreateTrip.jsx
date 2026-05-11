import { useState } from 'react';
import CreateForm from '../components/CreateForm';
import ItineraryCard from '../components/ItineraryCard';
import ItineraryResult from '../components/ItineraryResult';
import { generateTrip } from '../services/api';

const DEMO_CARDS = [
  { destination: 'Paris', duration: 5, tag: 'Family', rating: 4.4 },
  { destination: 'Bali', duration: 7, tag: 'Romance', rating: 4.7 },
  { destination: 'Tokyo', duration: 4, tag: 'Solo', rating: 4.6 },
  { destination: 'Switzerland', duration: 6, tag: 'Adventure', rating: 4.8 },
];

export default function CreateTrip() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handleGenerate(payload) {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await generateTrip(payload);
      setResult(res.data?.itinerary || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-12 pb-8">
        <CreateForm onSubmit={handleGenerate} isLoading={isLoading} />
      </section>

      {/* Error */}
      {error && (
        <section className="max-w-4xl mx-auto px-6 pb-6">
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 text-sm animate-fade-in">
            ⚠️ {error}
          </div>
        </section>
      )}

      {/* Generated result */}
      {result && (
        <section className="max-w-4xl mx-auto px-6 pb-12">
          <ItineraryResult itinerary={result} />
        </section>
      )}

      {/* Demo AI itineraries */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">AI Itineraries</h2>
          <a href="#" className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors">
            View All →
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {DEMO_CARDS.map((card) => (
            <ItineraryCard key={card.destination} {...card} />
          ))}
        </div>
      </section>
    </main>
  );
}
