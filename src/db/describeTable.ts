import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

async function describeTable() {
  try {
    console.log('Describing links table structure...');
    
    const sql = neon(process.env.DATABASE_URL!);
    const result = await sql`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_name = 'links'
      ORDER BY ordinal_position
    `;
    
    console.log('Links table structure:');
    console.log('Column Name\t\tData Type\t\tNullable\tDefault');
    console.log('--------------------------------------------------------');
    result.forEach((row: any) => {
      console.log(`${row.column_name}\t\t${row.data_type}\t\t${row.is_nullable}\t\t${row.column_default || 'NULL'}`);
    });
  } catch (error) {
    console.error('❌ Error describing table:', error);
  }
}

describeTable();