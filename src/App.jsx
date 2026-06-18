import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import WhatsAppFloatButton from "./components/WhatsAppFloatButton.jsx";
import PageTransition from "./components/PageTransition.jsx";
import { ReservationProvider } from "./context/ReservationContext.jsx";
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import About from "./pages/About.jsx";
import Catering from "./pages/Catering.jsx";
import Locations from "./pages/Locations.jsx";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/menu" element={<PageTransition><Menu /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/catering" element={<PageTransition><Catering /></PageTransition>} />
        <Route path="/locations" element={<PageTransition><Locations /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ReservationProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 pb-16 lg:pb-0">
          <AnimatedRoutes />
        </main>
        <Footer />
        <WhatsAppFloatButton />
      </div>
    </ReservationProvider>
  );
}
