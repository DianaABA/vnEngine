import React, { useState } from "react";
import { VNEngine, type RenderInstruction } from "@vn/core";
import { LocalStorageAdapter } from "@vn/storage";

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
  };

  const handleChoose = (index: number) => {
    setInstruction(engine.choose(index));
  };

  const handleSave = () => {
    // Persist full engine snapshot
    saveAdapter.save(saveSlot, engine.snapshot);
    alert("Game saved!");
  };

  const handleLoad = () => {
    const snap = saveAdapter.load(saveSlot);
    if (snap) {
      engine.hydrate(snap as any);
      setInstruction(engine.next());
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
