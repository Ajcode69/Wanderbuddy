const IMAGES = {
  Paris: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop',
  Bali: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop',
  Tokyo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
  Switzerland: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=400&h=300&fit=crop',
};

function getImage(destination) {
  const key = Object.keys(IMAGES).find((k) =>
    destination?.toLowerCase().includes(k.toLowerCase()),
  );
  return IMAGES[key] || `https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop`;
}

export default function ItineraryCard({ destination, duration, tag, rating }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer min-w-[220px] w-full aspect-[4/5]">
      {/* Image */}
      <img
        src={getImage(destination)}
        alt={destination}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Rating badge */}
      {rating && (
        <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
          ⭐ {rating}
        </div>
      )}

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white text-lg font-bold mb-1.5">{destination}</h3>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-brand-500/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-full font-medium">
            {duration} days
          </span>
          {tag && (
            <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-2.5 py-1 rounded-full font-medium">
              {tag}
            </span>
          )}
        </div>
      </div>

      {/* Hover arrow */}
      <div className="absolute bottom-4 right-4 w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
        <span className="text-white text-sm">→</span>
      </div>
    </div>
  );
}
