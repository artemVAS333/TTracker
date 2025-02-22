import { ipcMain } from 'electron';
import Store from 'electron-store';

// Initialize electron-store for data storage
export const store = new Store();

export function initStoreHandlers() {
  ipcMain.on('electron-store-get', (event, key) => (event.returnValue = store.get(key))); // Get value from store
  ipcMain.on('electron-store-set', (_event, key, value) => store.set(key, value)); // Set value in store
  ipcMain.on('electron-store-delete', (_event, key) => store.delete(key)); // Delete value from store
  ipcMain.on('electron-store-clear', () => store.clear()); // Clear store
}
