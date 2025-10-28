import React from "react";
import { VNEngine } from "@vn/core/src/vnEngineNodeSystem";
import { VNPlayer } from "./components/VNPlayer";
import sampleScript from "../../assets/scripts/episode1.json";
import { loadScript } from "@vn/core/src/scriptLoader";


// Convert sample JSON to GameScript format
function convertToGameScript(json: any): any {
  return {
    scenes: (json.scenes || []).map((scene: any) => ({
      id: scene.id,
      nodes: (scene.lines || []).map((line: any) => {
        if (line.choices) {
          return {
            id: line.id,
            type: "choice",
            options: (line.choices || []).map((choice: any) => ({
              id: choice.id,
              text: choice.text,
              next: choice.nextSceneId || ""
            }))
          };
        }
        return {
          id: line.id,
          type: "dialogue",
          speaker: line.speaker,
          text: line.text,
          next: undefined
        };
      })
    }))
  };
}

const engine = new VNEngine();
const gameScript = loadScript(convertToGameScript(sampleScript));
engine.loadScript(gameScript, gameScript.scenes[0].id);

function App() {
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <h2>Visual Novel Demo</h2>
      <VNPlayer engine={engine} />
    </div>
  );
}

export default App;
