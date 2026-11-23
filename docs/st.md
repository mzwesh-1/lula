# Lula: Sesotho reference

> draft - needs review by Sesotho speakers

Every word below can be used in `.st.lula` files. Plain English C++ keeps working too.

## Keywords: Control flow

| Sesotho | C++ |
|---|---|
| `haeba` | `if` |
| `ho_seng_jwalo` | `else` |
| `kgetha` | `switch` |
| `boemo` | `case` |
| `tlwaelo` | `default` |
| `ha_feela` | `while` |
| `etsa` | `do` |
| `bakeng_sa` | `for` |
| `kgaotsa` | `break` |
| `tswela_pele` | `continue` |
| `kgutlisa` | `return` |
| `tlolela` | `goto` |
| `leka` | `try` |
| `tshwara` | `catch` |
| `akgela` | `throw` |
| `co_ema` | `co_await` |
| `co_kgutlisa` | `co_return` |
| `co_hlahisa` | `co_yield` |

## Keywords: Data types

| Sesotho | C++ |
|---|---|
| `palo` | `int` |
| `desimale` | `float` |
| `desimale_habedi` | `double` |
| `tlhaku` | `char` |
| `tlhaku8` | `char8_t` |
| `tlhaku16` | `char16_t` |
| `tlhaku32` | `char32_t` |
| `tlhaku_e_pharaletseng` | `wchar_t` |
| `bulini` | `bool` |
| `lefeela` | `void` |
| `kgutshwane` | `short` |
| `telele` | `long` |
| `e_tshwayo` | `signed` |
| `e_se_nang_tshwayo` | `unsigned` |
| `ka_boiketsetso` | `auto` |
| `mofuta_wa` | `decltype` |

## Keywords: Modifiers

| Sesotho | C++ |
|---|---|
| `e_sa_fetoheng` | `const` |
| `pele_ho_nako` | `constexpr` |
| `lekola_pele` | `consteval` |
| `qala_pele` | `constinit` |
| `e_emeng` | `static` |
| `ya_kantle` | `extern` |
| `e_fetohang_kapele` | `volatile` |
| `e_fetohang` | `mutable` |
| `ka_hare` | `inline` |
| `rejisetara` | `register` |
| `ya_kgwele` | `thread_local` |
| `ka_ho_hlaka` | `explicit` |
| `ntle_le_phoso` | `noexcept` |
| `lokisa_tatellano` | `alignas` |

## Keywords: Classes, objects and structure

| Sesotho | C++ |
|---|---|
| `sehlopha` | `class` |
| `sebopeho` | `struct` |
| `kopano` | `union` |
| `lenane` | `enum` |
| `setjhaba` | `public` |
| `lekunutu` | `private` |
| `e_sirelelitsweng` | `protected` |
| `e_bonahalang` | `virtual` |
| `nkela_sebaka` | `override` |
| `ya_ho_qetela` | `final` |
| `motswalle` | `friend` |
| `sena` | `this` |
| `ncha` | `new` |
| `hlakola` | `delete` |
| `opereitara` | `operator` |
| `mohlala` | `template` |
| `mofuta` | `typename` |
| `mohopolo` | `concept` |
| `hloka` | `requires` |
| `sebaka_sa_mabitso` | `namespace` |
| `sebedisa` | `using` |
| `lebitso_le_letjha` | `typedef` |
| `romela_kantle` | `export` |
| `kenya` | `import` |
| `mojule` | `module` |
| `kopanyi` | `asm` |

## Keywords: Casts and compile-time

| Sesotho | C++ |
|---|---|
| `fetola` | `static_cast` |
| `fetola_ka_nako` | `dynamic_cast` |
| `fetola_e_sa_fetoheng` | `const_cast` |
| `fetola_ka_matla` | `reinterpret_cast` |
| `fumana_mofuta` | `typeid` |
| `boholo_ba` | `sizeof` |
| `tatellano_ya` | `alignof` |
| `netefatsa` | `static_assert` |

## Keywords: Constants

| Sesotho | C++ |
|---|---|
| `nnete` | `true` |
| `leshano` | `false` |
| `letho` | `nullptr` |

## Keywords: Word operators

