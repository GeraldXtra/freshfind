import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BookmarksProvider } from "./context/BookmarksContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatbotWidget from "./components/ChatbotWidget";
import Home from "./pages/Home";
import Directory from "./pages/Directory";
import MarketDetail from "./pages/MarketDetail";
import ProduceGuide from "./pages/ProduceGuide";
import Seasonal from "./pages/Seasonal";
import Bookmarks from "./pages/Bookmarks";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter basename="/freshfind/">
      <BookmarksProvider>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/directory" element={<Directory />} />
            <Route path="/market/:id" element={<MarketDetail />} />
            <Route path="/produce" element={<ProduceGuide />} />
            <Route path="/seasonal" element={<Seasonal />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <ChatbotWidget />
        <Footer />
      </BookmarksProvider>
    </BrowserRouter>
  );
}
