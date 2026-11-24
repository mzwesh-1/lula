# Soga: Tshivenḓa reference

> draft - needs review by Tshivenḓa speakers; words are written without the ḓ ḽ ṅ ṋ ṱ marks for easy typing

Every word below can be used in `.ve.soga` files. Plain English C++ keeps working too.

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

# Library packs

A pack switches on when you include one of its headers (in your language or in English).

## Arduino libraries

Headers: `#katela <servo>` = `<Servo.h>`, `#katela <waya>` = `<Wire.h>`, `#katela <bisi_ya_spi>` = `<SPI.h>`, `#katela <memori_i_dzulaho>` = `<EEPROM.h>`

| Tshivenḓa | C++ |
|---|---|
| `Tshiservo` | `Servo` |
| `tumanya` | `attach` |
| `nwala_maikhrosekhondo` | `writeMicroseconds` |
| `Waya` | `Wire` |
| `thoma_u_rumela` | `beginTransmission` |
| `fhedza_u_rumela` | `endTransmission` |
| `humbela_kha` | `requestFrom` |
| `musi_hu_tshi_tanganedzwa` | `onReceive` |
| `musi_hu_tshi_humbelwa` | `onRequest` |
| `Bisi_ya_spi` | `SPI` |
| `fhirisa` | `transfer` |
| `Memori_i_dzulaho` | `EEPROM` |
| `dzhenisa_khayo` | `put` |
| `vusuludza` | `update` |

## Arduino (always on)

| Tshivenḓa | C++ |
|---|---|
| `nanga_nga_u_wela` | `random` |
| `mbeu_ya_u_wela` | `randomSeed` |
| `linganya_hafhu` | `map` |
| `ela_phalisi` | `pulseIn` |
| `phini_u_ya_tshithithisi` | `digitalPinToInterrupt` |
| `MUSI_I_TSHI_GONYA` | `RISING` |
| `MUSI_I_TSHI_TSIA` | `FALLING` |
| `MUSI_I_TSHI_SHANDUKA` | `CHANGE` |
| `tendela_tshithithisi` | `interrupts` |
| `thivhela_tshithithisi` | `noInterrupts` |
| `vhala_nomboro` | `parseInt` |
| `vhala_desimala` | `parseFloat` |
| `vhala_manwalwa` | `readString` |
| `vhala_manwalwa_u_swika` | `readStringUntil` |
| `i_vhe_nomboro` | `toInt` |
| `i_vhe_desimala` | `toFloat` |
| `fhethu_ha` | `indexOf` |
| `tshipida_tsha_manwalwa` | `substring` |
| `gera_zwikhala` | `trim` |
| `i_vhe_maledere_mahulwane` | `toUpperCase` |
| `i_vhe_maledere_matuku` | `toLowerCase` |
| `i_thoma_nga` | `startsWith` |
| `i_fhela_nga` | `endsWith` |

## CUDA

Headers: `#katela <gpu>` = `<cuda_runtime.h>`

| Tshivenḓa | C++ |
|---|---|
| `mushumo_wa_gpu` | `__global__` |
| `zwa_gpu` | `__device__` |
| `zwa_khomphyutha` | `__host__` |
| `zwi_kovhekanaho_gpu` | `__shared__` |
| `lugelanya_dzithambo` | `__syncthreads` |
| `nomboro_ya_thambo` | `threadIdx` |
| `nomboro_ya_bloko` | `blockIdx` |
| `vhuhulu_ha_bloko` | `blockDim` |
| `vhuhulu_ha_gridi` | `gridDim` |
| `vhuhulu3` | `dim3` |
| `gpu_kovhela_memori` | `cudaMalloc` |
| `gpu_vhofholola_memori` | `cudaFree` |
| `gpu_kopa_memori` | `cudaMemcpy` |
| `U_BVA_KHOMPHYUTHA_U_YA_GPU` | `cudaMemcpyHostToDevice` |
| `U_BVA_GPU_U_YA_KHOMPHYUTHA` | `cudaMemcpyDeviceToHost` |
| `gpu_lindela_i_fhedze` | `cudaDeviceSynchronize` |
| `gpu_vhukhakhi_ha_magumo` | `cudaGetLastError` |
| `gpu_manwalwa_a_vhukhakhi` | `cudaGetErrorString` |
| `Vhukhakhi_ha_gpu` | `cudaError_t` |
| `GPU_ZWO_BUDEKA` | `cudaSuccess` |

