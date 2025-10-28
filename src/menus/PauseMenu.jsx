import React from 'react';

const PauseMenu = ({ onResume, onExit }) => (
  <div className="pause-menu">
    <h2>Paused</h2>
    <button onClick={onResume}>Resume</button>
    <button onClick={onExit}>Exit to Main Menu</button>
  </div>
);

export default PauseMenu;
