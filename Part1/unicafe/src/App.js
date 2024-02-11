import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
const StatisticsLine =({text,value})=>{
  return(
    <table>
      <tbody>
        <tr>
          <td>{text}</td>
          <td> {value}</td>
        </tr>
      </tbody>
    </table>
  )
}
const Statistics = ({info}) => {
  console.log(info)
  const good= info.chooseGood
  const bad= info.chooseBad
  const neutral= info.chooseNeutral
  const all = good+bad+neutral
  const average = (good - bad)/all
  const positive = ((good / all) * 100).toFixed(2) + '%'
  if (all==0)
    return(
      <p>No feedback given</p>
    )
    else return(
      <div>
        <StatisticsLine text="good" value ={good} />
        <StatisticsLine text="neutral" value ={neutral} />
        <StatisticsLine text="bad" value ={bad} />
        <StatisticsLine text="all" value ={all} />
        <StatisticsLine text="average" value ={average} />
        <StatisticsLine text="positive" value ={positive} />
      </div>
    )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }
  const data={
    chooseGood:good,
    chooseBad:bad,
    chooseNeutral:neutral
  }
  return (
    <div>
      <h2>Give feedback</h2>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <h2>Statistics</h2>
      <Statistics info={data}></Statistics>
    </div>
  )
}

export default App