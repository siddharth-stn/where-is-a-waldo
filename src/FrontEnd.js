import { useState } from "react";
import wallpaper from "./static/waldo wallpaper 2.jpg";
import waldoCropped from "./static/waldoCropped.jpg";

function FrontEnd() {
  const [XPercent, setXPercent] = useState(10);
  const [YPercent, setYPercent] = useState(10);
  function clickPhoto(event) {
    setXPercent(
      (event.nativeEvent.offsetX / event.nativeEvent.target.offsetWidth) * 100
    );
    setYPercent(
      (event.nativeEvent.offsetY / event.nativeEvent.target.offsetHeight) * 100
    );
    console.log(XPercent, " and ", YPercent);
  }

  return (
    <div class="frontEndDiv">
      <div class="titleDiv">
        <img class="waldoWelcomeImg" src={waldoCropped} />
        <h2 class="title" alt="Waldo face image">
          <span>Where's</span> <span class="badge bg-danger">Waldo?</span>
        </h2>
      </div>
      <button type="button" class="btn btn-outline-warning startBtn">
        Find Me!
      </button>
      <div class="imgDiv">
        <img class="wallpaperImage" src={wallpaper} onClick={clickPhoto} alt="Waldo wallpaper Image"/>
        <div
          class="me"
          style={{ color: "red", left: XPercent + "%", top: YPercent + "%", padding: 0, margin: 0, border: "solid 1px red" }}
        >
          Me
        </div>
      </div>
    </div>
  );
}

export default FrontEnd;
