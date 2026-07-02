import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import fs from 'fs';
import path from 'path';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

let prisma: PrismaClient;

if (typeof window === 'undefined') {
  if (globalForPrisma.prisma) {
    prisma = globalForPrisma.prisma;
  } else {
    let dbUrl = process.env.DATABASE_URL || 'file:./dev.db';

    // If running in Vercel serverless environment, copy the read-only dev.db to /tmp so we can write to it
    if (process.env.VERCEL) {
      const sourceDb = path.join(process.cwd(), 'dev.db');
      const destDb = path.join('/tmp', 'dev.db');
      
      try {
        if (fs.existsSync(sourceDb)) {
          // Copy if dest doesn't exist, or if the source is newer/modified
          let shouldCopy = !fs.existsSync(destDb);
          if (!shouldCopy) {
            const sourceStat = fs.statSync(sourceDb);
            const destStat = fs.statSync(destDb);
            if (sourceStat.mtimeMs > destStat.mtimeMs) {
              shouldCopy = true;
            }
          }
          
          if (shouldCopy) {
            fs.copyFileSync(sourceDb, destDb);
            console.log('[SQLite Setup] Copied dev.db to writable location: /tmp/dev.db');
          }
          dbUrl = `file:${destDb}`;
        }
      } catch (err) {
        console.error('[SQLite Setup] Failed to copy dev.db to /tmp:', err);
      }
    }

    const adapter = new PrismaBetterSqlite3({ url: dbUrl });
    prisma = new PrismaClient({ adapter });
    if (process.env.NODE_ENV !== 'production') {
      globalForPrisma.prisma = prisma;
    }
  }
} else {
  prisma = null as any;
}

export { prisma };
export default prisma;
