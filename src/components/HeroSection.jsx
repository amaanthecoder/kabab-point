import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export default function HeroSection({
  title,
  subtitle,
  image,
  video,
  height = "h-screen",
  bgPosition = "center",
  children,
}) {
  const videoRef = useRef(null);
  // Start as "unmuted" intent — we try to play with sound immediately.
  // Browsers require the first play() to be muted unless the user has already
  // interacted, so we catch the rejection and fall back to muted automatically.
  const [muted, setMuted] = useState(false);
  const [showSoundHint, setShowSoundHint] = useState(false);

  useEffect(() => {
    if (!video || !videoRef.current) return;
    const el = videoRef.current;
    el.muted = false;
    el.play().catch(() => {
      // Browser blocked unmuted autoplay — fall back to muted,
      // then show the "tap for sound" hint so user knows they can enable it.
      el.muted = true;
      setMuted(true);
      setShowSoundHint(true);
      el.play().catch(() => {});
    });
  }, [video]);

  const toggleSound = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
    setShowSoundHint(false);
  };

  if (video) {
    return (
      <section className={`relative flex h-screen items-center justify-center overflow-hidden bg-charcoal`}>
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={video}
          poster={image}
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-charcoal/80" />
        <div className="absolute inset-0 pattern-bg opacity-10" />

        {/* Sound toggle — prominent, bottom-right */}
        <div className="absolute bottom-6 right-6 z-20 flex flex-col items-end gap-2">
          {showSoundHint && (
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-full bg-charcoal/80 px-3 py-1 text-xs font-semibold text-gold backdrop-blur"
            >
              Tap for Sound
            </motion.span>
          )}
          <button
            onClick={toggleSound}
            aria-label={muted ? "Unmute video" : "Mute video"}
            className="flex items-center gap-2 rounded-full border border-gold/50 bg-charcoal/70 px-4 py-2.5 text-sm font-semibold text-gold backdrop-blur transition-all hover:bg-gold hover:text-charcoal"
          >
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            {muted ? "Sound Off" : "Sound On"}
          </button>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-display text-4xl font-bold leading-tight text-warmwhite sm:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="mx-auto mt-5 max-w-2xl text-base text-warmwhite/80 sm:text-lg"
            >
              {subtitle}
            </motion.p>
          )}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
            >
              {children}
            </motion.div>
          )}
        </div>
      </section>
    );
  }

  // Static image hero (used on all other pages)
  return (
    <section className={`relative flex ${height} items-center justify-center overflow-hidden bg-charcoal`}>
      <motion.div
        className="absolute inset-0 bg-cover"
        style={{ backgroundImage: `url(${image})`, backgroundPosition: bgPosition }}
        initial={{ scale: 1 }}
        animate={{ scale: 1.08 }}
        transition={{ duration: 18, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/60 to-charcoal" />
      <div className="absolute inset-0 pattern-bg opacity-20" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-display text-4xl font-bold leading-tight text-warmwhite sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mx-auto mt-5 max-w-2xl text-base text-warmwhite/80 sm:text-lg"
          >
            {subtitle}
          </motion.p>
        )}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
