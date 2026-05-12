import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import dotenv from 'dotenv';

dotenv.config();

async function migrate() {
  try {
    console.log('Running migration...');
    
    const sql = neon(process.env.DATABASE_URL!);
    const db = drizzle(sql);
    
    // Check if the links table exists
    const tableCheck = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'links'
      )
    `;
    
    const tableExists = tableCheck[0].exists;
    
    if (tableExists) {
      console.log('✅ Links table already exists');
      return;
    }
    
    // Create the links table
    console.log('Creating links table...');
    await sql`
      CREATE TABLE links (
        id SERIAL PRIMARY KEY,
        short_code TEXT NOT NULL UNIQUE,
        original_url TEXT NOT NULL,
        clicks INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;
    
    console.log('✅ Links table created successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
  }
}

migrate();