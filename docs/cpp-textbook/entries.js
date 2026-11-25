'use strict';
// Soga C++ textbook (VS Code): one entry per word or topic, W3Schools order.
// Each example is a complete C++ program. scripts/build-textbook.js --book cpp translates it into all ten
// languages with Soga itself; scripts/prove-cpp-textbook.sh compiles and RUNS the C++ and every language
// version and checks they print exactly the same output.
//   stdin: text typed into the program while it runs (for cin / getline lessons)

const S = (s) => s.replace(/^\n/, '').replace(/\n\s*$/, '\n');

module.exports = [
// ---------------------------------------------------------------- Getting started
{ id: 'header', cat: 'Getting started', title: 'Soga in VS Code', words: [],
  desc: 'Install the Soga extension in Visual Studio Code (search "Soga" under Extensions) and a C++ compiler (g++ on Linux and Windows, clang++ on macOS). Save your program with your language in the file name, for example hello.zu.soga for isiZulu or hello.ve.soga for Tshivenda. Press Run (the triangle at the top right) and the output appears in the terminal. Errors are shown in your language, and hovering over a word shows what it means in C++.',
  example: S(`
#include <iostream>
using namespace std;

int main() {
  cout << "Hello, Soga!" << endl;
  return 0;
}
`) },
{ id: 'main', cat: 'Getting started', title: 'The main function', words: ['main', 'int', 'return'], syntax: 'int main() {\n  return 0;\n}',
  desc: 'Every program starts at main(). The code between { and } runs from top to bottom. return 0 at the end tells the computer that the program finished without problems.',
  example: S(`
#include <iostream>
using namespace std;

int main() {
  cout << "First line" << endl;
  cout << "Second line" << endl;
  return 0;
}
`) },
{ id: 'include', cat: 'Getting started', title: '#include and using namespace', words: ['using', 'namespace', 'std'], syntax: '#include <iostream>\nusing namespace std;',
  desc: '#include brings in a library: iostream for input and output, string for text, vector for lists, and so on. The names in the standard library live in the namespace std; "using namespace std;" lets you write cout instead of std::cout.',
  example: S(`
#include <iostream>
#include <string>
using namespace std;

int main() {
  string language = "C++";
  cout << language << endl;
  std::cout << "also works" << std::endl;
  return 0;
}
`) },
{ id: 'cout', cat: 'Getting started', title: 'Output: cout and endl', words: ['cout', 'endl'], syntax: 'cout << "text" << endl;',
  desc: 'cout writes to the screen. Join several values with <<. endl, or "\\n" inside the text, starts a new line.',
  example: S(`
#include <iostream>
using namespace std;

int main() {
  cout << "Age: " << 15 << endl;
  cout << "Line one\\nLine two\\n";
  cout << 3 + 4 << endl;
  return 0;
}
`) },
{ id: 'comments', cat: 'Getting started', title: 'Comments', words: [], syntax: '// one line\n/* several\n   lines */',
  desc: 'Comments are notes for people. The compiler ignores them. Write them in any language you like; Soga never translates or changes them.',
  example: S(`
#include <iostream>
using namespace std;

int main() {
  // This line prints a number
  cout << 42 << endl;
  /* Comments can also
     span several lines */
  return 0;
}
`) },
// ---------------------------------------------------------------- Variables
{ id: 'variables', cat: 'Variables and types', title: 'Variables', words: ['int', 'double', 'char', 'bool'], syntax: 'type name = value;',
  desc: 'A variable is a named box that holds a value. Give it a type, a name and a value. You can change the value later.',
  example: S(`
#include <iostream>
using namespace std;

int main() {
  int age = 15;
  double height = 1.62;
  char grade = 'A';
  bool ready = true;
  age = age + 1;
  cout << age << " " << height << " " << grade << " " << ready << endl;
  return 0;
}
`) },
{ id: 'const', cat: 'Variables and types', words: ['const'], syntax: 'const int DAYS = 7;',
  desc: 'const makes a value that can never change. The compiler stops you if you try.',
  example: S(`
#include <iostream>
using namespace std;

int main() {
  const int DAYS = 7;
  const double PI = 3.14159;
  cout << DAYS * 2 << endl;
  cout << PI * 2 << endl;
  return 0;
}
`) },
{ id: 'cin', cat: 'Variables and types', title: 'Input: cin', words: ['cin'], syntax: 'cin >> variable;', stdin: 'Thandi\n15\n',
  desc: 'cin reads what the user types. >> puts the typed value into a variable. It reads one word or one number at a time.',
  example: S(`
#include <iostream>
#include <string>
using namespace std;

int main() {
  string name;
  int age;
  cout << "Name? ";
  cin >> name;
  cout << "Age? ";
  cin >> age;
  cout << endl << name << " will be " << age + 1 << " next year." << endl;
  return 0;
}
`) },
{ id: 'types', cat: 'Variables and types', title: 'Data types', words: ['int', 'long', 'float', 'double', 'char', 'bool', 'short', 'unsigned'], syntax: 'int  long  float  double  char  bool',
  desc: 'int holds whole numbers, long larger whole numbers, float and double numbers with a decimal point (double is more precise), char one character, and bool true or false. unsigned means "no negative numbers".',
  example: S(`
#include <iostream>
using namespace std;

int main() {
  int whole = -12;
  long big = 3000000000;
  float f = 2.5;
  double d = 3.14159265;
  char letter = 'z';
  bool yes = false;
  short small = 100;
  unsigned int positive = 40000;
  cout << whole << " " << big << " " << f << " " << d << endl;
  cout << letter << " " << yes << " " << small << " " << positive << endl;
  return 0;
}
`) },
{ id: 'sizeof', cat: 'Variables and types', words: ['sizeof'], syntax: 'sizeof(type)',
  desc: 'sizeof tells you how many bytes a type or a variable uses in memory.',
  example: S(`
#include <iostream>
using namespace std;

int main() {
  cout << sizeof(char) << endl;
  cout << sizeof(int) << endl;
  cout << sizeof(double) << endl;
  return 0;
}
`) },
{ id: 'auto', cat: 'Variables and types', words: ['auto'], syntax: 'auto x = 5;',
  desc: 'auto lets the compiler choose the type from the value.',
  example: S(`
#include <iostream>
#include <string>
using namespace std;

int main() {
  auto count = 10;
  auto price = 9.99;
  auto word = string("Soga");
  cout << count << " " << price << " " << word << endl;
  return 0;
}
`) },
{ id: 'cast', cat: 'Variables and types', title: 'Type conversion', words: ['static_cast'], syntax: 'static_cast<double>(x)',
  desc: 'Change a value from one type to another. Dividing two whole numbers drops the fraction; convert one to double first to keep it.',
  example: S(`
#include <iostream>
using namespace std;

int main() {
  int a = 7;
  int b = 2;
  cout << a / b << endl;
  cout << static_cast<double>(a) / b << endl;
  cout << static_cast<int>(9.8) << endl;
  return 0;
}
`) },
// ---------------------------------------------------------------- Operators
{ id: 'arith', cat: 'Operators', title: 'Arithmetic operators', words: [], syntax: '+  -  *  /  %  ++  --',
  desc: 'Add, subtract, multiply, divide and % (the remainder after dividing). ++ adds one and -- takes one away.',
  example: S(`
#include <iostream>
using namespace std;

int main() {
  int x = 17;
  int y = 5;
  cout << x + y << " " << x - y << " " << x * y << " " << x / y << " " << x % y << endl;
  x++;
  y--;
  cout << x << " " << y << endl;
  return 0;
}
`) },
{ id: 'assign', cat: 'Operators', title: 'Assignment operators', words: [], syntax: '=  +=  -=  *=  /=',
  desc: 'x += 3 is a short way of writing x = x + 3. The same works for -, *, / and %.',
  example: S(`
#include <iostream>
using namespace std;

int main() {
  int score = 10;
  score += 5;
  score *= 2;
  score -= 4;
  score /= 2;
  cout << score << endl;
  return 0;
}
`) },
{ id: 'compare', cat: 'Operators', title: 'Comparison operators', words: ['true', 'false'], syntax: '==  !=  <  >  <=  >=',
  desc: 'Compare two values. The answer is true (printed as 1) or false (printed as 0).',
  example: S(`
#include <iostream>
using namespace std;

int main() {
  int a = 5;
  int b = 8;
  cout << (a == b) << (a != b) << (a < b) << (a > b) << (a <= 5) << (b >= 9) << endl;
  cout << boolalpha << (a < b) << endl;
  return 0;
}
`) },
{ id: 'logic', cat: 'Operators', title: 'Logical operators', words: ['and', 'or', 'not'], syntax: 'a and b   a or b   not a',
  desc: 'Combine true/false values. You can write the words, or the symbols && (and), || (or) and ! (not); both mean the same.',
  example: S(`
#include <iostream>
using namespace std;

int main() {
  int age = 16;
  bool hasTicket = true;
  cout << (age >= 13 and hasTicket) << endl;
  cout << (age < 13 or not hasTicket) << endl;
  cout << (age > 10 && age < 20) << endl;
  return 0;
}
`) },
// ---------------------------------------------------------------- Strings
{ id: 'string', cat: 'Strings', title: 'Strings', words: ['string'], syntax: 'string s = "text";',
  desc: 'A string holds text. Join strings with +. Include <string> to use them.',
  example: S(`
#include <iostream>
#include <string>
using namespace std;

int main() {
  string first = "Thandi";
  string last = "Mokoena";
  string full = first + " " + last;
  cout << full << endl;
  return 0;
}
`) },
{ id: 'length', cat: 'Strings', title: 'length, size and access', words: ['length', 'size', 'at'], syntax: 's.length()  s[0]  s.at(0)',
  desc: 'length() and size() give the number of characters. s[0] or s.at(0) gives the first character; at() also checks that the position exists.',
  example: S(`
#include <iostream>
#include <string>
using namespace std;

int main() {
  string word = "Arduino";
  cout << word.length() << " " << word.size() << endl;
  cout << word[0] << word.at(1) << endl;
  word[0] = 'a';
  cout << word << endl;
  return 0;
}
`) },
{ id: 'append', cat: 'Strings', title: 'append and insert', words: ['append', 'insert'], syntax: 's.append("x");  s.insert(position, "x");',
  desc: 'append() adds text at the end; insert() puts text in at a position.',
  example: S(`
#include <iostream>
#include <string>
using namespace std;

int main() {
  string s = "Soga";
  s.append(" code");
  s.insert(0, ">> ");
  cout << s << endl;
  return 0;
}
`) },
{ id: 'substr', cat: 'Strings', title: 'substr, find and replace', words: ['substr', 'find', 'replace'], syntax: 's.substr(start, count)  s.find("x")',
  desc: 'substr() cuts out part of a string. find() gives the position of some text (or string::npos if it is not there). replace() swaps part of the string for new text.',
  example: S(`
#include <iostream>
#include <string>
using namespace std;

int main() {
  string s = "Hello World";
  cout << s.substr(6, 5) << endl;
  cout << s.find("World") << endl;
  s.replace(0, 5, "Sawubona");
  cout << s << endl;
  return 0;
}
`) },
{ id: 'getline', cat: 'Strings', title: 'getline', words: ['getline'], syntax: 'getline(cin, s);', stdin: 'Thandi Mokoena\n',
  desc: 'cin stops at the first space. getline() reads the whole line, spaces included.',
  example: S(`
#include <iostream>
#include <string>
using namespace std;

int main() {
  string fullName;
  cout << "Full name? ";
  getline(cin, fullName);
  cout << endl << "Hello, " << fullName << "!" << endl;
  return 0;
}
`) },
{ id: 'tostring', cat: 'Strings', title: 'to_string and stoi', words: ['to_string', 'stoi', 'stod'], syntax: 'to_string(42)  stoi("42")  stod("2.5")',
  desc: 'to_string() turns a number into text; stoi() and stod() turn text into a whole number or a decimal number.',
  example: S(`
#include <iostream>
#include <string>
using namespace std;

int main() {
  string label = "Room " + to_string(12);
  int n = stoi("40") + 2;
  double d = stod("2.5") * 2;
  cout << label << " " << n << " " << d << endl;
  return 0;
}
`) },
{ id: 'compare_s', cat: 'Strings', title: 'Comparing strings', words: ['compare', 'empty'], syntax: 'a == b   a.compare(b)   s.empty()',
  desc: '== checks whether two strings are the same. compare() gives 0 when equal, less than 0 or more than 0 for alphabetical order. empty() is true for a string with no characters.',
  example: S(`
#include <iostream>
#include <string>
using namespace std;

int main() {
  string a = "apple";
  string b = "banana";
  string c;
  cout << (a == b) << " " << (a.compare(b) < 0) << " " << c.empty() << endl;
  return 0;
}
`) },
{ id: 'cctype', cat: 'Strings', title: 'Characters: toupper, isdigit', words: ['toupper', 'tolower', 'isdigit', 'isalpha', 'isspace'], syntax: 'toupper(c)  isdigit(c)',
  desc: 'Check or change one character: is it a digit, a letter, a space? Make it a capital or a small letter.',
  example: S(`
#include <iostream>
#include <string>
#include <cctype>
using namespace std;

int main() {
  string s = "Soga 2026";
  int digits = 0;
  for (char c : s) {
    if (isdigit(c)) digits++;
  }
  cout << digits << endl;
  cout << (char) toupper('q') << (char) tolower('Q') << endl;
  cout << (isalpha('x') != 0) << (isspace(' ') != 0) << endl;
  return 0;
}
`) },
// ---------------------------------------------------------------- Math
{ id: 'minmax', cat: 'Math', title: 'max, min, abs', words: ['max', 'min', 'abs'], syntax: 'max(a, b)  min(a, b)  abs(x)',
  desc: 'The larger of two values, the smaller of two values, and a number without its minus sign.',
  example: S(`
#include <iostream>
#include <algorithm>
#include <cstdlib>
using namespace std;

int main() {
  cout << max(4, 9) << " " << min(4, 9) << " " << abs(-7) << endl;
  return 0;
}
`) },
{ id: 'cmath', cat: 'Math', title: 'sqrt, pow, round', words: ['sqrt', 'pow', 'round', 'floor', 'ceil'], syntax: 'sqrt(x)  pow(x, y)  round(x)',
  desc: 'Square roots, powers, and rounding to the nearest whole number, down (floor) or up (ceil). Include <cmath>.',
  example: S(`
#include <iostream>
#include <cmath>
using namespace std;

int main() {
  cout << sqrt(81) << " " << pow(2, 10) << endl;
  cout << round(2.5) << " " << floor(2.9) << " " << ceil(2.1) << endl;
  return 0;
}
`) },
{ id: 'trig', cat: 'Math', title: 'sin, cos, hypot', words: ['sin', 'cos', 'tan', 'hypot'], syntax: 'sin(radians)  hypot(a, b)',
  desc: 'Trigonometry with angles in radians, and hypot() for the long side of a right-angled triangle.',
  example: S(`
#include <iostream>
#include <cmath>
using namespace std;

int main() {
  cout << hypot(3, 4) << endl;
  cout << round(sin(0) * 100) << " " << round(cos(0) * 100) << endl;
  return 0;
}
`) },
{ id: 'setprecision', cat: 'Math', title: 'Formatting numbers', words: ['fixed', 'setprecision', 'setw'], syntax: 'cout << fixed << setprecision(2) << x;',
  desc: 'fixed with setprecision(n) shows exactly n decimals, which is right for money. setw(n) pads a value to n characters to make columns. Include <iomanip>.',
  example: S(`
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
  double price = 19.5;
  cout << fixed << setprecision(2) << "R" << price << endl;
  cout << setw(6) << 42 << "|" << endl;
  return 0;
}
`) },
// ---------------------------------------------------------------- Conditions
{ id: 'if', cat: 'Conditions', title: 'if, else if, else', words: ['if', 'else'], syntax: 'if (condition) { } else if (other) { } else { }',
  desc: 'Run code only when a condition is true. else if tests another condition; else runs when none of them was true.',
  example: S(`
#include <iostream>
using namespace std;

int main() {
  int mark = 72;
  if (mark >= 80) {
    cout << "Distinction" << endl;
  } else if (mark >= 50) {
    cout << "Pass" << endl;
  } else {
    cout << "Try again" << endl;
  }
  return 0;
}
`) },
{ id: 'ternary', cat: 'Conditions', title: 'Short if: ? :', words: [], syntax: 'condition ? valueIfTrue : valueIfFalse',
  desc: 'A one-line if that chooses between two values.',
  example: S(`
#include <iostream>
#include <string>
using namespace std;

int main() {
  int hour = 20;
  string greeting = hour < 12 ? "Good morning" : "Good evening";
  cout << greeting << endl;
  return 0;
}
`) },
{ id: 'switch', cat: 'Conditions', title: 'switch, case, default', words: ['switch', 'case', 'default', 'break'], syntax: 'switch (x) { case 1: ...; break; default: ...; }',
  desc: 'Choose one of many paths by the value of a number or character. End each case with break; default runs when no case matches.',
  example: S(`
#include <iostream>
using namespace std;

int main() {
  int day = 3;
  switch (day) {
    case 1:
      cout << "Monday" << endl;
      break;
    case 2:
      cout << "Tuesday" << endl;
      break;
    case 3:
      cout << "Wednesday" << endl;
      break;
    default:
      cout << "Another day" << endl;
  }
  return 0;
}
`) },
// ---------------------------------------------------------------- Loops
{ id: 'while', cat: 'Loops', words: ['while'], syntax: 'while (condition) { }',
  desc: 'Repeat a block for as long as a condition stays true.',
  example: S(`
#include <iostream>
using namespace std;

int main() {
  int n = 1;
  while (n <= 5) {
    cout << n << " ";
    n++;
  }
  cout << endl;
  return 0;
}
`) },
{ id: 'dowhile', cat: 'Loops', title: 'do ... while', words: ['do', 'while'], syntax: 'do { } while (condition);',
  desc: 'Like while, but the block always runs at least once, because the test is at the end.',
  example: S(`
#include <iostream>
using namespace std;

int main() {
  int n = 10;
  do {
    cout << n << endl;
    n++;
  } while (n < 5);
  return 0;
}
`) },
{ id: 'for', cat: 'Loops', words: ['for'], syntax: 'for (start; condition; step) { }',
  desc: 'Repeat a block a set number of times: start, keep going while the condition is true, and take a step each time.',
  example: S(`
#include <iostream>
using namespace std;

int main() {
  for (int i = 1; i <= 5; i++) {
    cout << i * i << " ";
  }
  cout << endl;
  for (int i = 10; i > 0; i -= 3) {
    cout << i << " ";
  }
  cout << endl;
  return 0;
}
`) },
{ id: 'nested', cat: 'Loops', title: 'Nested loops', words: [], syntax: 'for (...) { for (...) { } }',
  desc: 'A loop inside a loop. The inner loop runs completely for each round of the outer loop, which is how you make tables.',
  example: S(`
#include <iostream>
using namespace std;

int main() {
  for (int row = 1; row <= 3; row++) {
    for (int col = 1; col <= 4; col++) {
      cout << row * col << "\\t";
    }
    cout << endl;
  }
  return 0;
}
`) },
{ id: 'rangefor', cat: 'Loops', title: 'for-each loop', words: ['for'], syntax: 'for (type item : collection) { }',
  desc: 'Go through every item in an array, vector or string, without counting positions yourself.',
  example: S(`
#include <iostream>
using namespace std;

int main() {
  int marks[] = {67, 82, 91};
  int total = 0;
  for (int m : marks) {
    total += m;
  }
  cout << total << endl;
  return 0;
}
`) },
{ id: 'breakcontinue', cat: 'Loops', title: 'break and continue', words: ['break', 'continue'], syntax: 'break;   continue;',
  desc: 'break leaves the loop straight away. continue skips the rest of this round and goes on with the next one.',
  example: S(`
#include <iostream>
using namespace std;

int main() {
  for (int i = 1; i <= 10; i++) {
    if (i % 2 == 0) continue;
    if (i > 7) break;
    cout << i << " ";
  }
  cout << endl;
  return 0;
}
`) },
// ---------------------------------------------------------------- Arrays
{ id: 'arrays', cat: 'Arrays', title: 'Arrays', words: [], syntax: 'int numbers[3] = {10, 20, 30};',
  desc: 'An array holds a fixed number of values of the same type, numbered from 0.',
  example: S(`
#include <iostream>
#include <string>
using namespace std;

int main() {
  string cities[3] = {"Durban", "Polokwane", "Cape Town"};
  cities[1] = "Thohoyandou";
  for (int i = 0; i < 3; i++) {
    cout << i << ": " << cities[i] << endl;
  }
  return 0;
}
`) },
{ id: 'arraysize', cat: 'Arrays', title: 'Array size', words: ['sizeof'], syntax: 'sizeof(a) / sizeof(a[0])',
  desc: 'sizeof of an array is its size in bytes. Divide by the size of one item to get the number of items.',
  example: S(`
#include <iostream>
using namespace std;

int main() {
  int values[] = {4, 8, 15, 16, 23, 42};
  int count = sizeof(values) / sizeof(values[0]);
  cout << count << endl;
  return 0;
}
`) },
{ id: 'array2d', cat: 'Arrays', title: 'Two-dimensional arrays', words: [], syntax: 'int grid[2][3];',
  desc: 'An array of arrays: rows and columns, like a table or a game board.',
  example: S(`
#include <iostream>
using namespace std;

int main() {
  int grid[2][3] = {{1, 2, 3}, {4, 5, 6}};
  for (int r = 0; r < 2; r++) {
    for (int c = 0; c < 3; c++) {
      cout << grid[r][c] << " ";
    }
    cout << endl;
  }
  return 0;
}
`) },
{ id: 'stdarray', cat: 'Arrays', title: 'std::array', words: ['array', 'size'], syntax: 'array<int, 3> a = {1, 2, 3};',
  desc: 'A fixed-size array that knows its own size() and works with the standard algorithms.',
  example: S(`
#include <iostream>
#include <array>
using namespace std;

int main() {
  array<int, 4> a = {3, 1, 4, 1};
  cout << a.size() << " " << a.front() << " " << a.back() << endl;
  return 0;
}
`) },
// ---------------------------------------------------------------- Structures
{ id: 'struct', cat: 'Structures and enums', words: ['struct'], syntax: 'struct Name { type member; };',
  desc: 'Group several related values into one new type.',
  example: S(`
#include <iostream>
#include <string>
using namespace std;

struct Learner {
  string name;
  int grade;
};

int main() {
  Learner a = {"Sipho", 10};
  Learner b;
  b.name = "Lerato";
  b.grade = 11;
  cout << a.name << " " << a.grade << endl;
  cout << b.name << " " << b.grade << endl;
  return 0;
}
`) },
{ id: 'enum', cat: 'Structures and enums', title: 'enum and enum class', words: ['enum', 'class'], syntax: 'enum class Color { Red, Green };',
  desc: 'A list of named choices. enum class keeps the names inside the type (Color::Red), which avoids mix-ups.',
  example: S(`
#include <iostream>
using namespace std;

enum class Light { Green, Yellow, Red };

int main() {
  Light now = Light::Yellow;
  if (now == Light::Yellow) {
    cout << "Slow down" << endl;
  }
  cout << static_cast<int>(Light::Red) << endl;
  return 0;
}
`) },
{ id: 'typedef', cat: 'Structures and enums', title: 'Type names: using and typedef', words: ['using', 'typedef'], syntax: 'using Mark = int;',
  desc: 'Give an existing type a new, clearer name.',
  example: S(`
#include <iostream>
using namespace std;

using Mark = int;
typedef double Rand;

int main() {
  Mark m = 75;
  Rand price = 12.5;
  cout << m << " " << price << endl;
  return 0;
}
`) },
// ---------------------------------------------------------------- References and pointers
{ id: 'references', cat: 'References and pointers', title: 'References', words: [], syntax: 'int& r = x;',
  desc: 'A reference is another name for the same variable. Changing the reference changes the original.',
  example: S(`
#include <iostream>
using namespace std;

int main() {
  int score = 10;
  int& same = score;
  same = 25;
  cout << score << endl;
  return 0;
}
`) },
{ id: 'pointers', cat: 'References and pointers', title: 'Pointers', words: ['nullptr'], syntax: 'int* p = &x;  *p',
  desc: 'A pointer holds the address of a variable. &x gives the address; *p reaches the value it points to. nullptr means it points to nothing.',
  example: S(`
#include <iostream>
using namespace std;

int main() {
  int value = 5;
  int* p = &value;
  *p = 8;
  cout << value << endl;
  int* empty = nullptr;
  cout << (empty == nullptr) << endl;
  return 0;
}
`) },
{ id: 'newdelete', cat: 'References and pointers', title: 'new and delete', words: ['new', 'delete'], syntax: 'int* p = new int(5);\ndelete p;',
  desc: 'new makes a value in memory that lives until you delete it. Every new needs a delete; smart pointers (below) do this for you.',
  example: S(`
#include <iostream>
using namespace std;

int main() {
  int* p = new int(42);
  cout << *p << endl;
  delete p;
  int* list = new int[3]{1, 2, 3};
  cout << list[2] << endl;
  delete[] list;
  return 0;
}
`) },
// ---------------------------------------------------------------- Functions
{ id: 'functions', cat: 'Functions', title: 'Functions', words: ['void', 'return'], syntax: 'type name(parameters) { return value; }',
  desc: 'A function is a named block of code that you can call again and again. void means it gives nothing back; otherwise return sends a value back.',
  example: S(`
#include <iostream>
using namespace std;

void greet() {
  cout << "Hello!" << endl;
}

int square(int x) {
  return x * x;
}

int main() {
  greet();
  greet();
  cout << square(7) << endl;
  return 0;
}
`) },
{ id: 'defaults', cat: 'Functions', title: 'Default parameters', words: [], syntax: 'void f(int x = 1)',
  desc: 'A parameter can have a value that is used when the caller leaves it out.',
  example: S(`
#include <iostream>
#include <string>
using namespace std;

void hello(string name = "friend") {
  cout << "Hello, " << name << endl;
}

int main() {
  hello("Naledi");
  hello();
  return 0;
}
`) },
{ id: 'byref', cat: 'Functions', title: 'Pass by reference', words: [], syntax: 'void f(int& x)',
  desc: 'With & the function works on the caller\'s own variable, so it can change it. Without & it gets a copy.',
  example: S(`
#include <iostream>
using namespace std;

void addCopy(int x) {
  x += 10;
}

void addReal(int& x) {
  x += 10;
}

int main() {
  int n = 1;
  addCopy(n);
  cout << n << endl;
  addReal(n);
  cout << n << endl;
  return 0;
}
`) },
{ id: 'overload', cat: 'Functions', title: 'Overloading', words: [], syntax: 'int add(int, int);\ndouble add(double, double);',
  desc: 'Several functions may share a name if their parameters differ. C++ picks the right one.',
  example: S(`
#include <iostream>
using namespace std;

int add(int a, int b) {
  return a + b;
}

double add(double a, double b) {
  return a + b;
}

int main() {
  cout << add(2, 3) << endl;
  cout << add(2.5, 0.25) << endl;
  return 0;
}
`) },
{ id: 'recursion', cat: 'Functions', title: 'Recursion', words: [], syntax: 'int f(int n) { return n * f(n - 1); }',
  desc: 'A function that calls itself, each time with a smaller problem, until it reaches a simple case.',
  example: S(`
#include <iostream>
using namespace std;

long factorial(int n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

int main() {
  cout << factorial(5) << endl;
  cout << factorial(10) << endl;
  return 0;
}
`) },
{ id: 'lambda', cat: 'Functions', title: 'Lambdas', words: ['auto'], syntax: 'auto f = [](int x) { return x * 2; };',
  desc: 'A small function without a name, written where you need it. Lambdas are often given to sort() and other algorithms.',
  example: S(`
#include <iostream>
using namespace std;

int main() {
  auto twice = [](int x) { return x * 2; };
  int base = 100;
  auto addBase = [base](int x) { return x + base; };
  cout << twice(21) << " " << addBase(5) << endl;
  return 0;
}
`) },
// ---------------------------------------------------------------- Classes
{ id: 'class', cat: 'Classes and objects', title: 'Classes and objects', words: ['class', 'public'], syntax: 'class Name { public: ... };',
  desc: 'A class describes a kind of thing: what it knows (member variables) and what it can do (methods). An object is one thing made from that class.',
  example: S(`
#include <iostream>
#include <string>
using namespace std;

class Car {
public:
  string brand;
  int year;
  void describe() {
    cout << brand << " (" << year << ")" << endl;
  }
};

int main() {
  Car a;
  a.brand = "Toyota";
  a.year = 2019;
  a.describe();
  return 0;
}
`) },
{ id: 'constructor', cat: 'Classes and objects', title: 'Constructors and destructors', words: [], syntax: 'Name(parameters) { }\n~Name() { }',
  desc: 'A constructor runs when an object is made and sets it up. A destructor (~Name) runs when the object is finished.',
  example: S(`
#include <iostream>
#include <string>
using namespace std;

class Robot {
public:
  string id;
  Robot(string newId) {
    id = newId;
    cout << id << " on" << endl;
  }
  ~Robot() {
    cout << id << " off" << endl;
  }
};

int main() {
  Robot r("R2");
  cout << "working" << endl;
  return 0;
}
`) },
{ id: 'access', cat: 'Classes and objects', title: 'public, private, getters and setters', words: ['public', 'private'], syntax: 'class A { private: int x; public: int getX(); };',
  desc: 'private members can only be used inside the class; public ones from anywhere. Keep data private and give public functions to read and change it safely (encapsulation).',
  example: S(`
#include <iostream>
using namespace std;

class Account {
private:
  double balance = 0;
public:
  void deposit(double amount) {
    if (amount > 0) balance += amount;
  }
  double getBalance() {
    return balance;
  }
};

int main() {
  Account acc;
  acc.deposit(500);
  acc.deposit(-20);
  cout << acc.getBalance() << endl;
  return 0;
}
`) },
{ id: 'this', cat: 'Classes and objects', words: ['this'], syntax: 'this->member',
  desc: 'Inside a method, this points to the object itself. It helps when a parameter has the same name as a member.',
  example: S(`
#include <iostream>
using namespace std;

class Box {
  int width;
public:
  Box(int width) {
    this->width = width;
  }
  int getWidth() {
    return width;
  }
};

int main() {
  Box b(7);
  cout << b.getWidth() << endl;
  return 0;
}
`) },
{ id: 'static', cat: 'Classes and objects', title: 'static members', words: ['static'], syntax: 'static int count;',
  desc: 'A static member belongs to the class, not to one object, so all objects share it.',
  example: S(`
#include <iostream>
using namespace std;

class Learner {
public:
  static int count;
  Learner() {
    count++;
  }
};

int Learner::count = 0;

int main() {
  Learner a, b, c;
  cout << Learner::count << endl;
  return 0;
}
`) },
{ id: 'inheritance', cat: 'Classes and objects', title: 'Inheritance and protected', words: ['protected'], syntax: 'class Child : public Parent { };',
  desc: 'A class can inherit everything from another class and add its own parts. protected members can be used by child classes but not from outside.',
  example: S(`
#include <iostream>
#include <string>
using namespace std;

class Vehicle {
protected:
  int wheels = 4;
public:
  void honk() {
    cout << "Beep!" << endl;
  }
};

class Bakkie : public Vehicle {
public:
  void info() {
    cout << "Wheels: " << wheels << endl;
  }
};

int main() {
  Bakkie b;
  b.honk();
  b.info();
  return 0;
}
`) },
{ id: 'polymorphism', cat: 'Classes and objects', title: 'virtual and override', words: ['virtual', 'override'], syntax: 'virtual void speak();\nvoid speak() override;',
  desc: 'With virtual, a child class can replace a method, and the right version runs even when you hold the object as its parent type (polymorphism).',
  example: S(`
#include <iostream>
using namespace std;

class Animal {
public:
  virtual void sound() {
    cout << "..." << endl;
  }
  virtual ~Animal() {}
};

class Cow : public Animal {
public:
  void sound() override {
    cout << "Moo" << endl;
  }
};

class Dog : public Animal {
public:
  void sound() override {
    cout << "Woof" << endl;
  }
};

int main() {
  Cow c;
  Dog d;
  Animal* zoo[2] = {&c, &d};
  for (Animal* a : zoo) {
    a->sound();
  }
  return 0;
}
`) },
{ id: 'abstract', cat: 'Classes and objects', title: 'Abstract classes', words: ['virtual'], syntax: 'virtual double area() = 0;',
  desc: 'A method written = 0 has no body; every child class must provide one. A class with such a method is abstract: you cannot make objects of it directly.',
  example: S(`
#include <iostream>
using namespace std;

class Shape {
public:
  virtual double area() = 0;
  virtual ~Shape() {}
};

class Square : public Shape {
  double side;
public:
  Square(double s) : side(s) {}
  double area() override {
    return side * side;
  }
};

int main() {
  Square sq(3);
  Shape& s = sq;
  cout << s.area() << endl;
  return 0;
}
`) },
{ id: 'operator', cat: 'Classes and objects', title: 'Operator overloading', words: ['operator'], syntax: 'Point operator+(const Point& o)',
  desc: 'Teach +, ==, << and other operators what to do with your own classes.',
  example: S(`
#include <iostream>
using namespace std;

struct Point {
  int x, y;
  Point operator+(const Point& o) const {
    return {x + o.x, y + o.y};
  }
};

int main() {
  Point a = {1, 2};
  Point b = {10, 20};
  Point c = a + b;
  cout << c.x << "," << c.y << endl;
  return 0;
}
`) },
{ id: 'friend', cat: 'Classes and objects', words: ['friend'], syntax: 'friend void show(const Box& b);',
  desc: 'A friend function may use the private members of a class.',
  example: S(`
#include <iostream>
using namespace std;

class Secret {
  int code = 1234;
  friend void reveal(const Secret& s);
};

void reveal(const Secret& s) {
  cout << s.code << endl;
}

int main() {
  Secret s;
  reveal(s);
  return 0;
}
`) },
// ---------------------------------------------------------------- Templates
{ id: 'template', cat: 'Templates', title: 'Function templates', words: ['template', 'typename'], syntax: 'template <typename T>\nT biggest(T a, T b)',
  desc: 'Write a function once and use it for many types. T stands for whatever type the caller uses.',
  example: S(`
#include <iostream>
#include <string>
using namespace std;

template <typename T>
T biggest(T a, T b) {
  return a > b ? a : b;
}

int main() {
  cout << biggest(3, 9) << endl;
  cout << biggest(2.5, 1.5) << endl;
  cout << biggest(string("ant"), string("bee")) << endl;
  return 0;
}
`) },
{ id: 'classtemplate', cat: 'Templates', title: 'Class templates', words: ['template', 'typename'], syntax: 'template <typename T>\nclass Box { T value; };',
  desc: 'A class that works with any type, the way vector<int> and vector<string> do.',
  example: S(`
#include <iostream>
#include <string>
using namespace std;

template <typename T>
class Box {
  T value;
public:
  Box(T v) : value(v) {}
  T get() {
    return value;
  }
};

int main() {
  Box<int> a(5);
  Box<string> b("five");
  cout << a.get() << " " << b.get() << endl;
  return 0;
}
`) },
// ---------------------------------------------------------------- Errors
{ id: 'exceptions', cat: 'Errors and exceptions', title: 'try, catch, throw', words: ['try', 'catch', 'throw'], syntax: 'try { throw ...; } catch (type e) { }',
  desc: 'throw signals that something went wrong; try marks code that might fail; catch handles the problem so the program can continue.',
  example: S(`
#include <iostream>
using namespace std;

int divide(int a, int b) {
  if (b == 0) throw 0;
  return a / b;
}

int main() {
  try {
    cout << divide(10, 2) << endl;
    cout << divide(1, 0) << endl;
  } catch (int) {
    cout << "Cannot divide by zero" << endl;
  }
  return 0;
}
`) },
{ id: 'stdexcept', cat: 'Errors and exceptions', title: 'runtime_error and what()', words: ['runtime_error', 'out_of_range', 'exception', 'what'], syntax: 'throw runtime_error("message");\ncatch (const exception& e) { e.what(); }',
  desc: 'The standard error types carry a message, which what() returns. at() throws out_of_range when a position does not exist.',
  example: S(`
#include <iostream>
#include <stdexcept>
#include <string>
using namespace std;

int main() {
  try {
    throw runtime_error("sensor not found");
  } catch (const exception& e) {
    cout << "Error: " << e.what() << endl;
  }
  try {
    string s = "abc";
    s.at(10);
  } catch (const out_of_range& e) {
    cout << "Out of range" << endl;
  }
  return 0;
}
`) },
// ---------------------------------------------------------------- Files
{ id: 'files', cat: 'Files', title: 'Writing and reading files', words: ['ofstream', 'ifstream', 'getline', 'close'], syntax: 'ofstream out("file.txt");\nifstream in("file.txt");',
  desc: 'ofstream writes to a file and ifstream reads from it, using << and getline just like cout and cin. Include <fstream>.',
  example: S(`
#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
  ofstream out("notes.txt");
  out << "first line" << endl;
  out << "second line" << endl;
  out.close();

  ifstream in("notes.txt");
  string line;
  int count = 0;
  while (getline(in, line)) {
    count++;
    cout << count << ": " << line << endl;
  }
  in.close();
  return 0;
}
`) },
{ id: 'stringstream', cat: 'Files', title: 'stringstream', words: ['stringstream'], syntax: 'stringstream ss("1 2 3");',
  desc: 'A stringstream lets you read from or write to a string as if it were a file, which is handy for splitting text into numbers.',
  example: S(`
#include <iostream>
#include <sstream>
using namespace std;

int main() {
  stringstream ss("12 30 8");
  int n;
  int total = 0;
  while (ss >> n) {
    total += n;
  }
  cout << total << endl;
  return 0;
}
`) },
// ---------------------------------------------------------------- Containers
{ id: 'vector', cat: 'Data structures', title: 'vector', words: ['vector', 'push_back', 'size', 'at'], syntax: 'vector<int> v;\nv.push_back(5);',
  desc: 'A list that can grow and shrink. push_back() adds at the end; size() counts the items; [] or at() reads one.',
  example: S(`
#include <iostream>
#include <vector>
using namespace std;

int main() {
  vector<int> marks = {67, 82};
  marks.push_back(91);
  cout << marks.size() << " " << marks[0] << " " << marks.at(2) << endl;
  for (int m : marks) {
    cout << m << " ";
  }
  cout << endl;
  return 0;
}
`) },
{ id: 'vectorops', cat: 'Data structures', title: 'vector: front, back, pop_back, erase, clear', words: ['front', 'back', 'pop_back', 'erase', 'insert', 'clear', 'empty', 'begin', 'end'], syntax: 'v.front()  v.back()  v.pop_back()  v.erase(v.begin())',
  desc: 'Read the first and last items, remove the last one, insert or erase at a position, or empty the whole list.',
  example: S(`
#include <iostream>
#include <vector>
using namespace std;

int main() {
  vector<int> v = {1, 2, 3, 4, 5};
  v.pop_back();
  v.erase(v.begin());
  v.insert(v.begin(), 9);
  cout << v.front() << " " << v.back() << " " << v.size() << endl;
  v.clear();
  cout << v.empty() << endl;
  return 0;
}
`) },
{ id: 'list', cat: 'Data structures', title: 'list', words: ['list', 'push_front', 'push_back'], syntax: 'list<int> l;\nl.push_front(1);',
  desc: 'A linked list: quick to add and remove items at the front, at the back and in the middle.',
  example: S(`
#include <iostream>
#include <list>
using namespace std;

int main() {
  list<int> l = {2, 3};
  l.push_front(1);
  l.push_back(4);
  for (int x : l) {
    cout << x << " ";
  }
  cout << endl;
  return 0;
}
`) },
{ id: 'stack', cat: 'Data structures', title: 'stack', words: ['stack', 'push', 'pop', 'top'], syntax: 'stack<int> s;\ns.push(1);  s.top();  s.pop();',
  desc: 'Last in, first out, like a pile of plates: push() puts on top, top() looks at the top, pop() takes it off.',
  example: S(`
#include <iostream>
#include <stack>
using namespace std;

int main() {
  stack<int> s;
  s.push(1);
  s.push(2);
  s.push(3);
  while (!s.empty()) {
    cout << s.top() << " ";
    s.pop();
  }
  cout << endl;
  return 0;
}
`) },
{ id: 'queue', cat: 'Data structures', title: 'queue', words: ['queue', 'push', 'pop', 'front'], syntax: 'queue<int> q;\nq.push(1);  q.front();  q.pop();',
  desc: 'First in, first out, like a taxi rank: push() joins at the back, front() is the next one, pop() lets it go.',
  example: S(`
#include <iostream>
#include <queue>
#include <string>
using namespace std;

int main() {
  queue<string> rank;
  rank.push("Ama");
  rank.push("Bongi");
  rank.push("Chris");
  while (!rank.empty()) {
    cout << rank.front() << " ";
    rank.pop();
  }
  cout << endl;
  return 0;
}
`) },
{ id: 'deque', cat: 'Data structures', title: 'deque', words: ['deque', 'push_front', 'pop_front'], syntax: 'deque<int> d;\nd.push_front(1);  d.push_back(2);',
  desc: 'A double-ended queue: add and remove at both ends quickly.',
  example: S(`
#include <iostream>
#include <deque>
using namespace std;

int main() {
  deque<int> d = {5};
  d.push_front(4);
  d.push_back(6);
  d.pop_front();
  for (int x : d) {
    cout << x << " ";
  }
  cout << endl;
  return 0;
}
`) },
{ id: 'set', cat: 'Data structures', title: 'set', words: ['set', 'insert', 'count'], syntax: 'set<int> s;\ns.insert(5);  s.count(5);',
  desc: 'A collection of unique values, kept in order. Adding a value twice keeps only one; count() tells you whether a value is there.',
  example: S(`
#include <iostream>
#include <set>
using namespace std;

int main() {
  set<int> s = {5, 1, 5, 3, 1};
  s.insert(2);
  for (int x : s) {
    cout << x << " ";
  }
  cout << endl << s.size() << " " << s.count(3) << " " << s.count(9) << endl;
  return 0;
}
`) },
{ id: 'map', cat: 'Data structures', title: 'map', words: ['map', 'first', 'second', 'find', 'end'], syntax: 'map<string, int> m;\nm["key"] = 1;',
  desc: 'Pairs of keys and values, sorted by key, like a dictionary or a price list. Use m[key] to set or read; find() checks whether a key exists.',
  example: S(`
#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
  map<string, int> prices;
  prices["bread"] = 18;
  prices["milk"] = 25;
  prices["eggs"] = 42;
  for (auto& item : prices) {
    cout << item.first << ": R" << item.second << endl;
  }
  if (prices.find("tea") == prices.end()) {
    cout << "no tea" << endl;
  }
  return 0;
}
`) },
{ id: 'unordered_map', cat: 'Data structures', title: 'unordered_map', words: ['unordered_map', 'count'], syntax: 'unordered_map<string, int> m;',
  desc: 'Like map, but not sorted, and usually faster for looking things up.',
  example: S(`
#include <iostream>
#include <unordered_map>
#include <string>
using namespace std;

int main() {
  unordered_map<string, int> votes;
  votes["yes"] += 3;
  votes["no"] += 1;
  votes["yes"] += 2;
  cout << votes["yes"] << " " << votes["no"] << " " << votes.count("maybe") << endl;
  return 0;
}
`) },
{ id: 'pair', cat: 'Data structures', title: 'pair and tuple', words: ['pair', 'make_pair', 'tuple', 'make_tuple', 'get'], syntax: 'pair<string, int> p = make_pair("a", 1);\nget<0>(t)',
  desc: 'A pair holds two values (first and second); a tuple holds any number, read with get<position>.',
  example: S(`
#include <iostream>
#include <string>
#include <utility>
#include <tuple>
using namespace std;

int main() {
  pair<string, int> p = make_pair("Durban", 1824);
  cout << p.first << " " << p.second << endl;
  tuple<string, int, double> t = make_tuple("Thabo", 17, 1.75);
  cout << get<0>(t) << " " << get<1>(t) << " " << get<2>(t) << endl;
  return 0;
}
`) },
// ---------------------------------------------------------------- Algorithms
{ id: 'sort', cat: 'Algorithms', title: 'sort and reverse', words: ['sort', 'reverse', 'begin', 'end'], syntax: 'sort(v.begin(), v.end());',
  desc: 'sort() puts items in order (smallest first, or in any order you choose with a lambda); reverse() turns the order around. Include <algorithm>.',
  example: S(`
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
  vector<int> v = {40, 10, 30, 20};
  sort(v.begin(), v.end());
  for (int x : v) cout << x << " ";
  cout << endl;
  sort(v.begin(), v.end(), [](int a, int b) { return a > b; });
  for (int x : v) cout << x << " ";
  cout << endl;
  reverse(v.begin(), v.end());
  cout << v[0] << endl;
  return 0;
}
`) },
{ id: 'findcount', cat: 'Algorithms', title: 'find, count, max_element', words: ['find', 'count', 'max_element', 'min_element'], syntax: 'find(v.begin(), v.end(), x)',
  desc: 'Search a collection: find() finds a value, count() counts how often it appears, max_element() and min_element() find the biggest and smallest.',
  example: S(`
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
  vector<int> v = {3, 7, 3, 9, 1};
  cout << count(v.begin(), v.end(), 3) << endl;
  cout << (find(v.begin(), v.end(), 9) != v.end()) << endl;
  cout << *max_element(v.begin(), v.end()) << " " << *min_element(v.begin(), v.end()) << endl;
  return 0;
}
`) },
{ id: 'accumulate', cat: 'Algorithms', title: 'accumulate and iota', words: ['accumulate', 'iota'], syntax: 'accumulate(v.begin(), v.end(), 0)',
  desc: 'accumulate() adds up everything in a collection; iota() fills it with 1, 2, 3, ... Include <numeric>.',
  example: S(`
#include <iostream>
#include <vector>
#include <numeric>
using namespace std;

int main() {
  vector<int> v(5);
  iota(v.begin(), v.end(), 1);
  cout << accumulate(v.begin(), v.end(), 0) << endl;
  return 0;
}
`) },
{ id: 'binarysearch', cat: 'Algorithms', title: 'binary_search and unique', words: ['binary_search', 'unique', 'erase'], syntax: 'binary_search(v.begin(), v.end(), x)',
  desc: 'binary_search() quickly checks a sorted collection for a value. unique() with erase() removes repeated neighbours.',
  example: S(`
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
  vector<int> v = {1, 1, 2, 3, 3, 3, 5};
  cout << binary_search(v.begin(), v.end(), 3) << binary_search(v.begin(), v.end(), 4) << endl;
  v.erase(unique(v.begin(), v.end()), v.end());
  for (int x : v) cout << x << " ";
  cout << endl;
  return 0;
}
`) },
{ id: 'iterators', cat: 'Algorithms', title: 'Iterators', words: ['begin', 'end'], syntax: 'for (auto it = v.begin(); it != v.end(); ++it)',
  desc: 'An iterator points at one item of a collection. begin() is the first item and end() is just past the last. *it reads the item.',
  example: S(`
#include <iostream>
#include <vector>
using namespace std;

int main() {
  vector<char> letters = {'S', 'o', 'g', 'a'};
  for (auto it = letters.begin(); it != letters.end(); ++it) {
    cout << *it;
  }
  cout << endl;
  return 0;
}
`) },
// ---------------------------------------------------------------- Memory
{ id: 'unique_ptr', cat: 'Smart pointers', title: 'unique_ptr and make_unique', words: ['unique_ptr', 'make_unique'], syntax: 'auto p = make_unique<int>(5);',
  desc: 'A smart pointer that owns its object and deletes it automatically when it is no longer used, so you never forget delete.',
  example: S(`
#include <iostream>
#include <memory>
using namespace std;

int main() {
  unique_ptr<int> p = make_unique<int>(42);
  cout << *p << endl;
  *p += 1;
  cout << *p << endl;
  return 0;
}
`) },
{ id: 'shared_ptr', cat: 'Smart pointers', title: 'shared_ptr and make_shared', words: ['shared_ptr', 'make_shared'], syntax: 'auto p = make_shared<int>(5);',
  desc: 'A smart pointer that several owners can share. The object is deleted when the last owner is gone.',
  example: S(`
#include <iostream>
#include <memory>
using namespace std;

int main() {
  shared_ptr<int> a = make_shared<int>(7);
  shared_ptr<int> b = a;
  *b = 9;
  cout << *a << " " << a.use_count() << endl;
  return 0;
}
`) },
// ---------------------------------------------------------------- Namespaces and more
{ id: 'namespace', cat: 'More C++', title: 'Your own namespace', words: ['namespace'], syntax: 'namespace name { }',
  desc: 'Put your own names in a namespace so they cannot clash with names from libraries.',
  example: S(`
#include <iostream>
using namespace std;

namespace school {
  int learners = 820;
  void show() {
    cout << learners << endl;
  }
}

int main() {
  school::show();
  cout << school::learners + 30 << endl;
  return 0;
}
`) },
{ id: 'constexpr', cat: 'More C++', title: 'constexpr and static_assert', words: ['constexpr', 'static_assert'], syntax: 'constexpr int N = 4;\nstatic_assert(N > 0, "message");',
  desc: 'constexpr values are worked out while compiling. static_assert checks a rule while compiling and stops the build if it is broken.',
  example: S(`
#include <iostream>
using namespace std;

constexpr int square(int x) {
  return x * x;
}

constexpr int SIZE = square(4);
static_assert(SIZE == 16, "SIZE must be 16");

int main() {
  int cells[SIZE];
  cout << sizeof(cells) / sizeof(cells[0]) << endl;
  return 0;
}
`) },
{ id: 'optional', cat: 'More C++', words: ['optional'], syntax: 'optional<int> find(...);',
  desc: 'An optional either holds a value or holds nothing, which is clearer than using a special number such as -1.',
  example: S(`
#include <iostream>
#include <optional>
#include <string>
using namespace std;

optional<int> findAge(string name) {
  if (name == "Thandi") return 15;
  return nullopt;
}

int main() {
  auto a = findAge("Thandi");
  auto b = findAge("Sipho");
  cout << a.has_value() << " " << a.value() << endl;
  cout << b.has_value() << endl;
  return 0;
}
`) },
{ id: 'limits', cat: 'More C++', title: 'numeric_limits', words: ['numeric_limits'], syntax: 'numeric_limits<int>::max()',
  desc: 'The largest and smallest values a type can hold.',
  example: S(`
#include <iostream>
#include <limits>
using namespace std;

int main() {
  cout << numeric_limits<int>::max() << endl;
  cout << numeric_limits<short>::min() << endl;
  return 0;
}
`) },
{ id: 'random', cat: 'More C++', title: 'Random numbers: rand and srand', words: ['rand', 'srand'], syntax: 'srand(seed);\nint n = rand() % 6 + 1;',
  desc: 'rand() gives a pseudo-random number; srand() sets the starting point. The same seed always gives the same numbers, which is useful for testing; use srand(time(0)) for different numbers each run.',
  example: S(`
#include <iostream>
#include <cstdlib>
using namespace std;

int main() {
  srand(42);
  int a = rand() % 6 + 1;
  srand(42);
  int b = rand() % 6 + 1;
  cout << (a == b) << " " << (a >= 1 && a <= 6) << endl;
  return 0;
}
`) },
];
