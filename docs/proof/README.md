# Proof: Soga isiZulu = Arduino C++

`Robhothi_isiZulu.ino` (isiZulu, with the Soga library) and `TrafficLight_Cpp.ino` (standard Arduino C++) are the
same traffic light. Compiled for the Arduino Mega 2560 (arduino-cli, avr-gcc 7.3.0), both give a 1 634-byte
program with the same SHA-256:

    251c065df2e509ee23438b0e28969dbf77cff4fec935112a8a395efc90fb5c9a

Check it yourself:

    arduino-cli compile -b arduino:avr:mega --output-dir out1 Robhothi_isiZulu
    arduino-cli compile -b arduino:avr:mega --output-dir out2 TrafficLight_Cpp
    sha256sum out1/*.hex out2/*.hex

The full check over all 103 textbook lessons in ten languages is `npm run prove-textbook`.
