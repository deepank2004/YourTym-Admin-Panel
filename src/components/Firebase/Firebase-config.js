import { getFirestore} from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAajly_EuPEIyDz79IFDwtKy3kCZiG2etE",
    authDomain: "yourtimechat.firebaseapp.com",
    projectId: "yourtimechat",
    storageBucket: "yourtimechat.firebasestorage.app",
    messagingSenderId: "402576759829",
    appId: "1:402576759829:web:fcc86381eeb496c5c3421c",
    measurementId: "G-MCKE2338X3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };