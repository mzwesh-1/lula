# Lula: Sepedi (Sesotho sa Leboa) reference

> draft - needs review by Sepedi speakers

Every word below can be used in `.nso.lula` files. Plain English C++ keeps working too.

## Keywords: Control flow

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `ge` | `if` |
| `go_sego_bjalo` | `else` |
| `kgetha` | `switch` |
| `seemo` | `case` |
| `tlwaelo` | `default` |
| `ge_fela` | `while` |
| `dira` | `do` |
| `dikologa` | `for` |
| `kgaotša` | `break` |
| `tšwela_pele` | `continue` |
| `bušetša` | `return` |
| `tlolela` | `goto` |
| `leka` | `try` |
| `swara` | `catch` |
| `lahlela` | `throw` |
| `co_leta` | `co_await` |
| `co_bušetša` | `co_return` |
| `co_tšweletša` | `co_yield` |

## Keywords: Data types

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `palo` | `int` |
| `tesimale` | `float` |
| `tesimale_gabedi` | `double` |
| `tlhaka` | `char` |
| `tlhaka8` | `char8_t` |
| `tlhaka16` | `char16_t` |
| `tlhaka32` | `char32_t` |
| `tlhaka_ye_pharaletšego` | `wchar_t` |
| `bulini` | `bool` |
| `lefeela` | `void` |
| `kopana` | `short` |
| `telele` | `long` |
| `ka_leswao` | `signed` |
| `ntle_le_leswao` | `unsigned` |
| `ka_boithomelo` | `auto` |
| `mohuta_wa` | `decltype` |

## Keywords: Modifiers

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `sa_fetogego` | `const` |
| `pele_ga_nako` | `constexpr` |
| `lekola_pele` | `consteval` |
| `thoma_pele` | `constinit` |
| `emego` | `static` |
| `ya_ka_ntle` | `extern` |
| `fetogago_kapejana` | `volatile` |
| `fetogago` | `mutable` |
| `ka_gare` | `inline` |
| `rejisetara` | `register` |
| `ya_mogala` | `thread_local` |
| `ka_go_hlaka` | `explicit` |
| `ntle_le_phošo` | `noexcept` |
| `beakanya` | `alignas` |

## Keywords: Classes, objects and structure

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `sehlopha` | `class` |
| `sebopego` | `struct` |
| `kopano` | `union` |
| `lelokelelo` | `enum` |
| `setšhaba` | `public` |
| `sephiri` | `private` |
| `šireleditšwego` | `protected` |
| `bonagalago` | `virtual` |
| `tšea_sebaka` | `override` |
| `ya_mafelelo` | `final` |
| `mogwera` | `friend` |
| `seo` | `this` |
| `mpsha` | `new` |
| `phumola` | `delete` |
| `opareitara` | `operator` |
| `mohlala` | `template` |
| `mohuta` | `typename` |
| `kgopolo` | `concept` |
| `nyaka` | `requires` |
| `lefelo_la_maina` | `namespace` |
| `šomiša` | `using` |
| `leina_le_lefsa` | `typedef` |
| `romela_ntle` | `export` |
| `tsenya` | `import` |
| `mojule` | `module` |
| `kopanyi` | `asm` |

## Keywords: Casts and compile-time

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `fetoša` | `static_cast` |
| `fetoša_ka_nako` | `dynamic_cast` |
| `fetoša_sa_fetogego` | `const_cast` |
| `fetoša_ka_maatla` | `reinterpret_cast` |
| `hwetša_mohuta` | `typeid` |
| `bogolo_bja` | `sizeof` |
| `peakanyo_ya` | `alignof` |
| `netefatša` | `static_assert` |

## Keywords: Constants

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `therešo` | `true` |
| `maaka` | `false` |
| `ga_go_selo` | `nullptr` |

## Keywords: Word operators

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `le` | `and` |
| `goba` | `or` |
| `aowa` | `not` |
| `ga_e_lekane` | `not_eq` |
| `le_lekana` | `and_eq` |
| `goba_lekana` | `or_eq` |
| `goba_fela` | `xor` |
| `goba_fela_lekana` | `xor_eq` |
| `le_biti` | `bitand` |
| `goba_biti` | `bitor` |
| `fetoša_biti` | `compl` |

