# Khanya: isiZulu reference

> draft - needs review by isiZulu speakers

Every word below can be used in `.zu.kh` files. Plain English C++ keeps working too.

## Keywords: Control flow

| isiZulu | C++ |
|---|---|
| `uma` | `if` |
| `kungenjalo` | `else` |
| `khetha` | `switch` |
| `isimo` | `case` |
| `okujwayelekile` | `default` |
| `ngenkathi` | `while` |
| `yenza` | `do` |
| `jikeleza` | `for` |
| `phuma` | `break` |
| `qhubeka` | `continue` |
| `buyisa` | `return` |
| `eqa` | `goto` |
| `zama` | `try` |
| `bamba` | `catch` |
| `phonsa` | `throw` |
| `co_linda` | `co_await` |
| `co_buyisa` | `co_return` |
| `co_veza` | `co_yield` |

## Keywords: Data types

| isiZulu | C++ |
|---|---|
| `inombolo` | `int` |
| `idesimali` | `float` |
| `idesimali_kabili` | `double` |
| `uhlamvu` | `char` |
| `uhlamvu8` | `char8_t` |
| `uhlamvu16` | `char16_t` |
| `uhlamvu32` | `char32_t` |
| `uhlamvu_olubanzi` | `wchar_t` |
| `ibhuli` | `bool` |
| `ize` | `void` |
| `fushane` | `short` |
| `ende` | `long` |
| `onophawu` | `signed` |
| `ongenaphawu` | `unsigned` |
| `okuzenzakalelayo` | `auto` |
| `uhlobo_lwa` | `decltype` |

## Keywords: Modifiers

| isiZulu | C++ |
|---|---|
| `engaguquki` | `const` |
| `ngaphambili` | `constexpr` |
| `hlola_ngaphambili` | `consteval` |
| `qala_ngaphambili` | `constinit` |
| `okumile` | `static` |
| `okwangaphandle` | `extern` |
| `okuguquguqukayo` | `volatile` |
| `okuguqukayo` | `mutable` |
| `ngaphakathi` | `inline` |
| `irejista` | `register` |
| `okomucu` | `thread_local` |
| `ngokucacile` | `explicit` |
| `ngaphandle_kwephutha` | `noexcept` |
| `qondanisa` | `alignas` |

## Keywords: Classes, objects and structure

| isiZulu | C++ |
|---|---|
| `isigaba` | `class` |
| `isakhiwo` | `struct` |
| `inyunyana` | `union` |
| `uhlu` | `enum` |
| `umphakathi` | `public` |
| `imfihlo` | `private` |
| `okuvikelwe` | `protected` |
| `okubonakalayo` | `virtual` |
| `esikhundleni` | `override` |
| `okokugcina` | `final` |
| `umngane` | `friend` |
| `lokhu` | `this` |
| `entsha` | `new` |
| `susa` | `delete` |
| `isenzi` | `operator` |
| `isifanekiso` | `template` |
| `uhlobo` | `typename` |
| `umqondo` | `concept` |
| `kudinga` | `requires` |
| `indawo_yamagama` | `namespace` |
| `sebenzisa` | `using` |
| `igama_elisha` | `typedef` |
| `thumela_ngaphandle` | `export` |
| `ngenisa` | `import` |
| `imojula` | `module` |
| `umhlanganisi` | `asm` |

## Keywords: Casts and compile-time

| isiZulu | C++ |
|---|---|
| `guqula` | `static_cast` |
| `guqula_ngesikhathi` | `dynamic_cast` |
| `guqula_engaguquki` | `const_cast` |
| `guqula_ngamandla` | `reinterpret_cast` |
| `thola_uhlobo` | `typeid` |
| `usayizi` | `sizeof` |
| `ukuqondana` | `alignof` |
| `qinisekisa` | `static_assert` |

## Keywords: Constants

| isiZulu | C++ |
|---|---|
| `iqiniso` | `true` |
| `amanga` | `false` |
| `lutho` | `nullptr` |

## Keywords: Word operators

| isiZulu | C++ |
|---|---|
| `futhi` | `and` |
| `noma` | `or` |
| `hhayi` | `not` |
| `akulingani` | `not_eq` |
| `futhi_lingana` | `and_eq` |
| `noma_lingana` | `or_eq` |
| `noma_kuphela` | `xor` |
| `noma_kuphela_lingana` | `xor_eq` |
| `futhi_bhithi` | `bitand` |
| `noma_bhithi` | `bitor` |
| `phendula_bhithi` | `compl` |

