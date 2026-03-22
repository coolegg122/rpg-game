const fs = require('fs');

const path = 'c:\\Users\\kaixi\\.gemini\\antigravity\\playground\\deep-einstein\\src\\gameData.js';
let content = fs.readFileSync(path, 'utf8');

// 1. Insert C5 after C4
if (!content.includes('const C5')) {
    const c4Index = content.indexOf('export const C4');
    const endC4Index = content.indexOf(';', c4Index) + 1;
    const c5String = `\nexport const C5={bg0:"#020406",bg1:"#060C12",bg2:"#0A1420",bg3:"#101C30",gold:"#00B0FF",amber:"#00E5FF",cream:"#E0F7FA",sepia:"#80DEEA",muted:"#4DD0E1",dim:"#26C6DA",danger:"#D50000",dangerL:"#FF1744",safeL:"#00E676",blue:"#1A237E",blueL:"#5C6BC0",border:"#006064",borderG:"#0097A7"};`;
    content = content.slice(0, endC4Index) + c5String + content.slice(endC4Index);
}

// 2. Insert PAX5 before Dialogue D
if (!content.includes('export const PAX5')) {
    const dIndex = content.indexOf('export const D={');
    const pax5String = `export const PAX5 = [
  {id:0,ic:"🤖",seat:"辅助",name:"巡检机器",tB:"设备",tA:"工作",desc:"闪烁着蓝色指示灯，不知疲倦地检测着车厢安全隐患。",role:"normal"},
  {id:1,ic:"👨‍🏫",seat:"1号",name:"老警汪新",tB:"老铁路",tA:"老师傅",desc:"擦拭着警徽。眼神一如三十年前那样，只是鬓角结了霜。",role:"witness",clue:"线索：汪新眼神依旧警惕，不放过任何死角"},
  {id:2,ic:"👩‍✈️",seat:"2号",name:"马燕列车长",tB:"列车长",tA:"爱人",desc:"身穿高级列车长制服，默默地为汪新打好领带。眼神温柔体贴。",role:"mayan_ch5",clue:"线索：马燕今天给车上带了当年汪新最爱的哈尔滨红肠"},
  {id:3,ic:"👨‍🎓",seat:"3号",name:"实习警员",tB:"新学员",tA:"新星",desc:"核对着车上人数，举止略带局促，和当年的你如出一辙。",role:"normal"},
  {id:4,ic:"🎒",seat:"4号",name:"背包客",tB:"普通旅客",tA:"无异常",desc:"戴着VR眼镜，正用沉浸式视野沉浸在沿途风景中。",role:"normal"}
];\n\n`;
    content = content.slice(0, dIndex) + pax5String + content.slice(dIndex);
}

// 3. Append to Dialogue D
if (!content.includes('pro5:')) {
    const dEndIndex = content.lastIndexOf('};');
    const dAppendString = `
pro5:[{sp:null,pt:null,tx:"2026年，未来已来。"},{sp:null,pt:null,tx:"智能高铁横穿华夏大地，每一趟旅程，都已化作精准的数字与效率。"},{sp:"旁白",pt:"📜",tx:"这是汪新退休前的最后一趟巡察。\n今日马燕恰好担当列车长，与你同行。"}],
court5:[{sp:"马燕",pt:"🌸",tx:"汪总警监，今天也是巡察岗位吗？"},{sp:"汪新",pt:"🫡",tx:"习惯了。不看遍，心里不踏实。"},{sp:"马燕",pt:"🌸",tx:"跟当年一个脾气。忙完了，我们拿红肠下酒。"}],
conf5:[{sp:"汪新",pt:"🫡",tx:"一晃成历史了。不过每一里，心里清清楚楚就行啦。"}],
end5:[{sp:"旁白",pt:"📜",tx:"夕阳沉下。汪新换下制服，向铁轨深处，敬了三十多年来最舒心的一个礼。"}],
love_chat_mayan:[{sp:"马燕",pt:"🌸",tx:"（笑盈盈地）汪新，今天巡视收获如何啊？"},{sp:"汪新",pt:"🫡",tx:"挺好。重点排查了几节车厢，太平得很。"},{sp:"马燕",pt:"🌸",tx:"（微微低头）那就好……如果等下有空，我想去大院走走。"},{sp:"汪新",pt:"🫡",tx:"（笑）行，在门口等你。"}],
love_gift_success_mayan:[{sp:"马燕",pt:"🌸",tx:"（看着你递过去的礼物，惊喜）大白兔奶糖！"},{sp:"汪新",pt:"🫡",tx:"早上专门买的。你还喜欢就好。"},{sp:"马燕",pt:"🌸",tx:"（甜甜剥开一粒）喜欢！你在，味道就在！"},{sp:"旁白",pt:"📜",tx:"马燕的心情变得很开朗。❤️ 好感度大幅提升！"}]
`;
    // Insert just before the last `};` closing D
    content = content.slice(0, dEndIndex) + dAppendString + content.slice(dEndIndex);
}

fs.writeFileSync(path, content, 'utf8');
console.log("Successfully updated gameData.js");
