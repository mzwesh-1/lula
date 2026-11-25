---
title: "Soga: C++ and Arduino Programming in the Written Languages of South Africa"
subtitle: "Technical Report SOGA-TR-2026-01 · Version 0.9.0"
author: "Mzwandile Zulu · Creative Minds Technologies / CMT Robotic Industries"
date: "25 November 2026"
---

## Abstract

Almost every widely used programming language takes its keywords, library names and error messages from English.
For many learners in South Africa, English is a second or third language, so learning to program also means
learning a technical vocabulary in a language that is not their own. This report describes **Soga**, a programming
language that is C++ with its vocabulary in the ten written official languages of South Africa: isiZulu,
isiXhosa, siSwati, isiNdebele, Sesotho, Setswana, Sepedi, Xitsonga, Tshivenḓa and Afrikaans. Soga is a
source-to-source translator, so it inherits the whole of C++ and every C++ compiler. Programs run at exactly the
speed of C++ because they *are* C++ after translation. Soga targets desktop programs and every
Arduino-compatible board, and comes with an editor extension for Visual Studio Code, an Arduino IDE library, and
compiler error messages translated into all ten languages. We describe the design and the vocabulary, and how we
showed that a Soga program builds into exactly the same machine code as the C++ it stands for. All 1 133 builds
of a 103-lesson Arduino textbook (C++ and ten languages) compile for the ATmega2560. Every language version is
byte-for-byte identical to its C++ original, apart from one lesson that embeds its own compile time. Thirty-seven
lessons with fixed output gave the expected output when run in the simavr microcontroller simulator. We also state
plainly what has not yet been done: the vocabulary has not been reviewed by native-speaker panels, and testing on
real hardware has so far been limited to one board.

## 1. Introduction

South Africa has twelve official languages: eleven spoken languages and South African Sign Language, which became
official in 2023 (Constitution Eighteenth Amendment Act, 2023). Programming languages, however, speak English.
Research on non-native English speakers learning to program describes the extra load this creates: learners must
decode English keywords, English documentation and English error messages at the same time as the new concepts
(Guo, 2018). Studies of programming environments translated into learners' own languages report benefits for
learners who are not fluent in English (Dasgupta & Hill, 2017).

Soga's goal is narrow and practical. It keeps **all** of C++, a language used across embedded systems, robotics,
computer vision and scientific computing, and changes only the words. A learner in Durban can write

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

and upload it to an Arduino. The program is exactly the standard Arduino "Blink" sketch: `void setup()`,
`pinMode(13, OUTPUT)`, `digitalWrite`, `delay`, `HIGH`, `LOW`.

**Contributions.**

1. A complete mapping of C++ keywords, preprocessor directives, standard headers, common standard-library names and
   the Arduino API into ten languages, with optional vocabularies for ROS 2, OpenCV, Eigen, CUDA, PyTorch's C++ API
   and an Arduino starter kit (Section 3).
2. A translator that keeps strings, comments and the programmer's own names unchanged, maps errors back to the
   original lines, and converts existing C++ into any of the ten languages (Section 4).
3. Three ways to use it: a command-line tool and language server, a Visual Studio Code extension, and an Arduino
   IDE library that needs only one `#include` line (Section 5).
4. A method for showing that the translation is correct, by machine-code identity and simulation, applied to a
   103-lesson Arduino textbook (Section 6).

## 2. Related work

Several projects have put programming into languages other than English. *Hedy* is a gradual programming language
for teaching. Its keywords are available in many natural languages, and it has been studied in classrooms
(Hermans, 2020). *قلب* (Qalb) is a programming language written entirely in Arabic, made to question English as the
default language of code (Nasser, 2012).
Scratch, a block-based environment, has been translated into many languages, and its translations have been studied
for their effect on learning (Dasgupta & Hill, 2017).

Soga differs from these projects in three ways. It is a full systems language (C++) rather than a teaching
language. It runs on microcontrollers as well as computers. And it adds no runtime of its own: the output is
ordinary C++ for ordinary compilers. To our knowledge, Soga is the first C++ or Arduino toolchain that covers all
ten written official languages of South Africa.

## 3. Vocabulary

Each language is described in one data file (`languages/<code>.json`). Every language has the same coverage:

