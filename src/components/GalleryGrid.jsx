import { motion } from "framer-motion";
import { galleryImages } from "../data/galleryData.js";

export default function GalleryGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
      {galleryImages.map((img, i) => (
        <motion.div
          key={img.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          className="group aspect-square overflow-hidden rounded-xl border border-gold/15"
        >
          <img
            src={img.src}
            alt={img.alt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </motion.div>
      ))}
    </div>
  );
}
