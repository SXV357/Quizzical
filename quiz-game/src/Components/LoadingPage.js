import React from "react";
import Confetti from "react-confetti";
import blueBlob from "../Loading Page Images/blueBlob.png"
import yellowBlob from "../Loading Page Images/yellowBlob.png"

export default function LoadingPage({dark, gameOver, timeTaken, begin, difficulties, difficulty, setDifficulty}) {
  return (
    <div className="intro-page" style = {{backgroundColor: dark ? "black" : "#F5F7FB"}}>
      {gameOver ? <Confetti /> : null}
      <div className="intro-page-content">
        <h1 className="intro-page-title">Quizzical</h1>
        <div className="intro-page-description" style = {{color: dark ? "white" : "#293264"}}>{`On your last attempt, you took ${timeTaken} seconds to finish all 10 questions. Do you think you can beat it?`}</div>
        <label htmlFor="difficulty">Choose a difficulty</label>
        <select name = "difficulty" id = "difficulty" value = {difficulty} onChange = {setDifficulty}>
          {difficulties.map((option, idx) => {
            return <option key = {idx} value = {option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
          })}
        </select>
        <button className="intro-page-button" onClick={begin}>
          Start Quiz
        </button>
      </div>
      <img className="yellow-blob" src= {yellowBlob} />
      <img className="blue-blob" src= {blueBlob} />
    </div>
  );
}