## Preprocessor

| isiZulu | C++ |
|---|---|
| `#faka` | `#include` |
| `#chaza` | `#define` |
| `#sula` | `#undef` |
| `#uma` | `#if` |
| `#uma_kuchaziwe` | `#ifdef` |
| `#uma_kungachazwanga` | `#ifndef` |
| `#kungenjalo_uma` | `#elif` |
| `#kungenjalo_uma_kuchaziwe` | `#elifdef` |
| `#kungenjalo_uma_kungachazwanga` | `#elifndef` |
| `#kungenjalo` | `#else` |
| `#qeda_uma` | `#endif` |
| `#umugqa` | `#line` |
| `#iphutha` | `#error` |
| `#isexwayiso` | `#warning` |
| `#isiyalezo` | `#pragma` |

## Header files

| isiZulu | C++ |
|---|---|
| `<konke>` | `<bits/stdc++.h>` |
| `<okokufaka_nokukhipha>` | `<iostream>` |
| `<umbhalo>` | `<string>` |
| `<iqoqo>` | `<vector>` |
| `<imephu>` | `<map>` |
| `<imephu_engahleliwe>` | `<unordered_map>` |
| `<isethi>` | `<set>` |
| `<isethi_engahleliwe>` | `<unordered_set>` |
| `<ulayini>` | `<queue>` |
| `<inqwaba>` | `<stack>` |
| `<ulayini_kabili>` | `<deque>` |
| `<uhlu_oluxhunyiwe>` | `<list>` |
| `<uhide>` | `<array>` |
| `<amasu>` | `<algorithm>` |
| `<izibalo>` | `<cmath>` |
| `<umtapo_c>` | `<cstdlib>` |
| `<isikhathi>` | `<ctime>` |
| `<amafayela>` | `<fstream>` |
| `<umfudlana_wombhalo>` | `<sstream>` |
| `<ukuhlela_okuphumayo>` | `<iomanip>` |
| `<usizo>` | `<utility>` |
| `<inkumbulo>` | `<memory>` |
| `<imisebenzi>` | `<functional>` |
| `<izinombolo>` | `<numeric>` |
| `<imingcele>` | `<limits>` |
| `<imingcele_c>` | `<climits>` |
| `<izinombolo_ezinosayizi>` | `<cstdint>` |
| `<umbhalo_c>` | `<cstring>` |
| `<izinhlamvu>` | `<cctype>` |
| `<isikhathi_esinembile>` | `<chrono>` |
| `<umucu>` | `<thread>` |
| `<isivalo>` | `<mutex>` |
| `<okwehlukile>` | `<exception>` |
| `<amaphutha>` | `<stdexcept>` |
| `<isihambi>` | `<iterator>` |
| `<iqembu>` | `<tuple>` |
| `<okungakhethwa>` | `<optional>` |
| `<okungahleliwe>` | `<random>` |
| `<amabhithi>` | `<bitset>` |

## Library: Core

| isiZulu | C++ |
|---|---|
| `okuyinhloko` | `main` |
| `isisekelo` | `std` |
| `kuchaziwe` | `defined` |
| `phrinta` | `printf` |
| `skena` | `scanf` |

## Library: Input / output and files

| isiZulu | C++ |
|---|---|
| `bhala` | `std::cout` |
| `funda` | `std::cin` |
| `bhala_iphutha` | `std::cerr` |
| `bhala_umlando` | `std::clog` |
| `umugqa` | `std::endl` |
| `funda_umugqa` | `std::getline` |
| `geleza` | `std::flush` |
| `amadesimali_aqinile` | `std::fixed` |
| `setha_ukunemba` | `std::setprecision` |
| `setha_ububanzi` | `std::setw` |
| `ifayela_lokufunda` | `std::ifstream` |
| `ifayela_lokubhala` | `std::ofstream` |
| `ifayela` | `std::fstream` |
| `umfudlana_wombhalo` | `std::stringstream` |
| `umfudlana_wokufunda` | `std::istringstream` |
| `umfudlana_wokubhala` | `std::ostringstream` |

## Library: Data types

