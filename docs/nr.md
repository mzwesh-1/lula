# Khanya: isiNdebele reference

> draft - needs review by isiNdebele speakers

Every word below can be used in `.nr.kh` files. Plain English C++ keeps working too.

## Keywords: Control flow

| isiNdebele | C++ |
|---|---|
| `nangabe` | `if` |
| `ngokunye` | `else` |
| `khetha` | `switch` |
| `isimo` | `case` |
| `okujayelekileko` | `default` |
| `ngesikhathi` | `while` |
| `enza` | `do` |
| `jikeleza` | `for` |
| `phuma` | `break` |
| `ragela` | `continue` |
| `buyisa` | `return` |
| `eqa` | `goto` |
| `linga` | `try` |
| `bamba` | `catch` |
| `jikijela` | `throw` |
| `co_lindela` | `co_await` |
| `co_buyisa` | `co_return` |
| `co_veza` | `co_yield` |

## Keywords: Data types

| isiNdebele | C++ |
|---|---|
| `inomboro` | `int` |
| `idesimali` | `float` |
| `idesimali_kabili` | `double` |
| `uhlamvu` | `char` |
| `uhlamvu8` | `char8_t` |
| `uhlamvu16` | `char16_t` |
| `uhlamvu32` | `char32_t` |
| `uhlamvu_olubanzi` | `wchar_t` |
| `ibhuli` | `bool` |
| `ilize` | `void` |
| `okufitjhani` | `short` |
| `okude` | `long` |
| `okunetshwayo` | `signed` |
| `okungenatshwayo` | `unsigned` |
| `ngokuzenzakalelako` | `auto` |
| `uhlobo_lwe` | `decltype` |

## Keywords: Modifiers

| isiNdebele | C++ |
|---|---|
| `okungatjhugulukiko` | `const` |
| `ngaphambilini` | `constexpr` |
| `hlola_ngaphambilini` | `consteval` |
| `thoma_ngaphambilini` | `constinit` |
| `okumileko` | `static` |
| `okwangaphandle` | `extern` |
| `okutjhugulukako_kakhulu` | `volatile` |
| `okutjhugulukako` | `mutable` |
| `ngaphakathi` | `inline` |
| `irejista` | `register` |
| `kwentambo` | `thread_local` |
| `ngokukhanyako` | `explicit` |
| `ngaphandle_kwesiphoso` | `noexcept` |
| `qondanisa` | `alignas` |

## Keywords: Classes, objects and structure

| isiNdebele | C++ |
|---|---|
| `isigaba` | `class` |
| `isakhiwo` | `struct` |
| `ihlangano` | `union` |
| `irhelo` | `enum` |
| `okomphakathi` | `public` |
| `okufihlakeleko` | `private` |
| `okuvikelweko` | `protected` |
| `okubonakalako` | `virtual` |
| `esikhundleni` | `override` |
| `okokugcina` | `final` |
| `umngani` | `friend` |
| `lokhu` | `this` |
| `okutjha` | `new` |
| `susa` | `delete` |
| `isenzi` | `operator` |
| `isibonelo` | `template` |
| `uhlobo` | `typename` |
| `umqondo` | `concept` |
| `kutlhoga` | `requires` |
| `indawo_yamabizo` | `namespace` |
| `sebenzisa` | `using` |
| `ibizo_elitjha` | `typedef` |
| `thumela_ngaphandle` | `export` |
| `ngenisa` | `import` |
| `imojula` | `module` |
| `umhlanganisi` | `asm` |

## Keywords: Casts and compile-time

| isiNdebele | C++ |
|---|---|
| `tjhugulula` | `static_cast` |
| `tjhugulula_ngesikhathi` | `dynamic_cast` |
| `tjhugulula_okungatjhugulukiko` | `const_cast` |
| `tjhugulula_ngamandla` | `reinterpret_cast` |
| `fumana_uhlobo` | `typeid` |
| `ubukhulu_be` | `sizeof` |
| `ukuqondana` | `alignof` |
| `qinisekisa` | `static_assert` |

## Keywords: Constants

| isiNdebele | C++ |
|---|---|
| `iqiniso` | `true` |
| `amala` | `false` |
| `lutho` | `nullptr` |

## Keywords: Word operators

