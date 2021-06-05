import React, { useState} from 'react'

const Button = ({btnText, handleClick}) => (
  <button onClick={handleClick}>
    {btnText}
  </button>
)

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

  return (
    <>
      <h2>give feedback</h2>
      <Button btnText={"good"} handleClick={giveFeedback(1)} />
      <Button btnText={"neutral"} handleClick={giveFeedback(0)} />
      <Button btnText={"bad"} handleClick={giveFeedback(-1)} />

      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </>
  )

}

export default App
