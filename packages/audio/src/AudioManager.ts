export class AudioManager {
  private music?: HTMLAudioElement;

  playSound(src: string) {
    const audio = new window.Audio(src);
    audio.play();
  }

  playMusic(src: string, loop = true) {
    this.stopMusic();
    this.music = new window.Audio(src);
    this.music.loop = loop;
    this.music.play();
  }

  stopMusic() {
    if (this.music) {
      this.music.pause();
      this.music = undefined;
    }
  }
}
