import { db } from '../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

// Helper function to check the user's role
export const checkUserRole = async (userId) => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const userData = userSnap.data();
    return userData.role || null; 
  }
  return null; 
};