## Preprocessor

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `#tsenya_ka_gare` | `#include` |
| `#hlaloša` | `#define` |
| `#phumola_tlhalošo` | `#undef` |
| `#ge` | `#if` |
| `#ge_go_hlalošitšwe` | `#ifdef` |
| `#ge_go_sa_hlalošwa` | `#ifndef` |
| `#goba_ge` | `#elif` |
| `#goba_ge_go_hlalošitšwe` | `#elifdef` |
| `#goba_ge_go_sa_hlalošwa` | `#elifndef` |
| `#go_sego_bjalo` | `#else` |
| `#fetša_ge` | `#endif` |
| `#mothaladi` | `#line` |
| `#phošo` | `#error` |
| `#temošo` | `#warning` |
| `#taelo` | `#pragma` |

## Header files

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `<tšohle>` | `<bits/stdc++.h>` |
| `<tseno_le_tšwelo>` | `<iostream>` |
| `<sengwalwa>` | `<string>` |
| `<lenaneo>` | `<vector>` |
| `<mmapa>` | `<map>` |
| `<mmapa_wo_sa_beakanywago>` | `<unordered_map>` |
| `<sete>` | `<set>` |
| `<sete_ye_sa_beakanywago>` | `<unordered_set>` |
| `<mothaladi_wa_go_leta>` | `<queue>` |
| `<mokgobo>` | `<stack>` |
| `<mothaladi_wo_mabedi>` | `<deque>` |
| `<lelokelelo_le_kgokagantšwego>` | `<list>` |
| `<tatelano>` | `<array>` |
| `<mekgwa>` | `<algorithm>` |
| `<dipalo>` | `<cmath>` |
| `<laeborari_c>` | `<cstdlib>` |
| `<nako>` | `<ctime>` |
| `<difaele>` | `<fstream>` |
| `<moela_wa_sengwalwa>` | `<sstream>` |
| `<peakanyo_ya_ditšweletšo>` | `<iomanip>` |
| `<thušo>` | `<utility>` |
| `<memori>` | `<memory>` |
| `<mešomo>` | `<functional>` |
| `<dinomoro>` | `<numeric>` |
| `<mellwane>` | `<limits>` |
| `<mellwane_c>` | `<climits>` |
| `<dipalo_tša_bogolo>` | `<cstdint>` |
| `<sengwalwa_c>` | `<cstring>` |
| `<ditlhaka>` | `<cctype>` |
| `<nako_ye_nepagetšego>` | `<chrono>` |
| `<mogala>` | `<thread>` |
| `<senotlelo>` | `<mutex>` |
| `<tiragalo_ye_sa_letelwago>` | `<exception>` |
| `<diphošo>` | `<stdexcept>` |
| `<mosepelo>` | `<iterator>` |
| `<sehlophana>` | `<tuple>` |
| `<ka_boikgethelo>` | `<optional>` |
| `<ka_tšhoganetšo>` | `<random>` |
| `<dibiti>` | `<bitset>` |

## Library: Core

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `ye_kgolo` | `main` |
| `motheo` | `std` |
| `hlalošitšwe` | `defined` |
| `gatiša` | `printf` |
| `sekena` | `scanf` |

## Library: Input / output and files

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `ngwala` | `std::cout` |
| `bala` | `std::cin` |
| `ngwala_phošo` | `std::cerr` |
| `ngwala_histori` | `std::clog` |
| `mothaladi_wo_mofsa` | `std::endl` |
| `bala_mothaladi` | `std::getline` |
| `phatlalatša` | `std::flush` |
| `ditesimale_tše_tiilego` | `std::fixed` |
| `bea_nepagalo` | `std::setprecision` |
| `bea_bophara` | `std::setw` |
| `faele_ya_go_bala` | `std::ifstream` |
| `faele_ya_go_ngwala` | `std::ofstream` |
| `faele` | `std::fstream` |
| `moela_wa_sengwalwa` | `std::stringstream` |
| `moela_wa_go_bala` | `std::istringstream` |
| `moela_wa_go_ngwala` | `std::ostringstream` |

