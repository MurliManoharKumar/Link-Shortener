import { drizzle } from 'drizzle-orm/neon-http';
import { links } from './schema';
import { neon } from '@neondatabase/serverless';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

async function seed() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }

  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql);

  console.log('Seeding database...');

  // Insert sample links
  const sampleLinks = [
    {
      shortCode: 'gh',
      originalUrl: 'https://github.com',
      clicks: 0,
      isActive: true,
    },
    {
      shortCode: 'docs',
      originalUrl: 'https://docs.drizzle.run',
      clicks: 0,
      isActive: true,
    },
  ];

  try {
    await db.insert(links).values(sampleLinks);
    console.log('✅ Seeded database with sample links');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
}

seed();