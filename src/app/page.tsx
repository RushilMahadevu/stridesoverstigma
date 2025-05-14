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
            About
          </a>
          <a href="#registration" className="hover:underline">
            Register
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

      {/* Registration Section */}
      <motion.section
        id="registration"
        className="min-h-screen px-6 flex flex-col justify-center items-center py-20 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Race Registration</h2>
          <p className="text-lg mb-8">Sign up for our upcoming community run events</p>
          
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <form className="space-y-6 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="event" className="block text-sm font-medium text-gray-700 mb-1">Select Event</label>
                <select
                  id="event"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  required
                >
                  <option value="">Choose an event</option>
                  <option value="5k">Community 5K Run - June 15, 2025</option>
                  <option value="10k">Mental Health Awareness 10K - July 20, 2025</option>
                  <option value="half">Half Marathon - September 5, 2025</option>
                </select>
              </div>

              <div>
                <label htmlFor="shirtSize" className="block text-sm font-medium text-gray-700 mb-1">T-Shirt Size</label>
                <select
                  id="shirtSize"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  required
                >
                  <option value="">Select size</option>
                  <option value="xs">XS</option>
                  <option value="s">S</option>
                  <option value="m">M</option>
                  <option value="l">L</option>
                  <option value="xl">XL</option>
                  <option value="xxl">XXL</option>
                </select>
              </div>
              
              <div className="flex items-start">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 mt-1 text-black focus:ring-black border-gray-300 rounded cursor-pointer"
                  required
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                  I agree to the <a href="#" className="text-black underline">terms and conditions</a> and acknowledge the <a href="#" className="text-black underline">waiver of liability</a>
                </label>
              </div>
              
              <motion.button
                type="submit"
                className="w-full bg-black text-white py-3 px-6 rounded-md cursor-pointer hover:bg-gray-800 transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Register Now
              </motion.button>
            </form>
            
            <p className="mt-6 text-sm text-gray-600">
              Registration fee: $35 for 5K, $45 for 10K, $65 for Half Marathon.
              <br />
              All proceeds support mental health awareness programs.
            </p>
          </div>
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