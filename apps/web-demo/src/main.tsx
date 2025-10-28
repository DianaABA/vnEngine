import React from "react";
import { createRoot } from "react-dom/client";
import { VNEngine } from "@vn/core";
import { VNPlayer } from "../../../packages/web/src/components/VNPlayer";
import sampleScript from "./sample-script.json";
import { loadScript } from "@vn/core";


const gameScript = loadScript(sampleScript);
const engine = new VNEngine(gameScript);

const App = () => (
  <div style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
    <h2>Visual Novel Demo</h2>
    <VNPlayer engine={engine} />
  </div>
);

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