| isiZulu | C++ |
|---|---|
| `inombolo_kasayizi` | `std::size_t` |
| `inombolo8` | `std::int8_t` |
| `inombolo16` | `std::int16_t` |
| `inombolo32` | `std::int32_t` |
| `inombolo64` | `std::int64_t` |
| `ongenaphawu8` | `std::uint8_t` |
| `ongenaphawu16` | `std::uint16_t` |
| `ongenaphawu32` | `std::uint32_t` |
| `ongenaphawu64` | `std::uint64_t` |

## Library: Containers (STL)

| isiZulu | C++ |
|---|---|
| `umbhalo` | `std::string` |
| `iqoqo` | `std::vector` |
| `imephu` | `std::map` |
| `imephu_engahleliwe` | `std::unordered_map` |
| `imephu_eningi` | `std::multimap` |
| `isethi` | `std::set` |
| `isethi_engahleliwe` | `std::unordered_set` |
| `isethi_eningi` | `std::multiset` |
| `ulayini` | `std::queue` |
| `ulayini_obalulekile` | `std::priority_queue` |
| `inqwaba` | `std::stack` |
| `ulayini_kabili` | `std::deque` |
| `uhlu_oluxhunyiwe` | `std::list` |
| `uhide` | `std::array` |
| `ipheya` | `std::pair` |
| `iqembu` | `std::tuple` |
| `amabhithi` | `std::bitset` |
| `okungakhethwa` | `std::optional` |
| `yenza_ipheya` | `std::make_pair` |
| `yenza_iqembu` | `std::make_tuple` |
| `thatha` | `std::get` |
| `bopha` | `std::tie` |
| `hambisa` | `std::move` |

## Library: Smart pointers

| isiZulu | C++ |
|---|---|
| `isikhombi_esisodwa` | `std::unique_ptr` |
| `isikhombi_esabelwana` | `std::shared_ptr` |
| `isikhombi_esibuthaka` | `std::weak_ptr` |
| `yenza_esisodwa` | `std::make_unique` |
| `yenza_esabelwana` | `std::make_shared` |

## Library: Algorithms

| isiZulu | C++ |
|---|---|
| `hlela` | `std::sort` |
| `hlehlisa` | `std::reverse` |
| `thola` | `std::find` |
| `bala` | `std::count` |
| `okukhulu` | `std::max` |
| `okuncane` | `std::min` |
| `into_enkulu` | `std::max_element` |
| `into_encane` | `std::min_element` |
| `qoqa_isamba` | `std::accumulate` |
| `sesha_kabili` | `std::binary_search` |
| `umngcele_ophansi` | `std::lower_bound` |
| `umngcele_ophezulu` | `std::upper_bound` |
| `gcwalisa` | `std::fill` |
| `kopisha` | `std::copy` |
| `guqula_konke` | `std::transform` |
| `kuyinye_ngayinye` | `std::for_each` |
| `susa_okuphindiwe` | `std::unique` |
| `ukuhlelwa_okulandelayo` | `std::next_permutation` |
| `shintshanisa` | `std::swap` |
| `landelanisa` | `std::iota` |

## Library: Math

| isiZulu | C++ |
|---|---|
| `inani_eliphelele` | `std::abs` |
| `impande` | `std::sqrt` |
| `amandla` | `std::pow` |
| `nyusa` | `std::ceil` |
| `ehlisa` | `std::floor` |
| `sondeza` | `std::round` |
| `isayini` | `std::sin` |
| `ikhosayini` | `std::cos` |
| `ithenjenti` | `std::tan` |
| `ilogi` | `std::log` |
| `ilogi10` | `std::log10` |
| `ieksponenti` | `std::exp` |
| `ihayiphothenuse` | `std::hypot` |
| `insalela` | `std::fmod` |
| `isehlukanisi_esikhulu` | `std::gcd` |
| `iphindaphindwe_elincane` | `std::lcm` |
| `imingcele_yezinombolo` | `std::numeric_limits` |
| `okungahleliwe` | `std::rand` |
| `hlwanyela_okungahleliwe` | `std::srand` |
| `isikhathi` | `std::time` |

## Library: Strings and characters

