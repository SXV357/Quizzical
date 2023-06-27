import React from "react";
import he from "he";

export default function QuizQuestions({checkAnswers, question, pick, id }) {
  const styles = (answer_choice, index) => {
    return checkAnswers
      ? question.correct_answer === answer_choice
        ? { backgroundColor: "#94D7A2", color: "#293264" }
        : question.chosen_answer === index
        ? { backgroundColor: "#F8BCBC", color: "#293264" }
        : { backgroundColor: "#F5F7FB" }
      : question.chosen_answer === index
      ? { backgroundColor: "#D6DBF5" }
      : { backgroundColor: "#F5F7FB" };
  };

  const answer_choices = question.answers.map((answer, index) => (
    <button
      style={styles(answer, index)}
      onClick={(event) => pick(event, id, index)}
      key={index}
      id={index}
      check={checkAnswers}
      className="answer-choice"
    >
      {he.decode(answer)}
    </button>
  ));

  return (
    <div className="question-and-answer-container">
      <h2 className="quiz-question">{he.decode(question.question)}</h2>
      <div className="answers">{answer_choices}</div>
    </div>
  );
}
