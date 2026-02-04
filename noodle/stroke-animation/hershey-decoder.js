/**
 * Hershey Font Decoder
 * Converts Hershey vector font format to drawable coordinate arrays
 *
 * Format explanation:
 * - First two chars define left/right margins (not drawn)
 * - Remaining chars are coordinate pairs
 * - Each char represents offset from ASCII 'R' (82)
 * - ' R' (space + R) means pen up (start new stroke)
 */

// Hershey Script Simplex lowercase a-z raw data
const HERSHEY_SCRIPT_SIMPLEX = {
  'a': 'L\\UUTSRRPRNSMTLVLXMZO[Q[SZTXVRUWUZV[W[YZZY\\V',
  'b': 'M[MVOSRNSLTITGSFQGPIOMNTNZO[P[RZTXUUURVVWWYW[V',
  'c': 'MXTTTSSRQROSNTMVMXNZP[S[VYXV',
  'd': 'L\\UUTSRRPRNSMTLVLXMZO[Q[SZTXZF RVRUWUZV[W[YZZY\\V',
  'e': 'NXOYQXRWSUSSRRQROSNUNXOZQ[S[UZVYXV',
  'f': 'OWOVSQUNVLWIWGVFTGSIQQNZKaJdJfKgMfNcOZP[R[TZUYWV',
  'g': 'L[UUTSRRPRNSMTLVLXMZO[Q[SZTY RVRTYPdOfMgLfLdMaP^S\\U[XY[V',
  'h': 'M\\MVOSRNSLTITGSFQGPIOMNSM[ RM[NXOVQSSRURVSVUUXUZV[W[YZZY\\V',
  'i': 'PWSMSNTNTMSM RPVRRPXPZQ[R[TZUYWV',
  'j': 'PWSMSNTNTMSM RPVRRLdKfIgHfHdIaL^O\\Q[TYWV',
  'k': 'M[MVOSRNSLTITGSFQGPIOMNSM[ RM[NXOVQSSRURVSVUTVQV RQVSWTZU[V[XZYY[V',
  'l': 'OWOVQSTNULVIVGUFSGRIQMPTPZQ[R[TZUYWV',
  'm': 'E^EVGSIRJSJTIXH[ RIXJVLSNRPRQSQTPXO[ RPXQVSSURWRXSXUWXWZX[Y[[Z\\Y^V',
  'n': 'J\\JVLSNROSOTNXM[ RNXOVQSSRURVSVUUXUZV[W[YZZY\\V',
  'o': 'LZRRPRNSMTLVLXMZO[Q[SZTYUWUUTSRRQSQURWTXWXYWZV',
  'p': 'KZKVMSNQMUGg RMUNSPRRRTSUUUWTYSZQ[ RMZO[R[UZWYZV',
  'q': 'L[UUTSRRPRNSMTLVLXMZO[Q[SZ RVRUUSZPaOdOfPgRfScS\\U[XY[V',
  'r': 'MZMVOSPQPSSSTTTVSYSZT[U[WZXYZV',
  's': 'NYNVPSQQQSSVTXTZR[ RNZP[T[VZWYYV',
  't': 'OXOVQSSO RVFPXPZQ[S[UZVYXV RPNWN',
  'u': 'L[LVNRLXLZM[O[QZSXUU RVRTXTZU[V[XZYY[V',
  'v': 'L[LVNRMWMZN[O[RZTXUUUR RURVVWWYW[V',
  'w': 'I^LRJTIWIYJ[L[NZPX RRRPXPZQ[S[UZWXXUXR RXRYVZW\\W^V',
  'x': 'JZJVLSNRPRQSQZR[U[XYZV RWSVRTRSSOZN[L[KZ',
  'y': 'L[LVNRLXLZM[O[QZSXUU RVRPdOfMgLfLdMaP^S\\U[XY[V',
  'z': 'LZLVNSPRRRTTTVSXQZN[P\\Q^QaPdOfMgLfLdMaP^S\\WYZV'
};

/**
 * Decode a Hershey glyph string into strokes
 * @param {string} data - Raw Hershey data string
 * @returns {Object} - { bounds: {left, right}, strokes: [[[x,y], ...], ...] }
 */
