# Lula: Tshivenḓa reference

> draft - needs review by Tshivenḓa speakers; words are written without the ḓ ḽ ṅ ṋ ṱ marks for easy typing

Every word below can be used in `.ve.lula` files. Plain English C++ keeps working too.

## Keywords: Control flow

| Tshivenḓa | C++ |
|---|---|
| `arali` | `if` |
| `nga_inwe_ndila` | `else` |
| `nanga` | `switch` |
| `nyimele` | `case` |
| `zwo_dowelea` | `default` |
| `musi` | `while` |
| `ita` | `do` |
| `mona` | `for` |
| `imisa` | `break` |
| `bvela_phanda` | `continue` |
| `vhuisa` | `return` |
| `fhufhela` | `goto` |
| `linga` | `try` |
| `fara` | `catch` |
| `posa` | `throw` |
| `co_lindela` | `co_await` |
| `co_vhuisa` | `co_return` |
| `co_bvisa` | `co_yield` |

## Keywords: Data types

| Tshivenḓa | C++ |
|---|---|
| `nomboro` | `int` |
| `desimala` | `float` |
| `desimala_mbili` | `double` |
| `ledere` | `char` |
| `ledere8` | `char8_t` |
| `ledere16` | `char16_t` |
| `ledere32` | `char32_t` |
| `ledere_lo_tandaho` | `wchar_t` |
| `buliani` | `bool` |
| `a_huna` | `void` |
| `pfufhi` | `short` |
| `lapfu` | `long` |
| `na_tshiga` | `signed` |
| `hu_si_na_tshiga` | `unsigned` |
| `nga_u_ditita` | `auto` |
| `lushaka_lwa` | `decltype` |

## Keywords: Modifiers

| Tshivenḓa | C++ |
|---|---|
| `zwi_sa_shanduki` | `const` |
| `phanda_ha_tshifhinga` | `constexpr` |
| `sedza_phanda` | `consteval` |
| `thoma_phanda` | `constinit` |
| `zwo_imaho` | `static` |
| `zwa_nnda` | `extern` |
| `zwi_shandukaho_nga_u_tavhanya` | `volatile` |
| `zwi_shandukaho` | `mutable` |
| `ngomu` | `inline` |
| `redzhisitara` | `register` |
| `zwa_thambo` | `thread_local` |
| `nga_u_vhonala` | `explicit` |
| `hu_si_na_vhukhakhi` | `noexcept` |
| `lugelanya` | `alignas` |

## Keywords: Classes, objects and structure

| Tshivenḓa | C++ |
|---|---|
| `tshigwada` | `class` |
| `tshivhumbeo` | `struct` |
| `nyanano` | `union` |
| `mutevhe` | `enum` |
| `zwa_vhathu` | `public` |
| `tshiphiri` | `private` |
| `zwo_tsireledzwaho` | `protected` |
| `zwi_vhonalaho` | `virtual` |
| `dzhia_vhudzulo` | `override` |
| `zwa_magumo` | `final` |
| `khonani` | `friend` |
| `izwi` | `this` |
| `ntswa` | `new` |
| `fhelisa` | `delete` |
| `opareta` | `operator` |
| `tsumbo` | `template` |
| `lushaka` | `typename` |
| `muhumbulo` | `concept` |
| `toda` | `requires` |
| `fhethu_ha_madzina` | `namespace` |
| `shumisa` | `using` |
| `dzina_lintswa` | `typedef` |
| `rumela_nnda` | `export` |
| `dzhenisa` | `import` |
| `modulu` | `module` |
| `muvhumbi` | `asm` |

## Keywords: Casts and compile-time

| Tshivenḓa | C++ |
|---|---|
| `shandukisa` | `static_cast` |
| `shandukisa_nga_tshifhinga` | `dynamic_cast` |
| `shandukisa_zwi_sa_shanduki` | `const_cast` |
| `shandukisa_nga_maanda` | `reinterpret_cast` |
| `wana_lushaka` | `typeid` |
| `vhuhulu_ha` | `sizeof` |
| `u_lugelana_ha` | `alignof` |
| `khwathisa` | `static_assert` |

## Keywords: Constants

| Tshivenḓa | C++ |
|---|---|
| `ngoho` | `true` |
| `mazwifhi` | `false` |
| `a_hu_na_tshithu` | `nullptr` |

## Keywords: Word operators

