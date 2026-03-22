import { C, C2, C3, C4, C5, F, STARS, KF, PAX1, PAX2, PAX3, PAX4, ACHS, D } from "./gameData.js";
import ch1Img from "./assets/images/ch1.png";
import ch2Img from "./assets/images/ch2.png";
import ch3Img from "./assets/images/ch3.png";
import ch4Img from "./assets/images/ch4.png";

// ── Logo 增加 ──
import logoImg from "./assets/images/logo.png";

export default function GameScenes(props) {
const {scene,setScene,chapter,cc,base,SF,Grain,Scan,HUD,Toast,AchPopup,NotesOverlay,LoveOverlay,
DlgBox,PatrolScene,ChoiceScene,EndScene,bgm,
dlg,ch1done,ch2done,ch3done,ch3good,setCh3good,setCh3done,setCh1done,setCh2done,
ch3goodRef,blindRef,blindManFound,
compat,setCompat,evid,choice,setChoice,
paxDone,skillUsed,hovB,setHovB,hovChoice,setHovChoice,
transData,setTransData,achievements,
cpct,ccolor,clabel,toast,unlockAch,
reset,startCh,canGo1,canGo2,canGo3,canGo4,
ch3perfect,hasS2,hasV2,
titleView,setTitleView,saveSlots,saveMsg,
txSpeed,setTxSpeed,saveToSlot,loadFromSlot,deleteSlot,
newAchs,eraLabel,
} = props;

// ── TRANS ──
if(scene==="TRANS"&&transData){
const pal=[C,C,C2,C3,C4,C5][transData.toCh];
return(
<div style={{...base,background:"linear-gradient(180deg,"+pal.bg0+" 0%,"+pal.bg1+" 100%)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",overflow:"hidden"}} onClick={()=>{bgm.startAudio();if(transData.cb){const cb=transData.cb;setTransData(null);cb();}}}>
<style>{KF}</style>{Grain}
{SF}
<div style={{position:"absolute",bottom:"28%",left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,"+pal.gold+" 50%,transparent)"}}/>
<div style={{position:"absolute",bottom:"27.5%",left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,"+pal.border+" 50%,transparent)"}}/>
<div style={{position:"absolute",bottom:"29%",fontSize:52,animation:"trainRoll 2.2s ease-in-out both",whiteSpace:"nowrap",filter:"drop-shadow(0 4px 12px "+pal.gold+"40)"}}>
{transData.toCh===4?"🚅":transData.toCh===3?"🚄":transData.toCh===2?"🚃":"🚂"}
</div>
<div style={{textAlign:"center"}}>
<div style={{color:pal.muted,fontSize:12,letterSpacing:5,marginBottom:16,animation:"fadeUp .6s ease .3s both"}}>下一章</div>
<div style={{fontSize:"clamp(48px,12vw,88px)",fontWeight:700,color:pal.amber,letterSpacing:"0.1em",textShadow:"0 0 60px "+pal.gold+"60",animation:"yearPop .7s ease .5s both"}}>{transData.year}</div>
<div style={{color:pal.sepia,fontSize:14,letterSpacing:4,marginTop:10,animation:"fadeUp .6s ease .9s both"}}>
{["","1978 · 蒸汽机车","1985 · 内燃机车","1993 · 电力机车","2018 · 复兴号"][transData.toCh]}
</div>
</div>
<div style={{color:pal.muted,fontSize:11,letterSpacing:3,marginTop:32,animation:"pulse 2s ease 1.2s infinite"}}>点击任意处继续</div>
</div>
);
}

// ── TITLE ──
if(scene==="TITLE"){
const fmtTs=(ts)=>{if(!ts)return"";const d=new Date(ts);return d.getFullYear()+"/"+(d.getMonth()+1).toString().padStart(2,"0")+"/"+d.getDate().toString().padStart(2,"0")+" "+d.getHours().toString().padStart(2,"0")+":"+d.getMinutes().toString().padStart(2,"0");};
const fmtProg=(s)=>{if(!s)return"空槽";const done=s.ch3done?4:s.ch2done?3:s.ch1done?2:1;return"进度至第"+["","一","二","三","四"][done]+"章 · 契合度 "+Math.min(100,s.compat||40);};
const chRows=[
{ch:1,era:"1978 · 蒸汽机车",title:"第一章",sub:"不打不相识",icon:"🚂",unlocked:true,done:ch1done,pal:C},
{ch:2,era:"1985 · 内燃机车",title:"第二章",sub:"大院的秘密",icon:"🚃",unlocked:ch1done,done:ch2done,pal:C2},
{ch:3,era:"1993 · 电力机车",title:"第三章",sub:"深渊的伪装",icon:"🚄",unlocked:ch2done,done:ch3done,pal:C3},
{ch:4,era:"2018 · 复兴号",title:"第四章",sub:"薪火相传",icon:"🚅",unlocked:ch3done,done:false,pal:C4},
  {ch:5,era:"2026 · 智能高铁",title:"第五章",sub:"岁月的敬礼",icon:"🚈",unlocked:ch3done,done:false,pal:C5},
];
const Btn=(btnProps)=>(
<button onMouseEnter={()=>setHovB(btnProps.id)} onMouseLeave={()=>setHovB(null)} onTouchStart={()=>setHovB(btnProps.id)} onTouchEnd={()=>setHovB(null)} onClick={btnProps.onClick}
style={{...btnProps.style,transform:hovB===btnProps.id?"scale(1.03)":"scale(1)",transition:"all .2s ease",fontFamily:F,cursor:"pointer"}}>
{btnProps.children}
</button>
);
return(
<div style={{...base,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"16px",background:"linear-gradient(180deg,"+C.bg0+" 0%,"+C.bg1+" 50%,"+C.bg0+" 100%)"}}>
<style>{KF}</style>{Grain}{Scan}
{[0,1,2,3,4].map(i=><div key={i} style={{position:"absolute",bottom:"8%",left:(14+i*16)+"%",width:12+i*7,height:12+i*7,borderRadius:"50%",background:"radial-gradient(circle,#ffffff0d,transparent)",animation:"steam "+(2.2+i*.6)+"s ease-out "+(i*.5)+"s infinite",pointerEvents:"none"}}/>)}
<div style={{position:"absolute",bottom:"5%",left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,"+C.gold+" 50%,transparent)"}}/>
<div style={{position:"absolute",bottom:"5.5%",left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,"+C.border+" 50%,transparent)"}}/>

<div style={{textAlign:"center",marginBottom:20,zIndex:1}}>
  {/* 新增主页 LOGO 元素 */}
  <div style={{width:110,height:110,borderRadius:"50%",overflow:"hidden",margin:"0 auto 16px",boxShadow:"0 12px 30px rgba(0,0,0,0.6)",border:"2px solid "+C.gold,background:"#0A0401",animation:"fadeUp .7s ease both, glow 3s ease infinite"}}>
    <img src={logoImg} alt="logo" style={{width:"100%",height:"100%",objectFit:"cover",transform:"scale(1.05)"}}/>
  </div>
  <div style={{color:C.muted,fontSize:10,letterSpacing:5,marginBottom:14,animation:"fadeUp .8s ease .3s both"}}>◇ 1978 — 2018 · 四十年列车纪事 ◇</div>
<div style={{fontSize:"clamp(26px,7vw,52px)",fontWeight:700,letterSpacing:"0.15em",color:C.amber,textShadow:"0 0 44px "+C.gold+"50,0 2px 6px #00000080",animation:"fadeUp .9s ease .6s both, flicker 5s ease 3s infinite"}}>南来北往</div>
<div style={{fontSize:12,color:C.muted,letterSpacing:"0.5em",marginTop:4,animation:"fadeUp .8s ease .9s both"}}>列 车 纪 事</div>
</div>

<div style={{width:"100%",maxWidth:420,zIndex:1,animation:"fadeUp .6s ease 1s both"}}>
{titleView==="main"&&(
<div style={{display:"flex",flexDirection:"column",gap:10}}>
<Btn id="ng" onClick={()=>{bgm.startAudio();startCh(1);}} style={{background:"transparent",border:"1px solid "+C.gold,color:C.amber,fontSize:13,letterSpacing:"0.4em",padding:"13px 0",borderRadius:3,width:"100%",animation:"glow 2.5s ease 2s infinite"}}>开 始 新 游 戏</Btn>
<Btn id="sv" onClick={()=>setTitleView("saves")} style={{background:"linear-gradient(135deg,"+C.bg2+","+C.bg1+")",border:"1px solid "+C.borderG,color:C.sepia,fontSize:12,letterSpacing:"0.35em",padding:"11px 0",borderRadius:3,width:"100%"}}>读 取 存 档</Btn>
<Btn id="cs" onClick={()=>setTitleView("chapters")} style={{background:"linear-gradient(135deg,"+C.bg2+","+C.bg1+")",border:"1px solid "+C.borderG,color:C.sepia,fontSize:12,letterSpacing:"0.35em",padding:"11px 0",borderRadius:3,width:"100%"}}>选 择 章 节</Btn>
<Btn id="st" onClick={()=>setTitleView("settings")} style={{background:"transparent",border:"1px solid "+C.border,color:C.muted,fontSize:11,letterSpacing:"0.3em",padding:"9px 0",borderRadius:3,width:"100%"}}>设 置</Btn>
</div>
)}

{titleView==="saves"&&(
<div style={{animation:"fadeUp .3s ease"}}>
<div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
<Btn id="bk" onClick={()=>setTitleView("main")} style={{background:"transparent",border:"1px solid "+C.border,color:C.muted,fontSize:10,letterSpacing:2,padding:"5px 12px",borderRadius:2}}>← 返回</Btn>
<div style={{color:C.sepia,fontSize:12,letterSpacing:3}}>存 档 管 理</div>
</div>
{saveMsg&&<div style={{color:C.safeL,fontSize:11,textAlign:"center",marginBottom:10,animation:"drop .3s ease"}}>{saveMsg}</div>}
{[0,1,2].map(i=>{
const s=saveSlots[i];
return(
<div key={i} style={{background:"linear-gradient(135deg,"+C.bg2+","+C.bg1+")",border:"1px solid "+(s?C.borderG:C.border),borderRadius:6,padding:"12px 14px",marginBottom:9}}>
<div style={{display:"flex",alignItems:"center",gap:10}}>
<div style={{width:30,height:30,borderRadius:4,background:s?C.bg3:C.bg0,border:"1px solid "+C.border,display:"flex",alignItems:"center",justifyContent:"center",color:s?C.amber:C.dim,fontSize:13,flexShrink:0,fontWeight:700}}>{i+1}</div>
<div style={{flex:1,minWidth:0}}>
<div style={{color:s?C.cream:C.muted,fontSize:12,marginBottom:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{s?fmtProg(s):"── 空槽 ──"}</div>
{s&&<div style={{color:C.dim,fontSize:9,letterSpacing:1}}>{fmtTs(s.ts)}</div>}
</div>
<div style={{display:"flex",gap:5,flexShrink:0}}>
{s&&<button onClick={()=>{bgm.startAudio();loadFromSlot(i);}} style={{background:C.safeL+"22",border:"1px solid "+C.safeL+"45",color:C.safeL,fontSize:10,padding:"4px 9px",borderRadius:2,cursor:"pointer",fontFamily:F}}>载入</button>}
<button onClick={()=>saveToSlot(i)} style={{background:C.blueL+"18",border:"1px solid "+C.blueL+"45",color:C.blueL,fontSize:10,padding:"4px 9px",borderRadius:2,cursor:"pointer",fontFamily:F}}>存入</button>
{s&&<button onClick={()=>deleteSlot(i)} style={{background:C.dangerL+"18",border:"1px solid "+C.dangerL+"45",color:C.dangerL,fontSize:10,padding:"4px 9px",borderRadius:2,cursor:"pointer",fontFamily:F}}>删除</button>}
</div>
</div>
</div>
);
})}
<div style={{color:C.muted,fontSize:10,textAlign:"center",marginTop:6}}>章节结束时自动存入槽1</div>
</div>
)}

{titleView==="chapters"&&(
<div style={{animation:"fadeUp .3s ease"}}>
<div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
<Btn id="bkc" onClick={()=>setTitleView("main")} style={{background:"transparent",border:"1px solid "+C.border,color:C.muted,fontSize:10,letterSpacing:2,padding:"5px 12px",borderRadius:2}}>← 返回</Btn>
<div style={{color:C.sepia,fontSize:12,letterSpacing:3}}>选 择 章 节</div>
</div>
<div style={{display:"flex",flexDirection:"column",gap:9}}>
{chRows.map(row=>(
<div key={row.ch} onClick={()=>{if(!row.unlocked)return;bgm.startAudio();setTitleView("main");startCh(row.ch);}}
style={{background:row.unlocked?"linear-gradient(135deg,"+row.pal.bg2+","+row.pal.bg1+")":"linear-gradient(135deg,#060606,#040404)",border:"1px solid "+(row.unlocked?row.pal.borderG:"#1a1a1a"),borderRadius:7,padding:"13px 14px",cursor:row.unlocked?"pointer":"not-allowed",opacity:row.unlocked?1:.4,transition:"all .2s ease"}}>
<div style={{display:"flex",alignItems:"center",gap:12}}>
<span style={{fontSize:28,opacity:row.unlocked?1:.35}}>{row.icon}</span>
<div style={{flex:1}}>
<div style={{display:"flex",alignItems:"center",gap:7,marginBottom:3,flexWrap:"wrap"}}>
<span style={{color:row.pal.amber,fontSize:13,fontWeight:700}}>{row.title} · {row.sub}</span>
{row.done&&<span style={{fontSize:9,padding:"1px 5px",borderRadius:2,background:row.pal.safeL+"22",color:row.pal.safeL,border:"1px solid "+row.pal.safeL+"35"}}>✓</span>}
{!row.unlocked&&<span style={{fontSize:9,padding:"1px 5px",borderRadius:2,background:"#222",color:"#444",border:"1px solid #1a1a1a"}}>🔒</span>}
</div>
<div style={{color:row.pal.muted,fontSize:11}}>{row.era}</div>
</div>
{row.unlocked&&<span style={{color:row.pal.muted,fontSize:14}}>▶</span>}
</div>
</div>
))}
</div>
</div>
)}

{titleView==="settings"&&(
<div style={{animation:"fadeUp .3s ease"}}>
<div style={{display:"flex",alignItems:"center",gap:12,marginBottom:18}}>
<Btn id="bks" onClick={()=>setTitleView("main")} style={{background:"transparent",border:"1px solid "+C.border,color:C.muted,fontSize:10,letterSpacing:2,padding:"5px 12px",borderRadius:2}}>← 返回</Btn>
<div style={{color:C.sepia,fontSize:12,letterSpacing:3}}>设 置</div>
</div>
<div style={{background:"linear-gradient(135deg,"+C.bg2+","+C.bg1+")",border:"1px solid "+C.borderG,borderRadius:6,padding:"14px 16px",marginBottom:12}}>
<div style={{color:C.amber,fontSize:12,fontWeight:700,marginBottom:10}}>对话文字速度</div>
<div style={{display:"flex",gap:8}}>
{[{lb:"快速",ms:16},{lb:"标准",ms:38},{lb:"慢速",ms:72}].map(s=>(
<button key={s.ms} onClick={()=>setTxSpeed(s.ms)}
style={{flex:1,padding:"8px 0",background:txSpeed===s.ms?"linear-gradient(135deg,"+C.gold+"28,"+C.gold+"12)":"transparent",border:"1px solid "+(txSpeed===s.ms?C.gold+"70":C.border),borderRadius:4,color:txSpeed===s.ms?C.amber:C.muted,fontSize:12,cursor:"pointer",fontFamily:F,letterSpacing:1,transition:"all .2s ease"}}>
{s.lb}
</button>
))}
</div>
</div>
<div style={{background:"linear-gradient(135deg,"+C.bg2+","+C.bg1+")",border:"1px solid "+C.borderG,borderRadius:6,padding:"14px 16px"}}>
<div style={{color:C.amber,fontSize:12,fontWeight:700,marginBottom:10}}>成就 {Object.keys(achievements).filter(k=>achievements[k]).length}/{ACHS.length}</div>
<div style={{display:"flex",flexDirection:"column",gap:7}}>
{ACHS.map(a=>{const got=achievements[a.key];return(
<div key={a.key} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 10px",background:got?C.bg3:C.bg0,borderRadius:4,border:"1px solid "+(got?C.borderG:C.border),opacity:got?1:.5}}>
<span style={{fontSize:20}}>{a.ic}</span>
<div><div style={{color:got?C.amber:C.muted,fontSize:12,fontWeight:got?700:400}}>{got?a.name:"???"}</div><div style={{color:C.muted,fontSize:10,marginTop:1}}>{got?a.desc:"条件未达成"}</div></div>
{got&&<span style={{marginLeft:"auto",color:C.safeL,fontSize:11}}>✓</span>}
</div>
);})}
</div>
</div>
</div>
)}
</div>
<div style={{position:"absolute",bottom:"8%",color:C.muted,fontSize:10,letterSpacing:2,animation:"fadeIn 1s ease 2.5s both",zIndex:1}}>点击对话框加速 · 再次点击继续</div>
</div>
);
}

// ── CHSELECT ──
if(scene==="CHSELECT"){
const rows=[
{ch:1,era:"1978 · 蒸汽机车",title:"第一章 · 不打不相识",desc:"扒窃案，初遇马魁",icon:"🚂",unlocked:true,done:ch1done,pal:C},
{ch:2,era:"1985 · 内燃机车",title:"第二章 · 大院的秘密",desc:"打拐行动，马燕下海，父亲的谜",icon:"🚃",unlocked:ch1done,done:ch2done,pal:C2},
{ch:3,era:"1993 · 电力机车",title:"第三章 · 深渊的伪装",desc:"缉毒大案，贾金龙落网",icon:"🚄",unlocked:ch2done,done:ch3done,pal:C3},
{ch:4,era:"2018 · 复兴号",title:"第四章 · 薪火相传",desc:"新时代，带徒弟，时代落幕",icon:"🚅",unlocked:ch3done,done:false,pal:C4},
{ch:5,era:"2026 · 智能高铁",title:"第五章 · 岁月的敬礼",desc:"告别最后一班岗，传承故事",icon:"🚈",unlocked:ch3done,done:false,pal:C5},
];
return(
<div style={{...base,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px 16px",background:"linear-gradient(180deg,"+C.bg0+" 0%,"+C.bg1+" 50%,"+C.bg0+" 100%)"}}>
<style>{KF}</style>{Grain}{Scan}{SF}
<div style={{position:"relative",zIndex:1,textAlign:"center",maxWidth:520,width:"100%"}}>
<div style={{color:C.muted,fontSize:10,letterSpacing:6,marginBottom:14}}>选择章节</div>
<div style={{fontSize:20,fontWeight:700,color:C.amber,letterSpacing:4,marginBottom:8}}>南来北往 · 列车纪事</div>
<div style={{width:64,height:1,background:"linear-gradient(90deg,transparent,"+C.gold+",transparent)",margin:"0 auto 24px"}}/>
<div style={{display:"flex",flexDirection:"column",gap:11}}>
{rows.map(row=>(
<div key={row.ch} onClick={()=>{if(!row.unlocked)return;startCh(row.ch);}}
style={{background:row.unlocked?"linear-gradient(135deg,"+row.pal.bg2+","+row.pal.bg1+")":"linear-gradient(135deg,#070707,#050505)",border:"1px solid "+(row.unlocked?row.pal.borderG:"#181818"),borderRadius:8,padding:"14px 18px",cursor:row.unlocked?"pointer":"not-allowed",opacity:row.unlocked?1:.38,transition:"all .2s ease",animation:row.unlocked?"unlock .4s ease":"none"}}>
<div style={{display:"flex",alignItems:"center",gap:14}}>
<span style={{fontSize:32,opacity:row.unlocked?1:.35}}>{row.icon}</span>
<div style={{flex:1,textAlign:"left"}}>
<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4,flexWrap:"wrap"}}>
<span style={{color:row.pal.amber,fontSize:13,fontWeight:700}}>{row.title}</span>
{row.done&&<span style={{fontSize:9,padding:"2px 6px",borderRadius:2,background:row.pal.safeL+"22",color:row.pal.safeL,border:"1px solid "+row.pal.safeL+"38"}}>✓ 已通关</span>}
{!row.unlocked&&<span style={{fontSize:9,padding:"2px 6px",borderRadius:2,background:"#222",color:"#505050",border:"1px solid #1a1a1a"}}>🔒 未解锁</span>}
</div>
<div style={{color:row.pal.muted,fontSize:11,marginBottom:2}}>{row.era}</div>
<div style={{color:row.pal.sepia,fontSize:11}}>{row.desc}</div>
</div>
{row.unlocked&&<span style={{color:row.pal.muted,fontSize:15}}>▶</span>}
</div>
</div>
))}
</div>
<button onClick={reset} style={{marginTop:20,background:"transparent",border:"1px solid "+C.border,color:C.muted,fontSize:11,letterSpacing:3,padding:"9px 24px",borderRadius:3,cursor:"pointer",fontFamily:F}}>返 回 标 题</button>
</div>
</div>
);
}

// ── Cutscenes ──
const cuts={
PRO1:{icon:"🚂",sub:"序章 · 1978年深秋",shake:true,bg:ch1Img},PRO2:{icon:"🚃",sub:"序章 · 1985年初夏",bg:ch2Img},
PRO3:{icon:"🚄",sub:"序章 · 1993年深秋",bg:ch3Img},PRO4:{icon:"🚅",sub:"序章 · 2018年",bg:ch4Img},
COURT1:{icon:"🏘️",sub:"铁路大院 · 出发前夕",bg:ch1Img},COURT2:{icon:"🏘️",sub:"铁路大院 · 马燕的小摊",bg:ch2Img},
COURT3:{icon:"🏘️",sub:"铁路大院 · 马燕的情报",bg:ch3Img},COURT4:{icon:"🏘️",sub:"铁路大院 · 出发前",bg:ch4Img},
CONF1:{icon:"⚖",sub:"对峙 · 第五节车厢"},CONF2:{icon:"⚖",sub:"对峙 · 第五节车厢"},
CONF3:{icon:"⚖",sub:"摊牌 · 第三节车厢"},MISHAP:{icon:"⚡",sub:"意外 · 误判"},
RES1_GUN:{icon:"🔫",sub:"枪声"},RES1_CHS:{icon:"🏃",sub:"奋力追捕"},PARTNER:{icon:"🤝",sub:"不打不相识"},
RES2:{icon:"👧",sub:"孩子得救了"},MAYAN:{icon:"🌸",sub:"大院门口"},LAOLI:{icon:"👨🔧",sub:"老李师傅"},
RES3_GOOD:{icon:"🌙",sub:"师徒全身而退"},RES3_BAD:{icon:"🩸",sub:"危险的代价"},RES3_ESC:{icon:"🌫",sub:"贾金龙逃脱"},
EPI_FOUND:{icon:"🧓",sub:"三十年"},EPI_LOST:{icon:"🧓",sub:"三十年"},
MQ_END:{icon:"🤝",sub:"出站口"},MEMORIAL:{icon:"🚅",sub:"窗外"},
};
if(cuts[scene]){
const ct=cuts[scene];
return(
<div style={{...base,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
<style>{KF}</style>{Grain}{Scan}{HUD}{Toast}{AchPopup}
{ct.bg && <div style={{position:"absolute",inset:0,backgroundImage:`url(${ct.bg})`,backgroundSize:"cover",backgroundPosition:"center",opacity:0.3,maskImage:"radial-gradient(ellipse at 50% 50%, black 40%, transparent 85%)",WebkitMaskImage:"radial-gradient(ellipse at 50% 50%, black 40%, transparent 85%)",animation:"fadeIn 1.5s ease"}}/>}
{["PARTNER","PRO1","PRO2","PRO3","PRO4","MQ_END","MEMORIAL","EPI_FOUND","EPI_LOST"].includes(scene)&&SF}
<div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 45%,"+cc.bg2+"25 0%,"+cc.bg0+" 65%)"}}/>
<div style={{position:"absolute",top:44,left:"50%",transform:"translateX(-50%)",color:cc.muted,fontSize:11,letterSpacing:5,whiteSpace:"nowrap"}}>◈ {ct.sub} ◈</div>
{!ct.bg && <div style={{fontSize:72,opacity:.10,userSelect:"none",marginBottom:120,animation:ct.shake?"shake .14s linear infinite":"none"}}>{ct.icon}</div>}
<DlgBox/>
</div>
);
}

// ── Patrols ──
if(scene==="PATROL1")return (<PatrolScene pax={PAX1} canGo={canGo1} showSkill={false} ch={1} onProceed={()=>{setScene("CONF1");dlg.start(D.conf1,()=>setScene("MISHAP"));}}/>);
if(scene==="PATROL2")return (<PatrolScene pax={PAX2} canGo={canGo2} showSkill={true}  ch={2} onProceed={()=>{setScene("CONF2");dlg.start(D.conf2,()=>setScene("RES2"));}}/>);
if(scene==="PATROL3")return (<PatrolScene pax={PAX3} canGo={canGo3} showSkill={false} ch={3} onProceed={()=>{setScene("CONF3");}}/>);
if(scene==="PATROL4")return (<PatrolScene pax={PAX4} canGo={canGo4} showSkill={false} ch={4} onProceed={()=>{blindRef.current?setScene("EPI_FOUND"):setScene("EPI_LOST");}}/>);

// ── Choice 1 ──
if(scene==="CHOICE1")return(<ChoiceScene icon="🚪" accent={C.amber}
desc={"逃跑的同伙将车厢门拉开一条缝——寒风呼啸，他正要纵身跳车！<br/><span style='color:"+C.amber+"'>汪新必须在这一瞬间，做出选择。</span>"}
opts={[
{id:"gun",ic:"🔫",lb:"鸣枪示警",ds:"朝天鸣枪，以枪声震慑逃犯就地制服",tag:"稳妥",tc:C.amber,preview:"契合度 −10 · 马魁认为你过于冒进\n但认可你的冷静",previewColor:C.amber,onClick:()=>{setChoice("gun");setCompat(c=>Math.max(0,Math.min(100,c-10)));unlockAch("fast_gun");toast("【契合度 −10】马魁认为你过于冒进",C.amber);setTimeout(()=>{setScene("RES1_GUN");dlg.start(D.res_gun,()=>setScene("PARTNER"));},500);}},
{id:"chase",ic:"🏃",lb:"奋力追捕",ds:"放开马魁，孤身冲出徒手追击",tag:"果断",tc:C.safeL,preview:"契合度 +15 · 马魁赞赏你的血性\n初始印象大幅提升",previewColor:C.safeL,onClick:()=>{setChoice("chase");setCompat(c=>Math.max(0,Math.min(100,c+15)));unlockAch("brave_chase");toast("【契合度 +15】马魁赞赏你的魄力",C.safeL);setTimeout(()=>{setScene("RES1_CHS");dlg.start(D.res_chase,()=>setScene("PARTNER"));},500);}},
]}
/>);

// ── Choice 2 ──
if(scene==="CHOICE2")return(<ChoiceScene icon="💌" accent={C2.amber}
desc={"案件告破，天色将黑。汪新口袋里揣着马燕下午塞来的字条：<br/><span style='color:#E898C0'>「忙完了来大院门口找我。——燕」</span>"}
opts={[
{id:"mayan",ic:"🌸",lb:"去见马燕",ds:"赴约，听她说那些一直没说出口的话",tag:"情感",tc:"#E898C0",preview:"契合度 +8 · 马燕羁绊加深\n第三章获得马燕情报线",previewColor:"#E898C0",onClick:()=>{setChoice("mayan");setCompat(c=>Math.max(0,Math.min(100,c+8)));toast("【契合度 +8】马燕对你多了几分笃定","#E898C0");setTimeout(()=>{setScene("MAYAN");dlg.start(D.mayan_end,()=>{setCh2done(true);setScene("END2");});},500);}},
{id:"laoli",ic:"👨🔧",lb:"找老李师傅",ds:"追查父亲当年的秘密，向马魁靠拢",tag:"破案",tc:C2.amber,preview:"契合度 +12 · 马魁信任加深\n解锁汪永革线索",previewColor:C2.amber,onClick:()=>{setChoice("laoli");setCompat(c=>Math.max(0,Math.min(100,c+12)));toast("【契合度 +12】马魁对你的信任加深了",C2.amber);setTimeout(()=>{setScene("LAOLI");dlg.start(D.laoli_end,()=>{setCh2done(true);setScene("END2");});},500);}},
]}
/>);

// ── Choice 3 ──
if(scene==="CHOICE3"){
const numClues=["jia","contact","witness3"].filter(r=>paxDone.some(id=>PAX3.find(p=>p.id===id)?.role===r)).length;
return(<ChoiceScene icon="🎯" accent={C3.dangerL}
desc={"贾金龙已经察觉了汪新的注视——时间窗口即将关闭。<br/><span style='color:"+C3.dangerL+"'>此刻手中的证据，决定了较量的结局。</span><br/><span style='color:"+C3.amber+"'>已收集破绽："+numClues+"/3</span>"}
opts={[
{id:"arrest",ic:"⚑",lb:"立即逮捕",ds:ch3perfect?"证据充分，师父已就位，正面合围！":"证据不足——这个选择存在风险",tag:ch3perfect?"完美时机":"有风险",tc:ch3perfect?C3.safeL:C3.dangerL,preview:ch3perfect?"契合度 +20 · 师徒全身而退\n达成完美结局 ⭐":"契合度 −15 · 证据不足局面失控\n马魁可能负伤",previewColor:ch3perfect?C3.safeL:C3.dangerL,onClick:()=>{
if(ch3perfect){setChoice("arrest_good");setCompat(c=>Math.max(0,Math.min(100,c+20)));setCh3good(true);unlockAch("perfect3");toast("【契合度 +20】完美合围！师徒全身而退",C3.safeL);setTimeout(()=>{setScene("RES3_GOOD");dlg.start(D.res3_good,()=>{setCh3done(true);setCh3good(true);setScene("END3");});},500);}
else{setChoice("arrest_bad");setCompat(c=>Math.max(0,Math.min(100,c-15)));toast("【契合度 −15】证据不足，局面失控！",C3.dangerL);setTimeout(()=>{setScene("RES3_BAD");dlg.start(D.res3_bad,()=>{setCh3done(true);setCh3good(false);setScene("END3");});},500);}
}},
{id:"wait",ic:"⏸",lb:"按兵不动",ds:"等待增援，确保己方安全——但贾金龙可能脱逃",tag:"稳健",tc:C3.amber,preview:"契合度 +5 · 马魁认可你的谨慎\n贾金龙三年后在广州落网",previewColor:C3.amber,onClick:()=>{setChoice("wait");setCompat(c=>Math.max(0,Math.min(100,c+5)));toast("【契合度 +5】马魁认可你的谨慎",C3.amber);setTimeout(()=>{setScene("RES3_ESC");dlg.start(D.res3_esc,()=>{setCh3done(true);setCh3good(false);setScene("END3");});},500);}},
]}
/>);
}

// ── End Screens ──
if(scene==="END1")return(<EndScene chNum={1} chTitle="不打不相识"
subTitle={choice==="gun"?"🔫 鸣枪示警":"🏃 奋力追捕"}
chText={cpct>=55?"马魁对你留下了良好的第一印象。第二章中他将更愿意使用技能协助你。":"马魁认为你判断仍有欠缺。第二章需要更稳重的表现，才能获得他的技能支持。"}
nextLabel="继 续 第 二 章 ▶" onNext={()=>{setCh1done(true);setScene("CHSELECT");}}
/>);

if(scene==="END2")return(<EndScene chNum={2} chTitle={choice==="mayan"?"你等我":"有人威胁他"}
subTitle={choice==="mayan"?"🌸 赴马燕之约":"👨🔧 追查父亲秘密"}
chText={choice==="mayan"?"马燕的情报网将在第三章为你提供关键帮助——她，一直是你最可靠的后盾。":"汪永革当年受到了威胁……这条线索将在第三章与贾金龙案产生联系。"}
nextLabel="继 续 第 三 章 ▶" onNext={()=>setScene("CHSELECT")}
extra={skillUsed&&<div style={{marginTop:8,padding:"6px 9px",background:C2.blue+"18",border:"1px solid "+C2.blue+"35",borderRadius:3,color:C2.blueL,fontSize:11}}>✦ 使用了马魁技能：老刑警之眼</div>}
/>);

if(scene==="END3")return(<EndScene chNum={3} chTitle={ch3good?"师徒全身而退":choice==="wait"?"贾金龙暂时脱逃":"代价"}
subTitle={choice==="arrest_good"?"⚑ 完美合围":choice==="arrest_bad"?"⚑ 冒险出击（马魁负伤）":"⏸ 按兵不动"}
chText={ch3good?"三处破绽、一次完美合围——贾金龙在终点站落网。这是一次教科书级别的逮捕。":choice==="wait"?"贾金龙暂时逃脱，但三年后在广州落网。马魁说：活着，就有下次机会。":"证据不足，马魁负伤保护了汪新。他在医院躺了三个月，但贾金龙最终没有逃脱。"}
nextLabel="继 续 第 四 章 ▶" onNext={()=>setScene("CHSELECT")}
extra={<div style={{marginTop:8,padding:"7px 10px",background:C3.danger+"18",border:"1px solid "+C3.danger+"35",borderRadius:3,color:ch3good?C3.safeL:C3.dangerL,fontSize:11}}>{ch3good?"⭐ 完美结局：师徒全身而退":choice==="wait"?"▲ 贾金龙三年后落网":"▲ 马魁因此负伤，提前退休"}</div>}
/>);

// ── END 4 ──
if(scene==="END4"){
const achList=Object.keys(achievements).filter(k=>achievements[k]);
return(
<div style={{...base,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"20px 16px",background:"linear-gradient(180deg,"+C4.bg0+" 0%,"+C4.bg1+" 50%,"+C4.bg0+" 100%)"}}>
<style>{KF}</style>{Grain}{Scan}{SF}{AchPopup}
<div style={{position:"absolute",top:"35%",left:"50%",transform:"translate(-50%,-50%)",width:460,height:460,borderRadius:"50%",pointerEvents:"none",background:"radial-gradient(circle,"+C4.gold+"12 0%,transparent 70%)"}}/>
<div style={{position:"relative",zIndex:1,textAlign:"center",maxWidth:520,width:"100%",animation:"fadeUp .8s ease"}}>
<div style={{color:C4.muted,fontSize:10,letterSpacing:6,marginBottom:12}}>第四章 · 完 · 全剧终</div>
<div style={{fontSize:"clamp(17px,4.5vw,28px)",fontWeight:700,color:C4.amber,letterSpacing:4,marginBottom:8,textShadow:"0 0 26px "+C4.gold+"38"}}>薪 火 相 传</div>
<div style={{width:72,height:1,margin:"11px auto 22px",background:"linear-gradient(90deg,transparent,"+C4.gold+",transparent)"}}/>
<div style={{background:"linear-gradient(135deg,"+C4.bg2+","+C4.bg1+")",border:"1px solid "+C4.borderG,borderRadius:8,padding:"20px 22px",marginBottom:18,textAlign:"left"}}>
<div style={{color:C4.muted,fontSize:10,letterSpacing:4,marginBottom:16,textAlign:"center"}}>── 四 十 年 · 终 章 结 算 ──</div>
<div style={{marginBottom:16}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{color:C4.sepia,fontSize:12}}>师徒契合度</span><span style={{color:ccolor,fontSize:12}}>{clabel}（{cpct}/100）</span></div>
<div style={{height:6,background:C4.bg0,borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:cpct+"%",borderRadius:3,transition:"width 1.4s ease .3s",background:"linear-gradient(90deg,"+ccolor+"75,"+ccolor+")"}}/></div>
</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
{[
{lb:"缉毒结局",val:ch3good?"⭐ 完美结局":"▲ 遗憾结局",col:ch3good?C4.safeL:C4.amber},
{lb:"老瞎子",val:blindManFound?"🎉 找到女儿":"😔 仍在寻找",col:blindManFound?C4.safeL:C4.muted},
{lb:"马魁",val:ch3good?"平安退休":"带伤退休",col:ch3good?C4.safeL:C4.amber},
{lb:"师徒传承",val:"✓ 薪火相传",col:C4.safeL},
].map((r,i)=>(
<div key={i} style={{padding:"9px 11px",background:C4.bg3,borderRadius:4,border:"1px solid "+C4.border}}>
<div style={{color:C4.muted,fontSize:9,letterSpacing:1,marginBottom:3}}>{r.lb}</div>
<div style={{color:r.col,fontSize:12,fontWeight:700}}>{r.val}</div>
</div>
))}
</div>
{achList.length>0&&(
<div style={{borderTop:"1px solid "+C4.border,paddingTop:12}}>
<div style={{color:C4.muted,fontSize:10,letterSpacing:3,marginBottom:9}}>全局成就 {achList.length}/{ACHS.length}</div>
<div style={{display:"flex",flexWrap:"wrap",gap:6}}>
{ACHS.map(a=>(
<div key={a.key} title={a.name+": "+a.desc} style={{padding:"4px 9px",borderRadius:3,background:achievements[a.key]?C4.amber+"22":C4.bg0,border:"1px solid "+(achievements[a.key]?C4.amber+"50":C4.border),color:achievements[a.key]?C4.amber:C4.dim,fontSize:12,cursor:"help",opacity:achievements[a.key]?1:.4}}>
{a.ic} {achievements[a.key]?a.name:"???"}
</div>
))}
</div>
</div>
)}
</div>
<div style={{color:C4.sepia,fontSize:13,lineHeight:2,padding:"16px 18px",marginBottom:22,background:C4.bg2,borderRadius:6,border:"1px solid "+C4.border,borderLeft:"3px solid "+C4.amber}}>
哐当哐当的声音消失了。<br/>但有些东西，永远留在了铁轨上。<br/>
<span style={{color:C4.amber}}>——汪新，乘警，1978—2018</span>
</div>
<div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
<button onClick={reset} onMouseEnter={()=>setHovB("r")} onMouseLeave={()=>setHovB(null)} style={{background:"linear-gradient(135deg,"+C4.gold+"20,"+C4.gold+"0A)",border:"1px solid "+C4.gold+"65",color:C4.amber,fontSize:12,letterSpacing:4,padding:"12px 36px",borderRadius:3,cursor:"pointer",fontFamily:F,transform:hovB==="r"?"scale(1.04)":"scale(1)",transition:"transform .2s ease",animation:"glow 2.5s ease infinite"}}>再 次 启 程</button>
</div>
</div>
</div>
);
}

return null;
}
