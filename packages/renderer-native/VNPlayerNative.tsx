import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import type { VNEngine, RenderInstruction } from '@vn/core';

export interface VNAssets {
  backgrounds: Record<string, string>;
  sprites: Record<string, Record<string, string>>;
  audio: Record<string, string>;
}

interface Props {
  engine: VNEngine;
  assets: VNAssets;
}

export const VNPlayerNative: React.FC<Props> = ({ engine, assets }) => {
  const [instruction, setInstruction] = useState<RenderInstruction | null>(engine.next());

  const handleNext = () => {
    const next = engine.proceed();
    setInstruction(next);
  };

  const handleChoice = (index: number) => {
    const next = engine.choose(index);
    setInstruction(next);
  };

  // Background rendering (simplified - track via state in production)
  const bgUrl = ''; // TODO: Track background state from runCommand instructions

  // Dialogue
  if (instruction?.kind === 'showDialogue') {
    return (
      <View style={styles.container}>
        {bgUrl ? <Image source={{ uri: bgUrl }} style={styles.background} /> : null}
        <Text style={styles.speaker}>{instruction.speaker || 'Narrator'}</Text>
        <Text style={styles.dialogue}>{instruction.text}</Text>
        <Pressable style={styles.next} onPress={handleNext}><Text style={styles.buttonText}>Next</Text></Pressable>
      </View>
    );
  }

  // Choices
  if (instruction?.kind === 'showChoices') {
    return (
      <View style={styles.container}>
        {bgUrl ? <Image source={{ uri: bgUrl }} style={styles.background} /> : null}
        <Text style={styles.prompt}>Choose:</Text>
        {instruction.choices.map((choice, i) => (
          <Pressable key={i} style={styles.choice} onPress={() => handleChoice(i)}>
            <Text style={styles.buttonText}>{choice.text}</Text>
          </Pressable>
        ))}
      </View>
    );
  }

  // End
  if (instruction?.kind === 'end') {
    return (
      <View style={styles.container}>
        <Text style={styles.dialogue}>The End</Text>
      </View>
    );
  }

  // Default/Loading
  return <View style={styles.container}><Text style={styles.dialogue}>VNPlayerNative</Text></View>;
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#222' },
  background: { position: 'absolute', width: '100%', height: '100%' },
  speaker: { color: '#aaa', fontSize: 16, marginBottom: 8, fontWeight: 'bold' },
  dialogue: { color: '#fff', fontSize: 20, margin: 20, textAlign: 'center' },
  prompt: { color: '#fff', fontSize: 18, marginBottom: 16 },
  choice: { backgroundColor: '#444', padding: 12, margin: 8, borderRadius: 8, minWidth: 200 },
  next: { backgroundColor: '#0066cc', padding: 12, margin: 20, borderRadius: 8, minWidth: 100 },
  buttonText: { color: '#fff', fontSize: 16, textAlign: 'center' },
});
