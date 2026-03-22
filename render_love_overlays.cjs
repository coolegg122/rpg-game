const fs = require('fs');

const path = 'c:\\Users\\kaixi\\.gemini\\antigravity\\playground\\deep-einstein\\src\\Game.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add to PatrolScene
if (content.includes('{NotesOverlay}') && !content.includes('{NotesOverlay}{LoveOverlay}')) {
    content = content.replace('{NotesOverlay}', '{NotesOverlay}{LoveOverlay}');
}

// 2. Add to ChoiceScene
if (content.includes('{AchPopup}') && !content.includes('{AchPopup}{LoveOverlay}')) {
    const choiceIndex = content.indexOf('{HUD}{Toast}{AchPopup}');
    if (choiceIndex > -1) {
        content = content.replace('{HUD}{Toast}{AchPopup}', '{HUD}{Toast}{AchPopup}{LoveOverlay}');
    }
}

// 3. Add to EndScene
const endPopupIndex = content.indexOf('{SF}{AchPopup}');
if (endPopupIndex > -1) {
    content = content.replace('{SF}{AchPopup}', '{SF}{AchPopup}{LoveOverlay}');
}

fs.writeFileSync(path, content, 'utf8');
console.log("Successfully updated overlays in Game.jsx");
