# SquigWord - Technical Specification

## Vision
Render beautiful casual script text using the **exact rendering technique** from Chromie Squiggles by Snowfro. Letters should look like squiggles that happen to be readable—not letters drawn with squiggle effects.

---

## Core Principle

**Port Snowfro's rendering loop exactly.** Feed it letter-shaped paths instead of wave-shaped paths. Same step counts, same circle sizes, same color math, same everything.

The magic of Squiggles comes from:
1. Dense overlapping circles along a Catmull-Rom spline
2. HSB color cycling as you traverse the path
3. Type-specific rendering (filled circles vs stroked rings vs particles)

We change ONLY the path shape. Everything else stays faithful to the original.

---

## Reference: Original Squiggle Rendering

```javascript
// From Snowfro's source - THIS IS WHAT WE PORT
colorMode(HSB, 255);

for (let segment = 0; segment < numSegments; segment++) {
  for (let i = 0; i <= steps; i++) {
    let t = i / steps;
    
    // Catmull-Rom interpolation
    let x = curvePoint(p0.x, p1.x, p2.x, p3.x, t);
    let y = curvePoint(p0.y, p1.y, p2.y, p3.y, t);
    
    // Color calculation
    let hue = reverse 
      ? 255 - (((colorCounter / spread) + startColor) % 255)
      : (((colorCounter / spread) + startColor) % 255);
    
    // Type-specific drawing
    if (slinky) {
      noFill();
      stroke(hue, 255, 255);
      strokeWeight(1.5);
      circle(x, y, diameter);  // STROKED RING
    } else {
      noStroke();
      fill(hue, 255, 255);
      circle(x, y, diameter);  // FILLED CIRCLE
    }
    
    colorCounter++;
  }
}
```

---

## Priority Types (in order)

### 1. Normal
- **What:** Dense overlapping filled circles creating smooth gradient rope
- **Steps:** 200 per segment (original value)
- **Circle size:** letterHeight / 13 (original ratio)
- **Key:** Circles overlap ~80%, creating solid rope appearance

### 2. Slinky
- **What:** Stroked rings (not filled) with visible overlap
- **Steps:** 50 per segment (original value) — THIS IS KEY
- **Ring size:** letterHeight / 10 to letterHeight / 8 (larger than Normal)
- **Stroke weight:** 1.5-2px (thin enough to see overlap)
- **Key:** Fewer steps = rings are spaced apart = you see individual rings
- **Endpoint caps:** Flat filled circles at path start/end (like real squiggles)

### 3. Ribbed
- **What:** Normal rendering + gray hole punched at intervals
- **Steps:** 200 (same as Normal)
- **Hole interval:** Every N circles (hash-determined, typically 8-15)
- **Hole color:** Gray (hash-determined, 0-255)
- **Hole size:** Slightly smaller than main circle

---

## Endpoint Caps

All types should have **flat filled circles** at path terminations:
- At the very start of a word path
- At the very end of a word path
- NOT between connected letters

Implementation:
```javascript
// After drawing entire path, cap the ends
const startPoint = pathPoints[0];
const endPoint = pathPoints[pathPoints.length - 1];

// Draw ~10-15 overlapping filled circles at each end
for (let i = 0; i < 12; i++) {
  const jitterX = (random() - 0.5) * capSize * 0.3;
  const jitterY = (random() - 0.5) * capSize * 0.3;
  ctx.beginPath();
  ctx.arc(startPoint.x + jitterX, startPoint.y + jitterY, capSize, 0, Math.PI * 2);
  ctx.fillStyle = startColor; // Use the hue at that point
  ctx.fill();
}
// Same for endPoint with endColor
```

---

## Letter Path Requirements

### Single Continuous Stroke Per Word
- Each word = ONE path from first letter to last
- Path flows left-to-right (matches reading direction = color flows correctly)
- No "jumps" or teleportation — every coordinate connects to the next
- Letters connect via natural cursive joins

### Secondary Passes (drawn AFTER main path)
1. **Crossbars:** t, f, T, F (horizontal strokes)
2. **Dots:** i, j (small filled blobs above)
3. **Disconnected strokes:** x (second diagonal), etc.

These continue the colorCounter so colors stay continuous.

### Casual Script Style
Think: Pacifico, Dancing Script, Lobster — friendly, flowing, legible

Key characteristics:
- Generous loops on ascenders (l, h, k, b)
- Smooth bowls on a, o, g, d
- Flowing connections between letters
- Consistent x-height
- Descenders (g, j, y, p, q) extend below baseline gracefully

---

## Letter Path Format

