const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src', 'gameData.js');
const text = fs.readFileSync(file, 'utf8');

const spList = [];
const regex = /sp:"([^"]+)"/g;
let match;
while ((match = regex.exec(text)) !== null) {
  if (!spList.includes(match[1])) spList.push(match[1]);
}

const currentMapped = [
  "汪新", "马魁", "马燕", "牛大力", "贾金龙", 
  "老瞎子", "小周", "小云", "嫌疑人", "陈国梁"
];

console.log('--- Mapped ---');
console.log(currentMapped);
console.log('--- Found Sp ---');
console.log(spList);

const missing = spList.filter(name => !currentMapped.includes(name) && name !== "旁白" && name !== "null");
console.log('--- Missing Avatars ---');
console.log(missing);
