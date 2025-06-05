"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { saveRegistration } from "./utils/registration";
import { useScroll } from "framer-motion";
import Image from "next/image";

// Custom hook to check for reduced motion preference
const useReducedMotion = () => {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    // Check if the user prefers reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldReduceMotion(mediaQuery.matches);

    // Check if device is likely mobile (rough estimation)
    const isMobileDevice =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (isMobileDevice) {
      setShouldReduceMotion(true);
    }

    const onChange = () => setShouldReduceMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", onChange);

    return () => {
      mediaQuery.removeEventListener("change", onChange);
    };
  }, []);

  return shouldReduceMotion;
};

export default function Home() {
  const mapRef = useRef(null);
  // For scroll progress bar
  const { scrollYProgress } = useScroll();

  // Add smooth scrolling with CSS
  useEffect(() => {
    // Add scroll-behavior: smooth to html element
    document.documentElement.style.scrollBehavior = "smooth";

    // Cleanup function to remove the style when component unmounts
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 },
    },
  };

  const slideUp = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8 },
    },
  };

  // Form state with proper TypeScript types
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    event: "",
    shirtSize: "",
    agreeToTerms: false,
  });

  // Add explicit type for formStatus
  const [formStatus, setFormStatus] = useState<{
    loading: boolean;
    success: boolean;
    error: string | null;
  }>({
    loading: false,
    success: false,
    error: null,
  });

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value, type } = e.target;

    // Handle checkbox inputs separately
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement; // Type assertion for checkbox
      setFormData((prevData) => ({
        ...prevData,
        [id]: target.checked,
      }));
    } else {
      // Handle text inputs and selects
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form
    if (!formData.agreeToTerms) {
      setFormStatus({
        loading: false,
        success: false,
        error: "Please agree to the terms and conditions.",
      });
      return;
    }

    try {
      setFormStatus({ loading: true, success: false, error: null });

      // Get event fee based on selection
      let eventFee = 0;
      switch (formData.event) {
        case "5k":
          eventFee = 10;
          break;
        // case "10k":
        //   eventFee = 45;
        //   break;
        // case "half":
        //   eventFee = 65;
        //   break;
        default:
          throw new Error("Please select a valid event");
      }

      // Save registration to Firebase
      await saveRegistration({
        ...formData,
        eventFee,
        status: "registered", // initial status
        paymentStatus: "pending", // could be updated later when payment is processed
      });

      // Reset form and show success message
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        event: "",
        shirtSize: "",
        agreeToTerms: false,
      });

      setFormStatus({
        loading: false,
        success: true,
        error: null,
      });

      // Hide success message after 5 seconds
      setTimeout(() => {
        setFormStatus((prev) => ({ ...prev, success: false }));
      }, 5000);
    } catch (error) {
      console.error("Registration error:", error);
      // Provide more specific error message
      let errorMessage = "Registration failed. Please try again.";

      // Check if it's a Firebase error
      if (error instanceof Error) {
        if (error.message.includes("permissions")) {
          errorMessage = "Server configuration error. Please contact support.";
        } else if (error.message.includes("network")) {
          errorMessage =
            "Network error. Please check your connection and try again.";
        }
      }

      setFormStatus({
        loading: false,
        success: false,
        error: errorMessage,
      });
    }
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Header */}
      <motion.header
        className="w-full px-6 py-4 flex justify-between items-center text-sm fixed top-0 bg-white z-10 shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="font-semibold text-base">Strides Over Stigma</div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4">
          <a
            href="#home"
            className="hover:underline transition-colors duration-200"
          >
            Home
          </a>
          <a
            href="#mission"
            className="hover:underline transition-colors duration-200"
          >
            Mission
          </a>
          <a
            href="#events"
            className="hover:underline transition-colors duration-200"
          >
            Events
          </a>
          <a
            href="#register"
            className="hover:underline transition-colors duration-200"
          >
            Register
          </a>
          <a
            href="#stories"
            className="hover:underline transition-colors duration-200"
          >
            Stories
          </a>
          <a
            href="#about"
            className="hover:underline transition-colors duration-200"
          >
            About
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-black p-2 rounded-md hover:bg-gray-100 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          whileTap={{ scale: 0.95 }}
        >
          {mobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </motion.button>

        {/* Contact Info */}
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-20 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {/* Close Button (X) - Positioned in top-right corner */}
            <motion.button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 9 }}
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.2 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>

            <motion.nav
              className="flex flex-col space-y-6 text-center text-lg pt-20 px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Staggered menu items */}
              {[
                "Home",
                "Mission",
                "Events",
                "Register",
                "Stories",
                "About",
              ].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 hover:bg-gray-100 rounded"
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 + i * 0.05, // Stagger effect
                    duration: 0.2,
                  }}
                >
                  {item}
                </motion.a>
              ))}

              <motion.div
                className="pt-6 border-t border-gray-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <motion.a
                  href="mailto:stridesoverstigma@gmail.com"
                  className="block py-2"
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  stridesoverstigma@gmail.com
                </motion.a>
                <motion.a
                  href="https://www.instagram.com/strides.over.stigma/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-2"
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                >
                  @strides.over.stigma
                </motion.a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-[72px] left-0 h-1 bg-black z-50"
        style={{
          scaleX: scrollYProgress,
          transformOrigin: "0%",
          width: "100%",
          opacity: shouldReduceMotion ? 0 : 1,
        }}
      />

      {/* First Page - Hero Section */}
      <motion.section
        id="home"
        className="min-h-screen flex flex-col justify-center items-center pt-20 pb-20 text-center px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        <motion.h1
          className="text-[3.5rem] sm:text-[5rem] md:text-[8rem] font-black leading-none tracking-tight"
          variants={fadeIn}
          transition={{
            duration: shouldReduceMotion ? 0.3 : 0.8,
          }}
        >
          STRIDES OVER STIGMA
        </motion.h1>
        <motion.p
          className="mt-4 text-sm max-w-xs sm:max-w-md mx-auto px-4"
          variants={slideUp}
        >
          Strides Over Stigma is a Reno-based running organization focused on
          community, mental health, and events.
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
            href="#events"
            className="border border-black px-6 py-3 rounded-full text-sm bg-white text-black hover:bg-black hover:text-white transition-colors duration-300"
          >
            Upcoming Events
          </a>
        </motion.div>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        id="mission"
        className="min-h-screen px-4 sm:px-6 flex flex-col justify-center items-center py-16 sm:py-20 bg-gray-50"
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-center">
            Our Mission
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-8">
            <motion.div
              className="bg-white p-4 sm:p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                Mental Health Awareness
              </h3>
              <p className="text-gray-700 text-sm sm:text-base">
                We&apos;re dedicated to breaking the stigma surrounding mental
                health through community engagement and physical activity. We
                believe running can be both a personal journey and a powerful
                platform for social change.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-4 sm:p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Community Building</h3>
              <p className="text-gray-700 text-sm sm:text-base">
                Through organized runs and events, we create spaces where people
                can connect, share experiences, and support each other. Our
                community is inclusive, welcoming runners of all levels and
                backgrounds.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-4 sm:p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                Awareness & Dialogue
              </h3>
              <p className="text-gray-700 text-sm sm:text-base">
                We promote mental health awareness through our running events
                and online presence. By creating spaces for open conversation
                and sharing educational content, we help break down stigmas and
                foster understanding within our running community.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-4 sm:p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                Advocating for Change
              </h3>
              <p className="text-gray-700 text-sm sm:text-base">
                Every stride we take is a step toward a world where mental
                health is prioritized and stigma-free. Through our events and
                fundraisers, we advocate for policies that support mental health
                awareness.
              </p>
            </motion.div>
          </div>

          <motion.div
            className="mt-8 sm:mt-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <p className="text-base sm:text-lg font-medium mb-4 sm:mb-6">
              Join us in our mission to promote mental well-being through
              running.
            </p>
            <a
              href="#register"
              className="border border-black px-5 py-2 sm:px-6 sm:py-3 rounded-full text-sm bg-white text-black hover:bg-black hover:text-white transition-colors duration-300 inline-block"
            >
              Get Involved
            </a>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Second Page - Map Section */}
      <motion.section
        id="events"
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
          Upcoming Events
        </motion.h2>

        <motion.div
          className="mb-8 max-w-4xl w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white p-5 sm:p-8 rounded-lg shadow-lg border-2 border-gray-200 hover:border-black transition-colors duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 sm:mb-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 text-left">
                  Strides Over Stigma - Wetlands 5K
                </h3>
                <p className="text-gray-700 mb-2 text-left text-sm sm:text-base">
                  <strong>Projected Date:</strong> Friday, September 6, 2025
                </p>
              </div>
              <span className="mt-2 md:mt-0 px-3 py-1 bg-black text-white rounded-full text-xs sm:text-sm inline-block self-start md:self-auto">
                5K Run/Walk
              </span>
            </div>

            <div className="aspect-video w-full h-[200px] sm:h-[250px] md:h-[400px] mb-5 sm:mb-10 overflow-hidden rounded-md border-2 border-gray-300 shadow-md">
              <iframe
                src="https://www.google.com/maps/d/embed?mid=1_96yAMSFkTecAfB4yWLrvKUIIx0N0PI&ehbc=2E312F&noprof=1"
                width="100%"
                height="100%"
                className="rounded-md"
                loading="lazy"
                allowFullScreen
                title="Event Map"
              ></iframe>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 sm:gap-4">
              <div className="text-left w-full md:w-auto">
                <p className="text-gray-800 font-medium text-sm sm:text-base">
                  Damonte Ranch Wetlands, Reno
                </p>
                <p className="text-gray-600 text-xs sm:text-sm">
                  All ages and fitness levels welcome
                </p>
              </div>
              <motion.a
                href="#register"
                className="border-2 border-black px-4 sm:px-8 py-2 sm:py-3 rounded-full text-xs sm:text-sm bg-black text-white hover:bg-white hover:text-black transition-colors duration-300 inline-block w-full md:w-auto text-center mt-2 md:mt-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Register Now
              </motion.a>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Registration Section */}
      <motion.section
        id="register"
        className="min-h-screen px-4 sm:px-6 flex flex-col justify-center items-center py-12 sm:py-20 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="w-full max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">
            Event Registration
          </h2>
          <p className="text-base sm:text-lg mb-4 sm:mb-8">
            Sign up for our upcoming community run events
          </p>

          <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg">
            {formStatus.success && (
              <motion.div
                className="bg-green-100 border-l-4 border-green-500 text-green-700 p-3 sm:p-4 mb-4 sm:mb-6 text-sm sm:text-base"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p>
                  Thank you for registering! We&apos;ve received your
                  information.
                </p>
              </motion.div>
            )}

            {formStatus.error && (
              <motion.div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 sm:p-4 mb-4 sm:mb-6 text-sm sm:text-base"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p>{formStatus.error}</p>
              </motion.div>
            )}

            <form className="space-y-4 sm:space-y-6 text-left" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-3 sm:gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                <div>
                  <label
                    htmlFor="event"
                    className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                  >
                    Select Event
                  </label>
                  <select
                    id="event"
                    value={formData.event}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
                    required
                  >
                    <option value="">Choose an event</option>
                    <option value="5k">
                      SOS - Wetlands 5K (Sept 6, 2025)
                    </option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="shirtSize"
                    className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                  >
                    T-Shirt Size
                  </label>
                  <select
                    id="shirtSize"
                    value={formData.shirtSize}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
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
              </div>

              <div className="flex items-start">
                <input
                  id="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="h-4 w-4 sm:h-5 sm:w-5 mt-1 text-black focus:ring-black border-gray-300 rounded cursor-pointer"
                  required
                />
                <label
                  htmlFor="agreeToTerms"
                  className="ml-2 text-xs sm:text-sm text-gray-700"
                >
                  I agree to the{" "}
                  <a href="#" className="text-black underline">
                    terms and conditions
                  </a>
                </label>
              </div>

              <motion.button
                type="submit"
                className="w-full bg-black text-white py-2 sm:py-3 px-4 sm:px-6 rounded-md cursor-pointer hover:bg-gray-800 transition-colors duration-300 disabled:bg-gray-400 text-sm sm:text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={formStatus.loading}
              >
                {formStatus.loading ? "Processing..." : "Register Now"}
              </motion.button>
            </form>

            <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-600">
              Registration fee:{" "}
              <span className="italic">Projected to be $15</span>
              <br />
              All are welcome to participate.
            </p>
          </div>
        </motion.div>
      </motion.section>
      {/* Your Stories Section */}
      <motion.section
        id="stories"
        className="min-h-screen px-6 flex flex-col justify-center items-center py-20"
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Your Stories
          </h2>

          <p className="text-center text-lg mb-10 max-w-2xl mx-auto">
            Real stories from real runners about how movement has impacted their
            mental health journey.
          </p>

          {/* Story Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Example Story Cards - You can replace these with real stories later */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-800 mr-4 flex items-center justify-center text-white font-bold text-xl">
                  K
                </div>
                <div>
                  <h4 className="font-medium">
                    <a
                      href="https://www.instagram.com/mrkingrichy/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      King Richardson
                    </a>
                  </h4>
                  <p className="text-sm text-gray-600">
                    Runner & Community Member
                  </p>
                </div>
              </div>
              <p className="text-gray-700 italic mb-4">
                &quot;Running made me start to learn the beauty we have all
                around us -- whether it be the beautiful nature, or the ones
                that support you through every step you take.&quot;
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-800 mr-4 flex items-center justify-center text-white font-bold text-xl">
                  R
                </div>
                <div>
                  <h4 className="font-medium">
                    <a
                      href="https://www.instagram.com/byee.tuesday/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      Ruby Snook
                    </a>
                  </h4>
                  <p className="text-sm text-gray-600">
                    Runner & Community Member
                  </p>
                </div>
              </div>
              <p className="text-gray-700 italic mb-4">
                &quot;Running helped me realize that I can&apos;t control
                everything but I can control how I react and cope with issues
                that happen in my daily life. Running helps me take a breather
                and reflect.&quot;
              </p>
            </motion.div>
          </div>

          {/* Story Submission CTA */}
          <motion.div
            className="bg-gray-50 p-8 rounded-lg shadow-md text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-4">Share Your Story</h3>
            <p className="mb-6 max-w-2xl mx-auto">
              We&apos;re collecting real stories to show how running has helped
              people cope, grow, or heal mentally. We&apos;d love to share your
              experience to help others see the power in each stride.
            </p>
            <p className="mb-6 text-gray-700">
              If you&apos;ve ever felt a mental boost from a run whether it
              cleared your mind, eased anxiety, or brought you peace, your story
              could inspire someone else to lace up and find healing too.
            </p>
            <motion.a
              href="mailto:stridesoverstigma@gmail.com?subject=My Running Story"
              className="border border-black px-6 py-3 rounded-full text-sm bg-black text-white hover:bg-white hover:text-black transition-colors duration-300 inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Submit Your Story
            </motion.a>
          </motion.div>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            About Us
          </h2>

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
                Strides Over Stigma was developed in 2025 by two high school
                students from Sage Ridge School who wanted to connect their
                passion for running with a meaningful cause. We created a
                supportive running community focused on mental health awareness,
                aiming to break down stigmas and encourage open conversations
                about mental well-being.
              </p>
              <p className="text-gray-700">
                Based in Reno, Nevada, our initiative organizes community runs,
                awareness events, and fundraisers that support local mental
                health resources and education.
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
                  <a
                    href="https://www.instagram.com/rushil.mahadevu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <div className="w-32 h-32 mx-auto mb-3 rounded-full overflow-hidden relative  transition-all">
                      <Image
                        src="/images/rushil.jpg"
                        alt="Rushil Mahadevu"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="128px"
                        priority
                      />
                    </div>
                    <h4 className="font-medium text-lg group-hover:underline">
                      Rushil Mahadevu
                    </h4>
                    <p className="text-sm text-gray-600">
                      Co-Founder & Chief Technology Officer (CTO)
                    </p>
                  </a>
                </div>
                <div className="text-center">
                  <a
                    href="https://www.instagram.com/rhysferrito/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <div className="w-32 h-32 mx-auto mb-3 rounded-full overflow-hidden relative transition-all">
                      <Image
                        src="/images/rhys.jpg"
                        alt="Rhys Ferrito"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="128px"
                        priority
                      />
                    </div>
                    <h4 className="font-medium text-lg group-hover:underline">
                      Rhys Ferrito
                    </h4>
                    <p className="text-sm text-gray-600">
                      Co-Founder & Chief Marketing Officer (CMO)
                    </p>
                  </a>
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
