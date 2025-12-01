import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { ChevronRight } from "lucide-react";




export default function SpacesDetailPage() {
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
        <h2 className="text-5xl mb-4 font-bold">Space Detail</h2>
        <div className="flex items-center justify-center gap-2 text-gray-300">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <ChevronRight size={16} className="text-orange-500" />
          <span className="text-whit">Spaces</span>
        </div>
      </div>
    </section>
     <Footer />
     
    </>
  );
}