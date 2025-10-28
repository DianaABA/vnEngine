import React, { useState } from "react";
import { VNEngine, RenderInstruction, DialogueNode, ChoiceNode } from "@vn/core/src/vnEngineNodeSystem";
import { LocalStorageAdapter } from "@vn/core/src/LocalStorageAdapter";

interface VNPlayerProps {
  engine: VNEngine;
  saveSlot?: string;
}

const saveAdapter = new LocalStorageAdapter();

export const VNPlayer: React.FC<VNPlayerProps> = ({ engine, saveSlot = "slot1" }) => {
  const [instruction, setInstruction] = useState<RenderInstruction | null>(engine.advance());
  const [choiceIndex, setChoiceIndex] = useState<number | null>(null);

  const handleNext = () => {
    setInstruction(engine.next());
    setChoiceIndex(null);
  };

  const handleChoose = (index: number) => {
    setInstruction(engine.choose(index));
    setChoiceIndex(index);
  };

  const handleSave = () => {
    saveAdapter.save(saveSlot, {
      scene: engine["currentScene"]?.id,
      node: engine["currentNode"]?.id,
    });
    alert("Game saved!");
  };

  const handleLoad = () => {
    const data = saveAdapter.load(saveSlot);
    if (data && data.scene && data.node) {
      // Re-load script and jump to saved node
      engine.loadScript(engine["script"]!, data.scene);
      engine["currentNode"] = engine["findNodeById"](data.node);
      setInstruction(engine.advance());
      setChoiceIndex(null);
      alert("Game loaded!");
    } else {
      alert("No save found.");
    }
  };

  if (!instruction) return <div>Game Over or Invalid Script</div>;

  switch (instruction.type) {
    case "showDialogue": {
      const node = instruction.node as DialogueNode;
      return (
        <div>
          <div><strong>{node.speaker || "Narrator"}</strong></div>
          <div>{node.text}</div>
          <button onClick={handleNext}>Next</button>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleLoad}>Load</button>
        </div>
      );
    }
    case "showChoices": {
      const node = instruction.node as ChoiceNode;
      return (
        <div>
          <div>Choose:</div>
          {node.options.map((opt, idx) => (
            <button key={opt.id} onClick={() => handleChoose(idx)}>{opt.text}</button>
          ))}
          <button onClick={handleSave}>Save</button>
          <button onClick={handleLoad}>Load</button>
        </div>
      );
    }
    case "showCommand": {
      // For demo, just show command type
      return (
        <div>
          <div>Command: {(instruction as any).node.command}</div>
          <button onClick={handleNext}>Next</button>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleLoad}>Load</button>
        </div>
      );
    }
    case "showEnd": {
      return <div>End of Scene</div>;
    }
    default:
      return <div>Unknown instruction</div>;
  }
};
