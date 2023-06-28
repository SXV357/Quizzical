import React from "react";
// import Confetti from "react-confetti";
import blueBlob from "../Loading Page Images/blueBlob.png"
import yellowBlob from "../Loading Page Images/yellowBlob.png"

export default function LoadingPage({dark, gameOver, timeTaken, displayPreferencesPage}) {
  return (
    <div className="intro-page" style = {{backgroundColor: dark ? "black" : "#F5F7FB"}}>
      {/* {gameOver ? <Confetti /> : null} */}
      <div className="intro-page-content">
        <h1 className="intro-page-title">Quizzical</h1>
        <div className="intro-page-description" style = {{color: dark ? "white" : "#293264"}}>{`On your last attempt, you took ${timeTaken} seconds to finish all 10 questions. Do you think you can beat it?`}</div>
        <button className="intro-page-button" onClick = {displayPreferencesPage} style={{backgroundColor: dark ? "#fff" : "#293264", color: dark ? "#000" : "#fff"}}>
            Choose Preferences
          </button>
      </div>
      <img className="yellow-blob" src= {yellowBlob} />
      <img className="blue-blob" src= {blueBlob} />
    </div>
  );
}