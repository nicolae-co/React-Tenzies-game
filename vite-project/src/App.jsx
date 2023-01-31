import { useState } from 'react'
import './App.css'
import Die from './components/Die'
import { nanoid } from 'nanoid'

function App() {

  const [dice, setDice] = useState(allNewDice())

  console.log(dice)

  function allNewDice() {  
    const newDice = []

    for (let i = 0; i < 10; i++){
      const randomNumber = Math.ceil(Math.random() * 6) 
      newDice.push({
        value: randomNumber,
        isHeld: false,
        id: nanoid()
      })     
    }
    return newDice
  }

  function rollDice() {
    setDice(allNewDice())
  }
  
  const diceElements = dice.map(item => (
    <Die
      number={item.value}
      key={item.id}
    />
  ))

  
  


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
