import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
  try {
    console.log('Testing database connection...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL?.substring(0, 50) + '...');
    
    const sql = neon(process.env.DATABASE_URL!);
    const result = await sql`SELECT version()`;
    
    console.log('✅ Connected successfully!');
    console.log('PostgreSQL version:', result[0]);
  } catch (error) {
    console.error('❌ Connection failed:', error);
  }
}

testConnection();