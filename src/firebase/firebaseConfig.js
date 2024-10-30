import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "Your-api-key",
  authDomain: "your-key",
  projectId: "your-id",
  storageBucket: "your-key",
  messagingSenderId: "your-key",
  appId: "your-key",
  measurementId: "your-key"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };