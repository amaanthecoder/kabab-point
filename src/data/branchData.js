export const brand = {
  name: "Kabab Point",
  tagline: "Kabab Point: Where Taste Meets Tradition. Unleash the Flavour!",
  heroHeadline: "Mumbai-Style Kebabs in the Heart of Sharjah",
  whatsappNumber: "971527219735",
  phoneDisplay: "+971 52 721 9735",
  phoneHref: "tel:+971527219735",
  email: "kababpointshj@gmail.com",
  address: "9C34+VWJ - Al Yarmook - Halwan Suburb - Sharjah - United Arab Emirates",
  // Embeds the location by address text; works without a Maps API key.
  mapsEmbedSrc: "https://www.google.com/maps?q=9C34%2BVWJ+Al+Yarmook+Halwan+Suburb+Sharjah+United+Arab+Emirates&output=embed",
  mapsDirectionsUrl: "https://share.google/xwb2seMx9SxH9jNde",
  hours: [
    { day: "Every Day", time: "10:00 AM - 12:00 AM" },
  ],
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    tiktok: "https://tiktok.com",
  },
};

export const orderPlatforms = [
  {
    id: "noon",
    label: "Noon Food",
    url: "https://food.noon.com/outlet/KBBPNT19NT-KABAB%20POINT/",
    logo: "/images/logos/noon-logo.png",
  },
  {
    id: "talabat",
    label: "Talabat",
    url: "https://www.talabat.com/uae/restaurant/758012/kabab-point-al-yarmook?aid=1560",
    logo: "/images/logos/talabat-logo.webp",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    url: null, // resolved via whatsappLink() at call sites
    logo: "/images/logos/whatsapp-logo.png",
  },
  // Keeta: add { id: "keeta", label: "Keeta", url: "...", logo: "..." } once the link is available.
];

export const whatsappLink = (message = "Hi Kabab Point, I'd like to place an order.") =>
  `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const branches = [
  {
    id: "sharjah-main",
    name: "Kabab Point Sharjah",
    address: brand.address,
    features: ["Dine-in", "Takeaway", "Delivery", "Family Seating"],
  },
];