## Library: Data types

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `palo_ya_bogolo` | `std::size_t` |
| `palo8` | `std::int8_t` |
| `palo16` | `std::int16_t` |
| `palo32` | `std::int32_t` |
| `palo64` | `std::int64_t` |
| `palo_u8` | `std::uint8_t` |
| `palo_u16` | `std::uint16_t` |
| `palo_u32` | `std::uint32_t` |
| `palo_u64` | `std::uint64_t` |

## Library: Containers (STL)

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `sengwalwa` | `std::string` |
| `lenaneo` | `std::vector` |
| `mmapa` | `std::map` |
| `mmapa_wo_sa_beakanywago` | `std::unordered_map` |
| `mmapa_wo_montši` | `std::multimap` |
| `sete` | `std::set` |
| `sete_ye_sa_beakanywago` | `std::unordered_set` |
| `sete_ye_ntši` | `std::multiset` |
| `mothaladi_wa_go_leta` | `std::queue` |
| `mothaladi_wa_bohlokwa` | `std::priority_queue` |
| `mokgobo` | `std::stack` |
| `mothaladi_wo_mabedi` | `std::deque` |
| `lelokelelo_le_kgokagantšwego` | `std::list` |
| `tatelano` | `std::array` |
| `para` | `std::pair` |
| `sehlophana` | `std::tuple` |
| `dibiti` | `std::bitset` |
| `ka_boikgethelo` | `std::optional` |
| `dira_para` | `std::make_pair` |
| `dira_sehlophana` | `std::make_tuple` |
| `tšea` | `std::get` |
| `bofa` | `std::tie` |
| `šuthiša` | `std::move` |

## Library: Smart pointers

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `sešupi_se_tee` | `std::unique_ptr` |
| `sešupi_se_abelanwago` | `std::shared_ptr` |
| `sešupi_se_fokolago` | `std::weak_ptr` |
| `dira_se_tee` | `std::make_unique` |
| `dira_se_abelanwago` | `std::make_shared` |

## Library: Algorithms

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `beakanya_ka_tatelano` | `std::sort` |
| `bušetša_morago` | `std::reverse` |
| `hwetša` | `std::find` |
| `bala_palo` | `std::count` |
| `ye_kgolo_kudu` | `std::max` |
| `ye_nnyane_kudu` | `std::min` |
| `selo_se_segolo` | `std::max_element` |
| `selo_se_senyane` | `std::min_element` |
| `kgoboketša_palomoka` | `std::accumulate` |
| `nyaka_gabedi` | `std::binary_search` |
| `mollwane_wa_fase` | `std::lower_bound` |
| `mollwane_wa_godimo` | `std::upper_bound` |
| `tlatša` | `std::fill` |
| `kopiša` | `std::copy` |
| `fetoša_tšohle` | `std::transform` |
| `se_sengwe_le_se_sengwe` | `std::for_each` |
| `tloša_tše_boeleditšwego` | `std::unique` |
| `peakanyo_ye_e_latelago` | `std::next_permutation` |
| `fapantšha` | `std::swap` |
| `latelanya` | `std::iota` |

## Library: Math

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `boleng_bjo_bo_feletšego` | `std::abs` |
| `modu` | `std::sqrt` |
| `maatla` | `std::pow` |
| `godiša` | `std::ceil` |
| `fokotša` | `std::floor` |
| `batamela` | `std::round` |
| `saene` | `std::sin` |
| `khosaene` | `std::cos` |
| `tantšente` | `std::tan` |
| `logo` | `std::log` |
| `logo10` | `std::log10` |
| `eksponente` | `std::exp` |
| `haepotenuse` | `std::hypot` |
| `šalago` | `std::fmod` |
| `searoganyi_se_segolo` | `std::gcd` |
| `palo_ye_nnyane_ya_go_swana` | `std::lcm` |
| `mellwane_ya_dipalo` | `std::numeric_limits` |
| `ka_tšhoganetšo` | `std::rand` |
| `bjala_tšhoganetšo` | `std::srand` |
| `nako` | `std::time` |

