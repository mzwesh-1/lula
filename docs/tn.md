# Khanya: Setswana reference

> draft - needs review by Setswana speakers

Every word below can be used in `.tn.kh` files. Plain English C++ keeps working too.

## Keywords: Control flow

| Setswana | C++ |
|---|---|
| `fa` | `if` |
| `go_seng_jalo` | `else` |
| `tlhopha` | `switch` |
| `seemo` | `case` |
| `tlwaelo` | `default` |
| `fa_fela` | `while` |
| `dira` | `do` |
| `dikologa` | `for` |
| `kgaotsa` | `break` |
| `tswelela` | `continue` |
| `busa` | `return` |
| `tlolela` | `goto` |
| `leka` | `try` |
| `tshwara` | `catch` |
| `latlha` | `throw` |
| `co_ema` | `co_await` |
| `co_busa` | `co_return` |
| `co_ntsha` | `co_yield` |

## Keywords: Data types

| Setswana | C++ |
|---|---|
| `palo` | `int` |
| `tesimale` | `float` |
| `tesimale_gabedi` | `double` |
| `tlhaka` | `char` |
| `tlhaka8` | `char8_t` |
| `tlhaka16` | `char16_t` |
| `tlhaka32` | `char32_t` |
| `tlhaka_e_atologileng` | `wchar_t` |
| `bulini` | `bool` |
| `lefela` | `void` |
| `khutshwane` | `short` |
| `leele` | `long` |
| `e_tshwao` | `signed` |
| `e_se_na_tshwao` | `unsigned` |
| `ka_boitiriso` | `auto` |
| `mofuta_wa` | `decltype` |

## Keywords: Modifiers

| Setswana | C++ |
|---|---|
| `e_sa_fetogeng` | `const` |
| `pele_ga_nako` | `constexpr` |
| `tlhatlhoba_pele` | `consteval` |
| `simolola_pele` | `constinit` |
| `e_emeng` | `static` |
| `ya_kwa_ntle` | `extern` |
| `e_fetogang_ka_bonako` | `volatile` |
| `e_fetogang` | `mutable` |
| `mo_teng` | `inline` |
| `rejisetara` | `register` |
| `ya_kgole` | `thread_local` |
| `ka_phepafalo` | `explicit` |
| `kwa_ntle_ga_phoso` | `noexcept` |
| `rulaganya` | `alignas` |

## Keywords: Classes, objects and structure

| Setswana | C++ |
|---|---|
| `setlhopha` | `class` |
| `sebopego` | `struct` |
| `kopano` | `union` |
| `lenane` | `enum` |
| `ya_botlhe` | `public` |
| `sephiri` | `private` |
| `e_sireleditsweng` | `protected` |
| `e_bonalang` | `virtual` |
| `tsaya_sebaka` | `override` |
| `ya_bofelo` | `final` |
| `tsala` | `friend` |
| `sena` | `this` |
| `e_ntsha` | `new` |
| `phimola` | `delete` |
| `opareitara` | `operator` |
| `sekao` | `template` |
| `mofuta` | `typename` |
| `kakanyo` | `concept` |
| `tlhoka` | `requires` |
| `lefelo_la_maina` | `namespace` |
| `dirisa` | `using` |
| `leina_le_lesha` | `typedef` |
| `romela_kwa_ntle` | `export` |
| `tsenya` | `import` |
| `mojule` | `module` |
| `kopanyi` | `asm` |

## Keywords: Casts and compile-time

| Setswana | C++ |
|---|---|
| `fetola` | `static_cast` |
| `fetola_ka_nako` | `dynamic_cast` |
| `fetola_e_sa_fetogeng` | `const_cast` |
| `fetola_ka_thata` | `reinterpret_cast` |
| `bona_mofuta` | `typeid` |
| `bogolo_jwa` | `sizeof` |
| `thulaganyo_ya` | `alignof` |
| `netefatsa` | `static_assert` |

## Keywords: Constants

| Setswana | C++ |
|---|---|
| `boammaaruri` | `true` |
| `maaka` | `false` |
| `sepe` | `nullptr` |

## Keywords: Word operators

