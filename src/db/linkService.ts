import { drizzle } from 'drizzle-orm/neon-http';
import { links, NewLink } from './schema';
import { eq, and } from 'drizzle-orm';
import { neon } from '@neondatabase/serverless';

// Initialize database connection
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set in environment variables');
}

const sql = neon(databaseUrl);
const db = drizzle(sql);

/**
 * Creates a new shortened link
 * @param shortCode The short code for the link
 * @param originalUrl The original URL to shorten
 * @returns The created link object
 */
export async function createLink(shortCode: string, originalUrl: string) {
  const newLink: NewLink = {
    shortCode,
    originalUrl,
    clicks: 0,
    isActive: true,
  };

  const result = await db.insert(links).values(newLink).returning();
  return result[0];
}

/**
 * Retrieves a link by its short code
 * @param shortCode The short code to look up
 * @returns The link object or null if not found
 */
export async function getLinkByShortCode(shortCode: string) {
  const result = await db
    .select()
    .from(links)
    .where(and(eq(links.shortCode, shortCode), eq(links.isActive, true)))
    .limit(1);

  if (result.length === 0) return null;
  
  // Increment click count
  await db
    .update(links)
    .set({ clicks: result[0].clicks + 1, updatedAt: new Date() })
    .where(eq(links.id, result[0].id));
    
  return result[0];
}

/**
 * Checks if a short code already exists
 * @param shortCode The short code to check
 * @returns Boolean indicating if the short code exists
 */
export async function isShortCodeTaken(shortCode: string) {
  const result = await db
    .select({ id: links.id })
    .from(links)
    .where(eq(links.shortCode, shortCode))
    .limit(1);
    
  return result.length > 0;
}

/**
 * Deactivates a link by its short code
 * @param shortCode The short code to deactivate
 * @returns Boolean indicating success
 */
export async function deactivateLink(shortCode: string) {
  const result = await db
    .update(links)
    .set({ isActive: false, updatedAt: new Date() })
    .where(eq(links.shortCode, shortCode))
    .returning();
    
  return result.length > 0;
}