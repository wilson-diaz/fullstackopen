import React, { useState} from 'react'

const Button = ({btnText, handleClick}) => (
  <button onClick={handleClick}>
    {btnText}
  </button>
)

const Feedback = ({btnHandler}) => (
    <>
      <h2>give feedback</h2>
      <Button btnText={"good"} handleClick={btnHandler(1)} />
      <Button btnText={"neutral"} handleClick={btnHandler(0)} />
      <Button btnText={"bad"} handleClick={btnHandler(-1)} />
    </>
)

const Statistic = ({statText, statValue}) => (
  <p>{statText} {statValue}</p>
)

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  return (
    <>
        <h2>statistics</h2>
        <Statistic statText={"good"} statValue={good} />
        <Statistic statText={"neutral"} statValue={neutral} />
        <Statistic statText={"bad"} statValue={bad} />
        <Statistic statText={"all"} statValue={total} />
        <Statistic statText={"average"} statValue={(good - bad) / total || 0} />
        <Statistic statText={"positive"} statValue={((good / total || 0) * 100) + "%"} />
    </> 
   )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const giveFeedback = (rating) => () => {
    if (rating === 1) {
      setGood(good + 1)
    } else if (rating === 0) {
      setNeutral(neutral + 1)
    } else if (rating === -1) {
      setBad(bad + 1)
    }
  }

  if (good + neutral + bad === 0) {
    return (<Feedback btnHandler={giveFeedback} />)
  }

  return (
    <>
      <Feedback btnHandler={giveFeedback} />
      <Statistics good={good} neutral={neutral} bad={bad} /> 
    </>
  )
}

export default App
