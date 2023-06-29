import React from "react";
import blueBlob from "../Loading Page Images/blueBlob.png"
import yellowBlob from "../Loading Page Images/yellowBlob.png"
import PropTypes from 'prop-types';

export default function LoadingPage({dark, timeTaken, displayPreferencesPage}) {
  return (
    <div className="intro-page" style = {{backgroundColor: dark ? "black" : "#F5F7FB"}}>
      <div className="intro-page-content">
        <h1 className="intro-page-title">Q U I Z Z I C A L</h1>
        <div className="intro-page-description" style = {{color: dark ? "white" : "#293264"}}>{`On your last attempt, you took ${timeTaken} seconds to finish all 10 questions. Do you think you can beat it?`}</div>
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