// Standard VN functions for engine-wide use
export function saveGame(state) {
  localStorage.setItem('vn_save', JSON.stringify(state));
}

export function loadGame() {
  const data = localStorage.getItem('vn_save');
  return data ? JSON.parse(data) : null;
}

export function clearSave() {
  localStorage.removeItem('vn_save');
}

export function showDialog(text, choices = [], onChoice) {
  // Placeholder: Implement dialog system in UI layer
  // Example: openDialog({ text, choices, onChoice })
}

export function playSound(src) {
  const audio = new window.Audio(src);
  audio.play();
}

export function playMusic(src, loop = true) {
  const audio = new window.Audio(src);
  audio.loop = loop;
  audio.play();
  return audio;
}

export function stopMusic(audioInstance) {
  if (audioInstance) audioInstance.pause();
}

export function showImage(src) {
  // Placeholder: Implement image display in UI layer
}

export function hideImage() {
  // Placeholder: Implement image hide in UI layer
}

export function setFlag(flags, key, value) {
  return { ...flags, [key]: value };
}

export function getFlag(flags, key) {
  return flags[key];
}

export function resetFlags() {
  return {};
}
