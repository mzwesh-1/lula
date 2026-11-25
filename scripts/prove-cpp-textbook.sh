#!/bin/bash
# Proves the C++ (VS Code) textbook: every lesson is compiled and RUN in C++ and in all ten languages
# (through `soga run`, as VS Code runs it), with the same typed input, and every language must print
# exactly what the C++ prints. Writes docs/cpp-textbook/outputs.json with the real output of each lesson.
#   Needs: g++ (C++17) and node.      bash scripts/prove-cpp-textbook.sh [WORKDIR]
set -u
ROOT=$(cd "$(dirname "$0")/.." && pwd)
W=${1:-$(mktemp -d)}
rm -rf "$W/src" "$W/run" "$W/out"; mkdir -p "$W/run" "$W/out"
node "$ROOT/scripts/build-textbook.js" --book cpp --sketches "$W/src" || exit 1
SOGA="node $ROOT/bin/soga.js"
pass=0; fail=0; : > "$W/failures.txt"
for cppfile in "$W/src/cpp"/*.cpp; do
  id=$(basename "$cppfile" .cpp)
  input="$W/src/cpp/$id.stdin"; [ -f "$input" ] || input=/dev/null
  d="$W/run/$id-cpp"; mkdir -p "$d"
  if ! g++ -std=c++17 -O1 -o "$d/prog" "$cppfile" 2> "$W/out/$id.cpp.err"; then
    echo "FAIL $id (C++ does not compile)" >> "$W/failures.txt"; cat "$W/out/$id.cpp.err" >> "$W/failures.txt"; fail=$((fail + 1)); continue
  fi
  (cd "$d" && timeout 10 ./prog < "$input" > "$W/out/$id.cpp.txt" 2>&1)
  for L in zu xh ss nr st tn nso ts ve af; do
    d="$W/run/$id-$L"; mkdir -p "$d"; cp "$W/src/$L/$id.$L.soga" "$d/"
    (cd "$d" && timeout 60 $SOGA run "$id.$L.soga" < "$input" > "$W/out/$id.$L.txt" 2>&1)
    if cmp -s "$W/out/$id.cpp.txt" "$W/out/$id.$L.txt"; then pass=$((pass + 1)); else
      fail=$((fail + 1)); echo "FAIL $id ($L): output differs from C++" >> "$W/failures.txt"
      diff "$W/out/$id.cpp.txt" "$W/out/$id.$L.txt" | head -6 >> "$W/failures.txt"
    fi
  done
  echo "$id done" >> "$W/progress.txt"
done
node -e '
const fs=require("fs"),path=require("path");const W=process.argv[1],out={};
for (const f of fs.readdirSync(path.join(W,"out")).filter(f=>f.endsWith(".cpp.txt"))) out[f.replace(/\.cpp\.txt$/,"")]=fs.readFileSync(path.join(W,"out",f),"utf8").replace(/\s+$/,"");
fs.writeFileSync(process.argv[2],JSON.stringify(out,null,1));' "$W" "$ROOT/docs/cpp-textbook/outputs.json"
echo "language runs identical to C++: $pass   different or failed: $fail"
[ "$fail" -eq 0 ] || { cat "$W/failures.txt"; exit 1; }
node "$ROOT/scripts/build-textbook.js" --book cpp
