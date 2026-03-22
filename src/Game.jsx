import { useState, useEffect, useRef, useCallback } from "react";
import { C, C2, C3, C4, F, STARS, GRAIN_SVG_URL, KF, PAX1, PAX2, PAX3, PAX4, ACHS, D } from "./gameData.js";
import GameScenes from "./GameScenes.jsx";

// ── Procedural BGM & Ambience Controller ──
function useBGM(chapter, scene) {
  const ctxRef = useRef(null);
  const nodesRef = useRef([]);
  const [muted, setMuted] = useState(true);

  // Restart audio setup on user interaction
  const startAudio = () => {
    if (ctxRef.current) return;
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    ctxRef.current = ctx;

    // ── 1. Train Tracks Rumble (Procedural Noise) ──
    const bufferSize = 2 * ctx.sampleRate,
      noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate),
      output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) { output[i] = Math.random() * 2 - 1; }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer; noise.loop = true;

    const filter = ctx.createBiquadFilter(); filter.type = "lowpass"; filter.frequency.value = 80;
    const noiseGain = ctx.createGain(); noiseGain.gain.value = 0.08;

    // Rhythmic pulse for "Click-Clack"
    const pulse = ctx.createGain();
    setInterval(() => {
      const now = ctx.currentTime;
      pulse.gain.setValueAtTime(0.3, now);
      pulse.gain.linearRampToValueAtTime(1.0, now + 0.08);
      pulse.gain.linearRampToValueAtTime(0.3, now + 0.16);
      pulse.gain.linearRampToValueAtTime(0.7, now + 0.40);
      pulse.gain.linearRampToValueAtTime(0.3, now + 0.48);
    }, 1200);

    noise.connect(filter).connect(pulse).connect(noiseGain).connect(ctx.destination);
    noise.start();

    // ── 2. Cinematic Saturated Synth Pad Chords ──
    const filterNode = ctx.createBiquadFilter(); filterNode.type = "lowpass"; filterNode.frequency.value = 280; // warm deep saturation
    const masterGain = ctx.createGain(); masterGain.gain.value = 0.15;
    
    // Add saturated delays
    const delay = ctx.createDelay(); delay.delayTime.value = 0.4;
    const dGain = ctx.createGain(); dGain.gain.value = 0.25;
    filterNode.connect(delay).connect(dGain).connect(filterNode); // feedback loop
    
    filterNode.connect(masterGain).connect(ctx.destination);

    const playChords = (freqs) => {
      nodesRef.current.forEach(n => { try { n.stop(); } catch(e){} });
      nodesRef.current = [];
      freqs.forEach(f => {
        // Detuned dense synth layer
        const osc1 = ctx.createOscillator(); osc1.type = "sawtooth"; osc1.frequency.value = f;
        const osc2 = ctx.createOscillator(); osc2.type = "sawtooth"; osc2.frequency.value = f + 0.9; // detune
        const osc3 = ctx.createOscillator(); osc3.type = "triangle"; osc3.frequency.value = f / 2; // sub bass

        const oGain = ctx.createGain(); oGain.gain.value = 0;
        osc1.connect(filterNode).connect(oGain);
        osc2.connect(filterNode).connect(oGain);
        osc3.connect(filterNode).connect(oGain);

        osc1.start(); osc2.start(); osc3.start();
        nodesRef.current.push(osc1, osc2, osc3);
        oGain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 3);
      });
    };

    // Store chord routine
    ctx.playChords = playChords;
    ctx.masterGain = masterGain;
    setMuted(false);
  };

  useEffect(() => {
    if (!ctxRef.current || muted) return;
    const chords = {
      1: [130.81, 155.56, 196.00], // C Minor ambient ( Nostalgic)
      2: [174.61, 220.00, 261.63], // F Major ( Warm inside 80s)
      3: [146.83, 174.61, 220.00], // D Minor suspense ( 90s tension)
      4: [196.00, 246.94, 293.66], // G Major Modern ( Futuristic flat)
    };
    if (ctxRef.current.playChords) {
      if (["TITLE", "CHSELECT"].includes(scene)) ctxRef.current.playChords([130.81, 164.81, 196.00]);
      else ctxRef.current.playChords(chords[chapter] || chords[1]);
    }
  }, [chapter, scene, muted]);

  const toggleMuted = () => {
    if (!ctxRef.current) { startAudio(); return; }
    if (muted) { ctxRef.current.masterGain.gain.linearRampToValueAtTime(0.12, ctxRef.current.currentTime + 0.5); setMuted(false); }
    else { ctxRef.current.masterGain.gain.linearRampToValueAtTime(0, ctxRef.current.currentTime + 0.5); setMuted(true); }
  };

  return { muted, toggleMuted, startAudio };
}

// ── useDlg hook ──
function useDlg(speedRef) {
  const [lines, setLines] = useState([]); const [idx, setIdx] = useState(0); const [txt, setTxt] = useState(""); const [typing, setTyping] = useState(false);
  const cbRef = useRef(null); const twRef = useRef(null); const usedRef = useRef("");
  const start = useCallback((ls, cb) => { cbRef.current = cb || null; setLines(ls); setIdx(0); setTxt(""); setTyping(true); }, []);
  useEffect(() => {
    if (!lines.length || idx >= lines.length) return;
    const full = lines[idx].tx; setTxt(""); setTyping(true); let i = 0; clearInterval(twRef.current);
    const ms = speedRef ? speedRef.current : 38;
    twRef.current = setInterval(() => { i++; setTxt(full.slice(0, i)); if (i >= full.length) { clearInterval(twRef.current); setTyping(false); } }, ms);
    return () => clearInterval(twRef.current);
  }, [lines, idx, speedRef]);
  const advance = useCallback(() => {
    if (typing) { clearInterval(twRef.current); if (lines[idx]) setTxt(lines[idx].tx); setTyping(false); return; }
    if (idx < lines.length - 1) { setIdx(n => n + 1); }
    else { setLines([]); setIdx(0); const cb = cbRef.current; cbRef.current = null; if (cb) cb(); }
  }, [typing, idx, lines]);
  return { lines, idx, txt, typing, start, advance, usedRef };
}

// ── 头像 Map 增加 ──
import avaWang from "./assets/images/avatars/wang.png";
import avaMa from "./assets/images/avatars/ma.png";
import avaYan from "./assets/images/avatars/yan.png";
import avaDali from "./assets/images/avatars/dali.png";
import avaJia from "./assets/images/avatars/jia.png";
import avaBlind from "./assets/images/avatars/blind_man.png";
import avaZhou from "./assets/images/avatars/zhou.png";
import avaYun from "./assets/images/avatars/yun.png";
import avaSuspect from "./assets/images/avatars/suspect.png";
import avaLi from "./assets/images/avatars/li.png";

const AVATAR_MAP = {
  "汪新": avaWang, "马魁": avaMa, "马燕": avaYan, "牛大力": avaDali,
  "贾金龙": avaJia, "老瞎子": avaBlind, "小周": avaZhou, "小云": avaYun,
  "嫌疑人": avaSuspect, "陈国梁": avaSuspect, "老李": avaLi
};

