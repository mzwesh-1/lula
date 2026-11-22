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

## What's covered: the whole language

| | isiZulu | Afrikaans |
|---|---|---|
| C++ keywords (all 96, up to C++20: `static_cast`, `decltype`, `concept`, `co_await`, ...) | ✅ | ✅ |
| Preprocessor directives (all 15) | ✅ | ✅ |
| Header names (`#faka <iqoqo>` = `#include <vector>`) | 39 | 39 |
| Standard library: I/O, files, containers, algorithms, math, strings, smart pointers, exceptions, threads, fixed-width ints | ✅ | ✅ |
| Member functions (`v.engeza_ekugcineni()` = `v.push_back()`) | ✅ | ✅ |
| Arduino / robots (`setha_iphini`, `linda`, `Isiriyeli.bonisa_umugqa`) | ✅ | ✅ |

Full word lists: **[docs/zu.md](docs/zu.md)** and **[docs/af.md](docs/af.md)**, or run `khanya keywords zu`.
`examples/konke.zu.kh` and `examples/alles.af.kh` use almost every feature of C++ in one program.

Your own variable, function and class names can be in any language (`inombolo amamaki = 85;`).
Like C++ keywords, Khanya words are **reserved**: you can't name a variable `iqoqo`, because it means `std::vector`.

## Convert existing C++ (GeeksforGeeks, W3Schools, Arduino) into your language

```bash
node bin/khanya.js convert program.cpp --to zu -o program.zu.kh
node bin/khanya.js convert program.zu.kh --to af -o program.af.kh    # between languages
```

Keywords, library names, headers and member functions are all converted. Your own names, strings and comments stay as they are. If a C++ program has its own `count` variable, it's kept as `count` and not turned into `std::count`. In VS Code, right-click a C++ file and choose **Khanya: Convert C++ to Khanya**.

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
code --install-extension khanya-0.2.0.vsix
```

The extension provides syntax highlighting, hover translations (hover `uma` → C++ `if`), completion, error checking when you save, a ▶ Run button, a live "Show C++" side view, "Export for Arduino" and "Convert C++ to Khanya".

## Adding a language

Copy `languages/zu.json` to e.g. `languages/xh.json`, translate the left-hand words, and run `npm test`. The tests **fail unless the language covers all 96 C++ keywords, all directives, and the same library and headers as isiZulu**. They also convert a C++ program into the new language, compile it, and check that the output matches. The VS Code highlighting is generated from these files.

Every local word must be **one token** (use `_` instead of spaces) and must not clash with common identifiers.

## Status

The keyword tables are **drafts**. They need review by native speakers and educators so the words feel natural and consistent.
