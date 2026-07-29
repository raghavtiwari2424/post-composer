export default function PlatformConstraints({ platforms, selected, onToggle }) {
  return (
    <div>
      <h3 className="font-display font-bold text-slate-800 mb-3">
        Platform constraints
      </h3>
      <div className="space-y-4">
        {platforms.map((p) => {
          const isSelected = selected.includes(p.id);
          return (
            <button
              type="button"
              key={p.id}
              onClick={() => onToggle(p.id)}
              className={`w-full text-left card p-5 transition ${
                isSelected
                  ? "border-brand-400 ring-2 ring-brand-200"
                  : "hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-slate-800">
                  {p.name}
                </span>
                <span className="text-xs font-semibold bg-brand-50 text-brand-700 rounded-full px-3 py-1">
                  #{p.maxHashtags} hashtags
                </span>
              </div>
              <p className="text-slate-500 text-sm mt-2">{p.tagline}</p>
              <p className="text-slate-400 text-xs mt-2">
                Max characters: {p.maxCharacters.toLocaleString()}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
