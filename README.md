# Khanya ✨

**C++ in South African languages.** Write programs for robots, Arduino, embedded systems and PCs in isiZulu, Afrikaans (more coming), with the full speed of C++.

```
inombolo okuyinhloko() {                 heelgetal hoof() {
    bhala << "Sawubona!" << umugqa;           skryf << "Hallo!" << nuwereël;
    buyisa 0;                                 terug 0;
}                                         }
```

## How it works and why it's as fast as C++

Khanya translates your program, word for word, into standard C++ and then uses a real C++ compiler (g++, clang, avr-g++, arm-none-eabi-g++, ESP32 toolchains). Because the final program *is* C++, there is no slowdown. It also runs on any chip that has a C++ compiler and works with every C++ and Arduino library.

- Only whole keywords are translated. Text inside strings and comments, numbers and header names are never changed.
- Normal English C++ still works, so you can mix it in or paste existing code.
- Compiler errors point to **your `.kh` file and line**, and the code they quote uses **your language's keywords**.

## Quick start

```bash
node bin/khanya.js run examples/sawubona.zu.kh
node bin/khanya.js keywords zu        # see every isiZulu keyword
```

File names carry the language: `program.zu.kh` (isiZulu) or `program.af.kh` (Afrikaans).

### Robots and embedded

```bash
# Arduino IDE / PlatformIO: export a sketch
node bin/khanya.js translate examples/irobhothi.zu.kh -o irobhothi/irobhothi.ino
# Or compile straight to a microcontroller toolchain
node bin/khanya.js build robot.zu.kh --cxx avr-g++ -- -mmcu=atmega328p -Os
```

## VS Code extension

```bash
npm run package-extension
code --install-extension khanya-0.1.0.vsix
```

The extension provides syntax highlighting, hover translations (hover `uma` → C++ `if`), completion, error checking when you save, a ▶ Run button, a live "Show C++" side view and "Export for Arduino".

## Adding a language

Copy `languages/zu.json` to e.g. `languages/xh.json`, translate the left-hand words, and run `npm test`. The tests check that there are no duplicates and that every word maps to a real C++ keyword. The VS Code highlighting is generated from these files.

Every local word must be **one token** (use `_` instead of spaces) and must not clash with common identifiers.

## Status

The keyword tables are **drafts**. They need review by native speakers and educators so the words feel natural and consistent.
