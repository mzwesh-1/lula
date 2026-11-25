#!/bin/bash
# Proves every textbook example: builds it for the Arduino Mega 2560 in C++ and all ten languages,
# checks that every language gives byte-for-byte the same program as the C++, and runs each one in the
# simavr simulator to record what it prints on Serial (docs/textbook/outputs.json).
#   Needs: arduino-cli with the arduino:avr core and the kit libraries, simavr, node.
#   bash scripts/prove-textbook.sh [WORKDIR]
set -u
ROOT=$(cd "$(dirname "$0")/.." && pwd)
W=${1:-$(mktemp -d)}
LIB=$ROOT/arduino-library/Soga
rm -rf "$W/sketches" "$W/out" "$W/sim"; mkdir -p "$W/out" "$W/sim"
node "$ROOT/scripts/build-arduino-library.js" >/dev/null
node "$ROOT/scripts/build-textbook.js" --sketches "$W/sketches" || exit 1
: > "$W/hashes.txt"; : > "$W/fail.txt"
for L in cpp zu xh ss nr st tn nso ts ve af; do
  for d in "$W/sketches/$L"/*/; do
    n=$(basename "$d"); o="$W/out/$L/$n"
    if out=$(arduino-cli compile --no-color -b arduino:avr:mega --library "$LIB" --output-dir "$o" "$d" 2>&1) && [ -f "$o/$n.ino.hex" ]; then
      echo "$L $n $(sha1sum < "$o/$n.ino.hex" | cut -c1-12)" >> "$W/hashes.txt"
    else
      echo "FAIL $L $n" >> "$W/fail.txt"; echo "$out" | grep -E "error" | head -3 >> "$W/fail.txt"
    fi
  done
  echo "$L: $(grep -c "^$L " "$W/hashes.txt") compiled"
done
for d in "$W/out/cpp"/*/; do
  n=$(basename "$d")
  timeout -s INT 4 stdbuf -o0 simavr -m atmega2560 -f 16000000 "$d/$n.ino.elf" 2>&1 | sed -e 's/\x1b\[[0-9;]*m//g' | grep -v "^Loaded\|signal caught" > "$W/sim/$n.txt"
done
node "$ROOT/scripts/check-textbook-proof.js" "$W" "$ROOT/docs/textbook/outputs.json"
[ -s "$W/fail.txt" ] && { echo "Build failures:"; cat "$W/fail.txt"; exit 1; }
node "$ROOT/scripts/build-textbook.js"
