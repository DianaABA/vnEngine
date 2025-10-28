import React, { useState } from "react";
import { VNEngine, RenderInstruction } from "@vn/core/src/vnEngineNodeSystem";
import { LocalStorageAdapter } from "@vn/core/src/LocalStorageAdapter";

interface VNPlayerProps {
  engine: VNEngine;
  saveSlot?: string;
}

const saveAdapter = new LocalStorageAdapter();

export const VNPlayer: React.FC<VNPlayerProps> = ({ engine, saveSlot = "slot1" }) => {
  const [instruction, setInstruction] = useState<RenderInstruction | null>(engine.next());
  // Track choice selection if needed in the future

  const handleNext = () => {
    setInstruction(engine.next());
  // no-op
  };

  const handleChoose = (index: number) => {
  setInstruction(engine.choose(index));
  };

  const handleSave = () => {
    saveAdapter.save(saveSlot, {
  scene: engine.snapshot.sceneId,
  node: engine.snapshot.nodeId,
    });
    alert("Game saved!");
  };

  const handleLoad = () => {
    const data = saveAdapter.load(saveSlot);
    if (data && data.scene && data.node) {
      // Re-load script and jump to saved node
  // Re-create engine with saved snapshot
  const newEngine = new VNEngine(engine['script'], { sceneId: data.scene, nodeId: data.node });
  setInstruction(newEngine.next());
  // no-op
      alert("Game loaded!");
    } else {
      alert("No save found.");
    }
  };

  if (!instruction) return <div>Game Over or Invalid Script</div>;

  switch (instruction.kind) {
    case "showDialogue":
      return (
        <div>
          <div><strong>{instruction.speaker || "Narrator"}</strong></div>
          <div>{instruction.text}</div>
          <button onClick={handleNext}>Next</button>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleLoad}>Load</button>
        </div>
      );
    case "showChoices":
      return (
        <div>
          <div>Make a choice:</div>
          {instruction.choices.map((opt, idx) => (
            <button key={idx} onClick={() => handleChoose(idx)}>{opt.text}</button>
          ))}
          <button onClick={handleSave}>Save</button>
          <button onClick={handleLoad}>Load</button>
        </div>
      );
    case "end":
      return <div>Game Over</div>;
    default:
      return <div>Unknown instruction</div>;
  }
};
