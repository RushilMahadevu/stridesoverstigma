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
          <a href="#mission" className="hover:underline">
            Mission
          </a>
          <a href="#courses-routes" className="hover:underline">
            Routes
          </a>
          <a href="#registration" className="hover:underline">
            Register
          </a>
          <a href="#about" className="hover:underline">
            About
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
          className="mt-10 scroll-mt-16 flex flex-col sm:flex-row gap-4"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          transition={{ delay: 0.5 }}
        >
          <a 
            href="#mission" 
            className="border border-black px-6 py-3 rounded-full text-sm bg-white text-black hover:bg-black hover:text-white transition-colors duration-300"
          >
            Our Mission
          </a>
          <a 
            href="#courses-routes" 
            className="border border-black px-6 py-3 rounded-full text-sm bg-white text-black hover:bg-black hover:text-white transition-colors duration-300"
          >
            Explore Our Routes
          </a>
        </motion.div>
      </motion.section>
      
      {/* Mission Section */}
      <motion.section 
        id="mission"
        className="min-h-screen px-6 flex flex-col justify-center items-center py-20 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Our Mission</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <motion.div
              className="bg-white p-8 rounded-lg shadow-md"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-4">Mental Health Awareness</h3>
              <p className="text-gray-700">
                We&apos;re dedicated to breaking the stigma surrounding mental health through 
                community engagement and physical activity. We believe running can be both 
                a personal journey and a powerful platform for social change.
              </p>
            </motion.div>
            
            <motion.div
              className="bg-white p-8 rounded-lg shadow-md"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold mb-4">Community Building</h3>
              <p className="text-gray-700">
                Through organized runs and events, we create spaces where people can 
                connect, share experiences, and support each other. Our community 
                is inclusive, welcoming runners of all levels and backgrounds.
              </p>
            </motion.div>
            
            <motion.div
              className="bg-white p-8 rounded-lg shadow-md"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h3 className="text-xl font-semibold mb-4">Education & Resources</h3>
              <p className="text-gray-700">
                We provide access to mental health resources and education, partnering 
                with local organizations to ensure our community members have the support 
                they need both on and off the running path.
              </p>
            </motion.div>
            
            <motion.div
              className="bg-white p-8 rounded-lg shadow-md"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h3 className="text-xl font-semibold mb-4">Advocating for Change</h3>
              <p className="text-gray-700">
                Every stride we take is a step toward a world where mental health is 
                prioritized and stigma-free. Through our events and fundraisers, we 
                advocate for policies that support mental health awareness and treatment.
              </p>
            </motion.div>
          </div>
          
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <p className="text-lg font-medium mb-6">
              Join us in our mission to promote mental well-being through running.
            </p>
            <a 
              href="#registration" 
              className="border border-black px-6 py-3 rounded-full text-sm bg-white text-black hover:bg-black hover:text-white transition-colors duration-300 inline-block"
            >
              Get Involved
            </a>
          </motion.div>
        </motion.div>
      </motion.section>
      
      {/* Second Page - Map Section */}
      <motion.section 
        id="courses-routes"
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
          Courses & Routes
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

      {/* About Us Section */}
      <motion.section
        id="about"
        className="min-h-screen px-6 flex flex-col justify-center items-center py-20 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">About Us</h2>
          
          <div className="flex flex-col md:flex-row gap-12">
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-6">Our Story</h3>
              <p className="text-gray-700 mb-6">
                Strides Over Stigma was developed in 2025 by two high school students from Sage Ridge School 
                who wanted to connect their passion for running with a meaningful cause. We created a 
                supportive running community focused on mental health awareness, aiming to break down 
                stigmas and encourage open conversations about mental well-being.
              </p>
              <p className="text-gray-700">
                Based in Reno, Nevada, our initiative organizes community runs, awareness events, and 
                fundraisers that support local mental health resources and education.
              </p>
            </motion.div>
            
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold mb-6">Our Team</h3>
              <div className="grid grid-cols-2 gap-10">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-3 rounded-full bg-gray-200"></div>
                  <h4 className="font-medium text-lg">Rushil Mahadevu</h4>
                  <p className="text-sm text-gray-600">Co-Founder</p>
                </div>
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-3 rounded-full bg-gray-200"></div>
                  <h4 className="font-medium text-lg">Rhys Ferrito</h4>
                  <p className="text-sm text-gray-600">Co-Founder</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-lg mb-6">
              Want to join our team or volunteer at our events?
            </p>
            <a
              href="mailto:stridesoverstigma@gmail.com"
              className="border border-black px-6 py-3 rounded-full text-sm bg-white text-black hover:bg-black hover:text-white transition-colors duration-300 inline-block"
            >
              Contact Us
            </a>
          </motion.div>
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