| Sesotho | C++ |
|---|---|
| `le` | `and` |
| `kapa` | `or` |
| `tjhe` | `not` |
| `ha_e_lekane` | `not_eq` |
| `le_lekana` | `and_eq` |
| `kapa_lekana` | `or_eq` |
| `kapa_feela` | `xor` |
| `kapa_feela_lekana` | `xor_eq` |
| `le_bithi` | `bitand` |
| `kapa_bithi` | `bitor` |
| `fetola_bithi` | `compl` |

## Preprocessor

| Sesotho | C++ |
|---|---|
| `#kenyelletsa` | `#include` |
| `#hlalosa` | `#define` |
| `#hlakola_tlhaloso` | `#undef` |
| `#haeba` | `#if` |
| `#haeba_ho_hlalositswe` | `#ifdef` |
| `#haeba_ho_sa_hlaloswa` | `#ifndef` |
| `#kapa_haeba` | `#elif` |
| `#kapa_haeba_ho_hlalositswe` | `#elifdef` |
| `#kapa_haeba_ho_sa_hlaloswa` | `#elifndef` |
| `#ho_seng_jwalo` | `#else` |
| `#qetella_haeba` | `#endif` |
| `#mola` | `#line` |
| `#phoso` | `#error` |
| `#temoso` | `#warning` |
| `#taelo` | `#pragma` |

## Header files

| Sesotho | C++ |
|---|---|
| `<tsohle>` | `<bits/stdc++.h>` |
| `<kenyo_le_ntsho>` | `<iostream>` |
| `<mongolo>` | `<string>` |
| `<lethathamo>` | `<vector>` |
| `<mmapa>` | `<map>` |
| `<mmapa_o_sa_hlophiswang>` | `<unordered_map>` |
| `<sete>` | `<set>` |
| `<sete_e_sa_hlophiswang>` | `<unordered_set>` |
| `<mola_wa_ho_ema>` | `<queue>` |
| `<qubu>` | `<stack>` |
| `<mola_o_mabedi>` | `<deque>` |
| `<lenane_le_hokahaneng>` | `<list>` |
| `<letoto>` | `<array>` |
| `<mekgwa>` | `<algorithm>` |
| `<dipalo>` | `<cmath>` |
| `<laeborari_c>` | `<cstdlib>` |
| `<nako>` | `<ctime>` |
| `<difaele>` | `<fstream>` |
| `<molapo_wa_mongolo>` | `<sstream>` |
| `<hlophiso_ya_tlhahiso>` | `<iomanip>` |
| `<thuso>` | `<utility>` |
| `<memori>` | `<memory>` |
| `<mesebetsi>` | `<functional>` |
| `<dinomoro>` | `<numeric>` |
| `<meedi>` | `<limits>` |
| `<meedi_c>` | `<climits>` |
| `<dipalo_tsa_boholo>` | `<cstdint>` |
| `<mongolo_c>` | `<cstring>` |
| `<ditlhaku>` | `<cctype>` |
| `<nako_e_nepahetseng>` | `<chrono>` |
| `<kgwele>` | `<thread>` |
| `<senotlolo>` | `<mutex>` |
| `<kgeloho>` | `<exception>` |
| `<diphoso>` | `<stdexcept>` |
| `<motsamai>` | `<iterator>` |
| `<sehlotshwana>` | `<tuple>` |
| `<ka_boikgethelo>` | `<optional>` |
| `<ka_tsietsi>` | `<random>` |
| `<dibithi>` | `<bitset>` |

## Library: Core

| Sesotho | C++ |
|---|---|
| `ya_sehlooho` | `main` |
| `motheo` | `std` |
| `hlalositswe` | `defined` |
| `hatisa` | `printf` |
| `skena` | `scanf` |

## Library: Input / output and files

| Sesotho | C++ |
|---|---|
| `ngola` | `std::cout` |
| `bala` | `std::cin` |
| `ngola_phoso` | `std::cerr` |
| `ngola_nalane` | `std::clog` |
| `mola_o_motjha` | `std::endl` |
| `bala_mola` | `std::getline` |
| `qhala` | `std::flush` |
| `didesimale_tse_tsitsitseng` | `std::fixed` |
| `beha_nepahalo` | `std::setprecision` |
| `beha_bophara` | `std::setw` |
| `faele_ya_ho_bala` | `std::ifstream` |
| `faele_ya_ho_ngola` | `std::ofstream` |
| `faele` | `std::fstream` |
| `molapo_wa_mongolo` | `std::stringstream` |
| `molapo_wa_ho_bala` | `std::istringstream` |
| `molapo_wa_ho_ngola` | `std::ostringstream` |

