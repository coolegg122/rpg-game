const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'gameData.js');
let lines = fs.readFileSync(file, 'utf8').split('\n').slice(0, 54);

const endingCode = `
export const PAX4=[
{id:0,ic:"🧑‍✈️",seat:"徒弟",name:"小周",tB:"新乘警",tA:"汪新的徒弟",desc:"二十出头，眼睛亮，腿脚快，满脸写着「我能行」——跟当年的汪新一模一样。",role:"apprentice",clue:"你告诉小周：观察，不是靠直觉，靠的是耐心"},
{id:1,ic:"🧓",seat:"1号",name:"老瞎子",tB:"旧相识",tA:"旧相识",desc:"已是七八十岁，发须皆白，颤巍巍端坐，手里还攥着那张发黄的照片。",role:"blind4"},
{id:2,ic:"👩",seat:"2号",name:"年轻妈妈",tB:"普通旅客",tA:"无异常",desc:"抱着刚满月的孩子，这趟高铁三小时到家——不用再熬一夜绿皮车了。",role:"normal"},
{id:3,ic:"👴",seat:"3号",name:"退休教授",tB:"普通旅客",tA:"无异常",desc:"捧着书，偶尔抬头看窗外飞驰的风景，神情安详。",role:"normal"},
{id:4,ic:"🧒",seat:"4号",name:"小学生",tB:"普通旅客",tA:"无异常",desc:"趴在桌上画画，认认真真地画了一列绿皮火车。",role:"normal"},
];

// ── Achievements ──
export const ACHS=[
{key:"fast_gun",ic:"🔫",name:"神枪手",desc:"在第一章选择鸣枪示警"},
{key:"brave_chase",ic:"🏃",name:"血性追捕",desc:"在第一章孤身追捕同伙"},
{key:"blind_saved",ic:"🧓",name:"三十年",desc:"帮助老瞎子找到女儿"},
{key:"perfect3",ic:"⭐",name:"完美合围",desc:"第三章收集全3处破绽并全身而退"},
{key:"all_clues",ic:"📎",name:"火眼金睛",desc:"在某章节收集到全部可用线索"},
];

// ── Dialogue ──
export const D={
pro1:[{sp:null,pt:null,tx:"1978年，深秋。"},{sp:null,pt:null,tx:"宁阳——哈尔滨，一列墨绿色的蒸汽客车在凌晨汽笛声中缓缓驶离站台。"},{sp:null,pt:null,tx:"月台上人声鼎沸：大件行李的碰撞、婴儿的啼哭、叫卖糖葫芦的小贩……"},{sp:"旁白",pt:"📜",tx:"22岁的汪新，穿着崭新乘警制服，第一次独自踏上巡逻路线。\\n他不会知道，今天将遇见改变他一生的人……"}],
court1:[{sp:"牛大力",pt:"💪",tx:"哟！汪新！正式上岗了，紧张不紧张啊？",bg:court1Img},{sp:"汪新",pt:"🫡",tx:"紧什么张！我练了三年枪，还怕几个小毛贼？",bg:court1Img},{sp:"牛大力",pt:"💪",tx:"嘿，说正事儿——我姐夫昨天在这班车上丢了钱包，专盯口袋的扒手团伙……",bg:court1Img},{sp:"汪新",pt:"🫡",tx:"知道了。放心，我一定把人揪出来。",bg:court1Img},{sp:"牛大力",pt:"💪",tx:"行！快去吧！记住带包哈尔滨红肠回来啊——！",bg:court1Img}],
conf1:[{sp:"汪新",pt:"🫡",tx:"同志，麻烦跟我走一趟。",bg:conf1Img},{sp:"嫌疑人",pt:"😤",tx:"干什么！我什么都没做！凭什么抓我！",bg:conf1Img},{sp:"汪新",pt:"🫡",tx:"我亲眼目睹你将手伸进孙老爷子外兜。请到值班室配合检查。",bg:conf1Img},{sp:"嫌疑人",pt:"😤",tx:"胡说！认错人了！我什么都没拿！",bg:conf1Img},{sp:"汪新",pt:"🫡",tx:"（掏出证物）那这张从你内袋搜到的烟票，上面印着孙字，从哪儿来的？",bg:conf1Img},{sp:"嫌疑人",pt:"😰",tx:"……我……我……",bg:conf1Img}],
mishap:[{sp:"旁白",pt:"📜",tx:"就在汪新押着嫌疑人走去时，余光猛地一扫——侧门处！一道黑影靠近车厢门缝，是同伙！",bg:mishapImg},{sp:"汪新",pt:"🫡",tx:"（抓住侧门徘徊男子的手腕）站住！你也是他们的人！",bg:mishapImg},{sp:"马魁",pt:"👮",tx:"（猝不及防）哎！放开！",bg:mishapImg},{sp:"旁白",pt:"📜",tx:"被汪新拽住的，正是那个冷静观察车厢的中年便衣。而真正的同伙已将车厢门拉开一道缝，正要跳车！",bg:mishapImg}],
res_gun:[{sp:"旁白",pt:"📜",tx:"枪声骤响！逃跑的同伙两腿发软，瘫倒在门槛上。",bg:resGunImg},{sp:"马魁",pt:"👮",tx:"（掏出证件）哈尔滨铁路公安处，刑警马魁。这是我盯了三天的漏网之鱼——你刚才险些让他跑了。",bg:resGunImg},{sp:"汪新",pt:"🫡",tx:"……您是自己人？！",bg:resGunImg},{sp:"马魁",pt:"👮",tx:"鸣枪这个判断……还算有几分脑子。但下次动枪，先把局面看清楚。",bg:resGunImg}],
res_chase:[{sp:"旁白",pt:"📜",tx:"汪新猛地松开马魁，向黑影扑去！铁轨与寒风之间，他死死按住同伙——制住了！",bg:resChaseImg},{sp:"马魁",pt:"👮",tx:"（走来，亮出证件）哈尔滨铁路公安处，刑警马魁。",bg:resChaseImg},{sp:"汪新",pt:"🫡",tx:"您是便衣？对不起！我真不知道——",bg:resChaseImg},{sp:"马魁",pt:"👮",tx:"（嘴角微扬）算了。敢孤身追出去……这点胆量，还不赖。",bg:resChaseImg}],
partner:[{sp:"马魁",pt:"👮",tx:"你，哪个处的？",bg:partnerImg},{sp:"汪新",pt:"🫡",tx:"宁阳铁路公安处。汪新。",bg:partnerImg},{sp:"马魁",pt:"👮",tx:"（眼神微微一动，嘴角扯起一丝不易察觉的笑）……跟我走。下一站，有活干。",bg:partnerImg}],
pro2:[{sp:null,pt:null,tx:"1985年，初见繁华。"},{sp:null,pt:null,tx:"收音机里放着最新的流行曲，车厢里的衣着从单调的蓝黑灰变得五颜六色。"},{sp:"旁白",pt:"📜",tx:"七年过去，汪新凭借机敏与冲劲屡立奇功。\\n他和马魁，已经成了宁阳铁路最默契的搭档。"}],
court2:[{sp:"马魁",pt:"👮",tx:"（严肃）接到乘务员报告，3号车厢那个带短发小女孩的男人，形迹可疑。可能涉嫌拐卖。",bg:court2Img},{sp:"汪新",pt:"🫡",tx:"明白。要我过去敲山震虎吗？",bg:court2Img},{sp:"马魁",pt:"👮",tx:"先别惊动。去观察。确认受害者和嫌疑人到底是谁，再收网。",bg:court2Img},{sp:"汪新",pt:"🫡",tx:"好。而且刚有人来报案说钱包丢了，我顺道查查。",bg:court2Img}],
conf2:[{sp:"汪新",pt:"🫡",tx:"（俯下身，轻声问女孩）小朋友，这位叔叔叫什么名字？",bg:conf2Img},{sp:"小云",pt:"😶",tx:"（沉默，眼泪慢慢涌出来）……我不知道……我要找妈妈……",bg:conf2Img},{sp:"陈国梁",pt:"😤",tx:"小孩子！瞎说什么！跟叔叔走——",bg:conf2Img},{sp:"汪新",pt:"🫡",tx:"（声音沉下去）你跟我走一趟。手放好，别乱动。",bg:conf2Img}],
res2:[{sp:"旁白",pt:"📜",tx:"马魁已在车厢连接处等候，早有部署。",bg:res2Img},{sp:"马魁",pt:"👮",tx:"人证已固定。他的同伙正在下一站等消息，我们已通知当地公安。",bg:res2Img},{sp:"汪新",pt:"🫡",tx:"小云……",bg:res2Img},{sp:"马魁",pt:"👮",tx:"孩子安全。已联系到她家里了。",bg:res2Img},{sp:"汪新",pt:"🫡",tx:"（松了口气）谢谢您……",bg:res2Img},{sp:"马魁",pt:"👮",tx:"（停顿片刻）你发现那孩子，靠的是观察，不是运气。记住这个。",bg:res2Img}],
mayan_end:[{sp:"马燕",pt:"🌸",tx:"你来了。",bg:mayanEndImg},{sp:"汪新",pt:"🫡",tx:"（有点局促）……有事找我？",bg:mayanEndImg},{sp:"马燕",pt:"🌸",tx:"（低头）我爸不让我们来往。因为你爸的事。",bg:mayanEndImg},{sp:"汪新",pt:"🫡",tx:"我知道。",bg:mayanEndImg},{sp:"马燕",pt:"🌸",tx:"（抬头，认真地看着他）那你怎么想？",bg:mayanEndImg},{sp:"汪新",pt:"🫡",tx:"……我想把事情弄清楚。不管结果怎样——你等我。",bg:mayanEndImg}],
laoli_end:[{sp:"汪新",pt:"🫡",tx:"李师傅，我父亲汪永革当年，为什么没替马魁作证？",bg:laoliEndImg},{sp:"老李",pt:"👨🔧",tx:"（沉默良久）……你得去问你父亲。但我告诉你：他不是坏人，他是……怕了。",bg:laoliEndImg},{sp:"汪新",pt:"🫡",tx:"（拳头慢慢握紧）……是怕什么？",bg:laoliEndImg},{sp:"老李",pt:"👨🔧",tx:"有人威胁他。我只知道这么多。",bg:laoliEndImg},{sp:"旁白",pt:"📜",tx:"回去的路上，汪新一直没说话。\\n有些事，他必须亲自去面对。",bg:laoliEndImg}],
pro3:[{sp:null,pt:null,tx:"1993年，深秋。"},{sp:null,pt:null,tx:"改革开放已走过十五年。铁路沿线的站台越来越热闹——但某些阴影，也在悄悄蔓延。"},{sp:"旁白",pt:"📜",tx:"汪新收到情报：有人正利用宁哈铁路线秘密运毒。幕后主脑的代号，叫「金龙」。"},{sp:"旁白",pt:"📜",tx:"多年来，汪新与马魁已默契如一人。但这次，马魁在信里只写了一句话：\\n「如果我出了什么事，你不能停下来。」"}],
court3:[{sp:"马燕",pt:"🌸",tx:"（匆匆赶来）汪新，情报出来了。",bg:court3Img},{sp:"汪新",pt:"🫡",tx:"说。",bg:court3Img},{sp:"马燕",pt:"🌸",tx:"金龙这次亲自押货。我的人在哈尔滨站看见他了——他伪装成退休站长，今晚就在你这趟车上。",bg:court3Img},{sp:"汪新",pt:"🫡",tx:"（停顿）你怎么知道这些？",bg:court3Img},{sp:"马燕",pt:"🌸",tx:"（淡淡地）这些年做生意，见的人多了。放心，这条线索靠得住。",bg:court3Img},{sp:"汪新",pt:"🫡",tx:"（看了她一眼）……谢谢你，马燕。",bg:court3Img}],
conf3:[{sp:"汪新",pt:"🫡",tx:"（走近贾金龙）贾站长，我是乘警，这趟车上有点情况，想请您协助一下。",bg:conf3Img},{sp:"贾金龙",pt:"😄",tx:"哟！小汪啊，有什么需要帮忙的？尽管说！",bg:conf3Img},{sp:"汪新",pt:"🫡",tx:"（眼神一沉）……我没说我姓汪。",bg:conf3Img},{sp:"贾金龙",pt:"😨",tx:"（笑容微微凝住）",bg:conf3Img},{sp:"汪新",pt:"🫡",tx:"你右手腕上的疤，是什么时候留下的？",bg:conf3Img},{sp:"贾金龙",pt:"😰",tx:"（笑容彻底消失）……",bg:conf3Img}],
res3_good:[{sp:"旁白",pt:"📜",tx:"马魁早已在车厢连接处等候，身后还有两名便衣——三面合围。",bg:res3GoodImg},{sp:"马魁",pt:"👮",tx:"贾金龙。哈尔滨铁路公安处——你被捕了。",bg:res3GoodImg},{sp:"贾金龙",pt:"😰",tx:"（看向汪新）你小子……比我想象的聪明。",bg:res3GoodImg},{sp:"汪新",pt:"🫡",tx:"（轻声）师父教的。",bg:res3GoodImg},{sp:"旁白",pt:"📜",tx:"那一夜，宁哈363次列车缓缓停靠终点站。月台的灯光下，马魁和汪新站在一起，谁都没有说话。",bg:res3GoodImg},{sp:"旁白",pt:"📜",tx:"这一次，师徒二人，全身而退。",bg:res3GoodImg}],
res3_bad:[{sp:"旁白",pt:"📜",tx:"汪新扑上去！但贾金龙早有准备——一道寒光，枪声骤响。",bg:res3BadImg},{sp:"汪新",pt:"🫡",tx:"师父！！",bg:res3BadImg},{sp:"马魁",pt:"👮",tx:"（摇摇头，声音很轻）……没事。没打中要害。去——别让他跑了。",bg:res3BadImg},{sp:"旁白",pt:"📜",tx:"后来汪新才知道：马魁中弹的地方，距离心脏不到两厘米。他在医院躺了三个月。",bg:res3BadImg},{sp:"旁白",pt:"📜",tx:"贾金龙在下一站被截获。但马魁的鬓角，此后永远添了一道疤。",bg:res3BadImg}],
res3_esc:[{sp:"旁白",pt:"📜",tx:"汪新按住不动，等待增援信号。",bg:res3EscImg},{sp:"旁白",pt:"📜",tx:"但贾金龙察觉了什么——在下一个停车站，他从容起身，随人流消失在月台。",bg:res3EscImg},{sp:"马魁",pt:"👮",tx:"（沉默片刻）他跑了。",bg:res3EscImg},{sp:"汪新",pt:"🫡",tx:"（拳头握紧）我以为……",bg:res3EscImg},{sp:"马魁",pt:"👮",tx:"（拍了拍他的肩）这次没抓到。但你活着。下次还有机会。",bg:res3EscImg},{sp:"旁白",pt:"📜",tx:"贾金龙最终在三年后于广州落网。但那是另一个故事了。",bg:res3EscImg}],
pro4:[{sp:null,pt:null,tx:"2018年。",bg:court4Img},{sp:null,pt:null,tx:"中国高铁运营里程已突破两万公里。昔日的哐当哐当，已变成平稳如飞的白色子弹。",bg:court4Img},{sp:"旁白",pt:"📜",tx:"汪新两鬓微霜，制服还是那套制服，但眼神里多了什么说不清楚的东西——",bg:court4Img},{sp:"旁白",pt:"📜",tx:"他带了一个新徒弟。这孩子跟当年的他一模一样：冲劲十足，缺少经验，满脑子都是英雄梦。",bg:court4Img}],
court4:[{sp:"小周",pt:"🧑✈️",tx:"师父！今天巡视从哪节车厢开始？",bg:court4Img},{sp:"汪新",pt:"🫡",tx:"你说呢？",bg:court4Img},{sp:"小周",pt:"🧑✈️",tx:"（思考）……从中间开始，两头巡？",bg:court4Img},{sp:"汪新",pt:"🫡",tx:"（点头）还行。记住：你有三小时去发现问题。别急。",bg:court4Img},{sp:"小周",pt:"🧑✈️",tx:"师父，您以前怎么知道谁是坏人的？",bg:court4Img},{sp:"汪新",pt:"🫡",tx:"（想了很久）……一开始不知道。但有个人，教了我怎么看。",bg:court4Img}],
epi_found:[{sp:"旁白",pt:"📜",tx:"末节车厢里，老瞎子忽然低声叫了一声——",bg:epiFoundImg},{sp:"老瞎子",pt:"🧓",tx:"……丫头？",bg:epiFoundImg},{sp:"旁白",pt:"📜",tx:"一个中年女人跑过来，紧紧抱住了他。",bg:epiFoundImg},{sp:"老瞎子",pt:"🧓",tx:"（声音颤抖）我就知道……我就知道你还在……",bg:epiFoundImg},{sp:"旁白",pt:"📜",tx:"汪新站在那里，没有上前，只是望着他们。这一幕，他等了三十年。",bg:epiFoundImg},{sp:"小周",pt:"🧑✈️",tx:"（凑过来，轻声）师父，那是……",bg:epiFoundImg},{sp:"汪新",pt:"🫡",tx:"（轻声）是个圆满的故事。",bg:epiFoundImg}],
epi_lost:[{sp:"老瞎子",pt:"🧓",tx:"（摸索着，认出了汪新）还是那个乘警小伙子……你老了。",bg:epiLostImg},{sp:"汪新",pt:"🫡",tx:"（笑了笑）您也老了。",bg:epiLostImg},{sp:"老瞎子",pt:"🧓",tx:"（摇头）找了三十年了……也许真的找不到了。",bg:epiLostImg},{sp:"汪新",pt:"🫡",tx:"（轻声）别放弃。我们一直在找。",bg:epiLostImg},{sp:"旁白",pt:"📜",tx:"列车继续向前。有些故事还没有结局——\\n但人，一直在路上。",bg:epiLostImg}],
mq_end:[{sp:"旁白",pt:"📜",tx:"出站口，一个老人靠着柱子等候。",bg:court4Img},{sp:"汪新",pt:"🫡",tx:"（停步）……师父？",bg:court4Img},{sp:"马魁",pt:"👮",tx:"（比以前老了些，但眼神依然锐利）我听说你带了新徒弟。",bg:court4Img},{sp:"汪新",pt:"🫡",tx:"是，小周，快来见见。",bg:court4Img},{sp:"小周",pt:"🧑✈️",tx:"（行礼）马魁爷爷好！",bg:court4Img},{sp:"马魁",pt:"👮",tx:"（看了汪新一眼，又看了看小周，轻声）……还不错。",bg:court4Img}],
memorial:[{sp:"旁白",pt:"📜",tx:"窗外，高铁以三百公里的时速划破夜色。",bg:court4Img},{sp:"汪新",pt:"🫡",tx:"（望着窗外）师父……这趟车比你当年查过的那趟快多了。",bg:court4Img},{sp:"小周",pt:"🧑✈️",tx:"（走过来）师父？您在说什么？",bg:court4Img},{sp:"汪新",pt:"🫡",tx:"（轻声）没什么。小周，记住这列车——它装过很多故事。",bg:court4Img},{sp:"旁白",pt:"📜",tx:"哐当哐当的声音早已消失。\\n但有些东西，永远留在了铁轨上。",bg:court4Img}],
};
`;

lines.push(endingCode);
fs.writeFileSync(file, lines.join('\\n'), 'utf8');
console.log('Successfully wrote cleanly formatted gameData.js to src/gameData.js');