| Setswana | C++ |
|---|---|
| `le` | `and` |
| `kgotsa` | `or` |
| `nnyaa` | `not` |
| `ga_e_lekane` | `not_eq` |
| `le_lekana` | `and_eq` |
| `kgotsa_lekana` | `or_eq` |
| `kgotsa_fela` | `xor` |
| `kgotsa_fela_lekana` | `xor_eq` |
| `le_biti` | `bitand` |
| `kgotsa_biti` | `bitor` |
| `fetola_biti` | `compl` |

## Preprocessor

| Setswana | C++ |
|---|---|
| `#tsenyeletsa` | `#include` |
| `#tlhalosa` | `#define` |
| `#phimola_tlhaloso` | `#undef` |
| `#fa` | `#if` |
| `#fa_go_tlhalositswe` | `#ifdef` |
| `#fa_go_sa_tlhalosiwa` | `#ifndef` |
| `#kgotsa_fa` | `#elif` |
| `#kgotsa_fa_go_tlhalositswe` | `#elifdef` |
| `#kgotsa_fa_go_sa_tlhalosiwa` | `#elifndef` |
| `#go_seng_jalo` | `#else` |
| `#fetsa_fa` | `#endif` |
| `#mola` | `#line` |
| `#phoso` | `#error` |
| `#tlhagiso` | `#warning` |
| `#taelo` | `#pragma` |

## Header files

| Setswana | C++ |
|---|---|
| `<tsotlhe>` | `<bits/stdc++.h>` |
| `<tsenyo_le_ntsho>` | `<iostream>` |
| `<mokwalo>` | `<string>` |
| `<lethathamo>` | `<vector>` |
| `<mmapa>` | `<map>` |
| `<mmapa_o_sa_rulaganngwang>` | `<unordered_map>` |
| `<sete>` | `<set>` |
| `<sete_e_sa_rulaganngwang>` | `<unordered_set>` |
| `<mola_wa_go_ema>` | `<queue>` |
| `<mokoa>` | `<stack>` |
| `<mola_o_mabedi>` | `<deque>` |
| `<lenane_le_golaganeng>` | `<list>` |
| `<tatelano>` | `<array>` |
| `<mekgwa>` | `<algorithm>` |
| `<dipalo>` | `<cmath>` |
| `<laeborari_c>` | `<cstdlib>` |
| `<nako>` | `<ctime>` |
| `<difaele>` | `<fstream>` |
| `<molapo_wa_mokwalo>` | `<sstream>` |
| `<thulaganyo_ya_ntsho>` | `<iomanip>` |
| `<thuso>` | `<utility>` |
| `<memori>` | `<memory>` |
| `<ditiro>` | `<functional>` |
| `<dinomore>` | `<numeric>` |
| `<melelwane>` | `<limits>` |
| `<melelwane_c>` | `<climits>` |
| `<dipalo_tsa_bogolo>` | `<cstdint>` |
| `<mokwalo_c>` | `<cstring>` |
| `<ditlhaka>` | `<cctype>` |
| `<nako_e_e_nepagetseng>` | `<chrono>` |
| `<kgole>` | `<thread>` |
| `<selotlolo>` | `<mutex>` |
| `<kgeloso>` | `<exception>` |
| `<diphoso>` | `<stdexcept>` |
| `<motsamai>` | `<iterator>` |
| `<setlhopha_se_sennye>` | `<tuple>` |
| `<ka_boikgethelo>` | `<optional>` |
| `<ka_tshoganyetso>` | `<random>` |
| `<dibiti>` | `<bitset>` |

## Library: Core

| Setswana | C++ |
|---|---|
| `ya_konokono` | `main` |
| `motheo` | `std` |
| `tlhalositswe` | `defined` |
| `gatisa` | `printf` |
| `sekena` | `scanf` |

## Library: Input / output and files

| Setswana | C++ |
|---|---|
| `kwala` | `std::cout` |
| `bala` | `std::cin` |
| `kwala_phoso` | `std::cerr` |
| `kwala_hisetori` | `std::clog` |
| `mola_o_mosha` | `std::endl` |
| `bala_mola` | `std::getline` |
| `phatlalatsa` | `std::flush` |
| `ditesimale_tse_di_tsepameng` | `std::fixed` |
| `baya_nepagalo` | `std::setprecision` |
| `baya_bophara` | `std::setw` |
| `faele_ya_go_bala` | `std::ifstream` |
| `faele_ya_go_kwala` | `std::ofstream` |
| `faele` | `std::fstream` |
| `molapo_wa_mokwalo` | `std::stringstream` |
| `molapo_wa_go_bala` | `std::istringstream` |
| `molapo_wa_go_kwala` | `std::ostringstream` |

