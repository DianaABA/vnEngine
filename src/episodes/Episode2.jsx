import React from 'react';

const Episode2 = ({ onNext }) => (
  <div className="episode">
    <h2>Episode 2</h2>
    <p>Episode 2 content goes here.</p>
    <button onClick={onNext}>Next</button>
  </div>
);

export default Episode2;
