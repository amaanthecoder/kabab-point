import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button.jsx";
import { useReservation } from "../context/ReservationContext.jsx";

const links = [
  { label: "Home", to: "/" },
  { label: "Menu", to: "/menu" },
  { label: "About Us", to: "/about" },
  { label: "Catering", to: "/catering" },
  { label: "Locations", to: "/locations" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openReservation } = useReservation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-charcoal/95 backdrop-blur shadow-lg py-2" : "bg-charcoal/70 py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
          <img src="/images/logos/kababpoint-logo.webp" alt="Kabab Point" className="h-12 w-12 rounded-md" />
          <span className="sr-only">Kabab Point</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `gold-underline text-sm font-semibold tracking-wide ${
                  isActive ? "text-gold" : "text-warmwhite/90 hover:text-gold"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button variant="primary" onClick={openReservation}>
            Book a Table
          </Button>
        </div>

        <button
          className="text-warmwhite lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 z-40 flex h-screen w-4/5 max-w-xs flex-col gap-8 bg-charcoal px-8 pt-28 shadow-2xl"
          >
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `text-lg font-semibold ${isActive ? "text-gold" : "text-warmwhite"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Button
              variant="primary"
              onClick={() => {
                setMobileOpen(false);
                openReservation();
              }}
            >
              Book a Table
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
