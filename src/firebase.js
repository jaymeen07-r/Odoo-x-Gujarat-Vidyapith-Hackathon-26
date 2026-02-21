import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCQuGov7gBriedjmcc8DPY7epnLO9uKyX8",
  authDomain: "fleetmatrix-01.firebaseapp.com",
  projectId: "fleetmatrix-01",
  storageBucket: "fleetmatrix-01.firebasestorage.app",
  messagingSenderId: "885072303080",
  appId: "1:885072303080:web:a51678b9595352f2d84a5d",
  measurementId: "G-HEE4Q0BQFF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
