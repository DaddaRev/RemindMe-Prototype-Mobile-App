import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, '..', 'remindMe.sqlite');
const SNAPSHOT_PATH = path.join(__dirname, '..', 'remindMe.snapshot.sqlite');

async function resetDatabase() {
  try {
    // Check if snapshot exists
    await fs.access(SNAPSHOT_PATH);
    
    // Copy snapshot to database
    await fs.copyFile(SNAPSHOT_PATH, DB_PATH);
    
    // Clean up SQLite journal files if they exist
    const journalFiles = [
      `${DB_PATH}-journal`,
      `${DB_PATH}-wal`,
      `${DB_PATH}-shm`
    ];
    
    for (const file of journalFiles) {
      try {
        await fs.unlink(file);
        console.log(`🧹 Cleaned up: ${path.basename(file)}`);
      } catch (err) {
        // Ignore if file doesn't exist
        if (err.code !== 'ENOENT') {
          console.warn(`⚠️  Could not delete ${file}:`, err.message);
        }
      }
    }
    
    console.log('✅ Database reset to snapshot successfully!');
    console.log(`📁 Database restored to: ${DB_PATH}`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('❌ Error: Snapshot file not found!');
      console.error('💡 Run "npm run db:snapshot" first to create a checkpoint.');
    } else {
      console.error('❌ Error resetting database:', error.message);
    }
    process.exit(1);
  }
}

resetDatabase();
