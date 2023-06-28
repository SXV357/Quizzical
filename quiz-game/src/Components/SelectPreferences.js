import React from 'react'

export default function SelectPreferences({difficulty, difficulties, setDifficulty, begin}) {
  return (
    <div>
        <label htmlFor="difficulty">Choose a difficulty</label>
        <select name = "difficulty" id = "difficulty" value = {difficulty} onChange = {setDifficulty}>
          {difficulties.map((option, idx) => {
            return <option key = {idx} value = {option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
          })}
        </select>
        <button onClick = {begin}>
            Start Quiz
        </button>
    </div>
  )
}
