import * as monaco from 'monaco-editor';
import { useEffect } from 'react';

export function setupMonaco(monacoInstance: typeof monaco) {
  monacoInstance.languages.register({ id: 'vn-dsl' });
  monacoInstance.languages.setLanguageConfiguration('vn-dsl', {
    comments: { lineComment: '#' }
  });
  monacoInstance.languages.setMonarchTokensProvider('vn-dsl', {
    tokenizer: {
      root: [
        [/^\s*#[^\n]*/, 'comment'],
        [/^\s*([A-Za-z_][\w]*)\s*:\s*(.*)$/, ['keyword', 'string']], // speaker: text
        [/^\s*\*\s+choice\s*:\s*(.+?)\s*->\s*([A-Za-z_][\w]*)$/, ['keyword', 'string','constant']], // * choice: text -> id
        [/^\s*@([A-Za-z_][\w]*)\b(.*)$/, ['keyword','string']], // @command args
        [/^\s*:([A-Za-z_][\w]*)$/, 'constant'],                  // :label
        [/^\s*->\s*([A-Za-z_][\w]*)$/, 'constant'],              // -> next
      ]
    }
  });
}

export function useMonacoDsl(monacoInstance?: typeof monaco) {
  useEffect(() => {
    if (monacoInstance) {
      setupMonaco(monacoInstance);
    }
  }, [monacoInstance]);
}
