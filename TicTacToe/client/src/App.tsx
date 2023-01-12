import React from 'react';
import './App.css';
import {Board} from "./components/Board";

function App() {


  return (
      <div className={"tic-tac-toe-container"}>
        <Board squaresInRow={3}></Board>
      </div>
  );
}

export default App;
