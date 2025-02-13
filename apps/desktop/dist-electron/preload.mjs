"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args) {
    const [channel, listener] = args;
    return electron.ipcRenderer.on(channel, (event, ...args2) => listener(event, ...args2));
  },
  off(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.off(channel, ...omit);
  },
  send(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.send(channel, ...omit);
  },
  invoke(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.invoke(channel, ...omit);
  }
  // You can expose other APTs you need here.
  // ...
});
electron.contextBridge.exposeInMainWorld("electron", {
  store: {
    get(key) {
      return electron.ipcRenderer.sendSync("electron-store-get", key);
    },
    set(property, val) {
      electron.ipcRenderer.send("electron-store-set", property, val);
    }
    // Other method you want to add like has(), reset(), etc.
  }
  // Any other methods you want to expose in the window object.
  // ...
});
