'use strict';
// Soga Arduino textbook: one entry per word (or small family of words).
// Each example is a complete Arduino sketch in C++; scripts/build-textbook.js translates it into all ten
// languages with Soga itself, checks the round trip, and compiles it. Names you choose yourself
// (led, x, n ...) are kept short and the same in every language.
//   words:   the C++ names this entry teaches (their word in every language is shown in a table)
//   syntax:  how it is written (translated like the code)
//   params / returns: plain English
//   include: library headers the example needs (they stay in C++)

const S = (s) => s.replace(/^\n/, '').replace(/\n\s*$/, '\n');

module.exports = [
// ---------------------------------------------------------------- Getting started
{ id: 'header', cat: 'Getting started', title: 'Your language header', words: [],
  desc: 'The first line of every Soga sketch chooses your language. Arduino IDE needs the Soga library (Tools → Manage Libraries → Soga). After that line, every Arduino word can be written in your language. Other libraries (Servo.h, Wire.h, ...) are included before your language line. The #include lines themselves stay in C++.',
  example: S(`
void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(500);
  digitalWrite(LED_BUILTIN, LOW);
  delay(500);
}
`) },
// ---------------------------------------------------------------- Structure
{ id: 'setup', cat: 'Structure', words: ['setup'], syntax: 'void setup() { }',
  desc: 'setup() runs once, when the board is switched on or reset. Use it to set pin modes, start Serial and libraries.',
  example: S(`
void setup() {
  Serial.begin(9600);
  Serial.println(1);
}

void loop() {
}
`) },
{ id: 'loop', cat: 'Structure', words: ['loop'], syntax: 'void loop() { }',
  desc: 'loop() runs again and again for as long as the board has power, straight after setup(). Your program lives here.',
  example: S(`
int n = 0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  n = n + 1;
  Serial.println(n);
  delay(1000);
}
`) },
{ id: 'functions', cat: 'Structure', title: 'Your own functions', words: ['void', 'return'], syntax: 'int name(int a) { return a; }',
  desc: 'Group steps under a name of your own and call it from setup() or loop(). A function that gives back nothing is void; otherwise return sends a value back.',
  example: S(`
int twice(int x) {
  return x * 2;
}

void blink(int pin) {
  digitalWrite(pin, HIGH);
  delay(200);
  digitalWrite(pin, LOW);
  delay(200);
}

void setup() {
  pinMode(13, OUTPUT);
  Serial.begin(9600);
  Serial.println(twice(21));
}

void loop() {
  blink(13);
}
`) },
// ---------------------------------------------------------------- Data types
{ id: 'int', cat: 'Data types', words: ['int'], syntax: 'int x = 5;',
  desc: 'A whole number. On Uno, Nano and Mega an int holds -32 768 to 32 767; on ESP32 and Pico it is much larger.',
  example: S(`
int pin = 13;
int count = -5;

void setup() {
  pinMode(pin, OUTPUT);
  Serial.begin(9600);
  Serial.println(count + 10);
}

void loop() {
}
`) },
{ id: 'unsigned', cat: 'Data types', title: 'unsigned', words: ['unsigned'], syntax: 'unsigned int x = 40000;',
  desc: 'unsigned in front of a type means "no negative numbers", which doubles the largest positive value. unsigned int: 0 to 65 535 on AVR boards.',
  example: S(`
unsigned int big = 40000;

void setup() {
  Serial.begin(9600);
  Serial.println(big);
}

void loop() {
}
`) },
{ id: 'long', cat: 'Data types', words: ['long'], syntax: 'long x = 100000;\nunsigned long t = millis();',
  desc: 'A larger whole number: -2 147 483 648 to 2 147 483 647. Use unsigned long for times from millis() and micros().',
  example: S(`
long distance = 100000;
unsigned long start;

void setup() {
  Serial.begin(9600);
  start = millis();
  Serial.println(distance * 3);
}

void loop() {
  Serial.println(millis() - start);
  delay(1000);
}
`) },
{ id: 'short', cat: 'Data types', words: ['short'], syntax: 'short x = 100;',
  desc: 'A 16-bit whole number on every board (-32 768 to 32 767).',
  example: S(`
short level = 1200;

void setup() {
  Serial.begin(9600);
  Serial.println(level);
}

void loop() {
}
`) },
{ id: 'byte', cat: 'Data types', words: ['byte', 'uint8_t'], syntax: 'byte x = 255;',
  desc: 'A number from 0 to 255 in one byte of memory. Good for pins, colours and data sent over wires. uint8_t is the same thing.',
  example: S(`
byte red = 200;
uint8_t green = 50;

void setup() {
  pinMode(6, OUTPUT);
  pinMode(5, OUTPUT);
  analogWrite(6, red);
  analogWrite(5, green);
}

void loop() {
}
`) },
{ id: 'fixedint', cat: 'Data types', title: 'Exact-size numbers', words: ['int8_t', 'int16_t', 'int32_t', 'uint16_t', 'uint32_t'], syntax: 'int16_t x = -1000;',
  desc: 'Whole numbers with an exact number of bits, the same on every board: int8_t, int16_t, int32_t and the unsigned uint8_t, uint16_t, uint32_t. Sensors such as the MPU-6050 send int16_t values.',
  example: S(`
int16_t accel = -1000;
uint32_t total = 4000000000;

void setup() {
  Serial.begin(9600);
  Serial.println(accel);
  Serial.println(total);
}

void loop() {
}
`) },
{ id: 'size_t', cat: 'Data types', words: ['size_t'], syntax: 'size_t n = sizeof(list);',
  desc: 'The type for sizes and counts of things in memory. sizeof gives a size_t.',
  example: S(`
int list[5] = {1, 2, 3, 4, 5};

void setup() {
  Serial.begin(9600);
  size_t n = sizeof(list) / sizeof(list[0]);
  Serial.println(n);
}

void loop() {
}
`) },
{ id: 'float', cat: 'Data types', words: ['float'], syntax: 'float x = 3.14;',
  desc: 'A number with a decimal point, such as 23.5 degrees. Arduino prints 2 decimal places unless you ask for more.',
  example: S(`
float temperature = 23.5;

void setup() {
  Serial.begin(9600);
  Serial.println(temperature * 2);
  Serial.println(temperature, 4);
}

void loop() {
}
`) },
{ id: 'double', cat: 'Data types', words: ['double'], syntax: 'double x = 3.14159;',
  desc: 'A decimal number with more precision. On Uno, Nano and Mega it is the same as float; on ESP32 and Pico it is more precise.',
  example: S(`
double pi = 3.14159265;

void setup() {
  Serial.begin(9600);
  Serial.println(pi, 6);
}

void loop() {
}
`) },
{ id: 'bool', cat: 'Data types', words: ['bool', 'true', 'false'], syntax: 'bool on = true;',
  desc: 'A value that is only true or false. Perfect for "is the light on?" or "was the button pressed?".',
  example: S(`
bool ledOn = false;

void setup() {
  pinMode(13, OUTPUT);
}

void loop() {
  ledOn = !ledOn;
  digitalWrite(13, ledOn ? HIGH : LOW);
  delay(500);
}
`) },
{ id: 'char', cat: 'Data types', words: ['char'], syntax: "char c = 'A';",
  desc: "One character, written in single quotes: 'A', '7', '#'. Keypads give a char for each key.",
  example: S(`
char grade = 'A';

void setup() {
  Serial.begin(9600);
  Serial.println(grade);
  Serial.println(grade + 1);
}

void loop() {
}
`) },
{ id: 'String', cat: 'Data types', words: ['String'], syntax: 'String s = "text";',
  desc: 'Text that can grow and change. You can join Strings with +, compare them with == and use the String functions below.',
  example: S(`
String name = "Soga";

void setup() {
  Serial.begin(9600);
  String message = name + " " + String(2026);
  Serial.println(message);
}

void loop() {
}
`) },
{ id: 'arrays', cat: 'Data types', title: 'Arrays', words: [], syntax: 'int pins[3] = {8, 9, 10};',
  desc: 'A row of values of the same type, numbered from 0. pins[0] is the first one. Arrays and a for loop are the easy way to handle many LEDs.',
  example: S(`
int pins[3] = {8, 9, 10};

void setup() {
  for (int i = 0; i < 3; i++) {
    pinMode(pins[i], OUTPUT);
  }
}

void loop() {
  for (int i = 0; i < 3; i++) {
    digitalWrite(pins[i], HIGH);
    delay(300);
    digitalWrite(pins[i], LOW);
  }
}
`) },
{ id: 'auto', cat: 'Data types', words: ['auto'], syntax: 'auto x = 5;',
  desc: 'Lets the compiler choose the type from the value you give.',
  example: S(`
void setup() {
  Serial.begin(9600);
  auto t = millis();
  auto half = 2.5;
  Serial.println(t);
  Serial.println(half);
}

void loop() {
}
`) },
// ---------------------------------------------------------------- Qualifiers
{ id: 'const', cat: 'Variable qualifiers', words: ['const'], syntax: 'const int LED = 13;',
  desc: 'A value that never changes. Use it for pin numbers and fixed times: the compiler stops you from changing it by mistake and uses no extra memory.',
  example: S(`
const int LED = 13;
const int WAIT = 250;

void setup() {
  pinMode(LED, OUTPUT);
}

void loop() {
  digitalWrite(LED, HIGH);
  delay(WAIT);
  digitalWrite(LED, LOW);
  delay(WAIT);
}
`) },
{ id: 'constexpr', cat: 'Variable qualifiers', words: ['constexpr'], syntax: 'constexpr int N = 4;',
  desc: 'A value worked out while compiling, so it can size arrays.',
  example: S(`
constexpr int N = 4;
int values[N];

void setup() {
  Serial.begin(9600);
  Serial.println(N * 2);
}

void loop() {
}
`) },
{ id: 'static', cat: 'Variable qualifiers', words: ['static'], syntax: 'static int count = 0;',
  desc: 'Inside a function, a static variable keeps its value between calls instead of starting again each time.',
  example: S(`
void setup() {
  Serial.begin(9600);
}

void loop() {
  static int count = 0;
  count++;
  Serial.println(count);
  delay(1000);
}
`) },
{ id: 'volatile', cat: 'Variable qualifiers', words: ['volatile'], syntax: 'volatile int presses = 0;',
  desc: 'Use volatile for variables that an interrupt changes, so loop() always reads the newest value.',
  example: S(`
volatile int presses = 0;

void pressed() {
  presses++;
}

void setup() {
  Serial.begin(9600);
  pinMode(2, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(2), pressed, FALLING);
}

void loop() {
  Serial.println(presses);
  delay(500);
}
`) },
// ---------------------------------------------------------------- Constants
{ id: 'HIGH', cat: 'Constants', title: 'HIGH and LOW', words: ['HIGH', 'LOW'], syntax: 'digitalWrite(pin, HIGH);',
  desc: 'HIGH means on (5 V on Uno/Mega, 3.3 V on ESP32/Pico); LOW means off (0 V). digitalRead() also answers HIGH or LOW.',
  example: S(`
void setup() {
  pinMode(13, OUTPUT);
  digitalWrite(13, HIGH);
  delay(2000);
  digitalWrite(13, LOW);
}

void loop() {
}
`) },
{ id: 'INPUT', cat: 'Constants', title: 'INPUT, OUTPUT, INPUT_PULLUP', words: ['INPUT', 'OUTPUT', 'INPUT_PULLUP'], syntax: 'pinMode(pin, OUTPUT);',
  desc: 'The three pin modes. OUTPUT drives LEDs, buzzers and relays. INPUT reads a sensor. INPUT_PULLUP reads a button wired to GND: it reads HIGH when not pressed and LOW when pressed, with no resistor needed.',
  example: S(`
void setup() {
  pinMode(13, OUTPUT);
  pinMode(7, INPUT);
  pinMode(2, INPUT_PULLUP);
}

void loop() {
  if (digitalRead(2) == LOW) {
    digitalWrite(13, HIGH);
  } else {
    digitalWrite(13, LOW);
  }
}
`) },
{ id: 'LED_BUILTIN', cat: 'Constants', words: ['LED_BUILTIN'], syntax: 'pinMode(LED_BUILTIN, OUTPUT);',
  desc: 'The pin of the small LED on the board itself (pin 13 on Uno and Mega). Handy for testing without any wiring.',
  example: S(`
void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(100);
  digitalWrite(LED_BUILTIN, LOW);
  delay(900);
}
`) },
{ id: 'HEX', cat: 'Constants', title: 'HEX, DEC, BIN', words: ['HEX', 'DEC', 'BIN'], syntax: 'Serial.println(x, HEX);',
  desc: 'Choose how print() and println() show a number: DEC (normal, base 10), HEX (base 16, used for RFID cards and IR remotes) or BIN (ones and zeros).',
  example: S(`
void setup() {
  Serial.begin(9600);
  Serial.println(255, DEC);
  Serial.println(255, HEX);
  Serial.println(255, BIN);
}

void loop() {
}
`) },
{ id: 'nullptr', cat: 'Constants', words: ['nullptr'], syntax: 'char* p = nullptr;',
  desc: 'A pointer that points to nothing yet.',
  example: S(`
const char* text = nullptr;

void setup() {
  Serial.begin(9600);
  if (text == nullptr) {
    text = "ok";
  }
  Serial.println(text);
}

void loop() {
}
`) },
// ---------------------------------------------------------------- Control
{ id: 'if', cat: 'Control structures', title: 'if and else', words: ['if', 'else'], syntax: 'if (condition) { } else { }',
  desc: 'Do something only when a condition is true; else says what to do otherwise. Chain else if for more choices.',
  example: S(`
void setup() {
  Serial.begin(9600);
}

void loop() {
  int value = analogRead(A0);
  if (value < 300) {
    Serial.println(1);
  } else if (value < 700) {
    Serial.println(2);
  } else {
    Serial.println(3);
  }
  delay(500);
}
`) },
{ id: 'switch', cat: 'Control structures', title: 'switch, case, default', words: ['switch', 'case', 'default', 'break'], syntax: 'switch (x) { case 1: break; default: break; }',
  desc: 'Pick one of many paths by the value of a number or char. Each case ends with break; default runs when no case matches.',
  example: S(`
void setup() {
  Serial.begin(9600);
  pinMode(8, OUTPUT);
  pinMode(9, OUTPUT);
}

void loop() {
  if (Serial.available() > 0) {
    char key = Serial.read();
    switch (key) {
      case 'a':
        digitalWrite(8, HIGH);
        break;
      case 'b':
        digitalWrite(9, HIGH);
        break;
      default:
        digitalWrite(8, LOW);
        digitalWrite(9, LOW);
        break;
    }
  }
}
`) },
{ id: 'for', cat: 'Control structures', words: ['for'], syntax: 'for (int i = 0; i < 10; i++) { }',
  desc: 'Repeat a block a set number of times. The three parts are: start, keep going while, and step.',
  example: S(`
void setup() {
  pinMode(9, OUTPUT);
}

void loop() {
  for (int brightness = 0; brightness <= 255; brightness += 5) {
    analogWrite(9, brightness);
    delay(20);
  }
  for (int brightness = 255; brightness >= 0; brightness -= 5) {
    analogWrite(9, brightness);
    delay(20);
  }
}
`) },
{ id: 'while', cat: 'Control structures', words: ['while'], syntax: 'while (condition) { }',
  desc: 'Repeat a block for as long as a condition stays true.',
  example: S(`
void setup() {
  pinMode(2, INPUT_PULLUP);
  pinMode(13, OUTPUT);
}

void loop() {
  while (digitalRead(2) == LOW) {
    digitalWrite(13, HIGH);
  }
  digitalWrite(13, LOW);
}
`) },
{ id: 'do', cat: 'Control structures', title: 'do ... while', words: ['do', 'while'], syntax: 'do { } while (condition);',
  desc: 'Like while, but the block always runs at least once, because the test comes at the end.',
  example: S(`
void setup() {
  Serial.begin(9600);
  int value;
  do {
    value = analogRead(A0);
    delay(10);
  } while (value < 100);
  Serial.println(value);
}

void loop() {
}
`) },
{ id: 'break', cat: 'Control structures', words: ['break'], syntax: 'break;',
  desc: 'Leave a for, while or switch straight away.',
  example: S(`
void setup() {
  Serial.begin(9600);
  for (int i = 0; i < 100; i++) {
    if (i == 5) {
      break;
    }
    Serial.println(i);
  }
}

void loop() {
}
`) },
{ id: 'continue', cat: 'Control structures', words: ['continue'], syntax: 'continue;',
  desc: 'Skip the rest of this round of a loop and go on with the next round.',
  example: S(`
void setup() {
  Serial.begin(9600);
  for (int i = 1; i <= 6; i++) {
    if (i % 2 == 0) {
      continue;
    }
    Serial.println(i);
  }
}

void loop() {
}
`) },
{ id: 'return', cat: 'Control structures', words: ['return'], syntax: 'return value;',
  desc: 'End a function, and give back a value if the function has a type.',
  example: S(`
int biggest(int a, int b) {
  if (a > b) {
    return a;
  }
  return b;
}

void setup() {
  Serial.begin(9600);
  Serial.println(biggest(4, 9));
}

void loop() {
}
`) },
{ id: 'goto', cat: 'Control structures', words: ['goto'], syntax: 'goto label;',
  desc: 'Jump to a named label in the same function. Rarely needed; break and return are usually clearer.',
  example: S(`
void setup() {
  Serial.begin(9600);
  for (int a = 0; a < 10; a++) {
    for (int b = 0; b < 10; b++) {
      if (a * b == 12) {
        Serial.println(a);
        goto done;
      }
    }
  }
done:
  Serial.println(0);
}

void loop() {
}
`) },
// ---------------------------------------------------------------- Operators
{ id: 'logic', cat: 'Operators', title: 'and, or, not', words: ['and', 'or', 'not'], syntax: 'if (a and b) { }',
  desc: 'Combine conditions. You can write the words, or the symbols && (and), || (or) and ! (not). Both forms mean exactly the same.',
  example: S(`
void setup() {
  pinMode(2, INPUT_PULLUP);
  pinMode(3, INPUT_PULLUP);
  pinMode(13, OUTPUT);
}

void loop() {
  bool a = digitalRead(2) == LOW;
  bool b = digitalRead(3) == LOW;
  if (a and b) {
    digitalWrite(13, HIGH);
  } else if (a or b) {
    digitalWrite(13, millis() / 200 % 2);
  } else if (not a) {
    digitalWrite(13, LOW);
  }
}
`) },
{ id: 'sizeof', cat: 'Operators', words: ['sizeof'], syntax: 'sizeof(x)',
  desc: 'The number of bytes something uses in memory. Divide by the size of one item to count the items of an array.',
  example: S(`
int notes[] = {262, 294, 330, 349};

void setup() {
  Serial.begin(9600);
  Serial.println(sizeof(notes));
  Serial.println(sizeof(notes) / sizeof(notes[0]));
}

void loop() {
}
`) },
// ---------------------------------------------------------------- Digital I/O
{ id: 'pinMode', cat: 'Digital I/O', words: ['pinMode'], syntax: 'pinMode(pin, mode);',
  params: ['pin: the pin number', 'mode: OUTPUT, INPUT or INPUT_PULLUP'],
  desc: 'Tell a pin whether it gives out power (OUTPUT) or reads (INPUT, INPUT_PULLUP). Do this in setup() for every pin you use.',
  example: S(`
void setup() {
  pinMode(13, OUTPUT);
  pinMode(2, INPUT_PULLUP);
}

void loop() {
  digitalWrite(13, digitalRead(2));
}
`) },
{ id: 'digitalWrite', cat: 'Digital I/O', words: ['digitalWrite'], syntax: 'digitalWrite(pin, value);',
  params: ['pin: the pin number', 'value: HIGH or LOW'],
  desc: 'Switch an OUTPUT pin on (HIGH) or off (LOW): LEDs, active buzzers, relays.',
  example: S(`
void setup() {
  pinMode(8, OUTPUT);
}

void loop() {
  digitalWrite(8, HIGH);
  delay(1000);
  digitalWrite(8, LOW);
  delay(1000);
}
`) },
{ id: 'digitalRead', cat: 'Digital I/O', words: ['digitalRead'], syntax: 'int value = digitalRead(pin);',
  params: ['pin: the pin number'], returns: 'HIGH or LOW',
  desc: 'Read whether a pin is HIGH or LOW: buttons, PIR motion sensors, tilt switches.',
  example: S(`
void setup() {
  pinMode(7, INPUT);
  pinMode(13, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int motion = digitalRead(7);
  digitalWrite(13, motion);
  Serial.println(motion);
  delay(200);
}
`) },
// ---------------------------------------------------------------- Analog I/O
{ id: 'analogRead', cat: 'Analog I/O', words: ['analogRead'], syntax: 'int value = analogRead(A0);',
  params: ['pin: A0, A1, ... (A0 to A15 on the Mega)'], returns: '0 to 1023 on Uno/Mega (0 to 4095 on ESP32)',
  desc: 'Measure a voltage: potentiometers, photoresistors (LDR), the water level sensor, the joystick.',
  example: S(`
void setup() {
  Serial.begin(9600);
}

void loop() {
  int value = analogRead(A0);
  float volts = value * 5.0 / 1023;
  Serial.print(value);
  Serial.print(" ");
  Serial.println(volts);
  delay(200);
}
`) },
{ id: 'analogWrite', cat: 'Analog I/O', words: ['analogWrite'], syntax: 'analogWrite(pin, value);',
  params: ['pin: a PWM pin (marked ~ ; 2-13 and 44-46 on the Mega)', 'value: 0 (off) to 255 (full)'],
  desc: 'Give a pin "part" power with PWM: dim an LED, mix RGB colours, set a DC motor speed through the L293D.',
  example: S(`
void setup() {
  pinMode(6, OUTPUT);
  pinMode(5, OUTPUT);
  pinMode(3, OUTPUT);
}

void loop() {
  analogWrite(6, 255);
  analogWrite(5, 0);
  analogWrite(3, 128);
  delay(1000);
  analogWrite(6, 0);
  analogWrite(5, 255);
  analogWrite(3, 0);
  delay(1000);
}
`) },
// ---------------------------------------------------------------- Advanced I/O
{ id: 'tone', cat: 'Advanced I/O', title: 'tone and noTone', words: ['tone', 'noTone'], syntax: 'tone(pin, frequency, duration);\nnoTone(pin);',
  params: ['pin: the buzzer pin', 'frequency: pitch in Hz (262 = C)', 'duration (optional): milliseconds'],
  desc: 'Play a note on a passive buzzer; noTone() stops it.',
  example: S(`
int melody[] = {262, 330, 392, 523};

void setup() {
  for (int i = 0; i < 4; i++) {
    tone(8, melody[i], 300);
    delay(350);
  }
  noTone(8);
}

void loop() {
}
`) },
{ id: 'pulseIn', cat: 'Advanced I/O', words: ['pulseIn'], syntax: 'unsigned long t = pulseIn(pin, HIGH, timeout);',
  params: ['pin: the pin to watch', 'value: HIGH or LOW', 'timeout (optional): microseconds to wait'], returns: 'the length of the pulse in microseconds (0 if none)',
  desc: 'Time how long a pin stays HIGH or LOW. The HC-SR04 ultrasonic sensor answers with a pulse whose length is the distance.',
  example: S(`
void setup() {
  Serial.begin(9600);
  pinMode(12, OUTPUT);
  pinMode(11, INPUT);
}

void loop() {
  digitalWrite(12, LOW);
  delayMicroseconds(2);
  digitalWrite(12, HIGH);
  delayMicroseconds(10);
  digitalWrite(12, LOW);
  unsigned long t = pulseIn(11, HIGH, 30000);
  Serial.println(t * 0.0343 / 2);
  delay(500);
}
`) },
{ id: 'shiftOut', cat: 'Advanced I/O', title: 'shiftOut, LSBFIRST, MSBFIRST', words: ['shiftOut', 'MSBFIRST', 'LSBFIRST'], syntax: 'shiftOut(dataPin, clockPin, MSBFIRST, value);',
  params: ['dataPin, clockPin: the pins to the 74HC595', 'order: MSBFIRST or LSBFIRST', 'value: the byte to send'],
  desc: 'Send 8 bits one by one, for example to a 74HC595 shift register that drives 8 LEDs or a 7-segment display from 3 pins.',
  example: S(`
void setup() {
  pinMode(2, OUTPUT);
  pinMode(3, OUTPUT);
  pinMode(4, OUTPUT);
}

void loop() {
  for (int n = 0; n < 256; n++) {
    digitalWrite(3, LOW);
    shiftOut(2, 4, MSBFIRST, n);
    digitalWrite(3, HIGH);
    delay(100);
  }
}
`) },
{ id: 'shiftIn', cat: 'Advanced I/O', words: ['shiftIn'], syntax: 'byte b = shiftIn(dataPin, clockPin, MSBFIRST);',
  desc: 'Read 8 bits one by one from a shift register such as the 74HC165.',
  example: S(`
void setup() {
  Serial.begin(9600);
  pinMode(2, INPUT);
  pinMode(4, OUTPUT);
}

void loop() {
  byte b = shiftIn(2, 4, MSBFIRST);
  Serial.println(b, BIN);
  delay(500);
}
`) },
// ---------------------------------------------------------------- Time
{ id: 'delay', cat: 'Time', words: ['delay'], syntax: 'delay(ms);',
  params: ['ms: milliseconds to wait (1000 = 1 second)'],
  desc: 'Pause the program. Nothing else happens while it waits; for doing two things at once, use millis().',
  example: S(`
void setup() {
  pinMode(13, OUTPUT);
}

void loop() {
  digitalWrite(13, HIGH);
  delay(10000);
  digitalWrite(13, LOW);
  delay(3000);
}
`) },
{ id: 'delayMicroseconds', cat: 'Time', words: ['delayMicroseconds'], syntax: 'delayMicroseconds(us);',
  desc: 'Pause for a very short time, in microseconds (1 000 000 = 1 second). Used for sensor trigger pulses.',
  example: S(`
void setup() {
  pinMode(12, OUTPUT);
}

void loop() {
  digitalWrite(12, HIGH);
  delayMicroseconds(10);
  digitalWrite(12, LOW);
  delay(60);
}
`) },
{ id: 'millis', cat: 'Time', words: ['millis'], syntax: 'unsigned long t = millis();', returns: 'milliseconds since the board started',
  desc: 'A clock that counts milliseconds. Compare two readings to do something every so often without stopping the program.',
  example: S(`
unsigned long last = 0;
bool on = false;

void setup() {
  pinMode(13, OUTPUT);
}

void loop() {
  if (millis() - last >= 500) {
    last = millis();
    on = !on;
    digitalWrite(13, on);
  }
}
`) },
{ id: 'micros', cat: 'Time', words: ['micros'], syntax: 'unsigned long t = micros();',
  desc: 'Like millis(), but in microseconds. Useful for timing very fast events.',
  example: S(`
void setup() {
  Serial.begin(9600);
  unsigned long start = micros();
  analogRead(A0);
  Serial.println(micros() - start);
}

void loop() {
}
`) },
// ---------------------------------------------------------------- Math
{ id: 'minmax', cat: 'Math', title: 'min, max, abs', words: ['min', 'max', 'abs'], syntax: 'min(a, b)  max(a, b)  abs(x)',
  desc: 'The smaller of two values, the larger of two values, and the size of a number without its minus sign.',
  example: S(`
void setup() {
  Serial.begin(9600);
  Serial.println(min(7, 3));
  Serial.println(max(7, 3));
  Serial.println(abs(-12));
}

void loop() {
}
`) },
{ id: 'constrain', cat: 'Math', words: ['constrain'], syntax: 'constrain(x, low, high)',
  desc: 'Keep a value between a lowest and a highest value.',
  example: S(`
void setup() {
  Serial.begin(9600);
  pinMode(9, OUTPUT);
}

void loop() {
  int power = analogRead(A0) - 300;
  power = constrain(power, 0, 255);
  analogWrite(9, power);
  Serial.println(power);
  delay(100);
}
`) },
{ id: 'map', cat: 'Math', words: ['map'], syntax: 'map(value, fromLow, fromHigh, toLow, toHigh)',
  desc: 'Re-scale a number from one range to another, for example a 0-1023 reading to a 0-180 servo angle.',
  example: S(`
void setup() {
  Serial.begin(9600);
}

void loop() {
  int reading = analogRead(A0);
  int angle = map(reading, 0, 1023, 0, 180);
  Serial.println(angle);
  delay(100);
}
`) },
{ id: 'pow', cat: 'Math', title: 'pow and sqrt', words: ['pow', 'sqrt'], syntax: 'pow(base, exponent)  sqrt(x)',
  desc: 'Powers (2 to the 8th = 256) and square roots.',
  example: S(`
void setup() {
  Serial.begin(9600);
  Serial.println(pow(2, 8));
  Serial.println(sqrt(144));
}

void loop() {
}
`) },
{ id: 'trig', cat: 'Math', title: 'sin, cos, tan', words: ['sin', 'cos', 'tan'], syntax: 'sin(radians)',
  desc: 'Trigonometry with angles in radians (180 degrees = PI radians). Handy for smooth, wave-like movement.',
  example: S(`
void setup() {
  pinMode(9, OUTPUT);
}

void loop() {
  for (int d = 0; d < 360; d += 5) {
    float r = d * PI / 180;
    analogWrite(9, 127 + 127 * sin(r));
    delay(20);
  }
}
`) },
{ id: 'round', cat: 'Math', title: 'floor, ceil, round', words: ['floor', 'ceil', 'round'], syntax: 'round(x)',
  desc: 'Round a decimal number down (floor), up (ceil) or to the nearest whole number (round).',
  example: S(`
void setup() {
  Serial.begin(9600);
  Serial.println(floor(2.7));
  Serial.println(ceil(2.1));
  Serial.println(round(2.5));
}

void loop() {
}
`) },
{ id: 'isnan', cat: 'Math', words: ['isnan'], syntax: 'isnan(x)',
  desc: 'True when a float is "not a number", which is how the DHT11 tells you a reading failed.',
  example: S(`
void setup() {
  Serial.begin(9600);
  float bad = sqrt(-1);
  if (isnan(bad)) {
    Serial.println(0);
  }
}

void loop() {
}
`) },
// ---------------------------------------------------------------- Random
{ id: 'random', cat: 'Random numbers', title: 'random and randomSeed', words: ['random', 'randomSeed'], syntax: 'random(max)  random(min, max)\nrandomSeed(seed);',
  desc: 'random() gives a surprise number below max. randomSeed() with a reading from an unconnected analog pin makes the numbers different every time the board starts.',
  example: S(`
void setup() {
  Serial.begin(9600);
  randomSeed(analogRead(A5));
}

void loop() {
  int dice = random(1, 7);
  Serial.println(dice);
  delay(1000);
}
`) },
// ---------------------------------------------------------------- Bits
{ id: 'bitRead', cat: 'Bits and bytes', title: 'bitRead, bitWrite, bitSet, bitClear', words: ['bitRead', 'bitWrite', 'bitSet', 'bitClear'], syntax: 'bitRead(x, n)  bitWrite(x, n, value)  bitSet(x, n)  bitClear(x, n)',
  desc: 'Read or change one bit (one of the 8 switches) inside a byte. Bit 0 is the rightmost.',
  example: S(`
void setup() {
  Serial.begin(9600);
  byte x = 0;
  bitSet(x, 0);
  bitSet(x, 3);
  bitWrite(x, 7, 1);
  bitClear(x, 0);
  Serial.println(x, BIN);
  Serial.println(bitRead(x, 3));
}

void loop() {
}
`) },
{ id: 'highByte', cat: 'Bits and bytes', title: 'highByte and lowByte', words: ['highByte', 'lowByte'], syntax: 'highByte(x)  lowByte(x)',
  desc: 'Split a 16-bit number into its two bytes, for sending over Wire or saving in EEPROM.',
  example: S(`
void setup() {
  Serial.begin(9600);
  int x = 1000;
  Serial.println(highByte(x));
  Serial.println(lowByte(x));
}

void loop() {
}
`) },
// ---------------------------------------------------------------- Interrupts
{ id: 'attachInterrupt', cat: 'Interrupts', title: 'attachInterrupt', words: ['attachInterrupt', 'digitalPinToInterrupt', 'RISING', 'FALLING', 'CHANGE'], syntax: 'attachInterrupt(digitalPinToInterrupt(pin), function, mode);',
  params: ['pin: 2, 3, 18, 19, 20 or 21 on the Mega (2 and 3 on the Uno)', 'function: your function with no inputs', 'mode: RISING (LOW to HIGH), FALLING (HIGH to LOW) or CHANGE (either)'],
  desc: 'Run a function the instant a pin changes, even in the middle of loop(). Used for rotary encoders and fast buttons.',
  example: S(`
volatile long steps = 0;

void turned() {
  if (digitalRead(3) == digitalRead(2)) {
    steps--;
  } else {
    steps++;
  }
}

void setup() {
  Serial.begin(9600);
  pinMode(2, INPUT);
  pinMode(3, INPUT);
  attachInterrupt(digitalPinToInterrupt(2), turned, CHANGE);
}

void loop() {
  Serial.println(steps);
  delay(200);
}
`) },
{ id: 'detachInterrupt', cat: 'Interrupts', words: ['detachInterrupt'], syntax: 'detachInterrupt(digitalPinToInterrupt(pin));',
  desc: 'Stop an interrupt you attached.',
  example: S(`
volatile int count = 0;

void tick() {
  count++;
}

void setup() {
  Serial.begin(9600);
  pinMode(2, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(2), tick, FALLING);
}

void loop() {
  if (count >= 10) {
    detachInterrupt(digitalPinToInterrupt(2));
    Serial.println(count);
  }
  delay(100);
}
`) },
{ id: 'interrupts', cat: 'Interrupts', title: 'interrupts and noInterrupts', words: ['interrupts', 'noInterrupts'], syntax: 'noInterrupts();  ...  interrupts();',
  desc: 'Pause all interrupts for a moment while you copy a value they change, then switch them back on.',
  example: S(`
volatile long ticks = 0;

void tick() {
  ticks++;
}

void setup() {
  Serial.begin(9600);
  pinMode(2, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(2), tick, FALLING);
}

void loop() {
  noInterrupts();
  long copy = ticks;
  interrupts();
  Serial.println(copy);
  delay(500);
}
`) },
// ---------------------------------------------------------------- Serial
{ id: 'Serial', cat: 'Serial communication', title: 'Serial and begin', words: ['Serial', 'begin'], syntax: 'Serial.begin(9600);',
  desc: 'Serial talks to the computer over the USB cable. begin() starts it at a speed (9600 is usual). Open Tools → Serial Monitor and pick the same speed to see the messages.',
  example: S(`
void setup() {
  Serial.begin(9600);
  Serial.println(2026);
}

void loop() {
}
`) },
{ id: 'print', cat: 'Serial communication', title: 'print and println', words: ['print', 'println'], syntax: 'Serial.print(x);\nSerial.println(x);',
  desc: 'Send text or numbers to the Serial Monitor. println() adds a new line at the end; print() does not. The LCD uses the same words.',
  example: S(`
void setup() {
  Serial.begin(9600);
}

void loop() {
  int value = analogRead(A0);
  Serial.print("A0 = ");
  Serial.println(value);
  delay(500);
}
`) },
{ id: 'available', cat: 'Serial communication', title: 'available and read', words: ['available', 'read'], syntax: 'if (Serial.available() > 0) { char c = Serial.read(); }',
  desc: 'available() tells you how many characters have arrived from the computer; read() takes the next one.',
  example: S(`
void setup() {
  Serial.begin(9600);
  pinMode(13, OUTPUT);
}

void loop() {
  if (Serial.available() > 0) {
    char c = Serial.read();
    if (c == '1') digitalWrite(13, HIGH);
    if (c == '0') digitalWrite(13, LOW);
  }
}
`) },
{ id: 'write', cat: 'Serial communication', words: ['write'], syntax: 'Serial.write(byte);',
  desc: 'Send raw bytes instead of text. The same word is used to send bytes over Wire (I2C), to move a servo and to save to EEPROM.',
  example: S(`
void setup() {
  Serial.begin(9600);
  Serial.write(65);
  Serial.write('\\n');
}

void loop() {
}
`) },
{ id: 'parseInt', cat: 'Serial communication', title: 'parseInt and parseFloat', words: ['parseInt', 'parseFloat'], syntax: 'int n = Serial.parseInt();',
  desc: 'Read a whole typed number (or a decimal number) from the Serial Monitor.',
  example: S(`
void setup() {
  Serial.begin(9600);
  pinMode(9, OUTPUT);
}

void loop() {
  if (Serial.available() > 0) {
    int level = Serial.parseInt();
    analogWrite(9, constrain(level, 0, 255));
    Serial.println(level);
  }
}
`) },
{ id: 'readString', cat: 'Serial communication', title: 'readString and readStringUntil', words: ['readString', 'readStringUntil'], syntax: "String s = Serial.readStringUntil('\\n');",
  desc: 'Read typed text as a String: everything that arrived, or up to a character you choose.',
  example: S(`
void setup() {
  Serial.begin(9600);
}

void loop() {
  if (Serial.available() > 0) {
    String line = Serial.readStringUntil('\\n');
    Serial.println(line.length());
  }
}
`) },
// ---------------------------------------------------------------- String functions
{ id: 'length', cat: 'Text (String)', words: ['length'], syntax: 's.length()',
  desc: 'How many characters a String has.',
  example: S(`
void setup() {
  Serial.begin(9600);
  String s = "Arduino";
  Serial.println(s.length());
}

void loop() {
}
`) },
{ id: 'toInt', cat: 'Text (String)', title: 'toInt and toFloat', words: ['toInt', 'toFloat'], syntax: 's.toInt()  s.toFloat()',
  desc: 'Turn text that holds a number into a real number you can calculate with.',
  example: S(`
void setup() {
  Serial.begin(9600);
  String a = "42";
  String b = "2.5";
  Serial.println(a.toInt() + 1);
  Serial.println(b.toFloat() * 2);
}

void loop() {
}
`) },
{ id: 'indexOf', cat: 'Text (String)', title: 'indexOf and substring', words: ['indexOf', 'substring'], syntax: 's.indexOf(":")  s.substring(from, to)',
  desc: 'indexOf() finds where something is in a String (or -1 if it is not there); substring() cuts out a part.',
  example: S(`
void setup() {
  Serial.begin(9600);
  String cmd = "speed:120";
  int at = cmd.indexOf(':');
  String value = cmd.substring(at + 1);
  Serial.println(value.toInt());
}

void loop() {
}
`) },
{ id: 'trim', cat: 'Text (String)', words: ['trim'], syntax: 's.trim();',
  desc: 'Remove spaces and new-line characters from both ends of a String.',
  example: S(`
void setup() {
  Serial.begin(9600);
  String s = "  on \\n";
  s.trim();
  Serial.println(s.length());
}

void loop() {
}
`) },
{ id: 'case', cat: 'Text (String)', title: 'toUpperCase and toLowerCase', words: ['toUpperCase', 'toLowerCase'], syntax: 's.toUpperCase();',
  desc: 'Change a String to capital letters or to small letters, so "On", "ON" and "on" all match.',
  example: S(`
void setup() {
  Serial.begin(9600);
  String s = "Soga";
  s.toUpperCase();
  Serial.println(s);
  s.toLowerCase();
  Serial.println(s);
}

void loop() {
}
`) },
{ id: 'startsWith', cat: 'Text (String)', title: 'startsWith and endsWith', words: ['startsWith', 'endsWith'], syntax: 's.startsWith("x")  s.endsWith("x")',
  desc: 'Check how a String begins or ends.',
  example: S(`
void setup() {
  Serial.begin(9600);
  String file = "data.txt";
  Serial.println(file.startsWith("data"));
  Serial.println(file.endsWith(".csv"));
}

void loop() {
}
`) },
{ id: 'replace', cat: 'Text (String)', words: ['replace'], syntax: 's.replace("a", "b");',
  desc: 'Replace every copy of one piece of text with another.',
  example: S(`
void setup() {
  Serial.begin(9600);
  String s = "1,2,3";
  s.replace(",", " ");
  Serial.println(s);
}

void loop() {
}
`) },
{ id: 'chars', cat: 'Text (String)', title: 'isdigit, isalpha, toupper', words: ['isdigit', 'isalpha', 'isspace', 'toupper', 'tolower'], syntax: 'isdigit(c)  toupper(c)',
  desc: 'Test or change a single char: is it a digit? a letter? a space? Make it a capital or a small letter.',
  example: S(`
void setup() {
  Serial.begin(9600);
  char c = 'b';
  Serial.println(isalpha(c));
  Serial.println(isdigit('7'));
  Serial.println(isspace(' '));
  Serial.println((char) toupper(c));
  Serial.println((char) tolower('Q'));
}

void loop() {
}
`) },
// ---------------------------------------------------------------- Structures
{ id: 'struct', cat: 'Your own types', words: ['struct'], syntax: 'struct Name { int a; int b; };',
  desc: 'Bundle several values into one new type, for example the three pins of one traffic light.',
  example: S(`
struct Light {
  int red;
  int yellow;
  int green;
};

Light road = {10, 9, 8};

void setup() {
  pinMode(road.red, OUTPUT);
  pinMode(road.yellow, OUTPUT);
  pinMode(road.green, OUTPUT);
  digitalWrite(road.green, HIGH);
}

void loop() {
}
`) },
{ id: 'enum', cat: 'Your own types', words: ['enum'], syntax: 'enum Name { A, B, C };',
  desc: 'A list of named choices. Good for the states of a machine, such as the colours of a traffic light.',
  example: S(`
enum State { GO, SLOW, STOP };
State state = GO;

void setup() {
  Serial.begin(9600);
}

void loop() {
  if (state == GO) {
    state = SLOW;
  } else if (state == SLOW) {
    state = STOP;
  } else {
    state = GO;
  }
  Serial.println(state);
  delay(1000);
}
`) },
{ id: 'class', cat: 'Your own types', title: 'class, public, private', words: ['class', 'public', 'private'], syntax: 'class Name { public: void f(); private: int x; };',
  desc: 'A class bundles values and the functions that use them. public parts can be used from outside; private parts are hidden.',
  example: S(`
class Blinker {
public:
  Blinker(int pin) {
    p = pin;
    pinMode(p, OUTPUT);
  }
  void flash() {
    digitalWrite(p, HIGH);
    delay(100);
    digitalWrite(p, LOW);
    delay(100);
  }
private:
  int p;
};

Blinker led(13);

void setup() {
}

void loop() {
  led.flash();
}
`) },
// ---------------------------------------------------------------- Servo
{ id: 'Servo', cat: 'Servo motor', title: 'Servo, attach, write', words: ['Servo', 'attach', 'write'], include: ['Servo.h'], syntax: 'Servo s;\ns.attach(pin);\ns.write(angle);',
  desc: 'Control the SG90 servo: attach() connects it to a pin (orange wire), write() turns it to an angle from 0 to 180 degrees.',
  example: S(`
Servo arm;

void setup() {
  arm.attach(9);
}

void loop() {
  arm.write(0);
  delay(1000);
  arm.write(90);
  delay(1000);
  arm.write(180);
  delay(1000);
}
`) },
{ id: 'writeMicroseconds', cat: 'Servo motor', title: 'writeMicroseconds and detach', words: ['writeMicroseconds', 'detach'], include: ['Servo.h'], syntax: 's.writeMicroseconds(1500);\ns.detach();',
  desc: 'writeMicroseconds() sets the servo pulse exactly (1000 to 2000; 1500 is the middle). detach() lets the servo go limp and saves power.',
  example: S(`
Servo arm;

void setup() {
  arm.attach(9);
  arm.writeMicroseconds(1500);
  delay(1000);
  arm.detach();
}

void loop() {
}
`) },
// ---------------------------------------------------------------- Wire
{ id: 'Wire', cat: 'I2C (Wire)', title: 'Wire, beginTransmission, endTransmission', words: ['Wire', 'beginTransmission', 'endTransmission'], include: ['Wire.h'], syntax: 'Wire.begin();\nWire.beginTransmission(address);\nWire.write(b);\nWire.endTransmission();',
  desc: 'I2C connects many modules (MPU-6050, DS3231, LCD backpacks) on two wires: SDA (pin 20 on the Mega) and SCL (pin 21). Start a message to a module address, write bytes, and end it.',
  example: S(`
void setup() {
  Wire.begin();
  Wire.beginTransmission(0x68);
  Wire.write(0x6B);
  Wire.write(0);
  Wire.endTransmission(true);
}

void loop() {
}
`) },
{ id: 'requestFrom', cat: 'I2C (Wire)', title: 'requestFrom', words: ['requestFrom'], include: ['Wire.h'], syntax: 'Wire.requestFrom(address, count);',
  desc: 'Ask a module for a number of bytes, then read them with available() and read().',
  example: S(`
void setup() {
  Serial.begin(9600);
  Wire.begin();
}

void loop() {
  Wire.beginTransmission(0x68);
  Wire.write(0x75);
  Wire.endTransmission(false);
  Wire.requestFrom(0x68, 1);
  if (Wire.available()) {
    Serial.println(Wire.read(), HEX);
  }
  delay(1000);
}
`) },
{ id: 'onReceive', cat: 'I2C (Wire)', title: 'onReceive and onRequest', words: ['onReceive', 'onRequest'], include: ['Wire.h'], syntax: 'Wire.onReceive(function);\nWire.onRequest(function);',
  desc: 'Make the board itself an I2C module: run a function when another board sends to it, or asks it for data.',
  example: S(`
volatile int last = 0;

void received(int count) {
  while (Wire.available()) {
    last = Wire.read();
  }
}

void asked() {
  Wire.write(last);
}

void setup() {
  Wire.begin(8);
  Wire.onReceive(received);
  Wire.onRequest(asked);
}

void loop() {
}
`) },
// ---------------------------------------------------------------- SPI / EEPROM
{ id: 'SPI', cat: 'SPI', title: 'SPI and transfer', words: ['SPI', 'transfer'], include: ['SPI.h'], syntax: 'SPI.begin();\nbyte b = SPI.transfer(x);',
  desc: 'SPI is a fast 4-wire bus used by the RC522 RFID reader and SD cards (pins 50-53 on the Mega). transfer() sends a byte and receives one at the same time.',
  example: S(`
void setup() {
  Serial.begin(9600);
  SPI.begin();
  pinMode(53, OUTPUT);
  digitalWrite(53, LOW);
  byte answer = SPI.transfer(0x37);
  digitalWrite(53, HIGH);
  Serial.println(answer, HEX);
}

void loop() {
}
`) },
{ id: 'EEPROM', cat: 'EEPROM memory', title: 'EEPROM, read, write, update, put', words: ['EEPROM', 'update', 'put'], include: ['EEPROM.h'], syntax: 'EEPROM.read(address)\nEEPROM.update(address, value);\nEEPROM.put(address, data);',
  desc: 'Memory that remembers even when the power is off (4096 bytes on the Mega). update() only writes when the value changed, which makes the memory last longer.',
  example: S(`
void setup() {
  Serial.begin(9600);
  byte starts = EEPROM.read(0);
  starts++;
  EEPROM.update(0, starts);
  Serial.println(starts);
  float best = 12.5;
  EEPROM.put(10, best);
}

void loop() {
}
`) },
// ---------------------------------------------------------------- Stepper
{ id: 'Stepper', cat: 'Stepper motor', title: 'Stepper, setSpeed, step', words: ['Stepper', 'setSpeed', 'step'], include: ['Stepper.h'], syntax: 'Stepper m(steps, in1, in3, in2, in4);\nm.setSpeed(rpm);\nm.step(n);',
  desc: 'The 28BYJ-48 stepper with the ULN2003 board: 2048 steps make one turn. setSpeed() sets turns per minute; step() moves (negative numbers go backwards).',
  example: S(`
Stepper motor(2048, 8, 10, 9, 11);

void setup() {
  motor.setSpeed(10);
}

void loop() {
  motor.step(2048);
  delay(500);
  motor.step(-1024);
  delay(500);
}
`) },
// ---------------------------------------------------------------- LCD
{ id: 'LiquidCrystal', cat: 'LCD1602 display', title: 'LiquidCrystal, setCursor, clear', words: ['LiquidCrystal', 'setCursor', 'clear'], include: ['LiquidCrystal.h'], syntax: 'LiquidCrystal lcd(rs, e, d4, d5, d6, d7);\nlcd.begin(16, 2);\nlcd.setCursor(column, row);\nlcd.clear();',
  desc: 'Write on the 16x2 LCD. begin() sets its size, setCursor() moves to a column (0-15) and row (0-1), print() writes, clear() wipes it.',
  example: S(`
LiquidCrystal lcd(7, 8, 9, 10, 11, 12);

void setup() {
  lcd.begin(16, 2);
  lcd.print("Soga");
}

void loop() {
  lcd.setCursor(0, 1);
  lcd.print(millis() / 1000);
  delay(1000);
  if (millis() > 60000) {
    lcd.clear();
  }
}
`) },
{ id: 'lcdcursor', cat: 'LCD1602 display', title: 'home, cursor, blink', words: ['home', 'cursor', 'noCursor', 'blink', 'noBlink'], include: ['LiquidCrystal.h'], syntax: 'lcd.home();  lcd.cursor();  lcd.blink();',
  desc: 'home() goes back to the top-left; cursor()/noCursor() show or hide the underline cursor; blink()/noBlink() make a blinking block.',
  example: S(`
LiquidCrystal lcd(7, 8, 9, 10, 11, 12);

void setup() {
  lcd.begin(16, 2);
  lcd.print("12345");
  lcd.home();
  lcd.cursor();
  delay(2000);
  lcd.noCursor();
  lcd.blink();
  delay(2000);
  lcd.noBlink();
}

void loop() {
}
`) },
{ id: 'lcddisplay', cat: 'LCD1602 display', title: 'display, scroll, autoscroll', words: ['display', 'noDisplay', 'scrollDisplayLeft', 'scrollDisplayRight', 'autoscroll', 'noAutoscroll'], include: ['LiquidCrystal.h'], syntax: 'lcd.noDisplay();  lcd.scrollDisplayLeft();',
  desc: 'Switch the text off and on without losing it, slide everything left or right, or make new letters push the text along.',
  example: S(`
LiquidCrystal lcd(7, 8, 9, 10, 11, 12);

void setup() {
  lcd.begin(16, 2);
  lcd.print("Soga Arduino 2026");
}

void loop() {
  for (int i = 0; i < 5; i++) {
    lcd.scrollDisplayLeft();
    delay(400);
  }
  for (int i = 0; i < 5; i++) {
    lcd.scrollDisplayRight();
    delay(400);
  }
  lcd.noDisplay();
  delay(500);
  lcd.display();
  delay(500);
}
`) },
{ id: 'createChar', cat: 'LCD1602 display', words: ['createChar'], include: ['LiquidCrystal.h'], syntax: 'lcd.createChar(number, pattern);',
  desc: 'Draw your own character (5x8 dots), such as a heart, and print it with write().',
  example: S(`
LiquidCrystal lcd(7, 8, 9, 10, 11, 12);
byte heart[8] = {0, 10, 31, 31, 14, 4, 0, 0};

void setup() {
  lcd.begin(16, 2);
  lcd.createChar(0, heart);
  lcd.write(byte(0));
}

void loop() {
}
`) },
// ---------------------------------------------------------------- DHT11
{ id: 'DHT', cat: 'DHT11 temperature and humidity', title: 'readTemperature and readHumidity', words: ['readTemperature', 'readHumidity'], include: ['DHT.h'], syntax: 'DHT dht(pin, DHT11);\ndht.begin();\nfloat t = dht.readTemperature();',
  desc: 'Read degrees Celsius and relative humidity (%) from the DHT11. Read at most once every 2 seconds. Needs the "DHT sensor library" from Adafruit.',
  example: S(`
DHT dht(2, DHT11);

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  delay(2000);
  float t = dht.readTemperature();
  float h = dht.readHumidity();
  if (isnan(t) || isnan(h)) {
    return;
  }
  Serial.print(t);
  Serial.print(" C  ");
  Serial.print(h);
  Serial.println(" %");
}
`) },
// ---------------------------------------------------------------- RFID
{ id: 'MFRC522', cat: 'RC522 RFID reader', title: 'PCD_Init, PICC_IsNewCardPresent, PICC_ReadCardSerial', words: ['PCD_Init', 'PICC_IsNewCardPresent', 'PICC_ReadCardSerial', 'PICC_HaltA', 'uid', 'uidByte'], include: ['SPI.h', 'MFRC522.h'], syntax: 'MFRC522 rfid(ssPin, rstPin);\nrfid.PCD_Init();\nrfid.PICC_IsNewCardPresent()\nrfid.uid.uidByte[i]',
  desc: 'Read the number of the white card or blue key fob. Wire SDA to 53, SCK 52, MOSI 51, MISO 50, RST 5 and power at 3.3 V. Needs the "MFRC522" library.',
  example: S(`
MFRC522 rfid(53, 5);

void setup() {
  Serial.begin(9600);
  SPI.begin();
  rfid.PCD_Init();
}

void loop() {
  if (!rfid.PICC_IsNewCardPresent() || !rfid.PICC_ReadCardSerial()) {
    return;
  }
  for (byte i = 0; i < rfid.uid.size; i++) {
    Serial.print(rfid.uid.uidByte[i], HEX);
    Serial.print(" ");
  }
  Serial.println();
  rfid.PICC_HaltA();
}
`) },
// ---------------------------------------------------------------- RTC
{ id: 'RTClib', cat: 'DS3231 real-time clock', title: 'DateTime, now, adjust, lostPower', words: ['DateTime', 'now', 'adjust', 'lostPower'], include: ['RTClib.h'], syntax: 'RTC_DS3231 rtc;\nDateTime t = rtc.now();\nrtc.adjust(DateTime(...));',
  desc: 'The DS3231 keeps the date and time even with the power off. now() reads it; adjust() sets it; lostPower() is true when the coin battery ran out. Needs the "RTClib" library.',
  example: S(`
RTC_DS3231 rtc;

void setup() {
  Serial.begin(9600);
  rtc.begin();
  if (rtc.lostPower()) {
    rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));
  }
}

void loop() {
  DateTime t = rtc.now();
  Serial.println(t.unixtime());
  delay(1000);
}
`) },
{ id: 'DateTimeParts', cat: 'DS3231 real-time clock', title: 'year, month, day, hour, minute, second', words: ['year', 'month', 'day', 'hour', 'minute', 'second', 'dayOfTheWeek'], include: ['RTClib.h'], syntax: 't.year()  t.month()  t.day()  t.hour()  t.minute()  t.second()  t.dayOfTheWeek()',
  desc: 'Take a DateTime apart. dayOfTheWeek() is 0 for Sunday up to 6 for Saturday.',
  example: S(`
RTC_DS3231 rtc;

void setup() {
  Serial.begin(9600);
  rtc.begin();
}

void loop() {
  DateTime t = rtc.now();
  Serial.print(t.year());
  Serial.print('/');
  Serial.print(t.month());
  Serial.print('/');
  Serial.print(t.day());
  Serial.print(' ');
  Serial.print(t.hour());
  Serial.print(':');
  Serial.print(t.minute());
  Serial.print(':');
  Serial.print(t.second());
  Serial.print("  ");
  Serial.println(t.dayOfTheWeek());
  delay(1000);
}
`) },
// ---------------------------------------------------------------- IR
{ id: 'IrReceiver', cat: 'IR remote', title: 'IrReceiver, decode, resume', words: ['IrReceiver', 'decode', 'decodedIRData', 'command', 'resume', 'ENABLE_LED_FEEDBACK'], include: ['IRremote.hpp'], syntax: 'IrReceiver.begin(pin, ENABLE_LED_FEEDBACK);\nif (IrReceiver.decode()) { IrReceiver.decodedIRData.command; IrReceiver.resume(); }',
  desc: 'Read the buttons of the small remote. decode() is true when a button was pressed; decodedIRData.command is its number; resume() gets ready for the next one. Needs the "IRremote" library.',
  example: S(`
void setup() {
  Serial.begin(9600);
  IrReceiver.begin(11, ENABLE_LED_FEEDBACK);
}

void loop() {
  if (IrReceiver.decode()) {
    Serial.println(IrReceiver.decodedIRData.command, HEX);
    IrReceiver.resume();
  }
}
`) },
// ---------------------------------------------------------------- Keypad
{ id: 'Keypad', cat: '4x4 keypad', title: 'Keypad, makeKeymap, getKey, NO_KEY', words: ['Keypad', 'makeKeymap', 'getKey', 'NO_KEY'], include: ['Keypad.h'], syntax: 'Keypad pad(makeKeymap(keys), rowPins, colPins, 4, 4);\nchar k = pad.getKey();',
  desc: 'Read the 16 keys. getKey() gives the char of the pressed key, or NO_KEY when nothing is pressed. Needs the "Keypad" library.',
  example: S(`
char keys[4][4] = {
  {'1', '2', '3', 'A'},
  {'4', '5', '6', 'B'},
  {'7', '8', '9', 'C'},
  {'*', '0', '#', 'D'},
};
byte rowPins[4] = {9, 8, 7, 6};
byte colPins[4] = {5, 4, 3, 2};
Keypad pad(makeKeymap(keys), rowPins, colPins, 4, 4);

void setup() {
  Serial.begin(9600);
}

void loop() {
  char k = pad.getKey();
  if (k != NO_KEY) {
    Serial.println(k);
  }
}
`) },
// ---------------------------------------------------------------- MAX7219
{ id: 'LedControl', cat: 'MAX7219 LED matrix', title: 'LedControl, shutdown, setIntensity, clearDisplay', words: ['LedControl', 'shutdown', 'setIntensity', 'clearDisplay'], include: ['LedControl.h'], syntax: 'LedControl lc(din, clk, cs, 1);\nlc.shutdown(0, false);\nlc.setIntensity(0, 8);\nlc.clearDisplay(0);',
  desc: 'Start the 8x8 matrix: wake it with shutdown(0, false), set brightness 0-15, and clear it. Needs the "LedControl" library.',
  example: S(`
LedControl lc(12, 11, 10, 1);

void setup() {
  lc.shutdown(0, false);
  lc.setIntensity(0, 8);
  lc.clearDisplay(0);
}

void loop() {
}
`) },
{ id: 'setLed', cat: 'MAX7219 LED matrix', title: 'setLed, setRow, setColumn', words: ['setLed', 'setRow', 'setColumn'], include: ['LedControl.h'], syntax: 'lc.setLed(0, row, column, true);\nlc.setRow(0, row, pattern);',
  desc: 'Light one dot, a whole row (8 dots from one byte) or a whole column.',
  example: S(`
LedControl lc(12, 11, 10, 1);
byte smile[8] = {0x3C, 0x42, 0xA5, 0x81, 0xA5, 0x99, 0x42, 0x3C};

void setup() {
  lc.shutdown(0, false);
  lc.setIntensity(0, 5);
  for (int r = 0; r < 8; r++) {
    lc.setRow(0, r, smile[r]);
  }
  delay(2000);
  lc.clearDisplay(0);
  lc.setLed(0, 3, 3, true);
  lc.setColumn(0, 7, 0xFF);
}

void loop() {
}
`) },
{ id: 'setDigit', cat: 'MAX7219 LED matrix', title: 'setDigit and setChar', words: ['setDigit', 'setChar'], include: ['LedControl.h'], syntax: 'lc.setDigit(0, position, number, dot);',
  desc: 'For MAX7219 boards with 7-segment digits: show a number or a letter at a position.',
  example: S(`
LedControl lc(12, 11, 10, 1);

void setup() {
  lc.shutdown(0, false);
  lc.setDigit(0, 0, 7, false);
  lc.setChar(0, 1, 'A', false);
}

void loop() {
}
`) },
// ---------------------------------------------------------------- SevSeg
{ id: 'SevSeg', cat: '4-digit 7-segment display', title: 'SevSeg, setNumber, refreshDisplay', words: ['SevSeg', 'setNumber', 'refreshDisplay', 'setBrightness'], include: ['SevSeg.h'], syntax: 'SevSeg sev;\nsev.begin(COMMON_CATHODE, 4, digitPins, segmentPins, false);\nsev.setNumber(n, decimals);\nsev.refreshDisplay();',
  desc: 'Show numbers on the 4-digit display. Call refreshDisplay() every time loop() runs, without long delays. Needs the "SevSeg" library.',
  example: S(`
SevSeg sev;

void setup() {
  byte digitPins[] = {2, 3, 4, 5};
  byte segmentPins[] = {6, 7, 8, 9, 10, 11, 12, 13};
  sev.begin(COMMON_CATHODE, 4, digitPins, segmentPins, false);
  sev.setBrightness(90);
}

void loop() {
  sev.setNumber(millis() / 1000, 0);
  sev.refreshDisplay();
}
`) },
];
