import { ipcRenderer, contextBridge } from 'electron';

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args;
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args));
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args;
    return ipcRenderer.off(channel, ...omit);
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args;
    return ipcRenderer.send(channel, ...omit);
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args;
    return ipcRenderer.invoke(channel, ...omit);
  },
});

contextBridge.exposeInMainWorld('electron', {
  store: {
    get: async (key: unknown) => await ipcRenderer.invoke('electron-store-get', key),
    set: (property: unknown, val: unknown) => ipcRenderer.send('electron-store-set', property, val),
    delete: (key: unknown) => ipcRenderer.send('electron-store-delete', key),
    clear: () => ipcRenderer.send('electron-store-clear'),
  },
  db: {
    get: (key: unknown) => ipcRenderer.sendSync('electron-db-get', key),
    set: (property: unknown, val: unknown) => ipcRenderer.send('electron-db-set', property, val),
    delete: (key: unknown) => ipcRenderer.send('electron-db-delete', key),
    clear: () => ipcRenderer.send('electron-db-clear'),
  },
});
