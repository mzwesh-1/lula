const int ILAMBU_ELIBOMVU   = 10;
const int ILAMBU_ELIPHUZI   = 9;
const int ILAMBU_ELILUHLAZA = 8;

void setup() {
    pinMode(ILAMBU_ELIBOMVU, OUTPUT);
    pinMode(ILAMBU_ELIPHUZI, OUTPUT);
    pinMode(ILAMBU_ELILUHLAZA, OUTPUT);
}

void loop() {
    digitalWrite(ILAMBU_ELILUHLAZA, HIGH);
    digitalWrite(ILAMBU_ELIPHUZI, LOW);
    digitalWrite(ILAMBU_ELIBOMVU, LOW);
    delay(10000);

    digitalWrite(ILAMBU_ELILUHLAZA, LOW);
    digitalWrite(ILAMBU_ELIPHUZI, HIGH);
    delay(3000);

    digitalWrite(ILAMBU_ELIPHUZI, LOW);
    digitalWrite(ILAMBU_ELIBOMVU, HIGH);
    delay(5000);
}
