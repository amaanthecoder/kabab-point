import { motion } from "framer-motion";

export default function CateringCard({ icon: Icon, title, description }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-gold/20 bg-warmwhite p-6 shadow-sm"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-maroon/10 text-maroon">
        <Icon size={24} />
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold text-charcoal">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{description}</p>
    </motion.div>
  );
}
