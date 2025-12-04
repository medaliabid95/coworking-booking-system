'use client'
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Quote from './components/Quote';
import Spaces from './components/Spaces';
import Facilities from './components/Facilities';
import BrowseBySize from './components/BrowseBySize';
import About from './components/About';
import Clients from './components/Clients';
import Gallery from './components/Gallery';
import VideoTour from './components/VideoTour';
import Locations from './components/Locations';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Stats />
      <Quote />
      <Spaces limit={4} random showBrowseButton browseHref="/spaces" />
      <Facilities />
      <BrowseBySize />
      <About />
      <Clients />
      <Gallery />
      <VideoTour />
      <Locations />
      <HowItWorks />
      <Testimonials />
      <Blog />
      <Footer />
    </div>
  );
}
