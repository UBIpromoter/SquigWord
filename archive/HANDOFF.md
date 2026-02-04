# SquigWord Handoff - In Progress

**Date:** February 2, 2026
**Status:** STILL WORKING - Connector logic being fixed

---

## Current Problem

Letters render but **connectors between letters** create ugly lines. The issue:

1. FONT_SMOOTH paths were hand-authored without proper cursive flow
2. Exit/entry metadata doesn't match where strokes actually end
3. Connectors were drawing diagonal lines across the canvas

## What We've Tried This Session

| Attempt | Result |
|---------|--------|
| Integrated Hershey cursive data | Data is correct but still had connector issues |
| Replaced Catmull-Rom with linear interpolation | Fixed wild curve loops, but connectors still bad |
| Disabled connectors entirely | Letters separate - user wants connected cursive |
| **Current:** Track actual path endpoints | Testing now - connectors curve through baseline |

## Current State of Code

### Latest Change (Testing)
```javascript
// Track ACTUAL last point, not metadata
lastPoint = transformedPath[transformedPath.length - 1];

// Connector curves through baseline
currentPath.push([midX, baselineY]);
```

This matches how `hershey-test.html` successfully connects letters.

---

## Key Files

| File | Status | Notes |
|------|--------|-------|
| `squigword.html` | IN PROGRESS | Main app, connector logic being fixed |
| `hershey-test.html` | WORKING | Reference implementation - connectors work here |
| `LESSONS.md` | Current | |
| `PLAN.md` | Outdated | Original plan, needs update after we succeed |

---

## The Core Issue

**FONT_SMOOTH** (hand-authored) has paths that:
- Jump around non-sequentially
- End in unexpected places
- Don't flow left-to-right like real cursive

**Hershey Cursive** data is better because it was designed for pen plotters (continuous single strokes).

---

## Next Steps

1. Test current connector fix (actual endpoints + baseline curve)
2. If still broken, may need to:
   - Rewrite FONT_SMOOTH with proper cursive flow
   - Or use Hershey cursive exclusively and abandon hand-authored fonts
3. Verify all 6 render types work once paths are correct

---

## Quick Test

1. Open `squigword.html`
2. Type "squiggles" (lowercase)
3. Check S→q→u transitions - should curve smoothly through baseline
4. Compare to `hershey-test.html` which renders correctly
