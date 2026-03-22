const fs = require('fs');

const path = 'c:\\Users\\kaixi\\.gemini\\antigravity\\playground\\deep-einstein\\src\\Game.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add States
if (!content.includes('const [showLove')) {
    const noteStateIndex = content.indexOf('const [showNotes, setShowNotes] = useState(false);');
    const loadStateIndex = content.indexOf('\n', noteStateIndex) + 1;
    const loveStateString = `  const [showLove, setShowLove] = useState(false);\n  const [love, setLove] = useState({ "马燕": 40 });\n  const [inventory, setInventory] = useState(["大白兔奶糖"]);\n`;
    content = content.slice(0, loadStateIndex) + loveStateString + content.slice(loadStateIndex);
}

// 2. Update eraLabel for Ch5
if (!content.includes('"2026 · 智能高铁"')) {
    const eraLabelIndex = content.indexOf('const eraLabel = {');
    const endEraIndex = content.indexOf('}[chapter];', eraLabelIndex);
    content = content.slice(0, endEraIndex) + `, 5: "2026 · 智能高铁" ` + content.slice(endEraIndex);
}

// 3. Add HUD Button
if (!content.includes('title="恋爱养成"')) {
    const hudIndex = content.indexOf('title="证物笔记本"');
    const btnEndIndex = content.indexOf('</button>}', hudIndex) + 10;
    const loveBtnString = `\n          <button onClick={() => setShowLove(v => !v)} title="恋爱养成" style={{ background: showLove ? "#FF4081" + "30" : "transparent", border: "1px solid " + cc.borderG, borderRadius: 3, padding: "2px 6px", cursor: "pointer", color: showLove ? "#FF80AB" : cc.muted, fontSize: 11, backdropFilter: "blur(5px)" }}>❤️</button>`;
    content = content.slice(0, btnEndIndex) + loveBtnString + content.slice(btnEndIndex);
}

// 4. Add LoveOverlay definition
if (!content.includes('const LoveOverlay')) {
    const notesOverlayIndex = content.indexOf('// ── Evidence Notebook Overlay ──');
    const loveOverlayString = `  // ── Love System Overlay ──
  const LoveOverlay = showLove && (
    <div style={{ position: "fixed", inset: 0, zIndex: 400, display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
      <div onClick={() => setShowLove(false)} style={{ position: "absolute", inset: 0, background: "#00000050" }} />
      <div style={{ position: "relative", background: "linear-gradient(160deg," + cc.bg2 + "," + cc.bg1 + ")", border: "1px solid " + cc.borderG, borderRadius: "12px 0 0 0", padding: "18px 18px 24px", width: "min(340px,92vw)", maxHeight: "70vh", overflowY: "auto", boxShadow: "-6px -6px 30px #00000066", animation: "slideUp .3s ease", fontFamily: F }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ color: "#FF4081", fontSize: 14, fontWeight: 700, letterSpacing: 2 }}>❤️ 车厢缘分</div>
          <button onClick={() => setShowLove(false)} style={{ background: "transparent", border: "none", color: cc.muted, fontSize: 18, cursor: "pointer", lineHeight: 1 }}>×</button>
        </div>
        <div style={{ background: cc.bg3, border: "1px solid " + cc.borderG, borderRadius: 5, padding: "12px", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#444", fontSize: 24, textAlign: "center", lineHeight: "44px" }}>🌸</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: cc.cream, fontSize: 14, fontWeight: 700 }}>马燕</div>
              <div style={{ color: cc.dim, fontSize: 11 }}>列车上的知心人</div>
            </div>
          </div>
          <div style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}><span style={{ fontSize: 11, color: cc.muted }}>好感度</span><span style={{ fontSize: 11, color: "#FF4081" }}>{love["马燕"]}/100</span></div>
            <div style={{ height: 6, background: cc.bg0, borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: love["马燕"] + "%", background: "linear-gradient(90deg, #FF80AB, #FF4081)", borderRadius: 3, transition: "width .5s ease" }} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => { setShowLove(false); dlg.start(D.love_chat_mayan, () => { setLove(p => ({ ...p, "马燕": Math.min(100, p["马燕"] + 2) })); toast("❤️ 与马燕闲聊，好感度 +2", "#FF4081"); }); }} style={{ flex: 1, padding: "7px 0", borderRadius: 4, background: cc.bg0, border: "1px solid " + cc.borderG, color: cc.cream, fontSize: 12, cursor: "pointer" }}>💬 闲聊</button>
            <button disabled={!inventory.includes("大白兔奶糖")} onClick={() => { setShowLove(false); setInventory(p => p.filter(i => i !== "大白兔奶糖")); dlg.start(D.love_gift_success_mayan, () => { setLove(p => ({ ...p, "马燕": Math.min(100, p["马燕"] + 8) })); toast("❤️ 赠送大白兔奶糖，好感度 +8", "#FF4081"); }); }} style={{ flex: 1, padding: "7px 0", borderRadius: 4, background: inventory.includes("大白兔奶糖") ? "linear-gradient(135deg, #FF80AB, #FF4081)" : cc.dim + "30", border: "1px solid " + (inventory.includes("大白兔奶糖")?"#FF4081":cc.border), color: inventory.includes("大白兔奶糖")? "#fff" : cc.dim, fontSize: 12, cursor: "pointer" }}>💝 投喂</button>
          </div>
        </div>
        <div style={{ color: cc.dim, fontSize: 10, letterSpacing: 1 }}>背包物品：{inventory.length > 0 ? inventory.join(", ") : "无"}</div>
      </div>
    </div>
  );\n\n`;
    content = content.slice(0, notesOverlayIndex) + loveOverlayString + content.slice(notesOverlayIndex);
}

// 5. Inject LoveOverlay into output props
if (!content.includes('LoveOverlay={LoveOverlay}')) {
    const returnIndex = content.indexOf('<GameScenes scene={scene}');
    content = content.slice(0, returnIndex) + `NotesOverlay={NotesOverlay} LoveOverlay={LoveOverlay}\n    ` + content.slice(returnIndex);
    // Remove individual NotesOverlay in the target list just to prevent duplication inside props listing
    content = content.replace('NotesOverlay={NotesOverlay}', '');
}

fs.writeFileSync(path, content, 'utf8');
console.log("Successfully patched Game.jsx");
