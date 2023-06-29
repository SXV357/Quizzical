import React, { useState, useEffect } from "react";
import LoadingPage from "./Components/LoadingPage";
import QuizQuestions from "./Components/QuizQuestions";
import yellowBlob from "./Loading Page Images/yellowBlob.png"
import useDarkMode from "./useDarkMode";
import SelectPreferences from "./Components/SelectPreferences";

export default function App() {

  const categories = {
    "Any Category" : 0,
    "General Knowledge" : 9,
    "Entertainment: Books" : 10,
    "Entertainment: Film" : 11,
    "Entertainment: Music" : 12,
    "Entertainment: Musicals & Theatres" : 13,
    "Entertainment: Television" : 14,
    "Entertainment: Video Games" : 15,
    "Entertainment: Board Games" : 16,
    "Science & Nature" : 17,
    "Science: Computers" : 18,
    "Science: Mathematics" : 19,
    "Mythology" : 20,
    "Sports" : 21,
    "Geography" : 22,
    "History" : 23,
    "Politics" : 24,
    "Art" : 25,
    "Celebrities" : 26,
    "Animals" : 27,
    "Vehicles" : 28,
    "Entertainment: Comics" : 29,
    "Science: Gadgets" : 30,
    "Entertainment: Japanese Anime & Manga" : 31,
    "Entertainment: Cartoon & Animations" : 32
  }

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
  const [selectedCategory, setSelectedCategory] = useState({category: "Any Category", value: 0})
  const [numQuestions, setNumQuestions] = useState(5);
  const [questionType, setQuestionType] = useState("Any Type")
  const [bestTime, setBestTime] = useState(
    localStorage.getItem("bestTime") || 0
  );

  // make it so that if the user begins the quiz without starting timer, timer begins automatically

  const handleInputChange = (setStateFunc) => {
    return (e) => {
      setStateFunc(e.target.value);
    };
  };

  useEffect(() => {
    if (startGame) {
      fetch(`https://opentdb.com/api.php?amount=${numQuestions}${selectedCategory.value === 0 ? `` : `&category=${selectedCategory.value}`}&difficulty=${selectedDifficulty.toLowerCase()}&type=${questionType === "Any Type" ? `` : questionType === "Multiple Choice" ? `multiple` : `boolean`}`)
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
  }, [startGame, bestTime, selectedDifficulty, selectedCategory.value, numQuestions, questionType]);

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
          <div className="player-score">{`You got ${score}/${numQuestions} questions correct.`}</div>
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
            dark = {dark}
            questionType = {questionType}
            setQuestionType = {handleInputChange(setQuestionType)}
            numQuestions = {numQuestions}
            setNumQuestions = {handleInputChange(setNumQuestions)}
            categories = {categories}
            selectedCategory = {selectedCategory}
            setCategory= {handleInputChange((value) => setSelectedCategory({ category: value, value: categories[value] }))}
            difficulties = {["easy", "medium", "hard"]} 
            difficulty = {selectedDifficulty} 
            setDifficulty = {handleInputChange(setSelectedDifficulty)} 
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