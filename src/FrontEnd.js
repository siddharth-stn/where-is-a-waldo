import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import { useEffect, useState } from "react";
import wallpaper from "./static/findWaldo.jpg"; // *** delete this line too after refactoring is complete
import waldoCropped from "./static/waldoCropped.jpg";
import odlaw from "./static/odlaw.png";
import waldo from "./static/waldo.png";
import wizard from "./static/wizard.png";
import check from "./static/checkMark.png";

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
// const storage = firebase.storage();
// const storageRef = storage.ref();
// const imageRef = storageRef.child("findWaldo.jpg");
const imageRef = ""; // *** Delete this line after refactoring the whole code

function getTimer() {
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

const foundArray = [];
const liItemsArray = ["Waldo", "Odlaw", "Wizard"];

function FrontEnd() {
  // *** React Component Starts here --------->
  const [url, setUrl] = useState("");

  const [XPercent, setXPercent] = useState(0);
  const [YPercent, setYPercent] = useState(0);

  const body = document.getElementsByTagName("body")[0];
  body.addEventListener("click", function getBodyClick(event) {
    if (
      event.target.className !== "wallpaperImage" &&
      event.target.tagName !== "LI"
    ) {
      document.getElementsByClassName("dropdownDiv")[0].classList.add("hidden");
      console.log(event.target.tagName);
    }
    return body.removeEventListener("click", getBodyClick);
  });

  const dropdownDiv = document.getElementsByClassName("dropdownDiv")[0];

  useEffect(() => {
    if (dropdownDiv) {
      dropdownDiv.addEventListener("click", function getDropClickEvent(event) {
        const name = event.target.innerText;
        foundArray.forEach((item) => {
          if (item === name) {
            console.log(`I found ${name}`);
          }
        });
        const imagesDbRef = db.collection("images");
        const queryRef = imagesDbRef.where("name", "==", name);
        queryRef
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              const xLocationInDb = [];
              const yLocationInDb = [];
              xLocationInDb.push(doc.data().location.x[0]);
              xLocationInDb.push(doc.data().location.x[1]);
              yLocationInDb.push(doc.data().location.y[0]);
              yLocationInDb.push(doc.data().location.y[1]);
              if (
                Number(XPercent) >= Number(xLocationInDb[0]) &&
                Number(XPercent) <= Number(xLocationInDb[1])
              ) {
                if (
                  Number(YPercent) >= Number(yLocationInDb[0]) &&
                  Number(YPercent) <= Number(yLocationInDb[1])
                ) {
                  foundArray.push(name);
                  foundArray.forEach((item) => {
                    switch (item) {
                      case "Waldo":
                        document
                          .getElementById("waldoTickDiv")
                          .classList.remove("hidden");
                        break;

                      case "Odlaw":
                        document
                          .getElementById("odlawTickDiv")
                          .classList.remove("hidden");
                        break;

                      case "Wizard":
                        document
                          .getElementById("wizardTickDiv")
                          .classList.remove("hidden");
                        break;
                    }
                  });
                  liItemsArray.forEach((item, index) => {
                    if (item === name) {
                      liItemsArray.splice(index, 1);
                    }
                  });
                }
              } else {
                console.log(`That's not ${name}`);
              }
            });
          })
          .catch((error) => {
            console.error("Can not return document: ", error);
          });
        dropdownDiv.classList.add("hidden");
        dropdownDiv.removeEventListener("click", getDropClickEvent);
      });
    }
  }, [XPercent, YPercent]);

  function clickPhoto(event) {
    let xper = Math.floor(
      (event.nativeEvent.offsetX / event.nativeEvent.target.offsetWidth) * 100
    );

    let yper = Math.floor(
      (event.nativeEvent.offsetY / event.nativeEvent.target.offsetHeight) * 100
    );

    setXPercent(xper);
    setYPercent(yper);

    document
      .getElementsByClassName("dropdownDiv")[0]
      .classList.remove("hidden");
    //console.log(xper, " and ", yper);
  }

  const [min, setMin] = useState("00");
  const [sec, setSec] = useState("00");
  const [startClock, setStartClock] = useState(false);

  function clock() {
    if (startClock !== false) {
      let timeDiff = getTimer() - startClock;
      let sec = calcSec(timeDiff);
      let min = calcMin(timeDiff);
      setSec(sec);
      setMin(min);
    }
  }

  useEffect(() => {
    if (startClock !== false) {
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

  function showLiItems() {
    return liItemsArray.map((item) => <li>{item}</li>);
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
      <div className="mainDiv">
        <div className="sideDiv">
          <div className="waldoFaceDiv">
            <div id="waldoTickDiv" className="tickWaldo hidden">
              <img src={check} />
            </div>
            <p>Waldo</p>
            <img src={waldo} alt="waldo face" />
          </div>
          <div className="odlawFaceDiv">
            <div id="odlawTickDiv" className="tickOdlaw hidden">
              <img src={check} />
            </div>
            <p>Odlaw</p>
            <img src={odlaw} alt="odlaw face" />
          </div>
          <div className="wizardFaceDiv">
            <div id="wizardTickDiv" className="tickWizard hidden">
              <img src={check} />
            </div>
            <p>Wizard</p>
            <img src={wizard} alt="wizard face" />
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
          <div id="indicatorDiv" className="hidden">
            Wrong Choice!!!!
          </div>
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
            <ul>{showLiItems()}</ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FrontEnd;
