import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARXDiYjznCzi26fvt00cEXDp-88f6zNTc",
  authDomain: "messenger-mern-clone-dca82.firebaseapp.com",
  projectId: "messenger-mern-clone-dca82",
  storageBucket: "messenger-mern-clone-dca82.appspot.com",
  messagingSenderId: "468616337977",
  appId: "1:468616337977:web:1e80cf727273ca38288be8",
  measurementId: "G-R8YCSSJ33J",
};
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// export
export { app, auth, firestore, storage };
