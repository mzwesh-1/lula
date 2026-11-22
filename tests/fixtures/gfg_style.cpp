// Typical GeeksforGeeks / W3Schools style program, written in plain C++.
#include <bits/stdc++.h>
using namespace std;

class Student {
public:
    string name;
    int marks;
    Student(string n, int m) : name(n), marks(m) {}
    bool passed() const { return marks >= 50; }
};

int gcdOf(int a, int b) { return b == 0 ? a : gcdOf(b, a % b); }

int main() {
    vector<Student> students = {Student("Ann", 75), Student("Bo", 40), Student("Cy", 90)};
    sort(students.begin(), students.end(), [](const Student& a, const Student& b) { return a.marks > b.marks; });
    for (const auto& s : students) cout << s.name << " " << s.marks << (s.passed() ? " pass" : " fail") << endl;

    map<string, int> freq;
    string text = "the cat and the hat";
    stringstream ss(text);
    string word;
    while (ss >> word) freq[word]++;
    for (auto& p : freq) cout << p.first << ":" << p.second << " ";
    cout << endl;

    std::vector<int> v(5);
    iota(v.begin(), v.end(), 1);
    cout << accumulate(v.begin(), v.end(), 0) << " " << gcdOf(48, 18) << " " << std::max(3, 9) << endl;

    int count = 0;           // user variable that shares a name with std::count
    for (int i = 0; i < 5; i++) { if (i % 2) continue; count++; }
    cout << "count=" << count << endl;
    try { throw runtime_error("oops"); } catch (const exception& e) { cout << e.what() << endl; }
    cout << fixed << setprecision(3) << sqrt(2.0) << endl;
    return 0;
}
