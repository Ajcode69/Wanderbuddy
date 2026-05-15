import { useState } from 'react';

/**
 * ItineraryDayCard — expandable single-day itinerary card.
 * Used during the generation phase (after chat is complete).
 */
export default function ItineraryDayCard({ day, title, city, activities }) {
  const [expanded, setExpanded] = useState(false);

  const activityTypeEmojis = {
    culture: '🏛️',
    nature: '🌿',
    food: '🍽️',
    shopping: '🛍️',
    adventure: '🏄',
    nightlife: '🌃',
    relaxation: '🧘',
  };

  return (
    <div className="pl-9">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden max-w-md transition-all duration-300">
        {/* Header — always visible */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-brand-500/20">
              {day}
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-800">{title}</h4>
              {city && <p className="text-xs text-brand-500 font-medium">{city}</p>}
            </div>
          </div>
          <svg
            className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Activities — collapsible */}
        {expanded && activities?.length > 0 && (
          <div className="px-4 pb-4 space-y-3 border-t border-slate-100 pt-3">
            {activities.map((act, i) => (
              <div key={i} className="bg-slate-50 rounded-xl p-3.5 hover:bg-brand-50/40 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                    {activityTypeEmojis[act.type] || '📌'} {act.name}
                  </span>
                  <span className="text-xs text-slate-400 bg-white px-2 py-0.5 rounded-full">
                    {act.duration}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{act.description}</p>
                {act.tip && (
                  <p className="text-xs text-brand-600 mt-1.5 font-medium">💡 {act.tip}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
