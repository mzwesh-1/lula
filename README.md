# Soga ✨

**C++ in South African languages.** Write programs for robots, Arduino, embedded systems and PCs in **all ten written official South African languages**, with the full speed of C++.

```
inombolo okuyinhloko() {                 heelgetal hoof() {
    bhala << "Sawubona!" << umugqa;           skryf << "Hallo!" << nuwereël;
    buyisa 0;                                 terug 0;
}                                         }
```

## How it works and why it's as fast as C++

Soga translates your program, word for word, into standard C++ and then uses a real C++ compiler (g++, clang, avr-g++, arm-none-eabi-g++, ESP32 toolchains). Because the final program *is* C++, there is no slowdown. It also runs on any chip that has a C++ compiler and works with every C++ and Arduino library.

- Only whole keywords are translated. Text inside strings and comments, numbers and header names are never changed.
- Normal English C++ still works, so you can mix it in or paste existing code.
- Compiler errors point to **your `.soga` file and line**, and the code they quote uses **your language's keywords**.

## What's covered: the whole language, in all 10 written official languages

| Code | Language | File name | `if` / `return` / print |
|---|---|---|---|
| `zu` | isiZulu | `robot.zu.soga` | `uma` / `buyisa` / `bhala` |
| `xh` | isiXhosa | `robot.xh.soga` | `ukuba` / `buyisa` / `bhala` |
| `ss` | siSwati | `robot.ss.soga` | `nangabe` / `buyisa` / `bhala` |
| `nr` | isiNdebele | `robot.nr.soga` | `nangabe` / `buyisa` / `tlola` |
| `st` | Sesotho | `robot.st.soga` | `haeba` / `kgutlisa` / `ngola` |
| `tn` | Setswana | `robot.tn.soga` | `fa` / `busa` / `kwala` |
| `nso` | Sepedi | `robot.nso.soga` | `ge` / `bušetša` / `ngwala` |
| `ts` | Xitsonga | `robot.ts.soga` | `loko` / `vuyisa` / `tsala` |
| `ve` | Tshivenḓa | `robot.ve.soga` | `arali` / `vhuisa` / `nwala` |
| `af` | Afrikaans | `robot.af.soga` | `as` / `terug` / `skryf` |

English is C++ itself. Plain C++ keeps working in every language.

Every language covers all **96 C++ keywords** (up to C++20), all **15 preprocessor directives**, **39 header names**, and **188 standard-library, member-function and Arduino names**:
I/O, files, containers, algorithms, math, strings, smart pointers, exceptions, threads, fixed-width ints, `.push_back()`-style members, and `pinMode`/`digitalWrite`/`Serial`.
The test suite enforces this: a language that's missing even one word fails.

Full word lists: [docs/zu.md](docs/zu.md), [xh](docs/xh.md), [ss](docs/ss.md), [nr](docs/nr.md), [st](docs/st.md), [tn](docs/tn.md), [nso](docs/nso.md), [ts](docs/ts.md), [ve](docs/ve.md), [af](docs/af.md). Or run `soga keywords xh`.
`examples/konke.zu.soga` and `examples/alles.af.soga` use almost every feature of C++ in one program.

Your own variable, function and class names can be in any language (`inombolo amamaki = 85;`).
Like C++ keywords, Soga words are **reserved**: you can't name a variable `iqoqo`, because it means `std::vector`.

## Libraries: ROS 2, OpenCV, Eigen, CUDA, PyTorch and Arduino

