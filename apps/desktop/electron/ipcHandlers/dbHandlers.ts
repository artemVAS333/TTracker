import { ipcMain } from 'electron';
import db from '../database/database';

export function initDbHandlers() {
  ipcMain.on('electron-db-get', (event, key) => {
    const result = db.prepare('SELECT value FROM data WHERE key = ?').get(key) as { value: string };
    event.returnValue = result?.value;
  }); // Get value from database
  ipcMain.on('electron-db-set', (_event, key, value) =>
    db.prepare('INSERT OR REPLACE INTO data (key, value) VALUES (?, ?)').run(key, value),
  ); // Set value in database
  ipcMain.on('electron-db-delete', (_event, key) => db.prepare('DELETE FROM data WHERE key = ?').run(key)); // Delete value from database
  ipcMain.on('electron-db-clear', () => db.prepare('DELETE FROM data').run()); // Clear database
}