function decodeHershey(data) {
  const R = 82; // ASCII 'R' is the origin

  // First two chars are left and right margins
  const leftMargin = data.charCodeAt(0) - R;
  const rightMargin = data.charCodeAt(1) - R;

  const strokes = [];
  let currentStroke = [];

  // Process remaining characters as coordinate pairs
  let i = 2;
  while (i < data.length) {
    // Check for pen-up command (space followed by R)
    if (data[i] === ' ' && data[i + 1] === 'R') {
      // End current stroke, start new one
      if (currentStroke.length > 0) {
        strokes.push(currentStroke);
        currentStroke = [];
      }
      i += 2;
      continue;
    }

    // Decode coordinate pair
    const x = data.charCodeAt(i) - R;
    const y = data.charCodeAt(i + 1) - R;
    currentStroke.push([x, y]);
    i += 2;
  }

  // Don't forget the last stroke
  if (currentStroke.length > 0) {
    strokes.push(currentStroke);
  }

  return {
    bounds: { left: leftMargin, right: rightMargin },
    strokes: strokes
  };
}

/**
 * Normalize strokes to 0-1 coordinate space
 * @param {Object} glyph - Decoded glyph from decodeHershey
 * @param {boolean} flipY - Whether to flip Y axis (Hershey Y increases downward)
 * @returns {Object} - Normalized glyph data
 */
function normalizeGlyph(glyph, flipY = true) {
  // Find bounding box
  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;

  for (const stroke of glyph.strokes) {
    for (const [x, y] of stroke) {
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }
  }

  const width = maxX - minX || 1;
  const height = maxY - minY || 1;

  // Normalize strokes
  const normalizedStrokes = glyph.strokes.map(stroke =>
    stroke.map(([x, y]) => [
      (x - minX) / width,
      flipY ? 1 - (y - minY) / height : (y - minY) / height
    ])
  );

  return {
    bounds: glyph.bounds,
    width: glyph.bounds.right - glyph.bounds.left,
    strokes: normalizedStrokes,
    originalBounds: { minX, maxX, minY, maxY }
  };
}

/**
 * Get all decoded and normalized Hershey Script Simplex letters
 */
function getHersheyScriptFont() {
  const font = {};
  for (const [char, data] of Object.entries(HERSHEY_SCRIPT_SIMPLEX)) {
    const decoded = decodeHershey(data);
    font[char] = normalizeGlyph(decoded);
  }
  return font;
}

/**
 * Convert strokes to SVG path data
 * @param {Array} strokes - Array of strokes, each stroke is array of [x,y] points
 * @param {number} scale - Scale factor
 * @param {number} offsetX - X offset
 * @param {number} offsetY - Y offset
 * @returns {string} - SVG path data
 */
function strokesToSVGPath(strokes, scale = 100, offsetX = 0, offsetY = 0) {
  let path = '';
  for (const stroke of strokes) {
    if (stroke.length === 0) continue;

    const [firstX, firstY] = stroke[0];
    path += `M ${firstX * scale + offsetX} ${firstY * scale + offsetY} `;

    for (let i = 1; i < stroke.length; i++) {
      const [x, y] = stroke[i];
      path += `L ${x * scale + offsetX} ${y * scale + offsetY} `;
    }
  }
  return path.trim();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    HERSHEY_SCRIPT_SIMPLEX,
    decodeHershey,
    normalizeGlyph,
    getHersheyScriptFont,
    strokesToSVGPath
  };
}

// Demo: decode and print letter 'a'
if (typeof window === 'undefined') {
  console.log('=== Hershey Script Decoder Demo ===\n');

  const font = getHersheyScriptFont();

  console.log('Letter "a":');
  console.log('  Original bounds:', font.a.originalBounds);
  console.log('  Width:', font.a.width);
  console.log('  Number of strokes:', font.a.strokes.length);
  console.log('  First stroke points:', font.a.strokes[0].length);
  console.log('  First 3 normalized points:', font.a.strokes[0].slice(0, 3));

  console.log('\nLetter "i":');
  console.log('  Number of strokes:', font.i.strokes.length, '(body + dot)');

  console.log('\nAll letters decoded successfully!');
}
