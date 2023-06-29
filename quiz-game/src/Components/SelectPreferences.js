import React from 'react'

export default function SelectPreferences({
  difficulty, 
  difficulties, 
  setDifficulty, 
  begin, 
  categories, 
  selectedCategory, 
  setCategory, 
  numQuestions, 
  setNumQuestions,
  questionType,
  setQuestionType
}) {
  return (
    <div className = "preferences">
        <label htmlFor="difficulty">Choose a difficulty: </label>
        <select name = "difficulty" id = "difficulty" value = {difficulty} onChange = {setDifficulty}>
          {difficulties.map((option, idx) => {
            return <option key = {idx} value = {option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
          })}
        </select>
        <label htmlFor="category">Choose a category: </label>
        <select name = "category" id = "category" value = {selectedCategory.category} onChange = {setCategory}>
          {Object.keys(categories).map((category, index) => {
            return <option key = {index} value={category}>{category}</option>
          })}
        </select>
        <label htmlFor="numQuestions">Choose number of questions: </label>
        <select name = "numQuestions" id = "numQuestions" value = {numQuestions} onChange={setNumQuestions}>
          {[5,10,15,20].map((amount, i) => {
            return <option key = {i} value = {amount}>{amount}</option>
          })}
        </select>
        <label htmlFor="questionType">Choose question type: </label>
        <select name = "questionType" id = "questionType" value = {questionType} onChange={setQuestionType}>
          {["Any Type", "Multiple Choice", "True / False"].map((type, id) => {
            return <option key = {id} value = {type}>{type}</option>
          })}
        </select>
        <button onClick = {begin}>
            Start Quiz
        </button>
    </div>
  )
}