```javascript
const LETTERS = {
  'a': {
    // Normalized 0-1 coordinates, scaled at render time
    path: [
      [0.1, 0.6],   // entry point (connecting from previous letter)
      [0.2, 0.45],  // curve up into bowl
      [0.5, 0.4],   // top of bowl
      [0.8, 0.5],   // right side of bowl
      [0.8, 0.8],   // down
      [0.5, 1.0],   // bottom of bowl
      [0.2, 0.9],   // back up
      [0.2, 0.6],   // close bowl
      [0.5, 0.5],   // connect to stem
      [0.8, 0.7],   // down stem
      [0.9, 0.9],   // exit point (to next letter)
    ],
    width: 0.85,  // relative width for spacing
    // Entry/exit for connections
    entry: { x: 0.1, y: 0.6 },
    exit: { x: 0.9, y: 0.9 },
  },
  
  't': {
    path: [...],  // Main vertical stroke
    crossbar: [[0.2, 0.4], [0.7, 0.4]],  // Drawn in secondary pass
    width: 0.5,
  },
  
  'i': {
    path: [...],  // Main stroke
    dot: [0.5, 0.15],  // Position of dot, drawn in secondary pass
    width: 0.4,
  },
};
```

---

## Color System

### HSB Mode (matching original)
- H: 0-255 (hue)
- S: 255 (always full saturation)
- B: 255 (always full brightness)

### Color Counter
```javascript
let colorCounter = 0;  // GLOBAL across entire word

// For each circle drawn:
const hue = reverse 
  ? 255 - (((colorCounter / spread) + startColor) % 255)
  : (((colorCounter / spread) + startColor) % 255);
colorCounter++;
```

### Spread (controls cycle speed)
- From hash: `spread = decPairs[28] < 3 ? 0.5 : map(decPairs[28], 0, 255, 5, 50)`
- Low spread (0.5) = hyper rainbow (rapid cycling)
- High spread (50) = slow gradient

---

## Hash/Trait System

Use **xorshift32** exactly as original:

```javascript
function generateHash(seed) {
  const pairs = [];
  let s = (Math.abs(seed) ^ 0xDEADBEEF) >>> 0;  // Mix constant is critical
  for (let i = 0; i < 32; i++) {
    s ^= s << 13;
    s ^= s >>> 17;  // UNSIGNED right shift
    s ^= s << 5;
    s = s >>> 0;    // Force unsigned
    pairs.push(s % 256);
  }
  return pairs;
}
```

### Trait Extraction
| Trait | Hash Index | Logic |
|-------|-----------|-------|
| Type | decPairs[31] | >=251: Pipe, >=239: Bold, >=219: Ribbed, >=192: Fuzzy, >=162: Slinky, else: Normal |
| Spread | decPairs[28] | <3 ? 0.5 : map(5-50) |
| Start Color | decPairs[29] | 0-255 |
| Reverse | decPairs[30] | <128 = true |
| Ribbed Interval | decPairs[24] | map(0-230 → 3-20) |
| Ribbed Gray | decPairs[25] | 0-255 grayscale |

---

## Rendering Pipeline

### Phase 1: Build Word Path
```javascript
function buildWordPath(text, font, startX, startY, letterHeight) {
  let path = [];
  let currentX = startX;
  let secondaryPaths = { crossbars: [], dots: [] };
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const letter = font[char];
    if (!letter) continue;
    
    const letterWidth = letter.width * letterHeight;
    
    // Add connector from previous letter if needed
    if (i > 0 && path.length > 0) {
      // Simple curve connector between exit and entry
      path.push(/* midpoint connector */);
    }
    
    // Add letter path points (scaled)
    for (const pt of letter.path) {
      path.push([
        currentX + pt[0] * letterWidth,
        startY + pt[1] * letterHeight
      ]);
    }
    
    // Collect secondary elements
    if (letter.crossbar) {
      secondaryPaths.crossbars.push(
        letter.crossbar.map(pt => [
          currentX + pt[0] * letterWidth,
          startY + pt[1] * letterHeight
        ])
      );
    }
    if (letter.dot) {
      secondaryPaths.dots.push([
        currentX + letter.dot[0] * letterWidth,
        startY + letter.dot[1] * letterHeight
      ]);
    }
    
    currentX += letterWidth + LETTER_SPACING;
  }
  
  return { mainPath: path, secondary: secondaryPaths };
}
```

