import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDpYmD6FrOLfPMKdvnX5DoNLdzLYh2vFaM",
  authDomain: "mz-projects-6f5a9.firebaseapp.com",
  projectId: "mz-projects-6f5a9",
  storageBucket: "mz-projects-6f5a9.firebasestorage.app",
  messagingSenderId: "454812915813",
  appId: "1:454812915813:web:8d8e6b955011273c148e8c",
}

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
export const db = getFirestore(app)
