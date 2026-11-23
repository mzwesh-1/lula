# Lula ✨

*Lula* means "easy" in isiZulu and isiXhosa.

**C++ in South African languages.** Write programs for robots, Arduino, embedded systems and PCs in **all ten written official South African languages**, with the full speed of C++.

```
inombolo okuyinhloko() {                 heelgetal hoof() {
    bhala << "Sawubona!" << umugqa;           skryf << "Hallo!" << nuwereël;
    buyisa 0;                                 terug 0;
}                                         }
```

## How it works and why it's as fast as C++

Lula translates your program, word for word, into standard C++ and then uses a real C++ compiler (g++, clang, avr-g++, arm-none-eabi-g++, ESP32 toolchains). Because the final program *is* C++, there is no slowdown. It also runs on any chip that has a C++ compiler and works with every C++ and Arduino library.

- Only whole keywords are translated. Text inside strings and comments, numbers and header names are never changed.
- Normal English C++ still works, so you can mix it in or paste existing code.
- Compiler errors point to **your `.lula` file and line**, and the code they quote uses **your language's keywords**.

## What's covered: the whole language, in all 10 written official languages

| Code | Language | File name | `if` / `return` / print |
|---|---|---|---|
| `zu` | isiZulu | `robot.zu.lula` | `uma` / `buyisa` / `bhala` |
| `xh` | isiXhosa | `robot.xh.lula` | `ukuba` / `buyisa` / `bhala` |
| `ss` | siSwati | `robot.ss.lula` | `nangabe` / `buyisa` / `bhala` |
| `nr` | isiNdebele | `robot.nr.lula` | `nangabe` / `buyisa` / `tlola` |
| `st` | Sesotho | `robot.st.lula` | `haeba` / `kgutlisa` / `ngola` |
| `tn` | Setswana | `robot.tn.lula` | `fa` / `busa` / `kwala` |
| `nso` | Sepedi | `robot.nso.lula` | `ge` / `bušetša` / `ngwala` |
| `ts` | Xitsonga | `robot.ts.lula` | `loko` / `vuyisa` / `tsala` |
| `ve` | Tshivenḓa | `robot.ve.lula` | `arali` / `vhuisa` / `nwala` |
| `af` | Afrikaans | `robot.af.lula` | `as` / `terug` / `skryf` |

English is C++ itself. Plain C++ keeps working in every language.

Every language covers all **96 C++ keywords** (up to C++20), all **15 preprocessor directives**, **39 header names**, and **188 standard-library, member-function and Arduino names**:
I/O, files, containers, algorithms, math, strings, smart pointers, exceptions, threads, fixed-width ints, `.push_back()`-style members, and `pinMode`/`digitalWrite`/`Serial`.
The test suite enforces this: a language that's missing even one word fails.

Full word lists: [docs/zu.md](docs/zu.md), [xh](docs/xh.md), [ss](docs/ss.md), [nr](docs/nr.md), [st](docs/st.md), [tn](docs/tn.md), [nso](docs/nso.md), [ts](docs/ts.md), [ve](docs/ve.md), [af](docs/af.md). Or run `lula keywords xh`.
`examples/konke.zu.lula` and `examples/alles.af.lula` use almost every feature of C++ in one program.

Your own variable, function and class names can be in any language (`inombolo amamaki = 85;`).
Like C++ keywords, Lula words are **reserved**: you can't name a variable `iqoqo`, because it means `std::vector`.

## Libraries: ROS 2, OpenCV, Eigen, CUDA, PyTorch and Arduino

Lula has **library packs** with names in all ten languages. A pack switches on when you include its header,
in your language or in English, so its words are only reserved when you use that library.

| Pack | Include (isiZulu) | Example words (isiZulu → C++) | Tested here against |
|---|---|---|---|
| ROS 2 | `#faka <ros2>` | `Ifindo` → `rclcpp::Node`, `dala_umsakazi` → `create_publisher`, `sakaza` → `publish` | translation snapshot (ROS 2 not installable here) |
| OpenCV | `#faka <umbono>` | `Isithombe` → `cv::Mat`, `funda_isithombe` → `imread`, `thola_izinhlaka` → `findContours` | **real OpenCV 4.6** |
| Eigen | `#faka <amamatriki>` | `Imatriki3` → `Matrix3d`, `okuphambene` → `inverse`, `xazulula` → `solve` | **real Eigen 3.4** |
| CUDA | `#faka <igpu>` | `umsebenzi_wegpu` → `__global__`, `inombolo_yomucu` → `threadIdx` | translation snapshot (no GPU here) |
| PyTorch | `#faka <ukufunda_komshini>` | `Ithensa` → `torch::Tensor`, `dlulisela_phambili` → `forward` | **real libtorch 2.5: trains a network** |
| Arduino | always on, plus `<ucingo>` (Wire), `<iservo>`, `<inkumbulo_ehlalayo>` (EEPROM), SPI | `setha_iphini`, `linganisa_kabusha` (map), `Ucingo.qala_ukuthumela` | **real AVR compiler + Arduino core → .hex** |

