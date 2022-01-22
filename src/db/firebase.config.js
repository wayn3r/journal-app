import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    addDoc,
    updateDoc,
    deleteDoc,
    collection,
    getDocs,
    doc,
} from 'firebase/firestore'
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signOut,
} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCf1VxGrJNpWrBY6twCYQiqdZ9pxoI4qYg',
    authDomain: 'curso-fernando-herrera.firebaseapp.com',
    projectId: 'curso-fernando-herrera',
    storageBucket: 'curso-fernando-herrera.appspot.com',
    messagingSenderId: '489349489796',
    appId: '1:489349489796:web:02da4377dc110a6776ced1',
}
const firebaseConfigTesting = {
    apiKey: 'AIzaSyCej8bVJGbJbMVQN1o68tMj9y-Y1cOOReE',
    authDomain: 'testing-server-56831.firebaseapp.com',
    projectId: 'testing-server-56831',
    storageBucket: 'testing-server-56831.appspot.com',
    messagingSenderId: '889635567423',
    appId: '1:889635567423:web:0b964468e503997531058a',
}

const app = initializeApp(process.env.NODE_ENV === 'test' ? firebaseConfigTesting : firebaseConfig)
const _db = getFirestore(app)
const auth = getAuth(app)
const googleAuthProvider = new GoogleAuthProvider()

const signin = {
    popup: () => signInWithPopup(auth, googleAuthProvider),
    email: (email, password) => signInWithEmailAndPassword(auth, email, password),
}
const signup = {
    createUser: (email, password) => createUserWithEmailAndPassword(auth, email, password),
}

const authentication = {
    onChanged: callback => onAuthStateChanged(auth, callback),
    logout: () => signOut(auth),
}
const db = {
    addDoc: (path, data) => addDoc(collection(_db, path), data),
    updateDoc: (path, data) => updateDoc(doc(_db, path), data),
    deleteDoc: path => deleteDoc(doc(_db, path)),
    getDocs: path => getDocs(collection(_db, path)),
}
export { db, signin, signup, authentication, updateProfile }
