import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

export async function GET(
  request: Request,
  { params }: { params: { shortcode: string } }
) {
  try {
    const { shortcode } = params;
    
    if (!shortcode) {
      return NextResponse.json({
        success: false,
        message: 'Missing shortcode parameter'
      }, { status: 400 });
    }
    
    const sql = neon(process.env.DATABASE_URL!);
    
    // Retrieve link by short code
    const result = await sql`
      SELECT * FROM links 
      WHERE short_code = ${shortcode} 
      AND is_active = true
      LIMIT 1
    `;
    
    if (result.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'Link not found or inactive'
      }, { status: 404 });
    }
    
    const link = result[0];
    
    // Update click count
    await sql`
      UPDATE links 
      SET clicks = clicks + 1, updated_at = NOW()
      WHERE id = ${link.id}
    `;
    
    return NextResponse.json({
      success: true,
      link: link
    });
  } catch (error) {
    console.error('Failed to retrieve link:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to retrieve link',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}