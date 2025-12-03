#!/usr/bin/env node
/**
 * Test API endpoint and display results
 */
const http = require('http');

const url = 'http://localhost:1337/api/reviews';

http.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      const reviews = json.data || [];
      console.log(`\n✓ Found ${reviews.length} reviews:\n`);
      reviews.forEach((r, i) => {
        const attrs = r.attributes || r;
        console.log(`${i + 1}. "${attrs.title}" (${attrs.rating}/10) - ${attrs.slug}`);
      });
      process.exit(0);
    } catch (e) {
      console.error('Failed to parse response:', e.message);
      console.error('Raw response:', data);
      process.exit(1);
    }
  });
}).on('error', (e) => {
  console.error(`Connection failed: ${e.message}`);
  process.exit(1);
});

setTimeout(() => {
  console.error('Timeout: API not responding within 5 seconds');
  process.exit(1);
}, 5000);
