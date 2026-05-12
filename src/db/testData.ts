import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

async function testData() {
  try {
    console.log('Testing data operations...');
    
    const sql = neon(process.env.DATABASE_URL!);
    
    // Insert a test link
    console.log('Inserting test data...');
    const insertResult = await sql`
      INSERT INTO links (short_code, original_url, clicks, is_active)
      VALUES ('test123', 'https://example.com', 0, true)
      RETURNING *
    `;
    
    console.log('Inserted link:', insertResult[0]);
    
    // Retrieve the link
    console.log('Retrieving link...');
    const getResult = await sql`
      SELECT * FROM links WHERE short_code = 'test123'
    `;
    
    console.log('Retrieved link:', getResult[0]);
    
    // Update click count
    console.log('Updating click count...');
    const updateResult = await sql`
      UPDATE links 
      SET clicks = clicks + 1, updated_at = NOW()
      WHERE short_code = 'test123'
      RETURNING clicks
    `;
    
    console.log('Updated clicks:', updateResult[0].clicks);
    
    // Clean up test data
    console.log('Cleaning up test data...');
    await sql`DELETE FROM links WHERE short_code = 'test123'`;
    
    console.log('✅ All data operations successful!');
  } catch (error) {
    console.error('❌ Data operations failed:', error);
  }
}

testData();