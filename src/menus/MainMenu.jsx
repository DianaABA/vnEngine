import React from 'react';

const MainMenu = ({ onStart, onContinue }) => (
  <div className="main-menu">
    <h1>Visual Novel</h1>
    <button onClick={onStart}>Start New Game</button>
    <button onClick={onContinue}>Continue</button>
  </div>
);

export default MainMenu;
