import React from "react";
import Confetti from "react-confetti";
import blueBlob from "../Loading Page Images/blueBlob.png"
import yellowBlob from "../Loading Page Images/yellowBlob.png"

export default function LoadingPage({gameOver, timeTaken, begin}) {
  return (
    <div className="intro-page">
      {gameOver ? <Confetti /> : null}
      <div className="intro-page-content">
        <h1 className="intro-page-title">Quizzical</h1>
        <div className="intro-page-description">{`On your last attempt, you took ${timeTaken} seconds to finish all 10 questions. Do you think you can beat it?`}</div>
        <button className="intro-page-button" onClick={begin}>
          Start Quiz
        </button>
      </div>
      <img
        className="yellow-blob"
        src= {yellowBlob}
      ></img>
      <img
        className="blue-blob"
        src= {blueBlob}
      ></img>
    </div>
  );
}