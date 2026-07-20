import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSDQm0VGkZnmHuNjcW7I61KzwLVgmFxBs",
  authDomain: "my-guestbook-d4176.firebaseapp.com",
  projectId: "my-guestbook-d4176",
  storageBucket: "my-guestbook-d4176.firebasestorage.app",
  messagingSenderId: "483085798217",
  appId: "1:483085798217:web:8727efed2196ef0b3be898",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);