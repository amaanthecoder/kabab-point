import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { whatsappLink } from "../data/branchData.js";

export default function FoodCard({ name, description, price, image, type, spicy }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group overflow-hidden rounded-2xl border border-gold/15 bg-warmwhite shadow-md"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          {type && (
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-sm border-2 ${
                type === "veg" ? "border-green-600" : "border-red-700"
              } bg-warmwhite`}
            >
              <span className={`h-2.5 w-2.5 rounded-full ${type === "veg" ? "bg-green-600" : "bg-red-700"}`} />
            </span>
          )}
          {spicy && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-fire text-warmwhite">
              <Flame size={12} />
            </span>
          )}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold text-charcoal">{name}</h3>
          {price && <span className="whitespace-nowrap font-semibold text-royal">{price}</span>}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{description}</p>
        <a
          href={whatsappLink(`Hi Kabab Point, I'd like to order: ${name}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block rounded-full bg-maroon px-4 py-2 text-xs font-semibold text-warmwhite hover:bg-fire transition-colors"
        >
          Order on WhatsApp
        </a>
      </div>
    </motion.div>
  );
}