| Tshivenḓa | C++ |
|---|---|
| `na` | `and` |
| `kana` | `or` |
| `hai` | `not` |
| `a_zwi_lingani` | `not_eq` |
| `na_lingana` | `and_eq` |
| `kana_lingana` | `or_eq` |
| `kana_fhedzi` | `xor` |
| `kana_fhedzi_lingana` | `xor_eq` |
| `na_bithi` | `bitand` |
| `kana_bithi` | `bitor` |
| `shandukisa_bithi` | `compl` |

## Preprocessor

| Tshivenḓa | C++ |
|---|---|
| `#katela` | `#include` |
| `#talutshedza` | `#define` |
| `#fhelisa_thalutshedzo` | `#undef` |
| `#arali` | `#if` |
| `#arali_zwo_talutshedzwa` | `#ifdef` |
| `#arali_zwi_songo_talutshedzwa` | `#ifndef` |
| `#kana_arali` | `#elif` |
| `#kana_arali_zwo_talutshedzwa` | `#elifdef` |
| `#kana_arali_zwi_songo_talutshedzwa` | `#elifndef` |
| `#nga_inwe_ndila` | `#else` |
| `#fhedza_arali` | `#endif` |
| `#mutalo` | `#line` |
| `#vhukhakhi` | `#error` |
| `#tsevhudzo` | `#warning` |
| `#ndaela` | `#pragma` |

## Header files

| Tshivenḓa | C++ |
|---|---|
| `<zwothe>` | `<bits/stdc++.h>` |
| `<u_dzhena_na_u_bva>` | `<iostream>` |
| `<manwalwa>` | `<string>` |
| `<kuvhanganyo>` | `<vector>` |
| `<mepe>` | `<map>` |
| `<mepe_u_songo_dzudzanywa>` | `<unordered_map>` |
| `<sethe>` | `<set>` |
| `<sethe_i_songo_dzudzanywa>` | `<unordered_set>` |
| `<mutalo_wa_u_lindela>` | `<queue>` |
| `<mukumbo>` | `<stack>` |
| `<mutalo_wa_matsheo_mavhili>` | `<deque>` |
| `<mutevhe_wo_tumanywaho>` | `<list>` |
| `<tshitevhekano>` | `<array>` |
| `<ngona>` | `<algorithm>` |
| `<mbalo>` | `<cmath>` |
| `<laiburari_c>` | `<cstdlib>` |
| `<tshifhinga>` | `<ctime>` |
| `<dzifaela>` | `<fstream>` |
| `<mulambo_wa_manwalwa>` | `<sstream>` |
| `<ndzudzanyo_ya_mabviselo>` | `<iomanip>` |
| `<thuso>` | `<utility>` |
| `<memori>` | `<memory>` |
| `<mishumo>` | `<functional>` |
| `<dzinomboro>` | `<numeric>` |
| `<mikano>` | `<limits>` |
| `<mikano_c>` | `<climits>` |
| `<dzinomboro_dza_vhuhulu>` | `<cstdint>` |
| `<manwalwa_c>` | `<cstring>` |
| `<maledere>` | `<cctype>` |
| `<tshifhinga_tsho_teaho>` | `<chrono>` |
| `<thambo>` | `<thread>` |
| `<tshikhiya>` | `<mutex>` |
| `<tshimangadzo>` | `<exception>` |
| `<zwikhakhi>` | `<stdexcept>` |
| `<mutshimbili>` | `<iterator>` |
| `<tshigwadana>` | `<tuple>` |
| `<nga_u_khetha>` | `<optional>` |
| `<nga_u_wela>` | `<random>` |
| `<bithi>` | `<bitset>` |

## Library: Core

| Tshivenḓa | C++ |
|---|---|
| `ya_ndeme` | `main` |
| `mutheo` | `std` |
| `zwo_talutshedzwa` | `defined` |
| `gandisa` | `printf` |
| `sekena` | `scanf` |

## Library: Input / output and files

| Tshivenḓa | C++ |
|---|---|
| `nwala` | `std::cout` |
| `vhala` | `std::cin` |
| `nwala_vhukhakhi` | `std::cerr` |
| `nwala_mafhungo` | `std::clog` |
| `mutalo_muswa` | `std::endl` |
| `vhala_mutalo` | `std::getline` |
| `bvisela_nnda` | `std::flush` |
| `madesimala_o_khwathaho` | `std::fixed` |
| `vhea_u_lugela` | `std::setprecision` |
| `vhea_vhuphara` | `std::setw` |
| `faela_ya_u_vhala` | `std::ifstream` |
| `faela_ya_u_nwala` | `std::ofstream` |
| `faela` | `std::fstream` |
| `mulambo_wa_manwalwa` | `std::stringstream` |
| `mulambo_wa_u_vhala` | `std::istringstream` |
| `mulambo_wa_u_nwala` | `std::ostringstream` |

