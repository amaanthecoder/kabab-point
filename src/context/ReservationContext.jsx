import { createContext, useContext, useState } from "react";
import ReservationModal from "../components/ReservationModal.jsx";

const ReservationContext = createContext(null);

export function ReservationProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ReservationContext.Provider
      value={{ openReservation: () => setIsOpen(true), closeReservation: () => setIsOpen(false) }}
    >
      {children}
      <ReservationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  const ctx = useContext(ReservationContext);
  if (!ctx) throw new Error("useReservation must be used within ReservationProvider");
  return ctx;
}
