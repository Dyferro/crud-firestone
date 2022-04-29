import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaj7ibHVYRjGx_XcVomjkVLLjiE-JRDpo",
  authDomain: "crud-firestone-87ba2.firebaseapp.com",
  projectId: "crud-firestone-87ba2",
  storageBucket: "crud-firestone-87ba2.appspot.com",
  messagingSenderId: "659303484857",
  appId: "1:659303484857:web:a8bfe9b9272b5aebacba68",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export { firebase };
