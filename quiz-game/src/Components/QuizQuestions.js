import React from "react";
import he from "he";
import PropTypes from 'prop-types';

export default function QuizQuestions({checkAnswers, question, pick, id, dark }) {
  const styles = (answer_choice, index) => {
    if (checkAnswers) {
      if (question.correct_answer === answer_choice) { // correct answer
        return { backgroundColor: "#94D7A2", color: "#293264" };
      } else if (question.chosen_answer === index) { // chosen answer was wrong
        return { backgroundColor: "#F8BCBC", color: "#293264" };
      } else { // all answers apart from selected and correct will have default color
        return { backgroundColor: "#F5F7FB" };
      }
    } else {
      if (question.chosen_answer === index) { // background color when selected
        return { backgroundColor: "#D6DBF5" };
      } else { // default background color of all answer buttons
        return { backgroundColor: "#F5F7FB" };
      }
    }
  };

  const answer_choices = question.answers.map((answer, index) => (
    <button
      style={styles(answer, index)}
      onClick={(event) => pick(event, id, index)}
      key={index}
      id={index}
      check={checkAnswers}
      className="answer-choice">{he.decode(answer)}</button>
  ));

  return (
    <div className="question-and-answer-container">
      <h2 style = {{color: dark ? "white" : "#293264"}} className="quiz-question">{he.decode(question.question)}</h2>
      <div className="answers">{answer_choices}</div>
    </div>
  );
}

QuizQuestions.defaultProps = {
  dark: false
}

QuizQuestions.propTypes = {
  checkAnswers: PropTypes.bool.isRequired,
  question: PropTypes.string.isRequired,
  pick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  dark: PropTypes.bool.isRequired
}