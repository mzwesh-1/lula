# Lula: Afrikaans reference

> draft - needs review by Afrikaans speakers

Every word below can be used in `.af.lula` files. Plain English C++ keeps working too.

## Keywords: Control flow

| Afrikaans | C++ |
|---|---|
| `as` | `if` |
| `anders` | `else` |
| `kies` | `switch` |
| `geval` | `case` |
| `verstek` | `default` |
| `terwyl` | `while` |
| `doen` | `do` |
| `vir` | `for` |
| `breek` | `break` |
| `gaanvoort` | `continue` |
| `terug` | `return` |
| `spring` | `goto` |
| `probeer` | `try` |
| `vang` | `catch` |
| `gooi` | `throw` |
| `ko_wag` | `co_await` |
| `ko_terug` | `co_return` |
| `ko_lewer` | `co_yield` |

## Keywords: Data types

| Afrikaans | C++ |
|---|---|
| `heelgetal` | `int` |
| `dryfgetal` | `float` |
| `dubbel` | `double` |
| `karakter` | `char` |
| `karakter8` | `char8_t` |
| `karakter16` | `char16_t` |
| `karakter32` | `char32_t` |
| `wydkarakter` | `wchar_t` |
| `boolees` | `bool` |
| `leeg` | `void` |
| `kort` | `short` |
| `lank` | `long` |
| `geteken` | `signed` |
| `ongeteken` | `unsigned` |
| `outo` | `auto` |
| `tipevan` | `decltype` |

## Keywords: Modifiers

| Afrikaans | C++ |
|---|---|
| `konstant` | `const` |
| `vaskonstant` | `constexpr` |
| `kompileerevalueer` | `consteval` |
| `kompileerinisialiseer` | `constinit` |
| `staties` | `static` |
| `ekstern` | `extern` |
| `vlugtig` | `volatile` |
| `veranderlik` | `mutable` |
| `inlyn` | `inline` |
| `registreer` | `register` |
| `draadlokaal` | `thread_local` |
| `eksplisiet` | `explicit` |
| `geenuitsondering` | `noexcept` |
| `belynas` | `alignas` |

## Keywords: Classes, objects and structure

| Afrikaans | C++ |
|---|---|
| `klas` | `class` |
| `struktuur` | `struct` |
| `unie` | `union` |
| `opsomming` | `enum` |
| `publiek` | `public` |
| `privaat` | `private` |
| `beskermd` | `protected` |
| `virtueel` | `virtual` |
| `oorskryf` | `override` |
| `finaal` | `final` |
| `vriend` | `friend` |
| `hierdie` | `this` |
| `nuut` | `new` |
| `verwyder` | `delete` |
| `operateur` | `operator` |
| `sjabloon` | `template` |
| `tipenaam` | `typename` |
| `konsep` | `concept` |
| `vereis` | `requires` |
| `naamruimte` | `namespace` |
| `gebruik` | `using` |
| `tipedef` | `typedef` |
| `uitvoer` | `export` |
| `invoer` | `import` |
| `moduul` | `module` |
| `samesteller` | `asm` |

## Keywords: Casts and compile-time

| Afrikaans | C++ |
|---|---|
| `omskakel` | `static_cast` |
| `dinamies_omskakel` | `dynamic_cast` |
| `konstant_omskakel` | `const_cast` |
| `herinterpreteer_omskakel` | `reinterpret_cast` |
| `tipeid` | `typeid` |
| `groottevan` | `sizeof` |
| `belyningvan` | `alignof` |
| `staties_beweer` | `static_assert` |

## Keywords: Constants

| Afrikaans | C++ |
|---|---|
| `waar` | `true` |
| `vals` | `false` |
| `nulwyser` | `nullptr` |

## Keywords: Word operators

| Afrikaans | C++ |
|---|---|
| `en` | `and` |
| `of` | `or` |
| `nie` | `not` |
| `niegelyk` | `not_eq` |
| `en_gelyk` | `and_eq` |
| `of_gelyk` | `or_eq` |
| `eksof` | `xor` |
| `eksof_gelyk` | `xor_eq` |
| `bisen` | `bitand` |
| `bisof` | `bitor` |
| `komplement` | `compl` |

## Preprocessor

| Afrikaans | C++ |
|---|---|
| `#sluitin` | `#include` |
| `#definieer` | `#define` |
| `#ondefinieer` | `#undef` |
| `#as` | `#if` |
| `#asgedefinieer` | `#ifdef` |
| `#asniegedefinieer` | `#ifndef` |
| `#andersas` | `#elif` |
| `#andersasgedefinieer` | `#elifdef` |
| `#andersasniegedefinieer` | `#elifndef` |
| `#anders` | `#else` |
| `#eindeas` | `#endif` |
| `#reël` | `#line` |
| `#fout` | `#error` |
| `#waarskuwing` | `#warning` |
| `#direktief` | `#pragma` |

## Header files

