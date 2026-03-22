const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src', 'gameData.js');
let text = fs.readFileSync(file, 'utf8');

// List of all broken multiline dialogues caused by earlier expansion
const pairs = [
  ['tx:"22岁的汪新，穿着崭新乘警制服，第一次独自踏上巡逻路线。\n他不会知道，今天将遇见改变他一生的人……"', 'tx:"22岁的汪新，穿着崭新乘警制服，第一次独自踏上巡逻路线。\\n他不会知道，今天将遇见改变他一生的人……"'],
  ['tx:"七年过去，汪新凭借机敏与冲劲屡立奇功。\n他和马魁，已经成了宁阳铁路最默契的搭档。"', 'tx:"七年过去，汪新凭借机敏与冲劲屡立奇功。\\n他和马魁，已经成了宁阳铁路最默契的搭档。"'],
  ['tx:"多年来，汪新与马魁已默契如一人。但这次，马魁在信里只写了一句话：\n「如果我出了什么事，你不能停下来。」"', 'tx:"多年来，汪新与马魁已默契如一人。但这次，马魁在信里只写了一句话：\\n「如果我出了什么事，你不能停下来。」"'],
  ['tx:"列车继续向前。有些故事还没有结局——\n但人，一直在路上。"', 'tx:"列车继续向前。有些故事还没有结局——\\n但人，一直在路上。"'],
  ['tx:"哐当哐当的声音早已消失。\n但有些东西，永远留在了铁轨上。"', 'tx:"哐当哐当的声音早已消失。\\n但有些东西，永远留在了铁轨上。"']
];

for (const p of pairs) {
  text = text.split(p[0]).join(p[1]);
  // Windows breaks support
  text = text.split(p[0].replace('\n', '\r\n')).join(p[1]);
}

fs.writeFileSync(file, text, 'utf8');
console.log('Successfully patched all broken multiline D strings in gameData.js via split/join!');