## Eigen

Headers: `#katela <dzimatriki>` = `<Eigen/Dense>`, `#katela <dzimatriki_mutheo>` = `<Eigen/Core>`, `#katela <dzhiomethri>` = `<Eigen/Geometry>`

| Tshivenḓa | C++ |
|---|---|
| `dzimatriki` | `Eigen` |
| `Matiriki` | `Eigen::MatrixXd` |
| `Vekitha` | `Eigen::VectorXd` |
| `Matiriki3` | `Eigen::Matrix3d` |
| `Matiriki4` | `Eigen::Matrix4d` |
| `Vekitha3` | `Eigen::Vector3d` |
| `Matiriki_ya_lushaka` | `Eigen::Matrix` |
| `Khwathenioni` | `Eigen::Quaterniond` |
| `Khona_na_ekisisi` | `Eigen::AngleAxisd` |
| `Vhuthihi` | `Identity` |
| `Ziro` | `Zero` |
| `Zwothe_ndi_nthihi` | `Ones` |
| `Nga_u_wela` | `Random` |
| `shandukisa_matiriki` | `transpose` |
| `zwi_fhambanaho` | `inverse` |
| `phetho_ya_matiriki` | `determinant` |
| `vhulapfu_ha_vekitha` | `norm` |
| `yo_lingananywa` | `normalized` |
| `mbveledzo_ya_tshitondo` | `dot` |
| `mbveledzo_ya_tshifhambano` | `cross` |
| `tandulula` | `solve` |
| `khethekanya_qr` | `colPivHouseholderQr` |
| `zwi_tou_lingana` | `isApprox` |
| `Ekisisi_X` | `UnitX` |
| `Ekisisi_Y` | `UnitY` |
| `Ekisisi_Z` | `UnitZ` |
| `i_vhe_matiriki` | `matrix` |

## OpenCV

Headers: `#katela <mbono>` = `<opencv2/opencv.hpp>`, `#katela <mbono_mutheo>` = `<opencv2/core.hpp>`, `#katela <mbono_zwifanyiso>` = `<opencv2/imgproc.hpp>`, `#katela <mbono_mafasitere>` = `<opencv2/highgui.hpp>`, `#katela <mbono_vidio>` = `<opencv2/videoio.hpp>`, `#katela <mbono_u_wana_zwithu>` = `<opencv2/objdetect.hpp>`

