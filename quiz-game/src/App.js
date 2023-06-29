import React, { useState, useEffect } from "react";
import LoadingPage from "./Components/LoadingPage";
import QuizQuestions from "./Components/QuizQuestions";
import yellowBlob from "./Loading Page Images/yellowBlob.png"
import useDarkMode from "./useDarkMode";
import SelectPreferences from "./Components/SelectPreferences";

export default function App() {
  const [startGame, setStartGame] = useState(false);
  const [score, setScore] = useState(0);
  const [checkAnswers, setCheckAnswers] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [time, setTime] = useState(0);
  const [startTimer, setStartTimer] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const [dark, toggleDarkMode] = useDarkMode();
  const [displayPreferences, setDisplayPreferences] = useState(false);
  const [bestTime, setBestTime] = useState(
    localStorage.getItem("bestTime") || 0
  );

  // useEffect(() => {
  //   fetch("https://opentdb.com/api.php?amount=10&difficulty=easy")
  //     .then(res => res.json())
  //     .then(data => console.log(data.results))
  // }, [])

  // implement true false question functionality
  // implement a new page where the user can select question difficulty, category, and number of questions
  // make it so that if the user begins the quiz without starting timer, timer begins automatically

  useEffect(() => {
    if (startGame) {
      fetch(`https://opentdb.com/api.php?amount=10&difficulty=${selectedDifficulty.toLowerCase()}&type=multiple`)
        .then((res) => res.json())
        .then((data) => {
          setQuestions(
            data.results.map((question) => {
              return {
                question: question.question,
                answers: question.incorrect_answers
                  .concat([question.correct_answer])
                  .sort(() => Math.random() - 0.5)
                  .map((value) => value),
                chosen_answer: null,
                correct_answer: question.correct_answer,
              };
            })
          )
        });
      setBestTime(bestTime);
    }
  }, [startGame, bestTime, selectedDifficulty]);

  useEffect(() => {
    let timer;
    if (startTimer) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } 
    else clearInterval(timer)
    return () => {
      clearInterval(timer);
    };
  }, [startTimer]);

  useEffect(() => {
    if (questions.every( (question) => typeof question.chosen_answer !== "undefined")) {
      setGameOver(true);
    }
  }, [questions]);

  useEffect(() => {
    let playerScore = 0;
    playerScore = questions.filter((question) => question.answers[question.chosen_answer] === question.correct_answer).length;
    setScore(playerScore);
    if (checkAnswers) {
      setStartTimer(false);
      alert(
        `You took ${Math.floor(time / 60000) % 60} minutes, ${
          Math.floor(time / 1000) % 60
        } seconds, and ${
          Math.floor(time / 10) % 100
        } milliseconds to finish the quiz.`
      );
      localStorage.setItem("bestTime", time / 1000);
    }
  }, [checkAnswers, questions, time]);

  function chooseAnswer(event, unique_question_id, unique_answer_id) {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions[unique_question_id].chosen_answer = unique_answer_id;
      return newQuestions;
    });
  }

  const questionsAndAnswers = questions.map((question, index) => {
    return (
      <QuizQuestions
        dark = {dark}
        question={question}
        checkAnswers={checkAnswers}
        pick={chooseAnswer}
        id={index}
        key={index}
      />
    );
  });

  function gameHandler() {
    if (questions.every((question) => typeof question.chosen_answer !== "undefined")) setCheckAnswers(true)
    else alert("You must answer all questions before checking your answers!");
  }

  function displayTimer(){
    if (!checkAnswers){
      return (
        <div className="timer">
          <span className="minutes">{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
          <span className="seconds">{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
          <span className="milliseconds">{("0" + ((time / 10) % 100)).slice(-2)}</span>
        </div> 
      )
    }
    return null;
  }

  function displayTimerButtons(){
    if (!checkAnswers){
      return (
        <div className="timer-btns">
          {time === 0 && !startTimer && (
            <button onClick={() => setStartTimer(true)}>Start Timer</button>
          )}
          {time !== 0 && (
            <button onClick={() => setStartTimer(false)}>Stop Timer</button>
          )}
          {time !== 0 && (
            <button onClick={() => setStartTimer(true)}>Resume Timer</button>
          )}
          {time !== 0 && (
            <button onClick={() => setTime(0)}>Reset Timer</button>
          )}
        </div>
      )
    }
    return null;
  }

  function gameOverHandler(){
    if (checkAnswers){
      return (
        <div className="results">
          <div className="player-score">{`You got ${score}/10 questions correct.`}</div>
            <button
              className="play-again-btn"
              onClick={() => {
                setStartGame(false);
                setCheckAnswers(false);
                setGameOver(false);
                setScore(0);
                setTime(0);
                setStartTimer(false);
              }}>
              Play Again
            </button>
        </div>
      )
    }
    return null;
  }

  function displayCheckButton(){
    if (!checkAnswers){
      return (
        <button
          className="check-answers-btn"
          check={!gameOver}
          onClick={gameHandler}>Check Answers</button>
      )
    }
    return null;
  }
  
  return (
    <main className = {dark ? "dark" : ""}>

      {startGame && !displayPreferences && (
        <div className="quiz">
          {displayTimer()}
          {displayTimerButtons()}
          {questionsAndAnswers}
          {displayCheckButton()}
          {gameOverHandler()}
        </div>
      )}

      {!startGame && !displayPreferences && (
        <LoadingPage 
            dark = {dark}
            gameOver = {gameOver} 
            timeTaken={bestTime} 
            displayPreferencesPage = {() => setDisplayPreferences(true)}
        />)}

        {displayPreferences && !startGame &&  (
          <SelectPreferences 
            difficulties = {["easy", "medium", "hard"]} 
            difficulty = {selectedDifficulty} 
            setDifficulty = {(e) => setSelectedDifficulty(e.target.value)} 
            begin={() => {
              setStartGame(true);
              setDisplayPreferences(false);
            }} />
        )}

      <img className="yellow-blob-2" src= {yellowBlob} />
      
      <div className="toggler">
        <p className="toggler--light">Light</p>
          <div className="toggler--slider" onClick={toggleDarkMode}>
              <div className="toggler--slider--circle"></div>
          </div>
        <p className="toggler--dark">Dark</p>
      </div>

    </main>
  );
}