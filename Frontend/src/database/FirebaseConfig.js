// src/firebase.ts or FirebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDswaV-lw_WzrutwwUF1QLuoXZ4O8Nwp6Q",
  authDomain: "kanban-board-7eb22.firebaseapp.com",
  projectId: "kanban-board-7eb22",
  storageBucket: "kanban-board-7eb22.appspot.com",
  messagingSenderId: "373602562750",
  appId: "1:373602562750:web:d31de2aac8f8f7539e24ef",
  measurementId: "G-X04VL733B1",
};

// Initialize Firebase App only once
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