| isiNdebele | C++ |
|---|---|
| `begodu` | `and` |
| `namkha` | `or` |
| `awa` | `not` |
| `akulingani` | `not_eq` |
| `begodu_lingana` | `and_eq` |
| `namkha_lingana` | `or_eq` |
| `namkha_kwaphela` | `xor` |
| `namkha_kwaphela_lingana` | `xor_eq` |
| `begodu_bhithi` | `bitand` |
| `namkha_bhithi` | `bitor` |
| `phendula_bhithi` | `compl` |

## Preprocessor

| isiNdebele | C++ |
|---|---|
| `#faka` | `#include` |
| `#hlathulula` | `#define` |
| `#sula` | `#undef` |
| `#nangabe` | `#if` |
| `#nangabe_kuhlathululwe` | `#ifdef` |
| `#nangabe_kungakahlathululwa` | `#ifndef` |
| `#ngokunye_nangabe` | `#elif` |
| `#ngokunye_nangabe_kuhlathululwe` | `#elifdef` |
| `#ngokunye_nangabe_kungakahlathululwa` | `#elifndef` |
| `#ngokunye` | `#else` |
| `#qeda_nangabe` | `#endif` |
| `#umugqa` | `#line` |
| `#isiphoso` | `#error` |
| `#isiyeleliso` | `#warning` |
| `#umyalo` | `#pragma` |

## Header files

| isiNdebele | C++ |
|---|---|
| `<koke>` | `<bits/stdc++.h>` |
| `<ukungena_nokuphuma>` | `<iostream>` |
| `<umtlolo>` | `<string>` |
| `<iqoqo>` | `<vector>` |
| `<imephu>` | `<map>` |
| `<imephu_engakahlelwa>` | `<unordered_map>` |
| `<isethi>` | `<set>` |
| `<isethi_engakahlelwa>` | `<unordered_set>` |
| `<umugqa_wokulinda>` | `<queue>` |
| `<inqwaba>` | `<stack>` |
| `<umugqa_kabili>` | `<deque>` |
| `<irhelo_elihlanganisiweko>` | `<list>` |
| `<uhide>` | `<array>` |
| `<amasu>` | `<algorithm>` |
| `<izibalo>` | `<cmath>` |
| `<umtapo_c>` | `<cstdlib>` |
| `<isikhathi>` | `<ctime>` |
| `<amafayela>` | `<fstream>` |
| `<umfudlana_womtlolo>` | `<sstream>` |
| `<ukuhlela_okuphumako>` | `<iomanip>` |
| `<isizo>` | `<utility>` |
| `<ikhumbulo>` | `<memory>` |
| `<imisebenzi>` | `<functional>` |
| `<iinomboro>` | `<numeric>` |
| `<imikhawulo>` | `<limits>` |
| `<imikhawulo_c>` | `<climits>` |
| `<iinomboro_ezinobukhulu>` | `<cstdint>` |
| `<umtlolo_c>` | `<cstring>` |
| `<iinhlamvu>` | `<cctype>` |
| `<isikhathi_esinembako>` | `<chrono>` |
| `<intambo>` | `<thread>` |
| `<isivalo>` | `<mutex>` |
| `<okwehlukileko>` | `<exception>` |
| `<iimphoso>` | `<stdexcept>` |
| `<isihambi>` | `<iterator>` |
| `<isiqhema>` | `<tuple>` |
| `<okukhethekako>` | `<optional>` |
| `<okungahlelwanga>` | `<random>` |
| `<amabhithi>` | `<bitset>` |

## Library: Core

| isiNdebele | C++ |
|---|---|
| `okuyihloko` | `main` |
| `isisekelo` | `std` |
| `kuhlathululwe` | `defined` |
| `phrinta` | `printf` |
| `skena` | `scanf` |

## Library: Input / output and files

| isiNdebele | C++ |
|---|---|
| `tlola` | `std::cout` |
| `funda` | `std::cin` |
| `tlola_isiphoso` | `std::cerr` |
| `tlola_umlando` | `std::clog` |
| `umugqa` | `std::endl` |
| `funda_umugqa` | `std::getline` |
| `geleza` | `std::flush` |
| `amadesimali_aqinileko` | `std::fixed` |
| `beka_ukunemba` | `std::setprecision` |
| `beka_ububanzi` | `std::setw` |
| `ifayela_lokufunda` | `std::ifstream` |
| `ifayela_lokutlola` | `std::ofstream` |
| `ifayela` | `std::fstream` |
| `umfudlana_womtlolo` | `std::stringstream` |
| `umfudlana_wokufunda` | `std::istringstream` |
| `umfudlana_wokutlola` | `std::ostringstream` |

