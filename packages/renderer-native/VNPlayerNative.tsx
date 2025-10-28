import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import type { VNEngine } from '@vn/core/src/vnEngineNodeSystem';
export interface VNAssets {
  backgrounds: Record<string, string>;
  sprites: Record<string, Record<string, string>>;
  audio: Record<string, string>;
}
import type { RenderInstruction } from '@vn/core/src/vnEngineNodeSystem';

interface Props {
  engine: VNEngine;
  assets: VNAssets;
}

export const VNPlayerNative: React.FC<Props> = ({ engine, assets }) => {
  const [instruction, setInstruction] = useState<RenderInstruction | null>(engine.getCurrentInstruction());

  React.useEffect(() => {
    const sub = engine.onInstruction(setInstruction);
    return () => sub.unsubscribe();
  }, [engine]);

  // Background key from last setBackground command
  let bgKey = '';
  if (
    instruction &&
    'kind' in instruction &&
    instruction.kind === 'runCommand' &&
    instruction.name === 'setBackground' &&
    instruction.args &&
    'key' in instruction.args
  ) {
    bgKey = (instruction.args as { key: string }).key;
  }
  const bgUrl = assets.backgrounds[bgKey] || '';

  // Dialogue
  if (instruction && 'type' in instruction && instruction.type === 'showDialogue') {
    return (
      <View style={styles.container}>
        {bgUrl ? <Image source={{ uri: bgUrl }} style={styles.background} /> : null}
        <Text style={styles.dialogue}>{instruction.node.text}</Text>
        <Pressable style={styles.next} onPress={() => engine.next()}><Text>Next</Text></Pressable>
      </View>
    );
  }
  // Choices
  if (instruction && 'type' in instruction && instruction.type === 'showChoices') {
    return (
      <View style={styles.container}>
        {bgUrl ? <Image source={{ uri: bgUrl }} style={styles.background} /> : null}
        {instruction.node.options.map((opt: any, i: number) => (
          <Pressable key={opt.id} style={styles.choice} onPress={() => engine.choose(i)}>
            <Text>{opt.text}</Text>
          </Pressable>
        ))}
      </View>
    );
  }
  // ...handle other instruction types...
  return <View style={styles.container}><Text>VNPlayerNative</Text></View>;
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#222' },
  background: { position: 'absolute', width: '100%', height: '100%' },
  dialogue: { color: '#fff', fontSize: 20, margin: 20 },
  choice: { backgroundColor: '#444', padding: 10, margin: 5, borderRadius: 5 },
  next: { backgroundColor: '#888', padding: 10, margin: 20, borderRadius: 5 },
});
