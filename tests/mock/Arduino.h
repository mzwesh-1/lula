// Minimal fake Arduino API so robot programs can be compiled and run on a PC in tests.
#pragma once
#include <cstdio>
#define HIGH 1
#define LOW 0
#define OUTPUT 1
#define INPUT 0
static int mock_sensor = 100;
inline void pinMode(int p, int m) { std::printf("pinMode(%d,%d)\n", p, m); }
inline void digitalWrite(int p, int v) { std::printf("digitalWrite(%d,%d)\n", p, v); }
inline int digitalRead(int) { return 0; }
inline int analogRead(int) { return mock_sensor; }
inline void analogWrite(int p, int v) { std::printf("analogWrite(%d,%d)\n", p, v); }
inline void delay(unsigned long) {}
inline unsigned long millis() { return 0; }
void setup();
void loop();
int main() { setup(); loop(); mock_sensor = 900; loop(); return 0; }
