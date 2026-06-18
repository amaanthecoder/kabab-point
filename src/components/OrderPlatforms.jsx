import { motion } from "framer-motion";
import { orderPlatforms, whatsappLink } from "../data/branchData.js";

export default function OrderPlatforms({ className = "", variant = "light", compact = false }) {
  const labelColor = variant === "dark" ? "text-warmwhite/90" : "text-charcoal/80";
  const badgeSize = compact ? "h-10 w-10" : "h-16 w-16";

  return (
    <div className={`flex flex-wrap items-center justify-center gap-4 ${className}`}>
      {orderPlatforms.map((platform, i) => {
        const href = platform.id === "whatsapp" ? whatsappLink() : platform.url;

        return (
          <motion.a
            key={platform.id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className="flex flex-col items-center gap-2"
          >
            <span
              className={`flex ${badgeSize} items-center justify-center overflow-hidden rounded-2xl border border-gold/30 shadow-md transition-transform`}
            >
              <img src={platform.logo} alt={platform.label} className="h-full w-full object-cover" />
            </span>
            {!compact && <span className={`text-xs font-semibold ${labelColor}`}>{platform.label}</span>}
          </motion.a>
        );
      })}
    </div>
  );
}
