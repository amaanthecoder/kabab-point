import emailjs from '@emailjs/browser';

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'amaanpatel7868@gmail.com';

const WA_PHONE   = import.meta.env.VITE_CALLMEBOT_PHONE  || '971562091145';
const WA_APIKEY  = import.meta.env.VITE_CALLMEBOT_APIKEY;

function dubaiTime() {
  return new Date().toLocaleString('en-AE', {
    timeZone: 'Asia/Dubai',
    dateStyle: 'full',
    timeStyle: 'short',
  });
}

// Sends email via EmailJS. Never throws — notification failure should not
// block the form success state.
async function sendEmail(subject, lines) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) return;
  const content = lines.join('\n');
  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    { to_email: ADMIN_EMAIL, subject, content, submitted_at: dubaiTime() },
    PUBLIC_KEY
  ).catch(console.error);
}

// Sends WhatsApp message via CallMeBot using fire-and-forget (no-cors).
// The admin must first activate CallMeBot by sending the activation message
// from +971 562091145 — see .env.local for instructions.
function sendWhatsApp(lines) {
  if (!WA_APIKEY) return;
  const text = encodeURIComponent(lines.join('\n'));
  fetch(
    `https://api.callmebot.com/whatsapp.php?phone=${WA_PHONE}&text=${text}&apikey=${WA_APIKEY}`,
    { mode: 'no-cors' }
  ).catch(() => {});
}

// ─── Public helpers (called by each form on submit) ─────────────────────────

export function notifyReservation({ name, phone, date, time, guests, request }) {
  const lines = [
    `🪑 *New Table Booking — Kabab Point*`,
    ``,
    `Name:    ${name}`,
    `Phone:   ${phone}`,
    `Date:    ${date}`,
    `Time:    ${time}`,
    `Guests:  ${guests}`,
    `Note:    ${request || 'None'}`,
    ``,
    `Submitted: ${dubaiTime()}`,
  ];
  sendEmail('🪑 New Table Booking — Kabab Point', lines);
  sendWhatsApp(lines);
}

export function notifyCatering({ name, phone, date, guests, type, message }) {
  const lines = [
    `🍽️ *New Catering Inquiry — Kabab Point*`,
    ``,
    `Name:        ${name}`,
    `Phone:       ${phone}`,
    `Event Date:  ${date}`,
    `Guests:      ${guests}`,
    `Event Type:  ${type}`,
    `Message:     ${message || 'None'}`,
    ``,
    `Submitted: ${dubaiTime()}`,
  ];
  sendEmail('🍽️ New Catering Inquiry — Kabab Point', lines);
  sendWhatsApp(lines);
}

export function notifyContact({ name, contact, message }) {
  const lines = [
    `💬 *New Message — Kabab Point*`,
    ``,
    `Name:     ${name}`,
    `Contact:  ${contact}`,
    `Message:  ${message}`,
    ``,
    `Submitted: ${dubaiTime()}`,
  ];
  sendEmail('💬 New Message — Kabab Point', lines);
  sendWhatsApp(lines);
}
