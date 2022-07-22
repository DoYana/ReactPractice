import './App.css';
import Dice from './Dice';
import React from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti'



function App() {

  function generateOneDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }

  }

  function createNewDice() {
    const newArray = [];
    for (let i = 0; i < 10; i++) {
      newArray.push(generateOneDice());
    }
    return newArray;
  }

  const [allDice, setAllDice] = React.useState(createNewDice);
  const [tenzies, setTenZies] = React.useState(false);


  function holdDice(diceId) {
    setAllDice(oldDice =>
      oldDice.map(dice =>
        dice.id === diceId ? { ...dice, isHeld: !dice.isHeld } : dice));
  }

  function rollDice() {
    if (!tenzies) {
      setAllDice(oldDice =>
        oldDice.map(dice => dice.isHeld ? dice : generateOneDice())
      )
    }
    else {
      setTenZies(false);
      setAllDice(createNewDice());
    }

  }

  React.useEffect(() => {
    // const heldDice = allDice.filter(dice => dice.isHeld);
    // const heldDiceValue = heldDice.map(dice => dice.value);
    // const valuesNotMatch = heldDiceValue.filter(oneDiceValue => oneDiceValue !== heldDiceValue[0]);
    // if (valuesNotMatch.length === 0 && heldDiceValue.length === allDice.length) {
    //   console.log("You won!");
    // }
    const allHeld = allDice.every(dice => dice.isHeld);
    const firstValue = allDice[0].value;
    const allSameValue = allDice.every(dice => dice.value === firstValue);
    if (allHeld && allSameValue) {
      console.log("You won!");
      setTenZies(true);
    }



  }, [allDice]);


  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {allDice.map((dice) => <Dice key={dice.id} value={dice.value} isHeld={dice.isHeld} holdDice={() => holdDice(dice.id)} />)}
      </div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>

  );
}

export default App;
