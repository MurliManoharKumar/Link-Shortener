import { pgTable, serial, text, timestamp, boolean } from 'drizzle-orm/pg-core';
import { InferModel } from 'drizzle-orm';

// Core table for storing shortened links
export const links = pgTable('links', {
  id: serial('id').primaryKey(),
  shortCode: text('short_code').notNull().unique(), // The short code for the URL
  originalUrl: text('original_url').notNull(),      // The original long URL
  clicks: serial('clicks').default(0),              // Click counter
  isActive: boolean('is_active').default(true),     // Whether the link is active
  createdAt: timestamp('created_at').defaultNow(),  // Creation timestamp
  updatedAt: timestamp('updated_at').defaultNow(),  // Last updated timestamp
});

// Types for TypeScript
export type Link = InferModel<typeof links>;
export type NewLink = InferModel<typeof links, 'insert'>;