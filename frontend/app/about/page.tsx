import Header from "../components/Header";
import Footer from "../components/Footer";
import About from "../components/About";
import Clients from "../components/Clients";
import Stats from "../components/Stats";
import Locations from "../components/Locations";

import { ChevronRight } from 'lucide-react';
import FAQs from "../components/FAQs";



export default function ContactPage() {
  return (
    <>
      <Header />
     {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-r from-black to-gray-900">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-5xl text-white mb-4 animate-fadeIn">About Us</h2>
          <div className="flex items-center justify-center gap-2 text-white animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <a href="#" className="hover:text-[#ff836b] transition">Home</a>
            <ChevronRight size={16} />
            <span className="text-[#ff836b]">About</span>
          </div>
        </div>
      </section>
     <About/>
     <Clients/>
     <Stats/>
     {/* <Values/> */}
     <Locations/>
     {/* <Team/> */}
     <FAQs/>
     <Footer />
     
    </>
  );
}