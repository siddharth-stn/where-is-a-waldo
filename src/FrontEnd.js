import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import { useEffect, useState } from "react";
//import wallpaper from "./static/findWaldo.jpg";
import waldoCropped from "./static/waldoCropped.jpg";

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

//const db = firebase.firestore();
const storage = firebase.storage();
const storageRef = storage.ref();
const imageRef = storageRef.child("findWaldo.jpg");

function FrontEnd() {
  const [url, setUrl] = useState("");

  const [XPercent, setXPercent] = useState(0);
  const [YPercent, setYPercent] = useState(0);

  const body = document.getElementsByTagName("body")[0];
  body.addEventListener("click", (event) => {
    if (event.target.className !== "wallpaperImage") {
      document.getElementsByClassName("dropdownDiv")[0].classList.add("hidden");
      console.log(event.target.className);
    }
  });

  function clickPhoto(event) {
    setXPercent(
      (event.nativeEvent.offsetX / event.nativeEvent.target.offsetWidth) * 100
    );
    setYPercent(
      (event.nativeEvent.offsetY / event.nativeEvent.target.offsetHeight) * 100
    );
    document
      .getElementsByClassName("dropdownDiv")[0]
      .classList.remove("hidden");
    console.log(XPercent, " and ", YPercent);
  }

  async function handleBtnClick(event) {
    setUrl(await imageRef.getDownloadURL());
    event.target.classList.add("hidden");
    document.getElementsByClassName("imgDiv")[0].classList.remove("hidden");
  }

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    let timerID = setInterval(() => clock(), 1000);
  });

  function clock() {
    setTime(new Date());
  }

  return (
    <div className="frontEndDiv">
      <div className="titleDiv">
        <img className="waldoWelcomeImg" src={waldoCropped} alt="Waldo face" />
        <h2 className="title">
          <span>Where's</span> <span className="badge bg-danger">Waldo?</span>
        </h2>
        <div class="timerDiv">{time.toLocaleTimeString()}</div>
      </div>

      <button
        type="button"
        onClick={handleBtnClick}
        className="btn btn-outline-warning startBtn"
      >
        Find Me!
      </button>
      <div className="imgDiv hidden">
        <img
          className="wallpaperImage"
          src={url}
          onClick={clickPhoto}
          alt="Waldo wallpaper"
        />
        <div
          className="dropdownDiv hidden"
          style={{ left: XPercent + "%", top: YPercent + "%" }}
        >
          <ul>
            <li>Waldo</li>
            <li>Odlaw</li>
            <li>Wizard</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FrontEnd;
