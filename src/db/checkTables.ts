import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

async function checkTables() {
  try {
    console.log('Checking existing tables...');
    
    const sql = neon(process.env.DATABASE_URL!);
    const result = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`;
    
    console.log('Existing tables:');
    result.forEach((row: any) => {
      console.log('- ', row.table_name);
    });
    
    if (result.length === 0) {
      console.log('No tables found in public schema');
    }
  } catch (error) {
    console.error('❌ Error checking tables:', error);
  }
}

checkTables();