## Library: Strings and characters

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `go_sengwalwa` | `std::to_string` |
| `go_palo` | `std::stoi` |
| `go_palo_ye_telele` | `std::stol` |
| `go_tesimale` | `std::stod` |
| `go_tlhaka_ye_kgolo` | `std::toupper` |
| `go_tlhaka_ye_nnyane` | `std::tolower` |
| `ke_nomoro` | `std::isdigit` |
| `ke_tlhaka` | `std::isalpha` |
| `ke_sekgoba` | `std::isspace` |
| `ke_ye_kgolo` | `std::isupper` |
| `ke_ye_nnyane` | `std::islower` |

## Library: Exceptions

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `tiragalo_ye_sa_letelwago` | `std::exception` |
| `phošo_ya_tirišo` | `std::runtime_error` |
| `phošo_ya_kgopolo` | `std::logic_error` |
| `ka_ntle_ga_mollwane` | `std::out_of_range` |
| `kganetšo_ye_fošagetšego` | `std::invalid_argument` |

## Library: Threads

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `mogala` | `std::thread` |
| `senotlelo` | `std::mutex` |
| `mohlokomedi_wa_senotlelo` | `std::lock_guard` |

## Library: Member functions (use after `.` or `->`)

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `bogolo` | `size` |
| `botelele` | `length` |
| `ga_go_na_selo` | `empty` |
| `oketša_mafelelong` | `push_back` |
| `tloša_mafelelong` | `pop_back` |
| `oketša_mathomong` | `push_front` |
| `tloša_mathomong` | `pop_front` |
| `bea` | `emplace` |
| `bea_mafelelong` | `emplace_back` |
| `oketša` | `push` |
| `ntšha` | `pop` |
| `godimo` | `top` |
| `pele` | `front` |
| `morago` | `back` |
| `mathomo` | `begin` |
| `mafelelo` | `end` |
| `mathomo_morago` | `rbegin` |
| `mafelelo_morago` | `rend` |
| `phumola_tšohle` | `clear` |
| `tsenya_gare` | `insert` |
| `sula` | `erase` |
| `lefelong` | `at` |
| `karolo` | `substr` |
| `kgomaretša` | `append` |
| `sengwalwa_c` | `c_str` |
| `bapetša` | `compare` |
| `tšeela_sebaka` | `replace` |
| `fetoša_bogolo` | `resize` |
| `boloka_sebaka` | `reserve` |
| `bokgoni` | `capacity` |
| `ya_pele` | `first` |
| `ya_bobedi` | `second` |
| `ke_eng` | `what` |
| `bula` | `open` |
| `tswalela` | `close` |
| `e_butšwe` | `is_open` |
| `mafelelo_a_faele` | `eof` |
| `sengwalwa_ka_moka` | `str` |
| `bea_lefsa` | `reset` |
| `lokolla` | `release` |
| `kopanya` | `join` |
| `aroganya` | `detach` |
| `notlela` | `lock` |
| `notlolla` | `unlock` |

## Library: Arduino / robots

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `thoma` | `setup` |
| `boeletša` | `loop` |
| `bea_phini` | `pinMode` |
| `ngwala_dijithale` | `digitalWrite` |
| `bala_dijithale` | `digitalRead` |
| `bala_analoko` | `analogRead` |
| `ngwala_analoko` | `analogWrite` |
| `leta` | `delay` |
| `leta_maekro` | `delayMicroseconds` |
| `dimilisekhontse` | `millis` |
| `dimaekrosekhontse` | `micros` |
| `thibela` | `constrain` |
| `modumo` | `tone` |
| `emiša_modumo` | `noTone` |
| `kgokaganya_tšhitišo` | `attachInterrupt` |
| `GODIMO` | `HIGH` |
| `FASE` | `LOW` |
| `TŠE_TŠWAGO` | `OUTPUT` |
| `TŠE_TSENAGO` | `INPUT` |
| `TŠE_TSENAGO_GO_GOGA` | `INPUT_PULLUP` |
| `LED_YA_KA_GARE` | `LED_BUILTIN` |
| `Seriale` | `Serial` |
| `bontšha` | `print` |
| `bontšha_mothaladi` | `println` |
| `e_hwetšagalago` | `available` |
| `bala_paete` | `read` |
| `ngwala_paete` | `write` |
