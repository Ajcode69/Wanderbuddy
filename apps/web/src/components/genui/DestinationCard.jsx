/**
 * DestinationCard — rich destination preview card.
 */
export default function DestinationCard({ destination, image, rating, highlights, bestSeason, avgBudget, onAction }) {
  const fallbackImage = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop';

  return (
    <div className="pl-9">
      <div
        className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer max-w-sm border border-slate-100"
        onClick={() => onAction?.(`I'm interested in ${destination}`)}
      >
        {/* Image */}
        <div className="relative h-40 overflow-hidden">
          <img
            src={image || fallbackImage}
            alt={destination}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => { e.target.src = fallbackImage; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Rating badge */}
          {rating && (
            <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
              ⭐ {rating}
            </div>
          )}

          {/* Destination name */}
          <div className="absolute bottom-3 left-4">
            <h3 className="text-white text-lg font-bold">{destination}</h3>
          </div>
        </div>

        {/* Details */}
        <div className="p-4 bg-white">
          {/* Highlights */}
          {highlights?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {highlights.map((h, i) => (
                <span key={i} className="text-xs bg-brand-50 text-brand-600 px-2.5 py-1 rounded-full font-medium">
                  {h}
                </span>
              ))}
            </div>
          )}

          {/* Meta info */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            {bestSeason && (
              <span className="flex items-center gap-1">
                🌤️ {bestSeason}
              </span>
            )}
            {avgBudget && (
              <span className="flex items-center gap-1 font-semibold text-slate-700">
                💰 {avgBudget}
              </span>
            )}
          </div>
        </div>

        {/* Hover arrow */}
        <div className="absolute bottom-4 right-4 w-7 h-7 bg-brand-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
          <span className="text-white text-xs">→</span>
        </div>
      </div>
    </div>
  );
}