## Library: Data types

| Tshivenḓa | C++ |
|---|---|
| `nomboro_ya_vhuhulu` | `std::size_t` |
| `nomboro8` | `std::int8_t` |
| `nomboro16` | `std::int16_t` |
| `nomboro32` | `std::int32_t` |
| `nomboro64` | `std::int64_t` |
| `nomboro_u8` | `std::uint8_t` |
| `nomboro_u16` | `std::uint16_t` |
| `nomboro_u32` | `std::uint32_t` |
| `nomboro_u64` | `std::uint64_t` |

## Library: Containers (STL)

| Tshivenḓa | C++ |
|---|---|
| `manwalwa` | `std::string` |
| `kuvhanganyo` | `std::vector` |
| `mepe` | `std::map` |
| `mepe_u_songo_dzudzanywa` | `std::unordered_map` |
| `mepe_munzhi` | `std::multimap` |
| `sethe` | `std::set` |
| `sethe_i_songo_dzudzanywa` | `std::unordered_set` |
| `sethe_nnzhi` | `std::multiset` |
| `mutalo_wa_u_lindela` | `std::queue` |
| `mutalo_wa_ndeme` | `std::priority_queue` |
| `mukumbo` | `std::stack` |
| `mutalo_wa_matsheo_mavhili` | `std::deque` |
| `mutevhe_wo_tumanywaho` | `std::list` |
| `tshitevhekano` | `std::array` |
| `phere` | `std::pair` |
| `tshigwadana` | `std::tuple` |
| `bithi` | `std::bitset` |
| `nga_u_khetha` | `std::optional` |
| `ita_phere` | `std::make_pair` |
| `ita_tshigwadana` | `std::make_tuple` |
| `dzhia` | `std::get` |
| `vhofha` | `std::tie` |
| `sudzulusa` | `std::move` |

## Library: Smart pointers

| Tshivenḓa | C++ |
|---|---|
| `tsumbi_nthihi` | `std::unique_ptr` |
| `tsumbi_i_kovhekanaho` | `std::shared_ptr` |
| `tsumbi_i_si_na_maanda` | `std::weak_ptr` |
| `ita_nthihi` | `std::make_unique` |
| `ita_i_kovhekanaho` | `std::make_shared` |

## Library: Algorithms

| Tshivenḓa | C++ |
|---|---|
| `dzudzanya` | `std::sort` |
| `vhuisela_murahu` | `std::reverse` |
| `wana` | `std::find` |
| `vhalela` | `std::count` |
| `tshihulwane` | `std::max` |
| `tshitukusa` | `std::min` |
| `tshithu_tshihulwane` | `std::max_element` |
| `tshithu_tshitukusa` | `std::min_element` |
| `kuvhanganya_tshivhalo` | `std::accumulate` |
| `toda_kavhili` | `std::binary_search` |
| `mukano_wa_fhasi` | `std::lower_bound` |
| `mukano_wa_ntha` | `std::upper_bound` |
| `dadza` | `std::fill` |
| `kopa` | `std::copy` |
| `shandukisa_zwothe` | `std::transform` |
| `tshinwe_na_tshinwe` | `std::for_each` |
| `bvisa_zwo_dovholowaho` | `std::unique` |
| `ndzudzanyo_i_tevhelaho` | `std::next_permutation` |
| `tshintshana` | `std::swap` |
| `tevhekanya` | `std::iota` |

## Library: Math

| Tshivenḓa | C++ |
|---|---|
| `ndeme_yo_fhelelaho` | `std::abs` |
| `mudzi` | `std::sqrt` |
| `maanda` | `std::pow` |
| `gonyisa` | `std::ceil` |
| `tsitsa` | `std::floor` |
| `sendedza` | `std::round` |
| `sayini` | `std::sin` |
| `khosayini` | `std::cos` |
| `thandzhenthe` | `std::tan` |
| `logo` | `std::log` |
| `logo10` | `std::log10` |
| `ekisipounenthe` | `std::exp` |
| `haipothenusi` | `std::hypot` |
| `zwo_salaho` | `std::fmod` |
| `mukovhi_muhulwane` | `std::gcd` |
| `vhuanzhi_vhutukusa` | `std::lcm` |
| `mikano_ya_nomboro` | `std::numeric_limits` |
| `nga_u_wela` | `std::rand` |
| `tavha_u_wela` | `std::srand` |
| `tshifhinga` | `std::time` |

## Library: Strings and characters

