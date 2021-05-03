import firebase from "firebase";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMB1b2vAXpWaVNTiQpZYhvrZ4cO09Yens",
  authDomain: "waldo-sid.firebaseapp.com",
  projectId: "waldo-sid",
  storageBucket: "waldo-sid.appspot.com",
  messagingSenderId: "167494571860",
  appId: "1:167494571860:web:395d19f0a18d0a49105ac1",
  measurementId: "G-MR7WT9LVY1",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

function App() {
  return <div>Hello Bhai From Page</div>;
}

export default App;
