import FadeUp from "./FadeUp.jsx";
import Button from "./Button.jsx";
import { useReservation } from "../context/ReservationContext.jsx";
import { brand } from "../data/branchData.js";

export default function CTASection({
  title = "A Flavourful Indian Dining Experience Awaits",
  subtitle,
}) {
  const { openReservation } = useReservation();

  return (
    <section className="relative overflow-hidden bg-maroon pattern-bg py-20">
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 via-transparent to-charcoal/60" />
      <FadeUp className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-3xl font-bold text-warmwhite sm:text-4xl">{title}</h2>
        {subtitle && <p className="mt-4 text-warmwhite/80">{subtitle}</p>}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button variant="primary" onClick={openReservation}>
            Book a Table
          </Button>
          <Button variant="ghost" href={brand.mapsDirectionsUrl}>
            Get Directions
          </Button>
        </div>
      </FadeUp>
    </section>
  );
}
