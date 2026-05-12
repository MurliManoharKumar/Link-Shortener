import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

export async function GET() {
  try {
    // Test database connection
    const sql = neon(process.env.DATABASE_URL!);
    const result = await sql`SELECT version()`;
    
    // Test table query
    const tableResult = await sql`SELECT COUNT(*) as count FROM links`;
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      postgresVersion: result[0],
      linkCount: tableResult[0].count
    });
  } catch (error) {
    console.error('Database test failed:', error);
    return NextResponse.json({
      success: false,
      message: 'Database test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { shortCode, originalUrl } = await request.json();
    
    if (!shortCode || !originalUrl) {
      return NextResponse.json({
        success: false,
        message: 'Missing shortCode or originalUrl'
      }, { status: 400 });
    }
    
    const sql = neon(process.env.DATABASE_URL!);
    
    // Insert new link
    const result = await sql`
      INSERT INTO links (short_code, original_url, clicks, is_active)
      VALUES (${shortCode}, ${originalUrl}, 0, true)
      RETURNING *
    `;
    
    return NextResponse.json({
      success: true,
      message: 'Link created successfully',
      link: result[0]
    });
  } catch (error) {
    console.error('Failed to create link:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to create link',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}