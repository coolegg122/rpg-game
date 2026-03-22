// ── Palettes ──
import court1Img from "./assets/images/court1.png";
import conf1Img from "./assets/images/conf1.png";
import mishapImg from "./assets/images/mishap.png";
import resGunImg from "./assets/images/res_gun.png";
import resChaseImg from "./assets/images/res_chase.png";
import partnerImg from "./assets/images/partner.png";
import court2Img from "./assets/images/court2.png";
import conf2Img from "./assets/images/conf2.png";
import res2Img from "./assets/images/res2.png";
import mayanEndImg from "./assets/images/mayan_end.png";
import laoliEndImg from "./assets/images/laoli_end.png";
import court3Img from "./assets/images/court3.png";
import conf3Img from "./assets/images/conf3.png";
import res3GoodImg from "./assets/images/res3_good.png";
import res3BadImg from "./assets/images/res3_bad.png";
import res3EscImg from "./assets/images/res3_esc.png";
import court4Img from "./assets/images/court4.png";
import epiFoundImg from "./assets/images/epi_found.png";
import epiLostImg from "./assets/images/epi_lost.png";
import mqEndImg from "./assets/images/mq_end.png";
import memorialImg from "./assets/images/memorial.png";
import conf1ImgV2 from "./assets/images/conf1_v2.png";
import mishapImgV2 from "./assets/images/mishap_v2.png";
import resGunImgV2 from "./assets/images/res_gun_v2.png";
import court2ImgV2 from "./assets/images/court2_v2.png";
export const C={bg0:"#140803",bg1:"#200D05",bg2:"#2E1408",bg3:"#3D1B0A",gold:"#C4880A",amber:"#F0A820",cream:"#F5E4B0",sepia:"#D4A870",muted:"#A07848",dim:"#7A5830",danger:"#8A1010",dangerL:"#E04848",safeL:"#48B870",blue:"#183860",blueL:"#70A8D8",border:"#3A1A06",borderG:"#6A3A10"};
export const C2={bg0:"#081016",bg1:"#0E1824",bg2:"#152130",bg3:"#1E2C3D",gold:"#E07018",amber:"#F09030",cream:"#EAE0C8",sepia:"#B0B8C8",muted:"#80A0B8",dim:"#506878",danger:"#780818",dangerL:"#D85050",safeL:"#38A868",blue:"#102850",blueL:"#58A0D0",border:"#0C1E30",borderG:"#204060"};
export const C3={bg0:"#140614",bg1:"#200A20",bg2:"#2D0F2D",bg3:"#3B143B",gold:"#B030A0",amber:"#E040C0",cream:"#F0D8F0",sepia:"#C0A8C8",muted:"#A870B8",dim:"#784888",danger:"#700010",dangerL:"#D03048",safeL:"#309060",blue:"#180858",blueL:"#6850C0",border:"#260828",borderG:"#4A1848"};
export const C4={bg0:"#061420",bg1:"#0A1D2E",bg2:"#10283C",bg3:"#16354D",gold:"#0898D8",amber:"#18C0F8",cream:"#D8F0FF",sepia:"#88B8D8",muted:"#60A0C8",dim:"#3A6888",danger:"#A00020",dangerL:"#F03858",safeL:"#00C8A0",blue:"#003878",blueL:"#28B0F0",border:"#001828",borderG:"#004878"};
export const C5={bg0:"#020406",bg1:"#060C12",bg2:"#0A1420",bg3:"#101C30",gold:"#00B0FF",amber:"#00E5FF",cream:"#E0F7FA",sepia:"#80DEEA",muted:"#4DD0E1",dim:"#26C6DA",danger:"#D50000",dangerL:"#FF1744",safeL:"#00E676",blue:"#1A237E",blueL:"#5C6BC0",border:"#006064",borderG:"#0097A7"};
export const F="'Noto Serif SC','FangSong','STSong','SimSun',serif";
export const STARS=Array.from({length:36},(_,i)=>({l:(i*37+13)%100,t:(i*53+7)%55,s:.8+((i*17)%10)/10,o:.10+((i*23)%28)/100}));
export const GRAIN_SVG_URL='url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'200\' height=\'200\' filter=\'url(%23n)\' opacity=\'.035\'/%3E%3C/svg%3E")';
export const KF=`@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700&display=swap'); @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}} @keyframes fadeIn{from{opacity:0}to{opacity:1}} @keyframes fadeOut{from{opacity:1}to{opacity:0}} @keyframes pulse{0%,100%{opacity:1}50%{opacity:.25}} @keyframes glow{0%,100%{box-shadow:0 0 8px #C4880A25}50%{box-shadow:0 0 24px #C4880A60}} @keyframes steam{0%{transform:translateY(0) scale(1);opacity:.45}100%{transform:translateY(-72px) scale(1.9);opacity:0}} @keyframes shake{0%,100%{transform:translateX(0)}33%{transform:translateX(-2px)}66%{transform:translateX(2px)}} @keyframes scanL{0%{top:0}100%{top:100%}} @keyframes drop{from{opacity:0;transform:translateX(-50%) translateY(-16px)}to{opacity:1;transform:translateX(-50%) translateY(0)}} @keyframes flicker{0%,93%,100%{opacity:1}94%{opacity:.55}97%{opacity:.8}} @keyframes skillGlow{0%,100%{box-shadow:0 0 6px #E8882820}50%{box-shadow:0 0 22px #E8882870}} @keyframes unlock{from{transform:scale(.88);opacity:0}to{transform:scale(1);opacity:1}} @keyframes trainRoll{from{transform:translateX(-120%)}to{transform:translateX(120vw)}} @keyframes yearPop{0%{transform:scale(.7);opacity:0}60%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}} @keyframes achPop{0%{transform:translateY(60px);opacity:0}70%{transform:translateY(-4px)}100%{transform:translateY(0);opacity:1}} @keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}} @keyframes slideDown{from{transform:translateY(0)}to{transform:translateY(100%)}} .glass{backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);background:rgba(20,8,4,0.38);border:1px solid rgba(245,228,176,0.15)} .hover-up{transition:transform .25s cubic-bezier(0.3,0.8,0.4,1),box-shadow .25s ease,border-color .25s ease} .hover-up:hover{transform:translateY(-5px) scale(1.02);box-shadow:0 12px 36px rgba(0,0,0,0.5),0 0 20px rgba(240,168,32,0.15);border-color:rgba(240,168,32,0.5)} @keyframes shine{0%{left:-100%}100%{left:100%}} .shimmer{position:relative;overflow:hidden} .shimmer::after{content:'';position:absolute;top:0;left:-100%;width:40%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent);animation:shine 3.5s ease-in-out infinite}`;

