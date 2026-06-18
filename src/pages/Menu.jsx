import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Download, ShieldAlert } from "lucide-react";
import HeroSection from "../components/HeroSection.jsx";
import Button from "../components/Button.jsx";
import CategoryTabs from "../components/CategoryTabs.jsx";
import FoodCard from "../components/FoodCard.jsx";
import usePageMeta from "../hooks/usePageMeta.js";
import { menuData } from "../data/menuData.js";

const filters = ["All", "Veg", "Non-Veg", "Spicy"];

function InfoModal({ title, body, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/80 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm rounded-2xl border border-gold/30 bg-warmwhite p-6 text-center"
      >
        <button onClick={onClose} className="absolute right-4 top-4 text-charcoal/60 hover:text-royal">
          <X size={20} />
        </button>
        <h3 className="font-display text-xl font-bold text-charcoal">{title}</h3>
        <p className="mt-3 text-sm text-charcoal/70">{body}</p>
      </motion.div>
    </motion.div>
  );
}

export default function Menu() {
  usePageMeta(
    "Menu | Kabab Point Sharjah",
    "Explore Kabab Point's signature Indian grills, biryanis, curries, rolls, breads, desserts, and drinks."
  );

  const categories = menuData.map((c) => c.category);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [modal, setModal] = useState(null);

  const items = useMemo(() => {
    const cat = menuData.find((c) => c.category === activeCategory);
    let list = cat ? cat.items : [];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (item) => item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)
      );
    }

    if (filter === "Veg") list = list.filter((item) => item.type === "veg");
    if (filter === "Non-Veg") list = list.filter((item) => item.type === "non-veg");
    if (filter === "Spicy") list = list.filter((item) => item.spicy);

    return list;
  }, [activeCategory, search, filter]);

  return (
    <>
      <HeroSection
        image="/images/menu/menu-hero.avif"
        bgPosition="top"
        title="Our Menu"
        subtitle="Explore Kabab Point's signature Indian grills, biryanis, curries, rolls, breads, desserts, and drinks."
        height="h-[55vh]"
      >
        <Button variant="primary" icon={Download} onClick={() => setModal("download")}>
          Download Menu
        </Button>
        <Button variant="ghost" icon={ShieldAlert} onClick={() => setModal("allergens")}>
          Food Allergens
        </Button>
      </HeroSection>

      <CategoryTabs categories={categories} active={activeCategory} onChange={setActiveCategory} />

      <section className="bg-cream py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search menu items..."
                className="w-full rounded-full border border-gold/30 bg-white py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                    filter === f
                      ? "bg-maroon text-warmwhite"
                      : "border border-gold/30 bg-white text-charcoal/70 hover:bg-gold/20"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + filter + search}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-10"
            >
              <h2 className="font-display text-2xl font-bold text-charcoal sm:text-3xl">{activeCategory}</h2>

              {items.length === 0 ? (
                <p className="mt-6 text-charcoal/60">No items match your search.</p>
              ) : (
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((item) => (
                    <FoodCard key={item.name} {...item} />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <AnimatePresence>
        {modal === "download" && (
          <InfoModal
            title="Download Menu"
            body="A downloadable PDF menu will be available here soon. For now, browse our full menu above."
            onClose={() => setModal(null)}
          />
        )}
        {modal === "allergens" && (
          <InfoModal
            title="Food Allergens"
            body="Many of our dishes contain dairy, nuts and gluten. Please inform our staff of any allergies before ordering."
            onClose={() => setModal(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
