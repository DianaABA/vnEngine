import episode1 from '@assets/scripts/episode1.json';
import { VNEngine, VNEpisode, VNScene, VNLine, VNChoice, parseEpisode, loadEpisodeToSceneManager } from '@vn/core';

// 1. Load episode JSON and parse
const episode: VNEpisode = parseEpisode(JSON.stringify(episode1));

// 2. Create engine and load episode scenes
const engine = new VNEngine();
loadEpisodeToSceneManager(episode, engine.sceneManager);

// 3. Start first scene
let currentScene = engine.sceneManager.getCurrentScene()?.data as VNScene;
let currentLineIndex = 0;

function showCurrentLine() {
  const line: VNLine = currentScene.lines[currentLineIndex];
  console.log('Background:', line.background || currentScene.background);
  if (line.speaker) console.log(line.speaker + ':', line.text);
  else console.log(line.text);
  if (line.choices) {
    line.choices.forEach((choice: VNChoice, i: number) => {
      console.log(`Choice ${i + 1}: ${choice.text}`);
    });
  }
}

// 4. Advance through dialogue
function nextLine(choiceId?: string) {
  const line: VNLine = currentScene.lines[currentLineIndex];
  if (line.choices && choiceId) {
  const choice = line.choices.find((c: VNChoice) => c.id === choiceId);
    if (choice && choice.nextSceneId) {
      engine.sceneManager.goToScene(choice.nextSceneId);
      currentScene = engine.sceneManager.getCurrentScene()?.data as VNScene;
      currentLineIndex = 0;
      showCurrentLine();
      return;
    }
  }
  currentLineIndex++;
  if (currentLineIndex < currentScene.lines.length) {
    showCurrentLine();
  } else {
    console.log('End of scene.');
  }
}

// Example usage:
showCurrentLine(); // Show first line
nextLine();        // Advance to next line
nextLine();        // Advance to next line (shows choices)
nextLine('choice1'); // Select first choice, branch to next scene