## Library: Data types

| isiNdebele | C++ |
|---|---|
| `inomboro_yobukhulu` | `std::size_t` |
| `inomboro8` | `std::int8_t` |
| `inomboro16` | `std::int16_t` |
| `inomboro32` | `std::int32_t` |
| `inomboro64` | `std::int64_t` |
| `inomboro_u8` | `std::uint8_t` |
| `inomboro_u16` | `std::uint16_t` |
| `inomboro_u32` | `std::uint32_t` |
| `inomboro_u64` | `std::uint64_t` |

## Library: Containers (STL)

| isiNdebele | C++ |
|---|---|
| `umtlolo` | `std::string` |
| `iqoqo` | `std::vector` |
| `imephu` | `std::map` |
| `imephu_engakahlelwa` | `std::unordered_map` |
| `imephu_enengi` | `std::multimap` |
| `isethi` | `std::set` |
| `isethi_engakahlelwa` | `std::unordered_set` |
| `isethi_enengi` | `std::multiset` |
| `umugqa_wokulinda` | `std::queue` |
| `umugqa_oqakathekileko` | `std::priority_queue` |
| `inqwaba` | `std::stack` |
| `umugqa_kabili` | `std::deque` |
| `irhelo_elihlanganisiweko` | `std::list` |
| `uhide` | `std::array` |
| `ipheya` | `std::pair` |
| `isiqhema` | `std::tuple` |
| `amabhithi` | `std::bitset` |
| `okukhethekako` | `std::optional` |
| `enza_ipheya` | `std::make_pair` |
| `enza_isiqhema` | `std::make_tuple` |
| `thatha` | `std::get` |
| `bopha` | `std::tie` |
| `susela` | `std::move` |

## Library: Smart pointers

| isiNdebele | C++ |
|---|---|
| `isikhombi_esisodwa` | `std::unique_ptr` |
| `isikhombi_esabelanako` | `std::shared_ptr` |
| `isikhombi_esibuthakathaka` | `std::weak_ptr` |
| `enza_esisodwa` | `std::make_unique` |
| `enza_esabelanako` | `std::make_shared` |

## Library: Algorithms

| isiNdebele | C++ |
|---|---|
| `hlela` | `std::sort` |
| `hlehlisa` | `std::reverse` |
| `fumana` | `std::find` |
| `bala` | `std::count` |
| `okukhulu` | `std::max` |
| `okuncani` | `std::min` |
| `into_ekulu` | `std::max_element` |
| `into_encani` | `std::min_element` |
| `buthelela_isamba` | `std::accumulate` |
| `funa_kabili` | `std::binary_search` |
| `umkhawulo_ophasi` | `std::lower_bound` |
| `umkhawulo_ophezulu` | `std::upper_bound` |
| `zalisa` | `std::fill` |
| `kopa` | `std::copy` |
| `tjhugulula_koke` | `std::transform` |
| `ngayinye_ngayinye` | `std::for_each` |
| `susa_okuphindiweko` | `std::unique` |
| `ihlelo_elilandelako` | `std::next_permutation` |
| `tjhentjhisana` | `std::swap` |
| `landelanisa` | `std::iota` |

## Library: Math

| isiNdebele | C++ |
|---|---|
| `inani_elipheleleko` | `std::abs` |
| `impande` | `std::sqrt` |
| `amandla` | `std::pow` |
| `phakamisa` | `std::ceil` |
| `ehlisa` | `std::floor` |
| `sondeza` | `std::round` |
| `isayini` | `std::sin` |
| `ikhosayini` | `std::cos` |
| `ithenjenti` | `std::tan` |
| `ilogi` | `std::log` |
| `ilogi10` | `std::log10` |
| `ieksponenti` | `std::exp` |
| `ihayiphothenusi` | `std::hypot` |
| `insalela` | `std::fmod` |
| `isehlukanisi_esikhulu` | `std::gcd` |
| `iphindaphindo_elincani` | `std::lcm` |
| `imikhawulo_yeenomboro` | `std::numeric_limits` |
| `okungahlelwanga` | `std::rand` |
| `hlwanyela_okungahlelwanga` | `std::srand` |
| `isikhathi` | `std::time` |

## Library: Strings and characters

