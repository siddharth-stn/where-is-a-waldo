import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import { useEffect, useState } from "react";
import wallpaper from "./static/findWaldo.jpg"; // *** delete this line too after refactoring is complete
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

// firebase.initializeApp(firebaseConfig);

// const db = firebase.firestore();
// const storage = firebase.storage();
// const storageRef = storage.ref();
// const imageRef = storageRef.child("findWaldo.jpg");
const imageRef = ""; // *** Delete this line after refactoring the whole code

function getTimer() {
  console.log("I was Run");
  const timeInSec = Math.floor(new Date().getTime() / 1000);
  return timeInSec;
}

/*  
! * calculate seconds digits ------>
* * remainder = timeInSeconds % 60;
* * if (remainder < 10) then concat "0" before remainder;
*/
function calcSec(timeInSec) {
  timeInSec = Number(timeInSec);
  let remainder = timeInSec % 60;
  if (remainder < 10) {
    remainder = "0" + remainder;
    return remainder;
  }
  return remainder;
}

/*
! * calculate minutes digits ------->
* * quotient = Math.floor(timeInSeconds/60);
* * if (quotient < 10) then concat "0" before quotient;
*/
function calcMin(timeInSec) {
  timeInSec = Number(timeInSec);
  let quotient = Math.floor(timeInSec / 60);
  if (quotient < 10) {
    quotient = "0" + quotient;
    return quotient;
  }
  return quotient;
}

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

  const [min, setMin] = useState("00");
  const [sec, setSec] = useState("00");
  const [startClock, setStartClock] = useState(false);

  function clock() {
    if (startClock != false) {
      let timeDiff = getTimer() - startClock;
      let sec = calcSec(timeDiff);
      let min = calcMin(timeDiff);
      setSec(sec);
      setMin(min);
    }
  }

  useEffect(() => {
    if (startClock != false) {
      let timerID = setInterval(() => clock(), 1000);
      return function cleanup() {
        clearInterval(timerID);
      };
    }
  });

  async function handleBtnClick(event) {
    //setUrl(await imageRef.getDownloadURL()); // *** re-enable this after the refactoring is complete
    event.target.classList.add("hidden");
    document.getElementsByClassName("imgDiv")[0].classList.remove("hidden");
    setStartClock(getTimer());
  }

  return (
    <div className="frontEndDiv">
      <div className="titleDiv">
        <img className="waldoWelcomeImg" src={waldoCropped} alt="Waldo face" />
        <h2 className="title">
          <span>Where's</span> <span className="badge bg-danger">Waldo?</span>
        </h2>
        <div className="timerDiv">
          <div className="minuteDiv">{min}</div>:
          <div className="secondDiv">{sec}</div>
        </div>
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
          id="wallImg"
          className="wallpaperImage"
          src={wallpaper}
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
