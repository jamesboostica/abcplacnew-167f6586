#!/usr/bin/env bash
# Block commits/pushes containing files larger than 100 MB.
# Used by .husky/pre-commit and .husky/pre-push.

set -euo pipefail

MAX_BYTES=$((100 * 1024 * 1024))
FAIL=0

# Staged files (pre-commit) — falls back to tracked files if nothing staged.
FILES=$(git diff --cached --name-only --diff-filter=ACM 2>/dev/null || true)
if [[ -z "$FILES" ]]; then
  FILES=$(git ls-files)
fi

while IFS= read -r f; do
  [[ -z "$f" || ! -f "$f" ]] && continue
  SIZE=$(wc -c < "$f")
  if (( SIZE > MAX_BYTES )); then
    MB=$(( SIZE / 1024 / 1024 ))
    echo "✗ $f is ${MB} MB (limit 100 MB)" >&2
    FAIL=1
  fi
done <<< "$FILES"

if (( FAIL == 1 )); then
  cat >&2 <<'EOF'

GitHub rejects any push containing a file > 100 MB (even in history).
Fix options:
  • Compress hero videos:  npm run media:hero -- path/to/source.mp4
  • Move large assets to external storage / CDN
  • If already committed, see docs/github-history-recovery.md
EOF
  exit 1
fi

exit 0