| isiNdebele | C++ |
|---|---|
| `kumtlolo` | `std::to_string` |
| `kunomboro` | `std::stoi` |
| `kunomboro_ende` | `std::stol` |
| `kudesimali` | `std::stod` |
| `kokukhulu` | `std::toupper` |
| `kokuncani` | `std::tolower` |
| `yidijithi` | `std::isdigit` |
| `yinhlamvu` | `std::isalpha` |
| `yisikhala` | `std::isspace` |
| `ngokukhulu` | `std::isupper` |
| `ngokuncani` | `std::islower` |

## Library: Exceptions

| isiNdebele | C++ |
|---|---|
| `okwehlukileko` | `std::exception` |
| `isiphoso_sokusebenza` | `std::runtime_error` |
| `isiphoso_sokucabanga` | `std::logic_error` |
| `ngaphandle_kobubanzi` | `std::out_of_range` |
| `ingxoxo_engakalungi` | `std::invalid_argument` |

## Library: Threads

| isiNdebele | C++ |
|---|---|
| `intambo` | `std::thread` |
| `isivalo` | `std::mutex` |
| `umqaphi_wesivalo` | `std::lock_guard` |

## Library: Member functions (use after `.` or `->`)

| isiNdebele | C++ |
|---|---|
| `ubukhulu` | `size` |
| `ubude` | `length` |
| `akunalitho` | `empty` |
| `engeza_ekugcineni` | `push_back` |
| `susa_ekugcineni` | `pop_back` |
| `engeza_ekuthomeni` | `push_front` |
| `susa_ekuthomeni` | `pop_front` |
| `beka` | `emplace` |
| `beka_ekugcineni` | `emplace_back` |
| `engeza` | `push` |
| `khupha` | `pop` |
| `okuphezulu` | `top` |
| `phambili` | `front` |
| `ngemva` | `back` |
| `ukuthoma` | `begin` |
| `ukuphela` | `end` |
| `ukuthoma_ngemva` | `rbegin` |
| `ukuphela_ngemva` | `rend` |
| `sula_koke` | `clear` |
| `faka_hlangana` | `insert` |
| `cima` | `erase` |
| `endaweni` | `at` |
| `ingcenye` | `substr` |
| `namathelisa` | `append` |
| `umtlolo_c` | `c_str` |
| `madanisa` | `compare` |
| `faka_esikhundleni` | `replace` |
| `tjhugulula_ubukhulu` | `resize` |
| `gcina_indawo` | `reserve` |
| `umthamo` | `capacity` |
| `okokuthoma` | `first` |
| `okwesibili` | `second` |
| `kwenzekeni` | `what` |
| `vula` | `open` |
| `vala` | `close` |
| `kuvulekile` | `is_open` |
| `ukuphela_kwefayela` | `eof` |
| `umtlolo_woke` | `str` |
| `beka_butjha` | `reset` |
| `khulula` | `release` |
| `hlanganisa` | `join` |
| `ahlukanisa` | `detach` |
| `khiya` | `lock` |
| `vula_ikhiya` | `unlock` |

## Library: Arduino / robots

| isiNdebele | C++ |
|---|---|
| `thoma` | `setup` |
| `phinda_phinda` | `loop` |
| `beka_iphini` | `pinMode` |
| `tlola_idijithali` | `digitalWrite` |
| `funda_idijithali` | `digitalRead` |
| `funda_ianalogi` | `analogRead` |
| `tlola_ianalogi` | `analogWrite` |
| `lindela` | `delay` |
| `lindela_amamayikhro` | `delayMicroseconds` |
| `amamilisekhondi` | `millis` |
| `amamayikhrosekhondi` | `micros` |
| `vimbela` | `constrain` |
| `ithoni` | `tone` |
| `misa_ithoni` | `noTone` |
| `namathelisa_ukuphazamiseka` | `attachInterrupt` |
| `PHEZULU` | `HIGH` |
| `PHASI` | `LOW` |
| `OKUPHUMAKO` | `OUTPUT` |
| `OKUNGENAKO` | `INPUT` |
| `OKUNGENAKO_KUDONSIWE` | `INPUT_PULLUP` |
| `ILED_EYAKHIWEKO` | `LED_BUILTIN` |
| `Isiriyali` | `Serial` |
| `khombisa` | `print` |
| `khombisa_umugqa` | `println` |
| `okutholakalako` | `available` |
| `funda_ibhayithi` | `read` |
| `tlola_ibhayithi` | `write` |
