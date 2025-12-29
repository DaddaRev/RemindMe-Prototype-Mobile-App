import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, '..', 'remindMe.sqlite');
const SNAPSHOT_PATH = path.join(__dirname, '..', 'remindMe.snapshot.sqlite');

async function createSnapshot() {
  try {
    // Check if the database exists
    await fs.access(DB_PATH);
    
    // Copy the database file
    await fs.copyFile(DB_PATH, SNAPSHOT_PATH);
    
    console.log('✅ Database snapshot created successfully!');
    console.log(`📁 Snapshot saved to: ${SNAPSHOT_PATH}`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('❌ Error: Database file not found at', DB_PATH);
    } else {
      console.error('❌ Error creating snapshot:', error.message);
    }
    process.exit(1);
  }
}

createSnapshot();