| Part of the language | Words per language |
|---|---|
| C++ keywords (`if`, `for`, `class`, `template`, `co_await`, ...) | 96 |
| Preprocessor directives (`#include`, `#define`, ...) | 15 |
| Standard headers (`<iostream>`, `<vector>`, ...) | 39 |
| Standard library and Arduino core names | 188 |
| Library packs: Arduino (39), Arduino libraries (14), Arduino starter kit (58), ROS 2 (32), OpenCV (51), Eigen (27), CUDA (20), PyTorch (40), other (1) | 282 |

*Table 1. Vocabulary in each of the ten languages (version 0.9.0).*

A **library pack** (`packs/src/<id>.txt`) gives one line per C++ name with its word in all ten languages, in a fixed
order. A pack is switched on when the program includes one of its headers. The pack builder rejects a pack if
any language has a missing word, a word that is not a single identifier, a word that means two different things
in the same language, or a word that is also an English C++ name.

**Word formation.** Words were chosen to be descriptive rather than borrowed where a clear phrase exists, for
example isiZulu `setha_iphini` for `pinMode`, `bhala_idijithali` for `digitalWrite` and `linda` (wait) for `delay`.
Where an established loanword is clearer, it is used (`Iservo`, `ibhayithi`). Chip and brand names (`DHT11`,
`MFRC522`, `A0`) are not translated. Tshivenḓa words are written without the ḓ ḽ ṅ ṋ ṱ marks so they are easy to type.
Words in Sepedi and Afrikaans that carry accents (š, ê) are also accepted without the accents, because the AVR
compiler (GCC 7) does not accept UTF-8 identifiers (Section 5.3).

**Status.** The vocabulary is a first draft. It has **not** been reviewed by native-speaker panels or by the
language boards, and it should be treated as a proposal (Section 8).

## 4. The translator

### 4.1 Source-to-source translation

Soga translates at the level of **tokens**. A lexer splits the source into identifiers, numbers, string and
character literals (including raw strings), comments, preprocessor directives, punctuation and white space. Only
identifiers and directive names are looked up. Everything else, including every space and line break, is copied
unchanged. Strings and comments are therefore never translated, and a word inside `"..."` stays as written.
After `.`, `->` or `::`, the short form of a library name is used, so `isisekelo::iqoqo` becomes `std::vector`
and `v.ubukhulu()` becomes `v.size()`.

Because translation is one token for one token, a translated line has exactly as many tokens as the original. Two
features rely on this:

* **Error positions.** A `#line` directive at the top of the translated file makes the compiler report
  the user's file and line numbers. For Arduino builds, which compile a copy of the sketch, the line the compiler
  quotes is replaced with the user's own line, and the caret (`^`) and range (`~~~`) are moved to the matching
  token. The language server applies the same token mapping to error columns.
* **Reverse translation.** `fromCpp` turns existing C++ into any of the ten languages. A programmer's own names
  that would collide with a reserved word get a trailing underscore.

### 4.2 Arduino mode

A file with `setup` and `loop` and no `main` is treated as an Arduino sketch. Arduino boards have no C++ standard
library, so in this mode names such as `std::abs` become the Arduino globals (`abs`), and `std::string` becomes
`String`.

### 4.3 Error messages

Compiler messages from GCC and Clang are translated through a catalog of 107 entries, each with regular
expressions and a sentence in English and the ten languages. Of these, 48 are compiler-error patterns. Captured
code fragments are translated back into the user's words, and English grammar terms (such as "identifier") are
replaced with their translations. Runtime failures (uncaught exceptions, segmentation faults, division by zero)
are reported in the user's language too.

## 5. Tools

### 5.1 Command line and language server

`soga` translates, builds, runs, checks and converts programs, and builds and uploads Arduino sketches through
`arduino-cli`. It defines 19 board names, from the Uno, Nano and Mega to the Uno R4, Nano 33, Raspberry Pi Pico,
ESP32 family, ESP8266 and STM32. A Language Server Protocol server gives errors as you type, hover
explanations, completion, go-to-definition, rename and quick fixes in the user's language.

### 5.2 Visual Studio Code

The extension (published on the Visual Studio Marketplace as `mzwandilezulu.soga-lang`) adds syntax colouring,
the language server, Run, and board selection with upload. On Windows PCs where Smart App Control blocks
newly built programs, it offers to run the program in the Windows Subsystem for Linux instead.

