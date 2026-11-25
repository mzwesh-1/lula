#include <isiZulu.h>

engaguquki inombolo ILAMBU_ELIBOMVU   = 10;
engaguquki inombolo ILAMBU_ELIPHUZI   = 9;
engaguquki inombolo ILAMBU_ELILUHLAZA = 8;

ize qala() {
    setha_iphini(ILAMBU_ELIBOMVU, OKUPHUMAYO);
    setha_iphini(ILAMBU_ELIPHUZI, OKUPHUMAYO);
    setha_iphini(ILAMBU_ELILUHLAZA, OKUPHUMAYO);
}

ize phindaphinda() {
    bhala_idijithali(ILAMBU_ELILUHLAZA, PHEZULU);
    bhala_idijithali(ILAMBU_ELIPHUZI, PHANSI);
    bhala_idijithali(ILAMBU_ELIBOMVU, PHANSI);
    linda(10000);

    bhala_idijithali(ILAMBU_ELILUHLAZA, PHANSI);
    bhala_idijithali(ILAMBU_ELIPHUZI, PHEZULU);
    linda(3000);

    bhala_idijithali(ILAMBU_ELIPHUZI, PHANSI);
    bhala_idijithali(ILAMBU_ELIBOMVU, PHEZULU);
    linda(5000);
}
