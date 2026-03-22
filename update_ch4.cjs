const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src', 'gameData.js');
let text = fs.readFileSync(file, 'utf8');

// 1. imports
const imports = `import mqEndImg from "./assets/images/mq_end.png";
import memorialImg from "./assets/images/memorial.png";`;

if (!text.includes('mqEndImg')) {
  text = text.replace(/import epiLostImg from "([^"]+)";/, `$&\\n${imports}`);
}

// 2. Continuous Replace
text = text.replace(/mq_end:\[{sp:"旁白",pt:"📜",tx:"出站口，一个老人靠着柱子等候。",bg:court4Img}/, `mq_end:[{sp:"旁白",pt:"📜",tx:"出站口，一个老人靠着柱子等候。",bg:mqEndImg}`);
text = text.replace(/bg:court4Img/g, (match, offset) => {
  // Only replace inside mq_end and memorial
  const str = text.substring(0, offset);
  if (str.includes('mq_end:[')) {
     if (offset > text.lastIndexOf('mq_end:[')) return 'bg:mqEndImg';
  }
  if (str.includes('memorial:[')) {
     if (offset > text.lastIndexOf('memorial:[')) return 'bg:memorialImg';
  }
  return match;
});

// Let's use straightforward safe Regexes:
text = text.replace(/mq_end:\[([\s\S]+?)\]/, m => m.replace(/bg:court4Img/g, 'bg:mqEndImg'));
text = text.replace(/memorial:\[([\s\S]+?)\]/, m => m.replace(/bg:court4Img/g, 'bg:memorialImg'));

fs.writeFileSync(file, text, 'utf8');
console.log('Successfully updated Chapter 4 with all its individual endings!');
