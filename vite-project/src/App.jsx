import { useState } from 'react'
import './App.css'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import { useEffect } from 'react'
import Confetti from 'react-confetti'

function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

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

  function newGame(){
    setDice(allNewDice())
    setTenzies(prevState => !prevState)
  }

  useEffect(()=>{
    const allHeld = dice.every((die) => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue){
      setTenzies(true)
    }
  },[dice])
  
  
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
      {tenzies 
          ? <button onClick={newGame} className='new-game'>New game</button> 
          : <button onClick={rollDice} className='roll-dice'>Roll</button>
      }
      {tenzies && <Confetti width={window.innerWidth}/>}
    </main>
  )
}

export default App
