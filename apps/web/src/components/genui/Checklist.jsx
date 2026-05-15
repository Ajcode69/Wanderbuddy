import { useState } from 'react';

/**
 * Checklist — toggleable checklist items.
 */
export default function Checklist({ title, items: initialItems }) {
  const [items, setItems] = useState(initialItems || []);

  function toggleItem(index) {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item,
      ),
    );
  }

  return (
    <div className="pl-9">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 max-w-sm">
        {title && (
          <h4 className="text-sm font-semibold text-slate-800 mb-3">{title}</h4>
        )}

        <div className="space-y-2">
          {items.map((item, i) => (
            <label
              key={i}
              className="flex items-center gap-3 cursor-pointer group py-1"
              onClick={() => toggleItem(i)}
            >
              <div
                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                  item.checked
                    ? 'bg-brand-500 border-brand-500 scale-105'
                    : 'border-slate-300 group-hover:border-brand-300'
                }`}
              >
                {item.checked && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span
                className={`text-sm transition-all duration-200 ${
                  item.checked ? 'text-slate-400 line-through' : 'text-slate-700'
                }`}
              >
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