// ══════════════════════════════════════
export default function Game() {
  const [scene, setScene] = useState("TITLE");
  const [chapter, setChapter] = useState(1);
  const bgm = useBGM(chapter, scene);
  const [ch1done, setCh1done] = useState(false);
  const [ch2done, setCh2done] = useState(false);
  const [ch3done, setCh3done] = useState(false);
  const [ch3good, setCh3good] = useState(false);
  const [blindManFound, setBlindManFound] = useState(false);
  const [compat, setCompat] = useState(40);
  const [ap, setAp] = useState(10); // 汪新行动力系统 (AP)
  const [evid, setEvid] = useState([]);
  const [choice, setChoice] = useState(null);
  const [notif, setNotif] = useState(null);
  const [paxDone, setPaxDone] = useState([]);
  const [skillUsed, setSkillUsed] = useState(false);
  const [hovP, setHovP] = useState(null);
  const [hovB, setHovB] = useState(null);
  const [item, setItem] = useState(null);
  const [titleView, setTitleView] = useState("main");
  const [saveSlots, setSaveSlots] = useState([null, null, null]);
  const [saveMsg, setSaveMsg] = useState("");
  const [txSpeed, setTxSpeed] = useState(38);
  const [showNotes, setShowNotes] = useState(false);
  const [showLove, setShowLove] = useState(false);
  const [love, setLove] = useState({ "马燕": 40, "牛大力": 30, "老瞎子": 25 });
  const [inventory, setInventory] = useState(["大白兔奶糖"]);
  const [hovChoice, setHovChoice] = useState(null);
  const [transData, setTransData] = useState(null);
  const [achievements, setAchievements] = useState({});
  const [newAchs, setNewAchs] = useState([]);

  const speedRef = useRef(38);
  const dlg = useDlg(speedRef);
  const ch3goodRef = useRef(false);
  const blindRef = useRef(false);
  useEffect(() => { ch3goodRef.current = ch3good; }, [ch3good]);
  useEffect(() => { blindRef.current = blindManFound; }, [blindManFound]);
  useEffect(() => { speedRef.current = txSpeed; }, [txSpeed]);

  const unlockAch = (key) => {
    setAchievements(a => {
      if (a[key]) return a;
      const next = { ...a, [key]: true };
      const def = ACHS.find(x => x.key === key);
      if (def) setNewAchs(prev => [...prev, def]);
      return next;
    });
  };
  useEffect(() => { if (!newAchs.length) return; const t = setTimeout(() => setNewAchs([]), 3500); return () => clearTimeout(t); }, [newAchs]);

  const transTo = (ch, cb) => { setTransData({ toCh: ch, year: { 1: 1978, 2: 1985, 3: 1993, 4: 2018 }[ch], cb }); setScene("TRANS"); };

  const cc = chapter === 1 ? C : chapter === 2 ? C2 : chapter === 3 ? C3 : C4;

  useEffect(() => {
    if (dlg.usedRef.current === scene) return;
    const map = {
      COURT1: [D.court1, () => setScene("PATROL1")],
      COURT2: [D.court2, () => setScene("PATROL2")],
      COURT3: [D.court3, () => setScene("PATROL3")],
      COURT4: [D.court4, () => setScene("PATROL4")],
      MISHAP: [D.mishap, () => setScene("CHOICE1")],
      PARTNER: [D.partner, () => { setCh1done(true); setScene("END1"); }],
      RES2: [D.res2, () => setScene("CHOICE2")],
      CONF3: [D.conf3, () => setScene("CHOICE3")],
      EPI_FOUND: [D.epi_found, () => { ch3goodRef.current ? setScene("MQ_END") : setScene("MEMORIAL"); }],
      EPI_LOST: [D.epi_lost, () => { ch3goodRef.current ? setScene("MQ_END") : setScene("MEMORIAL"); }],
      MQ_END: [D.mq_end, () => setScene("END4")],
      MEMORIAL: [D.memorial, () => setScene("END4")],
    };
    if (map[scene]) { dlg.usedRef.current = scene; dlg.start(...map[scene]); }
  }, [scene, dlg]);

  useEffect(() => { if (!notif) return; const t = setTimeout(() => setNotif(null), 3200); return () => clearTimeout(t); }, [notif]);
  const toast = (tx, color) => setNotif({ tx, color: color || cc.amber });

  const paxClick = (p) => {
    if (paxDone.includes(p.id)) return;
    if (ap <= 0) { toast("💡 行动力不足！需前往车厢末端触发契机。", cc.dangerL); return; }
    setPaxDone(prev => [...prev, p.id]);
    setAp(a => Math.max(0, a - 1)); // 扣除1点行动力
    const isKey = ["suspect", "victim2", "jia", "contact", "witness3", "blind3", "witness"].includes(p.role);
    if (isKey && p.clue) { setEvid(e => { const n = [...e, p.clue]; if (n.length >= 4) unlockAch("all_clues"); return n; }); }
    if (p.role === "suspect" || p.role === "victim2") { toast("🔍 " + p.clue, cc.dangerL); }
    else if (p.role === "jia" || p.role === "contact" || p.role === "witness3") { toast("🔍 " + p.clue, cc.dangerL); }
    else if (p.role === "blind3" || p.role === "witness") { toast("📖 " + p.clue, cc.blueL); }
    else if (p.role === "maquei") { if (p.clue) setEvid(e => [...e, p.clue]); toast("👁 " + p.clue, cc.blueL); }
    else if (p.role === "victim") toast("⚠ 此人财物正面临威胁！", cc.amber);
    else if (p.role === "apprentice") { if (p.clue) setEvid(e => [...e, p.clue]); toast("🎓 " + p.clue, cc.blueL); }
    else if (p.role === "blind4") toast(blindRef.current ? "🧓 老瞎子攥着那张照片，嘴角颤抖……" : "🧓 老瞎子轻声说：「还没找到……找了三十年了……」", cc.sepia);
    else toast("✓ " + p.name + "：未发现异常", cc.muted);
  };

  const canGo1 = paxDone.some(id => PAX1.find(p => p.id === id)?.role === "suspect");
  const hasS2 = paxDone.some(id => PAX2.find(p => p.id === id)?.role === "suspect");
  const hasV2 = paxDone.some(id => PAX2.find(p => p.id === id)?.role === "victim2");
  const canGo2 = skillUsed || (hasS2 && hasV2);
  const canGo3 = paxDone.some(id => PAX3.find(p => p.id === id)?.role === "jia");
  const ch3perfect = ["jia", "contact", "witness3"].every(r => paxDone.some(id => PAX3.find(p => p.id === id)?.role === r));
  const canGo4 = paxDone.some(id => PAX4.find(p => p.id === id)?.role === "apprentice");

  const useSkill = (paxList) => {
    if (compat < 15) { toast("契合度不足，马魁拒绝出手！", cc.dangerL); return; }
    setCompat(c => Math.max(0, c - 10)); setSkillUsed(true);
    const keyRoles = ["suspect", "victim2", "jia", "contact", "witness3"];
    const ids = paxList.filter(p => keyRoles.includes(p.role)).map(p => p.id);
    const clues = paxList.filter(p => keyRoles.includes(p.role) && p.clue).map(p => p.clue);
    setPaxDone(prev => [...new Set([...prev, ...ids])]);
    setEvid(e => [...new Set([...e, ...clues])]);
    toast("👁 【老刑警之眼】马魁已高亮可疑目标！", cc.amber);
  };

  const cpct = Math.max(0, Math.min(100, compat));
  const ccolor = cpct >= 65 ? cc.safeL : cpct >= 40 ? cc.amber : cc.dangerL;
  const clabel = cpct >= 70 ? "相互信任" : cpct >= 50 ? "初步认可" : cpct >= 35 ? "有待观察" : "关系生疏";

  const reset = () => { setScene("TITLE"); setTitleView("main"); setChapter(1); setCompat(40); setEvid([]); setChoice(null); setPaxDone([]); setSkillUsed(false); setItem(null); setShowNotes(false); dlg.usedRef.current = ""; };

  // ── Save System (localStorage) ──
  const SK = (i) => "nlbw:save:" + i;
  const buildSave = () => ({ ch1done, ch2done, ch3done, ch3good, blindManFound, compat, ap, love, achievements, ts: Date.now() });
  const applyLoad = (d) => { setCh1done(!!d.ch1done); setCh2done(!!d.ch2done); setCh3done(!!d.ch3done); setCh3good(!!d.ch3good); setBlindManFound(!!d.blindManFound); setCompat(d.compat || 40); setAp(d.ap !== undefined ? d.ap : 10); if (d.love) setLove(d.love); setAchievements(d.achievements || {}); setEvid([]); setPaxDone([]); setSkillUsed(false); setItem(null); setChoice(null); dlg.usedRef.current = ""; };
  const loadAllSlots = useCallback(() => {
    const slots = [0, 1, 2].map(i => { try { const r = localStorage.getItem(SK(i)); return r ? JSON.parse(r) : null; } catch { return null; } });
    setSaveSlots(slots);
  }, []);
  const saveToSlot = (i) => { try { localStorage.setItem(SK(i), JSON.stringify(buildSave())); loadAllSlots(); setSaveMsg("存档" + (i + 1) + "已保存 ✓"); setTimeout(() => setSaveMsg(""), 2200); } catch { setSaveMsg("保存失败"); } };
  const loadFromSlot = (i) => { try { const r = localStorage.getItem(SK(i)); if (!r) return; applyLoad(JSON.parse(r)); setScene("CHSELECT"); } catch { setSaveMsg("读取失败"); } };
  const deleteSlot = (i) => { try { localStorage.removeItem(SK(i)); loadAllSlots(); setSaveMsg("存档" + (i + 1) + "已删除"); setTimeout(() => setSaveMsg(""), 2000); } catch { } };
  const quickSave = () => { try { localStorage.setItem(SK(0), JSON.stringify(buildSave())); toast("💾 快速存档成功", cc.safeL); loadAllSlots(); } catch { toast("存档失败", cc.dangerL); } };
  useEffect(() => { if (scene === "TITLE") loadAllSlots(); }, [scene, loadAllSlots]);
  useEffect(() => { if (ch1done) { try { localStorage.setItem(SK(0), JSON.stringify(buildSave())); loadAllSlots(); } catch { } } }, [ch1done]);
  useEffect(() => { if (ch2done) { try { localStorage.setItem(SK(0), JSON.stringify(buildSave())); loadAllSlots(); } catch { } } }, [ch2done]);
  useEffect(() => { if (ch3done) { try { localStorage.setItem(SK(0), JSON.stringify(buildSave())); loadAllSlots(); } catch { } } }, [ch3done]);

  const startCh = (ch) => {
    const go = () => {
      setChapter(ch); setEvid([]); setPaxDone([]); setSkillUsed(false); setChoice(null); setShowNotes(false); setItem(null); setAp(10); // 重置 AP
      const proKey = ["", "pro1", "pro2", "pro3", "pro4"][ch];
      const courtScene = ["", "COURT1", "COURT2", "COURT3", "COURT4"][ch];
      setScene("PRO" + ch);
      dlg.start(D[proKey], () => setScene(courtScene));
    };
    ch > 1 ? transTo(ch, go) : go();
  };

  // ── Shared UI elements ──
  const eraLabel = { 1: "1978 · 蒸汽机车", 2: "1985 · 内燃机车", 3: "1993 · 电力机车", 4: "2018 · 复兴号" , 5: "2026 · 智能高铁" }[chapter];
  const base = { minHeight: "100vh", width: "100%", background: "linear-gradient(180deg," + cc.bg0 + " 0%," + cc.bg1 + " 50%," + cc.bg0 + " 100%)", fontFamily: F, color: cc.cream, position: "relative", overflowX: "hidden", boxSizing: "border-box" };
  const SF = STARS.map((s, i) => <div key={i} style={{ position: "absolute", left: s.l + "%", top: s.t + "%", width: s.s, height: s.s, borderRadius: "50%", background: "#fff", opacity: s.o, pointerEvents: "none" }} />);
  const Grain = <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 900, backgroundImage: GRAIN_SVG_URL, opacity: .5 }} />;
  const Scan = <div style={{ position: "fixed", left: 0, right: 0, height: 2, background: "linear-gradient(transparent,rgba(255,200,60,.04),transparent)", zIndex: 901, pointerEvents: "none", animation: "scanL 9s linear infinite" }} />;

  // ── HUD ──
  const HUD = !["TITLE", "CHSELECT", "END1", "END2", "END3", "END4", "TRANS"].includes(scene) && (
    <div className="glass" style={{ position: "fixed", top: 12, right: 12, zIndex: 200, borderRadius: 8, padding: "10px 13px", minWidth: 170, boxShadow: "0 8px 32px #00000088", animation: "fadeIn .5s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
        <div style={{ color: cc.muted, fontSize: 10, letterSpacing: 2 }}>师徒契合度</div>
        <div style={{ display: "flex", gap: 5 }}>
          {evid.length > 0 && <button onClick={() => setShowNotes(v => !v)} title="证物笔记本" style={{ background: showNotes ? cc.amber + "30" : "transparent", border: "1px solid " + cc.borderG, borderRadius: 3, padding: "2px 6px", cursor: "pointer", color: showNotes ? cc.amber : cc.muted, fontSize: 11, backdropFilter: "blur(5px)" }}>📋</button>}
          <button onClick={() => setShowLove(v => !v)} title="恋爱养成" style={{ background: showLove ? "#FF4081" + "30" : "transparent", border: "1px solid " + cc.borderG, borderRadius: 3, padding: "2px 6px", cursor: "pointer", color: showLove ? "#FF80AB" : cc.muted, fontSize: 11, backdropFilter: "blur(5px)" }}>❤️</button>
          <button onClick={bgm.toggleMuted} title="背景音" style={{ background: "transparent", border: "1px solid " + cc.borderG, borderRadius: 3, padding: "2px 6px", cursor: "pointer", color: bgm.muted ? cc.muted : cc.amber, fontSize: 11, backdropFilter: "blur(5px)" }}>{bgm.muted ? "🎵 Off" : "🎶 On"}</button>
          <button onClick={quickSave} title="快速存档" style={{ background: "transparent", border: "1px solid " + cc.borderG, borderRadius: 3, padding: "2px 6px", cursor: "pointer", color: cc.blueL, fontSize: 11, backdropFilter: "blur(5px)" }}>💾</button>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <div style={{ flex: 1, height: 6, background: cc.bg0, borderRadius: 3, overflow: "hidden" }}>
          <div style={{ height: "100%", width: cpct + "%", borderRadius: 3, background: "linear-gradient(90deg," + ccolor + "80," + ccolor + ")", transition: "width .9s ease" }} />
        </div>
        <span style={{ color: ccolor, fontSize: 12, fontWeight: 600, minWidth: 26, textAlign: "right" }}>{cpct}</span>
      </div>
      <div style={{ color: ccolor, fontSize: 10, textAlign: "right", letterSpacing: 1, marginBottom: 6 }}>{clabel}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, borderTop: "1px solid " + cc.border, paddingTop: 6 }}>
        <div style={{ flex: 1, height: 4, background: cc.bg3, borderRadius: 2, overflow: "hidden" }}>
          <div style={{ height: "100%", width: (ap * 10) + "%", borderRadius: 2, background: "linear-gradient(90deg," + cc.amber + "," + cc.gold + ")", transition: "width .3s ease" }} />
        </div>
        <span style={{ color: cc.amber, fontSize: 10, fontWeight: 700, minWidth: 32, textAlign: "right" }}>⚡ {ap} AP</span>
      </div>
      {item && <div style={{ padding: "3px 7px", borderRadius: 3, background: cc.safeL + "18", border: "1px solid " + cc.safeL + "40", color: cc.safeL, fontSize: 9, marginBottom: 5 }}>🔦 {item}</div>}
      <div style={{ fontSize: 9, color: cc.muted, letterSpacing: 1, borderTop: "1px solid " + cc.border, paddingTop: 5, marginTop: 2 }}>第{chapter}章 · {eraLabel}</div>
    </div>
  );

    // ── Love System Overlay ──
  const LoveOverlay = showLove && (
    <div style={{ position: "fixed", inset: 0, zIndex: 400, display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
      <div onClick={() => setShowLove(false)} style={{ position: "absolute", inset: 0, background: "#00000050" }} />
      <div style={{ position: "relative", background: "linear-gradient(160deg," + cc.bg2 + "," + cc.bg1 + ")", border: "1px solid " + cc.borderG, borderRadius: "12px 0 0 0", padding: "18px 18px 24px", width: "min(340px,92vw)", maxHeight: "70vh", overflowY: "auto", boxShadow: "-6px -6px 30px #00000066", animation: "slideUp .3s ease", fontFamily: F }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ color: "#FF4081", fontSize: 14, fontWeight: 700, letterSpacing: 2 }}>❤️ 车厢缘分</div>
          <button onClick={() => setShowLove(false)} style={{ background: "transparent", border: "none", color: cc.muted, fontSize: 18, cursor: "pointer", lineHeight: 1 }}>×</button>
        </div>
        {Object.keys(love).map(name => {
          const npc = {
            "马燕": { ic: "🌸", desc: "列车上的知心人", chat: D.love_chat_mayan, gift: D.love_gift_success_mayan, color: "#FF4081" },
            "牛大力": { ic: "💪", desc: "热血青年，大院活宝", chat: [{ sp: "牛大力", pt: "💪", tx: "汪新！巡查辛苦了！今晚回去整点不？" }], gift: [{ sp: "牛大力", pt: "💪", tx: "哎呀大白兔！这糖甜！谢了兄弟！" }], color: cc.safeL },
            "老瞎子": { ic: "🧓", desc: "寻女三十载的老人", chat: [{ sp: "老瞎子", pt: "🧓", tx: "老天爷保佑，希望能在这里找到我那苦命的丫头……" }], gift: [{ sp: "老瞎子", pt: "🧓", tx: "谢谢你，好心会有好报！" }], color: cc.sepia }
          }[name] || { ic: "👤", desc: "旅客", color: cc.muted };

          return (
            <div key={name} style={{ background: cc.bg3, border: "1px solid " + cc.borderG, borderRadius: 5, padding: "12px", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#444", fontSize: 24, textAlign: "center", lineHeight: "44px" }}>{npc.ic}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: cc.cream, fontSize: 14, fontWeight: 700 }}>{name}</div>
                  <div style={{ color: cc.dim, fontSize: 11 }}>{npc.desc}</div>
                </div>
              </div>
              <div style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}><span style={{ fontSize: 11, color: cc.muted }}>好感度</span><span style={{ fontSize: 11, color: npc.color }}>{love[name]}/100</span></div>
                <div style={{ height: 6, background: cc.bg0, borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: love[name] + "%", background: "linear-gradient(90deg, " + npc.color + ", " + (npc.color + "AA") + ")", borderRadius: 3, transition: "width .5s ease" }} />
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => { setShowLove(false); dlg.start(npc.chat, () => { setLove(p => ({ ...p, [name]: Math.min(100, p[name] + 2) })); toast("❤️ 与 " + name + " 闲聊，好感度 +2", npc.color); }); }} style={{ flex: 1, padding: "7px 0", borderRadius: 4, background: cc.bg0, border: "1px solid " + cc.borderG, color: cc.cream, fontSize: 12, cursor: "pointer" }}>💬 闲聊</button>
                <button disabled={!inventory.includes("大白兔奶糖")} onClick={() => { setShowLove(false); setInventory(p => p.filter(i => i !== "大白兔奶糖")); dlg.start(npc.gift, () => { setLove(p => ({ ...p, [name]: Math.min(100, p[name] + 8) })); toast("❤️ 赠送大白兔奶糖，好感度 +8", npc.color); }); }} style={{ flex: 1, padding: "7px 0", borderRadius: 4, background: inventory.includes("大白兔奶糖") ? "linear-gradient(135deg, " + npc.color + ", " + (npc.color + "88") + ")" : cc.dim + "30", border: "1px solid " + (inventory.includes("大白兔奶糖")?npc.color:cc.border), color: inventory.includes("大白兔奶糖")? "#fff" : cc.dim, fontSize: 12, cursor: "pointer" }}>💝 投喂</button>
              </div>
            </div>
          );
        })}
        <div style={{ color: cc.dim, fontSize: 10, letterSpacing: 1 }}>背包物品：{inventory.length > 0 ? inventory.join(", ") : "无"}</div>
      </div>
    </div>
  );

// ── Evidence Notebook Overlay ──
  const NotesOverlay = showNotes && (
    <div style={{ position: "fixed", inset: 0, zIndex: 400, display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
      <div onClick={() => setShowNotes(false)} style={{ position: "absolute", inset: 0, background: "#00000050" }} />
      <div style={{ position: "relative", background: "linear-gradient(160deg," + cc.bg2 + "," + cc.bg1 + ")", border: "1px solid " + cc.borderG, borderRadius: "12px 0 0 0", padding: "18px 18px 24px", width: "min(340px,92vw)", maxHeight: "70vh", overflowY: "auto", boxShadow: "-6px -6px 30px #00000066", animation: "slideUp .3s ease", fontFamily: F }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ color: cc.amber, fontSize: 14, fontWeight: 700, letterSpacing: 2 }}>📋 证物笔记本</div>
          <button onClick={() => setShowNotes(false)} style={{ background: "transparent", border: "none", color: cc.muted, fontSize: 18, cursor: "pointer", lineHeight: 1 }}>×</button>
        </div>
        <div style={{ color: cc.muted, fontSize: 10, letterSpacing: 3, marginBottom: 10 }}>第{chapter}章 · 已收集 {evid.length} 件</div>
        {evid.length === 0 && <div style={{ color: cc.dim, fontSize: 12, textAlign: "center", padding: "20px 0" }}>尚未收集到任何线索</div>}
        {evid.map((e, i) => (
          <div key={i} style={{ background: cc.bg3, border: "1px solid " + cc.borderG, borderRadius: 5, padding: "10px 12px", marginBottom: 8 }}>
            <div style={{ color: cc.dim, fontSize: 9, letterSpacing: 2, marginBottom: 4 }}>线索 {String(i + 1).padStart(2, "0")}</div>
            <div style={{ color: cc.cream, fontSize: 12, lineHeight: 1.7 }}>{e}</div>
          </div>
        ))}
        <div style={{ color: cc.dim, fontSize: 10, textAlign: "center", marginTop: 12, letterSpacing: 1 }}>点击空白处关闭</div>
      </div>
    </div>
  );

  // ── Achievement popup ──
  const AchPopup = newAchs.length > 0 && (
    <div style={{ position: "fixed", bottom: 80, left: "50%", transform: "translateX(-50%)", zIndex: 600, display: "flex", flexDirection: "column", gap: 8, pointerEvents: "none" }}>
      {newAchs.map((a, i) => (
        <div key={a.key} style={{ background: "linear-gradient(135deg," + cc.bg3 + "," + cc.bg2 + ")", border: "1px solid " + cc.amber + "60", borderRadius: 8, padding: "10px 18px", display: "flex", alignItems: "center", gap: 12, boxShadow: "0 4px 20px #00000066,0 0 20px " + cc.amber + "20", animation: "achPop .5s ease " + (i * 0.12) + "s both", fontFamily: F, minWidth: 220, maxWidth: 300 }}>
          <span style={{ fontSize: 28 }}>{a.ic}</span>
          <div>
            <div style={{ color: cc.amber, fontSize: 11, letterSpacing: 2, marginBottom: 2 }}>🏆 成就解锁</div>
            <div style={{ color: cc.cream, fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{a.name}</div>
            <div style={{ color: cc.muted, fontSize: 11 }}>{a.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );

  // ── Toast ──
  const Toast = notif && <div style={{ position: "fixed", top: 16, left: "50%", zIndex: 500, transform: "translateX(-50%)", background: "linear-gradient(135deg," + cc.bg2 + "," + cc.bg3 + ")", border: "1px solid " + notif.color + "50", borderRadius: 4, padding: "10px 18px", color: notif.color, fontSize: 13, boxShadow: "0 6px 22px #00000060", animation: "drop .3s ease", maxWidth: "82vw", textAlign: "center", lineHeight: 1.6, fontFamily: F }}>{notif.tx}</div>;

  // ── Dialogue Box ──
  function DlgBox() {
    if (!dlg.lines.length) return null;
    const line = dlg.lines[dlg.idx]; if (!line) return null;
    const sc = line.sp === "旁白" ? cc.sepia : line.sp === "汪新" ? "#7AB0E0" : line.sp === "马魁" ? "#E0A870" : line.sp === "牛大力" ? cc.safeL : line.sp === "马燕" ? "#E898C0" : line.sp === "老李" || line.sp === "老瞎子" ? "#90B8C8" : line.sp === "小周" ? "#60C8D8" : line.sp === "贾金龙" ? cc.dangerL : cc.dangerL;

    const isAction = line.tx && (line.tx.includes("枪声") || line.tx.includes("扑") || line.tx.includes("打中") || line.tx.includes("抓"));
    const audioRef = useRef(null);
    const audioUrlRef = useRef("");

    // Edge Neural TTS Client Streamer
    useEffect(() => {
      if (!line.tx || isAction) return;
      const text = line.tx.replace(/（[^）]+）/g, ""); // strip expressions
      if (!text) return;

      if (audioRef.current) { audioRef.current.pause(); }

      const ws = new WebSocket("wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/v1?trustedclienttoken=6A5AA1D4EAFF4E9FB37E23D3C5E9FD16");
      ws.binaryType = "arraybuffer";
      let audioBuffer = [];

      const voiceConfig = {
        "马魁": { name: "zh-CN-liaoning-XiaotongNeural", rate: "0%", pitch: "-5%" },
        "汪新": { name: "zh-CN-YunxiNeural", rate: "+5%", pitch: "+5%" },
        "陈国梁": { name: "zh-CN-liaoning-XiaotongNeural", rate: "+5%", pitch: "+5%" },
        "马燕": { name: "zh-CN-XiaoxiaoNeural", rate: "0%", pitch: "+8%" }
      };

      const currentVoice = voiceConfig[line.sp] || { name: "zh-CN-XiaoxiaoNeural", rate: "-2%", pitch: "-10%" };

      ws.onopen = () => {
        const confText = `X-Timestamp: ${new Date().toUTCString()}\r\nContent-Type: application/json; charset=utf-8\r\nPath: speech.config\r\n\r\n{"context":{"system":{"name":"SpeechSDK","version":"1.26.0","build":"JavaScript"},"os":{"platform":"Browser"}}}`;
        ws.send(confText);

        const ssmlText = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="zh-CN"><voice name="${currentVoice.name}"><prosody pitch="${currentVoice.pitch}" rate="${currentVoice.rate}">${text}</prosody></voice></speak>`;
        const ssmlFrame = `X-Timestamp: ${new Date().toUTCString()}\r\nContent-Type: application/ssml+xml\r\nPath: ssml\r\n\r\n${ssmlText}`;
        ws.send(ssmlFrame);
      };

      ws.onmessage = (e) => {
        if (typeof e.data === "string" && e.data.includes("turn.end")) {
          if (audioBuffer.length > 0) {
            const blob = new Blob(audioBuffer, { type: "audio/mp3" });
            const url = URL.createObjectURL(blob);
            audioUrlRef.current = url;
            const aud = new Audio(url);
            aud.volume = 0.85;
            aud.play().catch(() => {});
            audioRef.current = aud;
          }
          ws.close();
        } else if (e.data instanceof ArrayBuffer) {
          const view = new Uint8Array(e.data);
          let offset = 0;
          for (let i = 0; i < view.length - 3; i++) {
            if (view[i] === 13 && view[i+1] === 10 && view[i+2] === 13 && view[i+3] === 10) { offset = i + 4; break; }
          }
          if (offset > 0) { audioBuffer.push(view.slice(offset)); }
        }
      };

      return () => {
        if (ws.readyState === WebSocket.OPEN) ws.close();
        if (audioRef.current) audioRef.current.pause();
        if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current);
      };
    }, [dlg.idx, line.tx, line.sp, isAction]);

    return (
      <>
        {/* Full-screen click-to-advance Overlay */}
        <div 
          onClick={dlg.advance} 
          style={{ position: "fixed", inset: 0, zIndex: 290, cursor: "pointer" }} 
        />
        {/* Cinematic Background with Dynamic Motion (Ken Burns and Shakes) */}
        <div 
          key={dlg.idx} // Retriggers animation on dialogue step
          style={{ 
            position: "fixed", inset: 0, zIndex: 280, 
            backgroundImage: line.bg ? `url(${line.bg})` : "none", 
            backgroundSize: "cover", backgroundPosition: "center", 
            opacity: line.bg ? 1 : 0, pointerEvents: "none", 
            transition: "opacity .4s ease",
            animation: line.bg ? (isAction ? "shake 0.35s ease-in-out" : "kenBurns 12s ease-out forwards") : "none"
          }} 
        />
        <style>{`
          @keyframes kenBurns {
            from { transform: scale(1.0); }
            to { transform: scale(1.06) translate(-5px, -3px); }
          }
        `}</style>
        
        {/* Backdrop removed for smoother integration */}

        {/* Main Dialogue Layout Container */}
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 300, pointerEvents: "none" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "flex-end", gap: 20, padding: "0 24px 20px" }}>
            
            {/* 1. Large Character Portrait Column */}
            {AVATAR_MAP[line.sp] && (
              <div key={line.sp} style={{ position: "relative", width: "min(35vw, 200px)", flexShrink: 0, pointerEvents: "auto", margin: "0 0 -20px 20px", animation: "fadeUp .3s ease" }}>
                <img src={AVATAR_MAP[line.sp]} style={{ width: "100%", height: "auto", display: "block", maxHeight: "280px", objectFit: "contain", filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.8))" }} />
                <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", background: "rgba(10,4,1,0.9)", border: "1px solid " + sc, padding: "3px 12px", borderRadius: 4, boxShadow: "0 2px 8px rgba(0,0,0,0.6)", color: sc, fontSize: 13, fontWeight: 700, whiteSpace: "nowrap" }}>{line.sp}</div>
              </div>
            )}

            {/* 2. Text Content Bubble Column */}
            <div onClick={dlg.advance} style={{ flex: 1, pointerEvents: "auto", background: "rgba(14,7,3,0.88)", border: "1px solid rgba(240,168,32,0.22)", borderLeft: "4px solid " + sc, borderRadius: 8, padding: "20px 24px 28px", cursor: "pointer", backdropFilter: "blur(10px)", boxShadow: "0 -4px 32px rgba(0,0,0,0.5)" }}>
              {/* Progress Bar inside box */}
              <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>
                {dlg.lines.map((_, i) => <div key={i} style={{ flex: 1, height: 3, borderRadius: 1.5, background: i < dlg.idx ? sc : i === dlg.idx ? cc.amber : "rgba(255,255,255,0.08)", transition: "all .3s ease" }} />)}
              </div>
              
              <div style={{ fontSize: 16, lineHeight: 1.8, color: cc.cream, maxWidth: 620, minHeight: 50, whiteSpace: "pre-line" }}>{dlg.txt}</div>
              {!dlg.typing && <div style={{ textAlign: "right", color: cc.muted, fontSize: 11, marginTop: 10, animation: "pulse 1.8s infinite" }}>{dlg.idx < dlg.lines.length - 1 ? "继 续 ▶" : "结 束 ■"}</div>}
            </div>

          </div>
        </div>
      </>
    );
  }

  // ── 2.5D controllable Patrol Scene (Glassmorphism + Depth) ──
  function PatrolScene({ pax, canGo, onProceed, showSkill, ch }) {
    const [px, setPx] = useState(150); // X 轴位置 (0 - carWidth)
    const [py, setPy] = useState(20);  // Y 轴景深 (0=走道最外侧，60=贴近里侧车窗座位)
    const [dir, setDir] = useState("R"); 
    const [isMoving, setIsMoving] = useState(false); // 监控是否在迈步
    const containerWidth = 900; 
    const carWidth = 1600; 

    // Z 轴物理 (跳跃)
    const pzRef = useRef(0); 
    const vzRef = useRef(0); 
    const [pz, setPz] = useState(0); 
    const [isGrounded, setIsGrounded] = useState(true);

    const paxCoords = {};
    pax.forEach((p, idx) => { paxCoords[p.id] = { x: 350 + idx * 240, y: 55 }; }); // 乘客固定坐在内侧 (Y=55)

    const camOffset = Math.max(0, Math.min(px - containerWidth / 2, carWidth - containerWidth));

    // 60FPS 2.5D 重力 & 多维碰撞循环
    useEffect(() => {
      let anim = true;
      const tick = () => {
        if (!anim) return;
        vzRef.current -= 0.8; // Z轴重力拉扯
        pzRef.current += vzRef.current;

        let onPlat = false;
        // 1. 基本地板层 (Z = 0)
        if (pzRef.current <= 0) { pzRef.current = 0; vzRef.current = 0; onPlat = true; }
        
        // 2. 纵深互动：当 Y 靠近内侧 (py > 40)，可以跳上座位层 (Z=45)
        if (py >= 40 && pzRef.current >= 40 && pzRef.current <= 55 && vzRef.current <= 0) {
           pzRef.current = 45; vzRef.current = 0; onPlat = true;
        }

        // 3. 纵深高阶互动：在内侧时甚至可以跳上行李架 (Z=150)
        if (py >= 45 && px >= 140 && px <= 1420 && pzRef.current >= 140 && pzRef.current <= 160 && vzRef.current <= 0) {
           pzRef.current = 150; vzRef.current = 0; onPlat = true;
        }

        setIsGrounded(onPlat);
        setPz(pzRef.current);
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      return () => { anim = false; };
    }, [px, py]);

    // 2.5D 八向移动监控
    useEffect(() => {
      const keys = {};
      const handleKeyDown = (e) => { keys[e.code] = true; };
      const handleKeyUp = (e) => { keys[e.code] = false; };
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);

      let anim = true;
      const moveLoop = () => {
        if (!anim) return;
        let moving = false;
        if (keys["KeyD"] || keys["ArrowRight"]) { setPx(x => Math.min(x + 7, carWidth - 120)); setDir("R"); moving = true; }
        if (keys["KeyA"] || keys["ArrowLeft"])  { setPx(x => Math.max(x - 7, 40)); setDir("L"); moving = true; }
        if (keys["KeyW"] || keys["ArrowUp"])    { setPy(y => Math.min(y + 3, 60)); moving = true; }
        if (keys["KeyS"] || keys["ArrowDown"])  { setPy(y => Math.max(y - 3, 0)); moving = true; }
        
        setIsMoving(moving);

        if (keys["Space"]) {
          if (pzRef.current === 0 || pzRef.current === 45 || pzRef.current === 150) {
            vzRef.current = 13; setIsGrounded(false); keys["Space"] = false; // 防连跳
          }
        }
        requestAnimationFrame(moveLoop);
      };
      requestAnimationFrame(moveLoop);

      return () => {
        anim = false;
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
      };
    }, [carWidth]);

    // 判定近处交互 (不仅X要近，Y深度也要匹配)
    const nearPax = pax.find(p => {
       const pd = paxCoords[p.id];
       return Math.abs(px - pd.x) <= 80 && Math.abs(py - pd.y) < 30 && pz < 40; 
    });
    
    const taskDesc = ch === 1 ? "大力提到：此趟列车有扒手团伙活动，需找出可疑人员并收集证据。" : ch === 2 ? "打拐专项行动：需同时锁定嫌疑人与受害儿童。" : "情报确认：发现关键目标。";

    const GlassStyles = (
      <style>{`
        .glass-panel { background: rgba(255, 255, 255, 0.12); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 16px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); }
        .glass-btn { background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05)); backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.4); border-radius: 20px; color: #fff; font-weight: 600; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .glass-btn:hover { background: rgba(255,255,255,0.3); transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.2); }
      `}</style>
    );

    return (
      <div style={{ ...base, overflow: "hidden", height: "100vh", position: "relative", background: "#f0f4f8", color: "#333", fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
        {GlassStyles}<style>{KF}</style>{Toast}{AchPopup}{NotesOverlay}{LoveOverlay}

        {/* 顶部现代 Glassmorphism 任务挂件 */}
        <div className="glass-panel" style={{ position: "absolute", top: 20, left: 20, zIndex: 100, maxWidth: 340, padding: "16px 20px", color: "#fff", textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}>
          <div style={{ fontSize: 13, fontWeight: "800", letterSpacing: 1, marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ padding: "4px 8px", background: "#fff", color: "#222", borderRadius: 8, fontSize: 11 }}>STAGE {ch}</span>
            <span>巡查车厢</span>
          </div>
          <div style={{ fontSize: 12, lineHeight: 1.6, opacity: 0.9 }}>{taskDesc}</div>
          {canGo && <div style={{ fontSize: 12, marginTop: 10, fontWeight: "800", color: "#a8ffb2" }}>✅ 巡查完毕！可前往下一节车厢。</div>}
          <div style={{ fontSize: 10, marginTop: 12, opacity: 0.6, paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.1)" }}>W/A/S/D 移动，空格键跃击起跳</div>
        </div>

        {showSkill && !skillUsed && (
            <div className="glass-panel" onClick={() => useSkill(pax)} style={{ position: "absolute", top: 20, right: 230, zIndex: 100, padding: "10px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, animation: "floatBob 3s ease infinite" }}>
              <div style={{ fontSize: 24, background: "#fff", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", color: "#333" }}>👁</div>
              <div><div style={{ color: "#fff", fontSize: 13, fontWeight: "800" }}>老刑警之眼</div><div style={{ color: "#eee", fontSize: 10, opacity: 0.9 }}>消耗 10 AP 揭示破绽</div></div>
            </div>
        )}

        {/* 2.5D 场景主容器跟随摄像机 */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <div style={{ position: "absolute", bottom: -50, left: 0, width: carWidth, height: "110%", transform: `translateX(${-camOffset}px)`, transition: "transform 0.2s cubic-bezier(0.1, 0.7, 0.1, 1)", display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: 100 }}>
            
            {/* 2.5D 精美大画幅卡通背景 */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/ch1_bg.png')", backgroundSize: "cover", backgroundPosition: "bottom left", zIndex: 0, boxShadow: "inset 0 -50px 100px rgba(0,0,0,0.5)" }} />

            {/* 客座层级 NPC (根据他们靠内的 Y 深度进行 Z-Index 遮挡) */}
            {pax.map(p => {
               const pd = paxCoords[p.id];
               const done = paxDone.includes(p.id);
               const active = nearPax && nearPax.id === p.id;
               const isKey = ["suspect", "victim2", "jia", "contact", "witness3"].includes(p.role);
               // 算作处于深度层面
               const depthZ = 100 - pd.y; 
               return (
                 <div key={p.id} style={{ position: "absolute", left: pd.x - 45, bottom: 95 + pd.y * 0.5, textAlign: "center", zIndex: depthZ, transition: "all 0.3s" }}>
                   {/* 乘客立绘 */}
                   <div style={{ fontSize: 46, animation: (active && !done) ? "pulse 0.8s infinite" : "none", filter: done ? "grayscale(40%) blur(1px)" : "drop-shadow(0 10px 15px rgba(0,0,0,0.3))" }}>{p.ic}</div>
                   {/* 优雅的名签 */}
                   <div className="glass-panel" style={{ position: "absolute", top: -35, left: "50%", transform: "translateX(-50%)", padding: "4px 10px", borderRadius: 12, whiteSpace: "nowrap" }}>
                     <span style={{ fontSize: 11, fontWeight: "bold", color: done ? (isKey? "#ff7675" : "#74b9ff") : "#FFF" }}>{done ? p.name : "观察目标"}</span>
                   </div>
                 </div>
               );
            })}

            {/* 带有纵深关系的乘警汪新：受 px, py, pz 联合控制！ */}
            <div style={{ position: "absolute", bottom: 95 + py * 0.5 + pz, left: px - 25, zIndex: 100 - py, textAlign: "center", pointerEvents: "none", transition: "bottom 0.05s" }}>
               {/* 2.5D Sprite Sheet 动画切割渲染区 */}
               {(() => {
                  let frame = 0; // 0: Idle
                  if (pz > 0) frame = 4; // 4: Jump
                  else if (isMoving) {
                    frame = (Math.floor(Date.now() / 150) % 3) + 1; // 1, 2, 3: Walk Cycle
                  }
                  return (
                    <div style={{ width: 85, height: 110, backgroundImage: "url('/wangxin_sprite.png')", backgroundSize: "500% 100%", backgroundPosition: `${frame * 25}% center`, backgroundRepeat: "no-repeat", transform: dir === "L" ? "scaleX(-1)" : "scaleX(1)", filter: pz > 0 ? "drop-shadow(0 30px 20px rgba(0,0,0,0.1))" : "drop-shadow(0 8px 10px rgba(0,0,0,0.4))", transition: "filter 0.2s" }} />
                  );
               })()}
               {/* 脚下地影，高度随 Z 变淡，位置留在物理地面 py 上 */}
               <div style={{ position: "absolute", bottom: -pz - 5, left: "50%", transform: "translateX(-50%)", width: 45, height: 12, background: "rgba(0,0,0,0.4)", borderRadius: "50%", filter: "blur(4px)", opacity: Math.max(0.1, 1 - pz/100) }} />
            </div>

            {/* 安全连接门 / 通关点 (透视到最深层) */}
            <div className="glass-panel" style={{ position: "absolute", left: carWidth - 140, bottom: 120, width: 100, height: 200, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10, background: canGo ? "rgba(168, 255, 178, 0.2)" : "rgba(0,0,0,0.3)", borderRadius: "8px 0 0 8px", borderRight: 0 }}>
               {px >= carWidth - 180 && canGo ? (
                  <button className="glass-btn" onClick={onProceed} style={{ padding: "12px 24px", fontSize: 14 }}>进入车厢 ▶</button>
               ) : (
                  <div style={{ fontSize: 32, opacity: 0.8 }}>🚪</div>
               )}
            </div>

          </div>
        </div>

        {/* 底部居中的灵动交互面板 (Glass UI) */}
        {nearPax && (
          <div style={{ position: "absolute", bottom: 50, left: "50%", transform: "translateX(-50%)", zIndex: 200, animation: "fadeUp 0.3s ease" }}>
            <button className="glass-btn" onClick={() => paxClick(nearPax)} style={{ padding: "16px 40px", fontSize: 16, borderRadius: 30, background: "rgba(255,255,255,0.4)", color: "#222", textShadow: "none" }}>
              {paxDone.includes(nearPax.id) ? "✔️ 已记录 " + nearPax.name : "🔍 走近调查此人 (Click)"}
            </button>
          </div>
        )}

      </div>
    );
  }



  // ── Choice Scene ──
  function ChoiceScene({ opts, desc, accent, icon }) {
    return (
      <div style={{ ...base, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "18px 16px" }}>
        <style>{KF}</style>{Grain}{Scan}{HUD}{Toast}{AchPopup}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 25%," + accent + "28 0%," + cc.bg0 + " 65%)" }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 500, width: "100%", animation: "fadeUp .5s ease" }}>
          <div style={{ fontSize: 52, marginBottom: 14 }}>{icon}</div>
          <div style={{ color: cc.cream, fontSize: 14, lineHeight: 2, marginBottom: 22, padding: "14px 18px", background: cc.bg2, borderRadius: 6, border: "1px solid " + cc.borderG, borderLeft: "4px solid " + accent }} dangerouslySetInnerHTML={{ __html: desc }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 11, marginBottom: 16 }}>
            {opts.map(opt => (
              <button key={opt.id}
                onMouseEnter={() => setHovChoice(opt.id)} onMouseLeave={() => setHovChoice(null)}
                onClick={opt.onClick}
                className="hover-up shimmer"
                style={{ background: "linear-gradient(135deg,rgba(20,8,4,0.7),rgba(30,16,8,0.6))", border: "1px solid " + (hovChoice === opt.id ? opt.tc + "80" : cc.border), borderRadius: 7, padding: "15px 16px", cursor: "pointer", textAlign: "left", fontFamily: F, width: "100%", backdropFilter: "blur(8px)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 28 }}>{opt.ic}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: cc.cream, fontSize: 14, fontWeight: 700, marginBottom: 4, letterSpacing: 1 }}>{opt.lb}</div>
                    <div style={{ color: cc.sepia, fontSize: 12, marginBottom: hovChoice === opt.id ? 6 : 0, transition: "margin .2s" }}>{opt.ds}</div>
                    {hovChoice === opt.id && opt.preview && (
                      <div style={{ color: opt.previewColor || cc.muted, fontSize: 11, padding: "5px 8px", background: cc.bg0, borderRadius: 3, border: "1px solid " + cc.border, animation: "fadeIn .2s ease", lineHeight: 1.6 }}>
                        {opt.preview}
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize: 10, padding: "3px 9px", borderRadius: 3, whiteSpace: "nowrap", letterSpacing: 1, background: opt.tc + "18", color: opt.tc, border: "1px solid " + opt.tc + "35", flexShrink: 0 }}>{opt.tag}</div>
                </div>
              </button>
            ))}
          </div>
          <div style={{ color: cc.muted, fontSize: 10, letterSpacing: 2 }}>※ 悬停可预览选项后果 · 选择将影响后续剧情</div>
        </div>
      </div>
    );
  }

  // ── End Screen ──
  function EndScene({ chNum, chTitle, subTitle, chText, nextLabel, onNext, extra }) {
    const pal = chNum === 1 ? C : chNum === 2 ? C2 : chNum === 3 ? C3 : C4;
    const achList = Object.keys(achievements).filter(k => achievements[k]);
    return (
      <div style={{ ...base, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px 16px" }}>
        <style>{KF}</style>{Grain}{Scan}{SF}{AchPopup}{LoveOverlay}
        <div style={{ position: "absolute", top: "35%", left: "50%", transform: "translate(-50%,-50%)", width: 420, height: 420, borderRadius: "50%", pointerEvents: "none", background: "radial-gradient(circle," + pal.gold + "10 0%,transparent 70%)" }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 500, width: "100%", animation: "fadeUp .8s ease" }}>
          <div style={{ color: pal.muted, fontSize: 10, letterSpacing: 6, marginBottom: 12 }}>第{chNum}章 · 完</div>
          <div style={{ fontSize: "clamp(17px,4.5vw,28px)", fontWeight: 700, color: pal.amber, letterSpacing: 4, marginBottom: 8, textShadow: "0 0 26px " + pal.gold + "38" }}>{chTitle}</div>
          <div style={{ width: 64, height: 1, margin: "11px auto 22px", background: "linear-gradient(90deg,transparent," + pal.gold + ",transparent)" }} />
          <div style={{ background: "linear-gradient(135deg," + pal.bg2 + "," + pal.bg1 + ")", border: "1px solid " + pal.borderG, borderRadius: 8, padding: "18px 20px", marginBottom: 16, textAlign: "left" }}>
            <div style={{ color: pal.muted, fontSize: 10, letterSpacing: 4, marginBottom: 14, textAlign: "center" }}>── 章 节 结 算 ──</div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span style={{ color: pal.sepia, fontSize: 12 }}>师徒契合度</span><span style={{ color: ccolor, fontSize: 12 }}>{clabel}（{cpct}/100）</span></div>
              <div style={{ height: 6, background: pal.bg0, borderRadius: 3, overflow: "hidden" }}><div style={{ height: "100%", width: cpct + "%", borderRadius: 3, transition: "width 1.2s ease .3s", background: "linear-gradient(90deg," + ccolor + "75," + ccolor + ")" }} /></div>
            </div>
            {subTitle && <div style={{ marginBottom: 11 }}><span style={{ color: pal.muted, fontSize: 12 }}>本章选择：</span><span style={{ color: pal.amber, fontSize: 12, marginLeft: 10 }}>{subTitle}</span></div>}
            <div>
              <div style={{ color: pal.sepia, fontSize: 12, marginBottom: 7 }}>收集证物：{evid.length} 件</div>
              {evid.length === 0 ? <div style={{ color: pal.muted, fontSize: 11 }}>—— 无证物</div> : evid.map((e, i) => <div key={i} style={{ color: pal.amber, fontSize: 11, marginBottom: 4, lineHeight: 1.65 }}>◆ {e}</div>)}
            </div>
            {extra}
            {achList.length > 0 && (
              <div style={{ marginTop: 12, borderTop: "1px solid " + pal.border, paddingTop: 12 }}>
                <div style={{ color: pal.muted, fontSize: 10, letterSpacing: 3, marginBottom: 8 }}>已获成就 {achList.length}/{ACHS.length}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {ACHS.map(a => (
                    <div key={a.key} title={a.name + ": " + a.desc} style={{ padding: "4px 9px", borderRadius: 3, background: achievements[a.key] ? pal.amber + "20" : pal.bg0, border: "1px solid " + (achievements[a.key] ? pal.amber + "50" : pal.border), color: achievements[a.key] ? pal.amber : pal.dim, fontSize: 12, cursor: "help", opacity: achievements[a.key] ? 1 : .45 }}>
                      {a.ic} {achievements[a.key] ? a.name : "???"}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div style={{ color: pal.sepia, fontSize: 12, lineHeight: 1.9, padding: "12px 16px", marginBottom: 18, background: pal.bg2, borderRadius: 5, border: "1px solid " + pal.border, borderLeft: "3px solid " + ccolor }}>{chText}</div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            {nextLabel && <button onMouseEnter={() => setHovB("n")} onMouseLeave={() => setHovB(null)} onClick={onNext} style={{ background: "linear-gradient(135deg," + pal.gold + "20," + pal.gold + "0A)", border: "1px solid " + pal.gold + "65", color: pal.amber, fontSize: 12, letterSpacing: 3, padding: "11px 28px", borderRadius: 3, cursor: "pointer", fontFamily: F, transform: hovB === "n" ? "scale(1.04)" : "scale(1)", transition: "transform .2s ease" }}>{nextLabel}</button>}
            <button onClick={() => setScene("CHSELECT")} style={{ background: "transparent", border: "1px solid " + pal.borderG, color: pal.muted, fontSize: 11, letterSpacing: 3, padding: "11px 22px", borderRadius: 3, cursor: "pointer", fontFamily: F }}>章节选择</button>
            <button onClick={reset} style={{ background: "transparent", border: "1px solid " + pal.border, color: pal.muted, fontSize: 11, letterSpacing: 3, padding: "11px 16px", borderRadius: 3, cursor: "pointer", fontFamily: F }}>标题</button>
          </div>
        </div>
      </div>
    );
  }

  // The scene rendering continues in GameScenes.jsx
  // Import and call it here
  return <GameScenes scene={scene} setScene={setScene} chapter={chapter} setChapter={setChapter}
    LoveOverlay={LoveOverlay}
    bgm={bgm}
    cc={cc} base={base} SF={SF} Grain={Grain} Scan={Scan} HUD={HUD} Toast={Toast} AchPopup={AchPopup} NotesOverlay={NotesOverlay}
    DlgBox={DlgBox} PatrolScene={PatrolScene} ChoiceScene={ChoiceScene} EndScene={EndScene}
    dlg={dlg} ch1done={ch1done} setCh1done={setCh1done} ch2done={ch2done} setCh2done={setCh2done}
    ch3done={ch3done} setCh3done={setCh3done} ch3good={ch3good} setCh3good={setCh3good}
    ch3goodRef={ch3goodRef} blindRef={blindRef} blindManFound={blindManFound} setBlindManFound={setBlindManFound}
    compat={compat} setCompat={setCompat} evid={evid} choice={choice} setChoice={setChoice}
    paxDone={paxDone} skillUsed={skillUsed} hovB={hovB} setHovB={setHovB} hovChoice={hovChoice} setHovChoice={setHovChoice}
    transData={transData} setTransData={setTransData} achievements={achievements}
    cpct={cpct} ccolor={ccolor} clabel={clabel} toast={toast} unlockAch={unlockAch}
    reset={reset} startCh={startCh} transTo={transTo} canGo1={canGo1} canGo2={canGo2} canGo3={canGo3} canGo4={canGo4}
    ch3perfect={ch3perfect} hasS2={hasS2} hasV2={hasV2}
    titleView={titleView} setTitleView={setTitleView} saveSlots={saveSlots} saveMsg={saveMsg}
    txSpeed={txSpeed} setTxSpeed={setTxSpeed} saveToSlot={saveToSlot} loadFromSlot={loadFromSlot} deleteSlot={deleteSlot}
    showNotes={showNotes} item={item} eraLabel={eraLabel} useSkill={useSkill} hovP={hovP} setHovP={setHovP}
    newAchs={newAchs}
  />;
}
