#!/bin/bash
# SquigWord Preflight Checks
# Run before marking any task as "done"

set -e

echo "=== SquigWord Preflight ==="

# Check HTML syntax (basic)
echo "Checking HTML files..."
for f in *.html; do
  if [ -f "$f" ]; then
    # Check for unclosed tags (basic)
    if grep -q "<script" "$f" && ! grep -q "</script>" "$f"; then
      echo "FAIL: Unclosed <script> in $f"
      exit 1
    fi
    echo "  $f: OK"
  fi
done

# Check for console.log left in production
echo "Checking for debug statements..."
if grep -r "console\.log" squigword.html 2>/dev/null | grep -v "// debug"; then
  echo "WARNING: console.log found in production file"
fi

echo ""
echo "=== Preflight PASSED ==="
