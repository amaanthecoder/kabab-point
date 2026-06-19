import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase.js";
import { notifyReservation } from "../lib/notify.js";

const initialForm = { name: "", phone: "", date: "", time: "", guests: "2", request: "" };

export default function ReservationModal({ isOpen, onClose }) {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!supabase) {
      setError("Booking system is being set up. Please call or WhatsApp us directly.");
      setLoading(false);
      return;
    }

    const { error: dbError } = await supabase.from("reservations").insert({
      name: form.name,
      phone: form.phone,
      date: form.date,
      time: form.time,
      guests: parseInt(form.guests) || form.guests,
      special_request: form.request || null,
    });

    if (dbError) {
      setError("Something went wrong. Please try again or call us directly.");
      setLoading(false);
      return;
    }

    // Email + WhatsApp notifications — fire and forget, never block success
    notifyReservation(form);
    setSubmitted(true);
    setLoading(false);
  };

  const handleClose = () => {
    onClose();
    setSubmitted(false);
    setError("");
    setForm(initialForm);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/80 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl border border-gold/30 bg-warmwhite p-6 sm:p-8"
          >
            <button onClick={handleClose} className="absolute right-4 top-4 text-charcoal/60 hover:text-royal">
              <X size={22} />
            </button>

            {submitted ? (
              <div className="flex flex-col items-center py-6 text-center">
                <CheckCircle2 size={48} className="text-fire" />
                <h3 className="mt-4 font-display text-2xl font-bold text-charcoal">Reservation Received!</h3>
                <p className="mt-2 text-sm text-charcoal/70">
                  Thank you, {form.name}. Our team will confirm your table shortly.
                </p>
              </div>
            ) : (
              <>
                <h3 className="font-display text-2xl font-bold text-charcoal">Book a Table</h3>
                <p className="mt-1 text-sm text-charcoal/60">Reserve your spot at Kabab Point Sharjah.</p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <input required name="name" value={form.name} onChange={handleChange} placeholder="Full Name"
                    className="w-full rounded-lg border border-gold/30 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
                  <input required name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number"
                    className="w-full rounded-lg border border-gold/30 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
                  <div className="grid grid-cols-2 gap-3">
                    <input required type="date" name="date" value={form.date} onChange={handleChange}
                      className="w-full rounded-lg border border-gold/30 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
                    <input required type="time" name="time" value={form.time} onChange={handleChange}
                      className="w-full rounded-lg border border-gold/30 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
                  </div>
                  <select name="guests" value={form.guests} onChange={handleChange}
                    className="w-full rounded-lg border border-gold/30 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold">
                    {[1, 2, 3, 4, 5, 6, "7+"].map((n) => (
                      <option key={n} value={n}>{n} guest{n === 1 ? "" : "s"}</option>
                    ))}
                  </select>
                  <textarea name="request" value={form.request} onChange={handleChange}
                    placeholder="Special request (optional)" rows={3}
                    className="w-full rounded-lg border border-gold/30 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold" />

                  {error && <p className="text-sm text-red-600">{error}</p>}

                  <button type="submit" disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-maroon py-3 text-sm font-semibold text-warmwhite hover:bg-fire transition-colors disabled:opacity-60">
                    {loading && <Loader2 size={16} className="animate-spin" />}
                    {loading ? "Confirming…" : "Confirm Reservation"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
