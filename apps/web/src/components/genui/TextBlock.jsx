/**
 * TextBlock — renders a plain text message from the AI.
 */
export default function TextBlock({ content }) {
  return (
    <div className="flex gap-2.5 items-start">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-md shadow-brand-500/20">
        <span className="text-white text-xs font-bold">W</span>
      </div>
      <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm border border-slate-100 max-w-[85%]">
        <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
}
