export default function CategoryTabs({ categories, active, onChange }) {
  return (
    <div className="sticky top-[64px] z-30 bg-cream/95 backdrop-blur border-b border-gold/20 py-3 lg:top-[76px]">
      <div className="no-scrollbar mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 lg:justify-center lg:flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              active === cat
                ? "bg-maroon text-warmwhite"
                : "bg-warmwhite text-charcoal/70 border border-gold/30 hover:bg-gold/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
