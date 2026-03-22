const fs = require('fs');

const path = 'c:\\Users\\kaixi\\.gemini\\antigravity\\playground\\deep-einstein\\check_vercel_deploy.cjs';
let content = fs.readFileSync(path, 'utf8');

// Replace loop to output JUST the URL and status concisely
content = content.replace('console.log(`ID: ${d.id}`);', 'console.log(`URL: ${statuses[0].target_url}`);');
fs.writeFileSync(path, content, 'utf8');
console.log("Updated check script to show URL explicitly.");