// ── Passengers ──
export const PAX1=[
{id:0,ic:"👨‍🌾",seat:"1号",name:"李大伯",tB:"普通旅客",tA:"无异常",desc:"扛着蛇皮袋，把车票折了又折攥在手心，眼神憨厚朴实。",role:"normal"},
{id:1,ic:"👩",seat:"2号",name:"陈翠花",tB:"普通旅客",tA:"无异常",desc:"怀里抱着熟睡的婴儿，轻轻拍哄，面容疲惫却温柔。",role:"normal"},
{id:2,ic:"👨‍💼",seat:"3号",name:"赵干事",tB:"普通旅客",tA:"无异常",desc:"戴粗框眼镜，低头翻文件夹，不苟言笑。",role:"normal"},
{id:3,ic:"🧔",seat:"4号",name:"王三",tB:"⚠ 可疑",tA:"扒手！",desc:"眼神飘忽，手指揉搓衣角，目光频繁扫向旁边老大爷的口袋……",role:"suspect",clue:"线索：发现扒手嫌疑人，有明显扒窃举动"},
{id:4,ic:"👴",seat:"5号",name:"孙老爷子",tB:"普通旅客",tA:"受害人！",desc:"靠着窗沿打盹，棉袄外兜里钱包和烟票隐约可见，毫无防备。",role:"victim"},
{id:5,ic:"🕵️",seat:"6号",name:"神秘男子",tB:"神秘人物",tA:"便衣！",desc:"四五十岁，面沉如水，目光如炬。沉默地扫视着车厢每个角落……",role:"maquei",clue:"直觉：此人举止训练有素，疑似便衣侦察员"},
];
export const PAX2=[
{id:0,ic:"👵",seat:"1号",name:"赵大娘",tB:"普通旅客",tA:"无异常",desc:"嗑着瓜子，爱跟人搭话，热情得很。",role:"normal"},
{id:1,ic:"👦",seat:"2号",name:"小勇",tB:"普通旅客",tA:"无异常",desc:"十五六岁，背破旧书包，一个人出门打工，眼神倔强。",role:"normal"},
{id:2,ic:"👨‍🔧",seat:"3号",name:"老李师傅",tB:"老铁路工",tA:"知情人",desc:"在路局干了三十年的老工人，沉默寡言，眼神深邃。",role:"witness",clue:"隐情：此人认识汪永革，似乎对当年的事有所了解……"},
{id:3,ic:"🧑",seat:"4号",name:"陈国梁",tB:"⚠ 可疑",tA:"人贩子！",desc:"自称小女孩的叔叔——但孩子叫他名字时，他没有反应。",role:"suspect",clue:"线索：陈国梁与女孩关系存疑，前后说辞矛盾"},
{id:4,ic:"👧",seat:"5号",name:"小云",tB:"随行儿童",tA:"被拐女童",desc:"七八岁，眼神空洞，紧抓衣角，不敢看人，安静得不像正常孩子。",role:"victim2",clue:"线索：女孩神情惊恐，与身旁男子毫无亲昵之感"},
{id:5,ic:"👩‍💼",seat:"6号",name:"王推销员",tB:"普通旅客",tA:"无异常",desc:"大包小包，热情地推销各种新奇玩意儿。",role:"normal"},
];
export const PAX3=[
{id:0,ic:"🧓",seat:"1号",name:"老瞎子",tB:"老旅客",tA:"线索人",desc:"戴黑色遮光镜，口中轻声念叨着什么，手里攥着一张已经发黄的照片……",role:"blind3",clue:"支线：老瞎子三十年来每年乘车，寻找被拐走的女儿"},
{id:1,ic:"👩‍💼",seat:"2号",name:"张秘书",tB:"普通旅客",tA:"无异常",desc:"翻看文件，偶尔接打电话，西装革履，行色匆匆。",role:"normal"},
{id:2,ic:"😄",seat:"3号",name:"贾金龙",tB:"热心站长",tA:"大毒枭！",desc:"自称是某站退休站长，热心帮老人拿行李，满脸笑意——右手腕有一道浅色的疤。",role:"jia",clue:"破绽一：皮鞋崭新锃亮，远超退休工资水平；右手腕有化学灼伤痕"},
{id:3,ic:"🧑‍🦲",seat:"4号",name:"陈助理",tB:"⚠ 可疑",tA:"联络员！",desc:"频繁看表，不时朝3号方向张望，公文包从不离身。",role:"contact",clue:"破绽二：公文包内藏有加密手写便条，与贾金龙行程高度吻合"},
{id:4,ic:"👨‍🚂",seat:"5号",name:"列车员小张",tB:"工作人员",tA:"证人！",desc:"反复经过6号座位下方，欲言又止，似乎有话想说。",role:"witness3",clue:"破绽三：6号座位下有无人认领的黑色提包，气味异常"},
{id:5,ic:"👨‍⚕️",seat:"6号",name:"医生旅客",tB:"普通旅客",tA:"无异常",desc:"闭目养神，戴着口罩，胸前挂着医院工作证。",role:"normal"},
];

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
export const PAX5 = [
  {id:0,ic:"🤖",seat:"辅助",name:"巡检机器",tB:"设备",tA:"工作",desc:"闪烁着蓝色指示灯，不知疲倦地检测着车厢安全隐患。",role:"normal"},
  {id:1,ic:"👨‍🏫",seat:"1号",name:"老警汪新",tB:"老铁路",tA:"老师傅",desc:"擦拭着警徽。眼神一如三十年前那样，只是鬓角结了霜。",role:"witness",clue:"线索：汪新眼神依旧警惕，不放过任何死角"},
  {id:2,ic:"👩‍✈️",seat:"2号",name:"马燕列车长",tB:"列车长",tA:"爱人",desc:"身穿高级列车长制服，默默地为汪新打好领带。眼神温柔体贴。",role:"mayan_ch5",clue:"线索：马燕今天给车上带了当年汪新最爱的哈尔滨红肠"},
  {id:3,ic:"👨‍🎓",seat:"3号",name:"实习警员",tB:"新学员",tA:"新星",desc:"核对着车上人数，举止略带局促，和当年的你如出一辙。",role:"normal"},
  {id:4,ic:"🎒",seat:"4号",name:"背包客",tB:"普通旅客",tA:"无异常",desc:"戴着VR眼镜，正用沉浸式视野沉浸在沿途风景中。",role:"normal"}
];

