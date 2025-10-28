export interface VNEpisode {
  id: string;
  title: string;
  description?: string;
  scenes: VNScene[];
}

export interface VNScene {
  id: string;
  background: string;
  lines: VNLine[];
}

export interface VNLine {
  id: string;
  speaker?: string;
  text: string;
  background?: string;
  choices?: VNChoice[];
}

export interface VNChoice {
  id: string;
  text: string;
  nextSceneId?: string;
}
