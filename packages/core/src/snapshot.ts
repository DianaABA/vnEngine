export type Snapshot = {
  sceneId: string;
  nodeId: string;
  flags: Record<string, boolean | number | string>;
  vars: Record<string, unknown>;
  history: Array<{ sceneId: string; nodeId: string }>;
};
