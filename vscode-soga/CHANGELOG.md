# Changelog

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
