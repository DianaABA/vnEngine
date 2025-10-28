import React from 'react';

const Episode1 = ({ onNext }) => (
  <div className="episode">
    <h2>Episode 1</h2>
    <p>Episode 1 content goes here.</p>
    <button onClick={onNext}>Next</button>
  </div>
);

export default Episode1;