```bash
lula run examples/umbono.zu.lula            # OpenCV: finds and measures shapes
lula run examples/amamatriki.zu.lula        # Eigen: solves equations, rotates a robot arm
LIBTORCH=/path/to/libtorch lula run examples/ukufunda.zu.lula   # PyTorch: trains a small network
lula arduino examples/inzwa.zu.lula --board uno --upload /dev/ttyUSB0   # build a .hex and flash it
```

`lula build` adds each library's compiler flags automatically (via `pkg-config` for OpenCV and Eigen, and
`LIBTORCH` for PyTorch). For ROS 2, translate the node into your workspace and run `colcon build`; for CUDA,
use `--cxx nvcc -- -x cu`.

**Arduino mode.** A file with `setup`/`loop` and no `main` is an Arduino program. Lula then writes Arduino-style
C++ (Arduino's own `max`, `abs` and `String`), and `lula arduino` builds it for Uno, Nano or Mega.

## Error messages in your language

Compiler errors and warnings, crashes and Lula's own messages are **full sentences in your language**,
using your language's keywords. For example:

```
irobhothi.zu.lula:5:5: iphutha: kushoda u-';' noma ',' ngaphambi kuka 'bhala'
irobhothi.zu.lula:8:7: iphutha: u-'z' akaguquki (engaguquki) futhi angeke ashintshwe
irobhothi.zu.lula:11:5: iphutha: u-kungenjalo ngaphandle kuka-uma ngaphambi kwakhe
Lula: uhlelo lwephukile: iphutha lezibalo (kaningi ukwahlukanisa ngo-0)
```

The catalog is [messages/catalog.txt](messages/catalog.txt). It covers about 45 of the most common GCC errors
and warnings, linker errors, runtime crashes and uncaught exceptions, in all ten languages. Rarer compiler
messages are shown in English, with your keywords and type names translated. Use `--msg-lang en` for English.

## Convert existing C++ (GeeksforGeeks, W3Schools, Arduino) into your language

```bash
node bin/lula.js convert program.cpp --to zu -o program.zu.lula
node bin/lula.js convert program.zu.lula --to af -o program.af.lula    # between languages
```

Keywords, library names, headers and member functions are all converted. Your own names, strings and comments stay as they are. If a C++ program has its own `count` variable, it's kept as `count` and not turned into `std::count`. In VS Code, right-click a C++ file and choose **Lula: Convert C++ to Lula**.

## Quick start

```bash
node bin/lula.js run examples/sawubona.zu.lula
node bin/lula.js keywords zu        # see every isiZulu keyword
```

File names carry the language: `program.zu.lula` (isiZulu) or `program.af.lula` (Afrikaans).

### Robots and embedded

```bash
# Arduino IDE / PlatformIO: export a sketch
node bin/lula.js translate examples/irobhothi.zu.lula -o irobhothi/irobhothi.ino
# Or compile straight to a microcontroller toolchain
node bin/lula.js build robot.zu.lula --cxx avr-g++ -- -mmcu=atmega328p -Os
```

## VS Code extension

```bash
npm run package-extension
code --install-extension lula-0.5.0.vsix
```

The extension provides syntax highlighting, hover translations (hover `uma` → C++ `if`), completion, error checking when you save, a ▶ Run button, a live "Show C++" side view, "Export for Arduino", "Convert C++ to Lula", and the SASL sign-video player.

## 🤟 South African Sign Language (SASL) sign-video dictionary

Hover any keyword in VS Code (`uma`, `ukuba`, `haeba`, `as`, ...) and click **🤟 Show SASL sign**, or press
`Ctrl+Alt+S`. A panel opens beside your code with the sign video, slow-motion buttons, credit for the signer,
and the same word in all ten languages. One recording per concept serves every language.
**Lula: Browse SASL sign dictionary** lists every sign.

The dictionary starts **empty on purpose**. Signs must come from Deaf SASL signers, and many programming
concepts don't have an established sign yet. Read [sasl/README.md](sasl/README.md) for the recording guide,
consent rules and how to add signs. [sasl/RECORDING_LIST.md](sasl/RECORDING_LIST.md) lists the 49 priority
concepts and all 299 concepts, with the word for each one in every language.

```bash
node bin/lula.js sasl status
node bin/lula.js sasl add if recordings/if.mp4 --signer "Name" --license CC-BY-4.0 --consent
```

## Adding a language

Copy `languages/zu.json` to e.g. `languages/xh.json`, translate the left-hand words, and run `npm test`. The tests **fail unless the language covers all 96 C++ keywords, all directives, and the same library and headers as isiZulu**. They also convert a C++ program into the new language, compile it, and check that the output matches. The VS Code highlighting is generated from these files.

Every local word must be **one token** (use `_` instead of spaces) and must not clash with common identifiers.

## Status

All the word tables are **drafts** that need review by native speakers and educators, so the words feel natural and consistent. Tshivenḓa words are currently written without the ḓ ḽ ṅ ṋ ṱ marks, so they're easier to type on ordinary keyboards.

**South African Sign Language**: see below.
