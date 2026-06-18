import { useState } from "react";
import { Flame, UtensilsCrossed, Soup, Sandwich, Wheat, IceCreamCone, Users, Building2, PartyPopper, Home as HomeIcon, CheckCircle2, MessageCircle, Loader2 } from "lucide-react";
import HeroSection from "../components/HeroSection.jsx";
import Button from "../components/Button.jsx";
import FadeUp from "../components/FadeUp.jsx";
import CateringCard from "../components/CateringCard.jsx";
import usePageMeta from "../hooks/usePageMeta.js";
import { whatsappLink } from "../data/branchData.js";
import { supabase } from "../lib/supabase.js";
import { notifyCatering } from "../lib/notify.js";

const services = [
  { icon: Flame, title: "Live Grill Counter", description: "A charcoal grill station set up live at your event, serving fresh kebabs to your guests." },
  { icon: UtensilsCrossed, title: "Kebab Platters", description: "Generous mixed platters of seekh, tikka and tandoori kebabs, ready to serve." },
  { icon: Soup, title: "Biryani Trays", description: "Large trays of chicken, mutton or vegetable biryani, perfect for groups." },
  { icon: Sandwich, title: "Rolls & Snacks", description: "Bite-sized rolls and starters, ideal for cocktail-style or office events." },
  { icon: Wheat, title: "Curry & Bread Combos", description: "Rich curries paired with fresh naan and roti, served buffet-style." },
  { icon: IceCreamCone, title: "Dessert & Drinks", description: "A sweet finish with traditional Indian desserts and refreshing drinks." },
];

const eventSizes = [
  { icon: HomeIcon, title: "Small Gatherings", desc: "10-25 guests" },
  { icon: Users, title: "Family Parties", desc: "25-60 guests" },
  { icon: Building2, title: "Corporate Meals", desc: "Office lunches & meetings" },
  { icon: PartyPopper, title: "Large Event Orders", desc: "60+ guests" },
];

const initialForm = { name: "", phone: "", date: "", guests: "", type: "", message: "" };

export default function Catering() {
  usePageMeta(
    "Catering | Kabab Point Sharjah",
    "Kabab Point provides catering for family gatherings, office lunches, birthdays, small events, and party orders in Sharjah."
  );

  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: dbError } = await supabase.from("catering_inquiries").insert({
      name: form.name,
      phone: form.phone,
      event_date: form.date,
      guest_count: parseInt(form.guests) || null,
      event_type: form.type,
      message: form.message || null,
    });

    if (dbError) {
      setError("Something went wrong. Please try again or contact us on WhatsApp.");
      setLoading(false);
      return;
    }

    notifyCatering(form);
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <>
      <HeroSection
        image="/images/catering/hero.avif"
        title="Catering for Every Celebration"
        subtitle="Bringing Kabab Point's grills, biryani and curries to your gathering, wherever it is."
        height="h-[60vh]"
      />

      <section className="bg-cream py-16">
        <FadeUp className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-charcoal/75 leading-relaxed">
            Kabab Point provides catering for family gatherings, office lunches,
            birthdays, small events, and party orders across Sharjah. From an
            intimate dinner to a large celebration, we tailor our menu to your
            event and guest count.
          </p>
        </FadeUp>
      </section>

      {/* Service cards */}
      <section className="bg-warmwhite py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <FadeUp className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-charcoal sm:text-4xl">Catering Services</h2>
          </FadeUp>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <FadeUp key={s.title} delay={i * 0.06}>
                <CateringCard {...s} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Event sizes */}
      <section className="bg-charcoal pattern-bg py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <FadeUp className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-warmwhite sm:text-4xl">We Cater For Every Size</h2>
          </FadeUp>
          <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {eventSizes.map((e, i) => (
              <FadeUp key={e.title} delay={i * 0.08} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <e.icon size={26} />
                </div>
                <h3 className="mt-3 font-display text-base font-semibold text-warmwhite">{e.title}</h3>
                <p className="mt-1 text-xs text-warmwhite/60">{e.desc}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry form */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-3xl px-6">
          <FadeUp className="text-center">
            <h2 className="font-display text-3xl font-bold text-charcoal sm:text-4xl">Request a Catering Quote</h2>
            <p className="mt-3 text-charcoal/70">Tell us about your event and we'll get back to you with a plan.</p>
          </FadeUp>

          <FadeUp delay={0.15} className="mt-10">
            {submitted ? (
              <div className="flex flex-col items-center rounded-2xl border border-gold/20 bg-warmwhite p-10 text-center">
                <CheckCircle2 size={44} className="text-fire" />
                <h3 className="mt-4 font-display text-xl font-bold text-charcoal">Inquiry Sent!</h3>
                <p className="mt-2 text-sm text-charcoal/60">
                  Thank you for reaching out. Our catering team will contact you shortly to discuss your event.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-gold/20 bg-warmwhite p-6 sm:p-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input required name="name" value={form.name} onChange={handleChange} placeholder="Name"
                    className="w-full rounded-lg border border-gold/30 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
                  <input required name="phone" value={form.phone} onChange={handleChange} placeholder="Phone"
                    className="w-full rounded-lg border border-gold/30 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input required type="date" name="date" value={form.date} onChange={handleChange}
                    className="w-full rounded-lg border border-gold/30 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
                  <input required type="number" min="1" name="guests" value={form.guests} onChange={handleChange} placeholder="Number of Guests"
                    className="w-full rounded-lg border border-gold/30 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
                </div>
                <input required name="type" value={form.type} onChange={handleChange} placeholder="Event Type (birthday, office lunch, etc.)"
                  className="w-full rounded-lg border border-gold/30 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message (optional)" rows={4}
                  className="w-full rounded-lg border border-gold/30 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
                {error && <p className="text-sm text-red-600">{error}</p>}
                <button type="submit" disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-maroon py-3 text-sm font-semibold text-warmwhite hover:bg-fire transition-colors disabled:opacity-60">
                  {loading && <Loader2 size={16} className="animate-spin" />}
                  {loading ? "Submitting…" : "Submit Inquiry"}
                </button>
              </form>
            )}
          </FadeUp>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="bg-maroon pattern-bg py-16">
        <FadeUp className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-display text-2xl font-bold text-warmwhite sm:text-3xl">
            Prefer to Talk Directly?
          </h2>
          <div className="mt-6">
            <Button
              href={whatsappLink("Hi Kabab Point, I'd like to discuss catering for an event.")}
              variant="primary"
              icon={MessageCircle}
            >
              Discuss Catering on WhatsApp
            </Button>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
