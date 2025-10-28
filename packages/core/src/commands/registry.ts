export type CommandName =
  | 'setBackground'
  | 'showSprite'
  | 'hideSprite'
  | 'playMusic'
  | 'stopMusic'
  | 'setFlag';

export type CommandArgs =
  | { name: 'setBackground'; key: string }
  | { name: 'showSprite'; id: string; pose?: string; at?: { x?: number; y?: number; z?: number } }
  | { name: 'hideSprite'; id: string }
  | { name: 'playMusic'; idOrUrl: string; loop?: boolean }
  | { name: 'stopMusic'; id?: string }
  | { name: 'setFlag'; key: string; value: boolean };

export const commandRegistry: Record<CommandName, {
  validate: (args: any) => void;
  sideEffects: 'none';
}> = {
  setBackground: {
    validate: (args) => {
      if (!args.key) throw new Error('setBackground requires key');
    },
    sideEffects: 'none'
  },
  showSprite: {
    validate: (args) => {
      if (!args.id) throw new Error('showSprite requires id');
    },
    sideEffects: 'none'
  },
  hideSprite: {
    validate: (args) => {
      if (!args.id) throw new Error('hideSprite requires id');
    },
    sideEffects: 'none'
  },
  playMusic: {
    validate: (args) => {
      if (!args.idOrUrl) throw new Error('playMusic requires idOrUrl');
    },
    sideEffects: 'none'
  },
  stopMusic: {
    validate: () => {},
    sideEffects: 'none'
  },
  setFlag: {
    validate: (args) => {
      if (!args.key || typeof args.value !== 'boolean') throw new Error('setFlag requires key and boolean value');
    },
    sideEffects: 'none'
  }
};

export function validateCommand(name: CommandName, args: any) {
  commandRegistry[name].validate(args);
}
