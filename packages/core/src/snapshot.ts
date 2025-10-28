export type Snapshot = {
  sceneId: string;
  nodeId: string;
  flags: Record<string, boolean>;
  vars?: Record<string, any>;
  history?: string[];
};
