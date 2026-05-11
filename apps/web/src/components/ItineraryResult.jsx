/**
 * Renders a generated itinerary result in a structured, beautiful layout.
 */
export default function ItineraryResult({ itinerary }) {
  if (!itinerary) return null;

  return (
    <div className="animate-slide-up bg-white rounded-2xl shadow-xl shadow-brand-100/50 border border-slate-200/60 p-8 md:p-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            {itinerary.destination || 'Your Trip'}
          </h2>
          <p className="text-slate-500 mt-1">
            {itinerary.duration} days · {itinerary.summary}
          </p>
        </div>
        <span className="text-3xl">🗺️</span>
      </div>

      {/* Days */}
      <div className="space-y-6">
        {itinerary.days?.map((day) => (
          <div key={day.day} className="border-l-2 border-brand-200 pl-6 relative">
            {/* Day dot */}
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-brand-500 border-2 border-white shadow-sm" />

            <h3 className="text-lg font-semibold text-slate-800 mb-1">
              Day {day.day}: {day.title}
            </h3>
            <p className="text-xs text-brand-500 font-medium mb-3">{day.city}</p>

            <div className="space-y-3">
              {day.activities?.map((act, i) => (
                <div
                  key={i}
                  className="bg-slate-50 rounded-xl p-4 hover:bg-brand-50/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-slate-800 text-sm">{act.name}</span>
                    <span className="text-xs text-slate-400 bg-white px-2 py-0.5 rounded-full">
                      {act.duration}
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">{act.description}</p>
                  {act.tip && (
                    <p className="text-brand-600 text-xs mt-2 font-medium">💡 {act.tip}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Budget */}
      {itinerary.budgetEstimate && (
        <div className="mt-8 p-5 bg-gradient-to-r from-brand-50 to-purple-50 rounded-xl">
          <h4 className="font-semibold text-slate-800 mb-3 text-sm">💰 Daily Budget Estimate ({itinerary.budgetEstimate.currency})</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            {['budget', 'mid', 'luxury'].map((tier) => (
              <div key={tier} className="bg-white/70 rounded-lg py-3 px-2">
                <p className="text-xs text-slate-500 capitalize mb-1">{tier}</p>
                <p className="text-lg font-bold text-slate-800">
                  ${itinerary.budgetEstimate.dailyBudget?.[tier] || '—'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Packing Tips */}
      {itinerary.packingTips?.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold text-slate-800 mb-2 text-sm">🎒 Packing Tips</h4>
          <div className="flex flex-wrap gap-2">
            {itinerary.packingTips.map((tip, i) => (
              <span key={i} className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full">
                {tip}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
