import './App.css';
import Dice from './Dice';
import React from 'react';



function App() {
    function createNewDice()  {
      const newArray = [];
      for (let i = 0; i < 10; i++) {
        newArray.push(Math.ceil(Math.random() * 6));
      }
      return newArray;
    }

  let [allDice, setAllDice] = React.useState(createNewDice);
  

  return (
    <main>
      <div className="dice-container">
        {allDice.map((dice) =>  <Dice value={dice} /> )}
      </div>
      <button className="roll-dice" onClick={()=>setAllDice(createNewDice)}>Roll</button>
    </main>

  );
}

export default App;
