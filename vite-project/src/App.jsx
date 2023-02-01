import { useState } from 'react'
import './App.css'
import Die from './components/Die'
import { nanoid } from 'nanoid'

function App() {

  const [dice, setDice] = useState(allNewDice())


  function generateNewDie() {
    const randomNumber = Math.ceil(Math.random() * 6) 
    return{
      value: randomNumber,
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {  
    const newDice = []

    for (let i = 0; i < 10; i++){

      newDice.push(generateNewDie())     
    }
    return newDice
  }


  function rollDice() {
    setDice(prevState=> prevState.map(die => {
      return die.isHeld ?
      die: 
      generateNewDie()
    }))
  }

  function holdDice(id){
    setDice(prevState =>{
      return prevState.map((die)=>{
        return die.id === id ? {...die, isHeld: !die.isHeld} : die
      })
    })
  }
  
  const diceElements = dice.map(item => (
    <Die
      number={item.value}
      key={item.id}
      isHeld={item.isHeld}
      holdDice={() => holdDice(item.id)}
    />
  ))

  
  


  return (
    <main>
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the 
                  same. Click each die to freeze it at its current value 
                  between rolls.
            </p>
      <div className='dice-container'>
        {diceElements}
      </div>
      <button onClick={rollDice} className='roll-dice'>Roll</button>
    </main>
  )
}

export default App
