// ============================================
// CURSIVE PRIMITIVES — Hand-Traced Letter System
//
// Grid (Y-up):
//   Descender: -300    Baseline: 0
//   X-height:   360    Ascender: 660
//
// Practice sheet: top=720, mid=360, base=0, desc=-360
// ============================================
(function (root) {
'use strict';

const DESC = -300, BASE = 0, XHT = 360, ASC = 660;

const DEFAULT_STYLE = {
    slant: 12,
};

function deg(a) { return a * Math.PI / 180; }

function slantAll(pts, slantDeg) {
    if (!slantDeg) return pts;
    const t = Math.tan(deg(slantDeg));
    return pts.map(p => ({ x: p.x + p.y * t, y: p.y }));
}

function anchorX(pts, targetX) {
    if (!pts.length) return pts;
    const dx = targetX - pts[0].x;
    for (const p of pts) p.x += dx;
    return pts;
}

function last(pts) { return pts[pts.length - 1]; }
function merge(style) { return { ...DEFAULT_STYLE, ...style }; }

// ============================================
// SHARED SHAPES — reusable curve fragments
// ============================================

// Standard egg-shaped oval, CCW from upper-right
// Returns array of ~10 points. cx=center x, w=width, baseY=bottom, topY=top
function makeOval(cx, w, baseY, topY) {
    const cy = (baseY + topY) / 2;
    const rx = w / 2;
    const ry = (topY - baseY) / 2;
    // 10 points around the oval, CCW starting at ~1 o'clock
    // Egg shape: bottom is slightly wider (rx*1.05) than top (rx*0.92)
    const pts = [];
    const angles = [25, 65, 105, 145, 185, 220, 255, 290, 335];
    for (const deg of angles) {
        const rad = deg * Math.PI / 180;
        // egg factor: wider at bottom (sin < 0)
        const eggX = Math.sin(rad) < 0 ? 1.06 : 0.94;
        pts.push({
            x: Math.round(cx + rx * eggX * Math.cos(rad)),
            y: Math.round(cy + ry * Math.sin(rad))
        });
    }
    return pts;
}

// Standard ascender loop from current position up to ASC
// startX, startY = where the stroke is when loop begins (already at x-height area)
// Returns array of points for the loop portion only
function makeAscLoop(x, loopW) {
    return [
        {x: x+10, y: 440},
        {x: x+15, y: 540},
        {x: x+25, y: 620},
        {x: x+40, y: 655},     // peak
        {x: x+40+loopW*0.6, y: 650},
        {x: x+40+loopW, y: 610},
        {x: x+40+loopW*0.8, y: 530},
        {x: x+30+loopW*0.4, y: 430},
    ];
}

// Standard descender loop from baseline area down to DESC
function makeDescLoop(x, loopW) {
    return [
        {x: x, y: -60},
        {x: x-5, y: -150},
        {x: x-10, y: -230},
        {x: x-12, y: -290},     // nadir
        {x: x-5, y: -300},
        {x: x+loopW*0.4, y: -285},
        {x: x+loopW*0.8, y: -230},
        {x: x+loopW, y: -140},
        {x: x+loopW*0.9, y: -40},
        {x: x+loopW*0.8, y: 20},
    ];
}

// Standard entry stroke from baseline going up
function makeEntry(startX) {
    return [
        {x: startX, y: 0},
        {x: startX+15, y: 100},
        {x: startX+35, y: 240},
        {x: startX+50, y: 340},
        {x: startX+55, y: 360},
    ];
}

// Smooth valley: starts at x-height, dips to baseline, returns to x-height
// Like an inverted sine arch
function makeSineValley(startX, valleyW, N) {
    N = N || 10;
    const pts = [];
    for (let i = 0; i <= N; i++) {
        const t = i / N;
        pts.push({
            x: Math.round(startX + valleyW * t),
            y: Math.round(360 * Math.cos(Math.PI * t) * 0.5 + 180)  // 360→0→360
        });
    }
    // Adjust first and last to exactly 360, middle to exactly 0
    pts[0].y = 360;
    pts[N].y = 360;
    pts[Math.floor(N/2)].y = 0;
    return pts;
}

// Standard exit stroke going up-right
function makeExit(x, y) {
    return [
        {x: x+15, y: (y || 0) + 90},
        {x: x+30, y: (y || 0) + 210},
        {x: x+42, y: (y || 0) + 300},
    ];
}

// Smooth arch using sine curve — mathematically smooth
// Generates N points along a sine arch from (startX, 0) to (startX+archW, 0), peak at 360
function makeSineArch(startX, archW, N) {
    N = N || 10;
    const pts = [];
    for (let i = 0; i <= N; i++) {
        const t = i / N;
        // Shift peak slightly right (55% instead of 50%)
        const tAdj = t < 0.55 ? t / 0.55 * 0.5 : 0.5 + (t - 0.55) / 0.45 * 0.5;
        pts.push({
            x: Math.round(startX + archW * t),
            y: Math.round(360 * Math.sin(Math.PI * tAdj))
        });
    }
    return pts;
}

// ============================================
// LETTER DEFINITIONS
// ============================================

const W = 310;   // standard width
const NW = 200;  // narrow
const WW = 480;  // wide

const LETTERS = {};

// --- OVAL FAMILY ---
// Shared oval: center at x=145, width=270, from y=5 to y=355
const STD_OVAL = makeOval(145, 270, 5, 355);

// a: oval + retrace down + exit
LETTERS.a = { w: W, path: [
    ...STD_OVAL,
    // retrace down right side
    {x:240, y:200},
    {x:248, y:100},
    {x:250, y:30},
    {x:248, y:5},
    // exit
    ...makeExit(248, 0),
]};

// c: 3/4 oval (open right) + exit
LETTERS.c = { w: 260, path: [
    // Start at upper-right, go CCW but stop before closing
    STD_OVAL[0],  // upper-right
    STD_OVAL[1],  // top-right
    STD_OVAL[2],  // top-left
    STD_OVAL[3],  // left-high
    STD_OVAL[4],  // left-low
    STD_OVAL[5],  // bottom-left
    STD_OVAL[6],  // bottom
    STD_OVAL[7],  // bottom-right
    // don't close — exit from lower right
    {x:230, y:70},
    ...makeExit(232, 0),
]};

// d: oval + tall stem + exit
LETTERS.d = { w: W+10, path: [
    ...STD_OVAL,
    // stem goes up to ascender (no loop)
    {x:255, y:360},
    {x:260, y:460},
    {x:265, y:560},
    {x:268, y:650},    // ascender top
    // straight back down
    {x:272, y:560},
    {x:275, y:440},
    {x:278, y:300},
    {x:280, y:150},
    {x:278, y:40},
    {x:278, y:5},
    // exit
    ...makeExit(278, 0),
]};

// g: oval + descender loop
LETTERS.g = { w: W, path: [
    ...STD_OVAL,
    // retrace to baseline then descend
    {x:240, y:200},
    {x:248, y:80},
    {x:250, y:20},
    {x:248, y:0},
    ...makeDescLoop(248, 70),
]};

// o: full oval + exit connector
LETTERS.o = { w: 290, path: [
    ...STD_OVAL,
    // exit: small dip right then up
    {x:248, y:200},
    {x:255, y:100},
    {x:258, y:40},
    ...makeExit(258, 0),
]};

// q: oval + descender with forward exit
LETTERS.q = { w: W+10, path: [
    ...STD_OVAL,
    // retrace to baseline then descend
    {x:240, y:200},
    {x:248, y:80},
    {x:252, y:20},
    {x:250, y:0},
    {x:248, y:-60},
    {x:242, y:-150},
    {x:238, y:-230},
    {x:235, y:-295},    // bottom
    // forward exit (not looping back)
    {x:248, y:-270},
    {x:270, y:-200},
    {x:295, y:-100},
    {x:310, y:0},
    {x:318, y:50},
]};

// --- ASCENDER LOOP FAMILY ---

// b: ascender loop + bump bowl + exit
LETTERS.b = { w: W, path: [
    {x:10, y:0},
    {x:20, y:100},
    {x:35, y:260},
    {x:45, y:360},
    ...makeAscLoop(45, 70),
    // descend from loop to baseline
    {x:80, y:300},
    {x:70, y:160},
    {x:65, y:40},
    {x:68, y:5},
    {x:72, y:0},       // baseline — bowl starts here
    // bowl: rightward bump (no backward loop)
    {x:95, y:5},
    {x:130, y:25},
    {x:170, y:70},
    {x:205, y:140},
    {x:220, y:210},     // rightmost point, mid-height
    {x:215, y:280},
    {x:195, y:330},
    {x:162, y:355},     // top of bump
    {x:130, y:348},
    {x:105, y:310},
    // exit: flow out from right side of bump, no backward crossing
    {x:120, y:240},
    {x:150, y:150},
    {x:185, y:60},
    {x:220, y:15},
    {x:245, y:5},
    ...makeExit(248, 0),
]};

// h: ascender loop + descend + one arch + exit
LETTERS.h = { w: W+20, path: [
    {x:10, y:0},
    {x:20, y:100},
    {x:35, y:260},
    {x:45, y:360},
    ...makeAscLoop(45, 70),
    // descend from loop to baseline
    {x:80, y:300},
    {x:70, y:160},
    {x:65, y:40},
    {x:70, y:5},
    {x:75, y:0},       // baseline
    // arch: smooth sine curve
    ...makeSineArch(75, 200, 10),
    // exit
    ...makeExit(275, 0),
]};

// k: ascender loop + kick
LETTERS.k = { w: W, path: [
    {x:10, y:0},
    {x:20, y:100},
    {x:35, y:260},
    {x:45, y:360},
    ...makeAscLoop(45, 70),
    // descend from loop to kick branch point
    {x:80, y:300},
    {x:72, y:210},
    {x:68, y:170},       // branch point ~mid height
    // upper kick: smooth diagonal to upper-right
    {x:105, y:230},
    {x:150, y:300},
    {x:185, y:345},      // upper-right peak
    // return to branch: tight curve back
    {x:160, y:300},
    {x:120, y:225},
    {x:90, y:165},        // back near branch
    // lower kick: smooth diagonal to lower-right
    {x:120, y:110},
    {x:165, y:50},
    {x:210, y:10},
    {x:240, y:0},
    // exit
    ...makeExit(240, 0),
]};

// l: ascender loop + exit
LETTERS.l = { w: NW, path: [
    {x:10, y:0},
    {x:20, y:100},
    {x:35, y:260},
    {x:45, y:360},
    ...makeAscLoop(45, 65),
    // descend to baseline
    {x:78, y:300},
    {x:72, y:160},
    {x:70, y:40},
    {x:75, y:5},
    {x:80, y:0},
    // exit
    ...makeExit(80, 0),
]};

// f: ascender loop + smooth descent + descender loop + crossbar
LETTERS.f = { w: 230, path: [
    {x:40, y:0},
    {x:50, y:100},
    {x:60, y:260},
    {x:70, y:360},
    ...makeAscLoop(70, 65),
    // smooth descent — gentle rightward drift, no sharp turns
    {x:100, y:340},
    {x:102, y:260},
    {x:100, y:180},
    {x:96, y:100},
    {x:92, y:40},
    {x:90, y:0},
    ...makeDescLoop(90, 75),
], secondary: [
    [{x:30, y:310}, {x:175, y:310}],
]};

// --- ARCH FAMILY ---
// In D'Nealian cursive:
//   n = 2 humps (entry peak + one arch)
//   m = 3 humps (entry peak + two arches)
//   h = ascender loop + one arch

// n: entry arch (peak 1) + arch (peak 2) + exit
LETTERS.n = { w: W, path: [
    // peak 1: entry as half-sine (rising from baseline to x-height)
    ...makeSineArch(10, 130, 10).slice(0, 6),  // first half only: 0→360
    // peak 1 to valley: continue sine down to baseline
    ...makeSineArch(10, 130, 10).slice(6),      // second half: 360→0
    // peak 2: full sine arch
    ...makeSineArch(140, 150, 10),
    // exit
    ...makeExit(290, 0),
]};

// m: entry arch (peak 1) + arch (peak 2) + arch (peak 3) + exit
LETTERS.m = { w: WW, path: [
    // peak 1: entry half-sine
    ...makeSineArch(10, 120, 10).slice(0, 6),
    ...makeSineArch(10, 120, 10).slice(6),
    // peak 2
    ...makeSineArch(130, 140, 10),
    // peak 3
    ...makeSineArch(270, 140, 10),
    // exit
    ...makeExit(410, 0),
]};

// --- SIMPLE STROKES ---

// i: entry to x-height + downstroke + exit + dot
LETTERS.i = { w: NW, path: [
    ...makeEntry(10),
    // down
    {x:78, y:300},
    {x:95, y:180},
    {x:108, y:70},
    {x:115, y:15},
    {x:118, y:0},
    // exit
    ...makeExit(118, 0),
], secondary: [
    [{x:68, y:440}, {x:70, y:445}],
]};

// j: entry to x-height + descender + dot
LETTERS.j = { w: NW, path: [
    ...makeEntry(10),
    // down through baseline to descender
    {x:78, y:280},
    {x:90, y:160},
    {x:98, y:60},
    {x:100, y:0},
    ...makeDescLoop(100, 65),
], secondary: [
    [{x:68, y:440}, {x:70, y:445}],
]};

// t: tall entry + down + exit + crossbar
LETTERS.t = { w: NW, path: [
    {x:10, y:0},
    {x:22, y:100},
    {x:38, y:260},
    {x:50, y:380},
    {x:58, y:440},
    {x:65, y:490},     // taller than x-height, not full ascender
    // down
    {x:80, y:400},
    {x:95, y:280},
    {x:108, y:150},
    {x:118, y:50},
    {x:122, y:10},
    {x:125, y:0},
    // exit
    ...makeExit(125, 0),
], secondary: [
    [{x:25, y:345}, {x:150, y:345}],
]};

// r: entry + shoulder bump + exit
LETTERS.r = { w: 240, path: [
    ...makeEntry(10),
    // shoulder: wider rightward bump from x-height
    {x:75, y:358},
    {x:100, y:360},
    {x:135, y:355},
    {x:165, y:335},
    {x:185, y:300},
    {x:190, y:260},       // shoulder peak (rightmost)
    // curve down into exit stroke
    {x:185, y:220},
    {x:178, y:180},
    {x:180, y:140},
    {x:190, y:100},
    {x:205, y:50},
    {x:220, y:15},
    {x:230, y:5},
    ...makeExit(230, 0),
]};

// --- VALLEY FAMILY ---

// u: entry + valley + downstroke + exit
LETTERS.u = { w: W, path: [
    ...makeEntry(10),
    // valley: smooth U-curve
    ...makeSineValley(65, 160, 10),
    // downstroke to baseline (from x-height)
    {x:240, y:310},
    {x:252, y:190},
    {x:262, y:70},
    {x:268, y:10},
    {x:270, y:0},
    // exit
    ...makeExit(270, 0),
]};

// v: entry + pointed valley + exit
LETTERS.v = { w: 260, path: [
    ...makeEntry(10),
    // pointed valley
    {x:72, y:310},
    {x:95, y:200},
    {x:115, y:100},
    {x:130, y:30},
    {x:140, y:5},        // bottom point
    {x:155, y:40},
    {x:175, y:120},
    {x:200, y:240},
    {x:215, y:320},
    {x:225, y:355},      // back near x-height
    // short exit: gentle forward descending to connect
    {x:240, y:310},
    {x:255, y:250},
]};

// w: entry + two pointed valleys + exit
LETTERS.w = { w: WW-20, path: [
    ...makeEntry(10),
    // first valley
    {x:72, y:300},
    {x:100, y:190},
    {x:125, y:80},
    {x:140, y:15},       // bottom point
    {x:158, y:80},
    {x:182, y:195},
    {x:205, y:310},
    {x:218, y:355},
    // second valley
    {x:232, y:300},
    {x:260, y:190},
    {x:285, y:80},
    {x:300, y:15},       // bottom point
    {x:318, y:80},
    {x:345, y:200},
    {x:368, y:320},
    {x:380, y:358},
    // short exit
    {x:395, y:310},
    {x:408, y:250},
]};

// y: entry + valley + descender loop
LETTERS.y = { w: W, path: [
    ...makeEntry(10),
    // valley
    {x:78, y:290},
    {x:98, y:170},
    {x:115, y:60},
    {x:128, y:10},
    {x:140, y:5},
    {x:155, y:20},
    {x:175, y:120},
    {x:198, y:270},
    {x:215, y:345},
    {x:225, y:360},
    // descend to descender
    {x:240, y:280},
    {x:252, y:160},
    {x:258, y:50},
    {x:258, y:0},
    ...makeDescLoop(258, 65),
]};

// --- UNIQUE LETTERS ---

// e: upstroke to mid-height, horizontal eye line, loop over top, exit
// The 'e' is like a small 'l' with the loop at x-height instead of ascender
LETTERS.e = { w: 240, path: [
    // upstroke from baseline
    {x:15, y:0},
    {x:30, y:80},
    {x:52, y:170},
    // horizontal eye line going right
    {x:80, y:190},
    {x:120, y:195},
    {x:165, y:195},      // right end of eye
    // curve up and over (CCW loop)
    {x:190, y:220},
    {x:205, y:275},
    {x:200, y:330},
    {x:175, y:358},
    {x:135, y:365},      // top of loop
    {x:90,  y:355},
    {x:55,  y:325},
    // descend left side
    {x:28, y:270},
    {x:15, y:200},
    {x:12, y:130},
    {x:22, y:55},
    {x:50, y:10},
    {x:95, y:0},         // baseline
    {x:140, y:10},
    // exit
    {x:178, y:55},
    {x:210, y:150},
    {x:232, y:260},
    {x:242, y:320},
]};

// s: sinuous S-curve
LETTERS.s = { w: 260, path: [
    // entry from baseline
    {x:10, y:0},
    {x:25, y:80},
    {x:48, y:180},
    {x:75, y:290},
    {x:105, y:348},
    {x:135, y:360},      // top of upper lobe
    // upper lobe: smooth rightward curve
    {x:168, y:352},
    {x:195, y:325},
    {x:200, y:285},
    {x:185, y:245},
    // S-crossing: gentle diagonal through center
    {x:155, y:210},
    {x:120, y:180},
    {x:85,  y:155},
    // lower lobe: smooth leftward curve
    {x:58,  y:125},
    {x:42,  y:88},
    {x:45,  y:48},
    {x:68,  y:18},
    {x:105, y:5},
    {x:148, y:5},        // baseline
    // exit
    ...makeExit(148, 0),
]};

// x: entry + downstroke + exit + cross
LETTERS.x = { w: 230, path: [
    ...makeEntry(10),
    // down
    {x:80, y:290},
    {x:102, y:170},
    {x:120, y:60},
    {x:135, y:15},
    {x:140, y:0},
    // exit
    ...makeExit(140, 0),
], secondary: [
    [{x:170, y:340}, {x:115, y:190}, {x:55, y:40}],
]};

// z: entry + overturn + descender
LETTERS.z = { w: 260, path: [
    ...makeEntry(10),
    // small overturn going right
    {x:80, y:358},
    {x:115, y:360},
    {x:150, y:355},
    {x:175, y:330},
    {x:185, y:290},
    {x:178, y:240},
    // descend through baseline to descender
    {x:165, y:170},
    {x:152, y:80},
    {x:145, y:20},
    {x:140, y:0},
    {x:135, y:-60},
    {x:125, y:-150},
    {x:118, y:-230},
    {x:115, y:-295},
    // loop back up
    {x:125, y:-290},
    {x:152, y:-250},
    {x:178, y:-170},
    {x:195, y:-70},
    {x:202, y:10},
    {x:205, y:50},
]};

// p: entry + descender stem + up + arch bowl + exit
LETTERS.p = { w: W, path: [
    ...makeEntry(10),
    // descend through baseline to descender
    {x:72, y:280},
    {x:82, y:160},
    {x:88, y:50},
    {x:88, y:0},
    {x:85, y:-60},
    {x:80, y:-150},
    {x:75, y:-230},
    {x:72, y:-295},
    // come back up — smooth retrace along same line
    {x:76, y:-200},
    {x:82, y:-80},
    {x:88, y:40},
    {x:96, y:160},
    {x:106, y:280},
    {x:118, y:350},
    {x:130, y:360},
    // bowl: smooth arch going right then curving down to baseline
    {x:160, y:355},
    {x:195, y:330},
    {x:222, y:280},
    {x:235, y:215},      // rightmost bulge
    {x:230, y:145},
    {x:210, y:75},
    {x:180, y:25},
    {x:150, y:5},
    // exit flowing right from baseline
    {x:180, y:8},
    {x:215, y:30},
    {x:245, y:80},
    {x:268, y:170},
    {x:280, y:280},
]};

// ============================================
// COMPOSER
// ============================================

function composeLetter(char, startX, style) {
    const s = merge(style);
    const def = LETTERS[char];
    if (!def) return null;

    let primary = def.path.map(p => ({ x: p.x, y: p.y }));
    primary = anchorX(primary, startX);
    primary = slantAll(primary, s.slant);

    const width = def.w;

    const secondary = [];
    if (def.secondary) {
        for (const sec of def.secondary) {
            let secPts = sec.map(p => ({ x: p.x, y: p.y }));
            secPts = anchorX(secPts, startX + sec[0].x - def.path[0].x);
            secondary.push(slantAll(secPts, s.slant));
        }
    }

    return { primary, secondary, width };
}

function composeWord(word, startX, style) {
    const s = merge(style);
    const allPrimary = [];
    const allSecondary = [];
    let curX = startX;

    for (let i = 0; i < word.length; i++) {
        const ch = word[i];
        if (ch === ' ') { curX += 150; continue; }

        const letter = composeLetter(ch, curX, s);
        if (!letter || !letter.primary.length) continue;

        let pts = letter.primary;
        if (allPrimary.length > 0) {
            const prev = last(allPrimary);
            // Skip baseline portion of next letter's entry when connecting
            // Find first point above connection threshold (halfway to prev exit height)
            const connY = Math.min(prev.y, 200);
            let skipTo = 0;
            for (let j = 1; j < pts.length - 2; j++) {
                if (pts[j].y >= connY) { skipTo = j; break; }
            }
            pts = pts.slice(skipTo);

            const next = pts[0];
            const dx = next.x - prev.x;
            const dy = next.y - prev.y;
            allPrimary.push(
                { x: prev.x + dx * 0.25, y: prev.y + dy * 0.25 },
                { x: prev.x + dx * 0.50, y: prev.y + dy * 0.50 },
                { x: prev.x + dx * 0.75, y: prev.y + dy * 0.75 },
            );
        }

        allPrimary.push(...pts);
        if (letter.secondary) allSecondary.push(...letter.secondary);
        curX += letter.width + 25;
    }

    return { primary: allPrimary, secondary: allSecondary, width: curX - startX };
}

function buildPrimitiveFont(style) {
    const s = merge(style), glyphs = {};
    const round = v => Math.round(v * 10) / 10;
    for (let c = 97; c <= 122; c++) {
        const ch = String.fromCharCode(c);
        const result = composeLetter(ch, 0, s);
        if (!result) continue;
        const strokes = [result.primary.map(p => [round(p.x), round(p.y)])];
        for (const sec of result.secondary) {
            strokes.push(sec.map(p => [round(p.x), round(p.y)]));
        }
        glyphs[ch] = { strokes, width: Math.round(result.width) };
    }
    return glyphs;
}

// ============================================
// EXPORTS
// ============================================
const CursivePrimitives = {
    DESC, BASE, XHT, ASC, DEFAULT_STYLE,
    LETTERS, composeLetter, composeWord, buildPrimitiveFont,
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = CursivePrimitives;
} else {
    root.CursivePrimitives = CursivePrimitives;
}
})(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : this);