| isiZulu | C++ |
|---|---|
| `kumbhalo` | `std::to_string` |
| `kunombolo` | `std::stoi` |
| `kunombolo_ende` | `std::stol` |
| `kudesimali` | `std::stod` |
| `kokukhulu` | `std::toupper` |
| `kokuncane` | `std::tolower` |
| `uyidijithi` | `std::isdigit` |
| `uyinhlamvu` | `std::isalpha` |
| `uyisikhala` | `std::isspace` |
| `ungokukhulu` | `std::isupper` |
| `ungokuncane` | `std::islower` |

## Library: Exceptions

| isiZulu | C++ |
|---|---|
| `okwehlukile` | `std::exception` |
| `iphutha_lokusebenza` | `std::runtime_error` |
| `iphutha_lokucabanga` | `std::logic_error` |
| `ngaphandle_kobubanzi` | `std::out_of_range` |
| `impikiswano_engalungile` | `std::invalid_argument` |

## Library: Threads

| isiZulu | C++ |
|---|---|
| `umucu` | `std::thread` |
| `isivalo` | `std::mutex` |
| `umqaphi_wesivalo` | `std::lock_guard` |

## Library: Member functions (use after `.` or `->`)

| isiZulu | C++ |
|---|---|
| `ubukhulu` | `size` |
| `ubude` | `length` |
| `kungenalutho` | `empty` |
| `engeza_ekugcineni` | `push_back` |
| `susa_ekugcineni` | `pop_back` |
| `engeza_ekuqaleni` | `push_front` |
| `susa_ekuqaleni` | `pop_front` |
| `beka` | `emplace` |
| `beka_ekugcineni` | `emplace_back` |
| `engeza` | `push` |
| `khipha` | `pop` |
| `okuphezulu` | `top` |
| `phambili` | `front` |
| `emuva` | `back` |
| `ukuqala` | `begin` |
| `ukuphela` | `end` |
| `ukuqala_emuva` | `rbegin` |
| `ukuphela_emuva` | `rend` |
| `sula_konke` | `clear` |
| `faka_phakathi` | `insert` |
| `cisha` | `erase` |
| `endaweni` | `at` |
| `ingxenye` | `substr` |
| `namathisela` | `append` |
| `umbhalo_c` | `c_str` |
| `qhathanisa` | `compare` |
| `faka_esikhundleni` | `replace` |
| `shintsha_ubukhulu` | `resize` |
| `gcina_indawo` | `reserve` |
| `umthamo` | `capacity` |
| `okokuqala` | `first` |
| `okwesibili` | `second` |
| `kwenzenjani` | `what` |
| `vula` | `open` |
| `vala` | `close` |
| `kuvulekile` | `is_open` |
| `ukuphela_kwefayela` | `eof` |
| `umbhalo_wonke` | `str` |
| `setha_kabusha` | `reset` |
| `khulula` | `release` |
| `joyina` | `join` |
| `hlukanisa` | `detach` |
| `khiya` | `lock` |
| `vula_ukhiye` | `unlock` |

## Library: Arduino / robots

| isiZulu | C++ |
|---|---|
| `qala` | `setup` |
| `phindaphinda` | `loop` |
| `setha_iphini` | `pinMode` |
| `bhala_idijithali` | `digitalWrite` |
| `funda_idijithali` | `digitalRead` |
| `funda_ianalogi` | `analogRead` |
| `bhala_ianalogi` | `analogWrite` |
| `linda` | `delay` |
| `linda_amamayikhro` | `delayMicroseconds` |
| `amamilisekhondi` | `millis` |
| `amamayikhrosekhondi` | `micros` |
| `vimbela` | `constrain` |
| `ithoni` | `tone` |
| `misa_ithoni` | `noTone` |
| `namathisela_ukuphazamiseka` | `attachInterrupt` |
| `PHEZULU` | `HIGH` |
| `PHANSI` | `LOW` |
| `OKUPHUMAYO` | `OUTPUT` |
| `OKUNGENAYO` | `INPUT` |
| `OKUNGENAYO_KUDONSELWE` | `INPUT_PULLUP` |
| `ILED_EYAKHIWE` | `LED_BUILTIN` |
| `Isiriyeli` | `Serial` |
| `bonisa` | `print` |
| `bonisa_umugqa` | `println` |
| `kutholakalayo` | `available` |
| `funda_ibhayithi` | `read` |
| `bhala_ibhayithi` | `write` |
