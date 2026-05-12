#!/usr/bin/env bash
# Compress a hero MP4 to a web-friendly size before committing.
# Usage: ./scripts/optimize-hero-video.sh <input.mp4> [output.mp4]
# Default output: public/video/abc-place-hero.mp4
# Targets: H.264, ~1080p max, CRF 28, AAC 96k, faststart. Aim < 10 MB.

set -euo pipefail

IN="${1:-}"
OUT="${2:-public/video/abc-place-hero.mp4}"

if [[ -z "$IN" ]]; then
  echo "Usage: $0 <input.mp4> [output.mp4]" >&2
  exit 1
fi

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg not found. Install it (macOS: brew install ffmpeg)." >&2
  exit 1
fi

TMP="$(mktemp -t hero-XXXXXX).mp4"
trap 'rm -f "$TMP"' EXIT

echo "→ Compressing $IN"
ffmpeg -y -i "$IN" \
  -vf "scale='min(1920,iw)':'-2',fps=30" \
  -c:v libx264 -profile:v high -preset slow -crf 28 -pix_fmt yuv420p \
  -c:a aac -b:a 96k -ac 2 \
  -movflags +faststart \
  "$TMP"

SIZE_MB=$(( $(wc -c < "$TMP") / 1024 / 1024 ))
echo "→ Output size: ${SIZE_MB} MB"

if (( SIZE_MB > 100 )); then
  echo "✗ Still over 100 MB. Re-run with a higher CRF (e.g. 30–32) or shorter clip." >&2
  exit 1
fi

if (( SIZE_MB > 10 )); then
  echo "⚠ Larger than the 10 MB hero target. Consider trimming or raising CRF."
fi

mkdir -p "$(dirname "$OUT")"
mv "$TMP" "$OUT"
trap - EXIT
echo "✓ Wrote $OUT"