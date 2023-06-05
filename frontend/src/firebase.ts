// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCRYbdjV3EaYfSBBiPWohxy8f5udsheWWA',
  authDomain: 'checkmate-7e6f1.firebaseapp.com',
  projectId: 'checkmate-7e6f1',
  storageBucket: 'checkmate-7e6f1.appspot.com',
  messagingSenderId: '196686438423',
  appId: '1:196686438423:web:beae949fb48ba41a91fc52',
  measurementId: 'G-GJ43GXXNGP',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDb = getFirestore(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);
