import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

/*
const StatisticLine = (props) => {
  return (
    <p>{props.text} {props.value}</p>
  )
}

const Statistics = (props) => {
  let all=props.good+props.neutral+props.bad;
  return(
    <div>
      <StatisticLine text='good' value={props.good}/>
      <StatisticLine text='neutral' value={props.neutral}/>
      <StatisticLine text='bad' value={props.bad}/>
      <StatisticLine text='all' value={all}/>
      <StatisticLine text='average' value={(props.good-props.bad)/all}/>
      <StatisticLine text='positive' value={props.good/all*100 + "%"}/>
    </div>
  )
}
*/

const StatTable=(props)=>{
  let all=props.good+props.neutral+props.bad;
  return (
    <table>
      <tbody>
        <tr>
          <td>good</td>
          <td>{props.good}</td>
        </tr>
        <tr>
          <td>neutral</td>
          <td>{props.neutral}</td>
        </tr>
        <tr>
          <td>bad</td>
          <td>{props.bad}</td>
        </tr>
        <tr>
          <td>all</td>
          <td>{all}</td>
        </tr>
        <tr>
          <td>average</td>
          <td>{(props.good-props.bad)/all}</td>
        </tr>
        <tr>
          <td>positive</td>
          <td>{props.good/all*100 + "%"}</td>
        </tr>
      </tbody>
    </table>
  )
  
}

const IfFeedback = (props) => {
  let all=props.good+props.neutral+props.bad;
  if(all>0)
  {
    return(
      //<Statistics good={props.good} neutral={props.neutral} bad={props.bad}/>
      <StatTable good={props.good} neutral={props.neutral} bad={props.bad}/>
    )
  }
  else
  {
    return (
      <p>No feedback given</p>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const upGood = () => {
    setGood(good+1)
  }
  const upNeutral = () => {
    setNeutral(neutral+1)
  }
  const upBad = () => {
    setBad(bad+1)
  }

  return (
    <div>
      <h1>
        give feedback
      </h1>
      <Button handleClick={upGood} text="good" />
      <Button handleClick={upNeutral} text="neutral" />
      <Button handleClick={upBad} text="bad" />
      <h1>
        statistics
      </h1>
      <IfFeedback good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
