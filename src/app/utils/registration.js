import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

/**
 * Save registration data to Firestore
 * @param {Object} registrationData - The registration form data
 * @returns {Promise} Promise that resolves with the registration document reference
 */
export const saveRegistration = async (registrationData) => {
  try {
    // Add a timestamp
    const dataWithTimestamp = {
      ...registrationData,
      registeredAt: serverTimestamp(),
    };
    
    // Add document to "registrations" collection
    const docRef = await addDoc(
      collection(db, "registrations"), 
      dataWithTimestamp
    );
    
    return docRef;
  } catch (error) {
    console.error("Error saving registration: ", error);
    throw error;
  }
};