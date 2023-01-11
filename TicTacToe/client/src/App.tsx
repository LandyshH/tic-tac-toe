import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Square} from "./components/Square";
import {Board} from "./components/Board";
import {Button} from "@mui/material";

function App() {


  return (
      <div className={"tic-tac-toe-container"}>
        <Board squaresInRow={3}></Board>
      </div>
  );
}

export default App;
