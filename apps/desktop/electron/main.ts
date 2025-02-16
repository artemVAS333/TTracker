import { app, BrowserWindow, ipcMain, shell } from 'electron';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import Store from 'electron-store';

// Resolve __filename and __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize electron-store for data storage
const store = new Store();

// Set app root path
process.env.APP_ROOT = path.join(__dirname, '..');

// Set paths for dev server and production renderer
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');

// Set public folder based on dev or prod
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST;

let win: BrowserWindow | null;

// Create the main window
function createWindow() {
  // Create window
  win = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    icon: process.env.VITE_PUBLIC ? path.join(process.env.VITE_PUBLIC, 'electron-vite.svg') : undefined,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'), // Preload script
      contextIsolation: true, // Enable context isolation
      nodeIntegration: false, // Disable Node.js integration
    },
  });

  // Send a message when window is ready
  win.webContents.on('did-finish-load', () => {});

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
    win.loadFile(path.join(RENDERER_DIST, 'index.html'));
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
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// IPC handlers for store operations
ipcMain.on('electron-store-get', (event, key) => (event.returnValue = store.get(key))); // Get value from store
ipcMain.on('electron-store-set', (_event, key, value) => store.set(key, value)); // Set value in store
ipcMain.on('window-closed', (event) => event.reply('window-closed-reply', { status: 'closed' })); // Confirm window closed

// Create window when app is ready
app.whenReady().then(() => createWindow());