| Afrikaans | C++ |
|---|---|
| `<alles>` | `<bits/stdc++.h>` |
| `<invoeruitvoer>` | `<iostream>` |
| `<teks>` | `<string>` |
| `<lys>` | `<vector>` |
| `<kaart>` | `<map>` |
| `<ongesorteerdekaart>` | `<unordered_map>` |
| `<versameling>` | `<set>` |
| `<ongesorteerdeversameling>` | `<unordered_set>` |
| `<tou>` | `<queue>` |
| `<stapel>` | `<stack>` |
| `<dubbeltou>` | `<deque>` |
| `<skakellys>` | `<list>` |
| `<skikking>` | `<array>` |
| `<algoritmes>` | `<algorithm>` |
| `<wiskunde>` | `<cmath>` |
| `<c_standaard>` | `<cstdlib>` |
| `<tyd>` | `<ctime>` |
| `<lêers>` | `<fstream>` |
| `<teksstroom>` | `<sstream>` |
| `<formatering>` | `<iomanip>` |
| `<nutsfunksies>` | `<utility>` |
| `<geheue>` | `<memory>` |
| `<funksioneel>` | `<functional>` |
| `<numeries>` | `<numeric>` |
| `<grense>` | `<limits>` |
| `<c_grense>` | `<climits>` |
| `<vastegetalle>` | `<cstdint>` |
| `<c_teks>` | `<cstring>` |
| `<karaktertipes>` | `<cctype>` |
| `<chronometer>` | `<chrono>` |
| `<draad>` | `<thread>` |
| `<slot>` | `<mutex>` |
| `<uitsondering>` | `<exception>` |
| `<foute>` | `<stdexcept>` |
| `<deurloper>` | `<iterator>` |
| `<tupel>` | `<tuple>` |
| `<opsioneel>` | `<optional>` |
| `<lukraak>` | `<random>` |
| `<bisstel>` | `<bitset>` |

## Library: Core

| Afrikaans | C++ |
|---|---|
| `hoof` | `main` |
| `standaard` | `std` |
| `gedefinieer` | `defined` |
| `drukf` | `printf` |
| `skandeerf` | `scanf` |

## Library: Input / output and files

| Afrikaans | C++ |
|---|---|
| `skryf` | `std::cout` |
| `lees` | `std::cin` |
| `skryffout` | `std::cerr` |
| `skryflog` | `std::clog` |
| `nuwereël` | `std::endl` |
| `leesreël` | `std::getline` |
| `spoel` | `std::flush` |
| `vastepunt` | `std::fixed` |
| `stelpresisie` | `std::setprecision` |
| `stelwydte` | `std::setw` |
| `leeslêer` | `std::ifstream` |
| `skryflêer` | `std::ofstream` |
| `lêer` | `std::fstream` |
| `teksstroom` | `std::stringstream` |
| `leesteksstroom` | `std::istringstream` |
| `skryfteksstroom` | `std::ostringstream` |

## Library: Data types

| Afrikaans | C++ |
|---|---|
| `groottetipe` | `std::size_t` |
| `heelgetal8` | `std::int8_t` |
| `heelgetal16` | `std::int16_t` |
| `heelgetal32` | `std::int32_t` |
| `heelgetal64` | `std::int64_t` |
| `ongeteken8` | `std::uint8_t` |
| `ongeteken16` | `std::uint16_t` |
| `ongeteken32` | `std::uint32_t` |
| `ongeteken64` | `std::uint64_t` |

## Library: Containers (STL)

| Afrikaans | C++ |
|---|---|
| `teks` | `std::string` |
| `lys` | `std::vector` |
| `kaart` | `std::map` |
| `ongesorteerdekaart` | `std::unordered_map` |
| `multikaart` | `std::multimap` |
| `versameling` | `std::set` |
| `ongesorteerdeversameling` | `std::unordered_set` |
| `multiversameling` | `std::multiset` |
| `tou` | `std::queue` |
| `prioriteitstou` | `std::priority_queue` |
| `stapel` | `std::stack` |
| `dubbeltou` | `std::deque` |
| `skakellys` | `std::list` |
| `skikking` | `std::array` |
| `paar` | `std::pair` |
| `tupel` | `std::tuple` |
| `bisstel` | `std::bitset` |
| `opsioneel` | `std::optional` |
| `maakpaar` | `std::make_pair` |
| `maaktupel` | `std::make_tuple` |
| `kry` | `std::get` |
| `bind` | `std::tie` |
| `skuif` | `std::move` |

## Library: Smart pointers

| Afrikaans | C++ |
|---|---|
| `uniekewyser` | `std::unique_ptr` |
| `gedeeldewyser` | `std::shared_ptr` |
| `swakwyser` | `std::weak_ptr` |
| `maakuniek` | `std::make_unique` |
| `maakgedeel` | `std::make_shared` |

## Library: Algorithms

| Afrikaans | C++ |
|---|---|
| `sorteer` | `std::sort` |
| `keerom` | `std::reverse` |
| `vind` | `std::find` |
| `tel` | `std::count` |
| `maksimum` | `std::max` |
| `minimum` | `std::min` |
| `grootste_element` | `std::max_element` |
| `kleinste_element` | `std::min_element` |
| `somtotaal` | `std::accumulate` |
| `binêresoek` | `std::binary_search` |
| `ondergrens` | `std::lower_bound` |
| `bogrens` | `std::upper_bound` |
| `vul` | `std::fill` |
| `kopieer` | `std::copy` |
| `transformeer` | `std::transform` |
| `virelke` | `std::for_each` |
| `uniek` | `std::unique` |
| `volgendepermutasie` | `std::next_permutation` |
| `ruil` | `std::swap` |
| `vulreeks` | `std::iota` |

