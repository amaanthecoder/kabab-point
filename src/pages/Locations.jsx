import { MapPin, Phone, Mail, Clock, Navigation, PhoneCall, MessageCircle } from "lucide-react";
import HeroSection from "../components/HeroSection.jsx";
import Button from "../components/Button.jsx";
import FadeUp from "../components/FadeUp.jsx";
import ContactForm from "../components/ContactForm.jsx";
import OrderPlatforms from "../components/OrderPlatforms.jsx";
import usePageMeta from "../hooks/usePageMeta.js";
import { brand, branches, whatsappLink } from "../data/branchData.js";

const contactCards = [
  { icon: MapPin, title: "Address", value: brand.address },
  { icon: Phone, title: "Phone", value: brand.phoneDisplay },
  { icon: Mail, title: "Email", value: brand.email },
  { icon: Clock, title: "Opening Hours", value: brand.hours.map((h) => `${h.day}: ${h.time}`).join(" • ") },
];

export default function Locations() {
  usePageMeta(
    "Location | Kabab Point Sharjah",
    "Find Kabab Point in Sharjah, UAE. Get directions, contact details, opening hours and order for dine-in, takeaway or delivery."
  );

  return (
    <>
      <HeroSection
        image="/images/hero-kebab.jpg"
        title="Find Kabab Point"
        subtitle="Visit us in Sharjah for dine-in, takeaway, delivery and family seating."
        height="h-[55vh]"
      />

      {/* Contact cards */}
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contactCards.map((c, i) => (
              <FadeUp key={c.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-gold/20 bg-warmwhite p-6 text-center shadow-sm">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-maroon/10 text-maroon">
                    <c.icon size={22} />
                  </div>
                  <h3 className="mt-4 font-display text-base font-semibold text-charcoal">{c.title}</h3>
                  <p className="mt-2 text-sm text-charcoal/70">{c.value}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.2} className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href={brand.mapsDirectionsUrl} variant="primary" icon={Navigation}>Get Directions</Button>
            <Button href={brand.phoneHref} variant="outline" icon={PhoneCall}>Call Now</Button>
            <Button href={whatsappLink()} variant="dark" icon={MessageCircle}>Order on WhatsApp</Button>
          </FadeUp>

          <FadeUp delay={0.28} className="mt-10 text-center">
            <p className="mb-4 text-sm font-semibold text-charcoal/60">Or order through:</p>
            <OrderPlatforms />
          </FadeUp>
        </div>
      </section>

      {/* Map + Branch card */}
      <section className="bg-warmwhite py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:px-10">
          <FadeUp>
            <iframe
              title="Kabab Point location map"
              src={brand.mapsEmbedSrc}
              className="h-80 w-full rounded-2xl border border-gold/20 lg:h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="h-full rounded-2xl border border-gold/20 bg-cream p-8">
              <h3 className="font-display text-2xl font-bold text-charcoal">{branches[0].name}</h3>
              <p className="mt-2 text-sm text-charcoal/70">{branches[0].address}</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {branches[0].features.map((f) => (
                  <div key={f} className="rounded-lg border border-gold/20 bg-warmwhite px-3 py-2 text-center text-sm font-medium text-charcoal/80">
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Contact form */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-2xl px-6">
          <FadeUp className="text-center">
            <h2 className="font-display text-3xl font-bold text-charcoal sm:text-4xl">Send Us a Message</h2>
            <p className="mt-3 text-charcoal/70">Have a question or feedback? We'd love to hear from you.</p>
          </FadeUp>
          <FadeUp delay={0.15} className="mt-10">
            <ContactForm />
          </FadeUp>
        </div>
      </section>
    </>
  );
}
