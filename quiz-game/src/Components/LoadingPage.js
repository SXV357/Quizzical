import React from "react";
import blueBlob from "../Loading Page Images/blueBlob.png"
import yellowBlob from "../Loading Page Images/yellowBlob.png"
import PropTypes from 'prop-types';

export default function LoadingPage({dark, timeTaken, displayPreferencesPage}) {

  const determineTimeSignature = (userTime) => {
    let timer;
    if (userTime < 60.0){
      timer = `${userTime} seconds`;
    }
    else {
      let stringVersion = JSON.stringify(userTime);
      let milliseconds = parseInt(stringVersion.slice(stringVersion.indexOf(".") + 1));
      let minutes = Math.floor(userTime / 60);
      timer = `${minutes} ${minutes === 1 ? `minute` : `minutes`}, ${Math.floor(userTime % 60)} seconds, and ${milliseconds} milliseconds`;
    }
    return timer;
  }

  return (
    <div className="intro-page" style = {{backgroundColor: dark ? "black" : "#F5F7FB"}}>
      <div className="intro-page-content">
        <h1 className="intro-page-title">Q U I Z Z I C A L</h1>
        <div className="intro-page-description" style = {{color: dark ? "white" : "#293264"}}>{`Your best time is ${determineTimeSignature(timeTaken)}. Do you think you can beat it?`}</div>
        <button className="intro-page-button" onClick = {displayPreferencesPage} style={{backgroundColor: dark ? "#fff" : "#293264", color: dark ? "#000" : "#fff"}}>
            Choose Preferences
          </button>
      </div>
      <img className="yellow-blob" src= {yellowBlob} alt = ""/>
      <img className="blue-blob" src= {blueBlob} alt = ""/>
    </div>
  );
}

LoadingPage.defaultProps = {
  dark: false,
}

LoadingPage.propTypes = {
  dark: PropTypes.bool.isRequired,
  timeTaken: PropTypes.number.isRequired,
  displayPreferencesPage: PropTypes.func.isRequired
}