const fs = require('fs');
const path = 'c:\\Users\\kaixi\\.gemini\\antigravity\\playground\\deep-einstein\\babel_err.log';

try {
  const content = fs.readFileSync(path, 'utf16le'); // Read as UTF-16LE
  console.log(content);
} catch (err) {
  console.error(err);
}