| Tshivenḓa | C++ |
|---|---|
| `kha_manwalwa` | `std::to_string` |
| `kha_nomboro` | `std::stoi` |
| `kha_nomboro_ndapfu` | `std::stol` |
| `kha_desimala` | `std::stod` |
| `kha_ledere_lihulwane` | `std::toupper` |
| `kha_ledere_litukusa` | `std::tolower` |
| `ndi_didzhithi` | `std::isdigit` |
| `ndi_ledere` | `std::isalpha` |
| `ndi_tshikhala` | `std::isspace` |
| `ndi_lihulwane` | `std::isupper` |
| `ndi_litukusa` | `std::islower` |

## Library: Exceptions

| Tshivenḓa | C++ |
|---|---|
| `tshimangadzo` | `std::exception` |
| `vhukhakhi_ha_mushumo` | `std::runtime_error` |
| `vhukhakhi_ha_muhumbulo` | `std::logic_error` |
| `nnda_ha_mukano` | `std::out_of_range` |
| `khani_i_si_yone` | `std::invalid_argument` |

## Library: Threads

| Tshivenḓa | C++ |
|---|---|
| `thambo` | `std::thread` |
| `tshikhiya` | `std::mutex` |
| `mulindi_wa_tshikhiya` | `std::lock_guard` |

## Library: Member functions (use after `.` or `->`)

| Tshivenḓa | C++ |
|---|---|
| `vhuhulu` | `size` |
| `vhulapfu` | `length` |
| `a_hu_na_tshithu_ngomu` | `empty` |
| `engedza_magumoni` | `push_back` |
| `bvisa_magumoni` | `pop_back` |
| `engedza_mathomoni` | `push_front` |
| `bvisa_mathomoni` | `pop_front` |
| `vhea` | `emplace` |
| `vhea_magumoni` | `emplace_back` |
| `engedza` | `push` |
| `bvisa` | `pop` |
| `ntha` | `top` |
| `phanda` | `front` |
| `murahu` | `back` |
| `mathomo` | `begin` |
| `magumo` | `end` |
| `mathomo_murahu` | `rbegin` |
| `magumo_murahu` | `rend` |
| `phumula_zwothe` | `clear` |
| `dzhenisa_vhukati` | `insert` |
| `phumula` | `erase` |
| `fhethuni` | `at` |
| `tshipida` | `substr` |
| `namatelisa` | `append` |
| `manwalwa_c` | `c_str` |
| `vhambedza` | `compare` |
| `dzhiela_vhudzulo` | `replace` |
| `shandukisa_vhuhulu` | `resize` |
| `vhulunga_fhethu` | `reserve` |
| `vhukoni` | `capacity` |
| `tsha_u_thoma` | `first` |
| `tsha_vhuvhili` | `second` |
| `ndi_mini` | `what` |
| `vula` | `open` |
| `vala` | `close` |
| `zwo_vulea` | `is_open` |
| `magumo_a_faela` | `eof` |
| `manwalwa_othe` | `str` |
| `vhea_hafhu` | `reset` |
| `vhofhololla` | `release` |
| `tangana` | `join` |
| `khethekanya` | `detach` |
| `khiya` | `lock` |
| `vula_tshikhiya` | `unlock` |

## Library: Arduino / robots

| Tshivenḓa | C++ |
|---|---|
| `thoma` | `setup` |
| `dovholola` | `loop` |
| `vhea_phini` | `pinMode` |
| `nwala_didzhithala` | `digitalWrite` |
| `vhala_didzhithala` | `digitalRead` |
| `vhala_analogo` | `analogRead` |
| `nwala_analogo` | `analogWrite` |
| `lindela` | `delay` |
| `lindela_maikhro` | `delayMicroseconds` |
| `milisekhondo` | `millis` |
| `maikhrosekhondo` | `micros` |
| `thivhela` | `constrain` |
| `mubvumo` | `tone` |
| `imisa_mubvumo` | `noTone` |
| `tumanya_tshithithisi` | `attachInterrupt` |
| `NTHA` | `HIGH` |
| `FHASI` | `LOW` |
| `ZWI_BVAHO` | `OUTPUT` |
| `ZWI_DZHENAHO` | `INPUT` |
| `ZWI_DZHENAHO_NGA_U_KOKA` | `INPUT_PULLUP` |
| `LED_YA_NGOMU` | `LED_BUILTIN` |
| `Siriale` | `Serial` |
| `sumbedza` | `print` |
| `sumbedza_mutalo` | `println` |
| `zwi_wanalaho` | `available` |
| `vhala_baithi` | `read` |
| `nwala_baithi` | `write` |
