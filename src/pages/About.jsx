import { BookOpen, Soup, Flame, Sparkles, Leaf, ShieldCheck, Users, Wheat } from "lucide-react";
import HeroSection from "../components/HeroSection.jsx";
import Button from "../components/Button.jsx";
import FadeUp from "../components/FadeUp.jsx";
import usePageMeta from "../hooks/usePageMeta.js";
import { brand } from "../data/branchData.js";

const storyCards = [
  {
    icon: BookOpen,
    title: "The Story",
    desc: "Kabab Point began with a simple idea: bring the bold, smoky flavours of Mumbai's grill houses to Sharjah, made fresh every single day.",
  },
  {
    icon: Soup,
    title: "The Cuisine",
    desc: "From hearty biryanis to slow-simmered curries, our menu is rooted in classic Mughlai and North Indian recipes passed down through generations.",
  },
  {
    icon: Flame,
    title: "The Grill",
    desc: "Every kebab is hand-skewered and grilled over real charcoal, giving our food its signature smoky depth and char.",
  },
  {
    icon: Sparkles,
    title: "The Ambience",
    desc: "Warm lighting, rich tones and comfortable family seating make Kabab Point a place to linger over a meal, not just eat one.",
  },
];

const qualityBadges = [
  { icon: Leaf, label: "Freshly Prepared" },
  { icon: ShieldCheck, label: "Halal" },
  { icon: Users, label: "Family Friendly" },
  { icon: Wheat, label: "Authentic Indian Spices" },
];

export default function About() {
  usePageMeta(
    "About | Kabab Point Sharjah",
    "Born from the flavours of Mumbai, served fresh in Sharjah. Discover the story behind Kabab Point."
  );

  return (
    <>
      <HeroSection
        image="/images/about/grand-opening.webp"
        bgPosition="top"
        title="About Kabab Point"
        subtitle="Born from the flavours of Mumbai, served fresh in Sharjah."
        height="h-[60vh]"
      />

      {/* Story block */}
      <section className="bg-cream py-20">
        <FadeUp className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-charcoal sm:text-4xl">
            Born from the flavours of Mumbai, served fresh in Sharjah.
          </h2>
          <p className="mt-5 text-charcoal/75 leading-relaxed">
            Kabab Point was founded on a love for honest, flavour-packed Indian food —
            the kind found at busy Mumbai grill stalls, where the smell of charcoal
            and spice fills the street. We've brought that same spirit to Sharjah,
            pairing it with a comfortable, family-friendly dining room and a menu
            built for sharing.
          </p>
        </FadeUp>
      </section>

      {/* Story cards */}
      <section className="bg-warmwhite py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {storyCards.map((card, i) => (
              <FadeUp key={card.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-gold/20 bg-cream p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-maroon/10 text-maroon">
                    <card.icon size={24} />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-charcoal">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{card.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Quality badges */}
      <section className="bg-charcoal pattern-bg py-14">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 lg:grid-cols-4 lg:px-10">
          {qualityBadges.map((badge, i) => (
            <FadeUp key={badge.label} delay={i * 0.08} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 text-gold">
                <badge.icon size={26} />
              </div>
              <h3 className="mt-3 font-display text-sm font-semibold text-warmwhite">{badge.label}</h3>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Alternating sections */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl space-y-20 px-6 lg:px-10">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <FadeUp>
              <img src="/images/about/cuisine.jpg" alt="Kabab Point cuisine" className="w-full rounded-2xl border border-gold/20 shadow-lg" />
            </FadeUp>
            <FadeUp delay={0.15}>
              <h3 className="font-display text-2xl font-bold text-charcoal sm:text-3xl">
                Mumbai Flavours, Sharjah Table
              </h3>
              <p className="mt-4 text-charcoal/75 leading-relaxed">
                Our recipes draw on the street food and home-style cooking traditions
                of Mumbai — bold spice blends, fresh herbs and a balance of heat and
                richness in every dish.
              </p>
            </FadeUp>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-2">
            <FadeUp delay={0.15} className="order-2 lg:order-1">
              <h3 className="font-display text-2xl font-bold text-charcoal sm:text-3xl">
                Grilled Over Real Charcoal
              </h3>
              <p className="mt-4 text-charcoal/75 leading-relaxed">
                Our kebabs and tandoori specials are cooked the traditional way — over
                open charcoal and in a clay tandoor — for a smoky char you simply
                can't get any other way.
              </p>
            </FadeUp>
            <FadeUp className="order-1 lg:order-2">
              <img src="/images/about/grill.jpg" alt="Kabab Point charcoal grill" className="w-full rounded-2xl border border-gold/20 shadow-lg" />
            </FadeUp>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-2">
            <FadeUp>
              <img src="/images/about/ambience.jpg" alt="Kabab Point dining room" className="w-full rounded-2xl border border-gold/20 shadow-lg" />
            </FadeUp>
            <FadeUp delay={0.15}>
              <h3 className="font-display text-2xl font-bold text-charcoal sm:text-3xl">
                A Warm Place to Gather
              </h3>
              <p className="mt-4 text-charcoal/75 leading-relaxed">
                Whether it's a family dinner, a celebration or a quick takeaway stop,
                Kabab Point is designed to feel welcoming, comfortable and reliable
                every time you visit.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-maroon pattern-bg py-20">
        <FadeUp className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-warmwhite sm:text-4xl">
            Visit Kabab Point Today
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button to="/menu" variant="primary">View Menu</Button>
            <Button href={brand.mapsDirectionsUrl} variant="ghost">Get Directions</Button>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
