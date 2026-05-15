import { useState } from 'react';

/**
 * BudgetCard — budget tier comparison and selection.
 */
export default function BudgetCard({ currency, tiers, onAction, isLast }) {
  const [selected, setSelected] = useState(null);
  const tierKeys = ['budget', 'mid', 'luxury'];
  const tierEmojis = { budget: '🎒', mid: '🏨', luxury: '👑' };
  const tierColors = {
    budget: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', ring: 'ring-emerald-400' },
    mid: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', ring: 'ring-blue-400' },
    luxury: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', ring: 'ring-amber-400' },
  };

  function handleSelect(tier) {
    if (!isLast) return;
    setSelected(tier);
    onAction?.(`I prefer the ${tier} budget tier`);
  }

  return (
    <div className="pl-9">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 max-w-md">
        <h4 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
          💰 Daily Budget Estimate
          {currency && <span className="text-xs text-slate-400 font-normal">({currency})</span>}
        </h4>

        <div className="grid grid-cols-3 gap-3">
          {tierKeys.map((tier) => {
            const data = tiers?.[tier];
            if (!data) return null;
            const colors = tierColors[tier];
            const isSelected = selected === tier;

            return (
              <button
                key={tier}
                onClick={() => handleSelect(tier)}
                disabled={!isLast}
                className={`relative rounded-xl p-3 text-center transition-all duration-200 border-2 ${
                  isSelected
                    ? `${colors.bg} ${colors.border} ring-2 ${colors.ring} ring-offset-1 scale-[1.02]`
                    : isLast
                    ? `bg-slate-50 border-transparent hover:${colors.bg} hover:border-slate-200 cursor-pointer`
                    : 'bg-slate-50 border-transparent cursor-default'
                }`}
              >
                <span className="text-lg">{tierEmojis[tier]}</span>
                <p className={`text-xs font-semibold capitalize mt-1 ${isSelected ? colors.text : 'text-slate-600'}`}>
                  {tier}
                </p>
                <p className={`text-lg font-bold mt-1 ${isSelected ? colors.text : 'text-slate-800'}`}>
                  ${data.daily}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">/day</p>

                {data.highlights?.length > 0 && (
                  <div className="mt-2 space-y-0.5">
                    {data.highlights.map((h, i) => (
                      <p key={i} className="text-[10px] text-slate-500 truncate">{h}</p>
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