## Library: Data types

| Setswana | C++ |
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

| Setswana | C++ |
|---|---|
| `mokwalo` | `std::string` |
| `lethathamo` | `std::vector` |
| `mmapa` | `std::map` |
| `mmapa_o_sa_rulaganngwang` | `std::unordered_map` |
| `mmapa_o_montsi` | `std::multimap` |
| `sete` | `std::set` |
| `sete_e_sa_rulaganngwang` | `std::unordered_set` |
| `sete_e_ntsi` | `std::multiset` |
| `mola_wa_go_ema` | `std::queue` |
| `mola_wa_botlhokwa` | `std::priority_queue` |
| `mokoa` | `std::stack` |
| `mola_o_mabedi` | `std::deque` |
| `lenane_le_golaganeng` | `std::list` |
| `tatelano` | `std::array` |
| `para` | `std::pair` |
| `setlhopha_se_sennye` | `std::tuple` |
| `dibiti` | `std::bitset` |
| `ka_boikgethelo` | `std::optional` |
| `dira_para` | `std::make_pair` |
| `dira_setlhopha_se_sennye` | `std::make_tuple` |
| `tsaya` | `std::get` |
| `bofa` | `std::tie` |
| `sutisa` | `std::move` |

## Library: Smart pointers

| Setswana | C++ |
|---|---|
| `sesupi_se_le_esi` | `std::unique_ptr` |
| `sesupi_se_se_abelanwang` | `std::shared_ptr` |
| `sesupi_se_se_bokoa` | `std::weak_ptr` |
| `dira_se_le_esi` | `std::make_unique` |
| `dira_se_se_abelanwang` | `std::make_shared` |

## Library: Algorithms

| Setswana | C++ |
|---|---|
| `tlhaola` | `std::sort` |
| `boela_morago` | `std::reverse` |
| `bona` | `std::find` |
| `bala_palo` | `std::count` |
| `e_kgolo` | `std::max` |
| `e_nnye` | `std::min` |
| `selo_se_segolo` | `std::max_element` |
| `selo_se_sennye` | `std::min_element` |
| `kgobokanya_palogotlhe` | `std::accumulate` |
| `batla_gabedi` | `std::binary_search` |
| `molelwane_o_kwa_tlase` | `std::lower_bound` |
| `molelwane_o_kwa_godimo` | `std::upper_bound` |
| `tlatsa` | `std::fill` |
| `kopa` | `std::copy` |
| `fetola_tsotlhe` | `std::transform` |
| `nngwe_le_nngwe` | `std::for_each` |
| `tlosa_tse_di_boelediwang` | `std::unique` |
| `thulaganyo_e_e_latelang` | `std::next_permutation` |
| `fapanya` | `std::swap` |
| `latelanya` | `std::iota` |

## Library: Math

| Setswana | C++ |
|---|---|
| `boleng_jo_bo_feletseng` | `std::abs` |
| `modi` | `std::sqrt` |
| `maatla` | `std::pow` |
| `tlhatlosa` | `std::ceil` |
| `fokotsa` | `std::floor` |
| `atamalanya` | `std::round` |
| `saene` | `std::sin` |
| `khosaene` | `std::cos` |
| `tanjente` | `std::tan` |
| `logo` | `std::log` |
| `logo10` | `std::log10` |
| `ekesponente` | `std::exp` |
| `haepotenuse` | `std::hypot` |
| `masalela` | `std::fmod` |
| `mokgaoganyi_o_mogolo` | `std::gcd` |
| `palo_e_nnye_e_tshwanang` | `std::lcm` |
| `melelwane_ya_dipalo` | `std::numeric_limits` |
| `ka_tshoganyetso` | `std::rand` |
| `jala_tshoganyetso` | `std::srand` |
| `nako` | `std::time` |

## Library: Strings and characters