| Tshivenḓa | C++ |
|---|---|
| `mbono` | `cv` |
| `Tshifanyiso` | `cv::Mat` |
| `vhala_tshifanyiso` | `cv::imread` |
| `vhulunga_tshifanyiso` | `cv::imwrite` |
| `sumbedza_tshifanyiso` | `cv::imshow` |
| `lindela_khii` | `cv::waitKey` |
| `sika_fasitere` | `cv::namedWindow` |
| `vala_mafasitere_othe` | `cv::destroyAllWindows` |
| `shandukisa_muvhala` | `cv::cvtColor` |
| `MUVHALA_U_YA_GRAYI` | `cv::COLOR_BGR2GRAY` |
| `MUVHALA_U_YA_HSV` | `cv::COLOR_BGR2HSV` |
| `MUVHALA_U_YA_RGB` | `cv::COLOR_BGR2RGB` |
| `dzumbisa` | `cv::GaussianBlur` |
| `wana_mathungo` | `cv::Canny` |
| `mukano_wa_u_khethekanya` | `cv::threshold` |
| `MUKANO_WA_ZWIVHILI` | `cv::THRESH_BINARY` |
| `shandukisa_vhuhulu_ha_tshifanyiso` | `cv::resize` |
| `ola_tshikwea` | `cv::rectangle` |
| `ola_tshitenga` | `cv::circle` |
| `ola_mutalo` | `cv::line` |
| `nwala_kha_tshifanyiso` | `cv::putText` |
| `Phoindi` | `cv::Point` |
| `Vhuphara_na_vhulapfu` | `cv::Size` |
| `Ndeme_ya_muvhala` | `cv::Scalar` |
| `Fhethu_ha_tshifanyiso` | `cv::Rect` |
| `Khamera` | `cv::VideoCapture` |
| `yo_vulwa` | `isOpened` |
| `mitalo` | `rows` |
| `dzikholomo` | `cols` |
| `dzikanala` | `channels` |
| `ita_khophi` | `clone` |
| `kopela_kha` | `copyTo` |
| `wana_zwivhumbeo` | `cv::findContours` |
| `ola_zwivhumbeo` | `cv::drawContours` |
| `fhethu_ha_tshivhumbeo` | `cv::contourArea` |
| `ngomu_ha_mukano` | `cv::inRange` |
| `Mukhethululi` | `cv::CascadeClassifier` |
| `wana_zwithu` | `detectMultiScale` |
| `hwala` | `load` |
| `VHALA_NGA_MUVHALA` | `cv::IMREAD_COLOR` |
| `VHALA_NGA_GRAYI` | `cv::IMREAD_GRAYSCALE` |
| `FONTO_I_LEDZANAHO` | `cv::FONT_HERSHEY_SIMPLEX` |
| `Phikisele` | `cv::Vec3b` |
| `zwo_dala_nga_0` | `zeros` |
| `zwo_dala_nga_1` | `ones` |
| `ZWIVHUMBEO_ZWA_NNDA` | `cv::RETR_EXTERNAL` |
| `ZWIVHUMBEO_ZWI_LEDZANAHO` | `cv::CHAIN_APPROX_SIMPLE` |
| `bogisi_lo_monaho` | `cv::boundingRect` |
| `MUVHALA_8BIT_3` | `CV_8UC3` |
| `vhuphara` | `width` |
| `vhulapfu_ha_ntha` | `height` |

## ROS 2

Headers: `#katela <ros2>` = `<rclcpp/rclcpp.hpp>`, `#katela <mulaedza_wa_manwalwa>` = `<std_msgs/msg/string.hpp>`, `#katela <mulaedza_wa_nomboro>` = `<std_msgs/msg/int32.hpp>`, `#katela <mulaedza_wa_desimala>` = `<std_msgs/msg/float64.hpp>`, `#katela <mulaedza_wa_buliani>` = `<std_msgs/msg/bool.hpp>`, `#katela <ndaela_ya_tshimbilo>` = `<geometry_msgs/msg/twist.hpp>`, `#katela <sikena_ya_laser>` = `<sensor_msgs/msg/laser_scan.hpp>`, `#katela <tshifanyiso_tsha_sensa>` = `<sensor_msgs/msg/image.hpp>`

