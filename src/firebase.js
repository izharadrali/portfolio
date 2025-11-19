import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let db = null;
let isFirebaseConfigured = false;

if (firebaseConfig.projectId) {
  try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    isFirebaseConfigured = true;
  } catch (err) {
    // If initialization fails, log and continue without Firestore
    // so the site can still function locally without Firebase.
    // eslint-disable-next-line no-console
    console.warn('Firebase initialization failed:', err);
  }
} else {
  // eslint-disable-next-line no-console
  console.info('Firebase not configured. Set VITE_FIREBASE_PROJECT_ID and related env vars to enable Firestore.');
}

export { db, isFirebaseConfigured };
