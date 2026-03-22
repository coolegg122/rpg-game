const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\kaixi\\.gemini\\antigravity\\brain\\e012c370-1216-4ad7-ba57-3ec9c2cc5366';
const dstDir = path.join(__dirname, 'src', 'assets', 'images', 'avatars');

if (!fs.existsSync(dstDir)) fs.mkdirSync(dstDir, { recursive: true });

const files = {
  'avatar_jia_jinlong_1773903850397.png': 'jia.png',
  'avatar_blind_man_old_1773903872943.png': 'blind_man.png',
  'avatar_xiao_zhou_new_1773903893388.png': 'zhou.png',
  'avatar_xiao_yun_girl_1773903913036.png': 'yun.png',
  'avatar_suspect_generic_1773903929518.png': 'suspect.png'
};

for (const [s, d] of Object.entries(files)) {
  const sPath = path.join(srcDir, s);
  const dPath = path.join(dstDir, d);
  if (fs.existsSync(sPath)) {
     fs.copyFileSync(sPath, dPath);
     console.log(`Copied ${s} to ${d}`);
  }
}

// Update Game.jsx
const gameFile = path.join(__dirname, 'src', 'Game.jsx');
let text = fs.readFileSync(gameFile, 'utf8');

const mappingCode = `// ── 头像 Map 增加 ──
import avaWang from "./assets/images/avatars/wang.png";
import avaMa from "./assets/images/avatars/ma.png";
import avaYan from "./assets/images/avatars/yan.png";
import avaDali from "./assets/images/avatars/dali.png";
import avaJia from "./assets/images/avatars/jia.png";
import avaBlind from "./assets/images/avatars/blind_man.png";
import avaZhou from "./assets/images/avatars/zhou.png";
import avaYun from "./assets/images/avatars/yun.png";
import avaSuspect from "./assets/images/avatars/suspect.png";

const AVATAR_MAP = {
  "汪新": avaWang, "马魁": avaMa, "马燕": avaYan, "牛大力": avaDali,
  "贾金龙": avaJia, "老瞎子": avaBlind, "小周": avaZhou, "小云": avaYun,
  "嫌疑人": avaSuspect, "陈国梁": avaSuspect
};`;

text = text.replace(/\/\/ ── 头像 Map 增加 ──[\s\S]+?const AVATAR_MAP = \{[\s\S]+?\};/, mappingCode);

fs.writeFileSync(gameFile, text, 'utf8');
console.log('Successfully completed full remaining AVATAR suites inside Game.jsx!');
