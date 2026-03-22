const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src', 'gameData.js');
let text = fs.readFileSync(file, 'utf8');

// Replace literal '\\n' with actual newline bytes '\n'
text = text.split('\\n').join('\n');

fs.writeFileSync(file, text, 'utf8');
console.log('Successfully expanded gameData.js literal newlines!');