export const D={
pro1:[{sp:null,pt:null,tx:"1978年，深秋。"},{sp:null,pt:null,tx:"宁阳——哈尔滨，一列墨绿色的蒸汽客车在凌晨汽笛声中缓缓驶离站台。"},{sp:null,pt:null,tx:"月台上人声鼎沸：大件行李的碰撞、婴儿的啼哭、叫卖糖葫芦的小贩……"},{sp:"旁白",pt:"📜",tx:"22岁的汪新，穿着崭新乘警制服，第一次独自踏上巡逻路线。\n他不会知道，今天将遇见改变他一生的人……"}],
court1:[{sp:"牛大力",pt:"💪",tx:"哟！汪新！正式上岗了，紧张不紧张啊？",bg:court1Img},{sp:"汪新",pt:"🫡",tx:"紧什么张！我练了三年枪，还怕几个小毛贼？",bg:court1Img},{sp:"牛大力",pt:"💪",tx:"嘿，说正事儿——我姐夫昨天在这班车上丢了钱包，专盯口袋的扒手团伙……",bg:court1Img},{sp:"汪新",pt:"🫡",tx:"知道了。放心，我一定把人揪出来。",bg:court1Img},{sp:"牛大力",pt:"💪",tx:"行！快去吧！记住带包哈尔滨红肠回来啊——！",bg:court1Img}],
conf1:[{sp:"汪新",pt:"🫡",tx:"同志，麻烦跟我走一趟。",bg:conf1ImgV2},{sp:"嫌疑人",pt:"😤",tx:"干什么！我什么都没做！凭什么抓我！",bg:conf1ImgV2},{sp:"汪新",pt:"🫡",tx:"我亲眼目睹你将手伸进孙老爷子外兜。请到值班室配合检查。",bg:conf1ImgV2},{sp:"嫌疑人",pt:"😤",tx:"胡说！认错人了！我什么都没拿！",bg:conf1ImgV2},{sp:"汪新",pt:"🫡",tx:"（掏出证物）那这张从你内袋搜到的烟票，上面印着孙字，从哪儿来的？",bg:conf1ImgV2},{sp:"嫌疑人",pt:"😰",tx:"……我……我……",bg:conf1ImgV2}],
mishap:[{sp:"旁白",pt:"📜",tx:"就在汪新押着嫌疑人走去时，余光猛地一扫——侧门处！一道黑影靠近车厢门缝，是同伙！",bg:mishapImgV2},{sp:"汪新",pt:"🫡",tx:"（抓住侧门徘徊男子的手腕）站住！你也是他们的人！",bg:mishapImgV2},{sp:"马魁",pt:"👮",tx:"（猝不及防）哎！放开！",bg:mishapImgV2},{sp:"旁白",pt:"📜",tx:"被汪新拽住的，正是那个冷静观察车厢的中年便衣。而真正的同伙已将车厢门拉开一道缝，正要跳车！",bg:mishapImgV2}],
res_gun:[{sp:"旁白",pt:"📜",tx:"枪声骤响！逃跑的同伙两腿发软，瘫倒在门槛上。",bg:resGunImgV2},{sp:"马魁",pt:"👮",tx:"（掏出证件）哈尔滨铁路公安处，刑警马魁。这是我盯了三天的漏网之鱼——你刚才险些让他跑了。",bg:resGunImgV2},{sp:"汪新",pt:"🫡",tx:"……您是自己人？！",bg:resGunImgV2},{sp:"马魁",pt:"👮",tx:"鸣枪这个判断……还算有几分脑子。但下次动枪，先把局面看清楚。",bg:resGunImgV2}],
res_chase:[{sp:"旁白",pt:"📜",tx:"汪新猛地松开马魁，向黑影扑去！铁轨与寒风之间，他死死按住同伙——制住了！",bg:resChaseImg},{sp:"马魁",pt:"👮",tx:"（走来，亮出证件）哈尔滨铁路公安处，刑警马魁。",bg:resChaseImg},{sp:"汪新",pt:"🫡",tx:"您是便衣？对不起！我真不知道——",bg:resChaseImg},{sp:"马魁",pt:"👮",tx:"（嘴角微扬）算了。敢孤身追出去……这点胆量，还不赖。",bg:resChaseImg}],
partner:[{sp:"马魁",pt:"👮",tx:"你，哪个处的？",bg:partnerImg},{sp:"汪新",pt:"🫡",tx:"宁阳铁路公安处。汪新。",bg:partnerImg},{sp:"马魁",pt:"👮",tx:"（眼神微微一动，嘴角扯起一丝不易察觉的笑）……跟我走。下一站，有活干。",bg:partnerImg}],
pro2:[{sp:null,pt:null,tx:"1985年，初见繁华。"},{sp:null,pt:null,tx:"收音机里放着最新的流行曲，车厢里的衣着从单调的蓝黑灰变得五颜六色。"},{sp:"旁白",pt:"📜",tx:"七年过去，汪新凭借机敏与冲劲屡立奇功。\n他和马魁，已经成了宁阳铁路最默契的搭档。"}],
court2:[{sp:"马魁",pt:"👮",tx:"（严肃）接到乘务员报告，3号车厢那个带短发小女孩的男人，形迹可疑。可能涉嫌拐卖。",bg:court2ImgV2},{sp:"汪新",pt:"🫡",tx:"明白。要我过去敲山震虎吗？",bg:court2ImgV2},{sp:"马魁",pt:"👮",tx:"先别惊动。去观察。确认受害者和嫌疑人到底是谁，再收网。",bg:court2ImgV2},{sp:"汪新",pt:"🫡",tx:"好。而且刚有人来报案说钱包丢了，我顺道查查。",bg:court2ImgV2}],
conf2:[{sp:"汪新",pt:"🫡",tx:"（俯下身，轻声问女孩）小朋友，这位叔叔叫什么名字？",bg:conf2Img},{sp:"小云",pt:"😶",tx:"（沉默，眼泪慢慢涌出来）……我不知道……我要找妈妈……",bg:conf2Img},{sp:"陈国梁",pt:"😤",tx:"小孩子！瞎说什么！跟叔叔走——",bg:conf2Img},{sp:"汪新",pt:"🫡",tx:"（声音沉下去）你跟我走一趟。手放好，别乱动。",bg:conf2Img}],
res2:[{sp:"旁白",pt:"📜",tx:"马魁已在车厢连接处等候，早有部署。",bg:res2Img},{sp:"马魁",pt:"👮",tx:"人证已固定。他的同伙正在下一站等消息，我们已通知当地公安。",bg:res2Img},{sp:"汪新",pt:"🫡",tx:"小云……",bg:res2Img},{sp:"马魁",pt:"👮",tx:"孩子安全。已联系到她家里了。",bg:res2Img},{sp:"汪新",pt:"🫡",tx:"（松了口气）谢谢您……",bg:res2Img},{sp:"马魁",pt:"👮",tx:"（停顿片刻）你发现那孩子，靠的是观察，不是运气。记住这个。",bg:res2Img}],
mayan_end:[{sp:"马燕",pt:"🌸",tx:"你来了。",bg:mayanEndImg},{sp:"汪新",pt:"🫡",tx:"（有点局促）……有事找我？",bg:mayanEndImg},{sp:"马燕",pt:"🌸",tx:"（低头）我爸不让我们来往。因为你爸的事。",bg:mayanEndImg},{sp:"汪新",pt:"🫡",tx:"我知道。",bg:mayanEndImg},{sp:"马燕",pt:"🌸",tx:"（抬头，认真地看着他）那你怎么想？",bg:mayanEndImg},{sp:"汪新",pt:"🫡",tx:"……我想把事情弄清楚。不管结果怎样——你等我。",bg:mayanEndImg}],
laoli_end:[{sp:"汪新",pt:"🫡",tx:"李师傅，我父亲汪永革当年，为什么没替马魁作证？",bg:laoliEndImg},{sp:"老李",pt:"👨🔧",tx:"（沉默良久）……你得去问你父亲。但我告诉你：他不是坏人，他是……怕了。",bg:laoliEndImg},{sp:"汪新",pt:"🫡",tx:"（拳头慢慢握紧）……是怕什么？",bg:laoliEndImg},{sp:"老李",pt:"👨🔧",tx:"有人威胁他。我只知道这么多。",bg:laoliEndImg},{sp:"旁白",pt:"📜",tx:"回去的路上，汪新一直没说话。\n有些事，他必须亲自去面对。",bg:laoliEndImg}],
pro3:[{sp:null,pt:null,tx:"1993年，深秋。"},{sp:null,pt:null,tx:"改革开放已走过十五年。铁路沿线的站台越来越热闹——但某些阴影，也在悄悄蔓延。"},{sp:"旁白",pt:"📜",tx:"汪新收到情报：有人正利用宁哈铁路线秘密运毒。幕后主脑的代号，叫「金龙」。"},{sp:"旁白",pt:"📜",tx:"多年来，汪新与马魁已默契如一人。但这次，马魁在信里只写了一句话：\n「如果我出了什么事，你不能停下来。」"}],
court3:[{sp:"马燕",pt:"🌸",tx:"（匆匆赶来）汪新，情报出来了。",bg:court3Img},{sp:"汪新",pt:"🫡",tx:"说。",bg:court3Img},{sp:"马燕",pt:"🌸",tx:"金龙这次亲自押货。我的人在哈尔滨站看见他了——他伪装成退休站长，今晚就在你这趟车上。",bg:court3Img},{sp:"汪新",pt:"🫡",tx:"（停顿）你怎么知道这些？",bg:court3Img},{sp:"马燕",pt:"🌸",tx:"（淡淡地）这些年做生意，见的人多了。放心，这条线索靠得住。",bg:court3Img},{sp:"汪新",pt:"🫡",tx:"（看了她一眼）……谢谢你，马燕。",bg:court3Img}],
conf3:[{sp:"汪新",pt:"🫡",tx:"（走近贾金龙）贾站长，我是乘警，这趟车上有点情况，想请您协助一下。",bg:conf3Img},{sp:"贾金龙",pt:"😄",tx:"哟！小汪啊，有什么需要帮忙的？尽管说！",bg:conf3Img},{sp:"汪新",pt:"🫡",tx:"（眼神一沉）……我没说我姓汪。",bg:conf3Img},{sp:"贾金龙",pt:"😨",tx:"（笑容微微凝住）",bg:conf3Img},{sp:"汪新",pt:"🫡",tx:"你右手腕上的疤，是什么时候留下的？",bg:conf3Img},{sp:"贾金龙",pt:"😰",tx:"（笑容彻底消失）……",bg:conf3Img}],
res3_good:[{sp:"旁白",pt:"📜",tx:"马魁早已在车厢连接处等候，身后还有两名便衣——三面合围。",bg:res3GoodImg},{sp:"马魁",pt:"👮",tx:"贾金龙。哈尔滨铁路公安处——你被捕了。",bg:res3GoodImg},{sp:"贾金龙",pt:"😰",tx:"（看向汪新）你小子……比我想象的聪明。",bg:res3GoodImg},{sp:"汪新",pt:"🫡",tx:"（轻声）师父教的。",bg:res3GoodImg},{sp:"旁白",pt:"📜",tx:"那一夜，宁哈363次列车缓缓停靠终点站。月台的灯光下，马魁和汪新站在一起，谁都没有说话。",bg:res3GoodImg},{sp:"旁白",pt:"📜",tx:"这一次，师徒二人，全身而退。",bg:res3GoodImg}],
res3_bad:[{sp:"旁白",pt:"📜",tx:"汪新扑上去！但贾金龙早有准备——一道寒光，枪声骤响。",bg:res3BadImg},{sp:"汪新",pt:"🫡",tx:"师父！！",bg:res3BadImg},{sp:"马魁",pt:"👮",tx:"（摇摇头，声音很轻）……没事。没打中要害。去——别让他跑了。",bg:res3BadImg},{sp:"旁白",pt:"📜",tx:"后来汪新才知道：马魁中弹的地方，距离心脏不到两厘米。他在医院躺了三个月。",bg:res3BadImg},{sp:"旁白",pt:"📜",tx:"贾金龙在下一站被截获。但马魁的鬓角，此后永远添了一道疤。",bg:res3BadImg}],
res3_esc:[{sp:"旁白",pt:"📜",tx:"汪新按住不动，等待增援信号。",bg:res3EscImg},{sp:"旁白",pt:"📜",tx:"但贾金龙察觉了什么——在下一个停车站，他从容起身，随人流消失在月台。",bg:res3EscImg},{sp:"马魁",pt:"👮",tx:"（沉默片刻）他跑了。",bg:res3EscImg},{sp:"汪新",pt:"🫡",tx:"（拳头握紧）我以为……",bg:res3EscImg},{sp:"马魁",pt:"👮",tx:"（拍了拍他的肩）这次没抓到。但你活着。下次还有机会。",bg:res3EscImg},{sp:"旁白",pt:"📜",tx:"贾金龙最终在三年后于广州落网。但那是另一个故事了。",bg:res3EscImg}],
pro4:[{sp:null,pt:null,tx:"2018年。",bg:court4Img},{sp:null,pt:null,tx:"中国高铁运营里程已突破两万公里。昔日的哐当哐当，已变成平稳如飞的白色子弹。",bg:court4Img},{sp:"旁白",pt:"📜",tx:"汪新两鬓微霜，制服还是那套制服，但眼神里多了什么说不清楚的东西——",bg:court4Img},{sp:"旁白",pt:"📜",tx:"他带了一个新徒弟。这孩子跟当年的他一模一样：冲劲十足，缺少经验，满脑子都是英雄梦。",bg:court4Img}],
court4:[{sp:"小周",pt:"🧑✈️",tx:"师父！今天巡视从哪节车厢开始？",bg:court4Img},{sp:"汪新",pt:"🫡",tx:"你说呢？",bg:court4Img},{sp:"小周",pt:"🧑✈️",tx:"（思考）……从中间开始，两头巡？",bg:court4Img},{sp:"汪新",pt:"🫡",tx:"（点头）还行。记住：你有三小时去发现问题。别急。",bg:court4Img},{sp:"小周",pt:"🧑✈️",tx:"师父，您以前怎么知道谁是坏人的？",bg:court4Img},{sp:"汪新",pt:"🫡",tx:"（想了很久）……一开始不知道。但有个人，教了我怎么看。",bg:court4Img}],
epi_found:[{sp:"旁白",pt:"📜",tx:"末节车厢里，老瞎子忽然低声叫了一声——",bg:epiFoundImg},{sp:"老瞎子",pt:"🧓",tx:"……丫头？",bg:epiFoundImg},{sp:"旁白",pt:"📜",tx:"一个中年女人跑过来，紧紧抱住了他。",bg:epiFoundImg},{sp:"老瞎子",pt:"🧓",tx:"（声音颤抖）我就知道……我就知道你还在……",bg:epiFoundImg},{sp:"旁白",pt:"📜",tx:"汪新站在那里，没有上前，只是望着他们。这一幕，他等了三十年。",bg:epiFoundImg},{sp:"小周",pt:"🧑✈️",tx:"（凑过来，轻声）师父，那是……",bg:epiFoundImg},{sp:"汪新",pt:"🫡",tx:"（轻声）是个圆满的故事。",bg:epiFoundImg}],
epi_lost:[{sp:"老瞎子",pt:"🧓",tx:"（摸索着，认出了汪新）还是那个乘警小伙子……你老了。",bg:epiLostImg},{sp:"汪新",pt:"🫡",tx:"（笑了笑）您也老了。",bg:epiLostImg},{sp:"老瞎子",pt:"🧓",tx:"（摇头）找了三十年了……也许真的找不到了。",bg:epiLostImg},{sp:"汪新",pt:"🫡",tx:"（轻声）别放弃。我们一直在找。",bg:epiLostImg},{sp:"旁白",pt:"📜",tx:"列车继续向前。有些故事还没有结局——\n但人，一直在路上。",bg:epiLostImg}],
mq_end:[{sp:"旁白",pt:"📜",tx:"出站口，一个老人靠着柱子等候。",bg:mqEndImg},{sp:"汪新",pt:"🫡",tx:"（停步）……师父？",bg:mqEndImg},{sp:"马魁",pt:"👮",tx:"（比以前老了些，但眼神依然锐利）我听说你带了新徒弟。",bg:mqEndImg},{sp:"汪新",pt:"🫡",tx:"是，小周，快来见见。",bg:mqEndImg},{sp:"小周",pt:"🧑✈️",tx:"（行礼）马魁爷爷好！",bg:mqEndImg},{sp:"马魁",pt:"👮",tx:"（看了汪新一眼，又看了看小周，轻声）……还不错。",bg:mqEndImg}],
memorial:[{sp:"旁白",pt:"📜",tx:"窗外，高铁以三百公里的时速划破夜色。",bg:mqEndImg},{sp:"汪新",pt:"🫡",tx:"（望着窗外）师父……这趟车比你当年查过的那趟快多了。",bg:mqEndImg},{sp:"小周",pt:"🧑✈️",tx:"（走过来）师父？您在说什么？",bg:mqEndImg},{sp:"汪新",pt:"🫡",tx:"（轻声）没什么。小周，记住这列车——它装过很多故事。",bg:mqEndImg},{sp:"旁白",pt:"📜",tx:"哐当哐当的声音早已消失。\n但有些东西，永远留在了铁轨上。",bg:mqEndImg}],

pro5:[{sp:null,pt:null,tx:"2026年，未来已来。"},{sp:null,pt:null,tx:"智能高铁横穿华夏大地，每一趟旅程，都已化作精准的数字与效率。"},{sp:"旁白",pt:"📜",tx:"这是汪新退休前的最后一趟巡察。\\n今日马燕恰好担当列车长，与你同行。"}],
court5:[{sp:"马燕",pt:"🌸",tx:"汪总警监，今天也是巡察岗位吗？"},{sp:"汪新",pt:"🫡",tx:"习惯了。不看遍，心里不踏实。"},{sp:"马燕",pt:"🌸",tx:"跟当年一个脾气。忙完了，我们拿红肠下酒。"}],
conf5:[{sp:"汪新",pt:"🫡",tx:"一晃成历史了。不过每一里，心里清清楚楚就行啦。"}],
end5:[{sp:"旁白",pt:"📜",tx:"夕阳沉下。汪新换下制服，向铁轨深处，敬了三十多年来最舒心的一个礼。"}],
love_chat_mayan:[{sp:"马燕",pt:"🌸",tx:"（笑盈盈地）汪新，今天巡视收获如何啊？"},{sp:"汪新",pt:"🫡",tx:"挺好。重点排查了几节车厢，太平得很。"},{sp:"马燕",pt:"🌸",tx:"（微微低头）那就好……如果等下有空，我想去大院走走。"},{sp:"汪新",pt:"🫡",tx:"（笑）行，在门口等你。"}],
love_gift_success_mayan:[{sp:"马燕",pt:"🌸",tx:"（看着你递过去的礼物，惊喜）大白兔奶糖！"},{sp:"汪新",pt:"🫡",tx:"早上专门买的。你还喜欢就好。"},{sp:"马燕",pt:"🌸",tx:"（甜甜剥开一粒）喜欢！你在，味道就在！"},{sp:"旁白",pt:"📜",tx:"马燕的心情变得很开朗。❤️ 好感度大幅提升！"}]
};
