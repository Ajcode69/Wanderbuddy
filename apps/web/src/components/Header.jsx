export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">🧭</span>
          <span className="text-xl font-bold bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
            WanderBuddy
          </span>
        </div>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-medium text-slate-900 hover:text-brand-600 transition-colors">Home</a>
          <a href="#" className="text-sm font-medium text-slate-500 hover:text-brand-600 transition-colors">Explore</a>
          <a href="#" className="text-sm font-medium text-slate-500 hover:text-brand-600 transition-colors">My Trips</a>
        </nav>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-sm font-semibold shadow-md">
          W
        </div>
      </div>
    </header>
  );
}