## Library: Data types

| Sesotho | C++ |
|---|---|
| `palo_ya_boholo` | `std::size_t` |
| `palo8` | `std::int8_t` |
| `palo16` | `std::int16_t` |
| `palo32` | `std::int32_t` |
| `palo64` | `std::int64_t` |
| `palo_u8` | `std::uint8_t` |
| `palo_u16` | `std::uint16_t` |
| `palo_u32` | `std::uint32_t` |
| `palo_u64` | `std::uint64_t` |

## Library: Containers (STL)

| Sesotho | C++ |
|---|---|
| `mongolo` | `std::string` |
| `lethathamo` | `std::vector` |
| `mmapa` | `std::map` |
| `mmapa_o_sa_hlophiswang` | `std::unordered_map` |
| `mmapa_o_mongata` | `std::multimap` |
| `sete` | `std::set` |
| `sete_e_sa_hlophiswang` | `std::unordered_set` |
| `sete_e_ngata` | `std::multiset` |
| `mola_wa_ho_ema` | `std::queue` |
| `mola_wa_bohlokwa` | `std::priority_queue` |
| `qubu` | `std::stack` |
| `mola_o_mabedi` | `std::deque` |
| `lenane_le_hokahaneng` | `std::list` |
| `letoto` | `std::array` |
| `para` | `std::pair` |
| `sehlotshwana` | `std::tuple` |
| `dibithi` | `std::bitset` |
| `ka_boikgethelo` | `std::optional` |
| `etsa_para` | `std::make_pair` |
| `etsa_sehlotshwana` | `std::make_tuple` |
| `nka` | `std::get` |
| `tlama` | `std::tie` |
| `suthisa` | `std::move` |

## Library: Smart pointers

| Sesotho | C++ |
|---|---|
| `sesupa_se_le_seng` | `std::unique_ptr` |
| `sesupa_se_arolelanwang` | `std::shared_ptr` |
| `sesupa_se_fokolang` | `std::weak_ptr` |
| `etsa_se_le_seng` | `std::make_unique` |
| `etsa_se_arolelanwang` | `std::make_shared` |

## Library: Algorithms

| Sesotho | C++ |
|---|---|
| `hlophisa` | `std::sort` |
| `kgutlisetsa_morao` | `std::reverse` |
| `fumana` | `std::find` |
| `bala_palo` | `std::count` |
| `e_kgolo` | `std::max` |
| `e_nyane` | `std::min` |
| `ntho_e_kgolo` | `std::max_element` |
| `ntho_e_nyane` | `std::min_element` |
| `bokella_kakaretso` | `std::accumulate` |
| `batla_habedi` | `std::binary_search` |
| `moedi_o_tlase` | `std::lower_bound` |
| `moedi_o_hodimo` | `std::upper_bound` |
| `tlatsa` | `std::fill` |
| `kopitsa` | `std::copy` |
| `fetola_tsohle` | `std::transform` |
| `ka_nngwe_le_nngwe` | `std::for_each` |
| `tlosa_tse_ipheteng` | `std::unique` |
| `tatellano_e_latelang` | `std::next_permutation` |
| `fapanya` | `std::swap` |
| `latellanya` | `std::iota` |

## Library: Math

| Sesotho | C++ |
|---|---|
| `boleng_bo_feletseng` | `std::abs` |
| `motso` | `std::sqrt` |
| `matla` | `std::pow` |
| `nyolla` | `std::ceil` |
| `theola` | `std::floor` |
| `atametsa` | `std::round` |
| `saene` | `std::sin` |
| `khosaene` | `std::cos` |
| `tenjente` | `std::tan` |
| `logo` | `std::log` |
| `logo10` | `std::log10` |
| `eksponente` | `std::exp` |
| `haepothenuse` | `std::hypot` |
| `masalla` | `std::fmod` |
| `karolo_e_kgolo` | `std::gcd` |
| `palo_e_nyane_e_tshwanang` | `std::lcm` |
| `meedi_ya_dipalo` | `std::numeric_limits` |
| `ka_tsietsi` | `std::rand` |
| `jala_tsietsi` | `std::srand` |
| `nako` | `std::time` |

## Library: Strings and characters