| Setswana | C++ |
|---|---|
| `go_mokwalo` | `std::to_string` |
| `go_palo` | `std::stoi` |
| `go_palo_e_leele` | `std::stol` |
| `go_tesimale` | `std::stod` |
| `go_tlhaka_e_kgolo` | `std::toupper` |
| `go_tlhaka_e_nnye` | `std::tolower` |
| `ke_nomore` | `std::isdigit` |
| `ke_tlhaka` | `std::isalpha` |
| `ke_sekgala` | `std::isspace` |
| `ke_e_kgolo` | `std::isupper` |
| `ke_e_nnye` | `std::islower` |

## Library: Exceptions

| Setswana | C++ |
|---|---|
| `kgeloso` | `std::exception` |
| `phoso_ya_tiriso` | `std::runtime_error` |
| `phoso_ya_kakanyo` | `std::logic_error` |
| `kwa_ntle_ga_molelwane` | `std::out_of_range` |
| `kganetso_e_e_phoso` | `std::invalid_argument` |

## Library: Threads

| Setswana | C++ |
|---|---|
| `kgole` | `std::thread` |
| `selotlolo` | `std::mutex` |
| `mosireletsi_wa_selotlolo` | `std::lock_guard` |

## Library: Member functions (use after `.` or `->`)

| Setswana | C++ |
|---|---|
| `bogolo` | `size` |
| `boleele` | `length` |
| `ga_go_sepe` | `empty` |
| `oketsa_kwa_bofelong` | `push_back` |
| `tlosa_kwa_bofelong` | `pop_back` |
| `oketsa_kwa_tshimologong` | `push_front` |
| `tlosa_kwa_tshimologong` | `pop_front` |
| `baya` | `emplace` |
| `baya_kwa_bofelong` | `emplace_back` |
| `oketsa` | `push` |
| `ntsha` | `pop` |
| `kwa_godimo` | `top` |
| `kwa_pele` | `front` |
| `kwa_morago` | `back` |
| `tshimologo` | `begin` |
| `bofelo` | `end` |
| `tshimologo_morago` | `rbegin` |
| `bofelo_morago` | `rend` |
| `phimola_tsotlhe` | `clear` |
| `tsenya_gare` | `insert` |
| `phumola` | `erase` |
| `mo_lefelong` | `at` |
| `karolo` | `substr` |
| `kgomaretsa` | `append` |
| `mokwalo_c` | `c_str` |
| `bapisa` | `compare` |
| `tsaya_sebaka_sa` | `replace` |
| `fetola_bogolo` | `resize` |
| `boloka_sebaka` | `reserve` |
| `bokgoni` | `capacity` |
| `ya_ntlha` | `first` |
| `ya_bobedi` | `second` |
| `ke_eng` | `what` |
| `bula` | `open` |
| `tswala` | `close` |
| `e_butswe` | `is_open` |
| `bofelo_jwa_faele` | `eof` |
| `mokwalo_otlhe` | `str` |
| `baya_gape` | `reset` |
| `golola` | `release` |
| `kopanya` | `join` |
| `kgaoganya` | `detach` |
| `lotlela` | `lock` |
| `lotlolola` | `unlock` |

## Library: Arduino / robots

| Setswana | C++ |
|---|---|
| `simolola` | `setup` |
| `boeletsa` | `loop` |
| `baya_phini` | `pinMode` |
| `kwala_dijithale` | `digitalWrite` |
| `bala_dijithale` | `digitalRead` |
| `bala_analoko` | `analogRead` |
| `kwala_analoko` | `analogWrite` |
| `ema` | `delay` |
| `ema_maekero` | `delayMicroseconds` |
| `dimilisekonte` | `millis` |
| `dimaekerosekonte` | `micros` |
| `thibela` | `constrain` |
| `modumo` | `tone` |
| `emisa_modumo` | `noTone` |
| `golaganya_tshitiso` | `attachInterrupt` |
| `GODIMO` | `HIGH` |
| `TLASE` | `LOW` |
| `TSE_DI_TSWANG` | `OUTPUT` |
| `TSE_DI_TSENANG` | `INPUT` |
| `TSE_DI_TSENANG_GO_GOGA` | `INPUT_PULLUP` |
| `LED_YA_MO_TENG` | `LED_BUILTIN` |
| `Seriale` | `Serial` |
| `bontsha` | `print` |
| `bontsha_mola` | `println` |
| `e_e_leng_teng` | `available` |
| `bala_baete` | `read` |
| `kwala_baete` | `write` |
