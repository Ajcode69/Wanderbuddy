import { useState } from 'react';

export default function CreateForm({ onSubmit, isLoading }) {
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState('');
  const [description, setDescription] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!description.trim()) return;
    onSubmit({
      destination,
      days: days ? parseInt(days, 10) : 3,
      description,
      preferences: '',
    });
  }

  return (
    <form onSubmit={handleSubmit} className="w-full animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl shadow-brand-100/50 border border-slate-200/60 p-8 md:p-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Plan Your Next Adventure
          </h1>
          <p className="text-slate-500 text-base">
            Tell WanderBuddy about your dream trip and let AI craft the perfect itinerary.
          </p>
        </div>

        {/* Inputs row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          {/* Place */}
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-400 text-lg">📍</span>
            <input
              id="destination-input"
              type="text"
              placeholder="Where to?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 transition-all text-sm"
            />
          </div>

          {/* Days */}
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-400 text-lg">📅</span>
            <input
              id="days-input"
              type="number"
              min="1"
              max="30"
              placeholder="Number of days"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 transition-all text-sm"
            />
          </div>
        </div>

        {/* Description */}
        <div className="relative mb-6">
          <textarea
            id="description-input"
            rows={4}
            placeholder='Describe your dream trip... "A 5-day culinary journey through Tokyo for two food lovers"'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 transition-all text-sm resize-none leading-relaxed"
          />
        </div>

        {/* Submit */}
        <button
          id="generate-btn"
          type="submit"
          disabled={isLoading || !description.trim()}
          className="w-full md:w-auto px-8 py-3.5 bg-gradient-to-r from-brand-600 to-brand-500 text-white font-semibold rounded-xl hover:from-brand-700 hover:to-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/30 active:scale-[0.98]"
        >
          {isLoading ? (
            <span className="flex items-center gap-2.5">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
              Generating...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              ✨ Generate Itinerary
            </span>
          )}
        </button>
      </div>
    </form>
  );
}
