import { app, BrowserWindow, ipcMain, shell } from 'electron';
import { join } from 'node:path';
import Store from 'electron-store';
import Database from 'better-sqlite3';

// Resolve __dirname for ESM
const __dirname = import.meta.dirname;

// Initialize electron-store for data storage
const store = new Store();

// Initialize SQLite database
const dbPath = join(app.getPath('userData'), 'data.db');
console.log('Database path:', dbPath);

const db = new Database(dbPath, { verbose: console.log });
db.exec('CREATE TABLE IF NOT EXISTS data (key TEXT PRIMARY KEY, value TEXT)');
db.pragma('journal_mode = WAL');

// Set app root path
process.env.APP_ROOT = join(__dirname, '..');

// Set paths for dev server and production renderer
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
export const MAIN_DIST = join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = join(process.env.APP_ROOT, 'dist');

// Set public folder based on dev or prod
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? join(process.env.APP_ROOT, 'public') : RENDERER_DIST;

let win: BrowserWindow | null;

// Create the main window
function createWindow() {
  // Create window
  win = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    icon: process.env.VITE_PUBLIC ? join(process.env.VITE_PUBLIC, 'electron-vite.svg') : undefined,
    webPreferences: {
      preload: join(__dirname, 'preload.mjs'), // Preload script
    },
  });

  // Send a message when window is ready
  // win.webContents.on('did-finish-load', () => {});

  // Open external links in default browser
  win.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // Load content based on environment
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
    win.webContents.openDevTools();
  } else {
    win.loadFile(join(RENDERER_DIST, 'index.html'));
  }
}

// Close app when all windows are closed (except macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    win = null;
  }
});

// Recreate window if app is activated (macOS specific)
app.on('activate', () => BrowserWindow.getAllWindows().length === 0 && createWindow());

// Create window when app is ready
app.whenReady().then(() => {
  // IPC handlers for store operations
  ipcMain.on('electron-store-get', (event, key) => (event.returnValue = store.get(key))); // Get value from store
  ipcMain.on('electron-store-set', (_event, key, value) => store.set(key, value)); // Set value in store
  ipcMain.on('window-closed', (event) => event.reply('window-closed-reply', { status: 'closed' })); // Confirm window closed
  createWindow();
});
