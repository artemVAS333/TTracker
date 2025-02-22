import Database from 'better-sqlite3';
import { app } from 'electron';
import { join } from 'path';

// Initialize SQLite database
const dbPath = join(app.getPath('userData'), 'data.db');
console.log('Database path:', dbPath);
const db = new Database(dbPath, { verbose: console.log });
db.exec('CREATE TABLE IF NOT EXISTS data (key TEXT PRIMARY KEY, value TEXT)');
db.pragma('journal_mode = WAL');

export default db;
