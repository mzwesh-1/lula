# Changelog

## 0.9.0 (preview)
- Arduino starter kit in all ten languages: 58 new words for the stepper motor, LCD1602, DHT11, RC522 RFID, DS3231 clock, IR remote, 4x4 keypad, MAX7219 LED matrix and 7-segment displays (Stepper, LiquidCrystal, DHT, MFRC522, RTClib, IRremote, Keypad, LedControl, SevSeg).
- New Arduino words: shiftOut, shiftIn, LSBFIRST/MSBFIRST, bitRead/bitWrite/bitSet/bitClear, highByte/lowByte, byte, HEX/DEC/BIN and isnan.
- Arduino errors now quote your own line of code (not the C++ version), with the ^ under the right word, and library names in error messages are translated too (Isikrini_sombhalo::setha_ikhesa).
- New: the Soga library for Arduino IDE. Start a sketch with `#include <isiZulu.h>` (or your language) and write the rest in your language, with 26 starter-kit examples per language.

## 0.8.0 (preview)
- Windows: when Smart App Control blocks a program you built, Soga offers "Run in WSL" or "Always use WSL", checks that WSL has Node.js and g++, and offers to install them. New default for "Soga: Run In": auto.
- macOS: uses clang++ automatically when g++ is not installed, and clang's error messages are now translated into all ten languages.
- Linux, macOS, Windows: if no C++ compiler is installed, the message gives the install command for your system.

## 0.7.5 (preview)
- Windows: the built program is kept next to your file (in .soga-build) instead of the Temp folder, and Soga retries if Windows holds it for a virus scan. If Windows blocks it, Soga explains how to allow it.
- New setting "Soga: Run In" (soga.runIn): set it to wsl to build and run programs in WSL (Ubuntu), for Windows PCs where Smart App Control blocks self-built programs.

## 0.7.4 (preview)
- Run, Arduino Build / upload and board installs now show their output in a Soga terminal that stays open after the program ends (before, the output could disappear or not appear at all). Typing input for funda (std::cin) works.
- Windows: programs are built statically, so they start even when g++'s DLLs are not on PATH (common with winget installs); a clear message if a program cannot start.

## 0.7.3 (preview)
- Fixed: the Run button failed with "there is no registered task type 'soga'", and then could not find the Soga program. Tested in VS Code 1.147.

## 0.7.2 (preview)
- .soga files now have their own icon (the Soga </> badge) in the file list and tabs.

## 0.7.1 (preview)
- The extension is now simply called "Soga".
- Also published on Open VSX (for VSCodium, Cursor and other VS Code-based editors).

## 0.7.0 (preview)
- First Marketplace release.
- Ten languages: isiZulu, isiXhosa, siSwati, isiNdebele, Sesotho, Setswana, Sepedi, Xitsonga, Tshivenḓa, Afrikaans.
- Language server: errors as you type in your language, quick fixes, completion, hover, go to definition, references, rename, outline, signature help, semantic colouring, formatting.
- Every Arduino-compatible board through arduino-cli (Arduino IDE 2), with board picker and upload.
- ROS 2, OpenCV, Eigen, CUDA and PyTorch words in every language.
- South African Sign Language sign-video dictionary (signs added by Deaf signers).
