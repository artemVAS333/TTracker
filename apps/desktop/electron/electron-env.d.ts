/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    APP_ROOT: string;
    VITE_PUBLIC: string;
  }
}

export declare global {
  interface Window {
    electron: {
      ipcRenderer: Electron.IpcRenderer;
      store: {
        get: (key: string) => unknown;
        set: (key: string, val: unknown) => void;
      };
    };
  }
}
