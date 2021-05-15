import { useState } from "react";
import { db } from "./FrontEnd.js";

function LeaderBoard(props) {
  const { timeMin, timeSec } = props;
  const leaders = [];
  const [displayList, setDisplayList] = useState([]);

  function convertIntoSec() {
    let minToSec = Number(timeMin) * 60;
    return minToSec + Number(timeSec);
  }

  async function handleSubmitBtn(event) {
    let inputValue = document.getElementById("nameInput").value;
    if (inputValue === "") {
      inputValue = "Anonymous";
    }
    await db
      .collection("players")
      .doc()
      .set({
        name: inputValue,
        min: Number(timeMin),
        sec: Number(timeSec),
        timeTaken: convertIntoSec(),
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });

    let playersRef = db.collection("players");

    playersRef
      .orderBy("timeTaken", "asc")
      .get()
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          let name = doc.data().name;
          let min = doc.data().min;
          let sec = doc.data().sec;
          leaders.push({ name, min, sec});
        });
      })
      .then(() => {
        let listItems = leaders.map((item, index) => {
          return (
            <>
            <li key={index}>
              {item.name}
              <span>
                {item.min}:{item.sec}
              </span>
            </li>
            <hr/>
            </>
          );
        });
        setDisplayList(listItems);
      });
    document.getElementById("enterNameDiv").classList.add("hidden");
    document.getElementById("finalDiv").classList.remove("hidden");
  }

  return (
    <div id="leaderBoardDiv" className="leaderBoardDiv hidden">
      <div id="enterNameDiv" className="">
        <label htmlFor="nameInput">Enter Your Name: </label>{" "}
        <input id="nameInput" />
        <button onClick={handleSubmitBtn}>Submit</button>
      </div>
      <div id="finalDiv" className="hidden">
        <ol>{displayList}</ol>
      </div>
    </div>
  );
}

export default LeaderBoard;