### 5.3 Arduino IDE library

Arduino IDE cannot run a translator, so Soga also ships as an Arduino library (`Soga`, in the Arduino Library
Manager). Each language has a header, such as `isiZulu.h`, that maps every word to its C++ name with the
preprocessor (`#define qala setup`). A sketch needs one line, `#include <isiZulu.h>`, and the rest can be written
in the language. Words with accents are defined both with and without the accents, because GCC 7 (AVR) rejects
UTF-8 identifiers. Two limits follow from this approach. Other libraries must be included before the language
header, because the macros would otherwise rename words inside them. And error messages in Arduino IDE stay in
English, because the IDE shows the compiler's text directly.

## 6. Evaluation: is the translation correct?

The central claim is that a Soga program **is** its C++ program. We tested this on the 103-lesson Arduino
textbook that accompanies Soga. The lessons cover 210 Arduino words, from data types and control structures to
interrupts, I2C, SPI, EEPROM, servo and stepper motors, the LCD1602, DHT11, RC522 RFID, the DS3231 real-time clock,
infrared remotes, keypads, the MAX7219 and 7-segment displays. Each lesson has one complete example written in
C++. The example in each language is produced by Soga itself (`fromCpp`). The procedure is in
`scripts/prove-textbook.sh` and can be run again by anyone.

1. **Round trip.** Each language version is translated back to C++ and must equal the original text exactly.
   This held for 1 030 of 1 030 language versions. Each word shown in a lesson's word table must also appear in
   that language's example. This check found and fixed a table error (`map` was shown with the word for `std::map`).
2. **Compilation.** All 1 133 sketches (103 × C++ and ten languages) were compiled with `arduino-cli` for the
   Arduino Mega 2560 (ATmega2560, avr-gcc 7.3.0). All of them compiled.
3. **Machine-code identity.** For each language version, the `.hex` program file was compared with that of the C++
   original. 1 020 of 1 030 were byte-for-byte identical. The other 10 were all versions of the one lesson that
   stores its compile time (`__TIME__`). Comparing the disassembly showed that the only difference was the
   time string, for example `13:03:01` against `13:04:14`.
4. **Behaviour in simulation.** Each program was run for four seconds in simavr, simulating the ATmega2560 at
   16 MHz, and its serial output was recorded. Thirty-seven lessons have output that does not depend on sensors.
   All 37 printed exactly the expected output, for example `42` for a function that doubles 21, and `255`, `FF`
   and `11111111` for the number-format lesson. The simulation corrected one of our own expectations: `round(2.5)`
   prints `3`, not `3.00`, because the Arduino AVR core defines `round` as a macro that returns a `long`.

Earlier checks in the same project support this result:

* The 26 starter-kit sketches were built in all ten languages through the Arduino IDE headers. All 260 builds had
  the same program size as their isiZulu original.
* An isiZulu traffic-light sketch was built for 18 of the 19 board names, covering the AVR, Renesas (Uno R4),
  SAMD, mbed (Nano 33 BLE), RP2040, ESP32 and STM32 cores. ESP8266 was not tested because its board package
  could not be downloaded in the test environment.
* The automated test suite has 130 tests, including tests of the language server inside a real copy of Visual
  Studio Code.

**Performance.** Since the machine code is identical, a Soga program has no cost at run time compared with C++:
the same size, the same speed and the same memory use.

**Real hardware.** The isiZulu traffic-light sketch was uploaded through Arduino IDE to an Arduino Mega 2560
and worked as intended (green 10 s, yellow 3 s, red 5 s). This is the only test on physical hardware so far.

## 7. Example: one program, ten languages

The same Arduino statement in each language (`pinMode(10, OUTPUT); digitalWrite(10, HIGH); delay(5000);`):

| Language | Code |
|---|---|
| isiZulu | `setha_iphini(10, OKUPHUMAYO); bhala_idijithali(10, PHEZULU); linda(5000);` |
| isiXhosa | `misela_iphini(10, OKUPHUMAYO); bhala_idijithali(10, PHEZULU); linda(5000);` |
| Sesotho | `beha_phini(10, TSE_TSWANG); ngola_dijithale(10, HODIMO); ema(5000);` |
| Tshivenḓa | `vhea_phini(10, ZWI_BVAHO); nwala_didzhithala(10, NTHA); lindela(5000);` |
| C++ | `pinMode(10, OUTPUT); digitalWrite(10, HIGH); delay(5000);` |