### Phase 2: Render Main Path
```javascript
function renderPath(path, type, traits) {
  const { startColor, reverse, spread, steps } = traits;
  let colorCounter = 0;
  
  // Pad for Catmull-Rom
  const padded = [path[0], ...path, path[path.length - 1]];
  
  for (let seg = 0; seg < padded.length - 3; seg++) {
    const [p0, p1, p2, p3] = padded.slice(seg, seg + 4);
    
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = curvePoint(p0[0], p1[0], p2[0], p3[0], t);
      const y = curvePoint(p0[1], p1[1], p2[1], p3[1], t);
      
      const hue = reverse 
        ? 255 - (((colorCounter / spread) + startColor) % 255)
        : (((colorCounter / spread) + startColor) % 255);
      const [r, g, b] = hsbToRgb(hue, 255, 255);
      
      drawCircle(x, y, type, r, g, b, traits);
      colorCounter++;
    }
  }
  
  return colorCounter;  // For continuing into secondary passes
}
```

### Phase 3: Render Secondary Elements
```javascript
// Crossbars - same rendering as main path
for (const crossbar of secondary.crossbars) {
  colorCounter = renderPath(crossbar, type, traits, colorCounter);
}

// Dots - cluster of overlapping circles
for (const dot of secondary.dots) {
  drawDot(dot, type, colorCounter, traits);
  colorCounter += dotCircleCount;  // Advance color appropriately
}
```

### Phase 4: Endpoint Caps
```javascript
// Draw filled circles at word start and end
drawEndcap(path[0], startHue, circleSize);
drawEndcap(path[path.length - 1], endHue, circleSize);
```

---

## Type-Specific Drawing

```javascript
function drawCircle(x, y, type, r, g, b, traits) {
  const { circleSize, ribbedInterval, ribbedGray } = traits;
  
  switch (type) {
    case 'Normal':
      ctx.beginPath();
      ctx.arc(x, y, circleSize, 0, Math.PI * 2);
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fill();
      break;
      
    case 'Slinky':
      ctx.beginPath();
      ctx.arc(x, y, circleSize * 1.2, 0, Math.PI * 2);  // Larger rings
      ctx.strokeStyle = `rgb(${r},${g},${b})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();  // NO FILL - stroked ring only
      break;
      
    case 'Ribbed':
      // Draw normal circle
      ctx.beginPath();
      ctx.arc(x, y, circleSize, 0, Math.PI * 2);
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fill();
      // Punch hole at intervals
      if (colorCounter % ribbedInterval === 0) {
        ctx.beginPath();
        ctx.arc(x, y, circleSize * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${ribbedGray},${ribbedGray},${ribbedGray})`;
        ctx.fill();
      }
      break;
  }
}
```

---

## Critical Parameters

| Parameter | Normal | Slinky | Ribbed |
|-----------|--------|--------|--------|
| Steps per segment | 200 | 50 | 200 |
| Circle size | H/13 | H/10 to H/8 | H/13 |
| Fill/Stroke | Fill | Stroke only | Fill + hole |
| Stroke weight | N/A | 1.5px | N/A |

**H = letterHeight**

---

## Implementation Order

1. **Port Snowfro's rendering loop** — get Normal working first
2. **Create 5-10 test letters** — a, e, i, o, u, l, n, s, t, g
3. **Test with "squiggle"** — validates connections and flow
4. **Add Slinky** — just change steps and use stroke instead of fill
5. **Add Ribbed** — Normal + hole punching
6. **Add endpoint caps**
7. **Add secondary passes** (dots, crossbars)
8. **Complete alphabet**
9. **Polish UI**

---

## What NOT to Do

1. ❌ Don't invent new rendering approaches
2. ❌ Don't use complex spacing algorithms — keep it simple
3. ❌ Don't add "improvements" to the circle drawing
4. ❌ Don't change step counts without testing
5. ❌ Don't fill Slinky circles — they must be stroked rings
6. ❌ Don't reset colorCounter per letter — it's GLOBAL per word

---

## Success Criteria

1. **Normal** looks like a smooth gradient rope (no gaps, no visible circles)
2. **Slinky** shows distinct overlapping rings like a spring
3. **Ribbed** has visible gray dots breaking up the color
4. Colors flow continuously across entire word
5. Letters are clearly legible
6. Endpoints have flat filled caps

---

## Testing Checklist

- [ ] "hello" — tests connections, double letters
- [ ] "squiggle" — tests various letter shapes
- [ ] "jiffy" — tests dots, descenders
- [ ] "tittle" — tests crossbars, repeated letters
- [ ] Try 20 random seeds — verify type distribution
- [ ] Force Slinky — can you see individual rings?
- [ ] Force Ribbed — can you see gray holes?
