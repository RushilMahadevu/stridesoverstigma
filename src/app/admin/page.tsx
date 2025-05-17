"use client";

import { useState } from 'react';
import { verifyAdminPassword } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'; // Add deleteDoc and doc
import { db } from '../firebase';
import { motion } from "framer-motion";
import Link from 'next/link';

// Define a type for registration data
interface Registration {
  id: string;
  [key: string]: string | number | boolean | null | undefined; 
}

// Define Firebase Timestamp interface
interface FirebaseTimestamp {
  seconds: number;
  nanoseconds: number;
}

// Helper function to format timestamps with more specific typing
const formatTimestamp = (value: string | Date | FirebaseTimestamp | unknown): string => {
  try {
    // Handle Firebase Timestamp objects
    if (value && typeof value === 'object' && 'seconds' in value) {
      const timestamp = value as FirebaseTimestamp;
      const date = new Date(timestamp.seconds * 1000);
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    }
    
    // Handle date strings
    if (typeof value === 'string' && !isNaN(Date.parse(value))) {
      const date = new Date(value);
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    }
    
    // If it's neither, just return as string
    return String(value);
  } catch {
    return String(value);
  }
};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState<string | null>(null); // Track which item is being deleted

  const handleLogin = () => {
    if (verifyAdminPassword(password)) {
      setIsAuthenticated(true);
      fetchRegistrations();
      setError('');
    } else {
      setError('Incorrect password');
    }
  }; 

  const fetchRegistrations = async () => {
    try {
      const registrationsCollection = collection(db, 'registrations');
      const registrationsSnapshot = await getDocs(registrationsCollection);
      
      if (registrationsSnapshot.empty) {
        console.log('No registrations found in database');
        setRegistrations([]);
        return;
      }
      
      const registrationsList = registrationsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Registration[];
      
      console.log('Fetched registrations:', registrationsList);
      setRegistrations(registrationsList);
    } catch (error) {
      console.error('Error fetching registrations:', error);
      setError('Failed to load registration data');
    }
  };

  // Add this new function to handle deletion
  const handleDeleteRegistration = async (id: string) => {
    if (!confirm("Are you sure you want to delete this registration?")) {
      return;
    }
    
    setIsDeleting(id);
    
    try {
      // Delete the document from Firebase
      const registrationRef = doc(db, 'registrations', id);
      await deleteDoc(registrationRef);
      
      // Update local state
      setRegistrations(current => current.filter(reg => reg.id !== id));
      
    } catch (error) {
      console.error("Error deleting registration:", error);
      setError("Failed to delete registration. Please try again.");
    } finally {
      setIsDeleting(null);
    }
  };

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
        className="w-full px-6 py-4 flex justify-between items-center text-sm fixed top-0 bg-white z-10 shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="font-semibold">Strides Over Stigma</div>
        <nav className="space-x-4">
          <Link href="/" className="hover:underline transition-colors duration-200">
            Home
          </Link>
          <span className="font-medium">Admin Dashboard</span>
        </nav>
      </motion.header>

      <div className="pt-20 pb-12 px-6 max-w-6xl mx-auto">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold mb-8 text-center"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          Admin Dashboard
        </motion.h1>
        
        {!isAuthenticated ? (
          <motion.div 
            className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg"
            initial="hidden"
            animate="visible"
            variants={slideUp}
          >
            <h2 className="text-xl font-semibold mb-6">Administrator Login</h2>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Admin Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter password"
              />
            </div>
            {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
            <motion.button
              onClick={handleLogin}
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-300 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Login
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Registration Data</h2>
              <p className="text-gray-600 mb-6">
                Showing all {registrations.length} registrations from participants
              </p>
            </div>
            
            {registrations.length > 0 ? (
              <motion.div 
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Registration Cards instead of a scrollable table */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-6">
                  {registrations.map((registration) => (
                    <div 
                      key={registration.id}
                      className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 relative"
                    >
                      {/* Delete Button - positioned in top right */}
                      <motion.button
                        onClick={() => handleDeleteRegistration(registration.id)}
                        className="absolute top-2 right-2 p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        disabled={isDeleting === registration.id}
                        aria-label="Delete registration"
                        title="Delete registration"
                      >
                        {isDeleting === registration.id ? (
                          // Show spinner when deleting
                          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          // Trash icon
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        )}
                      </motion.button>
                      
                      <h3 className="font-semibold text-lg mb-4 pb-2 border-b border-gray-200">
                        {registration.firstName} {registration.lastName}
                      </h3>
                      
                      <div className="space-y-2">
                        {/* Define the desired field order */}
                        {[
                          'firstName', 
                          'lastName', 
                          'email', 
                          'event', 
                          'eventFee', 
                          'shirtSize', 
                          'status',
                          'paymentStatus', 
                          'registeredAt', 
                          'agreeToTerms'
                        ].filter(key => 
                          // Only include keys that exist in this registration
                          key in registration && key !== 'id'
                        ).map((key) => (
                          <div key={key} className="flex justify-between items-start">
                            <span className="text-sm font-medium text-gray-600 capitalize">
                              {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:
                            </span>
                            <span className="text-sm text-right ml-2">
                              {typeof registration[key] === 'boolean'
                                ? (registration[key] ? 'Yes' : 'No')
                                : key.toLowerCase().includes('time') || key.toLowerCase().includes('date') || key.toLowerCase().includes('at')
                                  ? formatTimestamp(registration[key])
                                  : registration[key] !== null && registration[key] !== undefined
                                    ? String(registration[key])
                                    : '-'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Summary Stats */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm font-medium text-gray-600">Total Registrations:</span>
                      <span className="ml-2 font-semibold">{registrations.length}</span>
                    </div>
                    
                    <motion.button
                      onClick={() => fetchRegistrations()}
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Refresh
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-lg">
                <p className="text-gray-500">No registrations found</p>
              </div>
            )}
            
            <div className="mt-8 flex justify-end">
              <motion.button
                onClick={() => setIsAuthenticated(false)}
                className="px-4 py-2 border border-black text-black rounded-md hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Logout
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <motion.footer 
        className="text-xs px-6 py-8 text-gray-500 border-t mt-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div>&copy; {new Date().getFullYear()} Strides Over Stigma - Admin Portal</div>
      </motion.footer>
    </main>
  );
}