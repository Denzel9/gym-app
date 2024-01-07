import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDiFFRR3v9BfoetgcaWH6XRiHZjDC6RqbE',
  authDomain: 'gym12-6e96a.firebaseapp.com',
  projectId: 'gym12-6e96a',
  storageBucket: 'gym12-6e96a.appspot.com',
  messagingSenderId: '1005625005900',
  appId: '1:1005625005900:web:d78527eda482f64cc5a1e9',
}

initializeApp(firebaseConfig)

export const auth = getAuth()

export const register = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password)

export const login = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password)

export const logout = () => signOut(auth)

export const db = getFirestore()
