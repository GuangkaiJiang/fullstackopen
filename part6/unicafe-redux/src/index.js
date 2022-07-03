import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  const zero = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  const StatTable=()=>{
    let all=store.getState().good+store.getState().ok+store.getState().bad;
    return (
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{store.getState().good}</td>
          </tr>
          <tr>
            <td>ok</td>
            <td>{store.getState().ok}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{store.getState().bad}</td>
          </tr>
          <tr>
            <td>all</td>
            <td>{all}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{(store.getState().good-store.getState().bad)/all}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{store.getState().good/all*100 + "%"}</td>
          </tr>
        </tbody>
      </table>
    )
    
  }
  const IfFeedback = () => {
    let all=store.getState().good+store.getState().ok+store.getState().bad;
    if(all>0)
    {
      return(
        <StatTable />
      )
    }
    else
    {
      return (
        <p>No feedback given</p>
      )
    }
  }

  return (
    <div>
      <h1>
        give feedback
      </h1>
      <button onClick={good}>good</button>
      <button onClick={ok}>ok</button>
      <button onClick={bad}>bad</button>
      <button onClick={zero}>reset stats</button>
      <h1>
        statistics
      </h1>
      <IfFeedback/>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
