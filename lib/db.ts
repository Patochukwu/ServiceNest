import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

let prisma: PrismaClient;

if (typeof window === 'undefined') {
  if (globalForPrisma.prisma) {
    prisma = globalForPrisma.prisma;
  } else {
    const dbUrl = process.env.DATABASE_URL || 'file:./dev.db';
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
