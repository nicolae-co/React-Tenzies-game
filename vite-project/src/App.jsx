import { useState } from 'react'
import './App.css'
import Die from './components/Die'

function App() {

  const [dice, setDice] = useState(allNewDice())

  

  function allNewDice() {  
    const newDice = []

    for (let i = 0; i < 10; i++){
      const randomNumber = Math.ceil(Math.random() * 6) 
      newDice.push(randomNumber)     
    }
    return newDice
  }

  function rollDice() {
    setDice(allNewDice())
  }
  
  const diceElements = dice.map(item => <Die number={item} />)

  
  


  return (
    <main>
      <div className='dice-container'>
        {diceElements}
      </div>
      <button onClick={rollDice} className='roll-dice'>Roll</button>
    </main>
  )
}

export default App
