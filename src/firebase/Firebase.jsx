import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBhscCZDJf7Xd-Mnr6WfDueMRFeGr_AYGY",
  authDomain: "lunacal-f6c48.firebaseapp.com",
  projectId: "lunacal-f6c48",
  storageBucket: "lunacal-f6c48.appspot.com",
  messagingSenderId: "16879458212",
  appId: "1:16879458212:web:203fc2df7c705c2e89d331"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);

const storage = getStorage(app);

export {fireDB,storage};