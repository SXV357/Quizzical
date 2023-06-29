import React from 'react'

export default function SelectPreferences({difficulty, difficulties, setDifficulty, begin, categories, selectedCategory, setCategory}) {
  return (
    <div className = "preferences">
        <label htmlFor="difficulty">Choose a difficulty</label>
        <select name = "difficulty" id = "difficulty" value = {difficulty} onChange = {setDifficulty}>
          {difficulties.map((option, idx) => {
            return <option key = {idx} value = {option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
          })}
        </select>
        <label htmlFor="category">Choose a category</label>
        <select name = "category" id = "category" value = {selectedCategory.category} onChange = {setCategory}>
          {Object.keys(categories).map((category, index) => {
            return <option key = {index} value={category}>{category}</option>
          })}
        </select>
        <button onClick = {begin}>
            Start Quiz
        </button>
    </div>
  )
}
