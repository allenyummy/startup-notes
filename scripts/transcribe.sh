#!/usr/bin/env bash
# Transcribe a podcast episode (audio URL or local file) with whisper.cpp.
# Usage: scripts/transcribe.sh <audio-url-or-file> [language=zh] [prompt]
# Requires: brew install whisper-cpp ffmpeg
set -euo pipefail
SRC="$1"; LANG_CODE="${2:-zh}"; PROMPT="${3:-}"
WORK="${WORK_DIR:-$(mktemp -d)}"
MODEL="${WHISPER_MODEL:-$HOME/.cache/whisper/ggml-large-v3-turbo-q5_0.bin}"
if [[ ! -f "$MODEL" ]]; then
  mkdir -p "$(dirname "$MODEL")"
  curl -L -o "$MODEL" https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-large-v3-turbo-q5_0.bin
fi
if [[ "$SRC" =~ ^https?:// ]]; then curl -sL -o "$WORK/audio" "$SRC"; SRC="$WORK/audio"; fi
ffmpeg -loglevel error -y -i "$SRC" -ar 16000 -ac 1 "$WORK/audio.wav"
whisper-cli -m "$MODEL" -f "$WORK/audio.wav" -l "$LANG_CODE" -otxt -of "$WORK/transcript" ${PROMPT:+--prompt "$PROMPT"} >/dev/null 2>&1
echo "$WORK/transcript.txt"
