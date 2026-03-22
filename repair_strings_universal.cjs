const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src', 'gameData.js');
let text = fs.readFileSync(file, 'utf8');

// Regex to catch strings that broke across lines:
// tx:"内容(无引号) \n 剩余内容(带引号)" -> tx:"内容\n剩余内容"
text = text.replace(/(tx:"[^"]+)\r?\n([^"]+")/g, '$1\\n$2');

fs.writeFileSync(file, text, 'utf8');
console.log('Successfully repaired ALL broken dialogue strings with universal Regex!');
