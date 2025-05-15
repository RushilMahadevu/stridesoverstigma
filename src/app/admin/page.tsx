"use client";

import { useState } from 'react';
import { verifyAdminPassword } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

// Define a type for registration data
interface Registration {
  id: string;
  [key: string]: string | number | boolean | null | undefined; 
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [error, setError] = useState('');

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
      const registrationsList = registrationsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Registration[];
      setRegistrations(registrationsList);
    } catch (error) {
      console.error('Error fetching registrations:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      {!isAuthenticated ? (
        <div className="max-w-md">
          <h2 className="text-xl mb-4">Please enter admin password</h2>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Admin password"
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl mb-4">Registrations</h2>
          {registrations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    {Object.keys(registrations[0]).filter(key => key !== 'id').map((header) => (
                      <th key={header} className="py-2 px-4 border-b text-left">
                        {header.charAt(0).toUpperCase() + header.slice(1)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((registration) => (
                    <tr key={registration.id}>
                      {Object.keys(registration).filter(key => key !== 'id').map((key) => (
                        <td key={key} className="py-2 px-4 border-b">
                          {String(registration[key])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No registrations found</p>
          )}
        </div>
      )}
    </div>
  );
}