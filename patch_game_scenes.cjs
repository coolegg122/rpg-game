const fs = require('fs');

const path = 'c:\\Users\\kaixi\\.gemini\\antigravity\\playground\\deep-einstein\\src\\GameScenes.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add C5 to destructuring props
if (!content.includes(',C5')) {
    const importIndex = content.indexOf('C2, C3, C4');
    content = content.slice(0, importIndex + 10) + ', C5' + content.slice(importIndex + 10);
}

// 2. Add Chapter 5 row in TITLE
if (!content.includes('"2026 · 智能高铁"')) {
    const chRowsIndex = content.indexOf('const chRows=[');
    const endChRowsIndex = content.indexOf('];', chRowsIndex);
    const c5Row_TITLE = `  {ch:5,era:"2026 · 智能高铁",title:"第五章",sub:"岁月的敬礼",icon:"🚈",unlocked:ch3done,done:false,pal:C5},\n`;
    content = content.slice(0, endChRowsIndex) + c5Row_TITLE + content.slice(endChRowsIndex);
}

// 3. Add Chapter 5 row in CHSELECT
if (content.indexOf('desc:"新时代，带徒弟，时代落幕"') > -1) {
    const chSelectIndex = content.indexOf('desc:"新时代，带徒弟，时代落幕"');
    const rowEndIndex = content.indexOf('},', chSelectIndex) + 2;
    const c5Row_CHSELECT = `\n{ch:5,era:"2026 · 智能高铁",title:"第五章 · 岁月的敬礼",desc:"告别最后一班岗，传承故事",icon:"🚈",unlocked:ch3done,done:false,pal:C5},`;
    content = content.slice(0, rowEndIndex) + c5Row_CHSELECT + content.slice(rowEndIndex);
}

// 4. Update indexers for transData to add C5
if (!content.includes('[C,C,C2,C3,C4,C5]')) {
    content = content.replace('[C,C,C2,C3,C4]', '[C,C,C2,C3,C4,C5]');
}

// 5. Destructure LoveOverlay in Props
if (!content.includes(',LoveOverlay')) {
    const destIndex = content.indexOf('NotesOverlay,');
    content = content.slice(0, destIndex+13) + 'LoveOverlay,' + content.slice(destIndex+13);
}

fs.writeFileSync(path, content, 'utf8');
console.log("Successfully updated GameScenes.jsx for Chapter 5");
