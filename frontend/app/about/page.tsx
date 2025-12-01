import Header from "../components/Header";
import Footer from "../components/Footer";
import About from "../components/About";
import Clients from "../components/Clients";
import Stats from "../components/Stats";
import Locations from "../components/Locations";

import { ChevronRight } from 'lucide-react';
import FAQs from "../components/FAQs";
import Link from "next/link";



export default function AboutPage() {
  return (
    <>
      <Header />
     {/* Hero Section */}
     <section className="relative min-h-[50vh] flex items-center justify-center"> 
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop"
            alt="image" 
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>  

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center text-white">
        <h2 className="text-5xl mb-4 font-bold">About Us</h2>
        <div className="flex items-center justify-center gap-2 text-gray-300">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <ChevronRight size={16} className="text-orange-500" />
          <span className="text-whit">About</span>
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