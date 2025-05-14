"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const mapRef = useRef(null);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8 }
    }
  };
  
  const slideUp = {
    hidden: { y: 25, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8 }
    }
  };

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Header */}
      <motion.header 
        className="w-full px-6 py-4 flex justify-between items-center text-sm fixed top-0 bg-white z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="font-semibold">Strides Over Stigma</div>
        <nav className="space-x-4">
          <a href="#home" className="hover:underline">
            Home
          </a>
          <a href="#about" className="hover:underline">
            Studio
          </a>
          <a href="#work" className="hover:underline">
            Work
          </a>
          <a href="#contact" className="hover:underline">
            Contact
          </a>
        </nav>
        <div className="hidden md:flex flex-col items-end">
          <a 
            href="mailto:stridesoverstigma@gmail.com"
            className="hover:text-gray-700 transition-colors duration-200"
          >
            stridesoverstigma@gmail.com
          </a>
          <a
            href="https://www.instagram.com/strides.over.stigma/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-gray-700 transition-colors duration-200"
          >
            @strides.over.stigma
          </a>
        </div>
      </motion.header>

      {/* First Page - Hero Section */}
      <motion.section 
        id="home"
        className="min-h-screen flex flex-col justify-center items-center pt-20 pb-20 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        <motion.h1 
          className="text-[5rem] md:text-[7rem] font-black leading-none tracking-tight margin-10"
          variants={fadeIn}
        >
          STRIDES OVER STIGMA
        </motion.h1>
        <motion.p 
          className="mt-4 text-sm max-w-md"
          variants={slideUp}
        >
          Strides Over Stigma is a Reno-based nonprofit running organization
          focused on community, mental health, and events.
        </motion.p>
        <motion.div 
          className="mt-10 scroll-mt-16"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          transition={{ delay: 0.5 }}
        >
          <a 
            href="#map-section" 
            className="border border-black px-6 py-3 rounded-full text-sm hover:bg-black hover:text-white transition-colors duration-300"
          >
            Explore Our Routes
          </a>
        </motion.div>
      </motion.section>
      
      {/* Second Page - Map Section */}
      <motion.section 
        id="map-section"
        ref={mapRef}
        className="min-h-screen px-6 flex flex-col justify-center items-center py-20 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.2 }}
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          Our Running Routes
        </motion.h2>
        <motion.div 
          className="aspect-video w-full max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <iframe
            src="https://www.google.com/maps/d/embed?mid=1_96yAMSFkTecAfB4yWLrvKUIIx0N0PI&ehbc=2E312F&noprof=1"
            width="100%"
            height="100%"
            className="rounded-lg border shadow-lg"
            loading="lazy"
            allowFullScreen
          ></iframe>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        className="text-xs px-6 py-12 flex justify-between w-full text-gray-500"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
      >
        <div>&copy; {new Date().getFullYear()} Strides Over Stigma</div>
      </motion.footer>
    </main>
  );
}