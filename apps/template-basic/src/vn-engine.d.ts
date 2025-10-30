// Type declarations for VN Engine modules
declare module '@vn/core' {
  export interface EngineContract {
    readonly snapshot: any;
    hydrate: (snap: any) => void;
    next: () => any;
    proceed: () => any;
    choose: (index: number) => any;
    changeScene: (sceneId: string, nodeId?: string) => void;
  }

  export class NodeVNEngine implements EngineContract {
    readonly snapshot: any;
    constructor(script: any);
    hydrate: (snap: any) => void;
    next: () => any;
    proceed: () => any;
    choose: (index: number) => any;
    changeScene: (sceneId: string, nodeId?: string) => void;
  }

  export function loadScript(scriptData: any): any;
}

declare module '@vn/renderer-web' {
  import { ComponentType } from 'react';
  
  export interface VNPlayerProps {
    engine: any;
    assets: {
      backgrounds: Record<string, string>;
      sprites: Record<string, string>;
      audio: Record<string, string>;
    };
  }

  export const VNPlayer: ComponentType<VNPlayerProps>;
}