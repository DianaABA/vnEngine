import React, { useState } from 'react';
import MainMenu from './menus/MainMenu';
import PauseMenu from './menus/PauseMenu';
import Episode1 from './episodes/Episode1';
import Episode2 from './episodes/Episode2';
import Episode3 from './episodes/Episode3';
import Episode4 from './episodes/Episode4';
import Episode5 from './episodes/Episode5';
import Episode6 from './episodes/Episode6';
import Episode7 from './episodes/Episode7';
import Episode8 from './episodes/Episode8';
import Episode9 from './episodes/Episode9';

const episodes = [
  Episode1,
  Episode2,
  Episode3,
  Episode4,
  Episode5,
  Episode6,
  Episode7,
  Episode8,
  Episode9,
];

function App() {
  const [screen, setScreen] = useState('main');
  const [episodeIndex, setEpisodeIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const startGame = () => {
    setEpisodeIndex(0);
    setScreen('episode');
  };

  const continueGame = () => {
    setScreen('episode');
  };

  const nextEpisode = () => {
    if (episodeIndex < episodes.length - 1) {
      setEpisodeIndex(episodeIndex + 1);
    } else {
      setScreen('main');
    }
  };

  const pauseGame = () => setPaused(true);
  const resumeGame = () => setPaused(false);
  const exitToMenu = () => {
    setPaused(false);
    setScreen('main');
  };

  if (screen === 'main') {
    return <MainMenu onStart={startGame} onContinue={continueGame} />;
  }

  if (paused) {
    return <PauseMenu onResume={resumeGame} onExit={exitToMenu} />;
  }

  const EpisodeComponent = episodes[episodeIndex];
  return <EpisodeComponent onNext={nextEpisode} />;
}

export default App;