| Tshivenḓa | C++ |
|---|---|
| `ros` | `rclcpp` |
| `thoma_ros` | `rclcpp::init` |
| `vala_ros` | `rclcpp::shutdown` |
| `tshimbidza_ros` | `rclcpp::spin` |
| `tshimbidza_ros_zwituku` | `rclcpp::spin_some` |
| `ros_i_kha_di_tshila` | `rclcpp::ok` |
| `Fundo` | `rclcpp::Node` |
| `Mutandavhudzi` | `rclcpp::Publisher` |
| `Nwaliso` | `rclcpp::Subscription` |
| `Tshivhali_tsha_tshifhinga` | `rclcpp::TimerBase` |
| `sika_mutandavhudzi` | `create_publisher` |
| `sika_nwaliso` | `create_subscription` |
| `sika_tshivhali_tsha_tshifhinga` | `create_wall_timer` |
| `andadza` | `publish` |
| `munwali_wa_mafhungo` | `get_logger` |
| `ROS_MAFHUNGO` | `RCLCPP_INFO` |
| `ROS_TSEVHUDZO` | `RCLCPP_WARN` |
| `ROS_VHUKHAKHI` | `RCLCPP_ERROR` |
| `Tsumbi` | `SharedPtr` |
| `datha` | `data` |
| `zwo_livhaho` | `linear` |
| `u_mona` | `angular` |
| `zwikhala` | `ranges` |
| `divhadza_pharamitha` | `declare_parameter` |
| `wana_pharamitha` | `get_parameter` |
| `mulaedza_wa_manwalwa` | `std_msgs::msg::String` |
| `mulaedza_wa_nomboro` | `std_msgs::msg::Int32` |
| `mulaedza_wa_desimala` | `std_msgs::msg::Float64` |
| `mulaedza_wa_buliani` | `std_msgs::msg::Bool` |
| `ndaela_ya_tshimbilo` | `geometry_msgs::msg::Twist` |
| `sikena_ya_laser` | `sensor_msgs::msg::LaserScan` |
| `tshifanyiso_tsha_sensa` | `sensor_msgs::msg::Image` |

## Standard library extras (always on)

| Tshivenḓa | C++ |
|---|---|
| `datha` | `data` |

## PyTorch (libtorch)

Headers: `#katela <u_guda_ha_mitshini>` = `<torch/torch.h>`

| Tshivenḓa | C++ |
|---|---|
| `u_guda_ha_mitshini` | `torch` |
| `Thensa` | `torch::Tensor` |
| `ita_thensa` | `torch::tensor` |
| `zwo_dala_nga_0` | `torch::zeros` |
| `zwo_dala_nga_1` | `torch::ones` |
| `thensa_nga_u_wela` | `torch::rand` |
| `thensa_nga_u_wela_yo_dowelea` | `torch::randn` |
| `vhea_mbeu` | `torch::manual_seed` |
| `Tshipida_tsha_netiweke` | `torch::nn::Module` |
| `Lwalo_lwo_livhaho` | `torch::nn::Linear` |
| `Lwalo_lwa_vhutanganyi2d` | `torch::nn::Conv2d` |
| `tshivusi_relu` | `torch::relu` |
| `logo_ya_khonadzeo` | `torch::log_softmax` |
| `ndozwo_ya_skwea` | `torch::mse_loss` |
| `ndozwo_ya_khonadzeo` | `torch::nll_loss` |
| `Khwiniso_SGD` | `torch::optim::SGD` |
| `Khwiniso_Adam` | `torch::optim::Adam` |
| `Tshishumiswa` | `torch::Device` |
| `KHA_GPU` | `torch::kCUDA` |
| `KHA_CPU` | `torch::kCPU` |
| `gpu_i_hone` | `torch::cuda::is_available` |
| `vhulunga_modele` | `torch::save` |
| `hwala_modele` | `torch::load` |
| `Mulindi_wa_u_sa_gudi` | `torch::NoGradGuard` |
| `nwalisa_tshipida` | `register_module` |
| `fhirisela_phanda` | `forward` |
| `humela_murahu` | `backward` |
| `phumula_u_kotama` | `zero_grad` |
| `dzhia_khwatha` | `step` |
| `isa_kha` | `to` |
| `ndeme_nthihi` | `item` |
| `vhona_sa` | `view` |
| `shandukisa_tshivhumbeo` | `reshape` |
| `andza_dzimatiriki` | `matmul` |
| `tshivhalo_tsha_thensa` | `sum` |
| `tshikalo_tsha_thensa` | `mean` |
| `tsumbo_khulwane` | `argmax` |
| `dzipharamitha` | `parameters` |
| `gudisa` | `train` |
| `sedza_modele` | `eval` |