## Library: Math

| Afrikaans | C++ |
|---|---|
| `absoluut` | `std::abs` |
| `wortel` | `std::sqrt` |
| `mag` | `std::pow` |
| `plafon` | `std::ceil` |
| `vloer` | `std::floor` |
| `rond` | `std::round` |
| `sinus` | `std::sin` |
| `kosinus` | `std::cos` |
| `tangens` | `std::tan` |
| `natlog` | `std::log` |
| `logtien` | `std::log10` |
| `eksp` | `std::exp` |
| `skuinssy` | `std::hypot` |
| `restant` | `std::fmod` |
| `ggd` | `std::gcd` |
| `kgv` | `std::lcm` |
| `getalgrense` | `std::numeric_limits` |
| `lukraak` | `std::rand` |
| `saailukraak` | `std::srand` |
| `tyd` | `std::time` |

## Library: Strings and characters

| Afrikaans | C++ |
|---|---|
| `nateks` | `std::to_string` |
| `naheelgetal` | `std::stoi` |
| `nalank` | `std::stol` |
| `nadubbel` | `std::stod` |
| `nahoofletter` | `std::toupper` |
| `nakleinletter` | `std::tolower` |
| `issyfer` | `std::isdigit` |
| `isletter` | `std::isalpha` |
| `isspasie` | `std::isspace` |
| `ishoofletter` | `std::isupper` |
| `iskleinletter` | `std::islower` |

## Library: Exceptions

| Afrikaans | C++ |
|---|---|
| `uitsondering` | `std::exception` |
| `looptydfout` | `std::runtime_error` |
| `logikafout` | `std::logic_error` |
| `buitebereik` | `std::out_of_range` |
| `ongeldigeargument` | `std::invalid_argument` |

## Library: Threads

| Afrikaans | C++ |
|---|---|
| `draad` | `std::thread` |
| `slot` | `std::mutex` |
| `slotwag` | `std::lock_guard` |

## Library: Member functions (use after `.` or `->`)

| Afrikaans | C++ |
|---|---|
| `grootte` | `size` |
| `lengte` | `length` |
| `isleeg` | `empty` |
| `voegagter` | `push_back` |
| `verwyderagter` | `pop_back` |
| `voegvoor` | `push_front` |
| `verwydervoor` | `pop_front` |
| `plaas` | `emplace` |
| `plaasagter` | `emplace_back` |
| `stoot` | `push` |
| `haalaf` | `pop` |
| `bokant` | `top` |
| `voorste` | `front` |
| `agterste` | `back` |
| `begin` | `begin` |
| `einde` | `end` |
| `trubegin` | `rbegin` |
| `trueinde` | `rend` |
| `maakskoon` | `clear` |
| `voegin` | `insert` |
| `uitvee` | `erase` |
| `by` | `at` |
| `subteks` | `substr` |
| `aanheg` | `append` |
| `c_teks` | `c_str` |
| `vergelyk` | `compare` |
| `vervang` | `replace` |
| `hergrootte` | `resize` |
| `reserveer` | `reserve` |
| `kapasiteit` | `capacity` |
| `eerste` | `first` |
| `tweede` | `second` |
| `wat` | `what` |
| `oopmaak` | `open` |
| `toemaak` | `close` |
| `isoop` | `is_open` |
| `lêereinde` | `eof` |
| `alsteks` | `str` |
| `herstel` | `reset` |
| `laatgaan` | `release` |
| `aansluit` | `join` |
| `ontkoppel` | `detach` |
| `sluit` | `lock` |
| `ontsluit` | `unlock` |

## Library: Arduino / robots

| Afrikaans | C++ |
|---|---|
| `opstel` | `setup` |
| `lus` | `loop` |
| `penmodus` | `pinMode` |
| `skryfdigitaal` | `digitalWrite` |
| `leesdigitaal` | `digitalRead` |
| `leesanaloog` | `analogRead` |
| `skryfanaloog` | `analogWrite` |
| `wag` | `delay` |
| `wagmikro` | `delayMicroseconds` |
| `millisekondes` | `millis` |
| `mikrosekondes` | `micros` |
| `beperk` | `constrain` |
| `toon` | `tone` |
| `geentoon` | `noTone` |
| `hegonderbreking` | `attachInterrupt` |
| `HOOG` | `HIGH` |
| `LAAG` | `LOW` |
| `UITSET` | `OUTPUT` |
| `INSET` | `INPUT` |
| `INSET_OPTREK` | `INPUT_PULLUP` |
| `INGEBOUDE_LED` | `LED_BUILTIN` |
| `Seriaal` | `Serial` |
| `druk` | `print` |
| `drukreël` | `println` |
| `beskikbaar` | `available` |
| `leesgreep` | `read` |
| `skryfgreep` | `write` |
