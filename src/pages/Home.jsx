import { Leaf, Users, Package, PartyPopper } from "lucide-react";
import HeroSection from "../components/HeroSection.jsx";
import Button from "../components/Button.jsx";
import FadeUp from "../components/FadeUp.jsx";
import FoodCard from "../components/FoodCard.jsx";
import CTASection from "../components/CTASection.jsx";
import GalleryGrid from "../components/GalleryGrid.jsx";
import OrderPlatforms from "../components/OrderPlatforms.jsx";
import usePageMeta from "../hooks/usePageMeta.js";
import { useReservation } from "../context/ReservationContext.jsx";
import { featuredDishes, signatureCategories } from "../data/menuData.js";

const trustBadges = [
  { icon: Leaf, title: "Fresh Ingredients", desc: "Sourced daily and prepared fresh in-house." },
  { icon: Users, title: "Family Dining", desc: "A warm, spacious setting for the whole family." },
  { icon: Package, title: "Takeaway Available", desc: "Quick pickup for your favourite dishes." },
  { icon: PartyPopper, title: "Party Orders & Catering", desc: "From small gatherings to large celebrations." },
];

export default function Home() {
  usePageMeta(
    "Kabab Point Sharjah | Mumbai-Style Indian Kebabs & Grills",
    "Kabab Point brings Mumbai-style kebabs, tandoori grills, biryani and rich Indian flavours to Sharjah. Dine in, takeaway, delivery and catering."
  );
  const { openReservation } = useReservation();

  return (
    <>
      <HeroSection
        image="/images/hero-kebab.jpg"
        video="/videos/kabab-point-hero.mp4"
        title="The Taste of Mumbai, Served in Sharjah"
        subtitle="Experience smoky grills, rich Indian flavours, and family-style dining at Kabab Point."
      >
        <Button to="/menu" variant="primary">View Menu</Button>
        <Button onClick={openReservation} variant="ghost">Book a Table</Button>
      </HeroSection>

      {/* Order online */}
      <section className="bg-cream py-12">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-10">
          <FadeUp>
            <h2 className="font-display text-2xl font-bold text-charcoal sm:text-3xl">Order Online</h2>
            <p className="mt-2 text-charcoal/70">Get Kabab Point delivered through your favourite app.</p>
          </FadeUp>
          <div className="mt-8">
            <OrderPlatforms />
          </div>
        </div>
      </section>

      {/* Intro section */}
      <section className="bg-cream py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:px-10">
          <FadeUp>
            <img
              src="/images/menu/mixed-grill.jpg"
              alt="Kabab Point signature grill platter"
              className="w-full rounded-2xl border border-gold/20 object-cover shadow-lg"
            />
          </FadeUp>
          <FadeUp delay={0.15}>
            <h2 className="font-display text-3xl font-bold text-charcoal sm:text-4xl">
              A Royal Indian Grill Experience
            </h2>
            <p className="mt-5 text-charcoal/75 leading-relaxed">
              Kabab Point brings the bustling flavours of Mumbai's streets to Sharjah —
              smoky charcoal-grilled kebabs, slow-cooked tandoori specials, fragrant
              biryani, hearty curries and freshly rolled wraps. Every dish is prepared
              with authentic Indian spices and a commitment to quality that makes every
              visit feel like a celebration.
            </p>
            <div className="mt-6">
              <Button to="/about" variant="outline">Our Story</Button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Signature categories */}
      <section className="bg-warmwhite py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <FadeUp className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-charcoal sm:text-4xl">
              Signature Categories
            </h2>
            <p className="mt-4 text-charcoal/70">
              From the charcoal grill to the tandoor, explore the heart of our menu.
            </p>
          </FadeUp>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {signatureCategories.map((cat, i) => (
              <FadeUp key={cat.title} delay={i * 0.08}>
                <div className="group relative h-64 overflow-hidden rounded-2xl border border-gold/15 shadow-md">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />
                  <div className="absolute bottom-0 p-5">
                    <h3 className="font-display text-xl font-semibold text-warmwhite">{cat.title}</h3>
                    <p className="mt-1 text-sm text-warmwhite/75">{cat.description}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Featured dishes */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <FadeUp className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-charcoal sm:text-4xl">Featured Dishes</h2>
            <p className="mt-4 text-charcoal/70">Our most loved kebabs, biryani and curries.</p>
          </FadeUp>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredDishes.map((dish, i) => (
              <FadeUp key={dish.name} delay={i * 0.06}>
                <FoodCard {...dish} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="bg-charcoal pattern-bg py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 lg:grid-cols-4 lg:px-10">
          {trustBadges.map((badge, i) => (
            <FadeUp key={badge.title} delay={i * 0.08} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 text-gold">
                <badge.icon size={26} />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-warmwhite">{badge.title}</h3>
              <p className="mt-1 text-xs text-warmwhite/60">{badge.desc}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      <CTASection />

      {/* Gallery strip */}
      <section className="bg-warmwhite py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <FadeUp className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-charcoal sm:text-4xl">Inside Kabab Point</h2>
            <p className="mt-4 text-charcoal/70">A glimpse of our grill, our food and our dining space.</p>
          </FadeUp>
          <div className="mt-10">
            <GalleryGrid />
          </div>
        </div>
      </section>
    </>
  );
}
