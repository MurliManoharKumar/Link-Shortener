import dotenv from 'dotenv';
dotenv.config();

import { createLink, getLinkByShortCode, isShortCodeTaken, deactivateLink } from './linkService';

async function testLinkService() {
  try {
    console.log('Testing Link Service functions...');
    
    // Test creating a link
    console.log('Creating a new link...');
    const newLink = await createLink('gh', 'https://github.com');
    console.log('Created link:', newLink);
    
    // Test checking if short code exists
    console.log('Checking if short code "gh" exists...');
    const exists = await isShortCodeTaken('gh');
    console.log('Short code "gh" exists:', exists);
    
    // Test retrieving a link
    console.log('Retrieving link with short code "gh"...');
    const retrievedLink = await getLinkByShortCode('gh');
    console.log('Retrieved link:', retrievedLink);
    
    // Test deactivating a link
    console.log('Deactivating link with short code "gh"...');
    const deactivated = await deactivateLink('gh');
    console.log('Link deactivated:', deactivated);
    
    console.log('✅ All link service tests passed!');
  } catch (error) {
    console.error('❌ Link service tests failed:', error);
  }
}

testLinkService();