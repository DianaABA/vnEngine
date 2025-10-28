import React, { useRef } from 'react';
import { SafeAreaView } from 'react-native';
import { VNPlayerNative } from '../../packages/renderer-native/VNPlayerNative';
import { VNEngine } from '../../packages/core/src/vnEngineNodeSystem';

// Sample assets (replace with your actual asset URLs)
const assets = {
  backgrounds: {
    clinic_night: 'https://example.com/bg/clinic_night.jpg',
  },
  sprites: {
    camilla: {
      neutral: 'https://example.com/sprites/camilla_neutral.png',
    },
  },
  audio: {
    rain_loop: 'https://example.com/audio/rain_loop.mp3',
  },
};

// Sample script (can import from web-demo)
const script = require('../../apps/web-demo/src/sample-commands.json');

export default function App() {
  const engineRef = useRef(new VNEngine());
  React.useEffect(() => {
    engineRef.current.loadScript(script, script.scenes[0].id);
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VNPlayerNative engine={engineRef.current} assets={assets} />
    </SafeAreaView>
  );
}
