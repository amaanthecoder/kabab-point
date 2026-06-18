import { Link } from "react-router-dom";
import { Phone, MapPin, Clock, Mail } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "./SocialIcons.jsx";
import OrderPlatforms from "./OrderPlatforms.jsx";
import { brand } from "../data/branchData.js";

export default function Footer() {
  return (
    <footer className="bg-charcoal pattern-bg text-warmwhite">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        <div>
          <h3 className="font-display text-2xl font-bold text-gold">Kabab Point</h3>
          <p className="mt-2 text-sm font-medium italic text-gold/80">{brand.tagline}</p>
          <p className="mt-3 text-sm leading-relaxed text-warmwhite/70">
            Mumbai-style kebabs, tandoori grills and rich Indian flavours, served fresh
            in Sharjah for family dining, takeaway and catering.
          </p>
          <div className="mt-4 flex gap-3">
            <a href={brand.social.instagram} target="_blank" rel="noopener noreferrer" className="rounded-full border border-gold/40 p-2 text-gold hover:bg-gold hover:text-charcoal transition-colors">
              <InstagramIcon size={18} />
            </a>
            <a href={brand.social.facebook} target="_blank" rel="noopener noreferrer" className="rounded-full border border-gold/40 p-2 text-gold hover:bg-gold hover:text-charcoal transition-colors">
              <FacebookIcon size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-display text-lg text-gold">Opening Hours</h4>
          <ul className="space-y-2 text-sm text-warmwhite/70">
            {brand.hours.map((h) => (
              <li key={h.day} className="flex items-start gap-2">
                <Clock size={16} className="mt-0.5 text-gold" />
                <span>
                  {h.day}
                  <br />
                  {h.time}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-lg text-gold">Contact</h4>
          <ul className="space-y-3 text-sm text-warmwhite/70">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 text-gold" />
              <span>{brand.address}</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone size={16} className="mt-0.5 text-gold" />
              <a href={brand.phoneHref}>{brand.phoneDisplay}</a>
            </li>
            <li className="flex items-start gap-2">
              <Mail size={16} className="mt-0.5 text-gold" />
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
            </li>
          </ul>
          <div className="mt-4">
            <OrderPlatforms variant="dark" compact />
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-display text-lg text-gold">Quick Links</h4>
          <ul className="space-y-2 text-sm text-warmwhite/70">
            <li><Link to="/" className="hover:text-gold">Home</Link></li>
            <li><Link to="/menu" className="hover:text-gold">Menu</Link></li>
            <li><Link to="/about" className="hover:text-gold">About Us</Link></li>
            <li><Link to="/catering" className="hover:text-gold">Catering</Link></li>
            <li><Link to="/locations" className="hover:text-gold">Locations</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gold/15 px-6 py-5 text-center text-xs text-warmwhite/50">
        © {new Date().getFullYear()} Kabab Point, Sharjah, UAE. All rights reserved.
      </div>
    </footer>
  );
}
