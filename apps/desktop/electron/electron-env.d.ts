/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    APP_ROOT: string;
    VITE_PUBLIC: string;
  }
}

// global.d.ts
export declare global {
  interface Window {
    ipcRenderer: {
      on: (channel: string, listener: (event: unknown, ...args: unknown[]) => void) => void;
      off: (channel: string, listener: (event: unknown, ...args: unknown[]) => void) => void;
      send: (channel: string, ...args: unknown[]) => void;
      invoke: (channel: string, ...args: unknown[]) => Promise<unknown>;
    };
    electron: {
      store: {
        get: (key: unknown) => unknown;
        set: (property: unknown, val: unknown) => void;
        delete: (key: unknown) => void;
        clear: () => void;
      };
      db: {
        get: (key: unknown) => unknown;
        set: (property: unknown, val: unknown) => void;
        delete: (key: unknown) => void;
        clear: () => void;
      };
    };
  }
}
