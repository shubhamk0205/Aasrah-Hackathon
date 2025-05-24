import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDswaV-lw_WzrutwwUF1QLuoXZ4O8Nwp6Q",
  authDomain: "kanban-board-7eb22.firebaseapp.com",
  projectId: "kanban-board-7eb22",
  storageBucket: "kanban-board-7eb22.firebasestorage.app",
  messagingSenderId: "373602562750",
  appId: "1:373602562750:web:d31de2aac8f8f7539e24ef",
  measurementId: "G-X04VL733B1"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