Soga has **library packs** with names in all ten languages. A pack switches on when you include its header,
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
soga run examples/umbono.zu.soga            # OpenCV: finds and measures shapes
soga run examples/amamatriki.zu.soga        # Eigen: solves equations, rotates a robot arm
LIBTORCH=/path/to/libtorch soga run examples/ukufunda.zu.soga   # PyTorch: trains a small network
soga arduino examples/inzwa.zu.soga --board uno --upload /dev/ttyUSB0   # build a .hex and flash it
```

`soga build` adds each library's compiler flags automatically (via `pkg-config` for OpenCV and Eigen, and
`LIBTORCH` for PyTorch). For ROS 2, translate the node into your workspace and run `colcon build`; for CUDA,
use `--cxx nvcc -- -x cu`.

### Every Arduino-compatible board

`soga arduino` builds through **arduino-cli**, the engine inside the Arduino IDE 2. If you have the Arduino IDE 2,
Soga finds its arduino-cli automatically and uses the boards and libraries you already installed.

| Board family | `--board` |
|---|---|
| Arduino Uno, Nano, Mega, Leonardo | `uno`, `nano`, `nano-old`, `mega`, `leonardo` |
| Arduino Uno R4 | `uno-r4-minima`, `uno-r4-wifi` |
| Arduino Nano 33 | `nano-33-iot`, `nano-33-ble` |
| Raspberry Pi Pico | `pico`, `pico-w`, `pico-2` |
| ESP32 / ESP8266 | `esp32`, `esp32-s3`, `esp32-c3`, `esp8266` |
| STM32 | `stm32-bluepill`, `stm32-blackpill`, `nucleo-f401re` |
| Anything else | the full board name, e.g. `--board arduino:samd:mkr1000` |

```bash
soga boards                      # which boards are installed, and which are plugged in
soga boards --install esp32      # install a board package
soga ports                       # boards connected right now
soga arduino robot.zu.soga --board esp32 --upload        # build and upload (port found automatically)
soga arduino robot.zu.soga --board pico -o robot.uf2     # build only
```

Errors point at your `.soga` file and line, in your language, on every board. You can call a function before it is
defined, as in the Arduino IDE. In VS Code, click the board name in the status bar to change board, and use
**Soga: Build / upload** to upload; errors are checked as you type with the chosen board's own compiler.
Tested here by building for all 17 listed boards (except ESP8266); uploading to real boards still needs testing.

**Arduino mode.** A file with `setup`/`loop` and no `main` is an Arduino program. Soga then writes Arduino-style
C++ (Arduino's own `max`, `abs` and `String`).

## Arduino IDE: write sketches in your home language

Install the **Soga** library in Arduino IDE (download
[Soga-arduino-library-0.8.0.zip](https://github.com/mzwesh-1/lula/raw/main/releases/Soga-arduino-library-0.8.0.zip),
then Sketch → Include Library → Add .ZIP Library...). Make your language the first line of the sketch:

```cpp
#include <isiZulu.h>

ize qala() {
    setha_iphini(13, OKUPHUMAYO);
}

ize phindaphinda() {
    bhala_idijithali(13, PHEZULU);
    linda(1000);
    bhala_idijithali(13, PHANSI);
    linda(1000);
}
```

Headers: `isiZulu.h`, `isiXhosa.h`, `siSwati.h`, `isiNdebele.h`, `Sesotho.h`, `Setswana.h`, `Sepedi.h`,
`Xitsonga.h`, `Tshivenda.h`, `Afrikaans.h`. They work on every board (Uno, Nano, Mega, ESP32, Pico, ...) and build
exactly the same program as the C++ sketch. Put other libraries (`#include <Servo.h>`) before the language line.
In Arduino IDE the compiler errors stay in English; for errors in your language, use the VS Code extension.
The library is generated from the same word lists: `npm run arduino-library`.

## Error messages in your language

Compiler errors and warnings, crashes and Soga's own messages are **full sentences in your language**,
using your language's keywords. For example:

```
irobhothi.zu.soga:5:5: iphutha: kushoda u-';' noma ',' ngaphambi kuka 'bhala'
irobhothi.zu.soga:8:7: iphutha: u-'z' akaguquki (engaguquki) futhi angeke ashintshwe
irobhothi.zu.soga:11:5: iphutha: u-kungenjalo ngaphandle kuka-uma ngaphambi kwakhe
Soga: uhlelo lwephukile: iphutha lezibalo (kaningi ukwahlukanisa ngo-0)
```

The catalog is [messages/catalog.txt](messages/catalog.txt). It covers about 45 of the most common GCC errors
and warnings, linker errors, runtime crashes and uncaught exceptions, in all ten languages. Rarer compiler
messages are shown in English, with your keywords and type names translated. Use `--msg-lang en` for English.

## Convert existing C++ (GeeksforGeeks, W3Schools, Arduino) into your language

```bash
node bin/soga.js convert program.cpp --to zu -o program.zu.soga
node bin/soga.js convert program.zu.soga --to af -o program.af.soga    # between languages
```

Keywords, library names, headers and member functions are all converted. Your own names, strings and comments stay as they are. If a C++ program has its own `count` variable, it's kept as `count` and not turned into `std::count`. In VS Code, right-click a C++ file and choose **Soga: Convert C++ to Soga**.