*Table 2. The same statement in four of the languages and in C++. All ten languages are in the textbook.*

## 8. Limitations

* **The vocabulary has not been validated.** The words were written by the project team as a first draft and have
  not been reviewed by native-speaker panels, teachers or the national language bodies. Some words may be
  unnatural, ambiguous or inconsistent with existing technical terminology.
* **There is no learning study yet.** This report shows that the translation is correct. It does not show that
  learners learn better in Soga. That needs a controlled study (Section 9).
* **Hardware testing is limited.** One sketch has been tested on one physical board. Other results come from
  compilation, machine-code comparison and simulation, which cannot reveal wiring or timing problems.
* **Macros in Arduino IDE.** The Arduino IDE headers reserve every Soga word in that language, so a learner's own
  variable named, for example, `isikhathi` (time) becomes a library name. The Soga translator and editor warn about
  this; Arduino IDE does not.
* **English remains in places.** `#include` lines, the names of chips and libraries, compiler errors in Arduino
  IDE, and the explanations in the textbook (English and isiZulu only, so far) are not yet in every language.
* **South African Sign Language.** The project includes a structure for a SASL sign-video dictionary, but it holds
  no signs yet. Signs must be recorded by Deaf signers with their consent; they will not be generated.
* **Maturity.** Soga 0.9.0 is a preview maintained by one author. Interfaces may change.

## 9. Future work

1. Native-speaker review of all ten vocabularies, with teachers and the national language bodies, and a published
   change log of decisions.
2. A controlled classroom study comparing learners who program in their home language with learners who program
   in English. The programs can be provably identical, so the language of the code can be the only difference.
3. Systematic testing on physical boards for every supported board family.
4. Translating the textbook explanations into the other nine languages, and an advanced track (registers, timers,
   real-time behaviour, ROS 2, OpenCV).
5. Recording the SASL sign-video dictionary with Deaf signers.

## 10. Availability

* Source code (MIT licence): <https://github.com/mzwesh-1/lula>
* Arduino library: <https://github.com/mzwesh-1/soga-arduino> (Arduino Library Manager: "Soga")
* Visual Studio Code extension: <https://marketplace.visualstudio.com/items?itemName=mzwandilezulu.soga-lang>
* Proof procedure: `npm run prove-textbook` (needs `arduino-cli` with the `arduino:avr` core and `simavr`)

## How to cite

> Zulu, M. (2026). *Soga: C++ and Arduino Programming in the Written Languages of South Africa* (Technical Report
> SOGA-TR-2026-01, version 0.9.0). Creative Minds Technologies. https://github.com/mzwesh-1/lula

A DOI for this release will be listed in the repository's `CITATION.cff` once it has been archived.

## Acknowledgements

Soga was designed and directed by the author. Much of the implementation, the draft vocabulary, the textbook and
this report were produced with the help of an AI coding assistant (Claude, by Anthropic), under the author's
direction and with the author's testing. All results in Section 6 come from scripts in the repository and can be
reproduced.

## References

Constitution Eighteenth Amendment Act, 2023 (Republic of South Africa). Recognises South African Sign Language as
an official language.

Dasgupta, S., & Hill, B. M. (2017). Learning to code in localized programming languages. In *Proceedings of the
Fourth ACM Conference on Learning @ Scale (L@S '17)*. ACM.

Guo, P. J. (2018). Non-native English speakers learning computer programming: Barriers, desires, and design
opportunities. In *Proceedings of the 2018 CHI Conference on Human Factors in Computing Systems (CHI '18)*. ACM.

Hermans, F. (2020). Hedy: A gradual language for programming education. In *Proceedings of the 2020 ACM Conference
on International Computing Education Research (ICER '20)*. ACM.

Nasser, R. (2012). *قلب: لغة برمجة* [Qalb: a programming language, written entirely in Arabic]. Software, MIT licence. <https://github.com/nasser/--->

Arduino. *Arduino Language Reference*. <https://docs.arduino.cc/language-reference/>

Microsoft. *Language Server Protocol Specification*. <https://microsoft.github.io/language-server-protocol/>

simavr: a lean, mean and hackable AVR simulator. <https://github.com/buserror/simavr>
