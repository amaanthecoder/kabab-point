import { MessageCircle } from "lucide-react";
import { whatsappLink } from "../data/branchData.js";

export default function WhatsAppFloatButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-center gap-2 bg-fire py-3.5 text-sm font-semibold text-warmwhite shadow-2xl lg:hidden"
    >
      <MessageCircle size={18} />
      Order on WhatsApp
    </a>
  );
}
