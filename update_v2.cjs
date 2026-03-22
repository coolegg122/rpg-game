const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src', 'gameData.js');
let text = fs.readFileSync(file, 'utf8');

// 1. Add new imports
const newImports = `import conf1ImgV2 from "./assets/images/conf1_v2.png";
import mishapImgV2 from "./assets/images/mishap_v2.png";
import resGunImgV2 from "./assets/images/res_gun_v2.png";
import court2ImgV2 from "./assets/images/court2_v2.png";`;

if (!text.includes('conf1ImgV2')) {
  text = text.replace(/import epiLostImg from "([^"]+)";/, `$&\\n${newImports}`);
}

// 2. Continuous Replace variables
text = text.replace(/bg:conf1Img/g, "bg:conf1ImgV2");
text = text.replace(/bg:mishapImg/g, "bg:mishapImgV2");
text = text.replace(/bg:resGunImg/g, "bg:resGunImgV2");
text = text.replace(/bg:court2Img/g, "bg:court2ImgV2");

fs.writeFileSync(file, text, 'utf8');
console.log('Successfully updated to V2 unified consistent illustrations!');