## Quick start

```bash
node bin/soga.js run examples/sawubona.zu.soga
node bin/soga.js keywords zu        # see every isiZulu keyword
```

File names carry the language: `program.zu.soga` (isiZulu) or `program.af.soga` (Afrikaans).

### Robots and embedded

```bash
# Arduino IDE / PlatformIO: export a sketch
node bin/soga.js translate examples/irobhothi.zu.soga -o irobhothi/irobhothi.ino
# Or compile straight to a microcontroller toolchain
node bin/soga.js build robot.zu.soga --cxx avr-g++ -- -mmcu=atmega328p -Os
```

## VS Code extension

```bash
npm run package-extension
code --install-extension soga-0.7.0.vsix
```

The extension provides syntax highlighting, hover translations (hover `uma` → C++ `if`), completion, error checking when you save, a ▶ Run button, a live "Show C++" side view, "Export for Arduino", "Convert C++ to Soga", and the SASL sign-video player.

## Language server (VS Code and other editors)

Soga ships a full **Language Server Protocol** server (`src/lsp/server.js`). The VS Code extension starts it
automatically, and any LSP editor (Neovim, Emacs, Sublime, Zed, ...) can run it with `node src/lsp/server.js --stdio`.
Everything it says is in the language of the file you are editing.

| Feature | What it does |
|---|---|
| Errors as you type | Soga's own checks instantly; then the real compiler (GCC, or AVR for Arduino files) after a short pause, as full sentences in your language |
| Quick fixes | add a missing `#faka <...>`, add a missing `;`, apply "did you mean", rename a name that is a reserved Soga word |
| Completion | keywords, snippets (`uma`, `jikeleza`, `qala` + `phindaphinda`, ...), your own names in scope, members after `.`, header names after `#faka <`, library words (choosing an OpenCV/ROS/... word adds its `#faka` for you) |
| Hover | the C++ meaning of every Soga word, and the declaration of your own names |
| Go to definition, find references, highlight | scope-aware (shadowed names are told apart), across all `.soga` files in the workspace |
| Rename | across files, and it refuses names that are Soga words |
| Outline and workspace symbols | classes, members, functions, enums, namespaces, macros |
| Parameter hints | for your own functions |
| Semantic colouring | your functions, classes, variables, parameters and constants |
| Format Document | fixes indentation |
| C++ hints (optional) | shows the C++ meaning after each Soga word (`soga.inlayHints.cppNames`) |

`tests/lsp.test.js` drives the server over the real protocol (stdio) and checks every feature above.

## 🤟 South African Sign Language (SASL) sign-video dictionary

Hover any keyword in VS Code (`uma`, `ukuba`, `haeba`, `as`, ...) and click **🤟 Show SASL sign**, or press
`Ctrl+Alt+S`. A panel opens beside your code with the sign video, slow-motion buttons, credit for the signer,
and the same word in all ten languages. One recording per concept serves every language.
**Soga: Browse SASL sign dictionary** lists every sign.

The dictionary starts **empty on purpose**. Signs must come from Deaf SASL signers, and many programming
concepts don't have an established sign yet. Read [sasl/README.md](sasl/README.md) for the recording guide,
consent rules and how to add signs. [sasl/RECORDING_LIST.md](sasl/RECORDING_LIST.md) lists the 49 priority
concepts and all 299 concepts, with the word for each one in every language.

```bash
node bin/soga.js sasl status
node bin/soga.js sasl add if recordings/if.mp4 --signer "Name" --license CC-BY-4.0 --consent
```

## Adding a language

Copy `languages/zu.json` to e.g. `languages/xh.json`, translate the left-hand words, and run `npm test`. The tests **fail unless the language covers all 96 C++ keywords, all directives, and the same library and headers as isiZulu**. They also convert a C++ program into the new language, compile it, and check that the output matches. The VS Code highlighting is generated from these files.

Every local word must be **one token** (use `_` instead of spaces) and must not clash with common identifiers.

## Status

All the word tables are **drafts** that need review by native speakers and educators, so the words feel natural and consistent. Tshivenḓa words are currently written without the ḓ ḽ ṅ ṋ ṱ marks, so they're easier to type on ordinary keyboards.

**South African Sign Language**: see below.
