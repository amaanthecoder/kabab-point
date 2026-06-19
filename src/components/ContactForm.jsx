import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase.js";
import { notifyContact } from "../lib/notify.js";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", contact: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!supabase) {
      setError("Messaging system is being set up. Please contact us on WhatsApp or email.");
      setLoading(false);
      return;
    }

    const { error: dbError } = await supabase.from("contact_messages").insert({
      name: form.name,
      contact: form.contact,
      message: form.message,
    });

    if (dbError) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    notifyContact(form);
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-gold/20 bg-warmwhite p-8 text-center">
        <CheckCircle2 size={40} className="text-fire" />
        <h3 className="mt-3 font-display text-xl font-bold text-charcoal">Message Sent!</h3>
        <p className="mt-1 text-sm text-charcoal/60">We'll get back to you as soon as possible.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-gold/20 bg-warmwhite p-6 sm:p-8">
      <input required name="name" value={form.name} onChange={handleChange} placeholder="Your Name"
        className="w-full rounded-lg border border-gold/30 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
      <input required name="contact" value={form.contact} onChange={handleChange} placeholder="Phone or Email"
        className="w-full rounded-lg border border-gold/30 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
      <textarea required name="message" value={form.message} onChange={handleChange} placeholder="Your Message" rows={4}
        className="w-full rounded-lg border border-gold/30 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold" />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button type="submit" disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-maroon py-3 text-sm font-semibold text-warmwhite hover:bg-fire transition-colors disabled:opacity-60">
        {loading && <Loader2 size={16} className="animate-spin" />}
        {loading ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
