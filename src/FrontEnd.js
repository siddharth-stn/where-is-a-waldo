import { useState } from "react";
import wallpaper from "./static/findWaldo.jpg";
import waldoCropped from "./static/waldoCropped.jpg";

function FrontEnd() {
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

  function handleBtnClick(event) {
    event.target.classList.add("hidden");
    document.getElementsByClassName("imgDiv")[0].classList.remove("hidden");
  }

  return (
    <div className="frontEndDiv">
      <div className="titleDiv">
        <img className="waldoWelcomeImg" src={waldoCropped} alt="Waldo face" />
        <h2 className="title">
          <span>Where's</span> <span className="badge bg-danger">Waldo?</span>
        </h2>
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
