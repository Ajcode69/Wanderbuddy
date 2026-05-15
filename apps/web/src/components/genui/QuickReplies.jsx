/**
 * QuickReplies — tappable suggestion buttons.
 * When clicked, sends the value as a user message.
 */
export default function QuickReplies({ prompt, options, onAction, isLast }) {
  return (
    <div className="pl-9">
      {prompt && (
        <p className="text-xs text-slate-500 mb-2.5 font-medium">{prompt}</p>
      )}
      <div className="flex flex-wrap gap-2">
        {options?.map((opt, i) => (
          <button
            key={opt.value || i}
            onClick={() => onAction?.(opt.value || opt.label)}
            disabled={!isLast}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
              isLast
                ? 'bg-white border-brand-200 text-brand-600 hover:bg-brand-50 hover:border-brand-300 hover:shadow-md hover:shadow-brand-100/50 active:scale-95 cursor-pointer'
                : 'bg-slate-50 border-slate-200 text-slate-400 cursor-default'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