| Sesotho | C++ |
|---|---|
| `ho_mongolo` | `std::to_string` |
| `ho_palo` | `std::stoi` |
| `ho_palo_e_telele` | `std::stol` |
| `ho_desimale` | `std::stod` |
| `ho_tlhaku_e_kgolo` | `std::toupper` |
| `ho_tlhaku_e_nyane` | `std::tolower` |
| `ke_nomoro` | `std::isdigit` |
| `ke_tlhaku` | `std::isalpha` |
| `ke_sebaka` | `std::isspace` |
| `ke_e_kgolo` | `std::isupper` |
| `ke_e_nyane` | `std::islower` |

## Library: Exceptions

| Sesotho | C++ |
|---|---|
| `kgeloho` | `std::exception` |
| `phoso_ya_tshebetso` | `std::runtime_error` |
| `phoso_ya_monahano` | `std::logic_error` |
| `kantle_ho_moedi` | `std::out_of_range` |
| `kganetso_e_fosahetseng` | `std::invalid_argument` |

## Library: Threads

| Sesotho | C++ |
|---|---|
| `kgwele` | `std::thread` |
| `senotlolo` | `std::mutex` |
| `molebedi_wa_senotlolo` | `std::lock_guard` |

## Library: Member functions (use after `.` or `->`)

| Sesotho | C++ |
|---|---|
| `boholo` | `size` |
| `bolelele` | `length` |
| `ha_ho_letho` | `empty` |
| `eketsa_qetellong` | `push_back` |
| `tlosa_qetellong` | `pop_back` |
| `eketsa_qalong` | `push_front` |
| `tlosa_qalong` | `pop_front` |
| `beha` | `emplace` |
| `beha_qetellong` | `emplace_back` |
| `eketsa` | `push` |
| `ntsha` | `pop` |
| `hodimo` | `top` |
| `pele` | `front` |
| `morao` | `back` |
| `qalo` | `begin` |
| `qetello` | `end` |
| `qalo_morao` | `rbegin` |
| `qetello_morao` | `rend` |
| `hlakola_tsohle` | `clear` |
| `kenya_hara` | `insert` |
| `phumola` | `erase` |
| `sebakeng` | `at` |
| `karolo` | `substr` |
| `kgomaretsa` | `append` |
| `mongolo_c` | `c_str` |
| `bapisa` | `compare` |
| `nkela_sebaka_ka` | `replace` |
| `fetola_boholo` | `resize` |
| `boloka_sebaka` | `reserve` |
| `bokgoni` | `capacity` |
| `ya_pele` | `first` |
| `ya_bobedi` | `second` |
| `ke_eng` | `what` |
| `bula` | `open` |
| `kwala` | `close` |
| `e_butswe` | `is_open` |
| `qetello_ya_faele` | `eof` |
| `mongolo_kaofela` | `str` |
| `beha_botjha` | `reset` |
| `lokolla` | `release` |
| `kopanya` | `join` |
| `arola` | `detach` |
| `notlela` | `lock` |
| `notlolla` | `unlock` |

## Library: Arduino / robots

| Sesotho | C++ |
|---|---|
| `qala` | `setup` |
| `pheta_pheta` | `loop` |
| `beha_phini` | `pinMode` |
| `ngola_dijithale` | `digitalWrite` |
| `bala_dijithale` | `digitalRead` |
| `bala_analoko` | `analogRead` |
| `ngola_analoko` | `analogWrite` |
| `ema` | `delay` |
| `ema_maekhro` | `delayMicroseconds` |
| `dimilisekonde` | `millis` |
| `dimaekhrosekonde` | `micros` |
| `thibela` | `constrain` |
| `molumo` | `tone` |
| `emisa_molumo` | `noTone` |
| `hokela_tshitiso` | `attachInterrupt` |
| `HODIMO` | `HIGH` |
| `TLASE` | `LOW` |
| `TSE_TSWANG` | `OUTPUT` |
| `TSE_KENANG` | `INPUT` |
| `TSE_KENANG_HO_HULA` | `INPUT_PULLUP` |
| `LED_E_KAHARE` | `LED_BUILTIN` |
| `Seriale` | `Serial` |
| `bontsha` | `print` |
| `bontsha_mola` | `println` |
| `e_fumanehang` | `available` |
| `bala_baete` | `read` |
| `ngola_baete` | `write` |
